<template>
    <SideBar />
    <div class="memberlevel">
        <h2>會員等級</h2>
        <div class="memberlevel_btn mb-2">
        </div>
        <table class="table table-hover table-bordered border-dark">
            <thead>
                <tr>
                    <th scope="col">等級編號</th>
                    <th scope="col">等級名稱</th>
                    <th scope="col">消費門檻</th>
                    <th scope="col">消費折扣</th>
                    <th scope="col"></th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(level, index) in levelData" :key="level.level_no">
                    <td>{{ level.level_no }}</td>
                    <td>{{ level.level_name }}</td>
                    <td>{{ level.total_spend_start }}-{{ level.total_spend_end }}</td>
                    <td>{{ level.level_discount === null || level.level_discount === undefined ? 0 : level.level_discount }}
                    </td>
                    <td>
                        <button type="button" class="btn btn-outline-primary" data-bs-toggle="modal"
                            data-bs-target="#addMemberLevel" @click="showLevel(level.level_no)"><i
                                class="fa-solid fa-pen me-1"></i>修改</button>
                    </td>
                </tr>
            </tbody>
        </table>
        <div class="modal fade" id="addMemberLevel" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="exampleModalLabel">修改會員等級</h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body text-start">
                        <p>等級編號: {{ this.level.level_no }}</p>
                        <label for="level_name" class="mb-3 me-2">等級名稱</label>
                        <input type="text" name="level_name" v-model="level.level_name" class="w-75">
                        <div class="level_pay mb-3">
                            <label for="level_num" class=" me-2">消費門檻</label>
                            <input type="number" name="level_num" id="level_num" v-model="level.total_spend_start"> 至 <input
                                type="number" name="level_num_end" v-model="level.total_spend_end">
                        </div>
                        <label for="level_name" class="mb-3 me-2">消費折扣</label>
                        <input type="text" name="level_name" v-model="level.level_discount" class="w-75">
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-outline-secondary" data-bs-dismiss="modal">回列表</button>
                        <button type="button" class="btn btn-primary" @click="updateLevel(this.level.level_no)">儲存</button>
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
            levelData: [],
            level: {},
        }
    },
    mounted() {
        axios.get(`${import.meta.env.VITE_API_URL}/admin/memberLevel/getMemberLevel.php`)
            .then((res) => {
                this.levelData = res.data;
            })
            .catch((err) => {
                console.log(err);
            })
    },
    methods: {
        showLevel(levelNo) {
            const level = this.levelData.find(q => q.level_no === levelNo);
            this.level = { ...level };
        },
        updateLevel(levelNo) {
            axios.post(`${import.meta.env.VITE_API_URL}/admin/memberLevel/updateMemberLevel.php`, {
                level_no: levelNo,
                level_name: this.level.level_name,
                total_spend_end: this.level.total_spend_end,
                total_spend_start: this.level.total_spend_start,
                level_discount: this.level.level_discount
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
@import "@/assets/scss/page/memberlevel.scss";
@import "@/assets/scss/sidebar.scss";
</style>