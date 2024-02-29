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
                <tr v-for="(person, index) in paginatedProds" :key="person.member_no">
                    <td @click="showMember(person.member_no)"><a type="button" class="member-no" data-bs-toggle="modal"
                            data-bs-target="#memberInfo">
                            {{ person.member_no }}
                        </a></td>
                    <td>{{ person.member_name }}</td>
                    <td>{{ person.member_email }}</td>
                    <td>{{ person.member_tel }}</td>
                    <td>{{ person.member_status == 1 ? '正常' : '黑名單' }}</td>
                    <td>{{ person.member_time }}</td>
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
                        <p>編號: {{ member.member_no }}</p>
                        <p>姓名: {{ member.member_name }}</p>
                        <p>EMAIL: {{ member.member_email }}</p>
                        <p>電話: {{ member.member_tel }}</p>
                        <p>生日: {{ member.member_birth }}</p>
                        <p>地址: {{ member.member_county
                        }}{{ member.member_city }}{{ member.member_addr }}</p>
                        <p>累計消費金額: {{ member.member_total_amount
                        }}</p>
                        <p>註冊時間: {{ member.member_time
                        }}</p>
                        <p>會員等級: {{ member.member_level
                        }}</p>
                        <p>狀態: <select id="member_status" v-model="member.member_status">
                                <option v-for="(label, value) in statusOptions" :value="value">{{ label }}</option>
                            </select></p>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-outline-secondary" data-bs-dismiss="modal">回列表</button>
                        <button type="button" class="btn btn-primary"
                            @click="updateMemberStatus(member.member_no)">儲存</button>
                    </div>
                </div>
            </div>
        </div>
        <nav aria-label="Page navigation example">
            <ul class="pagination">
                <li class="page-item" :class="{ 'disabled': currentPage === 1 }">
                    <button class="page-link btn btn-outline-primary bg-transparent border-0" aria-label="Previous"
                        @click="prevPage">
                        <span aria-hidden="true">&laquo;</span>
                    </button>
                </li>
                <li v-for="page in totalPages" class="page-item" :key="page">
                    <button type="button" class="btn btn-outline-primary pageLink" @click="goToPage(page)">{{ page
                    }}</button>
                </li>
                <li class="page-item" :class="{ 'disabled': currentPage === totalPages }">
                    <button class="page-link btn-outline-primary bg-transparent border-0" aria-label="Next"
                        @click="nextPage">
                        <span aria-hidden="true">&raquo;</span>
                    </button>
                </li>
            </ul>
        </nav>
    </div>
</template>

<script>
import SideBar from "@/components/SideBar.vue";
import axios from "axios";
export default {
    data() {
        return {
            membersData: [],
            member: {},
            statusOptions: {
                '1': '正常',
                '2': '黑名單',
            },
            memberPerPage: 6,
            currentPage: 1,
        }
    },
    mounted() {
        axios.get(`${import.meta.env.VITE_API_URL}/admin/member/getMember.php`)
            .then((res) => {
                this.membersData = res.data;
            })
            .catch((err) => {
                console.log(err);
            })
    },
    computed: {
        totalPages() {
            return Math.ceil(this.membersData.length / this.memberPerPage);
        },
        paginatedProds() {
            const start = (this.currentPage - 1) * this.memberPerPage;
            const end = start + this.memberPerPage;
            return this.membersData.slice(start, end)
        }
    },
    methods: {
        showMember(memberNo) {
            const member = this.membersData.find(q => q.member_no === memberNo);
            this.member = { ...member };
        },
        updateMemberStatus(memberNo) {
            axios.post(`${import.meta.env.VITE_API_URL}/admin/member/updateMember.php`, {
                member_no: memberNo,
                member_status: Number(this.member.member_status)
            })
                .then((res) => {
                    alert(res.data.msg);
                    window.location.reload();
                })
                .catch((err) => {
                    console.log(err);
                })
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