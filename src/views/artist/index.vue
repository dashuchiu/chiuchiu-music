<script setup>
import CmLayout from '@/components/CmLayout/index.vue'
import { ref, reactive, onMounted, inject } from 'vue'
// import { useRoute } from 'vue-router'
import { musicApi } from '@/api/module/music'
import { useMusicStore } from '@/stores'
const { addTrackAndPlay } = inject('musicPlayer')
import { useI18n } from 'vue-i18n'
const { t } = useI18n()
// const route = useRoute()
// const id = ref(route.params.id)
const musicStore = useMusicStore()
const state = reactive({
  artistsDetail: {
    artistAlbum: [],
    artistDetail: [],
    artists: []
  }
})
const hotSongs = ref([])
const artistInfo = ref({
  name: '',
  pic: ''
})

function addMusic(item) {
  musicApi.urlV1(item.id).then(({ data }) => {
    console.log(data)
    let param = {
      id: item.id,
      title: item.name,
      singer: item.ar.map((ar) => ar.name).join('/ '),
      album: item.al.name,
      cover: item.al.picUrl,
      source: data[0].url,
      time: item.dt,
      mv: item.mv
    }
    musicStore.addTrackAndPlay(param)
    musicStore.setIsMusicPlayerShow(true)
    console.log(musicStore.isMusicPlayerShow)
    addTrackAndPlay()
  })
}
const getArtistDetail = async () => {
  const data = await musicApi.artistDetail()
  state.artistsDetail.artistAlbum = data[0]
  state.artistsDetail.artistDetail = data[1]
  state.artistsDetail.artists = data[2]
  hotSongs.value = state.artistsDetail.artists.hotSongs
  // console.log(hotSongs.value)
  artistInfo.value.name = state.artistsDetail.artists.artist.name
  artistInfo.value.pic = state.artistsDetail.artists.artist.picUrl
}

onMounted(() => {
  // 首先获取歌手信息、歌手专辑
  getArtistDetail()
})
</script>
<template>
  <cm-layout :leftArrow="true">
    <div class="relative">
      <van-image fit="cover" position="center" :src="artistInfo.pic" />
      <p class="absolute bottom-5 left-5 text-3xl">{{ artistInfo.name }}</p>
    </div>

    <p class="mt-4">{{ t('common.hot_song') }}</p>
    <div
      v-for="item in hotSongs"
      :key="item.id"
      class="my-2 flex justify-between items-center"
      @click="addMusic(item)"
    >
      <div class="flex items-center">
        <van-image
          radius="6"
          width="4rem"
          height="4rem"
          fit="cover"
          position="center"
          :src="item.al.picUrl + '?param=100y100'"
        />
        <p class="mx-4">{{ item.name }}</p>
      </div>

      <van-icon name="plus" />
    </div>
  </cm-layout>
</template>
