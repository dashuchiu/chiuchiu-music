import { defineStore } from 'pinia'
import { ref } from 'vue'
import { auth } from '@/api/firebase.js'
import { onAuthStateChanged } from 'firebase/auth'
//用戶模塊 token setToken removeToken
export const useUserStore = defineStore(
  'user',
  () => {
    const token = ref('')
    const setToken = (newToken) => {
      token.value = newToken
    }
    const removeToken = () => {
      token.value = ''
    }

    const userInfo = ref({})
    const getUser = async () => {
      await onAuthStateChanged(auth, (user) => {
        if (user) {
          userInfo.value = user
        }
      })
    }

    const setUser = (obj) => {
      userInfo.value = obj
    }
    return {
      token,
      setToken,
      removeToken,
      userInfo,
      getUser,
      setUser
    }
  },
  {
    persist: true
  }
)
