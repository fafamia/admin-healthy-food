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
      <table class="table table-hover table-bordered border-dark table-sm">
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
          <tr v-for="(product, index) in paginatedProds" :key="product.product_no">
            <td>
              <input type="checkbox" v-model="product.checked">
            </td>
            <td>{{ product.product_no }}</td>
            <td>{{ product.product_class_name }}</td>
            <td>{{ product.product_name }}</td>
            <td>{{ product.product_price }}</td>
            <td>{{ productStatus[product.product_status] }}</td>
            <td class="d-flex">
              <button class="btn btn-outline-primary" data-bs-toggle="modal" data-bs-target="#updateProd"
                @click="updateProd(product.product_no)">
                <i class="fa-solid fa-pencil"></i>修改
              </button>
              <button class="btn btn-outline-primary prodDelete" @click="deleteProdToDB(product.product_no, index)">
                <i class="fa-solid fa-trash-can"></i>刪除
              </button>
            </td>
          </tr>
        </tbody>
      </table>
      <!-- 頁碼 -->
      <nav aria-label="Page navigation example">
        <ul class="pagination">
          <li class="page-item" :class="{ 'disabled': currentPage === 1 }">
            <button class="page-link btn btn-outline-primary bg-transparent border-0" aria-label="Previous"
              @click="prevPage">
              <span aria-hidden="true">&laquo;</span>
            </button>
          </li>
          <li v-for="page in totalPages" class="page-item" :key="page">
            <button type="button" class="btn btn-outline-primary pageLink" @click="goToPage(page)">{{ page }}</button>
          </li>
          <li class="page-item" :class="{ 'disabled': currentPage === totalPages }">
            <button class="page-link btn-outline-primary bg-transparent border-0" aria-label="Next" @click="nextPage">
              <span aria-hidden="true">&raquo;</span>
            </button>
          </li>
        </ul>
      </nav>
      <!-- 新增彈窗 -->
      <div class="modal fade" id="addprod" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1"
        aria-hidden="true">
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="staticBackdropLabel">新增資料</h5>
              <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
              <label for="product_no" class="form-label">商品編號</label>
              <p>{{ prodForm.product_no }}</p>

              <label for="product_class_no">商品分類</label>
              <select class="form-select mb-3" aria-label="Default select example" id="product_class_no"
                name="product_class_no" v-model="prodForm.product_class_no">
                <option value="" selected></option>
                <option v-for="prodclass in productClasses" :key="prodclass.product_class_no"
                  :value="prodclass.product_class_no">{{ prodclass.product_class_name }}</option>
              </select>

              <label for="product_tag_no">商品TAG編號</label>
              <select class="form-select mb-3" aria-label="Default select example" id="product_tag_no"
                name="product_tag_no" v-model="prodForm.product_tag_no">
                <option value="" selected></option>
                <option v-for="tag in productTags" :key="tag.product_tag_no" :value="tag.product_tag_no">{{
                  tag.product_tag_name }}</option>
              </select>

              <label for="product_name" class="form-label">商品名稱</label>
              <input type="text" class="form-control mb-3" id="product_name" name="product_name"
                v-model="prodForm.product_name">

              <label for="product_info" class="form-label">商品簡介</label>
              <textarea class="form-control mb-3" id="product_info" name="product_info" rows="3"
                v-model="prodForm.product_info"></textarea>

              <label for="product_loc" class="form-label">產地</label>
              <input type="text" class="form-control mb-3" id="product_loc" name="product_loc"
                v-model="prodForm.product_loc">

              <label for="product_standard" class="form-label">食材規格</label>
              <textarea class="form-control mb-3" id="product_standard" name="product_standard" rows="3"
                v-model="prodForm.product_standard"></textarea>
              <div class="mb-3">
              </div>
              <label for="product_content" class="form-label">營養標示</label>
              <textarea class="form-control mb-3" id="product_content" name="product_content" rows="3"
                v-model="prodForm.product_content"></textarea>

              <label for="product_price" class="form-label">商品價格</label>
              <input type="number" class="form-control mb-3" id="product_price" name="product_price"
                v-model="prodForm.product_price">
              <div class="mb-3">
              </div>
              <label for="product_img" class="form-label">商品照片</label>
              <input :key="changeKey" class="form-control mb-3" type="file" id="product_img" name="product_img"
                @change="fileChange">

              <label for="product_status">商品狀態</label>
              <select class="form-select mb-3" aria-label="Default select example" id="product_status"
                name="product_status" v-model="prodForm.product_status"
                @change="prodForm.product_status = $event.target.value">
                <option value="" selected></option>
                <option v-for="(status, index) in productStatus" :key="index" :value="index">{{ status }}</option>
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
      <div class="modal fade" id="updateProd" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1"
        aria-hidden="true">
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title">修改資料</h5>
              <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"
                @click="clearForm"></button>
            </div>
            <div class="modal-body">
              <label for="product_no" class="form-label">商品編號</label>
              <p>{{ prodForm.product_no }}</p>

              <label for="product_class_no">商品分類</label>
              <select class="form-select mb-3" aria-label="Default select example" id="product_class_no"
                name="product_class_no" v-model="prodForm.product_class_no">
                <option value="" selected></option>
                <option v-for="prodclass in productClasses" :key="prodclass.product_class_no"
                  :value="prodclass.product_class_no">{{ prodclass.product_class_name }}</option>
              </select>

              <label for="product_tag_no">商品TAG編號</label>
              <select class="form-select mb-3" aria-label="Default select example" id="product_tag_no"
                name="product_tag_no" v-model="prodForm.product_tag_no">
                <option value="" selected></option>
                <option v-for="tag in productTags" :key="tag.product_tag_no" :value="tag.product_tag_no">{{
                  tag.product_tag_name }}</option>
              </select>

              <label for="product_name" class="form-label">商品名稱</label>
              <input type="text" class="form-control mb-3" id="product_name" name="product_name"
                v-model="prodForm.product_name">

              <label for="product_info" class="form-label">商品簡介</label>
              <textarea class="form-control mb-3" rows="3" id="product_info" name="product_info"
                v-model="prodForm.product_info"></textarea>

              <label for="product_loc" class="form-label">產地</label>
              <input type="text" class="form-control mb-3" id="product_loc" name="product_loc"
                v-model="prodForm.product_loc">

              <label for="product_standard" class="form-label">食材規格</label>
              <textarea class="form-control mb-3" rows="3" id="product_standard" name="product_standard"
                v-model="prodForm.product_standard"></textarea>
              <div class="mb-3">
              </div>
              <label for="product_content" class="form-label">營養標示</label>
              <textarea class="form-control mb-3" id="product_content" name="product_content" rows="3"
                v-model="prodForm.product_content"></textarea>

              <label for="product_price" class="form-label">商品價格</label>
              <input type="number" class="form-control mb-3" id="product_price" name="product_price"
                v-model="prodForm.product_price">
              <div class="mb-3">
              </div>
              <label for="product_img" class="form-label">商品照片</label>{{ prodForm.product_img.name || prodForm.product_img}}
              <input :key="changeKey" class="form-control mb-3" type="file" id="product_img" name="product_img" @change="fileChange">
                <input type="hidden" name="image" v-model="prodForm.product_img">
              <label for="product_status">商品狀態</label>
              <select class="form-select mb-3" aria-label="Default select example" id="product_status"
                name="product_status" v-model="prodForm.product_status"
                @change="prodForm.product_status = $event.target.value">
                <option value="" selected></option>
                <option v-for="(status, index) in productStatus" :key="index" :value="index">{{ status }}</option>
              </select>
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-outline-primary" data-bs-dismiss="modal"
                @click="clearForm">回列表</button>
              <button type="button" class="btn btn-primary" data-bs-dismiss="modal" @click="updateProdToDB">儲存</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import SideBar from "@/components/SideBar.vue";
import axios from "axios";

export default {
  data() {
    return {
      changeKey: 0,
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
        product_img: '',
        product_status: 0,
      },
      products: [],
      productTags: [],
      productClasses: [],
      productStatus: {
        '0': '上架',
        '1': '下架',
      },
      selectAll: false,
      productsPerPage: 6,
      currentPage: 1,
    };
  },
  created() {
    this.fetchProductData();
  },
  components: {
    SideBar,
  },
  computed: {
    totalPages() {
      return Math.ceil(this.products.length / this.productsPerPage);
    },
    paginatedProds() {
      const start = (this.currentPage - 1) * this.productsPerPage;
      const end = start + this.productsPerPage;
      return this.products.slice(start, end)
    }
  },
  methods: {
    fetchProductData() {
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
          this.productClasses = response.data.prodclass;
        })
        .catch(error => {
          console.error('Error fetching productClasses:', error);
        });
    },
    fileChange(e) {
      this.prodForm.product_img = e.target.files[0];
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
            this.fetchProductData();
            this.clearForm();
          }
        })
        .catch(error => {
          console.error('Error adding product:', error);
        });
    },
    toggleAll() {
      this.paginatedProds.forEach(product => {
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
    updateProd(productNo) {
      //array.find會比對陣列中的元素，傳回第一個找到的值
      const product = this.products.find(p => p.product_no === productNo);
      if (product) {
        this.prodForm = { ...product };
      }
    },
    updateProdToDB() {
      const updateProdForm = new FormData();
      //把prodForm從 object 轉成 array[key,value]的格式
      for (const [key, value] of Object.entries(this.prodForm)) {
        if (key == 'product_img' && typeof value === 'string'){
          //使用FormData object的method 'appened'把資料送回去
          updateProdForm.append('image',value)
        }else{
          updateProdForm.append(key, value);
        }
      }
      //axios.post(URL,Data,Headers)
      axios.post(`${import.meta.env.VITE_API_URL}/admin/product/productDataUpdate.php`,
        updateProdForm,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        })
        .then(response => {
          if (!response.data.error) {
            const index = this.products.findIndex(product => product.product_no === this.prodForm.product_no);
            if (index !== -1) {
              this.fetchProductData();
              this.clearForm();
            }
          }
        })
        .catch(error => {
          console.error('Error updateing product:', error);
        });
    },
    clearForm() {
      this.prodForm = {
        product_class_name: '',
        product_tag_name: '',
        product_name: '',
        product_info: '',
        product_loc: '',
        product_standard: '',
        product_content: '',
        product_price: '',
        product_img: '',
        product_status: '',
      };
      this.changeKey += 1
    },
    nextPage() {
      if (this.currentPage < this.totalPages) {
        this.currentPage += 1;
      }
    },
    prevPage() {
      if (this.currentPage > 1) {
        this.currentPage -= 1;
      }
    },
    goToPage(pageNumber) {
      if (pageNumber >= 1 && pageNumber <= this.totalPages) {
        this.currentPage = pageNumber;
      }
    },
  }
};
</script>

<style lang="scss">@import "@/assets/scss/page/product.scss";
@import "@/assets/scss/sidebar.scss";</style>
