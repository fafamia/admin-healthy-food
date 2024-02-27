<template>
  <div>
    <SideBar />
    <h1>專欄總覽</h1>
    <div class="article_btn">
      <button
        type="button"
        class="btn btn-outline-primary productAdd"
        data-bs-toggle="modal"
        data-bs-target="#addArticleModal"
      >
        <i class="fa-solid fa-circle-plus"></i>新增
      </button>
      <input type="search" class="search" placeholder="搜尋" v-model="searchQuery" />
    </div>
    <div class="articles">
      <!-- 新增文章的 Modal -->
<div
  class="modal fade"
  id="addArticleModal"
  data-bs-backdrop="static"
  data-bs-keyboard="false"
  tabindex="-1"
  aria-labelledby="addArticleModalLabel"
  aria-hidden="true"
>
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="addArticleModalLabel">新增資料</h5>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-body">
        <label for="articleTitle" class="form-label">專欄名稱</label>
        <input type="text" class="form-control" id="articleTitle" v-model="currentArticle.article_title" />

        <label for="articleDescription" class="form-label">文章內容</label>
        <textarea class="form-control" id="articleDescription" v-model="currentArticle.article_description"></textarea>

        <label for="coverPhoto" class="form-label">上傳圖片</label>
        <input type="file" class="form-control" id="coverPhoto" @change="handleCoverPhotoChange" />

        <label for="content" class="form-label">刊登時間 : </label>
        <input type="date" id="publishDate" name="publishDate" v-model="currentArticle.publish_date" />
        <br>
        <label for="creationTime" class="form-label">建立時間</label>
        <span id="createDate"> : {{ currentArticle.create_date }}</span><br>

        <label for="articleStatus" class="form-label">狀態</label>
        <select class="form-control" id="articleStatus" v-model="currentArticle.article_status">
          <option value="上架">上架</option>
          <option value="下架">下架</option>
        </select>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-outline-primary" data-bs-dismiss="modal">回列表</button>
        <button type="button" class="btn btn-primary" @click="saveArticle">儲存</button>
      </div>
    </div>
  </div>
</div>


      <!-- 修改文章的 Modal -->
      <div
        class="modal fade"
        id="updateArticleModal"
        data-bs-backdrop="static"
        data-bs-keyboard="false"
        tabindex="-1"
        aria-labelledby="updateArticleModalLabel"
        aria-hidden="true"
      >
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="updateArticleModalLabel">修改資料</h5>
              <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
              <label for="exampleFormControlInput1" class="form-label">專欄名稱</label>
              <input type="text" class="form-control" v-model="currentArticle.article_title" />
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-outline-primary" data-bs-dismiss="modal">取消</button>
              <button type="button" class="btn btn-primary" @click="updateArticle">儲存修改</button>
            </div>
          </div>
        </div>
      </div>

      <!-- 文章列表 -->
      <table class="table articlesTable table-bordered border-dark">
        <thead>
          <tr>
            <th scope="col">
              <input type="checkbox" v-model="selectAll" @change="toggleSelect">
            </th>
            <th scope="col">專欄編號</th>
            <th scope="col">專欄名稱</th>
            <th scope="col">刊登時間</th>
            <th scope="col">狀態</th>
            <th scope="col"></th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(article, index) in filteredArticles" :key="index">
            <td>
              <input type="checkbox" v-model="selectedArticles" :value="article">
            </td>
            <td>{{ article.article_no }}</td>
            <td>{{ article.article_title }}</td>
            <td>{{ article.creation_time }}</td>
            <td>{{ article.article_status }}</td>
            <td>
              <button class="btn btn-outline-primary" @click="updateArticleModal(article)">
                <i class="fa-solid fa-pencil"></i>
                修改
              </button>
              <button class="btn btn-outline-primary prodDelete" @click="deleteArticle(index)">
                <i class="fa-solid fa-trash-can"></i>
                刪除
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- 分頁 -->
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
import { ref, computed } from "vue";
import axios from "axios";

export default {
  data() {
    return {
      searchQuery: "",
      selectAll: ref(false),
      selectedArticles: ref([]),
      articles: [],
      currentArticle: {
        article_no: "",
        article_title: "",
        posting_time: "",
        status: "",
        publish_date: new Date().toISOString().split('T')[0], 
        create_date: new Date().toISOString().split('T')[0], // 格式為 YYYY-MM-DD
      },
      itemsPerPage: 5,
      currentPage: 1,
    };
  },
  components: {
    SideBar,
  },
  created() {
    this.fetchArticles();
  },
  computed: {
    paginatedArticles() {
      const startIndex = (this.currentPage - 1) * this.itemsPerPage;
      const endIndex = startIndex + this.itemsPerPage;
      return this.articles.slice(startIndex, endIndex);
    },
    totalPages() {
      return Math.ceil(this.articles.length / this.itemsPerPage);
    },
    filteredArticles() {
      const filtered = this.articles.filter((article) => {
        return (
          article.article_title.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
          article.creation_time.includes(this.searchQuery) ||
          article.article_no.includes(this.searchQuery) ||
          article.article_status.includes(this.searchQuery)
        );
      });
      return filtered;
    },
  },
  methods: {
    changePage(page) {
      this.currentPage = page;
    },
    deleteArticle(index) {
      const confirmed = window.confirm("確定要刪除此文章嗎?");
      if (confirmed) {
        const startIndex = (this.currentPage - 1) * this.itemsPerPage;
        const actualIndex = startIndex + index;
        const articleToDelete = this.articles[actualIndex];

        axios
          .post(`${import.meta.env.VITE_API_URL}/delete_article.php`, {
            articleToDelete,
          })
          .then((response) => {
            console.log("刪除成功");
            this.fetchArticles();
          })
          .catch((error) => {
            console.error("刪除出錯：", error);
          });
      }
    },
    toggleSelect() {
      if (this.selectAll) {
        this.selectedArticles = [...this.articles];
      } else {
        this.selectedArticles = [];
      }
    },
    handleCoverPhotoChange(event) {
      // 取得選取的文件
      const file = event.target.files[0];
      // 將文件資訊設定到 currentArticle.cover_photo
      this.currentArticle.cover_photo = file;
    },
    saveArticle() {
      const formData = new FormData();
      formData.append("article_title", this.currentArticle.article_title);
      formData.append("article_class", this.currentArticle.article_class);
      formData.append("article_description", this.currentArticle.article_description);
      formData.append("cover_photo", this.currentArticle.cover_photo);
      formData.append("content", this.currentArticle.content);
      formData.append("creation_time", this.currentArticle.creation_time);
      formData.append("article_status", this.currentArticle.article_status);

      axios
        .post(`${import.meta.env.VITE_API_URL}/admin/article/save_article.php`, formData)
        .then((response) => {
          console.log("新增成功");
          this.fetchArticles();
        })
        .catch((error) => {
          console.error("新增出錯：", error);
        })
        .finally(() => {
          this.resetCurrentArticle();
        });
    },
    updateArticle() {
      const formData = new FormData();
      formData.append("article_no", this.currentArticle.article_no);
      formData.append("article_title", this.currentArticle.article_title);
      formData.append("article_class", this.currentArticle.article_class);
      formData.append("article_description", this.currentArticle.article_description);
      formData.append("cover_photo", this.currentArticle.cover_photo);
      formData.append("content", this.currentArticle.content);
      formData.append("creation_time", this.currentArticle.creation_time);
      formData.append("article_status", this.currentArticle.article_status);

      axios
        .post(`${import.meta.env.VITE_API_URL}/update_article.php`, formData)
        .then((response) => {
          console.log("修改成功");
          this.fetchArticles();
        })
        .catch((error) => {
          console.error("修改出錯：", error);
        })
        .finally(() => {
          this.resetCurrentArticle();
        });
    },
    fetchArticles() {
      axios
        .get(`${import.meta.env.VITE_API_URL}/admin/article/articleGet.php`)
        .then((response) => {
          this.articles = response.data;
        })
        .catch((error) => {
          console.error("取得文章列表出錯：", error);
        });
    },
    updateArticleModal(article) {
      this.currentArticle = { ...article };
      $("#updateArticleModal").modal("show");
    },
    resetCurrentArticle() {
      this.currentArticle = {
        article_no: "",
        article_title: "",
        posting_time: "",
        status: "",
      };
    },
  },
};
</script>


<style lang="scss">
@import "@/assets/scss/sidebar.scss";
@import "@/assets/scss/page/_articles.scss";
</style>