<!--
 * @Author: amujoe
 * @Date: 2020-03-13 17:26:28
 * @Description: file content
 -->
<template lang="pug">
  el-container
    el-aside(width="200px" style="border-right: 1px solid #e6e6e6")
      sidebar(v-model="list")
    el-main
      router-view
</template>

<script>
import Sidebar from "@/components/Sidebar";

export default {
  name: "home",
  components: {
    Sidebar
  },
  data() {
    return {
      list: [
        {
          name: "账号管理",
          path: "/setting/account",
          icon: "",
          childs: []
        },
        {
          name: "微信授权",
          path: "/setting/authorize",
          icon: "",
          childs: []
        },
        {
          name: "修改密码",
          path: "/setting/password",
          icon: "",
          childs: []
        }
      ]
    };
  },
  methods: {}
};
</script>
