
<template>
  <!-- <router-link to="/">登入</router-link> |
  <router-link to="/products">商品管理</router-link>
  <button type="button" class="btn btn-primary">Primary</button>
  <button type="button" class="btn btn-secondary">Secondary</button>
  <button type="button" class="btn btn-success">Success</button>
  <button type="button" class="btn btn-danger">Danger</button>
  <button type="button" class="btn btn-warning">Warning</button>
  <button type="button" class="btn btn-info">Info</button>
  <button type="button" class="btn btn-light">Light</button>
  <button type="button" class="btn btn-dark">Dark</button>
  <button type="button" class="btn btn-link">Link</button>
  <button type="button" class="btn btn-outline-primary">Primary</button>
  <button type="button" class="btn btn-outline-secondary">Secondary</button> -->
  <RouterView />
</template>

<script>
import { RouterLink, RouterView } from 'vue-router'
export default {
  components: {
    RouterLink,
    RouterView
  },
  created() {
    this.fetchData()
  },
  methods: {
    fetchData() {
      fetch(`${import.meta.env.VITE_API_URL}/AjaxLab/2_Ajax_fetch_books/prod_getAll.php`).then(res => {
        console.log(res);
      })
    }
  }
}
</script>

<style lang="scss">
@import "@/assets/scss/main.scss";
</style>
