<template>
    <div class="productTag">
        <div class="TagSideBar">
            <SideBar />
        </div>
        <div class="productTag_title my-5">
            <h1>商品TAG</h1>
        </div>
        <button type="button" class="btn btn-outline-primary productTag_add">
            <i class="fa-solid fa-circle-plus"></i>新增
        </button>
        <table class="table productTag_right">
            <thead>
                <tr>
                <th scope="col"><input type="checkbox"></th>
                <th scope="col">TAG編號</th>
                <th scope="col">TAG名稱</th>
                <th scope="col">
                    <button class="btn btn-outline-primary">
                        <i class="fa-solid fa-trash-can"></i>
                        刪除
                    </button>
                </th>
                </tr>
            </thead>
            <tbody>
                    <tr v-for="tag in producttags">
                        <td>
                            <input type="checkbox">
                        </td>
                        <td>{{ tag.number }}</td>
                        <td>{{ tag.name }}</td>
                        <td>
                            <button class="btn btn-outline-primary">
                                <i class="fa-solid fa-pencil"></i>
                                修改
                            </button>
                            <button class="btn btn-outline-primary">
                                <i class="fa-solid fa-trash-can"></i>
                                刪除
                            </button>
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
            producttags: [
                { number: '0001', name: '調理包' },
                { number: '0002', name: '生鮮食材' },

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
    @import "@/assets/scss/page/producttag";
</style>