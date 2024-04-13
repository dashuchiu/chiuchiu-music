<script setup>
import { ref } from 'vue'
const isPlay = ref(true)
</script>
<template>
  <div class="flex flex-col items-center">
    <van-image
      class="mb-8"
      width="20rem"
      height="20rem"
      radius="6"
      fit="cover"
      position="center"
      src="https://fastly.jsdelivr.net/npm/@vant/assets/cat.jpeg"
    />
    <div class="title">貓貓奏鳴曲</div>
    <div class="artist text-sm text-stone-500">賓士貓</div>
    <div class="progressList flex justify-between items-center">
      <div>0:22</div>
      <van-progress class="w-96 my-8 mx-4" :percentage="50" color="#f97316" />
      <div>3:23</div>
    </div>
    <div class="controller flex justify-between items-center">
      <div><van-icon name="arrow-left" size="40" /></div>
      <div>
        <van-icon v-if="isPlay" class="mx-8" name="play-circle" size="80" />
        <van-icon v-else name="pause-circle" size="80" />
      </div>
      <div><van-icon name="arrow" size="40" /></div>
    </div>
  </div>
</template>
