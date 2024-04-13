<script setup>
import MusicPopUp from '@/components/musicPlayer/MusicPopup.vue'
import { ref } from 'vue'
const isPlay = ref(true)
const show = ref(true)
const showPopup = () => {
  show.value = true
}
</script>

<template>
  <div class="relative">
    <div @click="showPopup" class="fixed bottom-12 bg-slate-200">
      <van-progress :percentage="50" color="#f97316" :show-pivot="false" />
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

          <div>
            <van-icon
              v-if="isPlay"
              class="mx-4"
              name="play-circle-o"
              size="40"
            /><van-icon v-else class="mx-4" name="pause-circle-o" size="40" />
          </div>
        </div>
      </div>
    </div>
    <van-popup
      v-model:show="show"
      position="bottom"
      round
      closeable
      :style="{ padding: '64px' }"
      ><MusicPopUp></MusicPopUp
    ></van-popup>
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
