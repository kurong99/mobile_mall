<template>
  <div class="home">
    <header>移动商城</header>
    <article>
      <van-search v-model="value" placeholder="请输入搜索关键词" @click="onSearch" shape="round"/>
      <van-swipe class="my-swipe" :autoplay="3000" :height="350">
        <van-swipe-item v-for="(image, index) in images" :key="index">
            <img class="item_image" :src="image" v-lazy="image" />
        </van-swipe-item>
      </van-swipe>
      <van-notice-bar
        left-icon="volume-o"
        text="以上页面中的产品图片、视频及屏幕内容仅作示意，实物产品效果（包括但不限于外观、颜色、尺寸）和屏幕显示内容（包括但不限于背景、UI、配图、视频）可能略有差异，请以实物为准。"
        color="black"
        background="#ecf9ff"
      />
      <div class="banner">
        <img src="https://consumer.huawei.com/content/dam/huawei-cbg-site/cn/mkt/launch/241022/plp/phones/nova13-pro-card3.jpg" alt="#">
      </div>
      <div class="common_area">
        <div class="category" v-for="cate in categorys" :key="cate.id" @click="toCategorys(cate.id, cate.nickName)">
            <div class="preview_img">
                <img :src="cate.icon" alt="#">
            </div>
            <div class="introductory">
                <p>{{ cate.name }}</p>
            </div>
        </div>
      </div>
      <van-divider @divider-line-height='100' :style="{ width: '250px', height: '30px',margin: '0 auto' }">猜你喜欢</van-divider>
      <div class="common_area">
        <div class="goods" v-for="good in goods" :key="good.id" @click="goodDetail(good.id)">
            <div class="good_img">
                <img :src="good.img" alt="#">
            </div>
            <div class="good_dec">
              <span style="font-weight: 600;">{{ good.title }}</span>
                <p>{{ good.desc }}</p>
                <span class="nums">库存：{{ good.nums }}件</span>
                <span class="price">￥{{ good.price }}</span>
            </div>
        </div>
      </div>
    </article>
  </div>
</template>

<script>
import { httpGet } from '../../untils/request.js'

export default {
  name: 'HomeIndex',
  async created () {
    const product = await httpGet('/productList')
    const category = await httpGet('/categorys')
    this.goods = product.productList
    this.categorys = category.categorys
  },
  data () {
    return {
      value: '',
      images: [
        'https://consumer.huawei.com/content/dam/huawei-cbg-site/cn/mkt/plp/launch/0910/mate-xt-ultimate-design-nav.jpg',
        'https://consumer.huawei.com/content/dam/huawei-cbg-site/cn/mkt/plp/launch/240222/phones/icon.jpg',
        'https://consumer.huawei.com/content/dam/huawei-cbg-site/cn/mkt/launch/241022/plp/phones/nova13-pro-nav.jpg',
        'https://consumer.huawei.com/content/dam/huawei-cbg-site/cn/mkt/plp/launch/ah/phones/ah-series.jpg'
      ],
      categorys: [],
      goods: []
    }
  },
  methods: {
    onSearch () {
      this.$router.push({ name: 'search', query: { value: this.value } })
    },
    goodDetail (id) {
      this.$router.push({ name: 'detail', params: { id } })
    },
    toCategorys (id, name) {
      // 不能使用对象简写形式 路由不显示参数
      // id为0时不显示路由参数 页面内保持一致
      id === 0 ? this.$router.push({ name: 'categorys' }) : this.$router.push({ name: 'categorys', query: { id: id, nickName: name } })
    }
  }
}
</script>

<style scoped>

.demo {
    height: 50px;
}

.home {
  width: 100%;
  /* overflow-x: hidden; */
}

header {
  width: 100%;
  height: 50px;
  background-color: brown;
  line-height: 50px;
  color: white;
  font-size: 30px;
  font-weight: 500;
  text-align: center;
}

.my-swipe .van-swipe-item {
    color: #fff;
    font-size: 20px;
    line-height: 120px;
    text-align: center;
    background-color: whitesmoke;
}

.item_image {
    width: inherit;
    height: inherit;
}

.banner {
    width: 100%;
    margin: 3px 0;
    position: relative;
}

.banner::before {
    content: '光影交织，格纹变奏，尽释不拘一格的态度。引力悬浮设计，饰以超级星耀环，出场即为瞩目焦点';
    position: absolute;
    left: 0;
    bottom: 100px;
    color: white;
    font-size: 16px;
    font-weight: 800;
    text-align: center;
    font-family:"Times New Roman", Times, serif;
}

.banner img {
    width: 100%;
    height: 100%;
}

.common_area {
    width: 100%;
    display: flex;
    flex-flow: wrap;
    align-content: flex-start;
    margin-top: 3px;
    background-color: whitesmoke;
}

.mod_title {
    width: 375px;
    height: 20px;
    text-align: center;
}

.mod_title span::before {
    content: '--------';
    position: absolute;
    left: 0;
    top: 50%;
}

.mod_title span {
    position: relative;
    color: rgb(15, 15, 15);
}

.category {
    --n: 4;
    --w: 75;
    width: 75px;
    height: 100px;
    display: flex;
    align-items: center;
    flex-direction: column;
    margin: 5px calc((100% - 75px * 4) / var(--n) / 2);
}

.preview_img {
    width: 75px;
    height: 75px;
}
.preview_img img {
    width: 100%;
    height: 100%;
    border-radius: 10px;
}

.introductory p {
    /* white-space: normal; */
    display: -webkit-box;
    -webkit-box-orient: vertical;
    overflow: hidden;
    -webkit-line-clamp: 2;
    line-clamp: 2;
    font-size: 8px;
    width: 100%;
    text-overflow: ellipsis;
}

.goods {
    width: 100%;
    display: flex;
    justify-content: space-between;
    border-top: #fff 2px solid;
    box-sizing: border-box;
}

.good_img {
    width: 130px;
    height: 130px;
    padding: 8px;
}
.good_img img {
    width: 100%;
    height: 100%;
    border-radius: 10px;
}

.good_dec {
    flex: 1;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
}

.good_dec p, span {
    width: 100%;
    padding: 8px;
    text-align: left;
}

.good_dec p {
    font-size: 14px;
}

.price {
    color: red;
}

.nums {
    color: rgb(109, 108, 108);
}
</style>
