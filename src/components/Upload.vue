<template>
  <div style="min-height:636px">
    <van-nav-bar :title="navTitle" left-text="返回" left-arrow @click-left="onClickLeft" />
    <van-uploader
      :after-read="afterRead"
      accept=".xlsx, xls"
      :before-read="beforeRead"
      max-size="2*1024*1024"
      result-type="file"
    >
      <van-button icon="orders-o" type="primary">上传文件</van-button>
    </van-uploader>
  </div>
</template>
<script>
import { Toast } from "vant";
import uploadFile from "../util/upload";
import { dev } from "../../config/index";
export default {
  name: "Upload",
  data() {
    return {
      navTitle: "",
      stockName: ""
    };
  },
  created() {
    this.stockName = this.$route.params.type;
    if (this.stockName === "sofa_stock") {
      this.navTitle = "导出沙发";
    }
    if (this.stockName === "corner_stock") {
      this.navTitle = "导出转角";
    }
    if (this.stockName === "pillow_stock") {
      this.navTitle = "导出垫子";
    }
  },
  methods: {
    async afterRead(file) {
      const dataUrl = `${dev.host}${dev.port}/${this.stockName}/api/upload`;
      // 此时可以自行将文件上传至服务器
      // await uploadFile(file.file, dataUrl);
    },
    onClickLeft() {
      this.$router.go(-1);
    },
    beforeRead(file) {
      if (
        file.type !==
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
      ) {
        Toast("请上传xlsx/xls格式文件");
        return false;
      }
      return true;
    }
  }
};
</script>
<style></style>
