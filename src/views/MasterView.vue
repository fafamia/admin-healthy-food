<template>
    <SideBar />
    <div class="admin_master">
        <h1 class="admin_master_title">管理員</h1>
        <div class="member_search_area admin_master_subtitle">
            <button type="button" class="btn btn-outline-primary"><i class="fa-solid fa-circle-plus"></i>新增</button>
            <input type="text" class="member_search primary admin_master_subtitle_input" value="" placeholder="搜尋">
        </div>
        <table class="table table-hover table-bordered border-dark">
        <thead>
            <tr>
                <th scope="col"><input type="checkbox"></th>
                <th scope="col">管理員編號</th>
                <th scope="col">帳號</th>
                <th scope="col">姓名</th>
                <th scope="col">EMAIL</th>
                <th scope="col">
                    
                </th>
            </tr>
        </thead>
        <tbody>
            <tr>
                <th scope="row"><input type="checkbox"></th>
                <td>0001</td>
                <td>Admin</td>
                <td>管理員</td>
                <td>admin.textxa.com</td>
                <td>
                    <button class="btn btn-outline-primary">
                        <i class="fa-solid fa-trash-can"></i>
                        刪除
                    </button>
                    <button type="button" class="btn btn-outline-primary">
                        <i class="fa-solid fa-pen"></i>修改
                    </button>
                </td>
            </tr>
            <tr>
                <th scope="row"><input type="checkbox"></th>
                <td>0002</td>
                <td>Boss</td>
                <td>老闆</td>
                <td>boss.textxa.com</td>
                <td>
                    <button class="btn btn-outline-primary">
                        <i class="fa-solid fa-trash-can"></i>
                        刪除
                    </button>
                    <button type="button" class="btn btn-outline-primary">
                        <i class="fa-solid fa-pen"></i>修改
                    </button>
                </td>
            </tr>
            <tr>
                <th scope="row"><input type="checkbox"></th>
                <td>0003</td>
                <td>Editor</td>
                <td>小編</td>
                <td>editor.textxa.com</td>
                <td>
                    <button class="btn btn-outline-primary">
                        <i class="fa-solid fa-trash-can"></i>
                        刪除
                    </button>
                    <button type="button" class="btn btn-outline-primary">
                        <i class="fa-solid fa-pen"></i>修改
                    </button>
                </td>
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
@import "@/assets/scss/page/_master.scss";
</style>