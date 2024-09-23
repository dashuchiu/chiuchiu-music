<script setup>
import { reactive, ref } from 'vue'
import { showToast } from 'vant'
import { useI18n } from 'vue-i18n'
import { setUser, getUser } from '@/utils/localStorage'
import { defineEmits } from 'vue'
import { showSuccessToast } from 'vant'

const { t } = useI18n()
const emit = defineEmits('save', 'uploadImage')
const { nickname, image } = getUser()
const fileList = ref([
  {
    url: image || 'https://fastly.jsdelivr.net/npm/@vant/assets/leaf.jpeg',
    isImage: true
  }
])
console.log(fileList)
const beforeRead = (file) => {
  if (file.type !== 'image/jpeg') {
    showToast(t('messages.only_jpg'))
    return false
  }
  return true
}

const user = reactive({
  name: 'nickname',
  nickname,
  imgUrl: image
})
const afterRead = (file) => {
  user.imgUrl = file.objectUrl
  setUser({ ...getUser(), image: file.objectUrl })
  emit('uploadImage', file.objectUrl)
  console.log(file)
}
const onSubmit = ({ nickname }) => {
  user.nickname = nickname || '音痴草'
  setUser({ ...getUser(), nickname })
  showSuccessToast('儲存成功')
  emit('save', nickname)
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
