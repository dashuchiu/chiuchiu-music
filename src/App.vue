<script setup>
import CmHeader from '@/components/CmHeader/index.vue'
import { musicApi } from '@/api/module/music'
import { ref } from 'vue'
import 'vant/es/toast/style'
import { showSuccessToast } from 'vant'
import { userApi } from '@/api/module/user'
import { setToken, getToken } from '@/utils/localStorage'

const isLogin = ref(getToken() || false)
const form = ref()
const phone = ref('')
// 18681547948
const sms = ref('')

const login = async () => {
  clearInterval(timer)
  const { token } = await userApi.login()
  if (token) {
    setToken(token)
    isLogin.value = true
    showSuccessToast('登入成功')
  }
}

const totalSecond = ref(60) // 总秒数
const second = ref(60) // 倒计时的秒数
let timer = null // 定时器 id

const getCode = async () => {
  try {
    await form.value.validate('phone')
    const data = userApi.sentVerifyCode(phone)
    if (data) {
      console.log(data)
      sms.value = 1234
      if (!timer && second.value === totalSecond.value) {
        timer = setInterval(() => {
          console.log('正在倒數')
          second.value--
          if (second.value <= 0) {
            clearInterval(timer)
            timer = null
            second.value = totalSecond.value
          }
        }, 1000)
      }
    }
  } catch (error) {
    console.log('驗證表單時發生錯誤')
  }
}

//校驗規則
const rules = {
  phone: [
    {
      pattern: /^\d{10,13}$/,
      message: '請輸入數字'
    }
  ],
  sms: [
    {
      pattern: /^\w{4}$/,
      message: '請輸入四位數驗證碼'
    }
  ]
}
const getMusic = async () => {
  const data = await musicApi.recommendResource()
  console.log(data)
}
getMusic()
</script>
<template>
  <!-- 背景底色 -->
  <div class="h-full bg-stone-800">
    <!-- 登入畫面 -->
    <div v-if="!isLogin">
      <div class="wrapper h-screen">
        <cm-header :is-search="true" :forTitle="'登入'" />
        <!-- 表單 -->
        <div class="container p-6 mt-10">
          <van-form @submit="login" ref="form">
            <van-cell-group inset>
              <van-field
                v-model="phone"
                name="phone"
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
                  <van-button @click="getCode" size="small" type="primary">
                    {{
                      second === totalSecond ? '發送' : second + `秒後重新發送`
                    }}</van-button
                  >
                </template>
              </van-field>
            </van-cell-group>
            <div style="margin: 16px">
              <van-button round block type="primary" native-type="submit">
                登入
              </van-button>
            </div>
          </van-form>
        </div>
      </div>
    </div>
    <!-- 首頁畫面 -->
    <div v-else>
      <router-view></router-view>
    </div>
  </div>
</template>
<style lang="scss" scoped>
* {
  color: white;
}
</style>
