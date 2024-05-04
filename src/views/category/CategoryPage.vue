<script setup>
import CmLayout from '@/components/CmLayout/index.vue'
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useMusicPlayer } from '@/hooks/useMusicPlayer'
import { musicApi } from '@/api/module/music'
// import pinyin from 'js-pinyin'

const { artistsList } = useMusicPlayer()
const router = useRouter()
const active = ref(0)
// console.log(artistsList)

//骨架屏
const loading = ref(true)
onMounted(() => {
  loading.value = false
})

const catList = ref([])
const getCatList = async () => {
  const data = await musicApi.playlistCatList()
  catList.value = data.sub
  console.log(catList)
}
getCatList()
</script>
<template>
  <cm-layout :is-search="true">
    <van-tabs v-model:active="active">
      <van-tab title="歌手">
        <van-index-bar>
          <van-index-anchor index="L" />
          <van-skeleton title :row="3" :loading="loading">
            <van-cell
              @click="router.push(`/artist/${item.id}`)"
              v-for="item in artistsList"
              :key="item.id"
              :title="item.name"
            />
          </van-skeleton>
        </van-index-bar>
      </van-tab>
      <van-tab title="歌曲">
        <div class="flex justify-around flex-wrap">
          <div
            v-for="item in catList"
            :key="item.id"
            class="w-2/5 my-4 h-20 rounded-md bg-stone-700 flex justify-center items-center"
          >
            <p class="tracking-widest">{{ item.name }}</p>
          </div>
        </div>
      </van-tab>
    </van-tabs>
  </cm-layout>
</template>
<style lang="scss" scoped></style>
