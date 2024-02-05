<template>
    <SideBar />
    <div class="memberlevel">
        <h2>會員等級</h2>
        <div class="memberlevel_btn mb-2">
            <button type="button" class="btn btn-outline-primary" data-bs-toggle="modal" data-bs-target="#addMemberLevel"><i
                    class="fa-solid fa-circle-plus me-1"></i>新增</button>
        </div>
        <table class="table table-hover table-bordered border-dark">
            <thead>
                <tr>
                    <th scope="col"><input type="checkbox" /></th>
                    <th scope="col">等級編號</th>
                    <th scope="col">等級名稱</th>
                    <th scope="col">消費門檻</th>
                    <th scope="col">消費折扣</th>
                    <th scope="col"><button type="button" class="btn btn-outline-primary"><i class="fa-solid fa-trash"></i>
                            刪除</button></th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td><input type="checkbox" /></td>
                    <td>00001</td>
                    <td>一般會員</td>
                    <td>0-3000</td>
                    <td>0</td>
                    <td><button type="button" class="btn btn-outline-primary me-2"><i
                                class="fa-solid fa-trash me-1"></i>刪除</button>
                        <button type="button" class="btn btn-outline-primary"><i
                                class="fa-solid fa-pen me-1"></i>修改</button>
                    </td>
                </tr>
                <tr>
                    <td><input type="checkbox" /></td>
                    <td>00002</td>
                    <td>白金會員</td>
                    <td>3001-8000</td>
                    <td>0</td>
                    <td><button type="button" class="btn btn-outline-primary me-2"><i
                                class="fa-solid fa-trash me-1"></i>刪除</button>
                        <button type="button" class="btn btn-outline-primary"><i
                                class="fa-solid fa-pen me-1"></i>修改</button>
                    </td>
                </tr>
                <tr>
                    <td><input type="checkbox" /></td>
                    <td>00003</td>
                    <td>黃金會員</td>
                    <td>8001-16000</td>
                    <td>0.95</td>
                    <td><button type="button" class="btn btn-outline-primary me-2"><i
                                class="fa-solid fa-trash me-1"></i>刪除</button>
                        <button type="button" class="btn btn-outline-primary"><i
                                class="fa-solid fa-pen me-1"></i>修改</button>
                    </td>
                </tr>
                <tr>
                    <td><input type="checkbox" /></td>
                    <td>00004</td>
                    <td>鑽石會員</td>
                    <td>>16000</td>
                    <td>0.9</td>
                    <td><button type="button" class="btn btn-outline-primary me-2"><i
                                class="fa-solid fa-trash me-1"></i>刪除</button>
                        <button type="button" class="btn btn-outline-primary"><i
                                class="fa-solid fa-pen me-1"></i>修改</button>
                    </td>
                </tr>
            </tbody>
        </table>
        <div class="modal fade" id="addMemberLevel" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="exampleModalLabel">新增會員等級</h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body text-start">
                        <p>等級編號: 00005</p>
                        <label for="level_name" class="mb-3 me-2">等級名稱</label>
                        <input type="text" name="level_name" id="" class="w-75">
                        <div class="level_pay mb-3">
                            <label for="level_num" class=" me-2">消費門檻</label>
                            <input type="number" name="level_num" id="level_num"> 至 <input type="number"
                                name="level_num_end" id="">
                        </div>
                        <label for="level_name" class="mb-3 me-2">消費折扣</label>
                        <input type="text" name="level_name" id="" class="w-75">
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-primary">確定</button>
                    </div>
                </div>
            </div>
        </div>
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

<style lang="scss">@import "@/assets/scss/page/memberlevel.scss";
@import "@/assets/scss/sidebar.scss";</style>