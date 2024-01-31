<template>
    <div class="member row">
        <SideBar class="col-3" />
        <div class="member_right col-9">
            <h2>會員管理</h2>
            <div class="member_search_area mb-2">
                <input type="text" class="member_search primary" value="" placeholder="搜尋">
            </div>
            <table class="table table-hover table-bordered border-dark">
                <tr>
                    <th scope="col">會員編號</th>
                    <th scope="col">姓名</th>
                    <th scope="col">EMAIL</th>
                    <th scope="col">電話</th>
                    <th scope="col">狀態</th>
                    <th scope="col">註冊時間</th>
                </tr>
                <!-- 使用v-for的資料吃不到BS樣式 -->
                <!-- <tr v-for="person in members" :key="person.id">
                    <td>{{ person.id }}</td>
                    <td>{{ person.name }}</td>
                    <td>{{ person.email }}</td>
                    <td>{{ person.phone }}</td>
                    <td>{{ person.status }}</td>
                    <td>{{ person.date }}</td>
                </tr> -->
                <tr>
                    <td>00001</td>
                    <td>王小明</td>
                    <td>aabbcc@test.com</td>
                    <td>0988123456</td>
                    <td>正常</td>
                    <td>2023/12/30 </td>
                </tr>
                <tr>
                    <td>00001</td>
                    <td>王小明</td>
                    <td>aabbcc@test.com</td>
                    <td>0988123456</td>
                    <td>正常</td>
                    <td>2023/12/30 </td>
                </tr>
                <tr>
                    <td>00001</td>
                    <td>王小明</td>
                    <td>aabbcc@test.com</td>
                    <td>0988123456</td>
                    <td>正常</td>
                    <td>2023/12/30 </td>
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
            members: [
                {
                    id: '00001',
                    name: '王小明',
                    email: 'aabbcc@test.com',
                    phone: '0988123456',
                    status: '正常',
                    date: '2023/12/30'
                }
            ]
        }
    },
    components: {
        SideBar,
    },
}
</script>

<style lang="scss">
@import "@/assets/scss/page/member.scss";
@import "@/assets/scss/sidebar.scss";
</style>