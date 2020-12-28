import axios from 'axios'
import router from '@/router'

axios.defaults.withCredentials = true//允许axios携带cookie
const request=function request(config) {
    const firstaxios=axios.create({
        baseURL:'http://localhost:8888/',
        timeout:1000*30,
      /*  headers: {
          'Content-Type': 'application/json; charset=utf-8'
        }*/
    })
    //请求拦截(这里有两个参数，第一个参数是成功时执行的代码。第二个是发送请求失败时执行的代码)
    firstaxios.interceptors.request.use(req => {

            if (localStorage.getItem('token')) {
                req.headers.token = localStorage.getItem('token');
            }
            return req;
    },err => {
        //这里是失败时执行
            return Promise.reject(err);
    })

    //响应拦截
    firstaxios.interceptors.response.use(res => {
        //响应成功时执行的代码
        if(res.data.code === 401){
            localStorage.removeItem('token');
            router.replace('/login');
        }
        // console.log("响应成功",res)

        return res
    }, err => {
        //响应失败时执行的代码
        console.log(err);
    })
    return firstaxios(config)
}
//封装的get请求方法
const get=function get(config){
    config.method="get"
    return request(config)
}
//封装的post请求方法
const post=function get(config){
    config.method="post"
    return request(config)
}
export default {get,post,request}
