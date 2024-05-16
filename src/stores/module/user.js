import { defineStore } from 'pinia'
import { ref } from 'vue'
//用戶模塊 token setToken removeToken
export const useUserStore = defineStore(
  'user',
  () => {
    const darkTheme = ref(false)
    const token = ref('')
    const setToken = (newToken) => {
      token.value = newToken
    }
    const removeToken = () => {
      token.value = ''
    }
    const setDarkTheme = (bool) => {
      darkTheme.value = bool
    }
    const userInfo = ref({})

    const setUser = (obj) => {
      userInfo.value = obj
    }
    return {
      darkTheme,
      token,
      setToken,
      removeToken,
      setDarkTheme,
      userInfo,
      setUser
    }
  },
  {
    persist: true
  }
)
