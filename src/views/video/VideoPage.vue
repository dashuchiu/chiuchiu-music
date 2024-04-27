<script setup>
import CmLayout from '@/components/CmLayout/index.vue'
</script>
<template>
  <cm-layout :is-search="true">
    <div class="mv-container">
      <video
        src="http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4"
        controls
        autoplay
        muted
        class="rounded-md"
      ></video>
    </div>
    <p class="my-2">The first Blender Open Movie from 2006</p>
  </cm-layout>
</template>
<style lang="scss" scoped>
.my-swipe .van-swipe-item {
  color: #fff;
  font-size: 20px;
  line-height: 150px;
  text-align: center;
  background-color: #39a9ed;
}
</style>
