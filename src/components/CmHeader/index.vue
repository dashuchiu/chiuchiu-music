<script setup>
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
    class="shadow-md"
    :left-arrow="leftArrow"
    :left-text="leftText"
    :clickable="clickable"
    :title="forTitle"
    @click-left="onClickLeft"
  >
    <template #right>
      <van-icon v-if="isSearch" name="search" size="24" />
      <slot name="right" />
    </template>
  </van-nav-bar>
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
