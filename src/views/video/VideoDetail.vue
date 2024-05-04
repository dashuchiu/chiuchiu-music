<script setup>
import CmLayout from '@/components/CmLayout/index.vue'
import { musicApi } from '@/api/module/music'
import { useRoute } from 'vue-router'
import { ref } from 'vue'
const routeId = useRoute().params.id
const mvUrl = ref([])
const getMvUrl = async () => {
  const { data: data } = await musicApi.urlMv(routeId)
  mvUrl.value = data
}
getMvUrl()

const mvDetail = ref([])
const getMvDetail = async () => {
  const { data: data } = await musicApi.mvDetail(routeId)
  mvDetail.value = data
}
getMvDetail()

const mvLike = ref([])
const getMvLike = async () => {
  const data = await musicApi.mvLikeCount(routeId)
  mvLike.value = data
}
getMvLike()

const mvCommentInfo = ref([])
const getMvComment = async () => {
  const data = await musicApi.mvComment(routeId)
  mvCommentInfo.value = data.comments
}
getMvComment()
</script>
<template>
  <CmLayout :leftArrow="true">
    <!-- 影片 -->
    <video :src="mvUrl.url" controls muted class="rounded-md"></video>
    <!-- 影片資訊 -->
    <div class="py-2 flex justify-between items-center">
      <div>
        <p class="">{{ mvDetail.name }}</p>
        <p class="text-sm text-stone-500">
          {{ mvDetail.artistName }} {{ mvDetail.publishTime }}
        </p>
      </div>
      <div class="flex">
        <van-button round icon="good-job-o" type="primary">{{
          mvLike.likedCount
        }}</van-button>
      </div>
    </div>
    <!-- 簡介 -->
    <div
      v-if="mvDetail.desc"
      class="p-2 text-xs w-full rounded-md text-stone-300 bg-stone-700"
    >
      <van-text-ellipsis
        rows="3"
        :content="mvDetail.desc"
        expand-text="展开"
        collapse-text="收起"
      />
    </div>
    <!-- 評論 -->
    <div
      v-for="item in mvCommentInfo"
      :key="item.id"
      class="my-2 flex items-start"
    >
      <van-image
        class="mr-2"
        round
        width="3rem"
        fit="cover"
        position="center"
        :src="item.user.avatarUrl"
      />
      <div class="text-sm w-full">
        <div class="flex">
          <p>{{ item.user.nickname }}</p>
          <p class="ml-2 text-stone-500">{{ item.timeStr }}</p>
        </div>
        <p>{{ item.content }}</p>
      </div>
    </div>
  </CmLayout>
</template>
