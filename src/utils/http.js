import axios from 'axios'
import { ElMessage } from 'element-plus'
import { useUserStore } from '@/stores/user'
import router from '@/router'
import 'element-plus/theme-chalk/el-message.css'
const httpInstance=axios.create({
    baseURL:'http://pcapi-xiaotuxian-front-devtest.itheima.net',
    timeout:5000
})
// 添加请求拦截器
httpInstance.interceptors.request.use(function (config) {
    // 在发送请求之前做些什么
    const user_store = useUserStore()
    if(user_store.token!=='')
        config.headers.Authorization=`Bearer ${user_store.token}`
    return config;
}, function (error) {
    // 对请求错误做些什么
    return Promise.reject(error);
});

// 添加响应拦截器
httpInstance.interceptors.response.use(function (response) {
    // 2xx 范围内的状态码都会触发该函数。
    // 对响应数据做点什么
    return response;
}, function (error) {
    // 超出 2xx 范围的状态码都会触发该函数。
    // 对响应错误做点什么
    ElMessage({type:'error',message:error.response.data.message})
    if(error.response.status===401)
    {
      const user_store = useUserStore()
      user_store.deleteall()
      router.replace({path:'/login'})
    }
    return Promise.reject(error);
});
export default httpInstance