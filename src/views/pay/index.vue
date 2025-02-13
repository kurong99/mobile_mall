<template>
  <div class="pay">
    <div class="top">
      <van-nav-bar
        title="订单结算台"
        left-text="返回"
        left-arrow
        @click-left="onClickLeft"
      />
    </div>
    <div class="concat_card">
      <div class="address_info">
        <div class="address_icon">
          <van-icon size='25' name="location-o" />
        </div>
        <div class="address_text">
          <span class="name">{{ currentContact.name }} | {{ currentContact.tel }}</span>
          <span class="address">{{ currentContact.address }}</span>
        </div>
      </div>
      <div class="edit_address">
        <van-icon size='25' name="arrow" @click="onEdit" />
      </div>
    </div>
    <div class="pay_item">
      <div class="goods_info" v-for="index in buyGoods" :key="index.id">
        <div class="good_img">
          <img :src="index.imgs[0]" alt="#" />
        </div>
        <div class="good_dec">{{ index.title }}</div>
        <div class="order_purchases">
          <span class="price">￥{{ index.price }}</span>
          <span class="nums">x{{ index.count }}</span>
        </div>
      </div>
    </div>
    <div class="order_total">
      <p>共{{ buyGoods.length }}件商品，合计：<span>￥{{ totalPrice }}</span></p>
    </div>
    <div class="confirming_info">
      <div class="order_info">
        <p>订单总金额：</p>
        <span style="color: rgb(245, 66, 12);">￥{{ totalPrice }}</span>
      </div>
      <div class="order_info">
        <p>优惠券：</p>
        <span>暂无优惠券可用</span>
      </div>
      <div class="order_info">
        <p>配送费：</p>
        <span style="color: rgb(245, 66, 12);">+ ￥{{ delivery }}</span>
      </div>
    </div>
    <div class="pay_method">
      <div class="order_info">
        <p>支付方式</p>
      </div>
      <div class="order_info">
        <p>
          <van-icon color='rgb(255, 94, 0)' name="gold-coin" />
          余额支付（可用￥543654元）
        </p>
        <van-icon color='rgb(255, 94, 0)' name="success" />
      </div>
    </div>
    <div class="buyer_message">
      <input class="input_message" placeholder="选填：买家留言（50字以内）">
    </div>
    <div class="placeholder_box">
      <div class="submit_order">
        <div class="payment">
          <p>实付款：<span style="color: rgb(245, 66, 12);">￥{{ payment }}</span></p>
        </div>
        <div class="submit_btn">
          <van-button color="rgb(245, 150, 30)" @click="payOrder">支付订单</van-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'PayIndex',
  created () {
    this.buyGoods = this.$route.params.selectedItems
  },
  data () {
    return {
      buyGoods: [],
      delivery: 2,
      coupon: 0,
      currentContact: {
        name: 'teng',
        tel: '12324353985',
        address: '湖北省武汉市江夏区豹澥街道未来科技城E1 4F'
      }
    }
  },
  computed: {
    totalPrice () {
      return this.buyGoods.reduce((acc, cur) => acc + cur.price * cur.count, 0).toFixed(2)
    },
    payment () {
      return (+this.totalPrice + this.delivery - this.coupon).toFixed(2)
    }
  },
  methods: {
    // 返回
    onClickLeft () {
      this.$router.back()
    },
    // 修改地址
    onEdit () {
      console.log(323)
    },
    // 支付订单
    payOrder () {
      console.log(55)
    }
  }
}
</script>

<style scoped>

.pay {
  /* height: 812px; */
  background-color: whitesmoke;
}

.concat_card {
  height: 72px;
  padding: 10px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  position: relative;
  background-color: rgb(255, 255, 255);
}

.concat_card::before {
  content: '';
  position: absolute;
  width: 355px;
  height: 8px;
  left: 0;
  bottom: 0;
  padding: 0px 10px;
  background-image: linear-gradient(to right top, rgb(11, 154, 250), white, rgb(245, 73, 30));
  background-repeat: repeat-x;background-position: 0% 100%;
}

.address_info {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 10px;
  flex: 0.4;
}

.address_text {
  width: 100px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  text-align: left;
}

.name, .address {
  font-size: 15px;
  width: 260px;
  color: rgb(76, 76, 77);
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
}

.goods_info {
  display: flex;
  margin-top: 10px;
  padding: 10px;
  background-color: white;
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
  font-size: 14px;
  text-overflow: ellipsis;
  text-align: left;
}

.order_purchases {
  display: flex;
  flex-direction: column;
  gap: 10px;
  text-align: right;
  font-size: 12px;
  color: rgb(148, 149, 150);
  margin-left: 15px;
}

.price , .nums {
  color: rgb(255, 94, 0);
  font-size: 15px;
}

.order_total {
  padding: 10px;
  text-align: right;
  color: #a19d9d;
  margin-top: 3px;
  background-color: white;
}
.order_total p > span {
  color: rgb(255, 94, 0);
}

.confirming_info, .pay_method, .buyer_message {
  margin-top: 10px;
}

.order_info {
  display: flex;
  justify-content: space-between;
  padding: 8px 10px;
  margin-top: 2px;
  background-color: white;
}

.pay_method > .order_info {
  margin: 0;
}

.buyer_message {
  padding: 5px 10px;
  background-color: white;
}

.input_message {
  width: 355px;
  height: 50px;
  border: none;
}

.submit_order {
  width: 375px;
  height: 50px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: fixed;
  bottom: 0;
  background-color: white;
}

.payment, .submit_btn {
  padding: 5px;
}

.placeholder_box {
  height: 50px;
  margin-top: 5px;
}
</style>
