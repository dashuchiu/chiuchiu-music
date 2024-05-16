<template>
  <van-skeleton :loading="loading">
    <template #template>
      <div v-if="type === 'content'" class="flex-1">
        <van-skeleton-image class="flex-1 content" />
        <van-skeleton-paragraph row-width="50%" class="mb-4" />
        <van-skeleton-paragraph row-width="60%" />
        <van-skeleton-paragraph v-for="i in 3" :key="i" />
      </div>
      <div v-if="type === 'card'" class="flex-1">
        <van-skeleton-image class="flex-1" />
        <van-skeleton-paragraph row-width="50%" class="mb-4" />
        <van-skeleton-image class="flex-1" />
        <van-skeleton-paragraph row-width="50%" class="mb-4" />
        <van-skeleton-image class="flex-1" />
        <van-skeleton-paragraph row-width="50%" class="mb-4" />
        <van-skeleton-image class="flex-1" />
        <van-skeleton-paragraph row-width="50%" class="mb-4" />
        <van-skeleton-image class="flex-1" />
        <van-skeleton-paragraph row-width="50%" class="mb-4" />
      </div>
      <div v-if="type === 'paragraph'">
        <div class="flex-1 mb-4">
          <van-skeleton-paragraph row-width="60%" />
          <van-skeleton-paragraph v-for="i in 3" :key="i" />
        </div>
        <div class="flex-1 mb-4">
          <van-skeleton-paragraph row-width="60%" />
          <van-skeleton-paragraph v-for="i in 3" :key="i" />
        </div>
        <div class="flex-1 mb-4">
          <van-skeleton-paragraph row-width="60%" />
          <van-skeleton-paragraph v-for="i in 3" :key="i" />
        </div>
        <div class="flex-1 mb-4">
          <van-skeleton-paragraph row-width="60%" />
          <van-skeleton-paragraph v-for="i in 3" :key="i" />
        </div>
        <div class="flex-1">
          <van-skeleton-paragraph row-width="60%" />
          <van-skeleton-paragraph v-for="i in 3" :key="i" />
        </div>
      </div>
    </template>
    <slot />
  </van-skeleton>
</template>

<script setup>
defineProps({
  loading: {
    type: Boolean,
    default: false
  },
  type: {
    type: String,
    default: 'paragraph'
  }
})
</script>

<style lang="scss" scoped>
.van-skeleton-image {
  width: 100% !important;
}
.van-skeleton-image.content {
  height: 180px !important;
}
</style>
