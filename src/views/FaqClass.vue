<template>
    <SideBar />
    <h1>常見問題分類</h1>
    <div class="articleclass_btn">
        <button type="button" class="btn btn-outline-primary productAdd" data-bs-toggle="modal"
        data-bs-target="#staticBackdrop">
        <i class="fa-solid fa-circle-plus"></i>新增
        </button>
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
                <h4>分類編號 0004</h4>
                <label for="exampleFormControlInput1" class="form-label">分類名稱</label>
                <input type="text" class="form-control" id="exampleFormControlInput1">
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
            <th scope="col">分類編號</th>
            <th scope="col">分類名稱</th>
            <th scope="col"><button class="btn btn-outline-primary prodDelete" @click="deleteProd(index)">
                <i class="fa-solid fa-trash-can"></i>
                刪除
              </button></th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(articleclass, index) in articleclass" :key="index">
            <td>
              <input type="checkbox" v-model="selectedArticles" :value="articles">
            </td>
            <td>{{ articleclass.classNumber }}</td>
            <td>{{ articleclass.className }}</td>
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

</template>

<script>
import SideBar from "@/components/SideBar.vue";
import { ref, computed } from 'vue';

export default {
  data() {
    return {
      selectAll: ref(false),
      selectedArticles: ref([]),
      articleclass: ref([
        { classNumber: '0001', className: '付款問題'},
        { classNumber: '0002', className: '運送問題'},
        { classNumber: '0003', className: '食材問題'},
        // 其他文章數據
      ]),
      itemsPerPage: 5,
      currentPage: 1,
    };
  },
  components: {
    SideBar,
  },
};
</script>

<style lang="scss">
@import "@/assets/scss/sidebar.scss";
@import "@/assets/scss/page/_articles.scss";
</style>