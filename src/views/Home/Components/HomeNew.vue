<script setup>
import { getNew } from '@/apis/textapi';
import { onMounted } from 'vue';
import { ref } from 'vue';
import HomePanel from '@/views/Home/Components/HomePanel.vue';
defineOptions({
    name:'HomeNew',
})
const goods=ref([])
onMounted(async()=>{
    const getdata=await getNew()
    goods.value=getdata.data.result
})
</script>
<template>
    <div class="home-new">
        <HomePanel title="新鲜好物" title_inf="新鲜出炉 品质靠谱">
            <ul>
                <li v-for="(item,index) in goods" :key="index">
                    <img v-img-lazy="item.picture" alt="新鲜好物">
                    <div class="desc">
                        <span>
                            {{ item.name }}{{ item.desc }}
                        </span>
                        <span>￥{{ item.price }}</span>
                    </div>
                </li>
            </ul>
        </HomePanel>
    </div>
</template>
<style lang="scss">
.home-new ul
{
    width:1240px;
    display:flex;
}
.home-new ul li
{
    width:307px;
    display:flex;
    margin-right: 3px;
    flex-direction: column;
    transition: all .5s;
    &:hover {
      transform: translate3d(0, -3px, 0);
      box-shadow: 0 3px 8px rgb(0 0 0 / 20%);
    }
}

.home-new ul li div.desc
{
    background-color:#f0f9f4;
}
.home-new ul li div.desc span:first-of-type
{
    display:block;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;

}
.home-new ul li div.desc span:last-of-type
{
    display: block;
    text-align: center;
    color:$priceColor;
}
</style>