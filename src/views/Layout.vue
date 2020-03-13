<!--
 * @Author: amujoe
 * @Date: 2020-03-13 17:26:28
 * @Description: file content
 -->
<template lang="pug">
  el-container(style="height:100vh")
    el-header(style="padding:0")
      header-menu
    router-view
</template>

<script>
// @ is an alias to /src
import HeaderMenu from "@/components/HeaderMenu";

export default {
  name: "layout",
  components: {
    HeaderMenu
  }
};
</script>
