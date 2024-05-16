<script setup>
import CmLayout from '@/components/CmLayout/index.vue'
import { setHistoryList, getHistoryList } from '@/utils/localStorage'
import { ref } from 'vue'
import { useI18n } from 'vue-i18n'
const { t } = useI18n()
const value = ref('')
const defaultHistory = ['林俊傑', '稻香', '伍佰']
const history = ref(
  getHistoryList()?.length ? [...getHistoryList()] : defaultHistory
)
const goSearch = (key) => {
  const index = history.value.indexOf(key)
  if (index !== -1) {
    history.value.splice(index, 1)
  }
  history.value.unshift(key)
  setHistoryList(history.value)
}
const clear = () => {
  history.value = []
  setHistoryList([])
}
</script>
<template>
  <cm-layout :forTitle="t('common.search')" :leftArrow="true">
    <van-search
      v-model="value"
      show-action
      :placeholder="t('placeholder.enter_search')"
    >
      <template #action>
        <div @click="goSearch(value)">{{ t('common.search') }}</div>
      </template>
    </van-search>
    <div class="flex justify-between items-center px-4 my-2">
      <div class="text-sm">{{ t('common.search_history') }}</div>
      <van-icon @click="clear" name="delete-o" size="14" />
    </div>
    <!-- 搜索歷史 -->
    <div v-if="history.length > 0" class="w-full">
      <van-button
        @click="goSearch(item)"
        v-for="item in history"
        :key="item"
        class="mx-2 mb-2"
        size="small"
        round
        hairline
        type="default"
        >{{ item }}</van-button
      >
    </div>
  </cm-layout>
</template>
