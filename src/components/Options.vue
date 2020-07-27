<template>
  <div style="min-height:636px">
    <van-nav-bar :title="navTitle" left-text="返回" left-arrow @click-left="onClickLeft" />
  </div>
</template>

<script>
export default {
  name: "Options",
  props: ["navTitle"],

  data() {
    return {};
  },
  methods: {
    onClickLeft() {
      this.$router.go(-1);
    }
  }
};
</script>
<style></style>
