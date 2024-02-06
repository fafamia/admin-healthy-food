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
                    <th scope="col"><input type="checkbox" /></th>
                    <th scope="col">編號</th>
                    <th scope="col">答對題數</th>
                    <th scope="col">折扣金額</th>
                    <th scope="col">有效天數</th>
                    <th scope="col">狀態</th>
                    <th scope="col"><button type="button" class="btn btn-outline-primary"><i class="fa-solid fa-trash"></i>
                            刪除</button></th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td><input type="checkbox" /></td>
                    <td>00001</td>
                    <td>3</td>
                    <td>30元</td>
                    <td>60天</td>
                    <td>上架</td>
                    <td><button type="button" class="btn btn-outline-primary me-2"><i
                                class="fa-solid fa-trash me-1"></i>刪除</button>
                        <button type="button" class="btn btn-outline-primary"><i
                                class="fa-solid fa-pen me-1"></i>修改</button>
                    </td>
                </tr>
                <tr>
                    <td><input type="checkbox" /></td>
                    <td>00002</td>
                    <td>4</td>
                    <td>40元</td>
                    <td>60天</td>
                    <td>上架</td>
                    <td><button type="button" class="btn btn-outline-primary me-2"><i
                                class="fa-solid fa-trash me-1"></i>刪除</button>
                        <button type="button" class="btn btn-outline-primary"><i
                                class="fa-solid fa-pen me-1"></i>修改</button>
                    </td>
                </tr>
                <tr>
                    <td><input type="checkbox" /></td>
                    <td>00003</td>
                    <td>5</td>
                    <td>50元</td>
                    <td>60天</td>
                    <td>上架</td>
                    <td><button type="button" class="btn btn-outline-primary me-2"><i
                                class="fa-solid fa-trash me-1"></i>刪除</button>
                        <button type="button" class="btn btn-outline-primary"><i
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
                        <p>折價券編號: 0004</p>
                        <label for="" class="mb-3">折價券名稱:</label>
                        <input type="text" name="" id="" class="w-75"><br>
                        <label for="" class="mb-3">折扣金額:</label>
                        <input type="text" name="" id="" class="w-75"><br>
                        <label for="" class="mb-3">可用天數:</label>
                        <input type="number" name="" id="" class="w-75">
                        <p>說明:</p>
                        <textarea name="" id="" cols="30" rows="10" class="w-100"></textarea>
                        <label for="">狀態:</label>
                        <select name="" id="" class="w-25">
                            <option value="">上架</option>
                            <option value="">下架</option>
                        </select>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-primary">確定</button>
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
export default {
    data() {
        return {
        }
    },
    components: {
        SideBar,
    },
}
</script>

<style lang="scss">@import "@/assets/scss/page/coupon.scss";
@import "@/assets/scss/sidebar.scss";</style>