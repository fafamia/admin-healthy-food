<template>
    <div style="display: flex; align-items: center; flex-direction: column; gap: 20px;" class="error">
        <h1 style="text-align: center; margin-top: 100px;">您還沒有登入,請先登入</h1>
        <button @click="goLogin" style="width: 100px; margin: auto;" class="btn btn-primary login-btn">前往登入</button>
    </div>
</template>

<script>
    export default {
        methods:{
            goLogin(){
                this.$router.push({name:'login'})   
            }
        }
    }
</script>

<style lang="scss">
</style>