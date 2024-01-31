<template>
  <div class="cookbook">
    <div class="bar">
      <SideBar />
    </div>

    <div class="cookbook_container">
      <h1>食譜總覽</h1>
      <div class="cookbook_btn">
        <button type="button" class="btn btn-outline-primary"><i class="fa-solid fa-circle-plus"></i>新增</button>
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
@import "@/assets/scss/_sidebar.scss";
</style>
