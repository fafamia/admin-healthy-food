<template>
    <div class="game row">
        <SideBar class="col-3" />
        <div class="game_right col-9">
            <h2>題目總覽</h2>
            <div class="game_btn mb-2">
                <button type="button" class="btn btn-outline-primary"><i class="fa-solid fa-circle-plus"></i>新增</button>
                <input type="search" class="game_search" placeholder="搜尋" />
            </div>
            <table class="table table-hover table-bordered border-dark">
                <tr>
                    <th scope="col"><input type="checkbox" /></th>
                    <th scope="col">題目編號</th>
                    <th scope="col">題目名稱</th>
                    <th scope="col">狀態</th>
                    <th scope="col"><button type="button" class="btn btn-outline-primary"><i class="fa-solid fa-trash"></i>
                            刪除</button></th>
                </tr>
                <tr>
                    <td><input type="checkbox" /></td>
                    <td>00001</td>
                    <td>何謂「五蔬果」的建議攝取量？</td>
                    <td>上架</td>
                    <td><button type="button" class="btn btn-outline-primary me-2"><i
                                class="fa-solid fa-trash"></i>刪除</button>
                        <button type="button" class="btn btn-outline-primary"><i class="fa-solid fa-pen"></i>修改</button>
                    </td>
                </tr>
                <tr>
                    <td><input type="checkbox" /></td>
                    <td>00002</td>
                    <td>BMI是用來評估什麼身體狀態？</td>
                    <td>上架</td>
                    <td><button type="button" class="btn btn-outline-primary me-2"><i
                                class="fa-solid fa-trash"></i>刪除</button>
                        <button type="button" class="btn btn-outline-primary"><i class="fa-solid fa-pen"></i>修改</button>
                    </td>
                </tr>
                <tr>
                    <td><input type="checkbox" /></td>
                    <td>00003</td>
                    <td>為何多喝水對健康有益？</td>
                    <td>下架</td>
                    <td><button type="button" class="btn btn-outline-primary me-2"><i
                                class="fa-solid fa-trash"></i>刪除</button>
                        <button type="button" class="btn btn-outline-primary"><i class="fa-solid fa-pen"></i>修改</button>
                    </td>
                </tr>
                <tr>
                    <td><input type="checkbox" /></td>
                    <td>00004</td>
                    <td>下列哪種食物不是蛋白質的良好來源？</td>
                    <td>上架</td>
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
@import "@/assets/scss/page/game.scss";
@import "@/assets/scss/sidebar.scss";
</style>