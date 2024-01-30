<template>
  <div class="login container d-flex justify-content-center align-items-center" style="min-height: 100vh;">
    <div class="admin-login text-center">
      <img src="/src/assets/images/login/logo.png" alt="健康定胃logo">
      <h1 class="fw-bold admin-primary">健康定胃後台管理</h1>

      <div class="account-area mb-2 py-1 px-2">
        <i class="fa-regular fa-user"></i>
        <input type="text" name="adminAccount" id="adminAccount" placeholder="請輸入帳號">
      </div>

      <div class="password-area mb-2 py-1 px-2">
        <i class="fa-solid fa-lock"></i>
        <input type="text" name="adminPassword" id="adminPassword" placeholder="請輸入密碼">
      </div>
      <router-link to="/products" class="btn btn-primary login-btn">登入</router-link>
    </div>

  </div>
</template>

<style lang="scss">
@import "@/assets/scss/page/_login.scss";
</style>