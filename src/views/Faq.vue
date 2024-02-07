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
                <h4 v-if="!currentFaq.faq_no">新增資料</h4>
                <h4 v-else>問題編號 {{ currentFaq.faq_no }}</h4>
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
            <td>{{ faq_class_mapping[faq.faq_class] }}</td>
            <td>
              <button class="btn btn-outline-primary" @click="editFaq(index)">
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
        faq_class: '',
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
    };
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
    //關鍵字搜尋
    // filteredFaq() {
    //   if (!this.faq) {
    //     return [];
    //   }

    //   const filtered = this.faq.filter((faq) => {
    //     return (
    //       faq.faq_no.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
    //       faq.question.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
    //       faq.faq_class.toLowerCase().includes(this.searchQuery.toLowerCase())
    //     );
    //   });
    //   return filtered;
    // },
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
        this.faq.splice(actualIndex, 1);
      }
    },

    toggleSelect() {
      if (this.selectAll) {
      this.selectedFaq = [...this.faq];
      } else {
        this.selectedFaq = [];
      }
    },

    //連接php
    fetchDataFromBackend() {
  axios.get(`${import.meta.env.VITE_API_URL}/admin_faq.php`)
    .then(response => {
      console.log(response.data);
      // 使用 $set 确保 this.faq 是响应式的数组
      this.faq = response.data.map(faq => {
        return {
          ...faq,
          faq_class: faq.faq_class === '付款問題' ? 1 : faq.faq_class,
          // 其他欄位照需求處理
        };
      });
    })
    .catch(error => {
      console.error('Error fetching data from backend:', error);
    });
},

    saveFaq() {
      if (!this.currentFaq.faq_no) {
        // 新增
        const newFaq = {
          ...this.currentFaq,
          faq_no: this.faq.length + 1, // 可以自行調整如何生成新的流水號
        };
        this.faq.push(newFaq);
      } else {
        // 修改
        const index = this.faq.findIndex((item) => item.faq_no === this.currentFaq.faq_no);
        if (index !== -1) {
          this.$set(this.faq, index, { ...this.currentFaq });
        }
      }
      // 清空 currentFaq
      this.currentFaq = {
        faq_no: "",
        faq_class: "",
        ans: "",
        question: "",
        key: "",
      };
      // 關閉 Modal
      $("#staticBackdrop").modal("hide");
    },

    // 編輯 FAQ
    editFaq(index) {
      this.currentFaq = { ...this.faq[index] };
      $('#staticBackdrop').modal('show');
    },

  },

  mounted() {
    this.fetchDataFromBackend();  // Call the method on component mount
    axios.get('/healthy-food-php/admin_faq')
    .then(response => {
      this.faq = response.data;
    })
    .catch(error => {
      console.error('Error fetching data from backend:', error);
    });
  },

};
</script>

<style lang="scss">
@import "@/assets/scss/sidebar.scss";
@import "@/assets/scss/page/_articles.scss";
</style>