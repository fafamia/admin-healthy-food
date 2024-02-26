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
            <div  v-if="newRecipe" class="modal-body">
              <div class="mb-3">
                <label for="exampleFormControlInput1" class="form-label">分類名稱</label>
                <input type="text" class="form-control" id="exampleFormControlInput1" v-model="newRecipe.recipe_class_name">
              </div>
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
        aria-labelledby="staticBackdropLabel" aria-hidden="true">
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="staticBackdropLabel">新增資料</h5>
              <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div  v-if="recipe" class="modal-body">
              <div class="mb-3">
                <h4>分類編號 {{ recipe.recipe_class_no }}</h4>
                <label for="exampleFormControlInput1" class="form-label">分類名稱</label>
                <input type="text" class="form-control" id="exampleFormControlInput1" v-model="recipe.recipe_class_name">
              </div>
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
              <button type="button" class="btn btn-primary" @click="deleteRecipe" data-bs-dismiss="modal">刪除</button>

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
            <th scope="col"><input type="checkbox" v-model="selectAll" @change="toggleSelectAll"/></th>
            <th scope="col">分類編號</th>
            <th scope="col">分類名稱</th>
            <th scope="col"></th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(recipe, index) in recipesFilterByName" :key="index">
            <td scope="row"><input type="checkbox" :checked="selectAll" @change="updateItemSelection(index)" /></td>
            <td>{{ recipe.recipe_class_no }}</td>
            <td>{{ recipe.recipe_class_name }}</td>
            <td>
              <button type="button" class="btn btn-outline-primary" data-bs-toggle="modal"
                data-bs-target="#deleteBackdrop" @click="handleOpenDelete(recipe)"><i
                  class="fa-solid fa-trash"></i>刪除</button>
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
      recipes: [],
      searchKeyword: '',
      selectAll: false,
      recipe: null,
      show: false,
      showEditModal: false,
      newRecipe: {
        recipe_class_name: '',
        },
        deleteRecipeNo: -1,
    };
  },
  created(){
    this.fetchRecipes();
  },
  computed: {
    recipesFilterByName() {
      if (this.searchKeyword.length === 0) {
        return this.recipes
      }
      return this.recipes.filter(v => v?.recipe_name?.toLowerCase().includes(this.searchKeyword.toLowerCase()))
    }
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
    },handleOpenDelete(recipe) {
      this.deleteRecipeNo = recipe.recipe_class_no
    },
    deleteRecipe() {
      axios.get(`${import.meta.env.VITE_API_URL}/admin/cookbook/delete_recipe_class.php?recipe_class_no=${+this.deleteRecipeNo}`)
        .then(response => {
          console.log(response.data);
          this.fetchRecipes();
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
      this.fetchRecipeOne(recipe.recipe_class_no)
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
    saveRecipe() {
      const formData = new FormData();
      formData.append('recipe_class_no', this.recipe.recipe_class_no);
      formData.append('recipe_class_name', this.recipe.recipe_class_name);
      
      axios.post(`${import.meta.env.VITE_API_URL}/admin/cookbook/edit_recipe_class.php`, formData)
        .then(response => {
          this.fetchRecipes();
          // 关闭编辑模态框
          this.showEditModal = false;
        })
        .catch(error => {
          console.error('Error saving recipe:', error);
        });
    },


    addRecipe() {
      const formData = new FormData();
      formData.append('recipe_class_name', this.newRecipe.recipe_class_name);
      axios.post(`${import.meta.env.VITE_API_URL}/admin/cookbook/add_recipe_class.php`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
        .then(response => {
          console.log('保存成功');
          this.newRecipe.recipe_class_name = "";
          this.fetchRecipes();
          this.showEditModal = false;
        })
        .catch(error => {
          console.error('保存出错：', error);
        });
    },
    fetchRecipes() {
      axios.get(`${import.meta.env.VITE_API_URL}/admin/cookbook/get_recipe_class.php`)
        .then(response => {
          // 将从后端获取到的数据更新到组件的数据中
          this.recipes = response.data;
        })
        .catch(error => {
          console.error('Error fetching recipes:', error);
        });
    },
    fetchRecipeOne(id) {
      // php
      let self = this; // 存储 Vue 实例的引用

      return axios.get(`${import.meta.env.VITE_API_URL}/admin/cookbook/get_recipe_class.php?recipe_id=${id}`)

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
  },

  components: {
    SideBar,
    axios
  },

};



</script>


<style lang="scss">
@import "@/assets/scss/_cookbook.scss";
@import "@/assets/scss/_sidebar.scss";</style>
