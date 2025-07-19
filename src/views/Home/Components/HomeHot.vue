<script setup>
import HomePanel from '@/views/Home/Components/HomePanel.vue';
import { getHot } from '@/apis/textapi';
import { onMounted } from 'vue';
import { ref } from 'vue';
defineOptions({
    name:'HomeHot',
})
const goods=ref([])
onMounted(async()=>{
    const getdata=await getHot()
    console.log(getdata)
    goods.value=getdata.data.result
})
</script>
<template>
    <div class="home-hot">
        <HomePanel title="人气推荐" title_inf="人气爆款 不容错过">
            <ul>
                <li v-for="(item,index) in goods" :key="index">
                    <img v-img-lazy="item.picture" alt="新鲜好物">
                    <div class="desc">
                        <span>
                            {{ item.title }} {{ item.alt }}
                        </span>
                    </div>
                </li>
            </ul>
        </HomePanel>
    </div>
</template>
<style lang="scss">
.home-hot ul
{
    width:1240px;
    display:flex;
}
.home-hot ul li
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

.home-hot ul li div.desc
{
    background-color:#f0f9f4;
}
.home-hot ul li div.desc span:first-of-type
{
    display:block;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    text-align: center;
}
</style>