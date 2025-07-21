import request from '@/utils/http'
import { ref } from 'vue'
export function getCategory()
{
    return request.get('home/category/head')
}
export function getLayoutHeader()
{
    return request.get('/home/category/head')
}
export function getbanners()
{
    return request.get('/home/banner')
}
export function getNew()
{
    return request.get('/home/new')
}
export function getHot() {
    return request.get('/home/hot')
}
export function getall()
{
    return request.get('/home/goods')
}
export function getcatebanners()
{
    return request.get('/home/banner',{
        params:
        {
            distributionSite:2
        }
    })
}
export function  getsecondshop(shopid)
{
    return request.get('/category',{
        params:
        {
            id: shopid + '' 
        }
    })
}
export function getsecondid(shopid)
{
    return request.get('/category/sub/filter', {
        params:
        {
            id: shopid + ''
        }
    })
}
export function getgoodsdetail(id,field,pages)
{
    return request.post('/category/goods/temporary',ref({
            categoryId: id,
            page: pages,
            pageSize: 20,
            sortField: field
    }).value)
}
export function detailget(shopid)
{
    return request.get('/goods',{
        params:
        {
            id:shopid
        }
    })
}
export function gethotb(getid,gettype,getlimit=3)
{
    return request.get('/goods/hot',{
        params:
        {
            id:getid,
            type:gettype,
            limit:getlimit
        }
    })
}
export function login(acc,pwd)
{
    return request.post('/login',{
            "account": acc,
            "password":pwd
    })
}
export function getcaradd(id,num)
{
    return request.post('/member/cart',{
        skuId:id,
        count:num
    })
}
export function getcar()
{
    return request.get('/member/cart')
}
export function getdeletecar(ids)
{
    return request.delete('/member/cart', {
        data:{
            ids: ids
        }
    })
}
export function merge(skuarray)
{   console.log(skuarray)
    return request.post('/member/cart/merge',skuarray)
}
export function getpay()
{
    return request.get('/member/order/pre')
}
export function paypost(goods,addressId)
{
    return request.post('/member/order', {
        "deliveryTimeType": 1,
        "payType": 1,
        "payChannel": 1,
        "buyerMessage": "",
        "goods": goods,
        "addressId": addressId
    })
}
export function payend(id)
{
    return request.get(`/member/order/${id}`)
}