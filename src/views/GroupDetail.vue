<template>
    <div class="groupdetail">
        <SideBar />
        <div class="groupdetailRight">
            <div class="filterList">
                <select @change="filterList">
                    <option value="">所有群組</option>
                    <option v-for="option in prodgroupOptions" :key="option.prodgroup_no" :value="option.prodgroup_name">{{
                        option.prodgroup_name }}</option>
                </select>
            </div>
            <h1>群組明細</h1>
            <button type="button" class="btn btn-outline-primary groupdetailAdd" data-bs-toggle="modal"
                data-bs-target="#addgroupDetail">
                <i class="fa-solid fa-circle-plus"></i>新增
            </button>




            <div class="modal fade" id="addgroupDetail" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1"
                aria-labelledby="addgroupDetailLabel" aria-hidden="true" v-show="isModalShown">
                <div class="modal-dialog">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title" id="addgroupDetailLabel">新增資料</h5>
                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div class="modal-body">
                            <div class="mb-3">


                                <label for="groupName">群組名稱</label>
                                <select class="form-select mb-3" aria-label="Default select example"
                                    v-model="prodgroup_name" @change="updateProdgroupNo">
                                    <option v-for="option in prodgroupOptions" :key="option.prodgroup_no"
                                        :value="option.prodgroup_name">{{ option.prodgroup_name }}</option>
                                </select>
                                <label for="groupDetailNo" class="form-label">群組編號</label>
                                <input type="text" class="form-control mb-3" id="groupDetailNo" v-model="prodgroup_no"
                                    readonly>
                            </div>
                            <label for="form-select">選擇商品</label>
                            <select class="form-select" aria-label="Default select example" v-model="product_name">
                                <option v-for="option in productOptions" :key="option.product_name"
                                    :value="option.product_name">{{ option.product_name }}</option>
                            </select>
                            <label for="exampleFormControlInput3" class="form-label">促銷價格</label>
                            <input type="number" class="form-control" id="exampleFormControlInput3"
                                v-model="prodgroup_sale_price">

                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-outline-primary" data-bs-dismiss="modal">回列表</button>
                            <button type="button" class="btn btn-primary" @click="addGroupDetailToDB">儲存</button>
                        </div>
                    </div>
                </div>
            </div>

            <table class="table table-hover table-bordered border-dark productTable">
                <thead>
                    <tr>
                        <th scope="col">群組編號</th>
                        <th scope="col">群組名稱</th>
                        <th scope="col">群組商品名稱</th>
                        <th scope="col">促銷價格</th>
                        <th scope="col">
                        </th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(groupdetail, index) in paginatedGroupdetail" :key="index">
                        <td>{{ groupdetail.prodgroup_no }}</td>
                        <td>{{ groupdetail.prodgroup_name }}</td>
                        <td>{{ groupdetail.product_name }}</td>
                        <td>{{ groupdetail.prodgroup_sale_price }}</td>
                        <td>
                            <button class="btn btn-outline-primary prodDelete" @click=" deleteProdToDB(index)">
                                <i class="fa-solid fa-trash-can"></i>
                                刪除
                            </button>
                        </td>
                    </tr>
                </tbody>
            </table>

            <nav aria-label="Page navigation example" class="gd_pagenumber">
                <ul class="pagination">
                    <li class="page-item" :class="{ 'disabled': currentPage === 1 }">
                        <button class="page-link btn btn-outline-primary bg-transparent border-0" aria-label="Previous"
                            @click="prevPage">
                            <span aria-hidden="true">&laquo;</span>
                        </button>
                    </li>
                    <li v-for="page in totalPages" class="page-item" :key="page">
                        <button type="button" class="btn btn-outline-primary pageLink gd_btn"
                            @click="goToPage(page)">{{ page }}</button>
                    </li>
                    <li class="page-item" :class="{ 'disabled': currentPage === totalPages }">
                        <button class="page-link btn-outline-primary bg-transparent border-0" aria-label="Next"
                            @click="nextPage">
                            <span aria-hidden="true">&raquo;</span>
                        </button>
                    </li>
                </ul>
            </nav>
        </div>
    </div>
</template>

<script>
import SideBar from "@/components/SideBar.vue";
import axios from "axios";
import { ref, onMounted } from 'vue';

export default {
    data() {
        return {
            selectAll: false,
            groupdetails: [
                // { groupdetailNumber: '0001', groupdetailName: '首頁推薦', groupProdNo: '#001、#002' },
                // { groupdetailNumber: '0002', groupdetailName: 'BMI過輕', groupProdNo: '#001、#002' },
                // { groupdetailNumber: '0003', groupdetailName: '龍年促銷', groupProdNo: '#001、#002', sales: '折10元' },
                // { groupdetailNumber: '0004', groupdetailName: '食譜食材推薦', groupProdNo: '#001、#002' },

                // 其他商品數據
            ],

            prodgroup_details_no: '',
            prodgroup_no: '',
            product_name: '',
            prodgroup_name: '',
            prodgroup_sale_price: '',

            prodgroupOptions: [],
            productOptions: [],
            props: ['productGroupNo'],
            display: [],
            isModalShown: true,
            groupDetailPage: 6,
            currentPage: 1,




        }
    },
    components: {
        SideBar,
    },
    created() {
        this.fetchData();
    },
    computed: {
        totalPages() {
            return Math.ceil(this.groupdetails.length / this.groupDetailPage);
        },
        paginatedGroupdetail() {
            const start = (this.currentPage - 1) * this.groupDetailPage;
            const end = start + this.groupDetailPage;
            return this.groupdetails.slice(start, end)
        }

    },
    methods: {
        filterList(e) {
            const filterType = e.target.value;

            if (!filterType || filterType === '') {
                this.display = this.groupdetails;
            }
        },

        async fetchData() {
            try {
                const response = await axios.get(`${import.meta.env.VITE_API_URL}/admin/product/groupDetailsDataGet.php`);
                this.groupdetails = response.data.prodgroup_details;
                this.prodgroupOptions = response.data.prodgroup_options;
                this.productOptions = response.data.product_options;
            } catch (error) {
                console.error('Error:', error);
            }
        },
        updateProdgroupNo() {
            const selectedProdgroup = this.prodgroup_name;
            const selectedOption = this.prodgroupOptions.find(option => option.prodgroup_name === selectedProdgroup);
            if (selectedOption) {
                // 如果找到選中的群組名，則更新群組編號
                this.prodgroup_no = selectedOption.prodgroup_no;
            } else {
                // 沒有找到則清空群組編號
                this.prodgroup_no = '';
            }
        },


        addGroupDetailToDB() {
    // 創建 FormData 對象
    const addgroupDetailForm = new FormData();
    // 將其餘數據添加到 FormData 對象中
    addgroupDetailForm.append('prodgroup_details_no', this.prodgroup_details_no);
    addgroupDetailForm.append('prodgroup_no', this.prodgroup_no);
    addgroupDetailForm.append('prodgroup_name', this.prodgroup_name);
    addgroupDetailForm.append('prodgroup_sale_price', this.prodgroup_sale_price);

    // 發送 POST 請求到後端
    axios.post(`${import.meta.env.VITE_API_URL}/admin/product/groupDetailDataAdd.php`, addgroupDetailForm, {
        headers: {
            'Content-Type': 'multipart/form-data',
        },
    })
    .then(response => {
        if (!response.data.error) {
            const newGroupDetail = response.data; // 從伺服器返回新商品細節
            this.groupdetails.push(newGroupDetail); // 將新商品細節添加到 groupdetails 陣列中

            // 清空表單字段
            this.prodgroup_no = '';
            this.prodgroup_name = '';
            this.prodgroup_sale_price = '';

            // 在此處執行其他操作，例如刷新數據列表
            this.isModalShown = false;
            // 手動移除背景灰色效果
            const modalBackdrop = document.querySelector('.modal-backdrop');
            if (modalBackdrop) {
                modalBackdrop.remove();
            }
        }
    })
    .catch(error => {
        console.error('添加群組詳細信息時出錯：', error);
    });
},


        toggleAll() {
            this.groupdetails.forEach(groupdetail => {
                groupdetail.checked = this.selectAll;
            });
        },


        deleteProdToDB(index) {
            const prodgroup_details_no = this.groupdetails[index].prodgroup_details_no; 
            axios.post(`${import.meta.env.VITE_API_URL}/admin/product/groupDetailDataDelete.php`, {
                prodgroup_details_no: prodgroup_details_no
            }, {
                headers: {
                    'Content-Type': 'application/json',
                }
            })
                .then(response => {
                    const confirmed = window.confirm("確定要刪除此群組明細嗎?");
                    if (!response.data.error && confirmed) {
                        this.groupdetails.splice(index, 1)
                    }
                })
                .catch(error => {
                    console.error('Error deleting groupdetails:', error);
                })
        },


        nextPage() {
            if (this.currentPage < this.totalPages) {
                this.currentPage += 1;
            }
        },
        prevPage() {
            if (this.currentPage > 1) {
                this.currentPage -= 1;
            }
        },
        goToPage(pageNumber) {
            if (pageNumber >= 1 && pageNumber <= this.totalPages) {
                this.currentPage = pageNumber;
            }
        },
    },

}
</script>

<style lang="scss">@import "@/assets/scss/page/_groupdetail.scss";
@import "@/assets/scss/sidebar.scss";</style>