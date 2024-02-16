<template>
  <div class="products">
    <SideBar />
    <div class="products_right">
      <div class="products_title my-5">
        <h1>商品總覽</h1>
      </div>
      <button type="button" class="btn btn-outline-primary products_add" data-bs-toggle="modal"
        data-bs-target="#staticBackdrop">
        <i class="fa-solid fa-circle-plus"></i>新增
      </button>
      <!-- 新增彈窗 -->
      <div class="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1"
        aria-labelledby="staticBackdropLabel" aria-hidden="true">
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="staticBackdropLabel">新增資料</h5>
              <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
              <div class="mb-3">
                <label for="prodName" class="form-label">商品編號</label>
                <input type="text" class="form-control" id="prodName" v-model="product_no">
                <label for="form-select">商品分類</label>
                <select class="form-select" aria-label="Default select example" v-model="product_class_name">
                  <option value="" selected></option>
                  <option v-for="prodclass in productClasses" :key="prodclass.product_class_no" :value="prodclass.product_class_name">{{ prodclass.product_class_name }}</option>
                </select>
                <label for="form-select">商品TAG編號</label>
                <select class="form-select" aria-label="Default select example" v-model="product_tag_name">
                  <option value="" selected></option>
                  <option v-for="tag in productTags" :key="tag.product_tag_no" :value="tag.product_tag_name">{{ tag.product_tag_name }}</option>
                </select>
                <label for="prodName" class="form-label">商品名稱</label>
                <input type="text" class="form-control" id="prodName" v-model="product_name">
              </div>
              <div class="mb-3">
                <label for="ProdInfo" class="form-label">商品簡介</label>
                <textarea class="form-control" id="ProdInfo" rows="3" v-model="product_info"></textarea>
              </div>
              <label for="ProdLoc" class="form-label">產地</label>
              <input type="text" class="form-control" id="ProdLoc" v-model="product_loc">
              <div class="mb-3">
                <label for="prodStandard" class="form-label">食材規格</label>
                <textarea class="form-control" id="prodStandard" rows="3" v-model="product_standard"></textarea>
              </div>
              <div class="mb-3">
                <label for="prodContent" class="form-label">營養標示</label>
                <textarea class="form-control" id="prodContent" rows="3" v-model="product_content"></textarea>
              </div>
              <label for="prodPrice" class="form-label">商品價格</label>
              <input type="number" class="form-control" id="prodPrice" v-model="product_price">
              <div class="mb-3">
                <label for="prodImgUpload" class="form-label">商品照片</label>
                <input class="form-control" type="file" id="prodImgUpload" name="prodImgUpload" @change="fileChange">
              </div>
              <label for="form-select">商品狀態</label>
              <select class="form-select" aria-label="Default select example">
                <option :value="getStatus(product_status)"></option>
              </select>
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-outline-primary" data-bs-dismiss="modal">回列表</button>
              <button type="button" class="btn btn-primary" @click="addProdToDB">儲存</button>
            </div>
          </div>
        </div>
      </div>
      <table class="table table-hover table-bordered border-dark">
        <thead>
          <tr>
            <th scope="col">
              <input type="checkbox" v-model="selectAll" @change="toggleSelect">
            </th>
            <th scope="col">商品編號</th>
            <th scope="col">商品分類</th>
            <th scope="col">商品名稱</th>
            <th scope="col">商品價格</th>
            <th scope="col">商品狀態</th>
            <th scope="col"></th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(product, index) in products" :key="product.product_no">
            <td>
              <input type="checkbox" v-model="selectedProducts" :value="product">
            </td>
            <td>{{ product.product_no }}</td>
            <td>{{ product.product_class_name }}</td>
            <td>{{ product.product_name }}</td>
            <td>{{ product.product_price }}</td>
            <td>{{ getStatus(product.product_status) }}</td>
            <td>
              <button class="btn btn-outline-primary">
                <i class="fa-solid fa-pencil"></i>修改
              </button>
              <button class="btn btn-outline-primary prodDelete" @click="deleteProd(index)">
                <i class="fa-solid fa-trash-can"></i>刪除
              </button>
            </td>
          </tr>
        </tbody>
      </table>
      <!-- <nav aria-label="Page navigation example">
        <ul class="pagination">
          <li class="page-item" @click="currentPage > 1 ? currentPage-- : null">
            <button class="page-link btn btn-outline-primary bg-transparent border-0" aria-label="Previous">
              <span aria-hidden="true">&laquo;</span>
            </button>
          </li>
          <li v-for="page in totalPages" :key="page" class="page-item" :class="{ 'active': page === currentPage }">
            <button type="button" class="btn btn-outline-primary pageLink" @click="changePage(page)">{{ page }}</button>
          </li>
          <li class="page-item" @click="currentPage < totalPages ? currentPage++ : null">
            <button class="page-link btn-outline-primary bg-transparent border-0" aria-label="Next">
              <span aria-hidden="true">&raquo;</span>
            </button>
          </li>
        </ul>
      </nav> -->
    </div>
  </div>
</template>

<script>
import SideBar from "@/components/SideBar.vue";
import axios from "axios";
import { ref, computed } from 'vue';

export default {
  data() {
    return {
      selectAll: ref(false),
      selectedProducts: ref([]),
      products: ref([]),
      itemsPerPage: 5,
      currentPage: 1,
      product_no:'',
      product_class_name:'',
      product_tag_name:'',
      product_name:'',
      product_info:'',
      product_loc:'',
      product_standard:'',
      product_content:'',
      product_price:'',
      product_image:'',
      product_status:'',
      productTags:[],
      productClasses:[],
    };
  },
  components: {
    SideBar,
  },
  computed: {
    // paginatedProducts() {
    //   const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    //   const endIndex = startIndex + this.itemsPerPage;
    //   return this.products.slice(startIndex, endIndex);
    // },
    // totalPages() {
    //   return Math.ceil(this.products.length / this.itemsPerPage);
    // },

  },
  methods: {
    // changePage(page) {
    //   this.currentPage = page;
    // },
    // deleteProd(index) {
    //   const confirmed = window.confirm("確定要刪除此商品嗎?");
    //   if (confirmed) {
    //     const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    //     const actualIndex = startIndex + index;
    //     this.products.splice(actualIndex, 1);
    //   }
    // },
    // toggleSelect() {
    //   if (this.selectAll) {
    //     // 只選擇當前頁面的商品
    //     this.selectedProducts = [...this.paginatedProducts];
    //   } else {
    //     this.selectedProducts = [];
    //   }
    // },
    getStatus(status) {
      switch (status) {
        case 1: return '上架'
        case 2: return '下架'
        default: return '未分類'
      }
    },
    fileChange(e){
      this.product_image = e.target.files[0];
    },
    addProdToDB() {
      const prodForm = new FormData();
      prodForm.append('product_no',this.product_no);
      prodForm.append('product_class_name',this.product_class_name);
      prodForm.append('product_tag_name',this.product_tag_name);
      prodForm.append('product_name',this.product_name);
      prodForm.append('product_info',this.product_info);
      prodForm.append('product_loc',this.product_loc);
      prodForm.append('product_standard',this.product_standard);
      prodForm.append('product_content',this.product_content);
      prodForm.append('product_price',this.product_price);
      prodForm.append('product_status',this.product_status);  
      prodForm.append('prodImgUpload', this.product_image);

      axios.post(`${import.meta.env.VITE_API_URL}/admin/product/productDataAdd.php`,prodForm,{
        headers:{
          'Content-Type':'multipart/form-data',
        },
      })
        .then(response => {
          console.log('success');
          this.product_no ='';
          this.product_class_name ='';
          this.product_tag_name ='';
          this.product_name ='';
          this.product_info ='';
          this.product_loc ='';
          this.product_standard ='';
          this.product_content ='';
          this.product_price ='';
          this.product_image ='';
          this.product_status ='';
        })
        .catch(error => {
          console.error('Error adding product:', error);
        });
    },
  },
  created() {
    axios.get(`${import.meta.env.VITE_API_URL}/admin/product/productDataGet.php`)
      .then(response => {
        this.products = response.data.products;
      })
      .catch(error => {
        console.error('Error fetching products:', error);
      });
    axios.get(`${import.meta.env.VITE_API_URL}/admin/product/productTagDataGet.php`)
    .then(response => {
        this.productTags = response.data.productTags;
    })
    .catch(error => {
        console.error('Error fetching productTags:', error);
    });
    axios.get(`${import.meta.env.VITE_API_URL}/admin/product/productClassDataGet.php`)
    .then(response => {
        this.productClasses = response.data.productClasses;
    })
    .catch(error => {
        console.error('Error fetching productClasses:', error);
    });
  }
};

</script>


<style lang="scss">
@import "@/assets/scss/page/product.scss";
@import "@/assets/scss/sidebar.scss";
</style>
