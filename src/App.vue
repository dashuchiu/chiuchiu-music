<script setup>
import CmHeader from '@/components/CmHeader/index.vue'
// import { musicApi } from '@/api/module/music'
import { ref, provide } from 'vue'
import 'vant/es/toast/style'
import { showSuccessToast } from 'vant'
import { userApi } from '@/api/module/user'
import { setToken, getToken } from '@/utils/localStorage'
import { useMusicPlayer } from '@/hooks/useMusicPlayer'
import { useUserStore } from '@/stores/module/user'
import { useI18n } from 'vue-i18n'
const { t } = useI18n()
provide('musicPlayer', useMusicPlayer())

const userStore = useUserStore()
const isLogin = ref(getToken() || false)
const form = ref()
const phone = ref('')
// 18681547948
const sms = ref('')

const login = async () => {
  clearInterval(timer)
  timer = null
  second.value = totalSecond.value
  const { token } = await userApi.login()
  if (token) {
    setToken(token)
    isLogin.value = true
    showSuccessToast(t('messages.login_success'))
  }
}
//provide to MainPage控制登出
provide('handleLogout', () => {
  isLogin.value = false
})

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
      message: t('messages.rule_number')
    }
  ],
  sms: [
    {
      pattern: /^\w{4}$/,
      message: t('messages.rule_sms')
    }
  ]
}
</script>
<template>
  <van-config-provider
    :theme="userStore.darkTheme ? 'dark' : 'light'"
    theme-vars-scope="global"
  >
    <div
      :class="{
        dark: userStore.darkTheme
      }"
    >
      <div class="h-full bg-stone-800 text-white dark:bg-white dark:text-black">
        <!-- 登入畫面 -->
        <div v-if="!isLogin">
          <div class="wrapper h-screen">
            <cm-header :forTitle="t('common.login')" />
            <!-- 表單 -->
            <div class="container p-6 mt-10">
              <van-form @submit="login" ref="form">
                <van-cell-group inset>
                  <van-field
                    v-model="phone"
                    name="phone"
                    required
                    clearable
                    :label="t('common.phone')"
                    :placeholder="t('placeholder.phone_number')"
                    :rules="rules.phone"
                  />
                  <van-field
                    v-model="sms"
                    required
                    center
                    clearable
                    :label="t('common.sms')"
                    :placeholder="t('placeholder.sms_code')"
                    :rules="rules.sms"
                  >
                    <template #button>
                      <van-button @click="getCode" size="small" type="primary">
                        {{
                          second === totalSecond
                            ? t('common.send')
                            : second + t('common.send_again')
                        }}</van-button
                      >
                    </template>
                  </van-field>
                </van-cell-group>
                <div style="margin: 16px">
                  <van-button round block type="primary" native-type="submit">
                    {{ t('common.login') }}
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
    </div>
  </van-config-provider>
  <!-- 背景底色 -->
</template>
<style lang="scss" scoped>
// * {
//   color: white;
// }
// .van-theme-dark body {
//   color: #dd1d1d;
//   background-color: rgb(65, 168, 41);
// }
</style>
