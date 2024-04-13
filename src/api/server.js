import axios from 'axios'

// 创建axios实例并添加类型注解
const instance = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  timeout: 10000
})

// 请求拦截器
instance.interceptors.request.use(
  (config) => {
    // 确保headers存在，并且是AxiosRequestHeaders或其兼容类型
    config.headers = config.headers ?? {}

    if (config.params === undefined) {
      config.params = {}
    }
    // 添加或修改params
    Object.assign(config.params, {
      timestamp: Date.now(),
      realIP: '116.25.146.177'
    })
    return config
  },
  (error) => Promise.reject(error)
)

// 响应拦截器
instance.interceptors.response.use(
  (response) => {
    return response.data
  },
  (error) => {
    return Promise.reject(error)
  }
)

// 封装get方法
export const httpGet = (url, params) => {
  return instance.get(url, { params })
}

// 封装post方法
export const httpPost = (url, data) => {
  return instance.post(url, data)
}
