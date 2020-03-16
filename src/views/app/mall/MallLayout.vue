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
  name: "mallLayout",
  components: {
    Sidebar
  },
  data() {
    return {
      list: [
        {
          name: "商品管理",
          icon: "",
          path: "/mall",
          childs: [
            {
              name: "商品列表",
              icon: "",
              path: "/mall/goodsList",
              childs: []
            },
            {
              name: "新建商品",
              icon: "",
              path: "/mall/goodsCreate",
              childs: []
            }
          ]
        }
      ]
    };
  },
  methods: {}
};
</script>
