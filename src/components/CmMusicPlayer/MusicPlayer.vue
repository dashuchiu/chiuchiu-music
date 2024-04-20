<script setup>
import MusicPopup from '@/components/CmMusicPlayer/MusicPopup.vue'
import { ref } from 'vue'
const value = ref(50)
const isPlay = ref(true)
const showPopup = ref(false)
const setShowPopup = (bool) => {
  showPopup.value = bool
}
const handlePlay = () => {
  isPlay.value = !isPlay.value
}
defineProps({
  isShow: {
    type: Boolean,
    default: false
  }
})
</script>

<template>
  <div class="relative" v-show="isShow">
    <div @click="setShowPopup(true)" class="fixed bottom-12 bg-slate-200">
      <!-- 進度條 -->
      <van-slider
        v-model="value"
        active-color="#f97316"
        button-size="0px"
        :readonly="true"
      />
      <!-- 音樂資訊 -->
      <div class="h-16">
        <div class="flex h-full justify-between items-center">
          <div class="flex">
            <van-image
              class="mx-4"
              width="3rem"
              height="3rem"
              radius="6"
              fit="cover"
              position="center"
              src="https://fastly.jsdelivr.net/npm/@vant/assets/cat.jpeg"
            />
            <div class="songInfo flex flex-col">
              <div class="title">貓貓奏鳴曲</div>
              <div class="artist text-sm text-stone-500">賓士貓</div>
            </div>
          </div>
          <!-- 播放/暫停 -->
          <van-icon
            @click.stop="handlePlay"
            v-show="isPlay"
            class="mx-4"
            name="play-circle-o"
            size="40"
          /><van-icon
            @click.stop="handlePlay"
            v-show="!isPlay"
            class="mx-4"
            name="pause-circle-o"
            size="40"
          />
        </div>
      </div>
    </div>
    <van-popup
      v-model:show="showPopup"
      position="bottom"
      round
      closeable
      close-icon="close"
      :style="{ padding: '64px' }"
    >
      <MusicPopup></MusicPopup>
    </van-popup>
  </div>
</template>
<style lang="scss" scoped>
.fixed,
.van-overlay,
.van-popup--bottom {
  left: calc((100% - 768px) / 2);
  right: calc((100% - 768px) / 2);
  width: auto;
}
@media (max-width: 768px) {
  .fixed,
  .van-overlay,
  .van-popup--bottom {
    left: 0;
    right: 0;
  }
}
.van-popup {
  height: 90%;
}
</style>
