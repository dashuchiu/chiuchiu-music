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
    // const arr1 = arr.filter((_, idx) => idx < 10)
    // console.log(arr1)
    let newArr = []

    artists.value.forEach((item) => {
      // 檢查 newArr 中是否已經有相同 char 的組
      let group = newArr.find((i) => i.char === item.char)

      if (group) {
        // 如果找到相同 char 的組，將 item 加入到該組的 list 中
        group.list.push({ ...item })
      } else {
        // 如果沒有找到相同 char 的組，創建新的組並加入 newArr
        newArr.push({ char: item.char, list: [{ ...item }] })
      }
    })
    // 對 newArr 按 char 進行 A-Z 排序
    newArr.sort((a, b) => a.char.localeCompare(b.char))
    artists.value = newArr
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
            <template v-for="group in artists" :key="group.char">
              <van-index-anchor :index="group.char" />
              <van-cell
                v-for="artist in group.list"
                :key="artist.id"
                @click="router.push(`/artist/${artist.id}`)"
                :title="artist.name"
              />
            </template>
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
