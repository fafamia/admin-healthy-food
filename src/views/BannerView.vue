<template>
    <SideBar />
    <div class="admin_banner">
        <h1 class="admin_banner_title">首頁BANNER</h1>
        <button type="button" class="btn btn-outline-primary admin_banner_addbutton" data-bs-toggle="modal" data-bs-target="#staticBackdrop">
            <i class="fa-solid fa-circle-plus"></i>新增
        </button>
        <div class="modal fade admin_banner_light_box" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1"
        aria-labelledby="staticBackdropLabel" aria-hidden="true">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="staticBackdropLabel">新增資料</h5>
                    </div>
                    <div class="modal-body">
                        <div class="mb-3">
                            <label for="form-select">圖片預覽</label>
                            <div class="admin_banner_upload">
                                <img ref="previewImage" alt="">
                            </div>
                            <span>建議尺寸：300MB</span>
                            <label for="form-select">Banner標題</label>
                            <input v-model="newBanner.title" type="text" class="form-control">
                            <label for="form-select">Banner圖片上傳</label>
                            <input @change="handleFileUpload" type="file" class="form-control">
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-outline-primary" data-bs-dismiss="modal">回列表</button>
                        <button @click="saveBanner" data-bs-dismiss="modal" class="btn btn-primary">儲存</button>
                    </div>
                </div>
            </div>
        </div>

        <table class="table table-hover table-bordered border-dark">
            <thead>
                <tr>
                    <th scope="col">編號</th>
                    <th scope="col">標題</th>
                    <th scope="col">縮圖</th>
                    <th scope="col"></th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(banner, index) in banners" :key="index">
                    <td>{{ banner.carousel_no }}</td>
                    <td>{{ banner.banner_title }}</td>
                    <td>
                        <div class="admin_banner_preview">
                            <img :src="getImageUrl(banner.banner_image)" alt="">
                        </div>
                    </td>
                    <td>
                        <button class="btn btn-outline-primary prodDelete btn btn-primary"  data-bs-toggle="modal"  data-bs-target="#delstaticBackdrop">
                            <i class="fa-solid fa-trash-can"></i>刪除
                        </button>
                        <div class="modal fade" id="delstaticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
                            <div class="modal-dialog">
                                <div class="modal-content">
                                    <div class="modal-header">
                                        <h5 class="modal-title" id="staticBackdropLabel">是否確認刪除</h5>
                                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                    </div>
                                    <div class="modal-body">
                                        按下刪除後 連同資料庫資料一並刪除
                                    </div>
                                    <div class="modal-footer">
                                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">取消</button>
                                        <button @click="deleteThisBanner(index)" data-bs-dismiss="modal" type="button" class="btn btn-primary">確認刪除</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<script>
import SideBar from "@/components/SideBar.vue";
import axios from "axios";

export default {
    data() {
        return {
            newBanner: {
                title: "",
                image: null,
            },
            banners: [],
        };
    },
    components: {
        SideBar,
    },
    created() {
        this.fetchBanners();
    },
    methods: {
        getImageUrl(paths) {
            return new URL(`../assets/images/banner/${paths}`, import.meta.url).href;
        },

        handleFileUpload(event) {
            const file = event.target.files[0];
            this.newBanner.image = file;
            const reader = new FileReader();
            reader.onload = () => {
                this.$refs.previewImage.src = reader.result;
            };
            reader.readAsDataURL(file);
        },

        saveBanner() {          //新增
            const formData = new FormData();
            formData.append('title', this.newBanner.title);
            formData.append('image', this.newBanner.image);
            axios.post(`${import.meta.env.VITE_API_URL}/banner/admin_add_banner.php`, formData)
                .then(response => {
                    console.log('保存成功');
                    this.newBanner.title = "";
                    this.newBanner.image = null;
                    this.$refs.previewImage.src = "";
                    location.reload()
                })
                .catch(error => {
                    console.error('保存出错：', error);
                }
            );
        },
        fetchBanners() {          //匯入
            axios.get(`${import.meta.env.VITE_API_URL}/banner/admin_banner_json.php`)
            .then(response => {
                this.banners = response.data;
            })
            .catch(error => {
                console.error('Error fetching banners:', error);
            });
        },


        deleteThisBanner(index) {
            const bannerToDelete = this.banners[index].carousel_no;
            axios.post(`${import.meta.env.VITE_API_URL}/banner/admin_delete_banner.php`, { bannerToDelete })
            .then(response => {
                this.banners.splice(index, 1);
                console.log('删除成功');
                this.fetchBanners();
            })
            .catch(error => {
                console.error('删除出錯：', error);
            });
        }
    },
}
</script>

<style lang="scss">
@import "@/assets/scss/sidebar.scss";
@import "@/assets/scss/page/_banner.scss";
</style>
