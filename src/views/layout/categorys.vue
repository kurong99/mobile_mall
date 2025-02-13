<template>
  <div class="category_area">
    <van-nav-bar title="全部分类" />
    <van-search placeholder="搜索商品" shape="round"/>
    <article>
      <div class="cate_bar">
        <van-sidebar v-model="activeKey">
          <van-sidebar-item v-for="cate in categorys" :key="cate.id" :title="cate.name" @click="toggleCate(cate.id, cate.nickName)" />
        </van-sidebar>
      </div>
      <div class="good_cate">
        <div class="common_area">
          <div class="category" v-for="product in products" :key="product.id" @click="toDetail(product.id)">
              <div class="preview_img">
                  <img :src="product.imgs[0]" alt="#">
              </div>
              <div class="introductory">
                  <p>{{ product.title }}</p>
              </div>
          </div>
        </div>
      </div>
    </article>
  </div>
</template>

<script>
import { httpGet } from '@/untils/request'

export default {
  name: 'CategorizeIndex',
  props: {
    id: Number,
    nickName: String
  },
  async created () {
    const { name, id } = this.$route.query
    // 选中分类
    this.activeKey = id || this.id
    const data = await httpGet('/categorys', { nickName: name || this.nickName })
    this.categorys = data.categorys
    // 展示对应分类下的产品
    this.products = this.categorys[this.activeKey].products
  },
  data () {
    return {
      activeKey: 0,
      categorys: [],
      products: []
    }
  },
  methods: {
    toggleCate (id, nickName) {
      // 切换分类展示对应商品
      this.activeKey = id
      // 更改路由显示
      // id为0时不显示对应路由参数
      id === 0 ? this.$router.replace({ name: 'categorys' }) : this.$router.replace({ name: 'categorys', query: { nickName, id } })
      this.products = this.categorys[this.activeKey].products
    },
    toDetail (id) {
      // 跳转到商品详情
      this.$router.push({ name: 'detail', params: { id } })
    }
  }
}
</script>

<style scoped>

article {
  display: flex;
  flex-direction: row;
}
.cate_bar {
  flex: 0;
}
.common_area {
    width: 300px;
    height: 660px;
    display: flex;
    flex: 1;
    flex-flow: wrap;
    align-content: flex-start;
    background-color: whitesmoke;
}

.category {
    --n: 3;
    --w: 75;
    width: 75px;
    height: 100px;
    display: flex;
    align-items: center;
    flex-direction: column;
    margin: 5px calc((100% - 75px * var(--n)) / var(--n) / 2);
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
    display: -webkit-box;
    -webkit-box-orient: vertical;
    overflow: hidden;
    -webkit-line-clamp: 2;
    line-clamp: 2;
    font-size: 8px;
    width: 100%;
    text-overflow: ellipsis;
}
</style>
