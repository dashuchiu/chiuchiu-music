<script setup>
import CmLayout from '@/components/CmLayout/index.vue'
import { ref, onMounted, watch } from 'vue'
import { useRouter } from 'vue-router'
import { useMusicPlayer } from '@/hooks/useMusicPlayer'
import { musicApi } from '@/api/module/music'
import CmSkeleton from '@/components/CmSkeleton/index.vue'
import { useI18n } from 'vue-i18n'
import pinyin from 'js-pinyin'
const { t } = useI18n()

const { artistsList } = useMusicPlayer()
const router = useRouter()
const active = ref(0)
const artists = ref([])

//骨架屏
const loading = ref(true)

watch(artistsList, (newVal) => {
  if (newVal) {
    loading.value = false
    const arr = []
    for (let item of newVal) {
      arr.push({
        char: pinyin.getFullChars(item.name).split('')[0].toUpperCase(),
        id: item.id,
        name: item.name
      })
    }
    artists.value = arr
    const arr1 = arr.filter((_, idx) => idx < 10)
    console.log(arr1);
    let newArr = []
    arr1.forEach(item => {
      if (!newArr.length) {
        newArr.push({ char: item.char, list: [{ ...item }] })
      } else {
        for (let i of newArr) {
          if (i.char !== item.char) {
            newArr.push({ char: item.char, list: [{ ...item }] })
          } else {
            console.log('item', item);
            console.log(i.list);
            // i.list.push({ ...item })
          }
        }
      }
    })
    console.log(newArr);
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
// pinyin.getFullChars(newVal[0].name).split('')[0].toUpperCase()

onMounted(() => getCatList())
</script>
<template>
  <cm-layout :is-search="true">
    <van-tabs v-model:active="active">
      <van-tab :title="t('common.cate_artist')">
        <van-index-bar>
          <cm-skeleton :loading="loading" class="mt-4 flex-col">
            <template v-for="item in artists" :key="item.id">
              <van-index-anchor :index="item.char" />
              <van-cell @click="router.push(`/artist/${item.id}`)"
                :title="item.name" />
            </template>
          </cm-skeleton>
        </van-index-bar>
      </van-tab>
      <van-tab :title="t('common.cate_song')">
        <cm-skeleton :loading="!catList.length" class="mt-4 flex-col">
          <div class="flex justify-around flex-wrap">
            <div v-for="item in catList" :key="item.id"
              class="w-2/5 my-4 h-20 rounded-md bg-stone-700 flex justify-center items-center dark:bg-stone-300">
              <p class="tracking-widest">{{ item.name }}</p>
            </div>
          </div>
        </cm-skeleton>
      </van-tab>
    </van-tabs>
  </cm-layout>
</template>
<style lang="scss" scoped></style>
