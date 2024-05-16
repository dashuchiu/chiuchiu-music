<script setup>
import CmLayout from '@/components/CmLayout/index.vue'
import { ref, onMounted, watch } from 'vue'
import { useRouter } from 'vue-router'
import { useMusicPlayer } from '@/hooks/useMusicPlayer'
import { musicApi } from '@/api/module/music'
import CmSkeleton from '@/components/CmSkeleton/index.vue'
import { useI18n } from 'vue-i18n'
const { t } = useI18n()
// import pinyin from 'js-pinyin'

const { artistsList } = useMusicPlayer()
const router = useRouter()
const active = ref(0)

//骨架屏
const loading = ref(true)

watch(artistsList, (newVal) => {
  if (newVal) {
    loading.value = false
  }
})

const catList = ref([])
const getCatList = async () => {
  try {
    const data = await musicApi.playlistCatList()
    if (data) {
      catList.value = data.sub
      loading.value = false
    }
  } catch (err) {
    console.error(err)
  }
}
onMounted(() => getCatList())
</script>
<template>
  <cm-layout :is-search="true">
    <van-tabs v-model:active="active">
      <van-tab :title="t('common.cate_artist')">
        <van-index-bar>
          <cm-skeleton :loading="loading" class="mt-4 flex-col">
            <van-index-anchor index="L" />
            <van-cell
              @click="router.push(`/artist/${item.id}`)"
              v-for="item in artistsList"
              :key="item.id"
              :title="item.name"
            />
          </cm-skeleton>
        </van-index-bar>
      </van-tab>
      <van-tab :title="t('common.cate_song')">
        <cm-skeleton :loading="!catList.length" class="mt-4 flex-col">
          <div class="flex justify-around flex-wrap">
            <div
              v-for="item in catList"
              :key="item.id"
              class="w-2/5 my-4 h-20 rounded-md bg-stone-700 flex justify-center items-center dark:bg-stone-300"
            >
              <p class="tracking-widest">{{ item.name }}</p>
            </div>
          </div>
        </cm-skeleton>
      </van-tab>
    </van-tabs>
  </cm-layout>
</template>
<style lang="scss" scoped></style>
