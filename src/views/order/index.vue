<template>
  <div class="order">
    <div class="top">
      <van-nav-bar
        title="我的订单"
        left-text="返回"
        left-arrow
        @click-left="onClickLeft"
      />
    </div>
    <div class="order_nav">
      <van-tabs color='rgb(245, 131, 49)' v-model="active">
        <van-tab v-for="(list,index) in navList" :key="index" :title="list.title">
          <OrderItems v-if="list.hasContent" />
          <BlankPage v-else />
        </van-tab>
      </van-tabs>
    </div>
  </div>
</template>

<script>

import OrderItems from '@/components/OrderItems'
import BlankPage from '@/components/BlankPage'

export default {
  name: 'OrderIndex',
  components: {
    OrderItems,
    BlankPage
  },
  data () {
    return {
      active: 0,
      navList: [
        {
          title: '全部',
          hasContent: true
        },
        {
          title: '待支付',
          hasContent: false
        },
        {
          title: '待发货',
          hasContent: true
        },
        {
          title: '待收货',
          hasContent: false
        },
        {
          title: '待评价',
          hasContent: false
        }
      ]
    }
  },
  methods: {
    onClickLeft () {
      console.log(11)
    }
  }
}
</script>

<style scoped>

.order {
  height: 812px;
  background-color: whitesmoke;
}

</style>
