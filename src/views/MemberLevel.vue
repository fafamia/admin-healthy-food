<template>
    <div class="memberlevel row">
        <SideBar class="col-3" />
        <div class="memberlevel_right col-9">
            <h2>會員等級</h2>
            <div class="memberlevel_btn mb-2">
                <button type="button" class="btn btn-outline-primary"><i class="fa-solid fa-circle-plus"></i>新增</button>
            </div>
            <table class="table table-hover table-bordered border-dark">
                <tr>
                    <th scope="col"><input type="checkbox" /></th>
                    <th scope="col">等級編號</th>
                    <th scope="col">等級名稱</th>
                    <th scope="col">消費門檻</th>
                    <th scope="col">消費折扣</th>
                    <th scope="col"><button type="button" class="btn btn-outline-primary"><i class="fa-solid fa-trash"></i>
                            刪除</button></th>
                </tr>
                <tr>
                    <td><input type="checkbox" /></td>
                    <td>00001</td>
                    <td>一般會員</td>
                    <td>0-3000</td>
                    <td>0</td>
                    <td><button type="button" class="btn btn-outline-primary me-2"><i
                                class="fa-solid fa-trash"></i>刪除</button>
                        <button type="button" class="btn btn-outline-primary"><i class="fa-solid fa-pen"></i>修改</button>
                    </td>
                </tr>
                <tr>
                    <td><input type="checkbox" /></td>
                    <td>00002</td>
                    <td>白金會員</td>
                    <td>3001-8000</td>
                    <td>0</td>
                    <td><button type="button" class="btn btn-outline-primary me-2"><i
                                class="fa-solid fa-trash"></i>刪除</button>
                        <button type="button" class="btn btn-outline-primary"><i class="fa-solid fa-pen"></i>修改</button>
                    </td>
                </tr>
                <tr>
                    <td><input type="checkbox" /></td>
                    <td>00003</td>
                    <td>黃金會員</td>
                    <td>8001-16000</td>
                    <td>0.95</td>
                    <td><button type="button" class="btn btn-outline-primary me-2"><i
                                class="fa-solid fa-trash"></i>刪除</button>
                        <button type="button" class="btn btn-outline-primary"><i class="fa-solid fa-pen"></i>修改</button>
                    </td>
                </tr>
                <tr>
                    <td><input type="checkbox" /></td>
                    <td>00004</td>
                    <td>鑽石會員</td>
                    <td>>16000</td>
                    <td>0.9</td>
                    <td><button type="button" class="btn btn-outline-primary me-2"><i
                                class="fa-solid fa-trash"></i>刪除</button>
                        <button type="button" class="btn btn-outline-primary"><i class="fa-solid fa-pen"></i>修改</button>
                    </td>
                </tr>
            </table>
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

<style lang="scss">
@import "@/assets/scss/page/memberlevel.scss";
@import "@/assets/scss/sidebar.scss";
</style>