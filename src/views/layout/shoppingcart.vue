<template>
  <div class="shoppingcart">
    <van-nav-bar title="购物车" />
    <article>
      <van-nav-bar left-arrow>
        <template #left>
          共有 {{ totalCount }} 件商品
        </template>
        <template #right>
          <van-icon name="edit" size="16" @click="toggleEdit">{{ isEdit ? '完成' : '编辑' }}</van-icon>
        </template>
      </van-nav-bar>
      <div class="cart_list" v-if="goods.length">
        <div class="goods" v-for="item in goods" :key="item.id">
          <div class="checkBox">
            <van-checkbox checked-color="#EE7700" v-model="item.isChecked" @click="updateAll()"></van-checkbox>
          </div>
          <div class="good_img">
            <img :src="item.imgs[0]" :alt="item.title">
          </div>
          <div class="good_dec">
            <p>{{ item.title }}</p>
            <div class="nums">
              <span class="price">￥{{ item.price }}</span>
              <div class="btn_area">
                <button class="nums_change" @click="decrease(item)">-</button>
                <span class="nums_show">{{ item.count || 1 }}</span>
                <button class="nums_change" @click="increase(item)">+</button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="nothing" v-else>
        <van-empty
          class="custom-image"
          image="https://img01.yzcdn.cn/vant/custom-empty-image.png"
          description="购物车是空的..."
        />
      </div>
      <div class="sub_bar">
        <div class="left">
          <van-checkbox v-model="checkedAll" @click="selectAll" checked-color="#EE7700"></van-checkbox>
          全选
        </div>
        <div class="right">
          合计：<span class="total">￥{{ totalPrice }}</span>
          <button v-if="!isEdit" class="submit" @click="submitGoods" :disabled="goods.length <= 0">去结算({{ selectedCount }})</button>
          <button v-else class="submit" @click="deleteGoods" :disabled="goods.length <= 0">删除({{ selectedCount }})</button>
        </div>
      </div>
    </article>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'ShoppingCartIndex',
  created () {
    this.goods = this.cart
  },
  data () {
    return {
      isEdit: false,
      isChecked: false,
      checkedAll: false,
      goods: []
    }
  },
  computed: {
    // mapGetter辅助函数
    ...mapGetters(['cart']),
    totalCount () {
      return this.goods ? this.goods.length : 0
    },
    selectedCount () {
      return this.goods ? this.goods.filter(item => item.isChecked).length : 0
    },
    totalPrice () {
      return this.goods ? this.goods.filter(item => item.isChecked).reduce((total, item) => total + item.price * item.count, 0).toFixed(2) : '0.00'
    }
  },
  methods: {
    // 切换编辑按钮
    toggleEdit () {
      this.isEdit = !this.isEdit
    },
    // 全选
    selectAll () {
      // 全选时给每个item添加isChecked属性
      const newGoods = this.goods.map(item => {
        return {
          ...item,
          isChecked: this.checkedAll
        }
      })
      // 更新购物车商品状态
      this.goods = newGoods
    },
    // 勾选商品
    updateAll () {
      this.checkedAll = this.goods.length ? this.goods.every(item => item.isChecked) : false
    },
    // 增加购物车中选中商品数量
    increase (item) {
      if (item.count < item.nums) {
        this.$store.commit('inCrease', item)
      }
    },
    // 减少购物车中选中商品数量
    decrease (item) {
      if (item.count > 1) {
        this.$store.commit('deCrease', item)
      } else {
        this.$dialog.confirm({
          title: '',
          message: '确定删除该商品吗？'
        }).then(() => {
          // 确认删除
          this.$store.commit('delete', item)
        }).catch((e) => {
          // 取消
          return e
        })
      }
    },
    // 提交订单
    submitGoods () {
      const selectedItems = this.goods.filter(item => item.isChecked)
      if (selectedItems.length === 0) {
        this.$toast('请选择要购买的商品')
        return
      }
      // 跳转结算界面 并携带选中商品信息
      this.$router.push({ name: 'pay', params: { selectedItems } })
    },
    // 删除商品
    deleteGoods () {
      this.$dialog.confirm({
        title: '',
        message: '确定删除所选商品吗？'
      }).then(() => {
        // 确认删除
        const del = this.goods.filter(item => item.isChecked)
        this.$store.commit('delete', del)
        // 删除后切换回原来状态
        this.toggleEdit()
        this.checkedAll = false
        // 更新goods
        this.goods = this.cart
      }).catch((e) => {
        // 取消
        return e
      })
    }
  }
}
</script>

<style scoped>
.goods {
    /* 使用百分比宽度代替固定宽度 */
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: 5px;
    padding: 10px;
    background-color: whitesmoke;
    overflow: hidden;
    box-sizing: border-box; /* 确保padding不会导致溢出 */
}

.checkBox {
  width: 25px;
}

.good_img {
    width: 120px;
    height: 120px;
    padding: 8px;
}

.good_img img {
    width: 100%;
    height: 100%;
    border-radius: 10px;
}

.good_dec {
    /* 使用flex布局 */
    display: flex;
    flex-direction: column;
    align-items: flex-start;
}

.good_dec p, span {
    /* 使用百分比宽度 */
    width: 100%;
    padding: 5px;
    text-align: left;
}

.price {
  color: red;
}

.nums {
  width: 220px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.nums_change {
  width: 25px;
  height: 25px;
  border-radius: 15px;
  border: none;
  background-color: rgba(0, 0, 0, 0.2);
  font-size: 20px;
  line-height: 25px;
  cursor: pointer;
}

.nums_change:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.sub_bar {
  height: 55px;
  position: fixed;
  bottom: 50px;
  left: 0;
  right: 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
  background: #faf9f9;
  /* box-shadow: 0 -2px 10px rgba(0,0,0,0.1); */
}

.total {
  color: red;
  font-weight: 600;
}

.left {
  display: flex;
  justify-content: flex-start;
  align-items: center;
  gap: 10px;
}

.submit {
  width: 120px;
  height: 40px;
  background-color: rgb(252, 107, 4);
  border: none;
  border-radius: 20px;
  line-height: 40px;
  color: white;
  margin-left: 8px;
  cursor: pointer;
}

.submit:disabled {
  background-color: #ccc;
  cursor: not-allowed;
}

.btn_area {
  widows: 200px;
  display: flex;
}

.nums_show {
  width: 30px;
  text-align: center;
  color: black;
}

.cart_list {
  height: 615px;
  overflow: scroll;
}

.nothing {
  margin-top: 50px;
}

.custom-image .van-empty__image {
  width: 90px;
  height: 90px;
}
</style>
