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
            <th scope="col">會員編號</th>
            <th scope="col">檢舉留言時間</th>
            <th scope="col">內容</th>
            <th scope="col">狀態</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(report, index) in reportFilterByName" :key="index">
            <td>{{ report.report_no }}</td>
            <td>{{ report.user_no }}</td>
            <td>{{ report.report_time }}</td>
            <td>{{ report.report_info }}</td>
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
import axios from 'axios';

export default {
  data() {
    return {
      report: [
      ],
      selectedStatus: '未審核',
      searchKeyword: '',
    };
  },
  created(){
    this.fetchReport()
  },
  computed: {
    reportFilterByName() {
      if (this.searchKeyword.length === 0) {
        return this.report
      }
      return this.report.filter(v => v?.report_info?.toLowerCase().includes(this.searchKeyword.toLowerCase()))
    }
  },
  methods:{
    fetchReport() {
      axios.get(`${import.meta.env.VITE_API_URL}/admin/cookbook/get_report.php`)
        .then(response => {
          // 将从后端获取到的数据更新到组件的数据中
          this.report = response.data;
        })
        .catch(error => {
          console.error('Error fetching report:', error);
        });
    },
  },


  components: {
    SideBar,
    axios,
  },

};



</script>


<style lang="scss">
@import "@/assets/scss/_cookbook.scss";
@import "@/assets/scss/_sidebar.scss";
</style>
