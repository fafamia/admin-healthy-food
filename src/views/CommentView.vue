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
            <th scope="col">留言編號</th>
            <th scope="col">檢舉留言時間</th>
            <th scope="col">留言內容</th>
            <th scope="col">檢舉內容</th>
            <th scope="col">狀態</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(report, index) in reportFilterByName" :key="index">
            <td>{{ report.report_no }}</td>
            <td>{{ report.user_no }}</td>
            <td>{{ report.comment_no }}</td>
            <td>{{ report.report_time }}</td>
            <td>{{ report.comment_info }}</td>
            <td>{{ report.report_info }}</td>
            <td>
              <button @click="toggleCommentStatus(report)" class="btn btn-primary">
                {{ report.comment_status === 0 ? '上架' : '下架' }}
              </button>
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
      selectedStatus: '',
      comment: {
        status: ''
      },
      searchKeyword: '',
    };
  },
  created() {
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
  mounted() {
    this.comment.status = '未審核';
    this.selectedStatus = this.comment.status;
  },
  methods: {
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
    toggleCommentStatus(report) {
      // 根据当前状态切换为相反的状态
      report.comment_status = report.comment_status === 0 ? 1 : 0;

      // 发送更新后的状态到后端保存
      axios.post(`${import.meta.env.VITE_API_URL}/admin/cookbook/update_comment_status.php`, {
        comment_no: report.comment_no,
        comment_status: report.comment_status
      })
      .then(response => {
        console.log('评论状态更新成功');
      })
      .catch(error => {
        console.error('更新评论状态时出错：', error);
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
