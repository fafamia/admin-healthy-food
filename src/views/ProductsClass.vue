<template>
    <div class="prodclass">
        <SideBar />
        <div class="prodclassRight">
            <h1>商品分類</h1>
            <button type="button" class="btn btn-outline-primary prodclassAdd" data-bs-toggle="modal"
                data-bs-target="#addClass">
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
                        <th scope="col">
                            <button class="btn btn-outline-primary" @click="deleteSelected">
                                <i class="fa-solid fa-trash-can"></i>
                                刪除
                            </button>
                        </th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(productclass, index) in prodclass" :key="index">
                        <td>
                            <input type="checkbox" v-model="productclass.checked" :value="productclass">
                        </td>
                        <td>{{ productclass.product_class_no }}</td>
                        <td>{{ productclass.product_class_name }}</td>
                        <td>
                            <button type="button" class="btn btn-outline-primary" data-bs-toggle="modal"
                                data-bs-target="#updateClass" @click="updateClass(productclass)">
                                <i class="fa-solid fa-pencil"></i>
                                修改
                            </button>
                            <button type="button"  class="btn btn-outline-primary prodDelete" @click="deleteClassToDB(productclass.product_tag_no, index)">
                                <i class="fa-solid fa-trash-can"></i>
                                刪除
                            </button>
                        </td>
                    </tr>
                </tbody>
            </table>
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
                                <input type="text" class="form-control" id="addClassName" v-model="product_class_name">

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
                                <label for="updateClassName" class="form-label">Class名稱</label>
                                <input type="text" class="form-control" id="updateClassName" v-model="product_class_name">
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
            prodclass: [
                // { prodclassNumber: '0001', category: '調理包' },
                // { prodclassNumber: '0002', category: '生鮮食材' },

            ],
            product_class_name: '',
            product_class_no: null,

        }
    },
    components: {
        SideBar,
    },
    created() {
        axios.get(`${import.meta.env.VITE_API_URL}/admin/product/productClassDataGet.php`)
            .then(response => {
                this.prodclass = response.data;
            })
            .catch(error => {
                console.error('Error fetching prodclass:', error);
            });
    },
    methods: {
        addClassToDB() {
            axios.post(`${import.meta.env.VITE_API_URL}/admin/product/productClassDataAdd.php`, {
                product_class_name: this.product_class_name
            })
                .then(response => {
                    if (!response.data.error) {
                        const newClass = {
                            product_class_no: response.data.product_class_no,
                            product_class_name: this.product_class_name
                        }
                        this.prodclass.push(newClass);
                        this.product_class_name = '';
                        console.log(this.product_class_name);
                    }
                })
                .catch(error => {
                    console.error('Error adding prodclass:', error);
                });
        },
        updateClass(productclass) {
            this.product_class_name = productclass.product_class_name;
            this.product_class_no = productclass.product_class_no;
        },
        updateClassToDB() {
            axios.post(`${import.meta.env.VITE_API_URL}/admin/product/productClassDataUpdate.php`, {
                product_class_name: this.product_class_name,
                product_class_no: this.product_class_no
            })
                .then(response => {
                    if (!response.data.error) {
                        const index = this.prodclass.findIndex(productclass => productclass.product_class_no === this.product_class_no);
                        if (index !== -1) {
                            this.prodclass[index].product_class_name = this.product_class_name
                        }
                        this.product_class_name = '';
                        console.log(this.product_class_name);
                    }
                })
                .catch(error => {
                    console.error('Error updating prodclass:', error);
                })
        },
        deleteClassToDB(productClassNo, index) {
            axios.post(`${import.meta.env.VITE_API_URL}/admin/product/productClassDataDelete.php`, {
                product_class_no: productClassNo
            })
                .then(response => {
                    const confirmed = window.confirm("確定要刪除此商品嗎?");
                    if (!response.data.error && confirmed) {
                        this.prodclass.splice(index, 1)
                    }
                })
                .catch(error => {
                    console.error('Error deleting prodclass:', error);
                })
        },
        deleteSelected() {
            const confirmed = window.confirm("確定要刪除選取商品嗎?");
            this.prodclass.forEach((productclass) => {
                if (productclass.checked) {
                    axios.post(`${import.meta.env.VITE_API_URL}/admin/product/productClassDataDelete.php`, {
                        product_class_no: productclass.product_class_no
                    })
                        .then(response => {
                            if (response.data && !response.data.error && confirmed) {
                                this.prodclass = this.prodclass.filter(productclass => !productclass.checked);
                            }
                        })
                        .catch(error => {
                            console.error('Error deleting productClass:', error);
                        })
                }
            })
        },

        toggleSelect() {
            this.prodclass.forEach(productclass => {
                productclass.checked = this.selectAll;
            });
        },
    },
}
</script>

<style lang="scss">
@import "@/assets/scss/page/_prodclass.scss";
@import "@/assets/scss/sidebar.scss";
</style>