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
                <!-- 待思考如何代入商品流水號 -->
                <h4>商品編號 0001</h4>
                <label for="form-select">商品分類</label>
                <select class="form-select" aria-label="Default select example">
                  <option selected></option>
                  <option value="1">調理包</option>
                  <option value="2">蛋、豆</option>
                  <option value="3">雜糧、油品</option>
                  <option value="3">魚、肉</option>
                  <option value="3">蔬菜</option>
                </select>
                <label for="form-select">商品TAG編號</label>
                <select class="form-select" aria-label="Default select example">
                  <option selected></option>
                  <option value="1">#NEW</option>
                  <option value="2">#HOT</option>

                </select>
                <label for="exampleFormControlInput1" class="form-label">商品名稱</label>
                <input type="text" class="form-control" id="exampleFormControlInput1">
              </div>
              <div class="mb-3">
                <label for="exampleFormControlTextarea1" class="form-label">商品簡介</label>
                <textarea class="form-control" id="exampleFormControlTextarea1" rows="3"></textarea>
              </div>
              <label for="exampleFormControlInput2" class="form-label">產地</label>
              <input type="text" class="form-control" id="exampleFormControlInput2">

              <div class="mb-3">
                <label for="exampleFormControlTextarea2" class="form-label">食材規格</label>
                <textarea class="form-control" id="exampleFormControlTextarea2" rows="3"></textarea>
              </div>
              <div class="mb-3">
                <label for="exampleFormControlTextarea3" class="form-label">營養標示</label>
                <textarea class="form-control" id="exampleFormControlTextarea3" rows="3"></textarea>
              </div>
              <label for="exampleFormControlInput3" class="form-label">商品價格</label>
              <input type="number" class="form-control" id="exampleFormControlInput3">
              <div class="mb-3">
                <label for="formFile" class="form-label">商品照片</label>
                <input class="form-control" type="file" id="formFile">
              </div>
              <label for="form-select">商品狀態</label>
              <select class="form-select" aria-label="Default select example">
                <option selected></option>
                <option value="1">上架</option>
                <option value="2">下架</option>

              </select>

            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-outline-primary" data-bs-dismiss="modal">回列表</button>
              <button type="button" class="btn btn-primary">儲存</button>
            </div>
          </div>
        </div>
      </div>
      <table class="table table-hover table-bordered border-dark productTable">
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
      <nav aria-label="Page navigation example">
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
      </nav>
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
    };
  },
  components: {
    SideBar,
  },
  computed: {
    paginatedProducts() {
      const startIndex = (this.currentPage - 1) * this.itemsPerPage;
      const endIndex = startIndex + this.itemsPerPage;
      return this.products.slice(startIndex, endIndex);
    },
    totalPages() {
      return Math.ceil(this.products.length / this.itemsPerPage);
    },

  },
  methods: {
    changePage(page) {
      this.currentPage = page;
    },
    deleteProd(index) {
      const confirmed = window.confirm("確定要刪除此商品嗎?");
      if (confirmed) {
        const startIndex = (this.currentPage - 1) * this.itemsPerPage;
        const actualIndex = startIndex + index;
        this.products.splice(actualIndex, 1);
      }
    },
    toggleSelect() {
      if (this.selectAll) {
        this.selectedProducts = [...this.products];
      } else {
        this.selectedProducts = [];
      }
    },
    getStatus(status){
      switch(status){
        case 1: return '上架'
        case 2: return '下架'
        default: return '未分類'
      }
    }
  },
  created(){
    axios.get(`${import.meta.env.VITE_API_URL}/admin/product/productDataGet.php`)
    .then(response => {
        this.products = response.data.products;
        console.log(response.data.products);
        console.log(this.products);
    })
    .catch(error => {
        console.error('Error fetching products:', error);
    });
  }
};

</script>


<style lang="scss">
@import "@/assets/scss/page/product.scss";
@import "@/assets/scss/sidebar.scss";
</style>
