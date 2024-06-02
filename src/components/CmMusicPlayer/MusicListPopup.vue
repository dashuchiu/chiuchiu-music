<script setup>
import { inject } from 'vue'
const { currentTrackSong } = inject('musicPlayer')
</script>
<template>
  <div class="flex justify-between items-center">
    <div class="flex">
      <van-image
        class="mx-2"
        width="4rem"
        height="4rem"
        radius="6"
        fit="cover"
        position="center"
        :src="currentTrackSong?.cover"
      />
      <div class="songInfo flex flex-col">
        <div class="flex items-center">
          <div class="title">{{ currentTrackSong?.title }}</div>
          <span class="p-1 ml-2 border-stone-500 border-2 rounded-md">
            <p class="text-xs text-stone-500">播放中</p>
          </span>
        </div>

        <div class="artist text-sm text-stone-500">
          {{ currentTrackSong?.singer }}
        </div>
      </div>
    </div>
    <van-icon name="like-o" />
  </div>
</template>
