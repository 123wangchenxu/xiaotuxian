<script setup>
import { ElMessage } from 'element-plus'
import 'element-plus/theme-chalk/el-message.css'
import { useUserStore } from '@/stores/user';
import { merge,getcar } from '@/apis/textapi';
const user_store=useUserStore()
defineOptions(
    {
        name:'LoginIndex'
    }
)
import { onMounted, ref } from 'vue';
import { login } from '@/apis/textapi';
import { useRouter } from 'vue-router';
import { useCartStore } from '@/stores/Cart';
const ruleForm=ref(null)
const ruleform=ref({
    account:'',
    password:'',
    agree:false
})
const router=useRouter()
const doLogin=async()=>{
    ruleForm.value.validate(async(valid)=>{
        if(valid)
        {
            user_store.getaccount(ruleform.value.account)
            user_store.getpassword(ruleform.value.password)
            console.log(user_store.account)
            const getdata=await login(user_store.account,user_store.password)
            ElMessage({type:'success',message:'登录成功'})
            user_store.gettoken(getdata.data.result.token)
            const cart_store=useCartStore()
            var skuarray=[]
            for(var i=0;i<cart_store.goods.length;i++)
            {
              skuarray.push({
                skuId:cart_store.goods[i].skuId,
                selected:cart_store.goods[i].select,
                count:cart_store.goods[i].count
              })
            }
            await merge(skuarray)
            const getdatas=await getcar()
            console.log(getdatas.data.result)
            cart_store.goods=getdatas.data.result
            console.log(cart_store)
            router.replace({path:'/home'})
        }
    })
}
onMounted(()=>{
    console.log(ruleForm.value.validateField)
})
var accountPass = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入账户'));
        } else {
          var uPattern = /^[a-zA-Z0-9_-]{4,16}$/
          if (false) {
            callback(new Error('用户名不符合格式，请重新输入'));
          }
          else
            callback();
        }
      };
var passwordPass = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入密码'));
        } else {
          var uPattern =/^.*(?=.{6,})(?=.*\d)(?=.*[A-Z])(?=.*[a-z])(?=.*[!@#$%^&*? ]).*$/;
          if (false) {
            callback(new Error('密码不符合格式，请重新输入'));
          }
          else
            callback();
        }
      };
var agreePass = (rule, value, callback) => {
        console.log(value)
        if (value === false) {
          callback(new Error('请同意'));
        }else
            callback();
      };
const rules=ref({
          account: [
            {validator:accountPass,trigger: 'blur' }
          ],
          password: [
            {validator:passwordPass,trigger: 'blur' }
          ],
          agree:
          [
            {required:true, trigger: 'blur' },
            {validator:agreePass, trigger:'change'}
          ],

})
</script>


<template>
  <div>
    <header class="login-header">
      <div class="container m-top-20">
        <h1 class="logo">
          <RouterLink to="/">小兔鲜</RouterLink>
        </h1>
        <RouterLink class="entry" to="/">
          进入网站首页
          <i class="iconfont icon-angle-right"></i>
          <i class="iconfont icon-angle-right"></i>
        </RouterLink>
      </div>
    </header>
    <section class="login-section">
      <div class="wrapper">
        <nav>
          <a href="javascript:;">账户登录</a>
        </nav>
        <div class="account-box">
          <div class="form">
            <el-form label-position="right" label-width="60px"
              status-icon :rules="rules" :model="ruleform" ref="ruleForm">
              <el-form-item  label="账户" prop="account">
                <el-input v-model="ruleform.account"/>
              </el-form-item>
              <el-form-item label="密码" prop="password">
                <el-input v-model="ruleform.password"/>
              </el-form-item>
              <el-form-item label-width="22px" prop="agree">
                <el-checkbox v-model="ruleform.agree"  size="large">
                  我已同意隐私条款和服务条款
                </el-checkbox>
              </el-form-item>
              <el-button size="large" @click="doLogin" class="subBtn">点击登录</el-button>
            </el-form>
          </div>
        </div>
      </div>
    </section>

    <footer class="login-footer">
      <div class="container">
        <p>
          <a href="javascript:;">关于我们</a>
          <a href="javascript:;">帮助中心</a>
          <a href="javascript:;">售后服务</a>
          <a href="javascript:;">配送与验收</a>
          <a href="javascript:;">商务合作</a>
          <a href="javascript:;">搜索推荐</a>
          <a href="javascript:;">友情链接</a>
        </p>
        <p>CopyRight &copy; 小兔鲜儿</p>
      </div>
    </footer>
  </div>
</template>

<style scoped lang='scss'>
.login-header {
  background: #fff;
  border-bottom: 1px solid #e4e4e4;

  .container {
    display: flex;
    align-items: flex-end;
    justify-content: space-between;
  }

  .logo {
    width: 200px;

    a {
      display: block;
      height: 132px;
      width: 100%;
      text-indent: -9999px;
      background: url("@/assets/images/logo.png") no-repeat center 18px / contain;
    }
  }

  .sub {
    flex: 1;
    font-size: 24px;
    font-weight: normal;
    margin-bottom: 38px;
    margin-left: 20px;
    color: #666;
  }

  .entry {
    width: 120px;
    margin-bottom: 38px;
    font-size: 16px;

    i {
      font-size: 14px;
      color: $xtxColor;
      letter-spacing: -5px;
    }
  }
}

.login-section {
  background: url('@/assets/images/login-bg.png') no-repeat center / cover;
  height: 488px;
  position: relative;

  .wrapper {
    width: 380px;
    background: #fff;
    position: absolute;
    left: 50%;
    top: 54px;
    transform: translate3d(100px, 0, 0);
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.15);

    nav {
      font-size: 14px;
      height: 55px;
      margin-bottom: 20px;
      border-bottom: 1px solid #f5f5f5;
      display: flex;
      padding: 0 40px;
      text-align: right;
      align-items: center;

      a {
        flex: 1;
        line-height: 1;
        display: inline-block;
        font-size: 18px;
        position: relative;
        text-align: center;
      }
    }
  }
}

.login-footer {
  padding: 30px 0 50px;
  background: #fff;

  p {
    text-align: center;
    color: #999;
    padding-top: 20px;

    a {
      line-height: 1;
      padding: 0 10px;
      color: #999;
      display: inline-block;

      ~a {
        border-left: 1px solid #ccc;
      }
    }
  }
}

.account-box {
  .toggle {
    padding: 15px 40px;
    text-align: right;

    a {
      color: $xtxColor;

      i {
        font-size: 14px;
      }
    }
  }

  .form {
    padding: 0 20px 20px 20px;

    &-item {
      margin-bottom: 28px;

      .input {
        position: relative;
        height: 36px;

        >i {
          width: 34px;
          height: 34px;
          background: #cfcdcd;
          color: #fff;
          position: absolute;
          left: 1px;
          top: 1px;
          text-align: center;
          line-height: 34px;
          font-size: 18px;
        }

        input {
          padding-left: 44px;
          border: 1px solid #cfcdcd;
          height: 36px;
          line-height: 36px;
          width: 100%;

          &.error {
            border-color: $priceColor;
          }

          &.active,
          &:focus {
            border-color: $xtxColor;
          }
        }

        .code {
          position: absolute;
          right: 1px;
          top: 1px;
          text-align: center;
          line-height: 34px;
          font-size: 14px;
          background: #f5f5f5;
          color: #666;
          width: 90px;
          height: 34px;
          cursor: pointer;
        }
      }

      >.error {
        position: absolute;
        font-size: 12px;
        line-height: 28px;
        color: $priceColor;

        i {
          font-size: 14px;
          margin-right: 2px;
        }
      }
    }

    .agree {
      a {
        color: #069;
      }
    }

    .btn {
      display: block;
      width: 100%;
      height: 40px;
      color: #fff;
      text-align: center;
      line-height: 40px;
      background: $xtxColor;

      &.disabled {
        background: #cfcdcd;
      }
    }
  }

  .action {
    padding: 20px 40px;
    display: flex;
    justify-content: space-between;
    align-items: center;

    .url {
      a {
        color: #999;
        margin-left: 10px;
      }
    }
  }
}

.subBtn {
  background: $xtxColor;
  width: 100%;
  color: #fff;
}
</style>