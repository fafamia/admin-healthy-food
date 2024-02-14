<template>
    <SideBar />
    <div class="admin_master">
        <h1 class="admin_master_title">管理員</h1>
        <div class="member_search_area admin_master_subtitle">
            <!-- Button trigger modal -->
            <div class="addIconAdmin_master">
                <button type="button" class="btn btn-outline-primary" data-bs-toggle="modal" data-bs-target="#addstaticBackdrop">
                <i class="fa-solid fa-circle-plus"></i>新增
                </button>
                <div v-if="errorMessage" class="text-danger addAdmin_master">{{ errorMessage }}</div>
            </div>
            <!-- Modal -->
            <div class="modal fade" id="addstaticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
            <div class="modal-dialog">
                <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="staticBackdropLabel">新增資料</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <div class="modal-body">
                        <div class="mb-3 addmaster">
                            <label for="form-select">姓名</label>
                            <input v-model="newMaster.name" type="text" class="form-control">
                            <label for="form-select">EMAIL</label>
                            <input v-model="newMaster.email" type="email" class="form-control">
                            <label for="form-select">帳號</label>
                            <input v-model="newMaster.account" type="text" class="form-control">
                            <label for="form-select">密碼</label>
                            <input v-model="newMaster.password" type="text" class="form-control">
                        </div>
                    </div>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">回列表</button>
                    <button @click="saveMaster" type="button" class="btn btn-primary" data-bs-dismiss="modal">確認</button>
                </div>
                </div>
            </div>
            </div>
            <input type="text" v-model.trim="search" @input="filterHandle" class="member_search primary admin_master_subtitle_input" value="" placeholder="搜尋帳號">
        </div>
        <table class="table table-hover table-bordered border-dark">
            <thead>
                <tr>
                    <th scope="col">管理員編號</th>
                    <th scope="col">帳號</th>
                    <th scope="col">姓名</th>
                    <th scope="col">EMAIL</th>
                    <th scope="col"></th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(master, index) in displaymasters" :key="index">
                    <td>{{ master.master_no }}</td>
                    <td>{{ master.master_account }}</td>
                    <td>{{ master.master_name }}</td>
                    <td>{{ master.master_email }}</td>
                    <td>
                        <button class="btn btn-outline-primary prodDelete btn btn-primary"  data-bs-toggle="modal"  :data-bs-target="'#deleteModal' + index">
                            <i class="fa-solid fa-trash-can"></i> 刪除
                        </button>
                        <div class="modal fade" :id="'deleteModal' + index" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
                            <div class="modal-dialog">
                                <div class="modal-content">
                                    <div class="modal-header">
                                        <h5 class="modal-title" id="staticBackdropLabel">是否確認刪除</h5>
                                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                    </div>
                                    <div class="modal-body">
                                        按下刪除後 連同資料庫資料一並刪除
                                    </div>
                                    <div class="modal-footer">
                                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">取消</button>
                                        <button @click="deleteThisMaster(index)" data-bs-dismiss="modal" type="button" class="btn btn-primary">確認刪除</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <!-- Button trigger modal -->
                        <button type="button" class="btn btn-outline-primary" data-bs-toggle="modal" :data-bs-target="'#editModal' + index">
                            <i class="fa-solid fa-pen"></i> 修改
                        </button>

                        <!-- Modal -->
                        <div class="modal fade" :id="'editModal' + index" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
                        <div class="modal-dialog">
                            <div class="modal-content">
                            <div class="modal-header">
                                <h5 class="modal-title" id="staticBackdropLabel">修改資料</h5>
                                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
                            <div class="modal-body">
                                <div class="change_master">
                                    <div class="change_master_item">
                                        <p>管理員編號 : {{ displaymasters[index].master_no }}</p>
                                    </div>
                                </div>
                                <div class="change_master">
                                    <div class="change_master_item">
                                        <p>姓名 : {{ displaymasters[index].master_name }}</p>
                                        <button class="btn btn-outline-primary"  @click="editName = !editName">
                                            <i class="fa-solid fa-pen">修改</i> 
                                        </button>
                                    </div>
                                    <input v-model="changeMaster.changeName" class="form-control" type="text"  v-if="editName">
                                </div>
                                <div class="change_master">
                                    <div class="change_master_item">
                                        <p>帳號 : {{ displaymasters[index].master_account }}</p>
                                        <button class="btn btn-outline-primary" @click="editAccount = !editAccount">
                                            <i class="fa-solid fa-pen">修改</i> 
                                        </button>
                                    </div>
                                    <input v-model="changeMaster.changeAccount" class="form-control" type="text" v-if="editAccount">
                                </div>
                                <div class="change_master">
                                    <div class="change_master_item">
                                        <p>密碼 : {{ displaymasters[index].master_password }}</p>
                                        <button class="btn btn-outline-primary" @click="editPassword = !editPassword">
                                            <i class="fa-solid fa-pen">修改</i> 
                                        </button>
                                    </div>
                                    <input v-model="changeMaster.changePassword" class="form-control" type="text" v-if="editPassword">
                                </div>
                                <div class="change_master">
                                    <div class="change_master_item">
                                        <p>EMAIL : {{ displaymasters[index].master_email }}</p>
                                        <button class="btn btn-outline-primary" @click="editEmail = !editEmail">
                                            <i class="fa-solid fa-pen">修改</i> 
                                        </button>
                                    </div>
                                    <input v-model="changeMaster.changeEmail" class="form-control" type="text" v-if="editEmail">
                                </div>
                            </div>
                            <div class="modal-footer">
                                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal" @click="goback">回列表</button>
                                <button @click="changeMasterPost(index)" data-bs-dismiss="modal" type="button" class="btn btn-primary">確認</button>
                            </div>
                            </div>
                        </div>
                        </div>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<script>
import SideBar from "@/components/SideBar.vue";
import axios from "axios";
export default {
    data() {
        return {
            search: '',
            masters:[],
            displaymasters:[],
            editName: false,
            editAccount: false,
            editPassword: false,
            editEmail: false,
            newMaster:{
                name:"",
                email:"",
                account:"",
                password:"",
            },
            changeMaster:{
                changeName:"",
                changeAccount:"",
                changePassword:"",
                changeEmail:""
            },
            errorMessage:"",
        };
    },
    methods: {
        filterHandle() {
            this.displaymasters = this.masters.filter((item)=>{
                return item.master_account.includes(this.search)
            })
        },
        saveMaster() { //新增
            if (this.newMaster.name !== "" && this.newMaster.email !== "" && this.newMaster.account !== "" && this.newMaster.password !== "") {
                const formData = new FormData();
                formData.append('name', this.newMaster.name);
                formData.append('email', this.newMaster.email);
                formData.append('account', this.newMaster.account);
                formData.append('password', this.newMaster.password);
                axios.post(`${import.meta.env.VITE_API_URL}/web_master/admin_add_master.php`, formData)
                    .then(response => {
                        console.log(response.data.message);
                        this.errorMessage = response.data.message;
                        this.newMaster.name = "";
                        this.newMaster.email = "";
                        this.newMaster.account = "";
                        this.newMaster.password = "";
                        this.fetchMasters();
                        setTimeout(() => {
                            this.errorMessage = "";
                        }, 3000);
                    })
                    .catch(error => {
                        console.error('保存出错：', error);
                        this.errorMessage = error.response.data.error;
                        setTimeout(() => {
                            this.errorMessage = "";
                        }, 3000);
                    });
            } else {
                this.errorMessage = "輸入資料 不得留空";
                setTimeout(() => {
                    this.errorMessage = "";
                }, 3000);
            }
        },

        deleteThisMaster(index){          //刪除
            const masterToDelete = this.masters[index].master_no;
            axios.post(`${import.meta.env.VITE_API_URL}/web_master/admin_del_master.php`, { masterToDelete })
            .then(response => {
                this.masters.splice(index, 1);
                console.log('删除成功');
                this.fetchMasters();
            })
            .catch(error => {
                console.error('删除出錯：', error);
            });
        },
        goback(){
            this.editName = false;
            this.editAccount = false;
            this.editPassword = false;
            this.editEmail = false;
        },
        fetchMasters() {          //匯入
            axios.get(`${import.meta.env.VITE_API_URL}/web_master/admin_master_json.php`)
            .then(response => {
                this.masters = response.data;
                this.displaymasters = this.masters
            })
            .catch(error => {
                console.error('Error fetching masters:', error);
            });
        },
        changeMasterPost(index) {           //修改      
            const changeFormData = new FormData();
            changeFormData.append('no', this.masters[index].master_no );
            if (this.changeMaster.changeName !== "") {
                changeFormData.append('name', this.changeMaster.changeName);
            } else {
                changeFormData.append('name', this.masters[index].master_name);
            }
            if (this.changeMaster.changeAccount !== "") {
                changeFormData.append('account', this.changeMaster.changeAccount);
            } else {
                changeFormData.append('account', this.masters[index].master_account);
            }
            if (this.changeMaster.changePassword !== "") {
                changeFormData.append('password', this.changeMaster.changePassword);
            } else {
                changeFormData.append('password', this.masters[index].master_password);
            }
            if (this.changeMaster.changeEmail !== "") {
                changeFormData.append('email', this.changeMaster.changeEmail);
            } else {
                changeFormData.append('email', this.masters[index].master_email);
            }
            axios.post(`${import.meta.env.VITE_API_URL}/web_master/admin_change_master.php`, changeFormData)
            .then(response => {
                console.log('保存成功');
                this.changeMaster.changeName = "";
                this.changeMaster.changeAccount = "";
                this.changeMaster.changePassword = "";
                this.changeMaster.changeEmail = "";
                this.fetchMasters();
            })
            .catch(error => {
                console.error('保存出錯：', error);
            });
        },
    },
    components: {
        SideBar,
    },
    created() {
        this.fetchMasters();
    },
}
</script>

<style lang="scss">
@import "@/assets/scss/sidebar.scss";
@import "@/assets/scss/page/_master.scss";
</style>