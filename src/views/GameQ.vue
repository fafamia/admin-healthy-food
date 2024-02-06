<template>
    <SideBar />
    <div class="game">
        <h2>題目總覽</h2>
        <div class="game_btn mb-2">
            <button type="button" class="btn btn-outline-primary" data-bs-toggle="modal" data-bs-target="#addGameQ"><i
                    class="fa-solid fa-circle-plus me-1"></i>新增</button>
            <input type="search" class="game_search" placeholder="搜尋" />
        </div>
        <table class="table table-hover table-bordered border-dark">
            <thead>
                <tr>
                    <th scope="col"><input type="checkbox" /></th>
                    <th scope="col">題目編號</th>
                    <th scope="col">題目名稱</th>
                    <th scope="col">狀態</th>
                    <th scope="col"><button type="button" class="btn btn-outline-primary"><i
                                class="fa-solid fa-trash me-1"></i>
                            刪除</button></th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td><input type="checkbox" /></td>
                    <td>00001</td>
                    <td>何謂「五蔬果」的建議攝取量？</td>
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
                    <td>BMI是用來評估什麼身體狀態？</td>
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
                    <td>為何多喝水對健康有益？</td>
                    <td>下架</td>
                    <td><button type="button" class="btn btn-outline-primary me-2"><i
                                class="fa-solid fa-trash me-1"></i>刪除</button>
                        <button type="button" class="btn btn-outline-primary"><i
                                class="fa-solid fa-pen me-1"></i>修改</button>
                    </td>
                </tr>
                <tr>
                    <td><input type="checkbox" /></td>
                    <td>00004</td>
                    <td>下列哪種食物不是蛋白質的良好來源？</td>
                    <td>上架</td>
                    <td><button type="button" class="btn btn-outline-primary me-2"><i
                                class="fa-solid fa-trash me-1"></i>刪除</button>
                        <button type="button" class="btn btn-outline-primary"><i
                                class="fa-solid fa-pen me-1"></i>修改</button>
                    </td>
                </tr>
            </tbody>
        </table>
        <div class="modal fade" id="addGameQ" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div class="modal-dialog modal-dialog-scrollable">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="exampleModalLabel">新增題目</h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body text-start">
                        <label for="gameQ">題目:</label>
                        <input type="text" name="" id="gameQ" class="w-75 mb-3"><br>
                        <label for="gameAns_a">回答A:</label>
                        <input type="text" name="" id="gameAns_a" class="w-75 mb-3"><br>
                        <label for="gameAns_b">回答B:</label>
                        <input type="text" name="" id="gameAns_b" class="w-75 mb-3"><br>
                        <label for="gameAns_c">回答C:</label>
                        <input type="text" name="" id="gameAns_c" class="w-75 mb-3"><br>
                        <label for="gameAns_d">回答D:</label>
                        <input type="text" name="" id="gameAns_d" class="w-75 mb-3"><br>
                        <label>正確答案:</label>
                        <select class="w-25 mb-3">
                            <option value="a">A</option>
                            <option value="b">B</option>
                            <option value="c">C</option>
                            <option value="d">D</option>
                        </select><br>

                        <p>解釋:</p>
                        <textarea name="" id="" cols="30" rows="10" class="w-100"></textarea>
                        <label for="">狀態:</label>
                        <select class="w-25">
                            <option value="">上架</option>
                            <option value="">下架</option>
                        </select>

                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-primary">確認</button>
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

<style lang="scss">@import "@/assets/scss/page/game.scss";
@import "@/assets/scss/sidebar.scss";</style>