<script setup>
import CmHeader from '@/components/CmHeader/index.vue'

const onClick = () => {
  console.log(1)
}
</script>
<template>
  <cm-header :leftText="'北投阿桑，今天想聽什麼'" :onClick="false">
    <template #right>
      <van-icon class="px-4" name="search" size="24" @click="onClick" />
      <van-button class="w-14" round type="primary" size="small">
        登出
      </van-button>
    </template>
  </cm-header>
  <div class="container">
    <div class="text-3xl">探索</div>
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

    <div class="text-9xl">首頁</div>
    <div class="text-9xl">首頁</div>
    <div class="text-9xl">首頁</div>
    <div class="text-9xl">首頁</div>
  </div>
</template>
<style lang="scss" scoped>
.dragList::-webkit-scrollbar {
  display: none;
}
.drapContainer {
  width: 300%;
}
</style>
