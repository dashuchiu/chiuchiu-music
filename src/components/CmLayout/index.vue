<script setup>
import CmLayoutTab from '@/components/CmLayoutTab/index.vue'
import MusicPlayer from '@/components/CmMusicPlayer/MusicPlayer.vue'
import CmHeader from '@/components/CmHeader/index.vue'
import { defineProps, onMounted, ref, computed, watch } from 'vue'
import { useMusicStore } from '@/stores'

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
const scrollableHeight = ref(0)
const musicStore = useMusicStore()
const isMusicPlayerShow = computed(() => musicStore.isMusicPlayerShow)

watch(isMusicPlayerShow, (newVal) => {
  if (newVal) {
    scrollableHeight.value = window.innerHeight - 120
  } else {
    scrollableHeight.value = window.innerHeight - 50
  }
})

onMounted(() => {
  const scrollableHeightValue = window.innerHeight - 50
  scrollableHeight.value = scrollableHeightValue
})
// TODO: player 顯示的時候 => scrollableHeight 變短
</script>
<template>
  <cm-header
    :left-arrow="leftArrow"
    :left-text="leftText"
    :is-search="isSearch"
    :clickable="clickable"
    :for-title="forTitle"
  >
    <template #right>
      <slot name="headerRight" />
    </template>
  </cm-header>
  <main
    id="scroll-wrapper"
    class="px-6 pt-14 flex flex-col overflow-x-hidden overflow-y-scroll"
    :style="{ height: `${scrollableHeight}px` }"
  >
    <slot />
  </main>
  <footer id="footer">
    <MusicPlayer :is-show="isMusicPlayerShow" />
    <cm-layout-tab></cm-layout-tab>
  </footer>
</template>
