<template>
  <div class="cookbook">
    <div class="bar">
      <SideBar />
    </div>
    <div class="cookbook_container">
      <h1>待審核留言</h1>
      <div class="cookbook_btn">
        <input type="search" class="search" placeholder="搜尋" />
      </div>
      <table class="table table-hover table-bordered border-dark">
        <thead>
          <tr>
            <th scope="col">編號</th>
            <th scope="col">食譜編號</th>
            <th scope="col">會員編號</th>
            <th scope="col">檢舉留言時間</th>
            <th scope="col">內容</th>
            <th scope="col">狀態</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(recipe, index) in recipes" :key="index">
            <td>{{ recipe.commentNumber }}</td>
            <td>{{ recipe.recipeNumber }}</td>
            <td>{{ recipe.memberNumber }}</td>
            <td>{{ recipe.date }}</td>
            <td>{{ recipe.content }}</td>
            <td><select v-model="selectedStatus">
                <option v-bind:value="'未審核'">未審核</option>
                <option v-bind:value="'保留'">保留</option>
                <option v-bind:value="'刪除'">刪除</option>
              </select>
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
        { commentNumber: '01', recipeNumber: '00066', memberNumber: '04048576', date: '2023/12/31', content: '一艷歌呢弟給' },
        { commentNumber: '02', recipeNumber: '00099', memberNumber: '0101101', date: '2023/12/31', content: '一艷歌呢弟給' },
        { commentNumber: '03', recipeNumber: '00031', memberNumber: '200202020', date: '2023/12/31', content: '一艷歌呢弟給' },
        { commentNumber: '04', recipeNumber: '00034', memberNumber: '04040404', date: '2023/12/31', content: '一艷歌呢弟給' }

      ],
      selectedStatus: '未審核'
    };
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
