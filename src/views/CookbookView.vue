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
                <h4>食譜編號 0001</h4>
                <label for="form-select">分類</label>
                <select class="form-select" aria-label="Default select example">
                  <option selected></option>
                  <option value="1">素食</option>
                  <option value="2">肉類</option>
                  <option value="3">冷食</option>
                </select>
                <label for="exampleFormControlInput1" class="form-label">食譜名稱</label>
                <input type="text" class="form-control" id="exampleFormControlInput1">
              </div>
              
              <label for="exampleFormControlInput2" class="form-label">食譜適用人數</label>
              <input type="text" class="form-control" id="exampleFormControlInput2">
              <label for="exampleFormControlInput3" class="form-label">食譜製作時間</label>
              <input type="text" class="form-control" id="exampleFormControlInput3">
              <label for="form-select">專案群組</label>
                <select class="form-select" aria-label="Default select example">
                  <option selected></option>
                  
                </select>
                <div class="mb-3">
                <label for="exampleFormControlTextarea1" class="form-label">食譜食材</label>
                <textarea class="form-control" id="exampleFormControlTextarea1" rows="3"></textarea>
              </div>

              <div class="mb-3">
                <label for="exampleFormControlTextarea2" class="form-label">食譜內容</label>
                <textarea class="form-control" id="exampleFormControlTextarea2" rows="3"></textarea>
              </div>
              <div class="mb-3">
                <label for="formFile" class="form-label">封面照片</label>
                <input class="form-control" type="file" id="formFile">
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

      <h1>食譜總覽</h1>
      <div class="cookbook_btn">
        <button type="button" class="btn btn-outline-primary" data-bs-toggle="modal"
        data-bs-target="#staticBackdrop"><i
            class="fa-solid fa-circle-plus"></i>新增</button>
        <input type="search" class="search" placeholder="搜尋" />

      </div>
      <table class="table table-hover table-bordered border-dark">
        <thead>
          <tr>
            <th scope="col"><input type="checkbox" /></th>
            <th scope="col">食譜編號</th>
            <th scope="col">食譜名稱</th>
            <th scope="col">發布時間</th>
            <th scope="col">狀態</th>
            <th scope="col"><button type="button" class="btn btn-outline-primary"><i
                  class="fa-solid fa-trash"></i>刪除</button></th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(recipe, index) in recipes" :key="index">
            <td scope="row"><input type="checkbox" /></td>
            <td>{{ recipe.recipeNumber }}</td>
            <td>{{ recipe.recipeName }}</td>
            <td>{{ recipe.publishDate }}</td>
            <td>{{ recipe.status }}</td>
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
        { recipeNumber: '00001', recipeName: '素食彩虹沙拉', publishDate: '2023/12/31', status: '上架' },
        { recipeNumber: '00002', recipeName: '烤鮭魚配檸檬奶油蔬菜', publishDate: '2023/12/31', status: '上架' },
        { recipeNumber: '00003', recipeName: '藜麥香草雞胸沙拉', publishDate: '2023/12/31', status: '上架' },
        { recipeNumber: '00004', recipeName: '紅酒番茄雞腿燉飯', publishDate: '2024/01/02', status: '下架' }
      ],
      show: false
    };
  },
 

  methods: {
    deleteRecipe(index) {
      console.log("刪除食譜", index);
    },
    editRecipe(index) {
      console.log("修改食譜", index);
    },
    showModal() {
      this.show = true;
    }
  },
  components: {
    SideBar,
  },

};



</script>


<style lang="scss">
@import "@/assets/scss/_cookbook.scss";
@import "@/assets/scss/_sidebar.scss";
</style>
