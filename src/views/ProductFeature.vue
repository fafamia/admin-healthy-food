<template>
    <div class="productFeature">
        <div class="TagSideBar">
            <SideBar />
        </div>
        <div class="productFeature_title my-5">
            <h1>推薦商品</h1>
        </div>
        <button type="button" class="btn btn-outline-primary productFeature_add">
            <i class="fa-solid fa-circle-plus"></i>新增
        </button>
        <table class="table productFeature_right">
            <thead>
                <tr>
                <th scope="col"><input type="checkbox"></th>
                <th scope="col">推薦商品編號</th>
                <th scope="col">商品編號</th>
                <th scope="col">
                    <button class="btn btn-outline-primary">
                        <i class="fa-solid fa-trash-can"></i>
                        刪除
                    </button>
                </th>
                </tr>
            </thead>
            <tbody>
                    <tr v-for="feature in productfeatures">
                        <td>
                            <input type="checkbox">
                        </td>
                        <td>{{ feature.featureNumber }}</td>
                        <td>{{ feature.productNumber }}</td>
                        <td>
                            <button class="btn btn-outline-primary">
                                <i class="fa-solid fa-trash-can"></i>
                                刪除
                            </button>
                        </td>
                    </tr>
                </tbody>
        </table>
    </div>
</template>

<script>
import SideBar from "@/components/SideBar.vue";

export default{
    data(){
        return{
            productfeatures: [
                { featureNumber: '0001', productNumber: '00001' },
                { featureNumber: '0002', productNumber: '00002' },
                { featureNumber: '0002', productNumber: '00003' },
                { featureNumber: '0002', productNumber: '00004' },

            ],
        }
    },

    components: {
        SideBar,
    },
}
</script>

<style lang="scss">
    @import "@/assets/scss/sidebar.scss";
    @import "@/assets/scss/page/productfeature";
</style>