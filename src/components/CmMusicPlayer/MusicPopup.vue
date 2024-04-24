<script setup>
import { inject, computed } from 'vue'
import { formatTime } from '@/utils/timeFormats'
const {
  isPlaying,
  play,
  pause,
  currentTrackSong,
  currentTime,
  duration,
  changePlayMode,
  changeCurrentTime,
  nextTrack,
  prevTrack,
  playMode,
  PlayModes
} = inject('musicPlayer')
const isPlay = computed(() => isPlaying.value)
const isRandomMode = computed(() => playMode.value === PlayModes.RANDOM)
const isLoopMode = computed(() => playMode.value === PlayModes.LOOP)
</script>
<template>
  <div class="flex flex-col h-full items-center">
    <van-image
      class="mb-8 mx-4 max-w-md"
      radius="6"
      fit="cover"
      position="center"
      :src="currentTrackSong?.cover"
    />

    <div class="title">{{ currentTrackSong?.title }}</div>
    <div class="artist text-sm text-stone-500">
      {{ currentTrackSong?.singer }}
    </div>
    <!-- 進度條 -->
    <div class="progressList w-full flex justify-between items-center">
      <div>{{ formatTime(currentTime) }}</div>
      <van-slider
        class="mx-4 my-8"
        :max="duration"
        v-model="currentTime"
        active-color="#f97316"
        button-size="16px"
        @change="changeCurrentTime"
      />
      <div>{{ formatTime(duration) }}</div>
    </div>
    <!-- 控制器 -->
    <!-- 隨機播放開關 -->
    <div class="controller flex justify-between items-center">
      <span
        @click="changePlayMode(PlayModes.RANDOM)"
        v-show="!isRandomMode"
        class="material-symbols-outlined"
      >
        shuffle
      </span>
      <span
        @click="changePlayMode(PlayModes.SEQUENCE)"
        v-show="isRandomMode"
        class="material-symbols-outlined text-orange-400"
      >
        shuffle
      </span>
      <!-- 前一首 -->
      <span @click="prevTrack" class="iconArrow material-symbols-outlined">
        skip_previous
      </span>
      <!-- 播放/暫停 -->
      <van-icon @click="play" v-show="!isPlay" name="play-circle" size="72" />
      <van-icon @click="pause" v-show="isPlay" name="pause-circle" size="72" />
      <!-- 下一首 -->
      <span @click="nextTrack" class="iconArrow material-symbols-outlined">
        skip_next
      </span>
      <!-- 全部循環/單曲循環開關 -->
      <div @click="changeIcon">
        <span
          class="material-symbols-outlined"
          @click="changePlayMode(PlayModes.LOOP)"
          v-show="!isLoopMode"
        >
          repeat
        </span>
        <span
          @click="changePlayMode(PlayModes.SEQUENCE)"
          class="material-symbols-outlined text-orange-400"
          v-show="isLoopMode"
        >
          repeat_one
        </span>
      </div>
    </div>
    <!-- 歌詞 -->
    <div
      class="w-full mt-4 -mb-10 px-4 pt-2 grow rounded-md bg-stone-600 relative overflow-hidden"
      relative
    >
      <div class="absolute tracking-wide text-stone-800">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatem
        ratione aliquam magni aperiam ad! Recusandae quasi aliquid itaque
        voluptatibus impedit quisquam perferendis exercitationem magni magnam
        eius omnis, ab, non consectetur.
      </div>
    </div>
  </div>
</template>
<style lang="scss" scoped>
.iconControll {
  font-weight: 900;
}
.controller > * {
  margin: 0 10px;
}
.before\:rounded-full::before {
  content: '';
  border-radius: 50%;
}

.iconArrow {
  font-size: 40px;
  font-variation-settings:
    'FILL' 1,
    'wght' 400,
    'GRAD' 0,
    'opsz' 24;
}
</style>
