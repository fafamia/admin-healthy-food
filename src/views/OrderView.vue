<template>
    <div class="order">
        <SideBar />
        <div class="orderRight">
            <h1>訂單總覽</h1>
            <input type="search" class="search" placeholder="搜尋" v-model="searchQuery" />
            <table class="table table-hover table-bordered border-dark">
                <thead>
                    <tr>
                        <th scope="col">訂單編號</th>
                        <th scope="col">會員編號</th>
                        <th scope="col">訂單金額</th>
                        <th scope="col">訂單時間</th>
                        <th scope="col">訂單狀態</th>
                        <th scope="col"></th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="order in orders" :key="order.ord_no">
                        <td>{{ order.ord_no }}</td>
                        <td>{{ order.member_no }}</td>
                        <td>{{ order.ord_payment }}</td>
                        <td>{{ order.ord_time }}</td>
                        <td>{{ order.ord_status }}</td>
                        <td>
                            <button class="btn btn-outline-primary orderbtn" data-bs-toggle="modal" data-bs-target="#orderInfo"  @click="fetchOrderDetails(order.ord_no)">
                                修改資訊
                            </button>
                            <button class="btn btn-outline-primary orderbtn" data-bs-toggle="modal" data-bs-target="#orderDetail"  @click="fetchOrderDetails(order.ord_no)">
                                查看詳情
                            </button>
                        </td>
                    </tr>
                </tbody>
            </table>
            <!-- 修改訂單資訊(訂購資料) -->
            <div class="modal fade" id="orderInfo" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-hidden="true">
                <div class="modal-dialog">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title">修改訂單資訊</h5>
                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div class="modal-body">
                            <label for="exampleFormControlInput1" class="form-label">訂單編號:{{ selectOrder.ord_no }}</label>
                            <br>
                            <label for="exampleFormControlInput1" class="form-label">會員名稱{{ selectOrder.member_name }}</label>
                            <br>
                            <label for="ord_name" class="form-label">收件人</label>
                            <input type="text" class="form-control" id="ord_name" v-model="selectOrder.ord_name">
                            
                            <label for="take_mail" class="form-label">EMAIL</label>
                            <input type="email" class="form-control" id="take_mail" v-model="selectOrder.take_mail">
                            
                            <label for="take_tel" class="form-label">電話</label>
                            <input type="number" class="form-control" id="take_tel" v-model="selectOrder.take_tel">
                            
                            <label for="take_address" class="form-label">地址</label>
                            <input type="text" class="form-control" id="take_address" v-model="selectOrder.take_address">
                            
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
            <!-- 查看訂單詳情(商品) -->
            <div class="modal fade" id="orderDetail" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-hidden="true">
                <div class="modal-dialog">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title">查看訂單詳情</h5>
                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div class="modal-body">
                            <label for="exampleFormControlInput1" class="form-label">訂單編號:{{ selectOrder.ord_no }}</label>
                            <br>
                            <table class="table table-hover table-bordered border-dark">
                                <thead>
                                    <tr>
                                        <th scope="col">商品編號</th>
                                        <th scope="col">商品名稱</th>
                                        <th scope="col">價格</th>
                                        <th scope="col">商品數量</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr v-for="detail in displayOrderDetails" :key="detail.product_no">
                                        <td>{{ detail.product_no }}</td>
                                        <td>{{ detail.product_name }}</td>
                                        <td>{{ detail.product_price }}</td>
                                        <td>{{ detail.product_quantity }}</td>
                                    </tr>
                                </tbody>
                            </table>
                            <div class="modal-footer">
                                <button type="button" class="btn btn-outline-primary" data-bs-dismiss="modal">回列表</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <!-- <tfoot>
                <tr>
                    <td colspan="7">
                        <nav aria-label="Page navigation example">
                            <ul class="pagination">
                                <li class="page-item" @click="currentPage > 1 ? changePage(currentPage - 1) : null">
                                    <a class="page-link" href="#" aria-label="Previous">
                                        <span aria-hidden="true">&lsaquo;</span>
                                    </a>
                                </li>
                                <li v-for="page in totalPages" :key="page" class="page-item"
                                    :class="{ 'active': page === currentPage }">
                                    <a class="page-link" href="#" @click="changePage(page)">{{ page }}</a>
                                </li>
                                <li class="page-item"
                                    @click="currentPage < totalPages ? changePage(currentPage + 1) : null">
                                    <a class="page-link" href="#" aria-label="Next">
                                        <span aria-hidden="true">&rsaquo;</span>
                                    </a>
                                </li>
                            </ul>
                        </nav>
                    </td>
                </tr>
            </tfoot> -->
        </div>
    </div>
</template>

<script>
import SideBar from "@/components/SideBar.vue";
import axios from "axios";

export default {
    data() {
        return {
            orders: [],
            selectOrder : {
                ord_no:'',
                member_name:'',
                ord_name:'',
                take_mail:'',
                take_tel:'',
                take_address:'',
                delivery_fee:'',
                ord_amount:'',
                sales_amount:'',
                ord_payment:'',
                shipping_status:'',
                payment_status:'',
                ord_status:'',
            },
            orderDetails: [],
            displayOrderDetails:[],
            searchQuery: '',
            selectAll: false,
            selectedorders: [],
            itemsPerPage: 5,
            currentPage: 1,
            selectedOrderDetail: null,
        };
    },
    components: {
        SideBar,
    },
    mounted(){
        this.fetchOrderToDB();
    },
    computed: {
        // filteredOrders() {
        //     const query = this.searchQuery.trim().toLowerCase();
        //     if (query === '') {
        //         return this.orders;
        //     } else {
        //         return this.orders.filter(order => order.orderNumber.includes(query));
        //     }
        // },
        // paginatedorders() {
        //     const startIndex = (this.currentPage - 1) * this.itemsPerPage;
        //     const endIndex = startIndex + this.itemsPerPage;
        //     return this.filteredOrders.slice(startIndex, endIndex);
        // },
        // totalPages() {
        //     return Math.ceil(this.filteredOrders.length / this.itemsPerPage);
        // },
    },
    methods: {
        fetchOrderToDB() {
            axios.get(`${import.meta.env.VITE_API_URL}/admin/order/orderDataGet.php`)
                .then(response => {
                    this.orders = response.data.orderRows;
                })
                .catch(error => {
                    console.error('Error fetching orders:', error);
                });
            axios.get(`${import.meta.env.VITE_API_URL}/admin/order/orderDataDetailGet.php`)
                .then(response =>{
                    this.orderDetails = response.data.orderDetailsRows;
                })
                .catch(error =>{
                    console.error('Error fetching orders:', error);
                });
        },
        fetchOrderDetails(ordNo){
            //array.find會比對陣列中的元素，傳回第一個找到的值
            this.selectOrder = this.orders.find(o=> o.ord_no.toString() === ordNo.toString());
            //array.filter會比對陣列中的元素，傳回所有符合的值
            this.displayOrderDetails = this.orderDetails.filter(o=> o.ord_no.toString() === ordNo.toString());
        },
        changePage(page) {
            this.currentPage = page;
        },
        viewOrderDetail(order) {
            this.selectedOrderDetail = { ...order };
            // $('#orderDetailModal').modal('show');
        },
        changeDetail(order) {
            this.selectedOrderDetail = { ...order };
        },

    },
};

</script>


<style lang="scss">
@import "@/assets/scss/page/order.scss";
@import "@/assets/scss/sidebar.scss";
</style>
