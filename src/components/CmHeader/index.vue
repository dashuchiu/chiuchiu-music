<script setup>
import { useRouter } from 'vue-router'
const router = useRouter()
defineProps({
  leftArrow: {
    type: Boolean,
    default: false
  },
  isSearch: {
    type: Boolean,
    default: false
  },
  leftText: {
    type: String,
    default: ''
  },
  clickable: {
    type: Boolean,
    default: true
  },
  forTitle: {
    type: String,
    default: ''
  }
})
const onClickLeft = () => history.back()
</script>

<template>
  <van-nav-bar
    :fixed="true"
    class="shadow-md z-10"
    :left-arrow="leftArrow"
    :left-text="leftText"
    :clickable="clickable"
    :title="forTitle"
    @click-left="onClickLeft"
  >
    <template #right>
      <van-icon
        v-if="isSearch"
        name="search"
        @click="router.push('/search')"
        size="24"
      />
      <slot name="right" />
    </template>
  </van-nav-bar>
</template>
<style lang="scss" scoped>
.van-nav-bar--fixed {
  left: 0;
  right: 0;
}
</style>
