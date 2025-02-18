<template>
  <div class="order_content">
    <div class="order_info">
      <span class="date">2024-07-13 13:52:01</span>
      <span class="order_state">待发货</span>
    </div>
    <div class="goods_info" v-for="order in orderList" :key="order.id">
      <div class="order">
        <div class="good_img">
          <img
            :src="order.imgs[0]"
            alt="#"
          />
        </div>
        <div class="good_dec">{{ order.title }}</div>
        <div class="order_purchases">
          <span class="price">￥{{ order.price }}</span>
          <span class="nums">x{{ order.count }}</span>
        </div>
      </div>
      <div class="order_total">
        <p>共{{ orderList.length}}件商品，总金额￥{{ totalPrice }}</p>
      </div>
      <div class="cancel">
        <van-button type="warning" size="small">申请取消</van-button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    orderList: {
      type: Array,
      required: true
    }
  },
  computed: {
    totalPrice () {
      return this.$store.state.orders.payment
    }
  }
}
</script>

<style scoped>
.order_content {
  background-color: whitesmoke;
  margin: 10px 0;
}

.order_info {
  padding: 10px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.date {
  line-height: 25px;
  font-size: 14px;
  height: 19px;
  color: rgb(180, 175, 175);
}

.order_state {
  height: 19px;
  font-size: 14px;
  color: coral;
}

.goods_info {
  padding: 10px;
  margin-bottom: 5px;
  background-color: white;
}

.order {
  display: flex;
}

.good_img {
    width: 110px;
    height: 110px;
}
.good_img img {
    width: 100%;
    height: 100%;
    border-radius: 10px;
}

.good_dec {
  flex: 1;
  height: 60px;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  overflow: hidden;
  -webkit-line-clamp: 3;
  line-clamp: 3;
  font-size: 15px;
  text-overflow: ellipsis;
  text-align: left;
  margin-top: 10px;
}

.order_purchases {
  display: flex;
  flex-direction: column;
  gap: 10px;
  text-align: right;
  font-size: 12px;
  color: rgb(148, 149, 150);
  margin-top: 10px;
  margin-left: 15px;
}

.order_total, .cancel {
  padding: 10px;
  text-align: right;
}
</style>
