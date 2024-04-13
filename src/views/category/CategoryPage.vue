<script setup>
import LayoutContainer from '@/components/layout/LayoutContainer.vue'
</script>
<template>
  <LayoutContainer>
    <template #content>
      <van-nav-bar class="shadow-md" :fixed="true" left-arrow>
        <template #right>
          <van-icon name="search" size="24" />
        </template>
      </van-nav-bar>

      <div class="text-9xl">分類</div>
      <div class="text-9xl">分類</div>
      <div class="text-9xl">分類</div>
      <div class="text-9xl">分類</div>
      <div class="text-9xl">分類</div>
      <div class="text-9xl">分類</div>
      <div class="text-9xl">分類</div>
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
