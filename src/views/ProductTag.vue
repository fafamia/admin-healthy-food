<template>
    <div class="productTag">
        <div class="tagSideBar">
            <SideBar />
        </div>
        <div class="productTag_right">
            <div class="productTag_title my-5">
                <h1>商品TAG</h1>
            </div>
            <button type="button" class="btn btn-outline-primary productTag_add" data-bs-toggle="modal"
                data-bs-target="#addTag">
                <i class="fa-solid fa-circle-plus"></i>新增
            </button>
            <table class="table table-hover table-bordered border-dark productTagTable">
                <thead>
                    <tr>
                        <th scope="col"><input type="checkbox" v-model="selectAll" @change="toggleAll"></th>
                        <th scope="col">TAG編號</th>
                        <th scope="col">TAG名稱</th>
                        <th scope="col">
                            <button class="btn btn-outline-primary" @click="deleteSelected">
                                <i class="fa-solid fa-trash-can"></i>
                                刪除
                            </button>
                        </th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(tag, index) in paginatedTags" :key="tag.product_tag_no">
                        <td>
                            <input type="checkbox" v-model="tag.checked">
                        </td>
                        <td>{{ tag.product_tag_no }}</td>
                        <td>{{ tag.product_tag_name }}</td>
                        <td>
                            <button type="button" class="btn btn-outline-primary" data-bs-toggle="modal"
                                data-bs-target="#updateTag" @click="updatetTag(tag)">
                                <i class="fa-solid fa-pencil"></i>
                                修改
                            </button>
                            <button type="button" class="btn btn-outline-primary"
                                @click="deleteTagToDB(tag.product_tag_no, index)">
                                <i class="fa-solid fa-trash-can"></i>
                                刪除
                            </button>
                        </td>
                    </tr>
                </tbody>
            </table>
            <nav aria-label="Page navigation example">
                <ul class="pagination">
                    <li class="page-item" :class="{'disabled': currentPage === 1}">
                        <button class="page-link btn btn-outline-primary bg-transparent border-0" aria-label="Previous" @click="prevPage">
                            <span aria-hidden="true">&laquo;</span>
                        </button>
                    </li>
                    <li v-for="page in totalPages" class="page-item" :key="page">
                        <button type="button" class="btn btn-outline-primary pageLink" @click="goToPage(page)">{{page}}</button>
                    </li>
                    <li class="page-item" :class="{'disabled': currentPage === totalPages}">
                        <button class="page-link btn-outline-primary bg-transparent border-0" aria-label="Next" @click="nextPage">
                            <span aria-hidden="true">&raquo;</span>
                        </button>
                    </li>
                </ul>
            </nav>
            <!-- 新增彈窗 -->
            <div class="modal fade" id="addTag" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1"
                aria-hidden="true">
                <div class="modal-dialog">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title">新增資料</h5>
                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div class="modal-body">
                            <div class="mb-3">
                                <label for="addTagName" class="form-label">Tag名稱</label>
                                <input type="text" class="form-control" id="addTagName" v-model="product_tag_name">
                            </div>
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-outline-primary" data-bs-dismiss="modal">回列表</button>
                            <button type="button" class="btn btn-primary" data-bs-dismiss="modal"
                                @click="addTagToDB">儲存</button>
                        </div>
                    </div>
                </div>
            </div>
            <!-- 修改彈窗 -->
            <div class="modal fade" id="updateTag" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1"
                aria-hidden="true">
                <div class="modal-dialog">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title">修改資料</h5>
                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div class="modal-body">
                            <div class="mb-3">
                                <label for="updateTagName" class="form-label">Tag名稱</label>
                                <input type="text" class="form-control" id="updateTagName" v-model="product_tag_name">
                            </div>
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-outline-primary" data-bs-dismiss="modal">回列表</button>
                            <button type="button" class="btn btn-primary" data-bs-dismiss="modal"
                                @click="updateTagToDB">儲存</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import SideBar from "@/components/SideBar.vue";
import axios from "axios";
import { ref } from "vue";

export default {
    data() {
        return {
            productTags: [],
            product_tag_name: '',
            product_tag_no: null,
            selectAll: false,
            tagsPerPage: 6,
            currentPage: 1,
        }
    },
    components: {
        SideBar,
    },
    computed: {
        totalPages() {
            return Math.ceil(this.productTags.length / this.tagsPerPage);
        },
        paginatedTags(){
            const start = (this.currentPage - 1) * this.tagsPerPage;
            const end = start + this.tagsPerPage;
            return this.productTags.slice(start,end)
        }
    },
    created() {
        axios.get(`${import.meta.env.VITE_API_URL}/admin/product/productTagDataGet.php`)
            .then(response => {
                console.log(response.data);
                this.productTags = response.data.productTags;
            })
            .catch(error => {
                console.error('Error fetching productTags:', error);
            });
    },
    methods: {
        addTagToDB() {
            axios.post(`${import.meta.env.VITE_API_URL}/admin/product/productTagDataAdd.php`, {
                product_tag_name: this.product_tag_name
            })
                .then(response => {
                    if (!response.data.error) {
                        const newTag = {
                            product_tag_no: response.data.product_tag_no,
                            product_tag_name: this.product_tag_name
                        }
                        this.productTags.push(newTag);
                        this.product_tag_name = '';
                    }
                })
                .catch(error => {
                    console.error('Error adding productTag:', error);
                });
        },
        toggleAll() {
            this.productTags.forEach(tag => {
                tag.checked = this.selectAll;
            });
        },
        deleteTagToDB(productTagNo, index) {
            axios.post(`${import.meta.env.VITE_API_URL}/admin/product/productTagDataDelete.php`, {
                product_tag_no: productTagNo
            })
                .then(response => {
                    const confirmed = window.confirm("確定要刪除此商品嗎?");
                    if (!response.data.error && confirmed) {
                        this.productTags.splice(index, 1)
                    }
                })
                .catch(error => {
                    console.error('Error deleting productTag:', error);
                })
        },
        deleteSelected() {
            const confirmed = window.confirm("確定要刪除選取商品嗎?");
            this.productTags.forEach((tag) => {
                if (tag.checked) {
                    axios.post(`${import.meta.env.VITE_API_URL}/admin/product/productTagDataDelete.php`, {
                        product_tag_no: tag.product_tag_no
                    })
                        .then(response => {
                            if (response.data && !response.data.error && confirmed) {
                                this.productTags = this.productTags.filter(tag => !tag.checked);
                            }
                        })
                        .catch(error => {
                            console.error('Error deleting productTag:', error);
                        })
                }
            })
        },
        updatetTag(tag) {
            this.product_tag_name = tag.product_tag_name;
            this.product_tag_no = tag.product_tag_no;
        },
        updateTagToDB() {
            axios.post(`${import.meta.env.VITE_API_URL}/admin/product/productTagDataUpdate.php`, {
                product_tag_name: this.product_tag_name,
                product_tag_no: this.product_tag_no
            })
                .then(response => {
                    if (!response.data.error) {
                        const index = this.productTags.findIndex(tag => tag.product_tag_no === this.product_tag_no);
                        if (index !== -1) {
                            this.productTags[index].product_tag_name = this.product_tag_name
                        }
                        this.product_tag_name = '';
                    }
                })
                .catch(error => {
                    console.error('Error updating productTags:', error);
                })
        },
        nextPage(){
            if(this.currentPage < this.totalPages){
                this.currentPage += 1;
            }
        },
        prevPage(){
            if(this.currentPage > 1){
                this.currentPage -= 1;
            }
        },
        goToPage(pageNumber){
            if(pageNumber >= 1 && pageNumber <= this.totalPages){
                this.currentPage = pageNumber;
            }
        },
    }
}
</script>

<style lang="scss">
@import "@/assets/scss/sidebar.scss";
@import "@/assets/scss/page/producttag";
</style>