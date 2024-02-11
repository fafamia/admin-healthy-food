<template>
    <div class="prodclass">
        <SideBar />
        <div class="prodclassRight">
            <h1>商品分類</h1>
            <button type="button" class="btn btn-outline-primary prodclassAdd" data-bs-toggle="modal"
                data-bs-target="#staticBackdrop">
                <i class="fa-solid fa-circle-plus"></i>新增
            </button>
            <table class="table table-hover table-bordered border-dark productTable">
                <thead>
                    <tr>
                        <th scope="col">
                            <input type="checkbox" v-model="selectAll" @change="toggleSelect">
                        </th>
                        <th scope="col">分類編號</th>
                        <th scope="col">分類名稱</th>
                        <th scope="col"></th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(productclass, index) in prodclass" :key="index">
                        <td>
                            <input type="checkbox" v-model="selectedProducts" :value="productclass">
                        </td>
                        <td>{{ productclass. product_class_no }}</td>
                        <td>{{ productclass.product_class_name }}</td>
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
                                <h4>分類編號 0001</h4>
                                <label for="exampleFormControlInput1" class="form-label">分類名稱</label>
                                <input type="text" class="form-control" id="prodclassName">
                            </div>
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-outline-primary" data-bs-dismiss="modal">回列表</button>
                            <button type="button" class="btn btn-primary">儲存</button>
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
            selectAll: ref(false),
            selectedProducts: ref([]),
            prodclass: ref([
                // { prodclassNumber: '0001', category: '調理包' },
                // { prodclassNumber: '0002', category: '生鮮食材' },

            ]),

        }
    },
    components: {
        SideBar,
    },
    created(){
        axios.get(`${import.meta.env.VITE_API_URL}/productClassDataGet.php`)
            .then(response => {
                this.prodclass = response.data;
            })
            .catch(error => {
                console.error('Error fetching prodclass:', error);
            });
    },
    methods: {
        deleteProd(index) {
            const confirmed = window.confirm("確定要刪除此商品分類嗎?");
            if (confirmed) {
                this.prodclass.splice(index, 1);
            }
        },
        toggleSelect() {
            if (this.selectAll) {
                this.selectedProducts = [...this.prodclass];
            } else {
                this.selectedProducts = [];
            }
        },
    },
}
</script>

<style lang="scss">
@import "@/assets/scss/page/_prodclass.scss";
@import "@/assets/scss/sidebar.scss";
</style>