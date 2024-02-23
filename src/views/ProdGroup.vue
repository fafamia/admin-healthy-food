<template>
    <div class="prodgroup">
        <SideBar />
        <div class="prodgroupRight">

            <h1>商品群組</h1>
            <button type="button" class="btn btn-outline-primary prodgroupAdd" data-bs-toggle="modal"
                data-bs-target="#addGroup">
                <i class="fa-solid fa-circle-plus"></i>新增
            </button>

            <table class="table table-hover table-bordered border-dark productTable">
                <thead>
                    <tr>
                        <th scope="col">
                            <input type="checkbox" v-model="selectAll" @change="toggleSelect">
                        </th>
                        <th scope="col">群組編號</th>
                        <th scope="col">群組名稱</th>
                        <th scope="col">開始日期</th>
                        <th scope="col">結束日期</th>
                        <th scope="col">
                            <button class="btn btn-outline-primary" @click="deleteSelected">
                                <i class="fa-solid fa-trash-can"></i>
                                刪除
                            </button>
                        </th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(prodgroup, index) in prodgroups" :key="index">
                        <td>
                            <input type="checkbox" v-model="prodgroup.checked" :value="prodgroup">
                        </td>
                        <td>{{ prodgroup.prodgroup_no }}</td>
                        <td>{{ prodgroup.prodgroup_name }}</td>
                        <td>{{ prodgroup.prodgroup_start }}</td>
                        <td>{{ prodgroup.prodgroup_end }}</td>
                        <td>
                            <button type="button" class="btn btn-outline-primary" data-bs-toggle="modal"
                                data-bs-target="#updateGroup" @click="updateGroup(prodgroup)">
                                <i class="fa-solid fa-pencil"></i>
                                修改
                            </button>
                            <button type="button" class="btn btn-outline-primary prodDelete"
                                @click="deleteGroupToDB(prodgroup.prodgroup_no, index)">
                                <i class="fa-solid fa-trash-can"></i>
                                刪除
                            </button>
                        </td>
                    </tr>
                </tbody>
            </table>

            <div class="modal fade" id="addGroup" v-show="isModalShown" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1"
                aria-hidden="true" >
                <div class="modal-dialog">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title" id="staticBackdropLabel">新增資料</h5>
                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div class="modal-body">
                            <div class="mb-3">
                                <label for="addGroupName" class="form-label">群組名稱</label>
                                <input type="text" class="form-control" id="addGroupName" v-model="prodgroup_name">
                            </div>

                            <label for="addGroupStart" class="form-label">開始日期</label>
                            <input type="date" class="form-control" id="addGroupStart" v-model="prodgroup_start">
                            <label for="addGroupEnd" class="form-label">結束日期</label>
                            <input type="date" class="form-control" id="addGroupEnd" v-model="prodgroup_end">

                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-outline-primary" data-bs-dismiss="modal">回列表</button>
                            <button type="button" class="btn btn-primary" @click="addGroupToDB">儲存</button>
                        </div>
                    </div>
                </div>
            </div>

            <!-- 修改彈窗 -->
            <div class="modal fade" id="updateGroup" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1"
                aria-hidden="true">
                <div class="modal-dialog">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title">修改資料</h5>
                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div class="modal-body">
                            <div class="mb-3">
                                <label for="updateGroupName" class="form-label">群組名稱</label>
                                <input type="text" class="form-control" id="updateGroupName" v-model="prodgroup_name">
                                <label for="updateGroupStart" class="form-label">開始日期</label>
                                <input type="date" class="form-control" id="updateGroupStart" v-model="prodgroup_start">
                                <label for="updateGroupEnd" class="form-label">結束日期</label>
                                <input type="date" class="form-control" id="updateGroupEnd" v-model="prodgroup_end">
                            </div>
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-outline-primary" data-bs-dismiss="modal">回列表</button>
                            <button type="button" class="btn btn-primary" data-bs-dismiss="modal"
                                @click="updateGroupToDB">儲存</button>
                        </div>
                    </div>
                </div>
            </div>


        </div>


    </div>
</template>

<script>
import SideBar from "@/components/SideBar.vue";
import { ref } from 'vue';
import axios from "axios";

export default {
    data() {
        return {
            selectAll: false,
            prodgroups: [],
            prodgroup_name: '',
            prodgroup_start: '',
            prodgroup_end: '',
            prodgroup_no: null,
            isModalShown: true,



        }
    },
    components: {
        SideBar,
    },
    created() {
        axios.get(`${import.meta.env.VITE_API_URL}/admin/product/prodGroupDataGet.php`)
            .then(response => {
                this.prodgroups = response.data.prodgroups;
            })
            .catch(error => {
                console.error('Error fetching  prodgroups:', error);
            });
    },
    methods: {
        addGroupToDB() {
            axios.post(`${import.meta.env.VITE_API_URL}/admin/product/productGroupDataAdd.php`, {
                prodgroup_name: this.prodgroup_name,
                prodgroup_start: this.prodgroup_start,
                prodgroup_end: this.prodgroup_end
            })
                .then(response => {
                    if (!response.data.error) {
                        const newGroup = {
                            prodgroup_no: response.data.prodgroup_no,
                            prodgroup_name: this.prodgroup_name,
                            prodgroup_start: this.prodgroup_start,
                            prodgroup_end: this.prodgroup_end,
                        }
                        this.prodgroups.push(newGroup);
                        this.clear();
                        // 儲存完畢後，設置 isModalShown 為 false 以關閉彈窗
                        this.isModalShown = false;
                        // 手動移除背景灰色效果
      const modalBackdrop = document.querySelector('.modal-backdrop');
      if (modalBackdrop) {
        modalBackdrop.remove();
      }
                    }
                })
                .catch(error => {
                    console.error('Error adding prodgroups:', error);
                });

        },
        updateGroup(prodgroups) {
            this.prodgroup_name = prodgroups.prodgroup_name;
            this.prodgroup_no = prodgroups.prodgroup_no;
            this.prodgroup_start = prodgroups.prodgroup_start;
            this.prodgroup_end = prodgroups.prodgroup_end;
        },
        
        updateGroupToDB() {
            axios.post(`${import.meta.env.VITE_API_URL}/admin/product/productGroupDataUpdate.php`, {
                prodgroup_name: this.prodgroup_name,
                prodgroup_no: this.prodgroup_no,
                prodgroup_start: this.prodgroup_start,
                prodgroup_end: this.prodgroup_end,
            })
                .then(response => {
                    if (!response.data.error) {
                        const index = this.prodgroups.findIndex(prodgroups => prodgroups.prodgroup_no === this.prodgroup_no);
                        if (index !== -1) {
                            this.prodgroups[index].prodgroup_name = this.prodgroup_name,
                                this.prodgroups[index].prodgroup_start = this.prodgroup_start,
                                this.prodgroups[index].prodgroup_end = this.prodgroup_end
                        }
                        this.clear();
                    }
                })
                .catch(error => {
                    console.error('Error updating prodgroup:', error);
                })


        },
        clear() {
    this.prodgroup_name = '';
    this.prodgroup_start = '';
    this.prodgroup_end = '';
},
        async deleteGroupToDB(productGroupNo, index) {
            const confirmed = window.confirm("確定要刪除此商品群組嗎?");
            if (!confirmed) return;

            try {
                await axios.delete(`${import.meta.env.VITE_API_URL}/admin/product/productGroupDataDelete.php`, {
                    data: {
                        prodgroup_no: productGroupNo
                    }
                });
                this.prodgroups.splice(index, 1); // 從前端數據中刪除已刪除的群組
            } catch (error) {
                console.error('刪除商品群組出錯:', error);
            }
        },

        deleteSelected() {
            const confirmed = window.confirm("確定要刪除選取商品群組嗎?");
            this.prodgroups.forEach((prodgroup) => {
                if (prodgroup.checked) {
                    axios.post(`${import.meta.env.VITE_API_URL}/admin/product/productGroupDataDelete.php`, {
                        prodgroup_no: prodgroup.prodgroup_no
                    })
                        .then(response => {
                            if (response.data && !response.data.error && confirmed) {
                                this.prodgroups = this.prodgroups.filter(prodgroup => !prodgroup.checked);
                            }
                        })
                        .catch(error => {
                            console.error('Error deleting productGroup:', error);
                        })
                }
            })
        },
        toggleSelect() {
            if (this.selectAll) {
                this.selectedProducts = [...this.prodgroups];
            } else {
                this.selectedProducts = [];
            }
        }
    },
}
</script>

<style lang="scss">
@import "@/assets/scss/page/prodgroup.scss";
@import "@/assets/scss/sidebar.scss";
</style>