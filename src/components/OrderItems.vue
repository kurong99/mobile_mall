<template>
  <div class="order_content">
    <div class="order_info">
      <span class="date">2024-07-13 13:52:01</span>
      <span class="order_state">待发货</span>
    </div>
    <div class="goods_info" v-for="index in 2" :key="index">
      <div class="good_img">
        <img
          src="https://consumer.huawei.com/content/dam/huawei-cbg-site/cn/mkt/plp/launch/ah/phones/ah-series-pro-plus.jpg"
          alt="#"
        />
      </div>
      <div class="good_dec">
        HUAWEI Pura 70 Pro+
        为北斗卫星消息提供移动终端硬件，需在空旷无遮蔽处使用。首次使用前需在有地面网络的环境下，通过畅连应用激活或者开通运营商北斗卫星短信相关业务
      </div>
      <div class="order_purchases">
        <span class="price">￥43243</span>
        <span class="nums">x1</span>
      </div>
    </div>
    <div class="order_total">
      <p>共2件商品，总金额￥4324343243</p>
    </div>
    <div class="cancel">
      <van-button type="warning" size="small">申请取消</van-button>
    </div>
  </div>
</template>

<script>
export default {}
</script>

<style scoped>
.order_content {
  background-color: white;
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
  display: flex;
  padding: 10px;
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

.order_total, .cancel {
  padding: 10px;
  text-align: right;
}
</style>
