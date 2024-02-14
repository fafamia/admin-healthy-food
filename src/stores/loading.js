import { defineStore } from "pinia"; 

export const useLoadingStore = defineStore('Loading',{
    stete:()=>{
        return{
            isLoading:false,
        }
    },
    actions:{
        showLoading(){
            this.isLoading = true;
            console.log(this.isLoading);
        },
        hideLoading(){
            this.isLoading = false;
            console.log(this.isLoading);
        }
    }
})