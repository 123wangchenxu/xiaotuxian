import { defineStore } from "pinia";
import { ref } from "vue";
export const useUserStore=defineStore('user',()=>{
    const account=ref('')
    const password=ref('')
    const token=ref('')
    function getaccount(acc)
    {
        account.value=acc
    }
    function getpassword(pwd)
    {
        password.value=pwd
    }
    function gettoken(tok)
    {
        token.value=tok
    }
    function deleteall()
    {
        account.value=''
        password.value=''
        token.value=''
    }
    return{
        account,
        password,
        getaccount,
        getpassword,
        gettoken,
        deleteall,
        token
    }
},{
    persist:
    {
        pick:['token']
    }
}
)