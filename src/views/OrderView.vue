<template>
    <div class="order">
        <SideBar />
        <div class="orderRight">

            <h1>訂單總覽</h1>
            <input type="search" class="search" placeholder="搜尋" v-model="searchQuery" />



            <!-- Modal -->


            <table class="table productTable">
                <thead>
                    <tr>
                        <th scope="col">
                            <input type="checkbox" v-model="selectAll" @change="toggleSelect">
                        </th>
                        <th scope="col">訂單編號</th>
                        <th scope="col">會員編號</th>
                        <th scope="col">訂單金額</th>
                        <th scope="col">訂單時間</th>
                        <th scope="col">訂單狀態</th>
                        <th scope="col"></th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(oder, index) in filteredOrders" :key="index">
                        <td>
                            <input type="checkbox" v-model="selectedoders" :value="oder">
                        </td>
                        <td>{{ oder.oderNumber }}</td>
                        <td>{{ oder.member }}</td>
                        <td>{{ oder.orderprice }}</td>
                        <td>{{ oder.oderTime }}</td>
                        <td>{{ oder.orderstatus }}</td>
                        <td>
                            <button class="btn btn-outline-primary" data-bs-toggle="modal" data-bs-target="#staticBackdrop"
                                @click="viewOrderDetail(oder)">
                                <i class="fa-solid fa-pencil"></i>
                                修改
                            </button>
                            <button class="btn btn-outline-primary ordersee">
                                查看詳情
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
                            <h5 class="modal-title" id="staticBackdropLabel">修改訂單明細</h5>
                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div class="modal-body" v-if="selectedOrderDetail">
                            <!-- 流水號 -->
                            <label for="exampleFormControlInput1" class="form-label">訂單明細編號:01</label>
                            <br>
                            <label for="exampleFormControlInput1" class="form-label">訂單編號: {{ selectedOrderDetail.oderNumber
                            }}</label>
                            <br>
                            <label for="exampleFormControlInput1" class="form-label">會員名稱: 王小名</label>
                            <br>
                            <label for="exampleFormControlInput2" class="form-label">收件人</label>
                            <input type="text" class="form-control" id="exampleFormControlInput2" value="王小名">
                            <label for="exampleFormControlInput2" class="form-label">EMAIL</label>
                            <input type="email" class="form-control" id="exampleFormControlInput2" value="aabbcc@test.com">
                            <label for="exampleFormControlInput2" class="form-label">電話</label>
                            <input type="number" class="form-control" id="exampleFormControlInput2" value="0988123456">
                            <label for="exampleFormControlInput2" class="form-label">地址</label>
                            <input type="text" class="form-control" id="exampleFormControlInput2" value="桃園市中壢區成功路88號">
                            <label for="form-select">出貨方式</label>
                            <select class="form-select" aria-label="Default select example">
                                <option value="1" selected>宅配</option>
                                <option value="2">7-11取貨</option>

                            </select>
                            <label for="form-select">付款狀態</label>
                            <select class="form-select" aria-label="Default select example">
                                <option value="1" selected>已付款</option>
                                <option value="2">未付款</option>

                            </select>
                            <label for="form-select">訂單狀態</label>
                            <select class="form-select" aria-label="Default select example">
                                <option value="1" selected>已配送</option>
                                <option value="2">未配送</option>

                            </select>

                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-outline-primary" data-bs-dismiss="modal">回列表</button>
                            <button type="button" class="btn btn-primary">儲存</button>
                        </div>
                    </div>
                </div>
            </div>
            <nav aria-label="Page navigation example">
                <ul class="pagination">
                    <li class="page-item" @click="currentPage > 1 ? currentPage-- : null">
                        <a class="page-link" href="#" aria-label="Previous">
                            <span aria-hidden="true">&lsaquo;</span>
                        </a>
                    </li>
                    <li v-for="page in totalPages" :key="page" class="page-item"
                        :class="{ 'active': page === currentPage }">
                        <a class="page-link" href="#" @click="changePage(page)">{{ page }}</a>
                    </li>
                    <li class="page-item" @click="currentPage < totalPages ? currentPage++ : null">
                        <a class="page-link" href="#" aria-label="Next">
                            <span aria-hidden="true">&rsaquo;</span>
                        </a>
                    </li>
                </ul>
            </nav>
            

        </div>
    </div>
</template>

<script>
import SideBar from "@/components/SideBar.vue";
import { ref, computed } from 'vue';

export default {
    data() {
        return {
            searchQuery: '',
            selectAll: ref(false),
            selectedoders: ref([]),
            oders: ref([
                { oderNumber: '231231182410', member: '0001', orderprice: 3000, oderTime: '2023/12/31 18:24:10', orderstatus: '已配送' },
                { oderNumber: '231231161616', member: '0002', orderprice: 2000, oderTime: '2023/12/31 16:16:16', orderstatus: '未配送' },
            
            ]),
            itemsPerPage: 5,
            currentPage: 1,
            selectedOrderDetail: ref(null),
        };
    },
    components: {
        SideBar,
    },
    computed: {
        // paginatedoders() {
        //     const startIndex = (this.currentPage - 1) * this.itemsPerPage;
        //     const endIndex = startIndex + this.itemsPerPage;
        //     return this.oders.slice(startIndex, endIndex);
        // },
        // totalPages() {
        //     return Math.ceil(this.oders.length / this.itemsPerPage);
        // },
        filteredOrders() {
            const query = this.searchQuery.trim().toLowerCase();
            if (query === '') {
                return this.oders;
            } else {
                return this.oders.filter(order => order.oderNumber.includes(query));
            }
        },
        paginatedoders() {
            const startIndex = (this.currentPage - 1) * this.itemsPerPage;
            const endIndex = startIndex + this.itemsPerPage;
            return this.filteredOrders.slice(startIndex, endIndex);
        },
        totalPages() {
            return Math.ceil(this.filteredOrders.length / this.itemsPerPage);
        },
    },
    methods: {
        changePage(page) {
            this.currentPage = page;
        },

        toggleSelect() {
            if (this.selectAll) {
                this.selectedoders = [...this.oders];
            } else {
                this.selectedoders = [];
            }
        },
        viewOrderDetail(order) {
            this.selectedOrderDetail = { ...order };
        },

    },

};

</script>


<style lang="scss">
@import "@/assets/scss/page/order.scss";
@import "@/assets/scss/sidebar.scss";
</style>
