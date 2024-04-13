<script setup>
import { ref } from 'vue'
import 'vant/es/toast/style'
import { useRouter } from 'vue-router'
import { showSuccessToast } from 'vant'
const router = useRouter()
const onClickLeft = () => history.back()
const phone = ref('')
const sms = ref('')
const onSubmit = (values) => {
  console.log('submit', values)
  showSuccessToast('登入成功')
  router.push('/')
}

//校驗規則
const rules = {
  phone: [
    {
      pattern: /^09\d{8}$/,
      message: '請輸入09開頭共10位數字'
    }
  ],
  sms: [
    {
      pattern: /^\w{4}$/,
      message: '請輸入驗證碼'
    }
  ]
}
</script>
<template>
  <div class="wrapper h-screen">
    <van-nav-bar
      class="shadow-md"
      title="登入"
      left-arrow
      @click-left="onClickLeft"
    />

    <!-- 表單 -->
    <div class="container p-10">
      <van-form @submit="onSubmit">
        <van-cell-group inset>
          <van-field
            v-model="phone"
            required
            clearable
            label="手機號碼"
            placeholder="請輸入手機號碼"
            :rules="rules.phone"
          />
          <van-field
            v-model="sms"
            required
            center
            clearable
            label="驗證碼"
            placeholder="請輸入簡訊驗證碼"
            :rules="rules.sms"
          >
            <template #button>
              <van-button size="small" type="primary">發送驗證碼</van-button>
            </template>
          </van-field>
        </van-cell-group>
        <div style="margin: 16px">
          <van-button round block type="primary" native-type="submit">
            提交
          </van-button>
        </div>
      </van-form>
    </div>
  </div>
</template>
<style lang="scss" scoped></style>
