<script setup>
import CmLayout from '@/components/CmLayout/index.vue'
import { removeToken } from '@/utils/localStorage'
import { defineExpose, ref } from 'vue'
import { musicApi } from '@/api/module/music'

const search = () => {
  console.log(1)
}

const logout = () => {
  removeToken()
}
defineExpose({ logout })
// TODO: token放store => 在登出的時候，會進到登入頁面
const musicList = ref([])
const getMusic = async () => {
  const data = await musicApi.recommendResource()
  musicList.value = data.recommend
  console.log(musicList)
}
getMusic()
console.log(musicList)
</script>
<template>
  <cm-layout :leftText="'音痴草，今天想聽什麼'" :clickable="false">
    <template #headerRight>
      <van-icon class="px-4" name="search" size="24" @click="search" />
      <van-button
        class="w-14"
        round
        type="primary"
        size="small"
        @click="logout"
      >
        登出
      </van-button>
    </template>
    <h1 class="text-3xl">探索</h1>
    <!-- 渲染8列歌單可拖曳 -->
    <div class="dragList overflow-x-scroll">
      <div class="drapContainer">
        <van-grid :column-num="6">
          <van-grid-item v-for="item in musicList" :key="item.id">
            <div class="h-40 w-28">
              <van-image
                width="8rem"
                height="6rem"
                fit="cover"
                position="center"
                radius="6"
                :src="item.picUrl"
              />
              <p class="text-xs leading-8">{{ item.name }}</p>
            </div>
          </van-grid-item>
        </van-grid>
      </div>
    </div>
  </cm-layout>
</template>
<style lang="scss" scoped>
.dragList::-webkit-scrollbar {
  display: none;
}
.drapContainer {
  width: 250%;
}
</style>
