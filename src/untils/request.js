import axios from 'axios'

// 开发环境和生产环境的切换
if (process.env.NODE_ENV === 'development') {
  axios.defaults.baseURL = 'http://localhost:8081'
} else if (process.env.NODE_ENV === 'production') {
  axios.defaults.baseURL = 'http://prod.xxx.com'
}

// get请求
const httpGet = (url, params = {}) => {
  return new Promise((resolve, reject) => {
    axios
      .get(url, { params })
      .then((res) => {
        resolve(res.data)
      })
      .catch((err) => {
        reject(err.message)
      })
  })
}

// post请求
const httpPost = (url, params) => {
  return new Promise((resolve, reject) => {
    axios.post(url, params)
      .then((res) => {
        resolve(res.data)
      })
      .catch(err => {
        reject(err.message)
      })
  })
}

export { httpGet, httpPost }
