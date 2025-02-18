<template>
  <div class="login">
    <div class="top">
      <van-nav-bar
        title="会员登录"
        left-text="返回"
        left-arrow
        @click-left="$router.back()"
      />
    </div>
    <div class="form">
      <van-form @submit="onSubmit">
        <van-field
          v-model="username"
          name="用户名"
          label="用户名"
          placeholder="用户名"
          :rules="[{ required: true, message: '请填写用户名' }]"
          autocomplete="on"
        />
        <van-field
          v-model="password"
          type="password"
          name="密码"
          label="密码"
          placeholder="密码"
          :rules="[{ required: true, message: '请填写密码' }]"
          autocomplete="on"
        />
        <div style="margin: 16px;">
          <van-button round block type="info" color='orange' native-type="submit">提交</van-button>
        </div>
      </van-form>
    </div>
  </div>
</template>
<script>

import { mapGetters } from 'vuex'
import { httpPost } from '@/untils/request'

export default {
  name: 'LoginIndex',
  data () {
    return {
      username: '',
      password: '',
      timeId: null
    }
  },
  methods: {
    async onSubmit () {
      const { message, info } = await httpPost('/login', { name: this.username, password: this.password })
      this.$toast(message)
      // 更改登录状态
      this.$store.commit('login', true)
      // 将用户信息保存
      this.$store.commit('setUserInfo', info)
      // 返回上级页面
      this.timeId = setTimeout(() => {
        this.$router.back()
      }, 1000)
    }
  },
  computed: {
    ...mapGetters(['isLogin'])
  },
  beforeDestroy () {
    this.timeId = null
  }
}
</script>

<style scoped>

.login {
  width: 375px;
  height: 812px;
  background-color: whitesmoke;
}

/* .form {
  margin-top: 50px;
} */
</style>
