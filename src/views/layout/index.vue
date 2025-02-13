<template>
  <div class="layout">
    <router-view></router-view>
    <van-tabbar placeholder route active-color="#ee0a24" inactive-color="#000" custom-style="height: 50px;">
        <van-tabbar-item name="home" to='/home' icon="wap-home-o">首页</van-tabbar-item>
        <!-- 存在路由参数的时候 点击该项 不显示active状态  多个路由参数采用query传参 -->
        <van-tabbar-item name="categorys" to='/categorys' icon="apps-o">分类</van-tabbar-item>
        <van-tabbar-item name="cart" to='/shoppingcart' icon="shopping-cart-o">购物车</van-tabbar-item>
        <van-tabbar-item name="user" to='/user' icon="user-o">我的</van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>
export default {
  name: 'LayoutIndex'
}
</script>

<style>
.layout {
  width: 100vw;
  height: 100vh;
  /* background-color: whitesmoke; */
}
</style>
