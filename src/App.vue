
<template>
  <Loading v-if="LoadingStore.isLoading" />
  <RouterView />
</template>

<script>
import { RouterLink, RouterView } from 'vue-router'
import { useLoadingStore } from '@/stores/loading';
import Loading from "@/components/Loading.vue"
export default {
  components: {
    RouterLink,
    RouterView,
    Loading,
  },
  setup(){
    const LoadingStore = useLoadingStore();
    return { LoadingStore };
  }
}
</script>

<style lang="scss">
@import "@/assets/scss/main.scss";
</style>
