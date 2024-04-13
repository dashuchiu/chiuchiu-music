<script setup>
import { ref } from 'vue'

const tabs = ref([
  {
    name: 'video-o',
    path: '/video',
    label: '影片'
  },
  {
    name: 'wap-home-o',
    path: '/main',
    label: '首頁'
  },
  {
    name: 'list-switch',
    path: '/category',
    label: '分類'
  },
  {
    name: 'user-circle-o',
    path: '/user',
    label: '我的'
  }
])
</script>
<template>
  <router-view />
  <van-tabbar route active-color="#f97316">
    <van-tabbar-item
      replace
      v-for="tab in tabs"
      :key="tab.name"
      :to="tab.path"
      :icon="tab.name"
      >{{ tab.label }}</van-tabbar-item
    >
  </van-tabbar>
</template>
<style lang="scss" scoped>
.van-tabbar--fixed {
  left: calc((100% - 768px) / 2);
  right: calc((100% - 768px) / 2);
}
.van-tabbar {
  width: auto;
}
@media (max-width: 768px) {
  .van-tabbar--fixed {
    left: 0;
    right: 0;
  }
}
</style>
