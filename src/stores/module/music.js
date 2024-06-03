import { defineStore } from 'pinia'
import { ref } from 'vue'
//用戶模塊 token setToken removeToken
export const useMusicStore = defineStore(
  'music',
  () => {
    const count = ref(0)
    const currentIndex = ref(0)
    const isMusicPlayerShow = ref(false)
    const trackList = ref([])
    const setCurrentIndex = (index) => {
      currentIndex.value = index
    }
    const addTrackAndPlay = (param) => {
      if (Array.isArray(param)) {
        trackList.value = [...trackList.value, ...param]
      } else {
        trackList.value.push(param)
      }
    }
    const setIsMusicPlayerShow = (bool) => {
      isMusicPlayerShow.value = bool
    }
    return {
      isMusicPlayerShow,
      count,
      currentIndex,
      trackList,
      setIsMusicPlayerShow,
      addTrackAndPlay,
      setCurrentIndex
    }
  },
  {
    persist: true
  }
)
