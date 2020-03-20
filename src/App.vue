<template>
  <div id="app">
    <van-nav-bar
      title="标题"
      left-text="返回"
      right-text="按钮"
      left-arrow
      @click-left="onClickLeft"
      @click-right="onClickRight"
    />

    <router-view />
    <van-tabbar v-model="tabSelected" :fixed="false">
      <van-tabbar-item replace to="/" icon="home-o">木架</van-tabbar-item>
      <van-tabbar-item replace to="/pillow" icon="points">垫子</van-tabbar-item>
      <van-tabbar-item replace to="/cart" icon="shopping-cart-o">订单</van-tabbar-item>
      <van-tabbar-item replace to="/options" icon="setting-o">选项</van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>
export default {
  name: "App",
  data() {
    return {
      tabSelected: ""
    };
  },
  methods: {
    onClickLeft() {
      this.$router.go(-1);
    },
    onClickRight() {}
  }
};
</script>
<style>
</style>
