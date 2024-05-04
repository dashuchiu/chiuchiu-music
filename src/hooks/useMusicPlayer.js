import { ref, computed, onUnmounted, reactive, onMounted, toRefs } from 'vue'
import { useMusicStore } from '@/stores'
import { showToast } from 'vant'
import { musicApi } from '@/api/module/music'

export const useMusicPlayer = () => {
  // MusicStore
  const MusicStore = useMusicStore()
  // MusicList
  const state = reactive({ artistsList: {} })
  const { artistsList } = toRefs(state)
  onMounted(() => {
    musicApi.artistList({ limit: 30, offset: 1, initial: 'l' }).then((res) => {
      state.artistsList = res.artists
    })
    // musicApi.playlistCatList().then((res) => {
    //   state.catList = res
    // })
  })
  // 歌曲清單
  const trackList = MusicStore.trackList
  // 是否正在播放
  const isPlaying = ref(false)
  // 当前播放时间
  const currentTime = ref(0)
  // 歌曲总时长
  const duration = ref(0)
  // 当前播放曲目的索引
  const currentTrackIndex = computed(() => MusicStore.currentIndex)
  // 当前歌曲信息
  const currentTrackSong = computed(() => trackList[currentTrackIndex.value])
  // 播放模式
  const PlayModes = {
    SEQUENCE: '順序播放',
    LOOP: '單曲循環',
    RANDOM: '隨機播放'
  }
  const playMode = ref(PlayModes.SEQUENCE)
  // 隨機播放的歌曲索引
  const getRandomIndex = (length, currentIndex) => {
    let randomIndex = Math.floor(Math.random() * length)
    // 确保随机索引不等于当前索引，防止重复播放同一首歌
    while (randomIndex === currentIndex) {
      randomIndex = Math.floor(Math.random() * length)
    }
    return randomIndex
  }
  // 更新当前播放时间的方法
  const updateCurrentTime = () => {
    currentTime.value = audio.currentTime
  }

  // 创建一个新的audio元素
  const audio = new Audio()
  const loadTrack = (index) => {
    audio.src = trackList[index]?.source
    audio.load()
    currentTime.value = 0
    duration.value = 0

    // 当音轨的元数据加载完成时，更新歌曲的总时长
    audio.addEventListener('loadedmetadata', () => {
      duration.value = audio.duration
    })
    // 加载歌词
    // getLyric(trackList[index]?.id);
  }
  // 播放音乐
  const play = () => {
    if (audio.src !== trackList[currentTrackIndex.value].source) {
      loadTrack(currentTrackIndex.value)
    }
    audio.play()
    isPlaying.value = true
  }
  // 暂停音乐
  const pause = () => {
    audio.pause()
    isPlaying.value = false
  }
  // 播放下一首
  const nextTrack = () => {
    switch (playMode.value) {
      case PlayModes.SEQUENCE:
        MusicStore.setCurrentIndex(
          (currentTrackIndex.value + 1) % trackList.length
        )
        break
      case PlayModes.LOOP:
        // 单曲循环时不改变当前播放索引
        break
      case PlayModes.RANDOM:
        MusicStore.setCurrentIndex(
          getRandomIndex(trackList.length, currentTrackIndex.value)
        )
        break
    }
    play()
  }
  // 播放上一首
  const prevTrack = () => {
    switch (playMode.value) {
      case PlayModes.SEQUENCE:
        MusicStore.setCurrentIndex(
          (currentTrackIndex.value + trackList.length - 1) % trackList.length
        )
        break
      case PlayModes.LOOP:
        // 单曲循环时不改变当前播放索引
        break
      case PlayModes.RANDOM:
        MusicStore.setCurrentIndex(
          getRandomIndex(trackList.length, currentTrackIndex.value)
        )
        break
    }
    play()
  }
  // 改变当前歌曲时间
  const changeCurrentTime = () => {
    audio.currentTime = currentTime.value
  }
  // 当一曲播放结束后，自动播放下一曲
  audio.addEventListener('ended', () => {
    if (playMode.value === PlayModes.LOOP) {
      // 如果是单曲循环, 重新播放当前歌曲
      play()
    } else {
      // 如果不是单曲循环, 播放下一曲
      nextTrack()
    }
  })
  const addTrackAndPlay = () => {
    // 更新当前音轨索引为最新添加的音轨
    MusicStore.setCurrentIndex(MusicStore.trackList.length - 1)
    play()
  }
  // 修改当前的播放模式
  const changePlayMode = (mode) => {
    // 循环切换播放模式
    playMode.value = mode
    // 公告播放模式
    showToast(mode)
  }
  // 初始化时加载当前索引的音轨
  loadTrack(currentTrackIndex.value)
  // 设置定期更新currentTime的定时器
  const intervalId = setInterval(updateCurrentTime, 500)
  // 组件卸载时清除定时器，防止内存泄露
  onUnmounted(() => {
    // 移除错误监听器
    clearInterval(intervalId)
  })
  return {
    artistsList,
    isPlaying, // 当前是否在播放
    currentTrackIndex, // 当前播放的曲目索引
    currentTime, // 当前播放时间
    duration, // 音乐总时长
    play, // 控制播放的函数
    pause, // 控制暂停的函数
    nextTrack, // 播放下一首的函数
    prevTrack, // 播放上一首的函数
    changeCurrentTime, //seek
    currentTrackSong, //当前歌曲信息
    // LyricList, //歌词
    // currentLyricIndex, // 当前高亮歌词的索引
    // lyricTranslateY, // 用于居中显示当前歌词的 translateY 值
    addTrackAndPlay, // 添加并播放新的音轨
    changePlayMode, //修改当前的播放模式
    playMode, //修改当前的播放状态
    PlayModes
  }
}
