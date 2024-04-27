<script setup>
import CmLayout from '@/components/CmLayout/index.vue'
import UserSetPopup from './UserSetPopup.vue'
import { ref } from 'vue'
const show = ref(false)
const showSetPopup = () => {
  show.value = true
}
const bgChecked = ref(false)
const showPopover = ref(false)
const actions = [{ text: '中文' }, { text: '英文' }]
</script>
<template>
  <cm-layout :is-search="true">
    <div class="flex justify-between items-center">
      <!-- 會員資訊 -->
      <div class="flex items-center">
        <van-image
          round
          width="5rem"
          height="5rem"
          fit="cover"
          position="center"
          src="https://fastly.jsdelivr.net/npm/@vant/assets/leaf.jpeg"
        />
        <p class="ml-6">音痴草</p>
      </div>
      <van-icon @click="showSetPopup" name="setting-o" :size="28" />
      <van-popup
        v-model:show="show"
        position="right"
        round
        :style="{ width: '90%', height: '100%', padding: '64px' }"
        closeable
        close-icon="close"
      >
        <UserSetPopup></UserSetPopup>
      </van-popup>
    </div>
    <!-- 背景模式 -->
    <div class="flex justify-between items-center mt-4">
      <h2>背景模式</h2>
      <van-switch v-model="bgChecked" />
    </div>
    <!-- 語言切換 -->
    <div class="flex justify-between items-center mt-4">
      <h2>語言</h2>
      <van-popover
        placement="left"
        v-model:show="showPopover"
        theme="dark"
        :actions="actions"
      >
        <template #reference>
          <van-button round type="default">中文</van-button>
        </template>
      </van-popover>
    </div>
  </cm-layout>
</template>
<style lang="scss" scoped></style>
