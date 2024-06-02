<script setup>
import { reactive, ref } from 'vue'
import { showToast } from 'vant'
import { useI18n } from 'vue-i18n'
import { setNickname, getNickname } from '@/utils/localStorage'
import { defineEmits } from 'vue'
import { showSuccessToast } from 'vant'

const { t } = useI18n()
const emit = defineEmits('save')
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

const user = reactive({
  name: 'nickname',
  nickname: getNickname(),
  imgUrl: ''
})
const afterRead = (file) => {
  user.imgUrl = file.objectUrl
  console.log(file.objectUrl)
}
const onSubmit = ({ nickname }) => {
  user.nickname = nickname
  setNickname(nickname)
  showSuccessToast('儲存成功')
  emit('save')
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
      :after-read="afterRead"
    />
  </div>
  <van-form @submit="onSubmit">
    <van-cell-group inset>
      <van-field
        v-model="user.nickname"
        :name="user.name"
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
