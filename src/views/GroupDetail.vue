<template>
    <div class="groupdetail">
        <SideBar />
        <div class="groupdetailRight">
            <h1>群組明細</h1>
            <button type="button" class="btn btn-outline-primary groupdetailAdd" data-bs-toggle="modal"
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
                                <input type="text" class="form-control" id="groupdetailName" value="首頁推薦" readonly>
                            </div>
                            <label for="form-select">選擇商品</label>
                            <select class="form-select" aria-label="Default select example" v-model="selectedProd" multiple>
                                <option v-for="prod in prods" :key="prod.id" :value="prod.id">{{ prod.name }}</option>
                            </select>
                            <!-- 顯示選中的商品TAG -->
                            <div>
                                選中的商品編號: {{ selectedProd }}
                            </div>
                            <label for="exampleFormControlInput3" class="form-label">促銷價格</label>
                            <input type="number" class="form-control" id="exampleFormControlInput3">

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
                        <th scope="col">群組商品編號</th>
                        <th scope="col">促銷價格</th>
                        <th scope="col"></th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(groupdetail, index) in groupdetails" :key="index">
                        <td>
                            <input type="checkbox" v-model="selectedProducts" :value="groupdetail">
                        </td>
                        <td>{{ groupdetail.groupdetailNumber }}</td>
                        <td>{{ groupdetail.groupdetailName }}</td>
                        <td>{{ groupdetail.groupProdNo }}</td>
                        <td>{{ groupdetail.sales }}</td>
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

export default {
    data() {
        return {
            selectAll: ref(false),
            selectedProducts: ref([]),
            groupdetails: ref([
                { groupdetailNumber: '0001', groupdetailName: '首頁推薦', groupProdNo: '#001、#002' },
                { groupdetailNumber: '0002', groupdetailName: 'BMI過輕', groupProdNo: '#001、#002' },
                { groupdetailNumber: '0003', groupdetailName: '龍年促銷', groupProdNo: '#001、#002', sales: '折10元' },
                { groupdetailNumber: '0004', groupdetailName: '食譜食材推薦', groupProdNo: '#001、#002' },

                // 其他商品數據
            ]),
            selectedProd: [], // 存儲選中的商品編號
            prods: [ // 商品數據，你可以根據實際需求替換成動態載入的數據
                { id: 1001, name: '調理包' },
                { id: 2001, name: '雞蛋' },

            ],

        }
    },
    components: {
        SideBar,
    },
    methods: {
        deleteProd(index) {
            const confirmed = window.confirm("確定要刪除此群組明細嗎?");
            if (confirmed) {
                this.groupdetails.splice(index, 1);
            }
        },
        toggleSelect() {
            if (this.selectAll) {
                this.selectedProducts = [...this.groupdetails];
            } else {
                this.selectedProducts = [];
            }
        }
    },
}
</script>

<style lang="scss">
@import "@/assets/scss/page/_groupdetail.scss";
@import "@/assets/scss/sidebar.scss";
</style>