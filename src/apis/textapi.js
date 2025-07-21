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