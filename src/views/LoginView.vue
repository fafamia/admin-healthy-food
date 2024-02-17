<template>
    <div class="login container d-flex justify-content-center align-items-center" style="min-height: 100vh;">
        <div class="admin-login text-center">
            <img src="/src/assets/images/login/logo.png" alt="健康定胃logo">
            <h1 class="fw-bold admin-primary">健康定胃後台管理</h1>

            <div class="account-area mb-2 py-1 px-2">
                <i class="fa-regular fa-user"></i>
                <input v-model="marster.account" type="text" placeholder="請輸入帳號">
            </div>

            <div class="password-area mb-2 py-1 px-2">
                <i class="fa-solid fa-lock"></i>
                <input v-model="marster.psw" type="password" placeholder="請輸入密碼">
            </div>

            <router-link @click="adminlogin" :to=link class="btn btn-primary login-btn">登入</router-link>

            <div v-if="errorMessage" class="text-danger">{{ errorMessage }}</div>
        </div>
    </div>
</template>



<script>
import axios from "axios";

export default {
    data() {
        return {
            marster: {
                account: "",
                psw: ""
            },
            errorMessage: "",
            link:""
        };
    },
    methods: {
        adminlogin() {
            const formData = new FormData();
            formData.append('account', this.marster.account);
            formData.append('psw', this.marster.psw);
            axios.post(`${import.meta.env.VITE_API_URL}/login/admin_login.php`, formData)
            .then(response => {
                if (response.data.message === "登錄成功") {
                    // this.link = "/products";
                    localStorage.setItem('account', this.marster.account);
                    localStorage.setItem('userToken', 'true');
                    this.$router.push({name:'products'})                    
                } else {
                    this.errorMessage = response.data.message;
                }
            })
            .catch(error => {
                this.errorMessage = "發生錯誤。請再試一次。";
                console.error("登錄錯誤:", error);
            });
        }
    }
}
</script>


<style lang="scss">
@import "@/assets/scss/page/_login.scss";
</style>