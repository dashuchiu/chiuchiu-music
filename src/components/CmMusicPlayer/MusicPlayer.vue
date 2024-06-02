<script setup>
import MusicPopup from './MusicPopup.vue'
import { computed, ref, inject } from 'vue'
import { useMusicStore } from '@/stores'
const musicStore = useMusicStore()
const {
  changeCurrentTime,
  duration,
  currentTime,
  isPlaying,
  play,
  pause,
  currentTrackSong
} = inject('musicPlayer')

const isPlay = computed(() => isPlaying.value)
const showPopup = ref(false)
const setShowPopup = (bool) => {
  showPopup.value = bool
}
defineProps({
  isShow: {
    type: Boolean,
    default: false
  }
})
//關閉播放器
const isMusicPlayerShow = () => {
  musicStore.setIsMusicPlayerShow(false)
  pause()
}
//打開播放列表
const showListPopup = ref(false)
const setShowListPopup = (bool) => {
  showListPopup.value = bool
}
</script>

<template>
  <div class="relative" v-show="isShow">
    <div class="fixed bottom-12 bg-slate-200">
      <!-- 進度條 -->
      <van-slider
        v-model="currentTime"
        :max="duration"
        active-color="#f97316"
        button-size="0px"
        :readonly="true"
        @change="changeCurrentTime"
      />
      <!-- 音樂資訊 -->
      <div class="h-16">
        <div class="flex h-full justify-between items-center">
          <div class="flex">
            <van-icon
              @click.stop="isMusicPlayerShow(false)"
              class="self-center text-stone-500"
              name="close"
              size="18"
            />
            <van-image
              @click="setShowPopup(true)"
              class="mx-2"
              width="3rem"
              height="3rem"
              radius="6"
              fit="cover"
              position="center"
              :src="currentTrackSong?.cover"
            />
            <div class="songInfo flex flex-col text-xs">
              <div class="title">{{ currentTrackSong?.title }}</div>
              <div class="artist text-stone-500">
                {{ currentTrackSong?.singer }}
              </div>
            </div>
          </div>
          <!-- 播放列表/播放/暫停 -->
          <div class="flex">
            <van-icon
              @click.stop="setShowListPopup(true)"
              name="bars"
              size="32"
            />
            <van-popup
              v-model:show="showListPopup"
              position="bottom"
              round
              closeable
              close-icon="close"
              class="p-6 py-14"
            >
              <MusicListPopup />
            </van-popup>
            <van-icon
              @click.stop="play"
              v-show="!isPlay"
              class="mx-2"
              name="play-circle-o"
              size="32"
            /><van-icon
              @click.stop="pause"
              v-show="isPlay"
              class="mx-2"
              name="pause-circle-o"
              size="32"
            />
          </div>
        </div>
      </div>
    </div>
    <van-popup
      v-model:show="showPopup"
      position="bottom"
      round
      closeable
      close-icon="close"
      :style="{ padding: '64px' }"
    >
      <MusicPopup />
    </van-popup>
  </div>
</template>
<style lang="scss" scoped>
.fixed,
.van-overlay,
.van-popup--bottom {
  left: calc((100% - 768px) / 2);
  right: calc((100% - 768px) / 2);
  width: auto;
}
@media (max-width: 768px) {
  .fixed,
  .van-overlay,
  .van-popup--bottom {
    left: 0;
    right: 0;
  }
}
.van-popup {
  height: 90%;
}
</style>
