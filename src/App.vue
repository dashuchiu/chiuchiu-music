<script setup>
import { musicApi } from '@/api/module/music'

const getMusic = async () => {
  const data = await musicApi.recommendResource()
  console.log(data)
}
getMusic()
</script>
<template>
  <van-watermark content="mobile" z-index="-99" text-color="#f5f5f5" />
  <div class="shadow-lg mx-auto max-w-screen-md h-full bg-stone-800">
    <router-view></router-view>
  </div>
</template>
<style lang="scss" scoped>
* {
  color: white;
  scroll-behavior: smooth;
}
</style>
