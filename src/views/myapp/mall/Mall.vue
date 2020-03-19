<template lang="pug">
  el-container
    el-aside(width="200px" style="border-right: 1px solid #e6e6e6")
      sidebar
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
};
</script>
