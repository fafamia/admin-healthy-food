<template>
  <div class="cookbook">
    <div class="bar">
      <SideBar />
    </div>
    <div class="cookbook_container">

      <!-- Modal -->
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
                <h4>分類編號 0001</h4>
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
      <h1>食譜分類</h1>
      <div class="cookbook_btn">
        <button type="button" class="btn btn-outline-primary" data-bs-toggle="modal"
        data-bs-target="#staticBackdrop"><i
            class="fa-solid fa-circle-plus"></i>新增</button>
      </div>
      <table class="table table-hover table-bordered border-dark">
        <thead>
          <tr>
            <th scope="col"><input type="checkbox" /></th>
            <th scope="col">分類編號</th>
            <th scope="col">分類名稱</th>
            <th scope="col"><button type="button" class="btn btn-outline-primary"><i
                  class="fa-solid fa-trash"></i>刪除</button></th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(recipe, index) in recipes" :key="index">
            <td scope="row"><input type="checkbox" /></td>
            <td>{{ recipe.classNumber }}</td>
            <td>{{ recipe.className }}</td>
            <td>
              <button type="button" class="btn btn-outline-primary" @click="deleteRecipe(index)"><i
                  class="fa-solid fa-trash"></i>刪除</button>
              <button type="button" class="btn btn-outline-primary" @click="editRecipe(index)"><i
                  class="fa-solid fa-pen"></i>修改</button>
            </td>
          </tr>
        </tbody>
      </table>
      <div class="page">
      <nav aria-label="Page navigation example">
        <ul class="pagination">
          <li class="page-item">
            <a class="page-link" href="#" aria-label="Previous" style="border: none;">
              <span aria-hidden="true">&laquo;</span>
            </a>
          </li>
          <li class="page-item"><a class="page-link" href="#">1</a></li>
          <li class="page-item"><a class="page-link" href="#">2</a></li>
          <li class="page-item"><a class="page-link" href="#">3</a></li>
          <li class="page-item"><a class="page-link" href="#">4</a></li>
          <li class="page-item"><a class="page-link" href="#">5</a></li>
          <li class="page-item">
            <a class="page-link" href="#" aria-label="Next" style="border: none;">
              <span aria-hidden="true">&raquo;</span>
            </a>
          </li>
        </ul>
      </nav>
    </div>
    </div>
  </div>
</template>

<script>
import SideBar from "@/components/SideBar.vue";

export default {
  data() {
    return {
      recipes: [
        { classNumber: '0001', className: '素食'},
        { classNumber: '0002', className: '肉類'},
        { classNumber: '0003', className: '冷食'}
       
      ]
    };
  },

  methods: {
    deleteRecipe(index) {
      console.log("刪除食譜", index);
    },
    editRecipe(index) {
      console.log("修改食譜", index);
    }
  },
  components: {
    SideBar,
  },

};



</script>


<style lang="scss">
@import "@/assets/scss/_cookbook.scss";
@import "@/assets/scss/_sidebar.scss";</style>
