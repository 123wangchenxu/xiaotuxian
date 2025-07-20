<script setup>
import { useRoute} from 'vue-router';
import { onMounted, ref } from 'vue';
import { getsecondid } from '@/apis/textapi';
import { getgoodsdetail } from '@/apis/textapi';
import GoodsItem from '../Home/Components/GoodsItem.vue';
const route=useRoute()
const id=ref(0)
const parentId=ref(0)
const name=ref('')
const parentName=ref('')
const result=ref([])
const type=ref('publishTime')
const pages=ref(1)
const disabled=ref(false)
const load=async ()=>{
    pages.value+=1
    const getgd=await getgoodsdetail(id.value,type.value,pages.value)
    if(getgd.data.result.items.length==0)
    {
        disabled.value=true
    }
    result.value=result.value.concat(getgd.data.result.items)
}
id.value =route.params.id
onMounted(async()=>{
    const getdata=await getsecondid(id.value)
    name.value=getdata.data.result.name
    parentName.value=getdata.data.result.parentName
    parentId.value=getdata.data.result.parentId
    const getgd=await getgoodsdetail(id.value,'publishTime',pages.value)
    result.value=getgd.data.result.items
})
const changetype=async (activeName)=>{
    const getgd=await getgoodsdetail(id.value,activeName.props.name,pages.value)
    type.value=activeName.props.name
    result.value=getgd.data.result.items
}
</script>

<template>
  <div class="container ">
    <!-- 面包屑 -->
    <div class="bread-container">
      <el-breadcrumb separator=">">
        <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item :to="{ path: `/category/${parentId}` }">{{ parentName }}
        </el-breadcrumb-item>
        <el-breadcrumb-item>{{ name }}</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="sub-container">
      <el-tabs @tab-click="changetype">
        <el-tab-pane label="最新商品" name="publishTime"></el-tab-pane>
        <el-tab-pane label="最高人气" name="orderNum"></el-tab-pane>
        <el-tab-pane label="评论最多" name="evaluateNum"></el-tab-pane>
      </el-tabs>
      <div class="body">
        <ul v-infinite-scroll="load" :infinite-scroll-disabled="disabled" style="overflow:auto">
            <li v-for="(item,index) in result" :key="index"><GoodsItem :goods="item"></GoodsItem></li>
        </ul>
      </div>
    </div>
  </div>

</template>



<style lang="scss" scoped>
.bread-container {
  padding: 25px 0;
  color: #666;
}

.sub-container {
  padding: 20px 10px;
  background-color: #fff;

  .body ul {
    display: flex;
    flex-wrap: wrap;
    padding: 0 10px;
  }

  .goods-item {
    display: block;
    width: 220px;
    margin-right: 20px;
    padding: 20px 30px;
    text-align: center;

    img {
      width: 160px;
      height: 160px;
    }

    p {
      padding-top: 10px;
    }

    .name {
      font-size: 16px;
    }

    .desc {
      color: #999;
      height: 29px;
    }

    .price {
      color: $priceColor;
      font-size: 20px;
    }
  }

  .pagination-container {
    margin-top: 20px;
    display: flex;
    justify-content: center;
  }


}
</style>