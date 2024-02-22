<template>
    <div class="groupdetail">
        <SideBar />
        <div class="groupdetailRight">
            <h1>群組明細</h1>
            <button type="button" class="btn btn-outline-primary groupdetailAdd" data-bs-toggle="modal"
                data-bs-target="#addgroupDetail" @click="openAddModal">
                <i class="fa-solid fa-circle-plus"></i>新增
            </button>


            <div class="modal fade" id="addgroupDetail" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1"
                aria-labelledby="addgroupDetailLabel" aria-hidden="true">
                <div class="modal-dialog">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title" id="addgroupDetailLabel">新增資料</h5>
                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div class="modal-body">
                            <div class="mb-3">
                                <label for="groupDetailNo" class="form-label">群組編號</label>
                                <input type="text" class="form-control mb-3" id="groupDetailNo"
                                    v-model="prodgroup_no" readonly>

                                <label for="groupName">群組名稱</label>
                                <select class="form-select mb-3" aria-label="Default select example"
                                    v-model="prodgroup_name" @change="updateProdgroupNo">
                                    <option v-for="option in prodgroupOptions" :key="option.prodgroup_no"
                                        :value="option.prodgroup_name">{{ option.prodgroup_name }}</option>
                                </select>

                            </div>
                            <label for="form-select">選擇商品</label>
                            <select class="form-select" aria-label="Default select example"
                                v-model="product_name" multiple>
                                <option v-for="option in productOptions" :key="option.product_name"
                                    :value="option.product_name">{{ option.product_name }}</option>
                            </select>

                            <div>
                                選中的商品名稱: {{ product_name }}
                            </div>
                            <label for="exampleFormControlInput3" class="form-label">促銷價格</label>
                            <input type="number" class="form-control" id="exampleFormControlInput3"
                                v-model="prodgroup_sale_price">

                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-outline-primary" data-bs-dismiss="modal">回列表</button>
                            <button type="button" class="btn btn-primary" @click="addGroupDetailToDB">儲存</button>
                        </div>
                    </div>
                </div>
            </div>

            <!-- 修改彈窗 -->
            <!-- <div class="modal fade" id="updateGroupDetail" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1"
                aria-hidden="true">
                <div class="modal-dialog">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title">修改資料</h5>
                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div class="modal-body">
                            <label for="groupDetailNo" class="form-label">群組編號</label>
                            <input type="text" class="form-control mb-3" id="groupDetailNo"
                                v-model="groupDetailForm.prodgroup_no" readonly>

                            <label for="form-select">群組名稱</label>
                            <select class="form-select mb-3" aria-label="Default select example"
                                v-model="groupDetailForm.prodgroup_name" @change="updateProdgroupNo">
                                <option v-for="option in prodgroupOptions" :key="option.prodgroup_no"
                                    :value="option.prodgroup_name">{{ option.prodgroup_name }}</option>
                            </select>
                            <label for="form-select">選擇商品</label>
                            <select class="form-select" aria-label="Default select example"
                                v-model="groupDetailForm.product_no" multiple>
                                <option v-for="option in productOptions" :key="option.product_no"
                                    :value="option.product_no">{{ option.product_no }}{{ option.product_name }}</option>
                            </select>

                            <div>
                                選中的商品編號: {{ groupDetailForm.product_no }}
                            </div>
                            <label for="exampleFormControlInput3" class="form-label">促銷價格</label>
                            <input type="number" class="form-control" id="exampleFormControlInput3"
                                v-model="groupDetailForm.prodgroup_sale_price">

                            <div class="modal-footer">
                                <button type="button" class="btn btn-outline-primary" data-bs-dismiss="modal">回列表</button>
                                
                                <button type="button" class="btn btn-primary" @click="updateGroupToDB">儲存</button>
                            </div>

                        </div>
                    </div>
                </div>
            </div> -->


            <table class="table table-hover table-bordered border-dark productTable">
                <thead>
                    <tr>
                        <th scope="col">
                            <input type="checkbox" v-model="selectAll" @change="toggleAll">
                        </th>
                        <th scope="col">群組編號</th>
                        <th scope="col">群組名稱</th>
                        <th scope="col">群組商品名稱</th>
                        <th scope="col">促銷價格</th>
                        <th scope="col">
                            <button class="btn btn-outline-primary" @click="deleteSelected">
                                <i class="fa-solid fa-trash-can"></i>
                                刪除
                            </button>
                        </th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(groupdetail, index) in groupdetails" :key="index">
                        <td>
                            <input type="checkbox" v-model="groupdetail.checked" :value="groupdetail">
                        </td>
                        <td>{{ groupdetail.prodgroup_no }}</td>
                        <td>{{ groupdetail.prodgroup_name }}</td>
                        <td>{{ groupdetail.product_name }}</td>
                        <td>{{ groupdetail.prodgroup_sale_price }}</td>
                        <td>
                            <button class="btn btn-outline-primary" data-bs-toggle="modal"
                                data-bs-target="#updateGroupDetail" @click="updateGroupDetail(groupdetail)">
                                <i class="fa-solid fa-pencil"></i>
                                修改
                            </button>
                            <button class="btn btn-outline-primary prodDelete" @click=" deleteProdToDB(prodgroupNo, index)">
                                <i class="fa-solid fa-trash-can"></i>
                                刪除
                            </button>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>

<script>
import SideBar from "@/components/SideBar.vue";
import axios from "axios";
import { ref, onMounted } from 'vue';

export default {
    data() {
        return {
            selectAll: false,
            groupdetails: [
                // { groupdetailNumber: '0001', groupdetailName: '首頁推薦', groupProdNo: '#001、#002' },
                // { groupdetailNumber: '0002', groupdetailName: 'BMI過輕', groupProdNo: '#001、#002' },
                // { groupdetailNumber: '0003', groupdetailName: '龍年促銷', groupProdNo: '#001、#002', sales: '折10元' },
                // { groupdetailNumber: '0004', groupdetailName: '食譜食材推薦', groupProdNo: '#001、#002' },

                // 其他商品數據
            ],
            // groupDetailForm: {
                prodgroup_no: '',
                product_name: [],
                prodgroup_name: '',
                prodgroup_sale_price: '',

            // },
            prodgroupOptions: [],
            productOptions: [],
            props: ['productGroupNo'],
            



        }
    },
    components: {
        SideBar,
    },
    created() {
        this.fetchData();
    },
    methods: {
        // openAddModal() {
        //     this.groupDetailForm = {
        //         prodgroup_no: '',
        //         product_name: [],
        //         prodgroup_name: '',
        //         prodgroup_sale_price: ''
        //     };
        // },
        async fetchData() {
            try {
                const response = await axios.get(`${import.meta.env.VITE_API_URL}/admin/product/groupDetailsDataGet.php`);
                this.groupdetails = response.data.prodgroup_details;
                this.prodgroupOptions = response.data.prodgroup_options;
                this.productOptions = response.data.product_options;
            } catch (error) {
                console.error('Error:', error);
            }
        },
        updateProdgroupNo() {
            const selectedProdgroup = this.prodgroup_name;
            const selectedOption = this.prodgroupOptions.find(option => option.prodgroup_name === selectedProdgroup);
            if (selectedOption) {
                // 如果找到選中的群組名，則更新群組編號
                this.prodgroup_no = selectedOption.prodgroup_no;
            } else {
                // 沒有找到則清空群組編號
                this.prodgroup_no = '';
            }
        },


        addGroupDetailToDB() {
            // 創建 FormData 對象
            const addgroupDetailForm = new FormData();
            // 將選中的多個商品名稱以逗號分隔並添加到 FormData 對象中
            addgroupDetailForm.append('product_names', this.product_name.join(','));
            // 將其餘數據添加到 FormData 對象中
            addgroupDetailForm.append('prodgroup_no', this.prodgroup_no);
            addgroupDetailForm.append('prodgroup_name', this.prodgroup_name);
            addgroupDetailForm.append('prodgroup_sale_price', this.prodgroup_sale_price);

            // 發送 POST 請求到後端
            axios.post(`${import.meta.env.VITE_API_URL}/admin/product/groupDetailDataAdd.php`, addgroupDetailForm, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            })
            .then(response => {
                if (!response.data.error) {
                    const newGroupDetail = response.data; // 從伺服器返回新商品細節
                    this.groupdetails.push(newGroupDetail); // 將新商品細節添加到 groupdetails 陣列中

                    // 清空表單字段
                    this.prodgroup_no = '';
                    this.product_name = [];
                    this.prodgroup_name = '';
                    this.prodgroup_sale_price = '';

                    // 在此處執行其他操作，例如刷新數據列表
                    console.log(response.data);
                }
            })
            .catch(error => {
                console.error('添加群組詳細信息時出錯：', error);
            });
        },
// addGroupDetailToDB() {
//     // 創建 FormData 對象
//     const formData = new FormData();

//     // 將選擇的多個商品編號以逗號分隔並添加到 FormData 對象中
//     formData.append('product_nos', this.groupDetailForm.product_nos.join(','));

//     // 遍歷 groupDetailForm 對象的鍵值對，並將每個鍵值對添加到 FormData 對象中
//     for (const [key, value] of Object.entries(this.groupDetailForm)) {
//         formData.append(key, value);
//     }

//     // 發送 POST 請求到後端
//     axios.post(`${import.meta.env.VITE_API_URL}/admin/product/groupDetailDataAdd.php`, formData, {
//         headers: {
//             'Content-Type': 'multipart/form-data',
//         },
//     })
//     .then(response => {
//         if (!response.data.error) {
//             const newGroupDetail = response.data; // 從伺服器返回新商品細節
//             this.groupdetails.push(newGroupDetail); // 將新商品細節添加到 groupdetails 陣列中

//             // 清空表單字段
//             this.groupDetailForm = {
//                 prodgroup_no: '',
//                 product_nos: [],
//                 prodgroup_name: '',
//                 prodgroup_sale_price: ''
//             };

//             // 在此處執行其他操作，例如刷新數據列表
//             console.log(response.data);
//         }
//     })
//     .catch(error => {
//         console.error('Error adding groupdetails:', error);
//     });
// },



//         updateGroupDetail(groupdetail) {
//             this.groupDetailForm = {
//                 prodgroup_no: groupdetail.prodgroup_no,
//                 product_no: groupdetail.product_no,
//                 prodgroup_name: groupdetail.prodgroup_name,
//                 prodgroup_sale_price: groupdetail.prodgroup_sale_price
//             }
//         },

//         updateGroupToDB() {
//             axios.post(`${import.meta.env.VITE_API_URL}/admin/product/groupDetailDataUpdate.php`, {
//                 prodgroup_no: this.groupDetailForm.prodgroup_no,
//                 product_no: this.groupDetailForm.product_no,
//                 prodgroup_name: this.groupDetailForm.prodgroup_name,
//                 prodgroup_sale_price: this.groupDetailForm.prodgroup_sale_price,
//             })
//                 .then(response => {
//                     if (!response.data.error) {
//                         const index = this.groupdetails.findIndex(groupdetail => groupdetail.prodgroup_no === this.prodgroup_no);
//                         if (index !== -1) {
//                             this.groupdetails[index].product_no = this.product_no,
//                                 this.groupdetails[index].prodgroup_name = this.prodgroup_name,
//                                 this.groupdetails[index].prodgroup_sale_price = this.prodgroup_sale_price
//                         }
//                         this.prodgroup_no = '';
//                         this.product_no = '';
//                         this.prodgroup_name = '';
//                         this.prodgroup_sale_price = '';
//                     }
//                 })
//                 .catch(error => {
//                     console.error('Error updating groupdetails:', error);
//                 })
//         },
//         toggleAll() {
//             this.groupdetails.forEach(groupdetail => {
//                 groupdetail.checked = this.selectAll;
//             });
//         },


//         deleteProdToDB(prodgroupNo, index) {
//             axios.post(`${import.meta.env.VITE_API_URL}/admin/product/groupDetailDataDelete.php`, {
//                 prodgroup_no: prodgroupNo
//             }, {
//                 headers: {
//                     'Content-Type': 'application/json',
//                 }
//             })
//                 .then(response => {
//                     const confirmed = window.confirm("確定要刪除此群組明細嗎?");
//                     if (!response.data.error && confirmed) {
//                         this.groupdetails.splice(index, 1)
//                     }
//                 })
//                 .catch(error => {
//                     console.error('Error deleting groupdetails:', error);
//                 })
//         },
//         deleteSelected() {
//             const confirmed = window.confirm("確定要刪除選取群組明細嗎?");
//             this.groupdetails.forEach((groupdetail) => {
//                 if (groupdetail.checked) {
//                     axios.post(`${import.meta.env.VITE_API_URL}/admin/product/groupDetailDelete.php`, {
//                         prodgroup_no: groupdetail.prodgroup_no
//                     })
//                         .then(response => {
//                             if (response.data && !response.data.error && confirmed) {
//                                 this.groupdetails = this.groupdetails.filter(groupdetail => !groupdetail.checked);
//                             }
//                         })
//                         .catch(error => {
//                             console.error('Error deleting groupdetail:', error);
//                         })
//                 }
//             })
//         },
    },

}
</script>

<style lang="scss">
@import "@/assets/scss/page/_groupdetail.scss";
@import "@/assets/scss/sidebar.scss";
</style>