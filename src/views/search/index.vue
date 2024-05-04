<script setup>
import CmLayout from '@/components/CmLayout/index.vue'
import { ref } from 'vue'
const value = ref('')
const onSearch = (val) => console.log(val)
const onClickButton = () => console.log(value.value)
</script>
<template>
  <cm-layout :forTitle="'搜尋'" :leftArrow="true">
    <van-search
      v-model="value"
      show-action
      placeholder="請輸入歌曲或歌手名"
      @search="onSearch"
    >
      <template #action>
        <div @click="onClickButton">搜索</div>
      </template>
    </van-search>
  </cm-layout>
</template>
