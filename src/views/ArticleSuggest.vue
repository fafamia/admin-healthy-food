<template>
    <SideBar />
    <h1>推薦專欄</h1>
    <div class="article_btn">
        <button type="button" class="btn btn-outline-primary productAdd" data-bs-toggle="modal"
        data-bs-target="#staticBackdrop">
        <i class="fa-solid fa-circle-plus"></i>新增
        </button>
        <input type="search" class="search" placeholder="搜尋" v-model="searchQuery" />
    </div> 
    <div class="articles">  

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
                <h4>專欄編號 00006</h4>
                <label for="exampleFormControlInput1" class="form-label">專欄名稱</label>
                <input type="text" class="form-control" id="exampleFormControlInput1">
              </div>
              <div class="mb-3">
                <label for="form-select">專欄分類</label>
                <select class="form-select" aria-label="Default select example">
                  <option selected></option>
                  <option value="1">飲食</option>
                  <option value="2">戶外</option>
                  <option value="3">心理</option>
                </select>
              </div>
              <div class="mb-3">
                <label for="exampleFormControlTextarea1" class="form-label">專欄簡介</label>
                <textarea class="form-control" id="exampleFormControlTextarea1" rows="3"></textarea>
              </div>
              <div class="mb-3">
                <label for="formFile" class="form-label">封面照片</label>
                <input class="form-control" type="file" id="formFile">
              </div>
              <div class="mb-3">
                <label for="exampleFormControlTextarea2" class="form-label">內文</label>
                <textarea class="form-control" id="exampleFormControlTextarea2" rows="12"></textarea>
              </div>
              <h5>建立時間 2024/01/01</h5>
              <div class="mb-3">
              <label for="setday" class="setday">刊登時間</label>
              <input type="date" id="setday" name="setday">
            </div>
              <label for="form-select">狀態</label>
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
      <table class="table articlesTable table-bordered border-dark" >
        <thead>
          <tr>
            <th scope="col">
              <input type="checkbox" v-model="selectAll" @change="toggleSelect">
            </th>
            <th scope="col">推薦專欄編號</th>
            <th scope="col">專欄編號</th>
            <th scope="col"><button class="btn btn-outline-primary prodDelete" @click="deleteProd(index)">
                <i class="fa-solid fa-trash-can"></i>
                刪除
              </button></th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(articles, index) in filteredArticles" :key="index">
            <td>
              <input type="checkbox" v-model="selectedArticles" :value="articles">
            </td>
            <td>{{ articles.suggestNumber }}</td>
            <td>{{ articles.articleNumber }}</td>
            <td>
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
</template>

<script>
import SideBar from "@/components/SideBar.vue";
import { ref, computed } from 'vue';

export default {
  data() {
    return {
      searchQuery: '',
      selectAll: ref(false),
      selectedArticles: ref([]),
      articles: ref([
        { suggestNumber: '01', articleNumber: '飲食健康：探索均衡飲食的奧秘'},
        { suggestNumber: '02', articleNumber: '選擇多元食材，追求飲食多樣性'},
        { suggestNumber: '03', articleNumber: '簡單的烹飪，保留食材原味'},
        // 其他文章數據
      ]),
      itemsPerPage: 5,
      currentPage: 1,
    };
  },
  components: {
    SideBar,
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

    //關鍵字搜尋
    filteredArticles() {
      const filtered = this.articles.filter((article) => {
        return (
          article.articleNumber.includes(this.searchQuery) ||
          article.suggestNumber.includes(this.searchQuery) 
          // 添加其他欄位的搜尋條件
        );
      });
      return filtered;
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
        this.articles.splice(actualIndex, 1);
      }
    },

    toggleSelect() {
      if (this.selectAll) {
        this.selectedArticles = [...this.articles];
      } else {
        this.selectedArticles = [];
      }
    }

  },

};
</script>

<style lang="scss">
@import "@/assets/scss/sidebar.scss";
@import "@/assets/scss/page/_articles.scss";
</style>