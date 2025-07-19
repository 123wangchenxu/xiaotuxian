<script setup>
import HomeCategory from '@/views/Home/Components/HomeCategory.vue'
import HomeBanner from '@/views/Home/Components/HomeBanner.vue'
import HomeNew from '@/views/Home/Components/HomeNew.vue'
import HomeHot from '@/views/Home/Components/HomeHot.vue'
import homeProduct from '@/views/Home/Components/HomeProduct.vue'
import HomePanel from './Components/HomePanel.vue'
defineOptions(
    {
        name:'HomeIndex',
    }
)
</script>
<template>
    <div class="container">
    <HomeCategory />
    <HomeBanner />
  </div>
  <HomeNew>
    <HomePanel title="新鲜好物" title_inf="新鲜出炉 品质靠谱"></HomePanel>
  </HomeNew>
  <HomeHot>
    <HomePanel title="人气推荐" title_inf="人气爆款 不容错过"></HomePanel>
  </HomeHot>
  <homeProduct />
</template>
<style>
div.container
{
    position: relative;
}
</style>
