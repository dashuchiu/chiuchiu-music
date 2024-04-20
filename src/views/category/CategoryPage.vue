<script setup>
import CmLayout from '@/components/CmLayout/index.vue'
import { ref } from 'vue'
const active = ref(0)
</script>
<template>
  <cm-layout :is-search="true">
    <van-tabs v-model:active="active">
      <van-tab title="歌手"
        ><van-index-bar>
          <van-index-anchor index="A" />
          <van-cell title="文本" />
          <van-cell title="文本" />
          <van-cell title="文本" />

          <van-index-anchor index="B" />
          <van-cell title="文本" />
          <van-cell title="文本" />
          <van-cell title="文本" />

          <van-index-anchor index="C" />
          <van-cell title="文本" />
          <van-cell title="文本" />
          <van-cell title="文本" />

          <van-index-anchor index="D" />
          <van-cell title="文本" />
          <van-cell title="文本" />
          <van-cell title="文本" />
          <van-cell title="文本" />
          <van-cell title="文本" />
          <van-cell title="文本" /> </van-index-bar
      ></van-tab>
      <van-tab title="歌曲">内容 2</van-tab>
    </van-tabs>
  </cm-layout>
</template>
<style lang="scss" scoped></style>
