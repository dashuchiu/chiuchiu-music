<script setup>
import { ref } from 'vue'
const value = ref(50)
const isPlay = ref(true)
const isShuffle = ref(true)
const handleShuffle = () => {
  isShuffle.value = !isShuffle.value
}
const handlePlay = () => {
  isPlay.value = !isPlay.value
}
const currentIndex = ref(0)

const changeIcon = () => {
  currentIndex.value = (currentIndex.value + 1) % 3
}
</script>
<template>
  <div class="flex flex-col h-full items-center">
    <van-image
      class="mb-8 mx-4 max-w-md"
      radius="6"
      fit="cover"
      position="center"
      src="https://fastly.jsdelivr.net/npm/@vant/assets/cat.jpeg"
    />

    <div class="title">貓貓奏鳴曲</div>
    <div class="artist text-sm text-stone-500">賓士貓</div>
    <!-- 進度條 -->
    <div class="progressList w-full flex justify-between items-center">
      <div>0:22</div>
      <van-slider
        class="mx-4 my-8"
        v-model="value"
        active-color="#f97316"
        button-size="16px"
      />

      <div>3:23</div>
    </div>
    <!-- 控制器 -->
    <!-- 隨機播放開關 -->
    <div class="controller flex justify-between items-center">
      <span
        @click="handleShuffle"
        v-show="isShuffle"
        class="material-symbols-outlined"
      >
        shuffle
      </span>
      <span
        @click="handleShuffle"
        v-show="!isShuffle"
        class="material-symbols-outlined text-orange-400"
      >
        shuffle
      </span>
      <!-- 前一首 -->
      <span class="iconArrow material-symbols-outlined"> skip_previous </span>
      <!-- 播放/暫停 -->
      <van-icon
        @click="handlePlay"
        v-show="isPlay"
        name="play-circle"
        size="72"
      />
      <van-icon
        @click="handlePlay"
        v-show="!isPlay"
        name="pause-circle"
        size="72"
      />
      <!-- 下一首 -->
      <span class="iconArrow material-symbols-outlined"> skip_next </span>
      <!-- 全部循環/單曲循環開關 -->
      <div @click="changeIcon">
        <span class="material-symbols-outlined" v-show="currentIndex === 0">
          repeat
        </span>
        <span
          class="material-symbols-outlined text-orange-400"
          v-show="currentIndex === 1"
        >
          repeat
        </span>
        <span
          class="material-symbols-outlined text-orange-400"
          v-show="currentIndex === 2"
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
