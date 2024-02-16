<template>
    <div v-show="isLoading" class="loadingWrap">
        <div  class="spinner-border loading" style="width: 3rem; height: 3rem;" role="status">
            <span class="sr-only">Loading...</span>
        </div>
    </div>
</template>
<script>
    import { useLoadingStore } from '@/stores/loading';
    export default{
        mounted(){
            const LoadingStore = useLoadingStore(); 
            setTimeout(()=>{
                LoadingStore.isLoading = false;
            },7000);
        },
        computed:{
            isLoading(){
                const LoadingStore = useLoadingStore();
                return LoadingStore.isLoading;
            }
        },
    }
</script>
<style>
    .loadingWrap{
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height:100% ;
        z-index: 10;
        background-color:#FBF8F5;
    }
    .loading{
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50% -50%);
    }
</style>