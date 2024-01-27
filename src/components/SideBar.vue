<template>
    <div>
        <nav>
            <div class="headline">
                <button type="button" class="setting btn btn-secondary">
                    <i class="fa-solid fa-gear"></i>
                    <p>設定</p>
                </button>
                <button type="button" class="logout btn btn-secondary">
                    <i class="fa-solid fa-right-from-bracket"></i>
                    <p>登出</p>
                </button>
            </div>
            <div>
                <div v-for="(dropdown, index) in dropdowns" :key="index" class="dropdown">
                    <button class="btn btn-secondary dropdown-toggle" role="button" :id="'dropdownMenuLink' + index"
                        data-bs-toggle="dropdown" aria-expanded="false">
                        <i :class="dropdown.iconClass"></i>
                        {{ dropdown.label }}
                    </button>

                    <ul class="dropdown-menu" :aria-labelledby="'dropdownMenuLink' + index">
                        <li v-for="item in dropdown.items" :key="item.id">
                            <router-link :to="item.route" class="dropdown-item">{{ item.label }}</router-link>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    </div>
</template>

<script>
export default {
    data() {
        return {
            dropdowns: [
                { label: '權限管理', iconClass: 'fa-solid fa-person', items: [{ id: 1, label: '管理員', route: '' }] },
                { label: '會員管理', iconClass: "fa-solid fa-user", items: [{ id: 1, label: '會員總覽', route: '' }, { id: 2, label: '會員等級', route: '' }] },
                { label: '首頁管理', iconClass: 'fa-solid fa-film', items: [{ id: 1, label: '首頁Banner', route: '' }] },
                { label: '促銷活動', iconClass: "fa-solid fa-gift", items: [{ id: 1, label: '推薦商品', route: '' }, { id: 2, label: '推薦留言', route: '' }, { id: 3, label: '推薦專欄', route: '' }] },
                { label: '商品管理', iconClass: "fa-solid fa-box-open", items: [{ id: 1, label: '商品總覽', route: '' }, { id: 2, label: '商品分類', route: '' }, { id: 3, label: '商品TAG', route: '' }, { id: 4, label: '商品群組', route: '' }, { id: 5, label: '群組明細', route: '' }] },
                { label: '訂單管理', iconClass: "fa-solid fa-clipboard-list", items: [{ id: 1, label: '訂單總覽', route: '' }] },
                { label: '專欄管理', iconClass: "fa-regular fa-pen-to-square", items: [{ id: 1, label: '專欄總覽', route: '' }, { id: 2, label: '專欄分類', route: '' }] },
                { label: '食譜管理', iconClass: "fa-solid fa-utensils", items: [{ id: 1, label: '食譜總覽', route: '' }, { id: 2, label: '食譜分類', route: '' }, { id: 3, label: '留言管理', route: '' }] },
                { label: '健康知識問答管理', iconClass: "fa-solid fa-gamepad", items: [{ id: 1, label: '題目總覽', route: '' }, { id: 2, label: '折價券', route: '' }] },
                { label: '常見問題管理', iconClass: "fa-solid fa-circle-question", items: [{ id: 1, label: '常見問題總覽', route: '' }, { id: 2, label: '常見問題分類', route: '' }] },

            ]
        };
    },
}
</script>

<style lang="scss">
@import "@/assets/scss/sidebar.scss";
</style>