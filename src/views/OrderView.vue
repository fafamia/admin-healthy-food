<template>
    <div class="order">
        <SideBar />
        <div class="orderRight">
            <h1>訂單總覽</h1>
            <input type="text" class="search" placeholder="搜尋" v-model="searchOrder" @input="filteredOrders" />
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
                    <tr v-for="order in paginatedOrders" :key="order.ord_no">
                        <td>{{ order.ord_no }}</td>
                        <td>{{ order.member_no }}</td>
                        <td>{{ order.ord_payment }}</td>
                        <td>{{ order.ord_time }}</td>
                        <td>{{ ord_status[order.ord_status] }}</td>
                        <td>
                            <button class="btn btn-outline-primary orderbtn" data-bs-toggle="modal"
                                data-bs-target="#orderInfo" @click="fetchOrder(order.ord_no)">
                                修改資訊
                            </button>
                            <button class="btn btn-outline-primary orderbtn" data-bs-toggle="modal"
                                data-bs-target="#orderDetail" @click="fetchOrderDetails(order.ord_no)">
                                查看詳情
                            </button>
                        </td>
                    </tr>
                </tbody>
            </table>
            <!-- 頁碼 -->
            <nav aria-label="Page navigation example">
                <ul class="pagination">
                    <li class="page-item" :class="{ 'disabled': currentPage === 1 }">
                        <button class="page-link btn btn-outline-primary bg-transparent border-0" aria-label="Previous"
                            @click="prevPage">
                            <span aria-hidden="true">&laquo;</span>
                        </button>
                    </li>
                    <li v-for="page in totalPages" class="page-item" :key="page">
                        <button type="button" class="btn btn-outline-primary pageLink"
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
            <!-- 修改訂單資訊(訂購資料) -->
            <div class="modal fade" id="orderInfo" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1"
                aria-hidden="true">
                <div class="modal-dialog">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title">修改訂單資訊</h5>
                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div class="modal-body">
                            <label for="exampleFormControlInput1" class="form-label">訂單編號:{{ selectOrder.ord_no }}</label>
                            <br>
                            <label for="exampleFormControlInput1" class="form-label">會員名稱:{{ selectOrder.member_name
                            }}</label>
                            <br>
                            <label for="ord_name" class="form-label">收件人</label>
                            <input type="tel" class="form-control mb-3" id="ord_name" v-model="selectOrder.ord_name">
                            <label for="take_mail" class="form-label">EMAIL</label>
                            <input type="email" class="form-control mb-3" id="take_mail" v-model="selectOrder.take_mail">
                            <label for="take_tel" class="form-label">電話</label>
                            <input type="text" class="form-control mb-3" id="take_tel" v-model="selectOrder.take_tel">
                            <label for="take_address" class="form-label">地址</label>
                            <input type="text" class="form-control mb-3" id="take_address"
                                v-model="selectOrder.take_address">
                            <label for="form-select">付款方式</label>
                            <select class="form-select mb-3" aria-label="Default select example"
                                v-model="selectOrder.payment_status">
                                <option v-for="(status, index) in payment_status" :key="index" :value="index">{{ status }}
                                </option>
                            </select>
                            <label for="form-select">出貨方式</label>
                            <select class="form-select mb-3" aria-label="Default select example"
                                v-model="selectOrder.shipping_status">
                                <option v-for="(status, index) in shipping_status" :key="index" :value="index">{{ status }}
                                </option>
                            </select>
                            <label for="form-select">訂單狀態</label>
                            <select class="form-select" aria-label="Default select example" name="ord_status"
                                v-model="selectOrder.ord_status">
                                <option v-for="(status, index) in ord_status" :key="index" :value="index">{{ status }}
                                </option>
                            </select>
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-outline-primary" data-bs-dismiss="modal">回列表</button>
                            <button type="button" class="btn btn-primary" @click="updateOrderToDB">儲存</button>
                        </div>
                    </div>
                </div>
            </div>
            <!-- 查看訂單詳情(商品) -->
            <div class="modal fade" id="orderDetail" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1"
                aria-hidden="true">
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
            selectOrder: {
                ord_no: '',
                member_name: '',
                ord_name: '',
                take_mail: '',
                take_tel: '',
                take_address: '',
                delivery_fee: '',
                ord_amount: '',
                sales_amount: '',
                ord_payment: '',
                shipping_status: '',
                payment_status: '',
                ord_status: '',
            },
            shipping_status: {
                '0': '宅配到府',
                '1': '7-11取貨',
            },
            payment_status: {
                '0': '銀行轉帳',
                '1': '線上刷卡',
            },
            ord_status: {
                '0': '未配送',
                '1': '已配送',
            },
            orderDetails: [],
            displayOrderDetails: [],
            OrdersPerPage: 4,
            currentPage: 1,
            searchOrder: '',
        };
    },
    components: {
        SideBar,
    },
    mounted() {
        this.fetchOrderToDB();
    },
    computed: {
        totalPages() {
            return Math.ceil(this.orders.length / this.OrdersPerPage);
        },
        paginatedOrders() {
            const start = (this.currentPage - 1) * this.OrdersPerPage;
            const end = start + this.OrdersPerPage;
            return this.orders.slice(start, end)
        }
    },
    methods: {
        fetchOrderToDB() {
            //把訂購資料叫進order陣列中
            axios.get(`${import.meta.env.VITE_API_URL}/admin/order/orderDataGet.php`)
                .then(response => {
                    this.orders = response.data.orderRows;
                    this.searchOrdData = response.data.orderRows;
                })
                .catch(error => {
                    console.error('訂單錯誤:', error);
                });
            //把orderDetails叫進orderDetails陣列中
            axios.get(`${import.meta.env.VITE_API_URL}/admin/order/orderDataDetailGet.php`)
                .then(response => {
                    this.orderDetails = response.data.orderDetailsRows;
                })
                .catch(error => {
                    console.error('訂單明細錯誤:', error);
                });
        },
        fetchOrder(ordNo) {
            //array.find會比對陣列中的元素，傳回第一個找到的值
            this.selectOrder = this.orders.find(o => `${o.ord_no}` === `${ordNo}`);
        },
        updateOrderToDB() {
            //axios.post(URL,Data,Headers)
            axios.post(`${import.meta.env.VITE_API_URL}/admin/order/orderDataUpdate.php`,
                this.selectOrder)
                .then(response => {
                    if (!response.data.error) {
                        const index = this.orders.findIndex(o => `${o.ord_no}` === `${this.selectOrder.ord_no}`);
                        if (index !== -1) {
                            this.fetchOrderDetails();
                        }
                    }
                })
                .catch(error => {
                    console.error('更新訂單錯誤:', error);
                });
        },
        fetchOrderDetails(ordNo) {
            //array.filter會比對陣列中的元素，傳回所有符合的值(商品有多筆資料)
            this.displayOrderDetails = this.orderDetails.filter(o => `${o.ord_no}` === `${ordNo}`);
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
        filteredOrders() {
        this.orders = this.searchOrdData.filter((order)=>{
            let ordNo = `${order.ord_no}`;
            let search = this.searchOrder;
            return ordNo.includes(search);
        })
        },
    },
};

</script>


<style lang="scss">@import "@/assets/scss/page/order.scss";
@import "@/assets/scss/sidebar.scss";</style>
