<script setup>
import { detailget,gethotb } from '@/apis/textapi';
import { onMounted } from 'vue';
import { useRoute } from 'vue-router';
import { ref } from 'vue';
import DetailHot from '@/views/Home/Components/DetailHot.vue';
import ImageView from '@/components/ImageView.vue';
import XkxSku from '@/components/XtxSku/index.vue'
import { ElMessage } from 'element-plus';
import { useCartStore } from '@/stores/Cart';
const num=ref(0)
const first_name=ref('')
const second_name=ref('')
const name=ref('')
const desc=ref('')
const first_id=ref(0)
const second_id=ref(0)
const route=useRoute()
const result=ref({
  price:'',
  oldPrice:''
})
const imgUrls=ref([])
const imgUrl=ref('')
const hots=ref({})
const weeks=ref({})
const skuObj=ref({})
const cart_store=useCartStore()
const skuId=ref(0)
const handleChange=()=>{
  cart_store.changenum(skuId.value,num.value)
  console.log(cart_store)
}
const changesel=()=>{
  cart_store.selchange(skuId.value)
}
const xkxchange=(newValue)=>{
  skuObj.value=newValue
  if(Object.keys(skuObj.value).length>0)
  {
    skuId.value=skuObj.value.skuId
    cart_store.addCart({
      id:result.value.id,
      name:result.value.name,
      picture:result.value.mainPictures[0],
      price: result.value.price,
      count:num.value,
      skuId: skuObj.value.skuId,
      attrsText:skuObj.value.specsText,
      selected: false
    })
  }
  else
  {
    ElMessage({type:'warning',message:"请选择规格"})
  }
}
onMounted(async()=>{
    const getdata=await detailget(route.params.id)
    const gethot=await gethotb(route.params.id,1)
    const getweeks=await gethotb(route.params.id,2)
    hots.value=gethot.data.result
    weeks.value=getweeks.data.result
    first_name.value=getdata.data.result.categories[1].name
    second_name.value=getdata.data.result.categories[0].name
    name.value=getdata.data.result.name
    first_id.value=getdata.data.result.categories[1].id
    second_id.value=getdata.data.result.categories[0].id
    result.value=getdata.data.result
    console.log(result.value)
    imgUrls.value=result.value.details.pictures
    desc.value=result.value.desc
    console.log(result.value)
    if(imgUrls.value.length>=4)
    {
      imgUrls.value=imgUrls.value.slice(0,6)
    }
    imgUrl.value=imgUrls.value[0]
})
</script>

<template>
  <div class="xtx-goods-page">
    <div class="container">
      <div class="bread-container">
        <el-breadcrumb separator=">">
          <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
          <el-breadcrumb-item :to="{ path: `/category/${first_id}` }">{{ first_name }}
          </el-breadcrumb-item>
          <el-breadcrumb-item :to="{ path: `/category/sub/${second_id}` }">{{ second_name }}
          </el-breadcrumb-item>
          <el-breadcrumb-item>{{ name }}</el-breadcrumb-item>
        </el-breadcrumb>
      </div>
      <!-- 商品信息 -->
      <div class="info-container" v-if="result.details">
        <div>
          <div class="goods-info">
            <div class="media">
              <!-- 图片预览区 -->
              <div class="images">
                <ImageView :imageList="imgUrls"></ImageView>
                <!--<img :src="imgUrl" alt="expand_image">
                <div class="detailimages">
                  <ul>
                    <li @click="imgUrl=item" v-for="(item,index) in imgUrls" :key="index"><img :src="item" alt="商品图片"></li>
                  </ul>
                </div>-->
              </div>
              <!-- 统计数量 -->
              <ul class="goods-sales">
                <li>
                  <p>销量人气</p>
                  <p>{{ result.salesCount }}</p>
                  <p><i class="iconfont icon-task-filling"></i>销量人气</p>
                </li>
                <li>
                  <p>商品评价</p>
                  <p>{{ result.commentCount }}</p>
                  <p><i class="iconfont icon-comment-filling"></i>查看评价</p>
                </li>
                <li>
                  <p>收藏人气</p>
                  <p>{{ result.collectCount }}</p>
                  <p><i class="iconfont icon-favorite-filling"></i>收藏商品</p>
                </li>
                <li>
                  <p>品牌信息</p>
                  <p>{{ result.name }}</p>
                  <p><i class="iconfont icon-dynamic-filling"></i>品牌主页</p>
                </li>
              </ul>
            </div>
            <div class="spec">
              <!-- 商品信息区 -->
              <p class="g-name"> {{ name }} </p>
              <p class="g-desc">{{ desc }} </p>
              <p class="g-price">
                <span>{{ result.oldPrice }}</span>
                <span> {{ result.price }}</span>
              </p>
              <div class="g-service">
                <dl>
                  <dt>促销</dt>
                  <dd>12月好物放送，App领券购买直降120元</dd>
                </dl>
                <dl>
                  <dt>服务</dt>
                  <dd>
                    <span>无忧退货</span>
                    <span>快速退款</span>
                    <span>免费包邮</span>
                    <a href="javascript:;">了解详情</a>
                  </dd>
                </dl>
              </div>
              <!-- sku组件 -->
              <XkxSku :goods="{
                skus:result.skus,
                specs:result.specs
              }" @change="xkxchange"></XkxSku>
              <!-- 数据组件 -->
              <el-input-number v-model="num" @change="handleChange" :min="0" :max="10"></el-input-number>
              <!-- 按钮组件 -->
              <div>
                <el-button @click="changesel" size="large" class="btn">
                  加入购物车
                </el-button>
              </div>

            </div>
          </div>
          <div class="goods-footer">
            <div class="goods-article">
              <!-- 商品详情 -->
              <div class="goods-tabs">
                <nav>
                  <a>商品详情</a>
                </nav>
                <div class="goods-detail">
                  <!-- 属性 -->
                  <ul class="attrs">
                    <li v-for="item in result.details.properties" :key="item.value">
                      <span class="dt">{{ item.name }}</span>
                      <span class="dd">{{ item.value }}</span>
                    </li>
                  </ul>
                  <img v-for="(item,index) in result.details.pictures" :key="index" :src="item" alt="">
                  <!-- 图片 -->

                </div>
              </div>
            </div>
            <!-- 24热榜+专题推荐 -->
            <div class="goods-aside">
              <DetailHot :goods="hots" title="24小时热榜"></DetailHot>
              <DetailHot :goods="weeks" title="周榜单"></DetailHot>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>


<style scoped lang='scss'>
.xtx-goods-page {
  .goods-info {
    min-height: 600px;
    background: #fff;
    display: flex;

    .media {
      width: 580px;
      height: 600px;
      padding: 30px 50px;
    }
    .media .images
    {
      display:flex;
    }
    .media .images img
    {
      width:400px;
      height:400px;
      margin-right: 20px;
    }
    .media .images ul
    {
      width:60px;
      display:flex;
      flex-direction: column;
      flex-wrap: wrap;
    }
    .media .images ul li
    {
      width:60px;
      height:60px;
      margin-bottom: 10px;
    }
    .media .images ul li img
    {
      width:60px;
      height:60px;
      margin-bottom: 10px;
    }
    .spec {
      flex: 1;
      padding: 30px 30px 30px 0;
    }
  }

  .goods-footer {
    display: flex;
    margin-top: 20px;

    .goods-article {
      width: 940px;
      margin-right: 20px;
    }

    .goods-aside {
      width: 280px;
      min-height: 1000px;
    }
  }

  .goods-tabs {
    min-height: 600px;
    background: #fff;
  }

  .goods-warn {
    min-height: 600px;
    background: #fff;
    margin-top: 20px;
  }

  .number-box {
    display: flex;
    align-items: center;

    .label {
      width: 60px;
      color: #999;
      padding-left: 10px;
    }
  }

  .g-name {
    font-size: 22px;
  }

  .g-desc {
    color: #999;
    margin-top: 10px;
  }

  .g-price {
    margin-top: 10px;

    span {
      &::before {
        content: "¥";
        font-size: 14px;
      }

      &:first-child {
        color: $priceColor;
        margin-right: 10px;
        font-size: 22px;
      }

      &:last-child {
        color: #999;
        text-decoration: line-through;
        font-size: 16px;
      }
    }
  }

  .g-service {
    background: #f5f5f5;
    width: 500px;
    padding: 20px 10px 0 10px;
    margin-top: 10px;

    dl {
      padding-bottom: 20px;
      display: flex;
      align-items: center;

      dt {
        width: 50px;
        color: #999;
      }

      dd {
        color: #666;

        &:last-child {
          span {
            margin-right: 10px;

            &::before {
              content: "•";
              color: $xtxColor;
              margin-right: 2px;
            }
          }

          a {
            color: $xtxColor;
          }
        }
      }
    }
  }

  .goods-sales {
    display: flex;
    width: 400px;
    align-items: center;
    text-align: center;
    height: 140px;

    li {
      flex: 1;
      position: relative;

      ~li::after {
        position: absolute;
        top: 10px;
        left: 0;
        height: 60px;
        border-left: 1px solid #e4e4e4;
        content: "";
      }

      p {
        &:first-child {
          color: #999;
        }

        &:nth-child(2) {
          color: $priceColor;
          margin-top: 10px;
        }

        &:last-child {
          color: #666;
          margin-top: 10px;

          i {
            color: $xtxColor;
            font-size: 14px;
            margin-right: 2px;
          }

          &:hover {
            color: $xtxColor;
            cursor: pointer;
          }
        }
      }
    }
  }
}

.goods-tabs {
  min-height: 600px;
  background: #fff;

  nav {
    height: 70px;
    line-height: 70px;
    display: flex;
    border-bottom: 1px solid #f5f5f5;

    a {
      padding: 0 40px;
      font-size: 18px;
      position: relative;

      >span {
        color: $priceColor;
        font-size: 16px;
        margin-left: 10px;
      }
    }
  }
}

.goods-detail {
  padding: 40px;

  .attrs {
    display: flex;
    flex-wrap: wrap;
    margin-bottom: 30px;

    li {
      display: flex;
      margin-bottom: 10px;
      width: 50%;

      .dt {
        width: 100px;
        color: #999;
      }

      .dd {
        flex: 1;
        color: #666;
      }
    }
  }

  >img {
    width: 100%;
  }
}

.btn {
  margin-top: 20px;

}

.bread-container {
  padding: 25px 0;
}
</style>