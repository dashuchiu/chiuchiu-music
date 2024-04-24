<script setup>
import CmLayout from '@/components/CmLayout/index.vue'
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useMusicPlayer } from '@/hooks/useMusicPlayer'
const { artistsList } = useMusicPlayer()
const router = useRouter()
const active = ref(0)
</script>
<template>
  <cm-layout :is-search="true">
    <van-tabs v-model:active="active">
      <van-tab title="歌手"
        ><van-index-bar>
          <van-index-anchor index="A" />
          <van-cell
            @click="router.push(`/artist/${item.id}`)"
            v-for="item in artistsList"
            :title="item.name"
          /> </van-index-bar
      ></van-tab>
      <van-tab title="歌曲">内容 2</van-tab>
    </van-tabs>
  </cm-layout>
</template>
<style lang="scss" scoped></style>
