<template>
    <SideBar />
    <h1>常見問題分類</h1>
    <div class="articleclass_btn">
      <button type="button" class="btn btn-outline-primary prodclassAdd" data-bs-toggle="modal"
                data-bs-target="#addClass">
                <i class="fa-solid fa-circle-plus"></i>新增
      </button>
      </div> 
    <div class="articles">  

      <div class="modal fade" id="addClass" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1"
                aria-labelledby="staticBackdropLabel" aria-hidden="true">
                <div class="modal-dialog">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title">新增資料</h5>
                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div class="modal-body">
                            <div class="mb-3">
                                <label for="addClassName" class="form-label">分類名稱</label>
                                <input type="text" class="form-control" id="addClassName" v-model="faq_class_name">

                            </div>
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-outline-primary" data-bs-dismiss="modal">回列表</button>
                            <button type="button" class="btn btn-primary" @click="addClassToDB">儲存</button>
                        </div>
                    </div>
                </div>
            </div>
            <!-- 修改彈窗 -->
            <div class="modal fade" id="updateClass" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1"
                aria-hidden="true">
                <div class="modal-dialog">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title">修改資料</h5>
                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div class="modal-body">
                            <div class="mb-3">
                                <label for="updateClassName" class="form-label">名稱</label>
                                <input type="text" class="form-control" id="updateClassName" v-model="question_class">
                            </div>
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-outline-primary" data-bs-dismiss="modal">回列表</button>
                            <button type="button" class="btn btn-primary" data-bs-dismiss="modal"
                                @click="updateClassToDB">儲存</button>
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
          <tr v-for="(faqclass, index) in faqclass" :key="index">
            <td>
              <input type="checkbox" v-model="faqclass.checked" :value="faqclass">
            </td>
            <td>{{ faqclass.question_no }}</td>
            <td>{{ faqclass.question_class }}</td>
            <td>
              <button type="button" class="btn btn-outline-primary" data-bs-toggle="modal"
                  data-bs-target="#updateClass" @click="updateClass(faqclass)">
                  <i class="fa-solid fa-pencil"></i>
                  修改
              </button>
              <button type="button"  class="btn btn-outline-primary prodDelete" @click="deleteClassToDB(faqclass.question_no, index)">
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
import axios from "axios";

export default {
  data() {
    return {
      selectAll: ref(false),
      faqclass: ref([]),
      question_class: '',
      question_no: null,
      itemsPerPage: 5,
      currentPage: 1,
    };
  },
  components: {
    SideBar,
  },
  created() {
  axios.get(`${import.meta.env.VITE_API_URL}/faq/faqClassGet.php`)
    .then(response => {
      this.faqclass = response.data.faqclass;
    })
    .catch(error => {
      console.error('Error fetching faqclass:', error);
    });
},

  methods: {
        addClassToDB() {
            axios.post(`${import.meta.env.VITE_API_URL}/faq/faqClassAdd.php`, {
              question_class: this.faq_class_name
            })
                .then(response => {
                    if (!response.data.error) {
                        const newClass = {
                          question_no: response.data.question_no,
                            question_class: this.faq_class_name
                        }
                        this.faqclass.push(newClass);
                        this.faq_class_name = '';
                        console.log(this.faq_class_name);
                    }
                })
                .catch(error => {
                    console.error('Error adding faqclass:', error);
                });
        },
        updateClass(faqclass) {
            this.question_class = faqclass.question_class;
            this.question_no = faqclass.question_no;
        },
        updateClassToDB() {
          axios.post(`${import.meta.env.VITE_API_URL}/faq/faqClassUpdate.php`, {
              question_class: this.question_class,
              question_no: this.question_no
          })
          .then(response => {
              if (!response.data.error) {
                  const index = this.faqclass.findIndex(faqclass => faqclass.question_no === this.question_no);
                  if (index !== -1) {
                      this.faqclass[index].question_class = this.question_class;
                  }
                  this.question_class = '';
              }
          })
          .catch(error => {
              console.error('Error updating faqclass:', error);
          });
        },
        deleteClassToDB(faqClassNo, index) {
            axios.post(`${import.meta.env.VITE_API_URL}/faq/faqClassDelete.php`, {
              question_no: faqClassNo
            })
                .then(response => {
                    const confirmed = window.confirm("確定要刪除此問答嗎?");
                    if (!response.data.error && confirmed) {
                        this.faqclass.splice(index, 1)
                    }
                })
                .catch(error => {
                    console.error('Error deleting faqclass:', error);
                })
        },
        deleteSelected() {
            const confirmed = window.confirm("確定要刪除選取的問答嗎?");
            this.faqclass.forEach((faqclass) => {
                if (faqclass.checked) {
                    axios.post(`${import.meta.env.VITE_API_URL}/admin/faq/faqClassDataDelete.php`, {
                      question_no: faqclass.question_no
                    })
                        .then(response => {
                            if (response.data && !response.data.error && confirmed) {
                                this.faqclass = this.faqclass.filter(faqclass => !faqclass.checked);
                            }
                        })
                        .catch(error => {
                            console.error('Error deleting faqClass:', error);
                        })
                }
            })
        },

        toggleSelect() {
            this.faqclass.forEach(faqclass => {
                faqclass.checked = this.selectAll;
            });
        },
  },
};
</script>

<style lang="scss">
@import "@/assets/scss/sidebar.scss";
@import "@/assets/scss/page/_articles.scss";
</style>