<template>
    <div class="productFeature">
        <div class="TagSideBar">
            <SideBar />
        </div>
        <div class="productFeature_right">
            <div class="productFeature_title my-5">
                <h1>推薦商品</h1>
            </div>
            <button type="button" class="btn btn-outline-primary productFeature_add" data-bs-toggle="modal"
                data-bs-target="#staticBackdrop">
                <i class="fa-solid fa-circle-plus"></i>新增
            </button>
            <table class="table table-hover table-bordered border-dark ">
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
                                <button class="btn btn-outline-primary" @click="deleteProd">
                                    <i class="fa-solid fa-trash-can"></i>
                                    刪除
                                </button>
                            </td>
                        </tr>
                    </tbody>
            </table>
            <div class="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1"
                aria-labelledby="staticBackdropLabel" aria-hidden="true">
                <div class="modal-dialog">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title" id="staticBackdropLabel">新增資料</h5>
                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div class="modal-body">
                            <div class="mb-3">
                                <!-- 待思考如何代入商品流水號 -->
                                <h4>推薦商品編號 0001</h4>
                                <label for="exampleFormControlInput1" class="form-label">推薦商品名稱</label>
                                <input type="select" class="form-control">
                            </div>
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-outline-primary" data-bs-dismiss="modal">回列表</button>
                            <button type="button" class="btn btn-primary">儲存</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
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
    methods:{
        deleteProd(index) {
            const confirmed = window.confirm("確定要刪除此商品分類嗎?");
            if (confirmed) {
                this.prodclass.splice(index, 1);
            }
        },
    }
}
</script>

<style lang="scss">
    @import "@/assets/scss/sidebar.scss";
    @import "@/assets/scss/page/productfeature";
</style>