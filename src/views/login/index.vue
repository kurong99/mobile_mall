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
        />
        <van-field
          v-model="password"
          type="password"
          name="密码"
          label="密码"
          placeholder="密码"
          :rules="[{ required: true, message: '请填写密码' }]"
        />
        <div style="margin: 16px;">
          <van-button round block type="info" color='orange' native-type="submit">提交</van-button>
        </div>
      </van-form>
    </div>
  </div>
</template>

<script>
export default {
  name: 'LoginIndex',
  data () {
    return {
      username: '',
      password: ''
    }
  },
  methods: {
    onSubmit () {
      if (this.username === 'teng' && this.password === '123456') {
        this.$toast('登录成功')
        this.$store.state.isLogin = true
        this.$router.push({ path: '/user', query: { username: this.username } })
      }
    }
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
