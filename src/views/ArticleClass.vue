<template>
  <SideBar />
  <h1>專欄分類</h1>
  <div class="articleclass_btn">
    <button
      type="button"
      class="btn btn-outline-primary prodclassAdd"
      data-bs-toggle="modal"
      data-bs-target="#addClass"
    >
      <i class="fa-solid fa-circle-plus"></i>新增
    </button>
  </div>
  <div class="articles">
    <div
      class="modal fade"
      id="addClass"
      data-bs-backdrop="static"
      data-bs-keyboard="false"
      tabindex="-1"
      aria-labelledby="staticBackdropLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">新增資料</h5>
            <button
              type="button"
              class="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div class="modal-body">
            <div class="mb-3">
              <label for="addClassName" class="form-label">分類名稱</label>
              <input
                type="text"
                class="form-control"
                id="addClassName"
                v-model="faq_class_name"
              />
            </div>
          </div>
          <div class="modal-footer">
            <button
              type="button"
              class="btn btn-outline-primary"
              data-bs-dismiss="modal"
            >
              回列表
            </button>
            <button
              type="button"
              class="btn btn-primary"
              @click="saveNewArticleClass"
              :disabled="isSaving"
            >
              儲存
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- 修改彈窗 -->
    <div
      class="modal fade"
      id="updateClass"
      data-bs-backdrop="static"
      data-bs-keyboard="false"
      tabindex="-1"
      aria-hidden="true"
    >
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">修改資料</h5>
            <button
              type="button"
              class="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div class="modal-body">
            <div class="mb-3">
              <label for="updateClassName" class="form-label">名稱</label>
              <input
                type="text"
                class="form-control"
                id="updateClassName"
                v-model="question_class"
              />
            </div>
          </div>
          <div class="modal-footer">
            <button
              type="button"
              class="btn btn-outline-primary"
              data-bs-dismiss="modal"
            >
              回列表
            </button>
            <button
              type="button"
              class="btn btn-primary"
              @click="updateClassToDB"
            >
              儲存
            </button>
          </div>
        </div>
      </div>
    </div>

    <table
      class="table articlesTable table-bordered border-dark"
    >
      <thead>
        <tr>
          <th scope="col">
            <input
              type="checkbox"
              v-model="selectAll"
              @change="toggleSelect"
            />
          </th>
          <th scope="col">分類編號</th>
          <th scope="col">分類名稱</th>
          <th scope="col">
            <button
              class="btn btn-outline-primary prodDelete"
              @click="deleteSelectedArticleClasses"
            >
              <i class="fa-solid fa-trash-can"></i>刪除
            </button>
          </th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(articleClass, index) in articleClasses" :key="index">
          <td>
            <input
              type="checkbox"
              v-model="selectedArticles"
              :value="articleClass"
            />
          </td>
          <td>{{ articleClass.category_no }}</td>
          <td>{{ articleClass.category_name }}</td>
          <td>
            <button
              type="button"
              class="btn btn-outline-primary"
              data-bs-toggle="modal"
              data-bs-target="#updateClass"
              @click="setSelectedArticleClass(articleClass)"
            >
              <i class="fa-solid fa-pencil"></i>修改
            </button>
            <button
              class="btn btn-outline-primary prodDelete"
              @click="deleteArticleClass(index)"
            >
              <i class="fa-solid fa-trash-can"></i>刪除
            </button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import SideBar from "@/components/SideBar.vue";
import { ref } from 'vue';
import axios from 'axios';

export default {
  data() {
    return {
      selectAll: ref(false),
      selectedArticles: ref([]),
      articleClasses: ref([]),
      faq_class_name: '',
      question_class: '',
      selectedArticleClass: null,
      isSaving: false,
    };
  },
  components: {
    SideBar,
  },
  created() {
    this.fetchArticleClasses();
  },
  methods: {
    toggleSelect() {
      if (this.selectAll) {
        this.selectedArticles = [...this.articleClasses];
      } else {
        this.selectedArticles = [];
      }
    },

    saveNewArticleClass() {
      if (this.isSaving) {
      return; 
    }
      this.isSaving = true;

      const data = {
        category_name: this.faq_class_name,
      };

      axios
        .post(`${import.meta.env.VITE_API_URL}/admin/article/add_article_class.php`, data)
        .then((response) => {
          console.log('新增成功');
          this.faq_class_name = ''; // 清空輸入框
          this.fetchArticleClasses();
          // 關閉模態框
          const modal = new bootstrap.Modal(document.getElementById('addClass'));
          modal.hide();
        })
        .catch((error) => {
          console.error('新增失敗：', error);
        })
        .finally(() => {
      this.isSaving = false;
    });
    },

    updateClassToDB() {
      if (this.selectedArticleClass) {
        const data = {
          category_no: this.selectedArticleClass.category_no,
          category_name: this.question_class,
        };

        axios
          .post(`${import.meta.env.VITE_API_URL}/admin/article/update_article_class.php`, data)
          .then((response) => {
            console.log('修改成功');
            this.question_class = ''; // 清空輸入框
            this.fetchArticleClasses();
            // 關閉模態框
            const modal = new bootstrap.Modal(document.getElementById('updateClass'));
            modal.hide();
          })
          .catch((error) => {
            console.error('修改失敗：', error);
          });
      }
    },

    fetchArticleClasses() {
      axios
        .get(`${import.meta.env.VITE_API_URL}/admin/article/fetch_article_classes.php`)
        .then((response) => {
          console.log('保存成功');
          this.articleClasses = response.data;
        })
        .catch((error) => {
          console.error('Error fetching article classes:', error);
        });
    },

    deleteArticleClass(index) {
      const confirmed = window.confirm('確定要刪除此分類嗎?');
      if (confirmed) {
        const categoryNoToDelete = this.articleClasses[index].category_no;
        axios
          .post(`${import.meta.env.VITE_API_URL}/admin/article/delete_article_class.php`, { categoryNoToDelete })
          .then((response) => {
            this.articleClasses.splice(index, 1);
            console.log('删除成功');
          })
          .catch((error) => {
            console.error('删除出錯：', error);
          });
      }
    },

    deleteSelectedArticleClasses() {
      const confirmed = window.confirm('確定要刪除選中的分類嗎?');
      if (confirmed) {
        const categoryNosToDelete = this.selectedArticles.map((articleClass) => articleClass.category_no);
        axios
          .post(`${import.meta.env.VITE_API_URL}/admin/article/delete_selected_article_classes.php`, { categoryNosToDelete })
          .then((response) => {
            this.selectedArticles.forEach((selectedArticleClass) => {
              const index = this.articleClasses.findIndex((articleClass) => articleClass.category_no === selectedArticleClass.category_no);
              if (index !== -1) {
                this.articleClasses.splice(index, 1);
              }
            });
            this.selectedArticles = [];
            console.log('删除成功');
          })
          .catch((error) => {
            console.error('删除出錯：', error);
          });
      }
    },

    setSelectedArticleClass(articleClass) {
      this.selectedArticleClass = articleClass;
      this.question_class = articleClass.category_name;
    },
  },
};
</script>

<style lang="scss">
@import "@/assets/scss/sidebar.scss";
@import "@/assets/scss/page/_articles.scss";
</style>
