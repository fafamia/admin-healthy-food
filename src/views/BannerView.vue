<template>
    <SideBar />
    <div class="admin_banner">
        <h2 class="admin_banner_title">首頁BANNER</h2>
        <table class="table table-bordered">
            <thead>
                <tr>
                    <th scope="col"><input type="checkbox"></th>
                    <th scope="col">編號</th>
                    <th scope="col">標題</th>
                    <th scope="col">縮圖</th>
                    <th scope="col"></th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <th scope="row"><input type="checkbox"></th>
                    <td>01</td>
                    <td>標題標題標題</td>
                    <td>@縮圖</td>
                    <td>
                        <button type="button" class="btn btn-outline-primary"><i class="fa-solid fa-pen"></i>修改</button>
                    </td>
                </tr>
                <tr>
                    <th scope="row"><input type="checkbox"></th>
                    <td>02</td>
                    <td>標題標題標題</td>
                    <td>@縮圖</td>
                    <td><button type="button" class="btn btn-outline-primary"><i class="fa-solid fa-pen"></i>修改</button></td>
                </tr>
                <tr>
                    <th scope="row"><input type="checkbox"></th>
                    <td>03</td>
                    <td>標題標題標題</td>
                    <td>@縮圖</td>
                    <td><button type="button" class="btn btn-outline-primary"><i class="fa-solid fa-pen"></i>修改</button></td>
                </tr>
                <tr>
                    <th scope="row"><input type="checkbox"></th>
                    <td>04</td>
                    <td>標題標題標題</td>
                    <td>@縮圖</td>
                    <td><button type="button" class="btn btn-outline-primary"><i class="fa-solid fa-pen"></i>修改</button></td>
                </tr>
                <tr>
                    <th scope="row"><input type="checkbox"></th>
                    <td>05</td>
                    <td>標題標題標題</td>
                    <td>@縮圖</td>
                    <td><button type="button" class="btn btn-outline-primary"><i class="fa-solid fa-pen"></i>修改</button></td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<script>
import SideBar from "@/components/SideBar.vue";
export default {
    data() {
        return {
        }
    },
    components: {
        SideBar,
    },
}
</script>

<style lang="scss">
@import "@/assets/scss/sidebar.scss";
@import "@/assets/scss/page/_banner.scss";
</style>