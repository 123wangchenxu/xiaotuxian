import { defineStore } from "pinia";
import { ref,computed } from "vue";
import { useUserStore} from "./user";
import { getcaradd } from "@/apis/textapi";
import { getcar,getdeletecar } from "@/apis/textapi";
const isLogin=()=>{
    return useUserStore().token!==''
}
export const useCartStore=defineStore('cart',()=>{
    const goods=ref([]) 
    function changenum(id,num)
    {
        const item = goods.value.find(item => item.skuId===id)
        if(item)
        {
            item.count=num
        }
    }
    async function addCart(good)
    {
        if(isLogin())
        {
            await getcaradd(good.skuId,good.count)
            const getdata=await getcar()
            goods.value=getdata.data.result
            for(var j=0;j<goods.value.length;j++)
            {
                goods.value[j]['checked'] = false
            }
        }
        else
        {
            if(goods.value.find(item=>item.skuId===good.skuId))
            {
                for(var i=0;i<goods.value.length;i++)
                {
                    if(goods.value[i].skuId===good.skuId)
                    {
                        goods.value[i].count++
                        break
                    }
                }
            }
            else{
                good['checked']=false
                goods.value.push(good)
            }
        }
    }
    async function delcart(id)
    {
        if(isLogin())
        {
            await getdeletecar([id+''])
            const getdata = await getcar()
            goods.value = getdata.data.result
            for (var j = 0; j < goods.value.length; j++) {
                goods.value[j]['checked'] = false
                goods.value[j]['select'] = goods.value[j].selected
            }
        }
        else
            goods.value=goods.value.filter(item=>item.skuId!==id)

    }
    function clearall()
    {
        goods.value=[]
    }
    function selchange(id)
    {
        if(isLogin())
        {
            for (var j = 0; j < goods.value.length; j++) {
                goods.value[j]['select'] = goods.value[j].selected
            }
        }
        else
        {
            const item = goods.value.find(item => item.skuId === id)
            if (item) {
                item.select=true
            }
        }
    }
    function changecheck(id,state)
    {
        console.log(state)
        const item = goods.value.find(item => item.skuId === id)
        if (item) {
            item.checked=state
        }
    }
    function changestate(state)
    {
        goods.value.forEach(element => {
            element.checked=state
        });
    }
    const totalcount=computed(()=>{
        const sum=ref(0)
        goods.value.forEach(element => {
            sum.value+=element.count
        });
        return sum.value
    })
    const checkcount = computed(() => {
        const sum = ref(0)
        goods.value.forEach(element => {
            if(element.checked)
                sum.value += element.count
        });
        return sum.value
    })
    const checkmoney = computed(() => {
        const sum = ref(0)
        goods.value.forEach(element => {
            if (element.checked)
                sum.value += element.count*element.price
        });
        return sum.value
    })
    const totalmoney = computed(() => {
        const sum = ref(0)
        goods.value.forEach(element => {
            sum.value += element.count*element.price
        });
        return sum.value
    })
    return{
        goods,
        addCart,
        changenum,
        changecheck,
        delcart,
        selchange,
        changestate,
        clearall,
        totalcount,
        checkcount,
        totalmoney,
        checkmoney
    }
},{
    persist:true
})