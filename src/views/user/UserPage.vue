<script setup>
import CmLayout from '@/components/CmLayout/index.vue'
import UserSetPopup from './UserSetPopup.vue'
import { useUserStore } from '@/stores/module/user'
import { ref, watch } from 'vue'
import { useI18n } from 'vue-i18n'
import { setLang, getNickname } from '@/utils/localStorage'
const { t, locale } = useI18n()
const userStore = useUserStore()
const bgChecked = ref(userStore.darkTheme)
const showPopover = ref(false)
const selectedText = ref('中文')
const langs = ref([
  { text: '中文', lang: 'zh-TW' },
  { text: 'ENG', lang: 'en-US' }
])

const nickName = ref(getNickname())

const show = ref(false)
const showSetPopup = (bool) => {
  show.value = bool
}
const handleChange = (bool) => {
  userStore.setDarkTheme(bool)
  bgChecked.value = bool
}
const onSelect = (langs) => {
  locale.value = langs.lang
  selectedText.value = langs.text
}
//切換語系
watch(locale, (newlocale) => {
  setLang(newlocale)
})
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
        <p class="ml-6">{{ nickName }}</p>
      </div>
      <van-icon @click="showSetPopup(true)" name="setting-o" :size="28" />
      <van-popup
        v-model:show="show"
        position="right"
        round
        :style="{ width: '90%', height: '100%', padding: '64px' }"
        closeable
        close-icon="close"
      >
        <UserSetPopup @save="showSetPopup(false)" />
      </van-popup>
    </div>
    <!-- 背景模式 -->
    <div class="flex justify-between items-center mt-4">
      <h2>{{ t('common.mode') }}</h2>
      <van-switch @change="handleChange" v-model="bgChecked" />
    </div>
    <!-- 語言切換 -->
    <div class="flex justify-between items-center mt-4">
      <h2>{{ t('common.lang') }}</h2>
      <van-popover
        placement="left"
        v-model:show="showPopover"
        :theme="userStore.darkTheme ? 'light' : 'dark'"
        :actions="langs"
        @select="onSelect"
      >
        <template #reference>
          <van-button round type="default">{{ selectedText }}</van-button>
        </template>
      </van-popover>
    </div>
  </cm-layout>
</template>
<style lang="scss" scoped></style>
