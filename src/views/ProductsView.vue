<template>
  <div class="products">
    <h1>後臺商品管理頁</h1>
    <SideBar/>
  </div>
  
</template>

<script>
import SideBar from "@/components/SideBar.vue";

export default {
  components: {
    SideBar,
  },

};

</script>


<style lang="scss">
@import "@/assets/scss/product.scss";
@import "@/assets/scss/sidebar.scss";
</style>
