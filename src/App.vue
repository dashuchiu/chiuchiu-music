<script setup>
// import { auth } from '@/api/firebase.js'
// import { signInWithPhoneNumber, RecaptchaVerifier } from 'firebase/auth'
import CmHeader from '@/components/CmHeader/index.vue'
import { musicApi } from '@/api/module/music'
import { ref } from 'vue'
import 'vant/es/toast/style'
import { showSuccessToast } from 'vant'
import CmLayoutTab from '@/components/CmLayoutTab/index.vue'
import MusicPlayer from '@/components/CmMusicPlayer/MusicPlayer.vue'
const isLogout = ref(true)
const form = ref()
const phone = ref('')
const sms = ref('')
const onSubmit = (values) => {
  console.log('submit', values)
  isLogout.value = false
  showSuccessToast('登入成功')
}
const totalSecond = ref(60) // 总秒数
const second = ref(60) // 倒计时的秒数
let timer = null // 定时器 id

const getCode = async () => {
  try {
    await form.value.validate()
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
  } catch (error) {
    console.log('驗證表單時發生錯誤')
  }
}

const login = () => {
  clearInterval(timer)
}

//失敗的firebase
// const sendOtp = async () => {
//   try {
//     const recaptcha = new RecaptchaVerifier(auth, 'recaptcha', {})
//     const confirmatin = await signInWithPhoneNumber(auth, phone, recaptcha)
//     console.log(confirmatin)
//   } catch (err) {
//     console.log(err)
//   }
// }

// console.log(phone)

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
  <!-- 浮水印 -->
  <van-watermark content="mobile" z-index="-99" text-color="#f5f5f5" />
  <!-- 背景底色 -->
  <div class="shadow-lg mx-auto max-w-screen-md h-full pt-16 px-6 bg-stone-800">
    <!-- 登入畫面 -->
    <div v-if="isLogout">
      <div class="wrapper h-screen">
        <cm-header :is-search="true" :forTitle="'登入'" />
        <!-- 表單 -->
        <div class="container p-10">
          <van-form @submit="onSubmit" ref="form">
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
                  <van-button @click="getCode" size="small" type="primary">
                    {{
                      second === totalSecond
                        ? '發送驗證碼'
                        : second + `秒後重新發送`
                    }}</van-button
                  >
                </template>
              </van-field>
            </van-cell-group>
            <div style="margin: 16px">
              <van-button
                @click="login"
                round
                block
                type="primary"
                native-type="submit"
              >
                登入
              </van-button>
              <!-- <van-button @click="sendOtp" type="default">firebase機器人</van-button> -->
              <!-- <div id="recaptcha"></div> -->
            </div>
          </van-form>
        </div>
      </div>
    </div>

    <!-- 首頁畫面 -->
    <div v-else>
      <router-view></router-view>
      <MusicPlayer></MusicPlayer>
      <cm-layout-tab></cm-layout-tab>
    </div>
  </div>
</template>
<style lang="scss" scoped>
* {
  color: white;
}
</style>
