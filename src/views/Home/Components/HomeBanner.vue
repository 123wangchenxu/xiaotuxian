<script setup>
import { getbanners } from '@/apis/textapi';
import { onMounted } from 'vue';
import { ref } from 'vue';
defineOptions({
    name:'HomeBanner',
})
const images=ref([])
onMounted(async()=>{
    const getdata=await getbanners()
    images.value=getdata.data.result
})

</script>
<template>
    <div class="home-banner">
        <el-carousel indicator-position="none" arrow="never">
            <el-carousel-item v-for="item in images" :key="item.id">
                <img :src="item.imgUrl" alt="轮播图">
            </el-carousel-item>
        </el-carousel>
    </div>
</template>
<style>
  div.home-banner
  {
    position: absolute;
    top:0px;
    left:0px;
    z-index: 0;
  }
  .el-carousel__container
  {
    width:1240px;
    height:500px;
  }
  .el-carousel__item {
    background-color: transparent;
    width:1240px;
    height:500px;
  }
   .el-carousel__item img {
    width:1240px;
    height:500px;
  }
</style>