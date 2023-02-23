//axios 二次封装
import axios from 'axios'
//创建axios实例
const request = axios.create({
    baseURL: 'http://localhost:9999/api/', //api地址
    timeout: 5000, //请求超时时间
    headers: {
        "Content-Type": "application/x-www-form-urlencoded"
    },
})

//请求拦截器
request.interceptors.request.use(config => {
    //在发送请求之前做某事
    return config
} , error => {
    //请求错误时调用reject抛出问题
    return Promise.reject(error)
    }
)

//响应拦截器
request.interceptors.response.use(response => {
    //对响应数据做某事
    return response
 } , error => {
    //请求错误时调用reject抛出问题
    return Promise.reject(error)
    }
)

//导出axios实例
export default request



