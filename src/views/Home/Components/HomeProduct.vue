<script setup>
import { onMounted,ref } from 'vue';
import { getall } from '@/apis/textapi';
defineOptions({
    name:'HomeProduct',
})
const goodsall=ref([])
onMounted(async()=>{
    const getdata=await getall()
    console.log(getdata)
    goodsall.value=getdata.data.result
})

</script>
<template>
    <div class="home-product">
        <div class="container">
            <ul>
                <li v-for="(item,index) in goodsall" :key="index">
                    <h1 class="nav">{{ item.name }}</h1>
                    <div class="detail">
                        <img :src="item.picture" alt="主题图">
                        <ul>
                            <li v-for="(good,index) in item.goods" :key="index">
                                <img :src="good.picture" alt="detail">
                                <span>{{ good.name }}</span>
                                <span>{{ good.desc }}</span>
                                <span>￥{{ good.price }}</span>
                            </li>
                        </ul>
                    </div>
                </li>
            </ul>
        </div>
    </div>
</template>
<style lang="scss">
.home-product .container ul
{
    width:1240px;
    display:flex;
    flex-direction: column;
}
.home-product .container ul li
{
    width:1240px;
    display:flex;
    flex-direction: column;
}
.home-product .container ul li h1
{
    margin-top: 20px;
    margin-bottom: 20px;
    width:1240px;
}
.home-product .container ul li div.detail
{
    width:1240px;
    display:flex;
}
.home-product .container ul li div.detail img
{
    width:420px;
    height:420px;
    margin-right: 20px;
    transition: all 0.5s;
}
.home-product .container ul li div.detail img:hover
{
    box-shadow: 0 3px 8px rgb(0 0 0/20%);
    translate: translate3D(0,-3px,0);
}
.home-product .container ul li div.detail ul
{
    width:800px;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
}
.home-product .container ul li div.detail ul li
{
    width: 190px;
    display:flex;
    flex-direction: column;
    margin-right: 10px;
}
.home-product .container ul li div.detail ul li img
{
    width:190px;
    height:190px;
}
.home-product .container ul li div.detail ul li span:first-of-type
{
    color:black;
    display: block;
    text-align: center;
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
}
.home-product .container ul li div.detail ul li span:nth-of-type(2)
{
    color:gray;
    display: block;
    text-align: center;
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
}
.home-product .container ul li div.detail ul li span:last-of-type
{
    color:$priceColor;
    display: block;
    text-align: center;
    font-size:15px;
    
}
</style>