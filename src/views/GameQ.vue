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
                    <th scope="col">題目編號</th>
                    <th scope="col">題目名稱</th>
                    <th scope="col">狀態</th>
                    <th scope="col"></th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(item, index) in gameData" :key="index">
                    <td>{{ item.quiz_no }}</td>
                    <td>{{ item.quiz_name }}</td>
                    <td>{{ item.quiz_status == 1 ? '上架' : '下架' }}</td>
                    <td><button type="button" class="btn btn-outline-primary me-2"
                            @click="deleteGameData(item.quiz_no, index)"><i class="fa-solid fa-trash me-1"></i>刪除</button>
                        <button type="button" class="btn btn-outline-primary" data-bs-toggle="modal"
                            data-bs-target="#updateGameQ" @click="showGame(item.quiz_no)"><i
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
                        <input type="text" v-model="newGame.quiz_name" name="gameTitle" id="gameQ" class="w-75 mb-3"
                            required><br>
                        <label for="gameAns_a">回答A:</label>
                        <input type="text" v-model="newGame.option_a" name="gameA" id="gameAns_a" class="w-75 mb-3"
                            required><br>
                        <label for="gameAns_b">回答B:</label>
                        <input type="text" v-model="newGame.option_b" name="gameB" id="gameAns_b" class="w-75 mb-3"
                            required><br>
                        <label for="gameAns_c">回答C:</label>
                        <input type="text" v-model="newGame.option_c" name="gameC" id="gameAns_c" class="w-75 mb-3"
                            required><br>
                        <label for="gameAns_d">回答D:</label>
                        <input type="text" v-model="newGame.option_d" name="gameD" id="gameAns_d" class="w-75 mb-3"
                            required><br>
                        <label>正確答案:</label>
                        <select class="w-25 mb-3" v-model="newGame.quiz_ans" name="gameAns" required>
                            <option value="a">A</option>
                            <option value="b">B</option>
                            <option value="c">C</option>
                            <option value="d">D</option>
                        </select><br>

                        <p>解釋:</p>
                        <textarea v-model="newGame.quiz_ans_info" name="ansInfo" id="" cols="30" rows="10"
                            class="w-100 mb-3" required></textarea>
                        <label>上傳圖片</label>
                        <input type="file" name="gameImg" accept="image/*" class="mb-3" required><br>
                        <label for="">狀態:</label>
                        <select v-model="newGame.quiz_status" class="w-25" name="gameStatus" required>
                            <option value="1">上架</option>
                            <option value="2">下架</option>
                        </select>

                    </div>
                    <div class="modal-footer">
                        <button type="submit" class="btn btn-primary" @click="addNewGame">確認</button>
                    </div>
                </div>
            </div>
        </div>
        <div class="modal fade" id="updateGameQ" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div class="modal-dialog modal-dialog-scrollable">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="exampleModalLabel">修改題目</h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body text-start">
                        <label for="gameQ">題目:</label>
                        <input type="text" v-model="game.quiz_name" name="gameTitle" id="gameQ" class="w-75 mb-3"
                            required><br>
                        <label for="gameAns_a">回答A:</label>
                        <input type="text" v-model="game.option_a" name="gameA" id="gameAns_a" class="w-75 mb-3"
                            required><br>
                        <label for="gameAns_b">回答B:</label>
                        <input type="text" v-model="game.option_b" name="gameB" id="gameAns_b" class="w-75 mb-3"
                            required><br>
                        <label for="gameAns_c">回答C:</label>
                        <input type="text" v-model="game.option_c" name="gameC" id="gameAns_c" class="w-75 mb-3"
                            required><br>
                        <label for="gameAns_d">回答D:</label>
                        <input type="text" v-model="game.option_d" name="gameD" id="gameAns_d" class="w-75 mb-3"
                            required><br>
                        <label>正確答案:</label>
                        <select class="w-25 mb-3" v-model="game.quiz_ans" name="gameAns" required>
                            <option value="a">A</option>
                            <option value="b">B</option>
                            <option value="c">C</option>
                            <option value="d">D</option>
                        </select><br>

                        <p>解釋:</p>
                        <textarea v-model="game.quiz_ans_info" name="ansInfo" id="" cols="30" rows="10" class="w-100 mb-3"
                            required></textarea>
                        <img :src="getImageUrl(game.quiz_photo)" alt="" height="200" class="mb-3"><br>
                        <label>上傳圖片</label>
                        <input type="file" @change="handleFileUpload" name="gameImg" accept="image/*" class="mb-3"
                            required><br>
                        <label for="">狀態:</label>
                        <select v-model="game.quiz_status" class="w-25" name="gameStatus" required>
                            <option value="1">上架</option>
                            <option value="2">下架</option>
                        </select>

                    </div>
                    <div class="modal-footer">
                        <button type="submit" class="btn btn-outline-primary" data-bs-dismiss="modal">回列表</button>
                        <button type="submit" class="btn btn-primary" @click="updateGame(game.quiz_no)">修改</button>
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
            gameData: [],
            newGame: {
                quiz_name: '',
                option_a: '',
                option_b: '',
                option_c: '',
                option_d: '',
                quiz_ans: '',
                quiz_ans_info: '',
                quiz_photo: '',
                quiz_status: '',
            },
            game: {},
        }
    },
    mounted() {
        axios.get(`${import.meta.env.VITE_API_URL}/admin/game/getGameData.php`)
            .then((res) => {
                this.gameData = res.data;
                console.log(this.gameData);
            })
            .catch((err => {
                console.log(err);
            }))
    },
    methods: {
        addNewGame() {
            let formData = new FormData();
            // 添加圖片到FormData
            const fileInput = document.querySelector('input[type="file"]');
            if (fileInput && fileInput.files[0]) {
                formData.append("quiz_photo", fileInput.files[0]);
            }

            // 將newGame物件中屬性添加到formData中
            Object.keys(this.newGame).forEach(key => {
                if (key && key) {
                    formData.append(key, this.newGame[key]);
                }
            });
            // 使用axios發送FormData
            axios.post(`${import.meta.env.VITE_API_URL}/admin/game/addGameData.php`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            })
                .then(res => {
                    alert('新增成功');
                    this.gameData = {
                        quiz_name: '',
                        option_a: '',
                        option_b: '',
                        option_c: '',
                        option_d: '',
                        quiz_ans: '',
                        quiz_ans_info: '',
                        quiz_photo: '',
                        quiz_status: '',
                    }
                    window.location.reload();
                })
                .catch(err => {
                    alert('新增失敗');
                    console.log(err);
                });
        },
        deleteGameData(gameNo, index) {
            if (confirm('您確定要刪除此遊戲題目嗎？')) {
                axios.post(`${import.meta.env.VITE_API_URL}/admin/game/deleteGameData.php`, { quiz_no: gameNo }, {
                    headers: {
                        'Content-Type': 'application/json',
                    }
                })
                    .then((res) => {
                        alert('刪除成功');
                        console.log(res);
                        this.gameData.splice(index, 1);
                        console.log(this.gameData);
                    })
                    .catch((err) => {
                        console.log(err);
                    })
            } else {
                console.log('使用者取消操作');
            }
        },
        showGame(quizNo) {
            const quiz = this.gameData.find(q => q.quiz_no === quizNo);
            this.game = { ...quiz };
            console.log(this.game);
        },
        getImageUrl(paths) {
            return new URL(`${import.meta.env.VITE_IMAGES_BASE_URL}/game/${paths}`, import.meta.url).href;
        },
        updateGame(quizNo) {
            const formData = new FormData();
            formData.append("quiz_no", quizNo);
            formData.append("quiz_name", this.game.quiz_name);
            formData.append("option_a", this.game.option_a);
            formData.append("option_b", this.game.option_b);
            formData.append("option_c", this.game.option_c);
            formData.append("option_d", this.game.option_d);
            formData.append("quiz_ans", this.game.quiz_ans);
            formData.append("quiz_ans_info", this.game.quiz_ans_info);
            // 如果quiz_photo是文件對象，添加到formData
            if (this.game.quiz_photo && this.game.quiz_photo instanceof File) {
                formData.append("gameImg", this.game.quiz_photo);
            }
            formData.append("quiz_status", this.game.quiz_status);

            axios.post(`${import.meta.env.VITE_API_URL}/admin/game/updateGameData.php`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            })
                .then((res) => {
                    console.log(res.data);
                    alert('修改成功');
                    this.game = {
                        quiz_name: '',
                        option_a: '',
                        option_b: '',
                        option_c: '',
                        option_d: '',
                        quiz_ans: '',
                        quiz_ans_info: '',
                        quiz_photo: '',
                        quiz_status: '',
                    }
                    window.location.reload();
                })
                .catch((err) => {
                    console.log(err);
                })
        },
        handleFileUpload(event) {
            this.game.quiz_photo = event.target.files[0];
        },
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