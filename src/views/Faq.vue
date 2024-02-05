<template>
    <SideBar />
    <h1>常見問題總覽</h1>
    <div class="article_btn">
        <button type="button" class="btn btn-outline-primary productAdd" data-bs-toggle="modal"
        data-bs-target="#staticBackdrop">
        <i class="fa-solid fa-circle-plus"></i>新增
        </button>
        <input type="search" class="search" placeholder="搜尋" />
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
                <h4>問題編號 00006</h4>
              </div>
              <div class="mb-3">
                <label for="form-select">分類</label>
                <select class="form-select" aria-label="Default select example">
                  <option selected></option>
                  <option value="1">付款問題</option>
                  <option value="2">運送問題</option>
                  <option value="3">食材問題</option>
                </select>
              </div>
              <div class="mb-3">
                <label for="exampleFormControlTextarea1" class="form-label">問題</label>
                <textarea class="form-control" id="exampleFormControlTextarea1" rows="6"></textarea>
              </div>
              <div class="mb-3">
                <label for="exampleFormControlTextarea2" class="form-label">回答</label>
                <textarea class="form-control" id="exampleFormControlTextarea2" rows="6"></textarea>
              </div>
              <div class="mb-3">
                <label for="exampleFormControlTextarea2" class="form-label">關鍵字</label>
                <textarea class="form-control" id="exampleFormControlTextarea2" rows="3"></textarea>
              </div>

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
            <th scope="col">問題編號</th>
            <th scope="col">問題</th>
            <th scope="col">分類</th>
            <th scope="col"><button class="btn btn-outline-primary prodDelete" @click="deleteProd(index)">
                <i class="fa-solid fa-trash-can"></i>
                刪除
              </button></th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(faq, index) in faq" :key="index">
            <td>
              <input type="checkbox" v-model="selectedFaq" :value="faq">
            </td>
            <td>{{ faq.faqNumber }}</td>
            <td>{{ faq.faqName }}</td>
            <td>{{ faq.class }}</td>
            <td>
              <button class="btn btn-outline-primary">
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
</template>

<script>
import SideBar from "@/components/SideBar.vue";
import { ref, computed } from 'vue';

export default {
  data() {
    return {
      selectAll: ref(false),
      selectedFaq: ref([]),
      faq: ref([
        { faqNumber: '00001', faqName: '如何付款?', class: '付款問題' },
        { faqNumber: '00002', faqName: '運費怎麼計算？可以合併運費嗎？', class: '付款問題' },
        { faqNumber: '00003', faqName: '食材的新鮮程度如何保證？', class: '食材問題' },
        { faqNumber: '00004', faqName: '是否提供有機食材？', class: '食材問題' },
        { faqNumber: '00005', faqName: '是否支援特定時段的配送服務？', class: '運送問題' },
      ]),
      itemsPerPage: 5,
      currentPage: 1,
    };
  },
  components: {
    SideBar,
  },
  computed: {
    paginatedFaq() {
      const startIndex = (this.currentPage - 1) * this.itemsPerPage;
      const endIndex = startIndex + this.itemsPerPage;
      return this.articles.slice(startIndex, endIndex);
    },
    totalPages() {
      return Math.ceil(this.faq.length / this.itemsPerPage);
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