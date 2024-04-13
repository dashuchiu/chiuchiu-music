<script setup>
import LayoutContainer from '@/components/layout/LayoutContainer.vue'
const onClick = () => {
  console.log(1)
}
</script>
<template>
  <LayoutContainer>
    <template #content>
      <van-nav-bar
        class="shadow-md"
        left-text="北投阿桑，今天想聽什麼"
        :fixed="true"
        :clickable="false"
      >
        <template #right>
          <van-icon class="px-4" name="search" size="24" @click="onClick" />
          <van-button
            class="w-14"
            round
            type="primary"
            size="small"
            to="/login"
          >
            登出
          </van-button>
        </template>
      </van-nav-bar>
      <div class="container px-8">
        <div class="pt-16 text-3xl">探索</div>
        <div class="text-9xl">首頁</div>
        <div class="text-9xl">首頁</div>
        <div class="text-9xl">首頁</div>
        <div class="text-9xl">首頁</div>
        <div class="text-9xl">首頁</div>
        <div class="text-9xl">首頁</div>
      </div>
    </template>
  </LayoutContainer>
</template>
<style lang="scss" scoped>
.van-nav-bar--fixed {
  width: auto;
  left: calc((100% - 768px) / 2);
  right: calc((100% - 768px) / 2);
}

@media (max-width: 768px) {
  .van-nav-bar--fixed {
    left: 0;
    right: 0;
  }
}
</style>
