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
      <div class="tips" v-if="!isSearch">
        <span>最近搜索：</span>
        <van-icon name="delete-o" @click="removeHistory" />
      </div>
      <div class="tips" v-else>
        <span class="sort" @click="sortBy(1)">综合<van-icon v-if="flag === 1" name="arrow-down" /></span>
        <span class="sort" @click="sortBy(2)">销量<van-icon v-if="flag === 2" name="arrow-down" /></span>
        <span class="sort" @click="sortBy(3)">价格<van-icon v-if="flag === 3" name="arrow-down" /></span>
      </div>
      <div class="search_records" v-if="!isSearch">
        <div class="search_item" v-for="(item, index) in beforeValue" :key="index" @click="useHistory(item)">{{ item }}</div>
      </div>
      <div class="show_search" v-else>
        <div class="goods" v-for="good in goods" :key="good.id" @click="toGoodDetail(good.id)">
            <div class="good_img">
                <img :src="good.imgs[0]" alt="#">
            </div>
            <div class="good_dec">
                <p style="font-weight: 800">{{ good.title }}</p>
                <!-- <p>{{ good.desc[0] }}</p> -->
                <span class="nums">库存：{{ good.nums }}件</span>
                <span class="price">￥{{ good.price }}</span>
            </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { httpPost } from '@/untils/request'

export default {
  name: 'SearchIndex',
  created () {
    const searchHistory = localStorage.getItem('history')
    if (searchHistory) {
      this.beforeValue = JSON.parse(searchHistory)
    }
  },
  data () {
    return {
      value: '',
      isSearch: false,
      beforeValue: [],
      goods: [],
      flag: 1
    }
  },
  methods: {
    onClickLeft () {
      this.$router.back()
    },
    async search_handle () {
      this.isSearch = true
      if (this.value) {
        this.beforeValue.push(this.value)
        this.beforeValue = Array.from(new Set(this.beforeValue))
        localStorage.setItem('history', JSON.stringify(this.beforeValue), 7)
      }
      const response = await httpPost('/search', { word: this.value })
      if (response.products.length === 0) {
        // 展示默认
        this.$toast('暂未识别到您搜索的商品，已为您显示上一次搜索内容')
      } else {
        this.goods = response.products
      }
      // 默认按综合排序
      this.sortBy(1)
    },
    toGoodDetail (id) {
      this.$router.push({ name: 'detail', params: { id } })
    },
    removeHistory () {
      this.beforeValue = []
      localStorage.setItem('history', [])
    },
    useHistory (item) {
      this.value = item
      this.search_handle()
    },
    // 商品排序
    sortBy (num) {
      this.flag = num
      const map = new Map([[1, 'id'], [2, 'nums'], [3, 'price']])
      this.goods.sort((a, b) => a[map.get(num)] - b[map.get(num)])
    }
  },
  watch: {
    value: {
      handler (val) {
        if (!val) {
          this.isSearch = false
        }
        return val
      }
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
    width: 180px;
    height: 130px;
    padding: 8px;
}
.good_img img {
    width: 100%;
    height: 100%;
    border-radius: 10px;
}

.good_dec {
    width: 200px;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
}

.good_dec p, span {
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
