<script setup>
import { useRoute } from 'vue-router';
import { onMounted, ref ,watch} from 'vue';
import { getcatebanners,getsecondshop } from '@/apis/textapi';
const route=useRoute()
const name=ref('')
const getseinf=ref({})

watch(()=>route.params.id,async(newValue)=>{
    const getdata=await getsecondshop(newValue)
    getseinf.value=getdata.data.result
    name.value=getseinf.value.name
},{
    immediate:true
})
const images=ref([])
onMounted(async()=>{
    const getdata=await getcatebanners()
    images.value=getdata.data.result
})
defineOptions(
    {
        name:'CategoryIndex',
    }
)
</script>

<template>
  <div class="top-category">
    <div class="container m-top-20">
      <!-- 面包屑 -->
      <div class="bread-container">
        <el-breadcrumb separator=">">
          <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
          <el-breadcrumb-item :to="{path:'/home'}">{{ name }}</el-breadcrumb-item>
        </el-breadcrumb>
      </div>
       <!-- 轮播图 -->
      <div class="home-cate-banner">
        <el-carousel height="500px">
          <el-carousel-item v-for="item in images" :key="item.id">
            <img :src="item.imgUrl" alt="">
          </el-carousel-item>
        </el-carousel>
      </div>
      <div class="home-cate-detail">
        <div class="nav">全部分类</div>
        <div class="secondlist">
            <ul>
                <li v-for="(item,index) in getseinf.children" :key="index">
                    <router-link :to="`/category/sub/${item.id}`">
                      <img :src="item.picture" alt="二级分类">
                      <span>{{ item.name }}</span>
                    </router-link>
                </li>
            </ul>
        </div>
        <ul class="listdetail">
            <li v-for="(item,index) in getseinf.children" :key="index">
                <div class="nav">{{ item.name }}</div>
                <ul>
                    <li v-for="(good,index) in item.goods" :key="index">
                        <img :src="good.picture" alt="新鲜好物">
                        <div class="desc">
                            <span>
                                {{ good.name }}{{ good.desc }}
                            </span>
                            <span>￥{{ good.price }}</span>
                        </div>
                    </li>
                </ul>
            </li>
        </ul>
      </div>
    </div>
  </div>
</template>


<style scoped lang="scss">
.top-category {
  h3 {
    font-size: 28px;
    color: #666;
    font-weight: normal;
    text-align: center;
    line-height: 100px;
  }

  .sub-list {
    margin-top: 20px;
    background-color: #fff;

    ul {
      display: flex;
      padding: 0 32px;
      flex-wrap: wrap;

      li {
        width: 168px;
        height: 160px;


        a {
          text-align: center;
          display: block;
          font-size: 16px;

          img {
            width: 100px;
            height: 100px;
          }

          p {
            line-height: 40px;
          }

          &:hover {
            color: $xtxColor;
          }
        }
      }
    }
  }

  .ref-goods {
    background-color: #fff;
    margin-top: 20px;
    position: relative;

    .head {
      .xtx-more {
        position: absolute;
        top: 20px;
        right: 20px;
      }

      .tag {
        text-align: center;
        color: #999;
        font-size: 20px;
        position: relative;
        top: -20px;
      }
    }

    .body {
      display: flex;
      justify-content: space-around;
      padding: 0 40px 30px;
    }
  }

  .bread-container {
    padding: 25px 0;
  }
}
.home-cate-banner {
  width: 1240px;
  height: 500px;
  margin: 0 auto;
  img {
    width: 100%;
    height: 500px;
  }
}
.home-cate-detail .nav
{
    text-align: center;
    font-size:20px;
    margin-top:20px;
    margin-bottom: 20px;
}
.home-cate-detail div ul
{
    display: flex;
    width:1240px;
}
.home-cate-detail div ul li
{
    display:flex;
    flex-direction: column;
    width:100px;
    margin-right: 80px;
}
.home-cate-detail div ul li img
{
    width:100px;
    height:100px;
}
.home-cate-detail div ul li span
{
    display:block;
    text-align: center;
}
.home-cate-detail ul.listdetail
{
    display:flex;
    flex-direction: column;
    width:1240px;
}
.home-cate-detail ul.listdetail li .nav
{
    text-align: center;
    font-size:20px;
    margin-top:20px;
    margin-bottom: 20px;
}
.home-cate-detail ul.listdetail li ul
{
    width:1240px;
    display:flex;
    flex-wrap: wrap;
}
.home-cate-detail ul.listdetail li ul li
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

.home-cate-detail ul.listdetail li ul li div.desc
{
    background-color:#f0f9f4;
}
.home-cate-detail ul.listdetail li ul li div.desc span:first-of-type
{
    display:block;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;

}
.home-cate-detail ul.listdetail li ul li div.desc span:last-of-type
{
    display: block;
    text-align: center;
    color:$priceColor;
}
</style>