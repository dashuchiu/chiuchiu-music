<script setup>
import { ref } from 'vue'
import { showToast } from 'vant'
import { useI18n } from 'vue-i18n'
const { t } = useI18n()
const fileList = ref([
  { url: 'https://fastly.jsdelivr.net/npm/@vant/assets/leaf.jpeg' }
])
const beforeRead = (file) => {
  if (file.type !== 'image/jpeg') {
    showToast(t('messages.only_jpg'))
    return false
  }
  return true
}
const username = ref('')
const onSubmit = (values) => {
  console.log('submit', values)
}
</script>
<template>
  <div class="flex flex-col items-center">
    <van-uploader
      v-model="fileList"
      reupload
      max-count="1"
      preview-size="10rem"
      :before-read="beforeRead"
    />
  </div>
  <van-form @submit="onSubmit">
    <van-cell-group inset>
      <van-field
        v-model="username"
        name="暱稱"
        :label="t('common.nickname')"
        placeholder="音痴草"
        :rules="[{ required: false, message: '請填寫暱稱' }]"
      />
    </van-cell-group>
    <div style="margin: 16px">
      <van-button round block type="primary" native-type="submit">
        {{ t('common.save') }}
      </van-button>
    </div>
  </van-form>
</template>
