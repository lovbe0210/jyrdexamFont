import axios from 'axios'
axios.defaults.withCredentials = true// 允许跨域携带cookie

// 创建axios实例
const service = axios.create({
  baseURL: process.env.BASE_API, // api 的 base_url
  timeout: 10000 // 请求超时时间
})

export default service
