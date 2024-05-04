<script setup>
import CmLayout from '@/components/CmLayout/index.vue'
import { musicApi } from '@/api/module/music'
import { useRouter } from 'vue-router'
import { ref } from 'vue'
const router = useRouter()
const mvList = ref([])
const getMV = async () => {
  const { data: data } = await musicApi.newMV()
  mvList.value = data
  console.log(mvList)
}
getMV()
</script>
<template>
  <cm-layout :is-search="true">
    <div
      @click="router.push(`/video/${item.id}`)"
      v-for="item in mvList"
      :key="item.id"
      class="mv-container"
    >
      <van-image
        radius="6"
        class="w-full"
        height="10rem"
        fit="cover"
        position="center"
        :src="item.cover"
      />
      <p class="mb-4">{{ item.name }}</p>
    </div>
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
