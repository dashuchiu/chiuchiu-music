<script setup>
import CmLayout from '@/components/CmLayout/index.vue'
import { removeToken } from '@/utils/localStorage'
import { defineExpose, ref } from 'vue'
import { musicApi } from '@/api/module/music'
import { useRouter } from 'vue-router'
const router = useRouter()

const logout = () => {
  removeToken()
}
defineExpose({ logout })
// TODO: token放store => 在登出的時候，會進到登入頁面
//推薦歌單api
const recommendMusicList = ref([])
const getRecommendMusicList = async () => {
  const data = await musicApi.recommendResource()
  recommendMusicList.value = data.recommend
  // console.log(data)
}
getRecommendMusicList()

//banner輪播圖api
const bannerImg = ref([])
const getBanner = async () => {
  const data = await musicApi.banner(2)
  bannerImg.value = data.banners
}
getBanner()
</script>
<template>
  <cm-layout :leftText="'音痴草，今天想聽什麼'" :clickable="false">
    <template #headerRight>
      <van-icon
        class="px-4"
        name="search"
        size="24"
        @click="router.push('/search')"
      />
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
    <!-- 輪播圖 -->
    <van-swipe :autoplay="3000" lazy-render>
      <van-swipe-item v-for="item in bannerImg" :key="item.id">
        <img :src="item.pic" />
      </van-swipe-item>
    </van-swipe>
    <h1 class="mt-6 text-3xl">推薦</h1>
    <!-- 渲染8列歌單可拖曳 -->
    <div class="dragList overflow-x-scroll">
      <div class="drapContainer">
        <van-grid :column-num="6">
          <van-grid-item
            @click="router.push(`/main/recommendlist/${item.id}`)"
            v-for="item in recommendMusicList"
            :key="item.id"
          >
            <div class="h-40 w-28">
              <van-image
                width="8rem"
                height="6rem"
                fit="cover"
                position="center"
                radius="6"
                :src="item.picUrl"
              />
              <p class="text-xs">{{ item.name }}</p>
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
