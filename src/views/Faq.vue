<template>
  <div>
    <SideBar />
    <h1>常見問題總覽</h1>
    <div class="article_btn">
      <button
        type="button"
        class="btn btn-outline-primary productAdd"
        data-bs-toggle="modal"
        data-bs-target="#staticBackdrop"
        @click="remove"
      >
        <i class="fa-solid fa-circle-plus"></i>新增
      </button>
      <input type="search" class="search" placeholder="搜尋" v-model="searchQuery" />
    </div>
    <div class="articles">
      <!-- 新增和修改的 Modal 內容 -->
      <div
        class="modal fade"
        id="staticBackdrop"
        data-bs-backdrop="static"
        data-bs-keyboard="false"
        tabindex="-1"
        aria-labelledby="staticBackdropLabel"
        aria-hidden="true"
      >
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="staticBackdropLabel">
                <h4>新增資料</h4>
              </h5>
              <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
              <div class="mb-3">
                <label for="form-select">分類</label>
                <select v-model="currentFaq.faq_class" class="form-select" aria-label="Default select example">
                  <option v-for="(classItem, index) in faqClasses" :key="index" :value="classItem.value">
                    {{ classItem.label }}
                  </option>
                </select>
              </div>
              <div class="mb-3">
                <label for="exampleFormControlTextarea1" class="form-label">問題</label>
                <textarea v-model="currentFaq.question" class="form-control" id="exampleFormControlTextarea1" rows="6"></textarea>
              </div>
              <div class="mb-3">
                <label for="exampleFormControlTextarea2" class="form-label">回答</label>
                <textarea v-model="currentFaq.ans" class="form-control" id="exampleFormControlTextarea2" rows="6"></textarea>
              </div>
              <div class="mb-3">
                <label for="exampleFormControlTextarea2" class="form-label">關鍵字</label>
                <textarea v-model="currentFaq.key" class="form-control" id="exampleFormControlTextarea2" rows="3"></textarea>
              </div>
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-outline-primary" data-bs-dismiss="modal">回列表</button>
              <button type="button" class="btn btn-primary" @click="saveFaq">儲存</button>
            </div>
          </div>
        </div>
      </div>
      <div class="modal fade" id="updateClass" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1"
                aria-hidden="true">
                <div class="modal-dialog">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title">修改資料</h5>
                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div class="modal-body">
                        <div class="mb-3">
                            <label for="form-select">分類</label>
                            <select v-model="currentFaq.faq_class" class="form-select" aria-label="Default select example">
                                <option v-for="(classItem, index) in faqClasses" :key="index" :value="classItem.value">
                                    {{ classItem.label }}
                                </option>
                            </select>
                        </div>
                      <div class="mb-3">
                          <label for="exampleFormControlTextarea1" class="form-label">問題</label>
                          <textarea v-model="currentFaq.question" class="form-control" id="exampleFormControlTextarea1" rows="6"></textarea>
                      </div>
                      <div class="mb-3">
                        <label for="exampleFormControlTextarea2" class="form-label">回答</label>
                        <textarea v-model="currentFaq.ans" class="form-control" id="exampleFormControlTextarea2" rows="6"></textarea>
                      </div>
                      <div class="mb-3">
                        <label for="exampleFormControlTextarea2" class="form-label">關鍵字</label>
                        <textarea v-model="currentFaq.key" class="form-control" id="exampleFormControlTextarea2" rows="3"></textarea>
                      </div>
                      <!-- 其他欄位... -->
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-outline-primary" data-bs-dismiss="modal">回列表</button>
                            <button type="button" class="btn btn-primary" data-bs-dismiss="modal"
                                @click="updateClassToDB">儲存</button>
                        </div>
                    </div>
                </div>
      </div>

      <table class="table articlesTable table-bordered border-dark">
        <thead>
          <tr>
            <th scope="col">
              <input type="checkbox" v-model="selectAll" @change="toggleSelect" />
            </th>
            <th scope="col">問題編號</th>
            <th scope="col">問題</th>
            <th scope="col">分類</th>
            <th scope="col">
              <button class="btn btn-outline-primary prodDelete" @click="deleteProd(index)">
                <i class="fa-solid fa-trash-can"></i>
                刪除
              </button>
            </th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(faq, index) in paginatedFaq" :key="index">
            <td>
              <input type="checkbox" v-model="selectedFaq" :value="faq" />
            </td>
            <td>{{ faq.faq_no }}</td>
            <td>{{ faq.question }}</td>
            <!-- <td>{{ faqClasses.find(item => item.value === faq.faq_class)?.label }}</td> -->
            <td v-if="faq.faq_class==1">付款問題</td>
            <td v-if="faq.faq_class==2">運送問題</td>
            <td v-if="faq.faq_class==3">食材問題</td>

            <td>
              <button type="button" class="btn btn-outline-primary" data-bs-toggle="modal"
                  data-bs-target="#updateClass" @click="updateClass(faq)">
                  <i class="fa-solid fa-pencil"></i>
                  修改
              </button>
              <button class="btn btn-outline-primary prodDelete" @click="deleteProd(index)">
                <i class="fa-solid fa-trash-can"></i>
                刪除
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <nav aria-label="Page navigation example">
      <ul class="pagination">
        <li class="page-item" @click="currentPage > 1 ? currentPage-- : null">
          <a class="page-link" href="#" aria-label="Previous">
            <span aria-hidden="true">&lsaquo;</span>
          </a>
        </li>
        <li v-for="page in totalPages" :key="page" class="page-item" :class="{ 'active': page === currentPage }">
          <a class="page-link" href="#" @click="changePage(page)">{{ page }}</a>
        </li>
        <li class="page-item" @click="currentPage < totalPages ? currentPage++ : null">
          <a class="page-link" href="#" aria-label="Next">
            <span aria-hidden="true">&rsaquo;</span>
          </a>
        </li>
      </ul>
    </nav>
  </div>
</template>

<script>
import SideBar from "@/components/SideBar.vue";
import { ref, computed } from 'vue';
import axios from 'axios';

export default {
  data() {
    return {
      searchQuery: '',
      selectAll: ref(false),
      selectedFaq: ref([]),
      faq: [],
      itemsPerPage: 5,
      currentPage: 1,
      currentFaq: {
        faq_no: '',
        question_class: '',
        ans: '',
        question: '',
        key: '',
      },
      faqClasses: [
        { label: '付款問題', value: 1 },
        { label: '運送問題', value: 2 },
        { label: '食材問題', value: 3 },
      ],
      faq_class_mapping: {
         1: "付款問題",
         2: "運送問題",
         3: "食材問題",
      },
      originalFaqClass: '',
    };
  },
  created(){
    this.fetchFaq();
  },
  components: {
    SideBar,
  },
  computed: {
    paginatedFaq() {
      const startIndex = (this.currentPage - 1) * this.itemsPerPage;
      const endIndex = startIndex + this.itemsPerPage;
      return this.faq.slice(startIndex, endIndex);
    },
    totalPages() {
      return Math.ceil(this.faq.length / this.itemsPerPage);
    },
  },
  methods: {
    remove(){
      this.currentFaq.question = ''; 
    },
    changePage(page) {
      this.currentPage = page;
    },
    deleteProd(index) {
      const confirmed = window.confirm("確定要刪除此商品嗎?");
      if (confirmed) {
        const faqToDelete = this.faq[index].faq_no;
        axios.post(`${import.meta.env.VITE_API_URL}/admin/faq/delete_faq.php`, { faqToDelete })
          .then(response => {
            this.faq.splice(index, 1);
            console.log('删除成功');
            this.fetchFaq();
          })
          .catch(error => {
            console.error('删除出錯：', error);
          });
      }
    },

    toggleSelect() {
      if (this.selectAll) {
        this.selectedFaq = [...this.faq];
      } else {
        this.selectedFaq = [];
      }
    },

    saveFaq() {
      console.log('Current FAQ Class:', this.currentFaq.faq_class);

     
      const mappedFaqClass = this.faq_class_mapping[this.currentFaq.faq_class];

      const formData = new FormData();
      formData.append('question_class', mappedFaqClass);
      formData.append('question', this.currentFaq.question);
      formData.append('ans', this.currentFaq.ans);
      formData.append('key', this.currentFaq.key);

      axios
        .post(`${import.meta.env.VITE_API_URL}/admin/faq/save_faq.php`, formData)
        .then((response) => {
          console.log('保存成功');
          this.currentFaq.faq_class = '';
          this.currentFaq.question = '';
          this.currentFaq.ans = '';
          this.currentFaq.key = '';
          this.fetchFaq();
        })
        .catch((error) => {
          console.error('保存出错：', error);
        });
    },

    fetchFaq() {  //匯入
      axios.get(`${import.meta.env.VITE_API_URL}/admin/faq/admin_faq.php`)
            .then(response => {
              console.log('保存成功');
                this.faq = response.data;
            })
            .catch(error => {
                console.error('Error fetching faq:', error);
            });
    },

    deleteThisFaq(index) {
            const faqToDelete = this.faq[index].faq_no;
            axios.post(`${import.meta.env.VITE_API_URL}/admin/faq/delete_faq.php`, { faqToDelete })
            .then(response => {
                this.faq.splice(index, 1);
                console.log('删除成功');
                this.fetchFaq();
            })
            .catch(error => {
                console.error('删除出錯：', error);
            });
    },

    updateClass(faq) {
      if (faq && faq.faq_class) {
        this.currentFaq.faq_class = faq.faq_class;
        }
        this.currentFaq.faq_no = faq.faq_no;
        this.currentFaq.question = faq.question; 
        this.currentFaq.ans = faq.ans; 
        this.currentFaq.key = faq.key; 
    },

    updateClassToDB() {
          axios.post(`${import.meta.env.VITE_API_URL}/admin/faq/faqUpdate.php`, {
            faq_no: this.currentFaq.faq_no,
            faq_class: this.currentFaq.faq_class,
            question: this.currentFaq.question,
            ans: this.currentFaq.ans,
            key: this.currentFaq.key
          })
          .then(response => {
            if (!response.data.error) {
              const index = this.faq.findIndex(faq => faq.faq_no === this.currentFaq.faq_no);
              if (index !== -1) {
                this.faq[index].faq_class = this.currentFaq.faq_class;  
                this.faq[index].question = this.currentFaq.question;
                this.faq[index].ans = this.currentFaq.ans;  
                this.faq[index].key = this.currentFaq.key;  
              }
              this.currentFaq = {
                faq_no: '',
                faq_class: '',
                ans: '',
                question: '',
                key: ''
              };
               // 强制更新组件
            this.$forceUpdate();
            }
          })
          .catch(error => {
              console.error('Error updating faq:', error);
          });
    },
    
    },
  };
</script>

<style lang="scss">
@import "@/assets/scss/sidebar.scss";
@import "@/assets/scss/page/_articles.scss";
</style>
