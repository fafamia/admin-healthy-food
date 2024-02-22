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
            <div v-if="newRecipe" class="modal-body">
              <div class="mb-3">
                <label for="form-select">分類</label>
                <select class="form-select" aria-label="Default select example">
                  <option selected></option>
                  <option value="1">素食</option>
                  <option value="2">肉類</option>
                  <option value="3">冷食</option>
                </select>
                <label for="exampleFormControlInput1" class="form-label">食譜名稱</label>
                <input type="text" class="form-control" id="exampleFormControlInput1" v-model="newRecipe.recipe_name">
              </div>

              <label for="exampleFormControlInput2" class="form-label">食譜適用人數</label>
              <input type="text" class="form-control" id="exampleFormControlInput2" v-model="newRecipe.recipe_people">
              <label for="exampleFormControlInput3" class="form-label">食譜製作時間</label>
              <input type="text" class="form-control" id="exampleFormControlInput3" v-model="newRecipe.recipe_time">
              <label for="form-select">專案群組</label>
              <select class="form-select" aria-label="Default select example">
                <option selected></option>

              </select>
              <div class="mb-3">
                <label for="exampleFormControlTextarea1" class="form-label">食譜食材</label>
                <textarea class="form-control" id="exampleFormControlTextarea1" rows="3"
                  v-model="newRecipe.recipe_ingredient"></textarea>
              </div>

              <div class="mb-3">
                <label for="exampleFormControlTextarea2" class="form-label">食譜內容</label>
                <textarea class="form-control" id="exampleFormControlTextarea2" rows="3"
                  v-model="newRecipe.recipe_info"></textarea>
              </div>
              <div class="mb-3">
                <label for="formFile" class="form-label">封面照片</label>
                <input class="form-control" type="file" id="formFile">
              </div>
              <label for="time" class="form-label">建立時間：</label>
              <input style="border: none;" type="text" id="time" v-model="currentDateTime">
              <br>
              <label for="form-select">狀態</label>

              <select class="form-select" aria-label="Default select example" v-model="newRecipe.recipe_status">
                <option selected></option>
                <option value="1">上架</option>
                <option value="2">下架</option>

              </select>


            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-outline-primary" data-bs-dismiss="modal">回列表</button>
              <button type="button" class="btn btn-primary" @click="addRecipe" data-bs-dismiss="modal">新增</button>
            </div>
          </div>
        </div>
      </div>

      <!-- Modal -->
      <div class="modal fade" id="editBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1"
        aria-labelledby="editBackdropLabel" aria-hidden="true">
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="editBackdropLabel">新增資料</h5>
              <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div v-if="recipe" class="modal-body">
              <div class="mb-3">
                <h4>食譜編號 {{ recipe.recipe_no }}</h4>
                <label for="form-select">分類</label>
                <select class="form-select" aria-label="Default select example">
                  <option selected></option>
                  <option value="1">素食</option>
                  <option value="2">肉類</option>
                  <option value="3">冷食</option>
                </select>
                <label for="exampleFormControlInput1" class="form-label">食譜名稱</label>
                <input type="text" class="form-control" id="exampleFormControlInput1" v-model="recipe.recipe_name">

              </div>

              <label for="exampleFormControlInput2" class="form-label">食譜適用人數</label>
              <input type="text" class="form-control" id="exampleFormControlInput2" v-model="recipe.recipe_people">
              <label for="exampleFormControlInput3" class="form-label">食譜製作時間</label>
              <input type="text" class="form-control" id="exampleFormControlInput3" v-model="recipe.recipe_time">
              <label for="form-select">專案群組</label>
              <select class="form-select" aria-label="Default select example">
                <option selected></option>

              </select>
              <div class="mb-3">
                <label for="exampleFormControlTextarea1" class="form-label">食譜食材</label>
                <textarea class="form-control" id="exampleFormControlTextarea1" rows="3"
                  v-model="recipe.recipe_ingredient"></textarea>
              </div>

              <div class="mb-3">
                <label for="exampleFormControlTextarea2" class="form-label">食譜內容</label>
                <textarea class="form-control" id="exampleFormControlTextarea2" rows="3"
                  v-model="recipe.recipe_info"></textarea>
              </div>
              <div class="mb-3">
                <label for="formFile" class="form-label">封面照片</label>
                <br>
                <img :src="recipe.recipe_img" alt="封面照片" class="img-thumbnail" style="max-width: 200px;">
                <input class="form-control" type="file" id="formFile">
              </div>
              <h5>建立時間 {{ recipe.recipe_creation_time }}</h5>

              <label for="form-select">狀態</label>
              <select class="form-select" aria-label="Default select example" v-model="recipe.status">
                <option selected></option>
                <option value="1">上架</option>
                <option value="2">下架</option>

              </select>

            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-outline-primary" data-bs-dismiss="modal">回列表</button>
              <button type="button" class="btn btn-primary" @click="saveRecipe(recipe)"
                data-bs-dismiss="modal">儲存</button>

            </div>
          </div>
        </div>
      </div>

      <!-- Modal -->
      <div class="modal fade" id="deleteBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1"
        aria-labelledby="staticBackdropLabel" aria-hidden="true">
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>

            <h5>是否確定刪除？</h5>

            <div class="modal-footer">
              <button type="button" class="btn btn-outline-primary" data-bs-dismiss="modal">取消</button>
              <button v-if="recipe" type="button" class="btn btn-primary" @click="deleteRecipe($recipeNo)"
                data-bs-dismiss="modal">刪除</button>

            </div>
          </div>
        </div>
      </div>

      <h1>食譜總覽</h1>
      <div class="cookbook_btn">
        <button type="button" class="btn btn-outline-primary" data-bs-toggle="modal" data-bs-target="#staticBackdrop"><i
            class="fa-solid fa-circle-plus"></i>新增</button>
        <input type="search" class="search" placeholder="搜尋" v-model="searchKeyword" />

      </div>
      <table class="table table-hover table-bordered border-dark">
        <thead>
          <tr>
            <th scope="col"><input type="checkbox" v-model="selectAll" @change="toggleSelectAll" /></th>
            <th scope="col">食譜編號</th>
            <th scope="col">食譜名稱</th>
            <th scope="col">發布時間</th>
            <th scope="col">狀態</th>
            <th scope="col"></th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(recipe, index) in recipesFilterByName" :key="index">
            <td scope="row"><input type="checkbox" :checked="selectAll" @change="updateItemSelection(index)" /></td>
            <td>{{ recipe.recipe_no }}</td>
            <td>{{ recipe.recipe_name }}</td>
            <td>{{ recipe.recipe_creation_time }}</td>
            <td>{{ recipe.recipe_status }}</td>
            <td>
              <button type="button" class="btn btn-outline-primary" data-bs-toggle="modal"
                data-bs-target="#deleteBackdrop"><i class="fa-solid fa-trash"></i>刪除</button>
              <button type="button" class="btn btn-outline-primary" @click="editRecipe(index)" data-bs-toggle="modal"
                data-bs-target="#editBackdrop"><i class="fa-solid fa-pen"></i>修改</button>
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
import axios from 'axios';

export default {
  data() {
    return {
      searchKeyword: '',
      selectAll: false,
      recipes: [],
      show: false,
      showEditModal: false,

      formOriginal: {},
      recipe: null,
      newRecipe: {
        recipe_name: '',
        recipe_people: '',
        recipe_time: '',
        recipe_ingredient: '',
        recipe_info: '',
        recipe_status: ''
      },
      currentDateTime: ''

    };
  },
  created() {
    // 在组件创建时调用后端接口获取食谱数据
    this.fetchRecipes();
    this.currentDateTime = this.getCurrentDateTime();
    setInterval(() => {
      this.currentDateTime = this.getCurrentDateTime();
    }, 1000);

  },
  computed: {
    recipesFilterByName() {
      if (this.searchKeyword.length === 0) {
        return this.recipes
      }
      return this.recipes.filter(v => v?.recipe_name?.toLowerCase().includes(this.searchKeyword.toLowerCase()))
    }
  },
  mounted() {

  },
  methods: {
    toggleSelectAll() {
      // 更新下面所有复选框的选中状态为顶部复选框的状态
      for (let i = 0; i < this.items.length; i++) {
        this.items[i].checked = this.selectAll;
      }
    },
    // 点击下面的复选框时触发的方法
    updateItemSelection(index) {
      // 当下面有复选框取消选中时，顶部复选框也取消选中
      if (!this.items[index].checked) {
        this.selectAll = false;
      } else {
        // 当所有下面的复选框都选中时，顶部复选框也选中
        this.selectAll = this.items.every(item => item.checked);
      }
    },
    deleteRecipe(recipeNo) {
      axios.delete(`${import.meta.env.VITE_API_URL}/admin/cookbook/delete_recipe.php?recipe_no=${recipeNo}`)
        .then(response => {
          console.log(response.data);
        })
        .catch(error => {
          console.error('Error deleting recipe:', error);
        });
    },

    editRecipe(index) {
      console.log("修改食譜", index);
      // 获取要编辑的食谱数据
      const recipe = this.recipes[index];
      // 向后端请求单个食谱数据
      this.fetchRecipeOne(recipe.recipe_no)
        .then(data => {
          // 将获取到的数据填充到表单中

          this.formOriginal = { ...data };
          this.recipe = recipe;
          // 打开编辑模态框
          // this.showEditModal = true;

        })
        .catch(error => {
          console.error('Error fetching recipe data:', error);
        });
    },
    showModal() {
      this.show = true;
    },
    fetchRecipeOne(id) {
      // php
      let self = this; // 存储 Vue 实例的引用

      return axios.get(`${import.meta.env.VITE_API_URL}/admin/cookbook/admin_cookbook.php?recipe_id=${id}`)

        .then(function (response) {
          console.log('Response data:', response.data);
          // 将获取到的食谱数据填充到 formEditing 中

          return response.data; // 返回获取到的食谱数据
        })
        .catch(function (error) {
          console.error('Error fetching recipe data:', error);
          throw error;
        });
    },


    fetchRecipes() {
      axios.get(`${import.meta.env.VITE_API_URL}/admin/cookbook/admin_cookbook.php`)
        .then(response => {
          // 将从后端获取到的数据更新到组件的数据中
          this.recipes = response.data;
        })
        .catch(error => {
          console.error('Error fetching recipes:', error);
        });
    },
    // 在编辑食谱后保存数据到数据库
    saveRecipe() {
      axios.post(`${import.meta.env.VITE_API_URL}/admin/cookbook/edit_recipe.php`, {
        recipe_no: this.recipe.recipe_no,
        recipe_name: this.recipe.recipe_name,
        recipe_people: this.recipe.recipe_people,
        recipe_time: this.recipe.recipe_time,
        recipe_ingredient: this.recipe.recipe_ingredient,
        recipe_info: this.recipe.recipe_info,
        recipe_status: this.recipe.recipe_status
      })
        .then(response => {
          console.log(response.data);
          // 如果成功保存，更新前端界面以反映修改
          // 可以重新获取最新的食谱数据或更新前端中的 recipes 数组
          this.fetchRecipes(); // 重新获取最新的食谱数据
          // 或者直接更新前端中的 recipes 数组
          // 找到当前修改的食谱对象在 recipes 数组中的索引
          const index = this.recipes.findIndex(item => item.recipe_no === this.recipe.recipe_no);
          // 更新该食谱对象的数据为最新的数据
          this.recipes.value[index] = this.recipe;
          // 关闭编辑模态框
          this.showEditModal = false;
        })
        .catch(error => {
          console.error('Error saving recipe:', error);
        });
    },


    addRecipe() {
      axios.post(`${import.meta.env.VITE_API_URL}/admin/cookbook/save_recipe.php`, {
        recipe_name: this.newRecipe.recipe_name,
        recipe_people: this.newRecipe.recipe_people,
        recipe_time: this.newRecipe.recipe_time,
        recipe_ingredient: this.newRecipe.recipe_ingredient,
        recipe_info: this.newRecipe.recipe_info,
        recipe_status: this.newRecipe.recipe_status
      })
        .then(response => {
          console.log(response.data);
          this.fetchRecipes();
          // 如果成功保存，关闭模态框或者做其他操作
          this.showEditModal = false; // 关闭编辑模态框
        })
        .catch(error => {
          console.error('Error saving recipe:', error);
        });
    },
    getCurrentDateTime() {
      return new Date().toLocaleString();
    }









  },
  components: {
    SideBar,
    axios
  },

};



</script>


<style lang="scss">
@import "@/assets/scss/_cookbook.scss";
@import "@/assets/scss/_sidebar.scss";
</style>
