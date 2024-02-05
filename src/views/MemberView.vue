<template>
    <SideBar />
    <div class="member">
        <h2>會員管理</h2>
        <div class="member_search_area mb-2">
            <input type="text" class="member_search primary" value="" placeholder="搜尋">
        </div>
        <table class="table table-hover table-bordered border-dark">
            <thead>
                <tr>
                    <th scope="col">會員編號</th>
                    <th scope="col">姓名</th>
                    <th scope="col">EMAIL</th>
                    <th scope="col">電話</th>
                    <th scope="col">狀態</th>
                    <th scope="col">註冊時間</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="person in members" :key="person.id">
                    <td><a type="button" class="member-no" data-bs-toggle="modal" data-bs-target="#memberInfo">
                            {{ person.id }}
                        </a></td>
                    <td>{{ person.name }}</td>
                    <td>{{ person.email }}</td>
                    <td>{{ person.phone }}</td>
                    <td>{{ person.status }}</td>
                    <td>{{ person.date }}</td>
                </tr>
            </tbody>
        </table>
        <div class="modal fade" id="memberInfo" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body text-start">
                        <p>編號: 00001</p>
                        <p>姓名: 王小明</p>
                        <p>EMAIL: aabbcc@test.com</p>
                        <p>電話: 0988-123456</p>
                        <p>生日: 1988-08-08</p>
                        <p>地址: 桃園市中壢區成功路888號</p>
                        <p>累計消費金額: 1000</p>
                        <p>註冊時間: 2023/12/30</p>
                        <p>會員等級: 一般會員</p>
                        <p>狀態: <select id="member_status">
                                <option value="正常">正常</option>
                                <option value="黑名單">黑名單</option>
                            </select></p>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-outline-secondary" data-bs-dismiss="modal">回列表</button>
                        <button type="button" class="btn btn-primary">儲存</button>
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
            members: [
                {
                    id: '00001',
                    name: '王小明',
                    email: 'aabbcc@test.com',
                    phone: '0988123456',
                    status: '正常',
                    date: '2023/12/30'
                },
                {
                    id: '00002',
                    name: '王小明',
                    email: 'aabbcc@test.com',
                    phone: '0988123456',
                    status: '正常',
                    date: '2023/12/30'
                },
                {
                    id: '00003',
                    name: '王小明',
                    email: 'aabbcc@test.com',
                    phone: '0988123456',
                    status: '正常',
                    date: '2023/12/30'
                },
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