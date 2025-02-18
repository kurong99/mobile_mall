import Vue from 'vue'
import Vuex from 'vuex'
import { httpPost } from '@/untils/request'

Vue.use(Vuex)

// 封装一个查找商品index的方法
const findNum = (cart, good) => {
  return cart.findIndex((item) => item.id === good.id)
}

// 封装一个查找被选中商品id的方法
// const getId = (item) => {
//   if (item.isChecked === true) {
//     return item.id
//   }
// }

export default new Vuex.Store({
  state: {
    // 登录状态
    isLogin: false,
    userinfo: {},
    // 购物车数据
    cart: [],
    orders: {
      orderList: [],
      payment: 0
    }
  },
  getters: {
    cart: (state) => state.cart,
    goodCount: (state) => state.count,
    message: (state) => state.message,
    isLogin: (state) => state.isLogin,
    info: (state) => state.userinfo
  },
  mutations: {
    // 更改登录状态
    login (state, flag) {
      state.isLogin = flag
    },
    // 保存登录信息
    setUserInfo (state, res) {
      state.userinfo = res
    },
    changeCart (state, res) {
      const { data, code } = res
      // 如果存在，则增加其数量；如果不存在，则将新商品添加到购物车
      const exitingProuct = state.cart.find(item => item.id === data.id)
      if (code === 200) {
        if (exitingProuct) {
        // 有则增加该商品数量
          exitingProuct.count += data.count
        } else {
          // 没有则添加进购物车
          state.cart.push(data)
        }
        // 提示信息
        // state.message = message
      }
    },
    //  在购物车中增加选中商品的数量
    inCrease (state, good) {
      const targetIndex = findNum(state.cart, good)
      state.cart[targetIndex].count++
    },
    //  在购物车中减少选中商品的数量
    deCrease (state, good) {
      const targetIndex = findNum(state.cart, good)
      state.cart[targetIndex].count--
    },
    // 在购物车中删除选中商品
    delete (state, good) {
      if (!good) return
      const targetIndex = findNum(state.cart, good)
      // 判断删除的单个商品还是多个商品
      if (Array.isArray(good)) {
        // 第一种
        // for (const checkGood of good) {
        //   const targetIndex = findNum(state.cart, checkGood)
        //   state.cart.splice(targetIndex, 1)
        // }
        // 第二种 不可行 但居然能正常删除
        // state.cart = state.cart.filter(item => good.includes(item.id))
        // 第三种
        state.cart = state.cart.filter(item => !good.some(g => g.id === item.id))
      } else {
        // splice会改变原数组 并返回删除的元素
        state.cart.splice(targetIndex, 1)
      }
    },
    // 保存订单信息
    generateOrder (state, goodsInfo) {
      const { goods, price } = goodsInfo
      // 带上商品总价格
      state.orders.payment = price
      state.orders.orderList.push(...goods)
    }
  },
  actions: {
    async addCart (context, payload) {
      const res = await httpPost('http://localhost:8081/addCart', payload)
      context.commit('changeCart', res)
      // 返回提示信息
      return res.message
    }
  },
  modules: {
  }
})
