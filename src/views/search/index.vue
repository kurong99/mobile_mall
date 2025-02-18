<template>
  <div class="search">
    <div class="top">
      <van-nav-bar
        title="商品搜索"
        left-text="返回"
        left-arrow
        @click-left="onClickLeft"
      />
    </div>
    <div class="search_input">
      <van-search v-model="value" style="flex:1" placeholder='请输入搜索关键词' />
      <button class="search_button" @click="search_handle">搜索</button>
    </div>
    <div class="search_content">
      <div class="tips" v-if="!value">
        <span>最近搜索：</span>
        <van-icon name="delete-o" />
      </div>
      <div class="tips" v-else>
        <span class="sort">综合</span>
        <span class="sort">销量</span>
        <span class="sort">价格</span>
      </div>
      <div class="search_records" v-if="!value">
        <div class="search_item" v-for="(item, index) in beforeValue" :key="index">{{ item }}</div>
      </div>
      <div class="show_search" v-else>
        <div class="goods" v-for="good in goods" :key="good.id">
            <div class="good_img">
                <img :src="good.img" alt="#">
            </div>
            <div class="good_dec">
                <p style="font-weight: 800">{{ good.title }}</p>
                <p>{{ good.desc }}</p>
                <span class="nums">库存：{{ good.nums }}件</span>
                <span class="price">￥{{ good.price }}</span>
            </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'SearchIndex',
  data () {
    return {
      value: '',
      isSearch: false,
      beforeValue: [],
      goods: [
        {
          id: 1,
          title: 'HUAWEI Mate 60 RS 非凡大师',
          img: 'https://consumer.huawei.com/content/dam/huawei-cbg-site/cn/mkt/plp/launch/230925/phones/mate60-rs-ultimate-design-all.jpg',
          price: 11999,
          nums: 54354,
          desc: '革新技术，蕴含巧思；尖端工艺，探索极限，以科技勾勒纤薄，造就全球首个三折叠屏手机⁠1。'
        },
        {
          id: 2,
          title: ' HUAWEI Mate X5',
          img: 'https://consumer.huawei.com/content/dam/huawei-cbg-site/cn/mkt/plp/mate-x5/all-x5.jpg',
          price: 5699,
          nums: 11413,
          desc: '寰宇星门设计，凌厉线条与张力圆环结合，兼容并蓄，包容万⁠象，于无边寰宇中无畏探⁠索'
        },
        {
          id: 3,
          title: ' HUAWEI Mate 60 Pro+',
          img: 'https://consumer.huawei.com/content/dam/huawei-cbg-site/cn/mkt/plp/mate60-pro-plus/mate60-pro-plus-all.jpg',
          price: 4199,
          nums: 9990,
          desc: '丹青弧，一笔浓墨重彩，开启时代之作。纳米级金属双染工艺⁠3，高端精致，浑然天成。'
        }
      ]
    }
  },
  methods: {
    onClickLeft () {
      this.$router.back()
    },
    search_handle () {
      const value = this.value
      this.beforeValue.push(value)
      this.beforeValue = Array.from(new Set(this.beforeValue))
    }
  }
}
</script>

<style scoped>

.search {
  width: 100%;
  height: 100vh;
  background-color: whitesmoke;
  overflow-x: hidden;
  display: flex;
  flex-direction: column;
}

.search_content {
  width: 100%;
  padding: 10px;
  flex: 1;
  overflow-y: auto;
}

.tips {
  display: flex;
  justify-content: space-between;
  align-items: baseline;
}

.search_records {
  display: flex;
  padding: 10px;
  flex-wrap: wrap
}

.search_item {
  --n: 4;
  width: 75px;
  height: 30px;
  overflow: hidden;
  background-color: rgb(198, 202, 202);
  border-radius: 60px;
  margin: 5px calc((100% - 75px * var(--n)) / var(--n) / 2);
  line-height: 30px;
  color: #202020;
  font-size: 10px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  text-align: center;
}

.sort {
  text-align: center;
}

.goods {
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-top: #fff 5px solid;
  padding: 0 10px;
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
    width: 250px;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
}

.good_dec p {
    width: inherit;
    padding: 8px;
    text-align: left;
}

.good_dec p {
  width: inherit;
  padding: 8px;
  text-align: left;
  font-size: 14px;
}

.price {
  color: red;
  width: inherit;
  padding: 8px;
  text-align: left;
}

.nums {
    color: rgb(109, 108, 108);
}

.search_input {
  display: flex;
  align-items: center;
  margin-top: 10px;
}

.search_button {
  width: 80px;
  height: 54px;
  border: none;
  background-color: chocolate;
  border-radius: 0 5px 5px 0;
}

:root {
  --scrollbar-width: calc(100vw - 100%);
}

body {
  overflow-y: scroll;
  padding-right: var(--scrollbar-width);
}

.search_content::-webkit-scrollbar {
  width: 6px;
}

.search_content::-webkit-scrollbar-track {
  background: #f1f1f1;
}

.search_content::-webkit-scrollbar-thumb {
  background: #888;
  border-radius: 3px;
}

@media screen and (max-width: 375px) {
  .good_img {
    width: 100px;
    height: 100px;
  }

  .good_dec {
    width: calc(100% - 120px);
  }
}
</style>
