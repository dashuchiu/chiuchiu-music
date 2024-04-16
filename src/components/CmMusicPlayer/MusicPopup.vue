<script setup>
import { ref } from 'vue'
const value = ref(50)
const isPlay = ref(true)
const onPlay = () => {
  isPlay.value = !isPlay.value
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
    <div class="controller flex justify-between items-center">
      <van-icon name="replay" size="20" />
      <span class="iconArrow material-symbols-outlined"> skip_previous </span>

      <van-icon @click="onPlay" v-if="isPlay" name="play-circle" size="72" />
      <van-icon @click="onPlay" v-else name="pause-circle" size="72" />

      <span class="iconArrow material-symbols-outlined"> skip_next </span>
      <span class="material-symbols-outlined"> lyrics </span>
    </div>
    <!-- 歌詞 -->
    <div
      class="w-full mt-4 -mb-10 px-4 pt-2 grow rounded-md bg-stone-600 relative overflow-hidden"
      relative
    >
      <div class="absolute tracking-wide">
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
