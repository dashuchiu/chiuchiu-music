<script setup>
import CmLayout from '@/components/CmLayout/index.vue'
import CmSkeleton from '@/components/CmSkeleton/index.vue'
import { musicApi } from '@/api/module/music'
import { useRoute } from 'vue-router'
import { onMounted, reactive, ref } from 'vue'
import { useI18n } from 'vue-i18n'
const { t } = useI18n()
const route = useRoute()
const loading = ref(false)

const mvDetails = reactive({
  info: {
    mvUrl: [],
    mvDetail: [],
    mvLike: [],
    mvComment: []
  }
})
onMounted(() => {
  loading.value = true
  Promise.all([
    musicApi.urlMv(route.params.id),
    musicApi.mvDetail(route.params.id),
    musicApi.mvLikeCount(route.params.id),
    musicApi.mvComment(route.params.id)
  ])
    .then((res) => {
      mvDetails.info = {
        mvUrl: res[0].data,
        mvDetail: res[1].data,
        mvLike: res[2],
        mvComment: res[3].comments
      }
      loading.value = false
    })
    .finally(() => {
      loading.value = false
    })
})
</script>
<template>
  <CmLayout :leftArrow="true">
    <cm-skeleton :loading="loading" type="content">
      <!-- 影片 -->
      <video
        :src="mvDetails.info.mvUrl.url"
        controls
        muted
        class="rounded-md"
      ></video>
      <!-- 影片資訊 -->
      <div class="py-2 flex justify-between items-center">
        <div>
          <p class="">{{ mvDetails.info.mvDetail.name }}</p>
          <p class="text-sm text-stone-500">
            {{ mvDetails.info.mvDetail.artistName }}
            {{ mvDetails.info.mvDetail.publishTime }}
          </p>
        </div>
        <div class="flex">
          <van-button round icon="good-job-o" type="primary">{{
            mvDetails.info.mvLike.likedCount
          }}</van-button>
        </div>
      </div>
      <!-- 簡介 -->
      <div
        v-if="mvDetails.info.mvDetail.desc"
        class="p-2 text-xs w-full rounded-md text-stone-300 bg-stone-700 dark:text-stone-700 dark:bg-stone-300"
      >
        <van-text-ellipsis
          rows="3"
          :content="mvDetails.info.mvDetail.desc"
          :expand-text="t('common.expand')"
          :collapse-text="t('common.collapse')"
        />
      </div>
      <!-- 評論 -->
      <div
        v-for="item in mvDetails.info.mvComment"
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
    </cm-skeleton>
  </CmLayout>
</template>
