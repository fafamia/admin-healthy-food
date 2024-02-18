<template>
  <div class="products">
    <SideBar />
    <div class="products_right">
      <div class="products_title my-5">
        <h1>商品總覽</h1>
      </div>
      <button type="button" class="btn btn-outline-primary products_add" data-bs-toggle="modal" data-bs-target="#addprod">
        <i class="fa-solid fa-circle-plus"></i>新增
      </button>
      <table class="table table-hover table-bordered border-dark">
        <thead>
          <tr>
            <th scope="col">
              <input type="checkbox" v-model="selectAll" @change="toggleAll">
            </th>
            <th scope="col">商品編號</th>
            <th scope="col">商品分類</th>
            <th scope="col">商品名稱</th>
            <th scope="col">商品價格</th>
            <th scope="col">商品狀態</th>
            <th scope="col">
              <button class="btn btn-outline-primary" @click="deleteSelected">
                <i class="fa-solid fa-trash-can"></i>
                刪除
              </button>
            </th>

          </tr>
        </thead>
        <tbody>
          <tr v-for="(product, index) in products" :key="product.product_no">
            <td>
              <input type="checkbox" v-model="product.checked">
            </td>
            <td>{{ product.product_no }}</td>
            <td>{{ product.product_class_name }}</td>
            <td>{{ product.product_name }}</td>
            <td>{{ product.product_price }}</td>
            <td>{{ getStatus(product.product_status) }}</td>
            <td>
              <button class="btn btn-outline-primary" data-bs-toggle="modal" data-bs-target="#updateProd" @click="updateProd(product.product_no)">
                <i class="fa-solid fa-pencil"></i>修改
              </button>
              <button class="btn btn-outline-primary prodDelete" @click="deleteProdToDB(product.product_no, index)">
                <i class="fa-solid fa-trash-can"></i>刪除
              </button>
            </td>
          </tr>
        </tbody>
      </table>
      <!-- 新增彈窗 -->
      <div class="modal fade" id="addprod" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-hidden="true">
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="staticBackdropLabel">新增資料</h5>
              <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
              <label for="prodName " class="form-label">商品編號</label>
              <input type="text" class="form-control mb-3" id="prodName" v-model="prodForm.product_no">

              <label for="form-select">商品分類</label>
              <select class="form-select mb-3" aria-label="Default select example" v-model="prodForm.product_class_no">
                <option value="" selected></option>
                <option v-for="prodclass in productClasses" :key="prodclass.product_class_no"
                  :value="prodclass.product_class_no">{{ prodclass.product_class_name }}</option>
              </select>

              <label for="form-select">商品TAG編號</label>
              <select class="form-select mb-3" aria-label="Default select example" v-model="prodForm.product_tag_no">
                <option value="" selected></option>
                <option v-for="tag in productTags" :key="tag.product_tag_no" :value="tag.product_tag_no">{{
                  tag.product_tag_name }}</option>
              </select>

              <label for="prodName" class="form-label">商品名稱</label>
              <input type="text" class="form-control mb-3" id="prodName" v-model="prodForm.product_name">

              <label for="ProdInfo" class="form-label">商品簡介</label>
              <textarea class="form-control mb-3" id="ProdInfo" rows="3" v-model="prodForm.product_info"></textarea>

              <label for="ProdLoc" class="form-label">產地</label>
              <input type="text" class="form-control mb-3" id="ProdLoc" v-model="prodForm.product_loc">

              <label for="prodStandard" class="form-label">食材規格</label>
              <textarea class="form-control mb-3" id="prodStandard" rows="3"
                v-model="prodForm.product_standard"></textarea>
              <div class="mb-3">
              </div>
              <label for="prodContent" class="form-label">營養標示</label>
              <textarea class="form-control mb-3" id="prodContent" rows="3" v-model="prodForm.product_content"></textarea>

              <label for="prodPrice" class="form-label">商品價格</label>
              <input type="number" class="form-control mb-3" id="prodPrice" v-model="prodForm.product_price">
              <div class="mb-3">
              </div>
              <label for="prodImgUpload" class="form-label">商品照片</label>
              <input class="form-control mb-3" type="file" id="prodImgUpload" name="prodImgUpload" @change="fileChange">

              <label for="form-select">商品狀態</label>
              <select class="form-select mb-3" aria-label="Default select example">
                <option :value="getStatus(product_status)"></option>
              </select>
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-outline-primary" data-bs-dismiss="modal">回列表</button>
              <button type="button" class="btn btn-primary" data-bs-dismiss="modal" @click="addProdToDB">儲存</button>
            </div>
          </div>
        </div>
      </div>
      <!-- 修改彈窗 -->
      <div class="modal fade" id="updateProd" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-hidden="true">
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title">修改資料</h5>
              <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
              <label for="prodName " class="form-label">商品編號</label>
              <input type="text" class="form-control mb-3" id="prodName" v-model="prodForm.product_no">

              <label for="form-select">商品分類</label>
              <select class="form-select mb-3" aria-label="Default select example" v-model="prodForm.product_class_no">
                <option value="" selected></option>
                <option v-for="prodclass in productClasses" :key="prodclass.product_class_no"
                  :value="prodclass.product_class_no">{{ prodclass.product_class_name }}</option>
              </select>

              <label for="form-select">商品TAG編號</label>
              <select class="form-select mb-3" aria-label="Default select example" v-model="prodForm.product_tag_no">
                <option value="" selected></option>
                <option v-for="tag in productTags" :key="tag.product_tag_no" :value="tag.product_tag_no">{{
                  tag.product_tag_name }}</option>
              </select>

              <label for="prodName" class="form-label">商品名稱</label>
              <input type="text" class="form-control mb-3" id="prodName" v-model="prodForm.product_name">

              <label for="ProdInfo" class="form-label">商品簡介</label>
              <textarea class="form-control mb-3" id="ProdInfo" rows="3" v-model="prodForm.product_info"></textarea>

              <label for="ProdLoc" class="form-label">產地</label>
              <input type="text" class="form-control mb-3" id="ProdLoc" v-model="prodForm.product_loc">

              <label for="prodStandard" class="form-label">食材規格</label>
              <textarea class="form-control mb-3" id="prodStandard" rows="3"
                v-model="prodForm.product_standard"></textarea>
              <div class="mb-3">
              </div>
              <label for="prodContent" class="form-label">營養標示</label>
              <textarea class="form-control mb-3" id="prodContent" rows="3" v-model="prodForm.product_content"></textarea>

              <label for="prodPrice" class="form-label">商品價格</label>
              <input type="number" class="form-control mb-3" id="prodPrice" v-model="prodForm.product_price">
              <div class="mb-3">
              </div>
              <label for="prodImgUpload" class="form-label">商品照片</label>
              <input class="form-control mb-3" type="file" id="prodImgUpload" name="prodImgUpload" @change="fileChange">

              <label for="form-select">商品狀態</label>
              <select class="form-select mb-3" aria-label="Default select example">
                <option :value="getStatus(product_status)"></option>
              </select>
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-outline-primary" data-bs-dismiss="modal">回列表</button>
              <button type="button" class="btn btn-primary" data-bs-dismiss="modal" @click="addProdToDB">儲存</button>
            </div>
          </div>
        </div>
      </div>
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
import { toHandlers } from "vue";

export default {
  data() {
    return {
      prodForm: {
        product_no: '',
        product_class_no: '',
        product_tag_no: '',
        product_name: '',
        product_info: '',
        product_loc: '',
        product_standard: '',
        product_content: '',
        product_price: '',
        product_image: '',
        product_status: '',
      },
      products: [],
      productTags: [],
      productClasses: [],
      selectAll: false,
      product_no:null,
      //itemsPerPage: 5,
      //currentPage: 1,
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
    getStatus(status) {
      switch (status) {
        case 1: return '上架'
        case 2: return '下架'
        default: return '未分類'
      }
    },
    fileChange(e) {
      this.prodForm.product_image = e.target.files[0];
    },
    addProdToDB() {
      const addProdForm = new FormData();
      for (const [key, value] of Object.entries(this.prodForm)) {
        addProdForm.append(key, value);
      }
      axios.post(`${import.meta.env.VITE_API_URL}/admin/product/productDataAdd.php`, addProdForm, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
        .then(response => {
          if (!response.data.error) {
            this.products.push(this.prodForm);
            this.prodForm = {
              product_no: '',
              product_class_name: '',
              product_tag_name: '',
              product_name: '',
              product_info: '',
              product_loc: '',
              product_standard: '',
              product_content: '',
              product_price: '',
              product_image: '',
              product_status: '',
            };
          }
        })
        .catch(error => {
          console.error('Error adding product:', error);
        });
    },
    toggleAll() {
      this.products.forEach(product => {
        product.checked = this.selectAll;
      });
    },
    deleteProdToDB(productNo, index) {
      axios.post(`${import.meta.env.VITE_API_URL}/admin/product/productDataDelete.php`, {
        product_no: productNo
      }, {
        headers: {
          'Content-Type': 'application/json',
        }
      })
        .then(response => {
          const confirmed = window.confirm("確定要刪除此商品嗎?");
          if (!response.data.error && confirmed) {
            this.products.splice(index, 1)
          }
        })
        .catch(error => {
          console.error('Error deleting product:', error);
        })
    },
    deleteSelected() {
      const confirmed = window.confirm("確定要刪除選取商品嗎?");
      this.products.forEach((product) => {
        if (product.checked) {
          axios.post(`${import.meta.env.VITE_API_URL}/admin/product/productDataDelete.php`, {
            product_no: product.product_no
          })
            .then(response => {
              if (response.data && !response.data.error && confirmed) {
                this.products = this.products.filter(product => !product.checked);
              }
            })
            .catch(error => {
              console.error('Error deleting product:', error);
            })
        }
      })
    },
    updateProd(productNo){
      console.log(productNo);
    }
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
        this.productClasses = response.data;
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
