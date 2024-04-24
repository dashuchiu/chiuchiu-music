import { defineStore } from 'pinia'
import { ref } from 'vue'
//用戶模塊 token setToken removeToken
export const useMusicStore = defineStore(
  'music',
  () => {
    const count = ref(0)
    const currentIndex = ref(0)
    const trackList = ref([
      {
        id: '27591651',
        title: 'Intro AE 86',
        singer: '陳光榮',
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
    return {
      count,
      currentIndex,
      trackList,
      setCurrentIndex
    }
  },
  {
    persist: true
  }
)
