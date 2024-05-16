<script setup>
import { ref } from 'vue'
import { useI18n } from 'vue-i18n'
const { t } = useI18n()
const active = ref(0)
const tabs = ref([
  {
    name: 'video-o',
    path: '/video',
    label: 'common.video'
  },
  {
    name: 'wap-home-o',
    path: '/main',
    label: 'common.home'
  },
  {
    name: 'list-switch',
    path: '/category',
    label: 'common.category'
  },
  {
    name: 'user-circle-o',
    path: '/user',
    label: 'common.user'
  }
])
</script>
<template>
  <van-tabbar
    v-model="active"
    route
    active-color="#f97316"
    class="dark:bg-white dark:text-black"
  >
    <van-tabbar-item
      replace
      v-for="tab in tabs"
      :key="tab.name"
      :to="tab.path"
      :icon="tab.name"
      >{{ t(tab.label) }}</van-tabbar-item
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
