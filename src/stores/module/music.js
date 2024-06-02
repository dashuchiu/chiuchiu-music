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
        id: 108251,
        title: '当你',
        singer: '林俊杰',
        album: '她说 概念自选辑',
        cover:
          'https://p2.music.126.net/EtbYjpw06KOdTxisgUs4-w==/109951168852557941.jpg',
        source:
          'http://m802.music.126.net/20240602193221/40c11a636020dc735a5c6a4af8630e9e/jd-musicrep-ts/50cc/ce39/98de/b512966310817e6c0a1f09a6d245d3be.mp3',
        time: 251293,
        mv: 0,
        Lyric: {}
      },
      {
        id: 108134,
        title: '学不会',
        singer: '林俊杰',
        album: '学不会',
        cover:
          'https://p2.music.126.net/Z5lg-iA7pGbquJvMoY8tbg==/109951168271379420.jpg',
        source:
          'http://m702.music.126.net/20240602163015/f63c037c9a301a3fbfb8799da50ee049/jd-musicrep-ts/c68b/88ee/897e/10925f6e65bfa7791dca3485e7c9ce6a.',
        time: 229500,
        mv: 300033,
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
