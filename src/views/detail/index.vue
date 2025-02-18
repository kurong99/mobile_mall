<template>
  <div class="detail">
    <div class="top_bar">
      <van-nav-bar
        title="商品详情"
        left-text="返回"
        left-arrow
        @click-left="onClickLeft"
      />
    </div>
    <div class="good_img">
      <van-swipe @change="onChange">
        <van-swipe-item v-for="(image, index) in product.imgs" :key="index">
          <img class="item_image" :src="image" v-lazy="image" />
        </van-swipe-item>
        <template #indicator>
          <div class="custom-indicator">{{ current + 1 }}/4</div>
        </template>
      </van-swipe>
    </div>
    <div class="good_price">
      <div class="price">￥{{ product.price }}</div>
      <div class="sales">{{ product.nums }}件</div>
    </div>
    <div class="good_introduce">
      <p>{{ product.title }}</p>
    </div>
    <div class="good_shipment">
      <van-notice-bar background='#fff' mode="closeable">
        <van-icon name="passed" size='16px' />
        <span class="text">七天无理由退货</span>
        <van-icon name="passed" size='16px' />
        <span class="text">48小时发货</span>
      </van-notice-bar>
    </div>
    <div class="good_evaluation">
      <van-notice-bar mode="link" background='#fff' color='rgb(109, 106, 106)'>
        <span class="title">商品评价({{ product.evaluation.length }}条)：</span>
        <span class="more">查看更多</span>
      </van-notice-bar>
      <div class="evaluation_text" v-for="(ev, index) in product.evaluation" :key="index">
        <div class="header">
          <div class="avatar">
            <van-icon name="user-circle-o" size='30' color="rgb(109, 106, 106)" v-if="!ev.userinfo.avatar" />
            <img :src="ev.userinfo.avatar" alt="" v-else style="width: 40px;height: 40px;border-radius: 50px;">
          </div>
          <div class="name">{{ ev.userinfo.name }}</div>
          <div class="starrating">
            <van-rate color="rgb(243, 131, 57)" size='15' readonly v-model="ev.rating" />
          </div>
        </div>
        <div class="comment_text">
          <p>{{ ev.text }}</p>
        </div>
        <div class="comment_time">
          <span>{{ ev.time }}</span>
        </div>
      </div>
    </div>
    <div class="goods_description">
      <div class="description_title">商品描述</div>
      <div class="description_img">
        <img v-for="(img, index) in product.desc" :src="img" :key="index" alt="">
      </div>
    </div>
    <div class="cart_dialog">
      <van-action-sheet v-model="isShow" title="加入购物车">
        <div class="content">
          <div class="top">
            <div class="cart_img">
              <img :src="product.imgs[0]" alt="">
            </div>
            <div class="cart_info">
              <span class="product_price">￥{{ totalPrice }}</span>
              <span class="product_stock">库存：{{ product.nums }}件</span>
            </div>
          </div>
          <div class="center">
            <span>数量</span>
            <div class="nums_btn">
              <button class="btn" @click="decrease"><van-icon name="minus" /></button>
              <span class="nums">{{ this.count }}</span>
              <button class="btn" @click="increase"><van-icon name="plus" /></button>
            </div>
          </div>
          <div class="bottom">
            <button class="add_now" @click="add_cart">立即加入</button>
          </div>
        </div>
      </van-action-sheet>
    </div>
    <div class="good_operation">
      <van-goods-action placeholder>
        <van-goods-action-icon icon="wap-home-o" text="首页" color="#ee0a24" @click="backHome" />
        <van-goods-action-icon icon="cart-o" text="购物车" @click="toCart" />
        <van-goods-action-button type="warning" @click="showCart" text="加入购物车" />
        <van-goods-action-button type="danger" @click="buyNow"  text="立即购买" />
      </van-goods-action>
    </div>
  </div>
</template>

<script>
import { httpGet } from '@/untils/request'
import { mapGetters } from 'vuex'

export default {
  name: 'DetailIndex',
  async created () {
    const product = await httpGet('/comdetail', this.$route.params)
    this.product = product[0]
  },
  updated () {
    this.updateNums()
  },
  data () {
    return {
      current: 0,
      value: 0,
      isShow: false,
      product:
      {
        id: 0,
        title: '',
        imgs: [],
        price: 0,
        nums: 0,
        desc: [],
        evaluation: []
      },
      count: 1
    }
  },
  computed: {
    //  辅助函数
    ...mapGetters(['isLogin']),
    totalPrice () {
      return this.count * +this.product.price
    }
  },
  methods: {
    // 返回
    onClickLeft () {
      this.$router.back()
    },
    // 待定
    onChange (index) {
      this.current = index
    },
    // 展示购物车弹窗
    showCart () {
      this.isShow = true
      // 重新设置count
      this.count = 1
    },
    // 增加数量
    increase () {
      // 检查库存上限
      const maxCount = this.product.nums
      if (this.count < maxCount) {
        this.count = Math.min(this.count + 1, maxCount)
      }
    },
    // 减少数量
    decrease () {
      // 检查最小数量限制
      const minCount = 1
      if (this.count > minCount) {
        this.count = Math.max(this.count - 1, minCount)
      }
    },
    //  检查是否登录
    checkLogin () {
      let timeId
      // 未登录跳转到登录页面
      this.$toast('您还未登录，即将跳转登录')
      // 延迟跳转
      this.$router.beforeEach((to, from, next) => {
        if (from.name === 'detail' && to.name === 'login') {
          if (timeId) {
            clearTimeout(timeId)
          }
          timeId = setTimeout(() => {
            next()
          }, 1000)
        } else {
          next()
        }
      })
      this.$router.push({ name: 'login' })
    },
    // 添加该商品到购物车
    async add_cart () {
      // 检查当前登录状态
      if (this.isLogin) {
        //  返回一个promise  请求成功时为 action 返回的结果
        const message = await this.$store.dispatch('addCart', { id: this.product.id, count: this.count })
        //  弹框消失
        this.isShow = false
        // 添加提示
        this.$toast.success(message)
        // 库存减少 更新显示
        this.product.nums -= this.count
      } else {
        this.checkLogin()
      }
    },
    // 立即购买
    buyNow () {
      if (this.isLogin) {
        const selectedItems = []
        selectedItems.push(this.product)
        this.$router.push({ name: 'pay', params: { selectedItems } })
      } else {
        this.checkLogin()
      }
    },
    //  返回首页
    backHome () {
      this.$router.push({ path: '/' })
    },
    //  进入购物车
    toCart () {
      this.$router.push({ name: 'cart' })
    },
    // 变更商品后  更新数量显示
    async updateNums () {
      const product = await httpGet('/comdetail', this.$route.params)
      this.product = product[0]
    }
  }
}
</script>

<style scoped>

.detail{
  background-color: whitesmoke;
}

.custom-indicator {
  position: absolute;
  right: 5px;
  bottom: 5px;
  padding: 2px 5px;
  font-size: 12px;
  background: rgba(0, 0, 0, 0.1);
}

.item_image {
    width: inherit;
    height: inherit;
    padding: 10px;
}

.good_price {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  padding: 0px 10px;
  background-color: white;
  align-items: flex-end;
}

.price {
  font-size: 22px;
  color: red;
}

.sales {
  font-size: 18px;
  color: rgb(142, 145, 145);
}

.good_introduce {
  text-align: left;
  padding: 10px;
  font-size: 14px;
  background-color: white;
}

.good_shipment {
  width: 375px;
  font-size: 16px;
  line-height: 40px;
  background-color: whitesmoke;
}

.good_img {
  width: 355px;
}

.text {
  color: #0f0f0f;
  margin: 0 10px;
}

.title {
  font-size: 15px;
  color: #292828;
}

.more {
  margin-left: 150px;
  font-size: 12px;
  color: rgb(109, 106, 106);
}

.header {
  width: 375px;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  padding: 10px 20px 5px 25px;
  gap: 10px;
}

.evaluation_text {
  display: flex;
  flex-direction: column;
  background-color: white;
}

.comment_text, .comment_time{
  padding: 0px 20px 5px 25px;
  text-align: left;
}

.comment_time {
  font-size: 12px;
  color: #aaa7a7;
}

.goods_description {
  padding: 10px;
}
.description_title {
  padding: 6px;
  text-align: left;
  color: #858282;
}

.description_img img {
  width: 100%;
  background-position: center;
}

.good_operation {
  height: 50px;
}

.content {
  width: 375px;
  display: flex;
  flex-direction: column;
  padding: 10px;
}

.top {
  display: flex;
  gap: 20px;
  align-items: center;
  padding: 5px;
}

.cart_img {
  width: 80px;
  height: 80px;
}

.cart_img img {
  width: 100%;
  background-position: center;
}

.cart_info {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
}

.product_price {
  font-size: 20px;
  color: #fc6005;
}

.product_stock {
  font-size: 12px;
  color: #72706f;
}

.center {
  display: flex;
  justify-content: space-between;
  padding: 5px;
}

.btn {
  width: 20px;
  height: 20px;
  border: none;
}

.nums {
  width: 30px;
  height: 20px;
  padding: 0px 10px;
  margin: 0 5px;
}

.bottom {
  padding: 5px 5px 0px 5px;
}

.add_now {
  width: 340px;
  height: 40px;
  background-color: #fc6005;
  border: none;
  border-radius: 30px;
  line-height: 40px;
  color: white;
}

.name, .starrating {
  height: inherit;
  font-size: 12px;
}
</style>
