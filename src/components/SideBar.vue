<template>
    <div class="sidebar">
        <nav>
            <!-- <div> -->
            <!-- <div v-for="(dropdown, index) in dropdowns" :key="index" class="dropdown">
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
            </div> -->
            <ul class="list-unstyled ps-0">
                <li class="mb-1 dropdown" v-for="(dropdown, index) in dropdowns" :key="index">
                    <button class="btn btn-toggle align-items-center rounded collapsed" data-bs-toggle="collapse"
                        :data-bs-target="'#collapse-' + index" :aria-expanded="false">
                        {{ dropdown.label }}
                    </button>
                    <div class="collapse" :id="'collapse-' + index">
                        <ul class="btn-toggle-nav list-unstyled fw-normal pb-1 small">
                            <li v-for="item in dropdown.items" :key="item.id" class="dropdownChild">
                                <router-link :to="item.route" class="dropdown-item">{{ item.label }}</router-link>
                            </li>
                        </ul>
                        <hr>
                    </div>
                </li>
            </ul>
            <div class="footer">
                <button type="button" class="setting btn btn-secondary">
                    <i class="fa-solid fa-gear"></i>
                    <p>設定</p>
                </button>
                <button @click="logout" type="button" class="btn btn-secondary">
                    <i class="fa-solid fa-right-from-bracket"></i>
                    <p>登出</p>
                </button>
            </div>
        </nav>
    </div>
</template>

<script>
export default {
    data() {
        return {
            dropdowns: [
                {
                    label: '權限管理',
                    iconClass: 'fa-solid fa-person',
                    items: [
                        { id: 1, label: '管理員', route: '/master' }
                    ]
                },
                {

                    label: '會員管理',
                    iconClass: "fa-solid fa-user",
                    items: [
                        { id: 1, label: '會員總覽', route: '/member' },
                        { id: 2, label: '會員等級', route: '/memberlevel' }
                    ]
                },
                {

                    label: '首頁管理',
                    iconClass: 'fa-solid fa-film',
                    items: [
                        { id: 1, label: '首頁Banner', route: '/banner' }
                    ]
                },
                {

                    label: '促銷活動',
                    iconClass: "fa-solid fa-gift",
                    items: [
                        { id: 1, label: '推薦商品', route: '/productfeature' },
                        { id: 2, label: '推薦留言', route: '' },
                        { id: 3, label: '推薦專欄', route: '/articlesuggest' }
                    ]
                },
                {

                    label: '商品管理',
                    iconClass: "fa-solid fa-box-open",
                    items: [
                        { id: 1, label: '商品總覽', route: '/products' },
                        { id: 2, label: '商品分類', route: '/productsclass' },
                        { id: 3, label: '商品TAG', route: '/producttag' },
                        { id: 4, label: '商品群組', route: '/prodgroup' },
                        { id: 5, label: '群組明細', route: '/groupdetail' }
                    ]
                },
                {

                    label: '訂單管理',
                    iconClass: "fa-solid fa-clipboard-list",
                    items: [
                        { id: 1, label: '訂單總覽', route: '/order' }
                    ]
                },
                {

                    label: '專欄管理',
                    iconClass: "fa-regular fa-pen-to-square",
                    items: [
                        { id: 1, label: '專欄總覽', route: '/articles' },
                        { id: 2, label: '專欄分類', route: '/articleclass' }
                    ]
                },
                {

                    label: '食譜管理',
                    iconClass: "fa-solid fa-utensils",
                    items: [
                        { id: 1, label: '食譜總覽', route: '/cookbook' },
                        { id: 2, label: '食譜分類', route: '/cookbookclass' },
                        { id: 3, label: '留言管理', route: '/comment' }
                    ]
                },
                {

                    label: '健康知識問答管理',
                    iconClass: "fa-solid fa-gamepad",
                    items: [
                        { id: 1, label: '題目總覽', route: '/game' },
                        { id: 2, label: '折價券', route: '/coupon' }
                    ]
                },
                {

                    label: '常見問題管理',
                    iconClass: "fa-solid fa-circle-question",
                    items: [
                        { id: 1, label: '常見問題總覽', route: '/faq' },
                        { id: 2, label: '常見問題分類', route: '/faqclass' }
                    ]
                },
            ]
        };
    },
    methods:{
        logout(){
            localStorage.clear();            
            this.$router.push({name:'login'})         
        }
    }
}
</script>

<style lang="scss">
@import "@/assets/scss/sidebar.scss";
</style>