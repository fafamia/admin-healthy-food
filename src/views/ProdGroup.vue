<template>
    <div class="prodgroup">
        <SideBar />
        <div class="prodgroupRight">

            <h1>商品群組</h1>
            <button type="button" class="btn btn-outline-primary prodgroupAdd" data-bs-toggle="modal"
                data-bs-target="#staticBackdrop">
                <i class="fa-solid fa-circle-plus"></i>新增
            </button>

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
                                <h4>群組編號 0001</h4>
                                <label for="exampleFormControlInput1" class="form-label">群組名稱</label>
                                <input type="text" class="form-control" id="groupdetailName">
                            </div>

                            <label for="exampleFormControlInput3" class="form-label">開始日期</label>
                            <input type="date" class="form-control" id="exampleFormControlInput3">
                            <label for="exampleFormControlInput3" class="form-label">結束日期</label>
                            <input type="date" class="form-control" id="exampleFormControlInput3">

                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-outline-primary" data-bs-dismiss="modal">回列表</button>
                            <button type="button" class="btn btn-primary">儲存</button>
                        </div>
                    </div>
                </div>
            </div>

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
                        <th scope="col"></th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(prodgroup, index) in prodgroups" :key="index">
                        <td>
                            <input type="checkbox" v-model="selectedProducts" :value="prodgroup">
                        </td>
                        <td>{{ prodgroup.prodgroup_no }}</td>
                        <td>{{ prodgroup. prodgroup_name }}</td>
                        <td>{{ prodgroup.prodgroup_start }}</td>
                        <td>{{ prodgroup.prodgroup_end }}</td>
                        <td>
                            <button class="btn btn-outline-primary">
                                <i class="fa-solid fa-pencil"></i>
                                修改
                            </button>
                            <button class="btn btn-outline-primary prodDelete" @click="deleteProd(index)">
                                <i class="fa-solid fa-trash-can"></i>
                                刪除
                            </button>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>

        
    </div>
</template>

<script>
import SideBar from "@/components/SideBar.vue";
import { ref } from 'vue';
import axios from "axios";

export default{
    data() {
        return {
            selectAll: ref(false),
            selectedProducts: ref([]),
            prodgroups: ref([
                // { prodgroupNumber: '0001', prodgroupName: '首頁推薦'},
                // { prodgroupNumber: '0002', prodgroupName: 'BMI過輕'},
                // { prodgroupNumber: '0003', prodgroupName: '龍年促銷', startime: '2024/01/01', endtime: '2024/01/31' },
                // { prodgroupNumber: '0004', prodgroupName: '食譜食材推薦'},

            ]),

            
        }
    },
    components: {
        SideBar,
    },
    created(){
        axios.get(`${import.meta.env.VITE_API_URL}/prodGroupDataGet.php`)
            .then(response => {
                this. prodgroups = response.data;
            })
            .catch(error => {
                console.error('Error fetching  prodgroups:', error);
            });
    },
    methods: {
        deleteProd(index) {
            const confirmed = window.confirm("確定要刪除此商品群組嗎?");
            if (confirmed) {
                this.prodgroups.splice(index, 1);
            }
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