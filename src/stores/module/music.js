import { defineStore } from 'pinia'
import { ref } from 'vue'
//用戶模塊 token setToken removeToken
export const useMusicStore = defineStore(
  'music',
  () => {
    const count = ref(0)
    const currentIndex = ref(0)
    const isMusicPlayerShow = ref(false)
    const trackList = ref([
      {
        id: '27591651',
        title: 'Intro AE 86',
        singer: '陈光荣',
        album: '頭文字[イニシャル]D THE MOVIE SOUND TUNE',
        cover:
          'http://p4.music.126.net/9KeyafHLjadqSQTRS_tN5Q==/5741649720318487.jpg',
        source: 'http://music.163.com/song/media/outer/url?id=27591651.mp3',
        time: 149000,
        mv: '',
        Lyric: {}
      },
      {
        id: '409872504',
        title: 'Ninelie',
        singer: 'Aimer',
        album: 'ninelie EP',
        cover:
          'http://p3.music.126.net/g7aakYG_Wfmrn1_IDfVUXA==/109951165050166241.jpg',
        source: 'http://music.163.com/song/media/outer/url?id=409872504.mp3',
        time: 260675,
        mv: '',
        Lyric: {}
      }
    ])
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
