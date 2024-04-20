<script setup>
import CmLayout from '@/components/CmLayout/index.vue'
import { removeToken } from '@/utils/localStorage'

const search = () => {
  console.log(1)
}
const logout = () => {
  removeToken()
}
// TODO: token放store => 在登出的時候，會進到登入頁面
</script>
<template>
  <cm-layout :leftText="'北投阿桑，今天想聽什麼'" :clickable="false">
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
        <van-grid :column-num="8">
          <van-grid-item>
            <van-image
              width="8rem"
              height="6rem"
              fit="cover"
              position="center"
              radius="6"
              src="https://fastly.jsdelivr.net/npm/@vant/assets/apple-1.jpeg"
            />
            <p class="=text-xs leading-8">社畜掙扎歌單</p>
          </van-grid-item>
          <van-grid-item>
            <van-image
              width="8rem"
              height="6rem"
              fit="cover"
              position="center"
              radius="6"
              src="https://fastly.jsdelivr.net/npm/@vant/assets/apple-1.jpeg"
            />
            <p class="=text-xs leading-8">社畜掙扎歌單</p>
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
  width: 300%;
}
</style>
