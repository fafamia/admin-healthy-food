<template>
    <SideBar />
    <div class="coupon">
        <h2>小遊戲折價券</h2>
        <div class="coupon_btn mb-2">
            <button type="button" class="btn btn-outline-primary" data-bs-toggle="modal" data-bs-target="#addCoupon"><i
                    class="fa-solid fa-circle-plus"></i> 新增</button>
            <input type="search" class="coupon_search" placeholder="搜尋" />
        </div>
        <table class="table table-hover table-bordered border-dark">
            <thead>
                <tr>
                    <th scope="col">編號</th>
                    <th scope="col">答對題數</th>
                    <th scope="col">折扣金額</th>
                    <th scope="col">有效天數</th>
                    <th scope="col">狀態</th>
                    <th scope="col"></th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(coupon, index) in couponData" :key="coupon.coupon_no">
                    <td>{{ coupon.coupon_no }}</td>
                    <td>{{ coupon.ans_num }}</td>
                    <td>{{ coupon.coupon_value }}元</td>
                    <td>{{ coupon.coupon_valid_days }}天</td>
                    <td>{{ coupon.coupon_status == 1 ? '上架' : '下架' }}</td>
                    <td><button type="button" class="btn btn-outline-primary me-2"
                            @click="deleteCoupon(coupon.coupon_no)"><i class="fa-solid fa-trash me-1"></i>刪除</button>
                        <button type="button" class="btn btn-outline-primary" data-bs-toggle="modal"
                            data-bs-target="#updateCoupon" @click="showCoupon(coupon.coupon_no)"><i
                                class="fa-solid fa-pen me-1"></i>修改</button>
                    </td>
                </tr>
            </tbody>
        </table>
        <div class="modal fade" id="addCoupon" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div class="modal-dialog modal-dialog-scrollable">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="exampleModalLabel">新增小遊戲折價券</h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body text-start">
                        <label for="" class="mb-3">折價券名稱:</label>
                        <input type="text" v-model="newCoupon.coupon_content" class="w-75"><br>
                        <label for="" class="mb-3">折扣金額:</label>
                        <input type="text" v-model="newCoupon.coupon_value" class="w-75"><br>
                        <label for="" class="mb-3">答對題數:</label>
                        <input type="number" v-model="newCoupon.ans_num" class="w-75"><br>
                        <label for="" class="mb-3">可用天數:</label>
                        <input type="number" v-model="newCoupon.coupon_valid_days" class="w-75">
                        <label for="">狀態:</label>
                        <select v-model="newCoupon.coupon_status" class="w-25">
                            <option value="1">上架</option>
                            <option value="2">下架</option>
                        </select>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-primary" @click="addCoupon">新增</button>
                    </div>
                </div>
            </div>
        </div>
        <div class="modal fade" id="updateCoupon" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div class="modal-dialog modal-dialog-scrollable">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="exampleModalLabel">修改小遊戲折價券</h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body text-start">
                        <p>折價券編號: {{ coupon.coupon_no }}</p>
                        <label for="" class="mb-3">折價券名稱:</label>
                        <input type="text" v-model="coupon.coupon_content" class="w-75"><br>
                        <label for="" class="mb-3">折扣金額:</label>
                        <input type="text" v-model="coupon.coupon_value" class="w-75"><br>
                        <label for="" class="mb-3">答對題數:</label>
                        <input type="number" v-model="coupon.ans_num" class="w-75"><br>
                        <label for="" class="mb-3">可用天數:</label>
                        <input type="number" v-model="coupon.coupon_valid_days" class="w-75">
                        <label for="">狀態:</label>
                        <select v-model="coupon.coupon_status" class="w-25">
                            <option value="1">上架</option>
                            <option value="2">下架</option>
                        </select>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-outline-secondary" data-bs-dismiss="modal">回列表</button>
                        <button type="button" class="btn btn-primary"
                            @click="updateCoupon(this.coupon.coupon_no)">儲存</button>
                    </div>
                </div>
            </div>
        </div>
        <div class="page">
            <nav aria-label="Page navigation example">
                <ul class="pagination">
                    <li class="page-item">
                        <a class="page-link" href="#" aria-label="Previous" style="border: none;">
                            <span aria-hidden="true">&laquo;</span>
                        </a>
                    </li>
                    <li class="page-item"><a class="page-link" href="#">1</a></li>
                    <li class="page-item"><a class="page-link" href="#">2</a></li>
                    <li class="page-item"><a class="page-link" href="#">3</a></li>
                    <li class="page-item"><a class="page-link" href="#">4</a></li>
                    <li class="page-item"><a class="page-link" href="#">5</a></li>
                    <li class="page-item">
                        <a class="page-link" href="#" aria-label="Next" style="border: none;">
                            <span aria-hidden="true">&raquo;</span>
                        </a>
                    </li>
                </ul>
            </nav>
        </div>
    </div>
</template>
<script>
import SideBar from "@/components/SideBar.vue";
import axios from "axios";
export default {
    data() {
        return {
            couponData: [],
            newCoupon: {
                ans_num: '',
                coupon_value: '',
                coupon_content: '',
                coupon_valid_days: '',
                coupon_status: '',
            },
            coupon: {},
        }
    },
    mounted() {
        axios.get(`${import.meta.env.VITE_API_URL}/admin/coupon/getCoupon.php`)
            .then((res) => {
                this.couponData = res.data;
                console.log(this.couponData);
            })
            .catch((err) => {
                console.log(err);
            })
    },
    methods: {
        addCoupon() {
            console.log(this.newCoupon);
            axios.post(`${import.meta.env.VITE_API_URL}/admin/coupon/addCoupon.php`, this.newCoupon)
                .then(res => {
                    alert(res.data.msg);
                    window.location.reload();
                })
                .catch(err => {
                    console.log('Error:', err);
                });
        },
        deleteCoupon(couponNo) {
            if (confirm('您確定要刪除此折價券嗎？')) {
                axios.post(`${import.meta.env.VITE_API_URL}/admin/coupon/deleteCoupon.php`, { coupon_no: couponNo }, {
                    headers: {
                        'Content-Type': 'application/json',
                    }
                })
                    .then((res) => {
                        alert('刪除成功');
                        console.log(res);
                        window.location.reload();
                    })
                    .catch((err) => {
                        console.log(err);
                    })
            } else {
                console.log('使用者取消操作');
            }
        },
        showCoupon(couponNo) {
            const coupon = this.couponData.find(q => q.coupon_no === couponNo);
            this.coupon = { ...coupon };
        },
        updateCoupon(couponNo) {
            axios.post(`${import.meta.env.VITE_API_URL}/admin/coupon/updateCoupon.php`, {
                coupon_no: couponNo,
                coupon_content: this.coupon.coupon_content,
                ans_num: this.coupon.ans_num,
                coupon_value: this.coupon.coupon_value,
                coupon_valid_days: this.coupon.coupon_valid_days,
                coupon_status: this.coupon.coupon_status
            })
                .then((res) => {
                    alert(res.data.msg);
                    window.location.reload();
                })
                .catch((err) => {
                    console.log(err);
                })
        },
    },
    components: {
        SideBar,
    },
}
</script>

<style lang="scss">
@import "@/assets/scss/page/coupon.scss";
@import "@/assets/scss/sidebar.scss";
</style>