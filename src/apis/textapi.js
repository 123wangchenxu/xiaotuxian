import request from '@/utils/http'
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