import { httpPost } from '../server'
import axios from 'axios'

export const userApi = {
  login: async () => {
    const data = await axios.post('https://dummyjson.com/auth/login', {
      username: 'emilys',
      password: 'emilyspass'
    })
    console.log(data)
    return data.data
  },
  sentVerifyCode: (phone) => {
    const data = httpPost('/captcha/sent', { phone })
    return data
  }
}
