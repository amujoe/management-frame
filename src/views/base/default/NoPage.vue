<template lang="pug">
  .no-page
    img(class="no-page-img" src="~@/assets/404.png")
    .no-page-title 抱歉，您查找的页面不存在
    .operation-box
      .text01 您可以：
      .text02(@click="goBack") 返回上一页
      .text03(@click="goHome") 前往平台首页
</template>
<script>
export default {
  name: "error",
  data() {
    return {};
  },
  methods: {
    // 返回上一页
    goBack() {
      window.history.back();
    },
    // 前往CRS管理平台首页
    goHome() {
      this.$router.replace({ name: "home" });
    }
  },
  mounted() {}
};
</script>
<style lang="stylus" scoped>
.no-page {
  position: relative;
  display: flex;
  padding-top: 150px;
  align-content: center;
  justify-content: center;
  flex-direction: column;
  text-align: center;

  .no-page-img {
    display: block;
    height: 275px;
    width: 360px;
    left: 0;
    right: 0;
    margin: auto;
    margin-bottom: 0;
    margin-top: 0;
  }

  .no-page-title {
    color: #606266;
    font-size: 20px;
    display: block;
  }

  .operation-box {
    font-size: 0;
    height: 14px;
    line-height: 1;
    display: inline-block;
    margin-top: 20px;

    .text01 {
      color: #909399;
      display: inline-block;
      font-size: 14px;
    }

    .text02 {
      color: #0486FE;
      display: inline-block;
      padding: 0 30px;
      cursor: pointer;
      font-size: 14px;
    }

    .text03 {
      color: #0486FE;
      display: inline-block;
      padding: 0 30px;
      cursor: pointer;
      font-size: 14px;
      border-left: 0.5px solid #BDBDBD;
    }
  }
}
</style>
