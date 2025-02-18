<template>
  <div class="user">
    <header>
      <div class="left">
        <van-icon size='50px' color='whitesmoke' name="user-circle-o" v-if="!$store.state.isLogin" />
        <img class="avatar" :src="userInfo.avatar" alt="" v-else>
      </div>
      <div class="right" v-if="!$store.state.isLogin">
        <span class="login">未登录</span>
        <button @click="login_handle">点击登录账号</button>
      </div>
      <div class="right" v-else>
        <span class="login">欢迎，尊敬的会员：</span>
        <span class="login">{{ userInfo.name || "---" }}</span>
      </div>
    </header>
    <div class="container">
      <div>
        <van-grid>
          <div class="van-grid-item" style="flex-basis: 25%;">
            <div class="van-grid-item__content van-grid-item__content--center van-hairline">
              <span class="van-grid-item__icon diy_item pos_center">{{ userInfo.balance || "---" }}</span>
              <span class="van-grid-item__text">账户余额</span>
            </div>
          </div>
          <div class="van-grid-item" style="flex-basis: 25%;">
            <div class="van-grid-item__content van-grid-item__content--center van-hairline">
              <span class="van-grid-item__icon diy_item pos_center">{{ userInfo.integral || "---" }}</span>
              <span class="van-grid-item__text">积分</span>
            </div>
          </div>
          <div class="van-grid-item" style="flex-basis: 25%;">
            <div class="van-grid-item__content van-grid-item__content--center van-hairline">
              <span class="van-grid-item__icon diy_item pos_center">{{ userInfo.coupon || "---" }}</span>
              <span class="van-grid-item__text">优惠券</span>
            </div>
          </div>
          <van-grid-item icon="paid" text="我的钱包" />
        </van-grid>
      </div>
      <div>
        <van-grid>
          <van-grid-item icon="orders-o" text="全部订单" @click="toOrder" />
          <van-grid-item icon="pending-payment" text="待支付" />
          <van-grid-item icon="logistics" text="代发货" />
          <van-grid-item icon="sign" text="待收货" />
        </van-grid>
      </div>
      <div class="subline">
        <span class="line">我的服务</span>
      </div>
      <van-grid :column-num="4">
          <van-grid-item class="grid_item_color" icon="location-o" text="收货地址" />
          <van-grid-item class="grid_item_color" icon="gift-o" text="领券中心" />
          <van-grid-item class="grid_item_color" icon="coupon-o" text="优惠券" />
          <van-grid-item class="grid_item_color" icon="question-o" text="我的帮助" />
          <van-grid-item class="grid_item_color" icon="gold-coin-o" text="我的积分" />
          <van-grid-item class="grid_item_color" icon="after-sale" text="退换/售后" />
        </van-grid>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'UserIndex',
  created () {
    this.userInfo = this.info
  },
  data () {
    return {
      userInfo: {}
    }
  },
  methods: {
    login_handle () {
      this.$router.push({ path: '/login' })
    },
    toOrder () {
      if (!this.isLogin) {
        this.$toast('您还未登录，请先登录')
      } else {
        this.$router.push({ name: 'order' })
      }
    }
  },
  computed: {
    ...mapGetters(['info', 'isLogin'])
  }
}
</script>

<style scoped>

.user {
  width: 375px;
}

header {
  width: inherit;
  height: 100px;
  display: flex;
  align-items: center;
  padding: 10px;
  background-color: rgb(248, 227, 199);
  margin-bottom: 10px;
}

.left {
  width: 50px;
  height: 50px;
  float: left;
  background-color: rgb(199, 198, 196);
  border-radius: 10px;
}

.right {
  width: 100px;
  height: 50px;
  float: left;
  text-align: left;
  margin-left: 10px;
}

.login,button {
  color: rgb(207, 129, 27);
  margin-top: 5px;
}

button {
  border: none;
  background-color: inherit;
}

.container {
  width: 375px;
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.subline {
  width: 375px;
  height: 20px;
  text-align: left;
  padding-left: 10px;
}

.line {
  color: black;
}

.grid_item {
  display: -webkit-box;
  display: -webkit-flex;
  display: flex;
  -webkit-box-orient: vertical;
  -webkit-box-direction: normal;
  -webkit-flex-direction: column;
  flex-direction: column;
  box-sizing: border-box;
  height: 100%;
  padding: 16px 8px;
  background-color: #fff;
}

.diy_item {
  width: 56px;
  height: 28px;
  font-size: 19px;
  line-height: 28px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.grid_item_color {
  color: orangered;
}
.pos_center {
  text-align: center;
}
.avatar {
  width: 50px;
  height: 50px;
  border-radius: 10px;
  object-fit: cover;
}
</style>
