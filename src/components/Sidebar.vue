<template lang="pug">
    el-menu(
      text-color="#BFCBD8",
      active-text-color="#fff",
      background-color="#282a32",
      :default-active="activeIndex",
      :collapse="isCollapse",
      router=true)
      template(v-for="(menu, index) in list")
        //- 有子集
        el-submenu(v-if="menu.childs.length", :key="index", :index="index + ''")
          template(slot="title")
            i(:class="menu.icon")
            span(v-text="menu.name")
          el-menu-item-group
            el-menu-item(v-for="(item, item_index) in menu.childs"
              :key="item_index"
              :index="item.path"
              v-text="item.name")
        //- 无子集
        el-menu-item(v-if="!menu.childs.length", :key="index", :index="menu.path", @select="handleOpen")
          i(:class="menu.icon")
          span(v-text="menu.name")
</template>

<script>
export default {
  name: "Sidebar",
  props: {
    value: {
      type: Array,
      default() {
        return [];
      }
    }
  },
  data() {
    return {
      isCollapse: false, // 是否水平折叠收起菜单
      activeIndex: ""
    };
  },
  computed: {
    list() {
      return this.value;
    }
  },
  methods: {
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    }
  },
  mounted() {
    this.activeIndex = this.$route.path;
  }
};
</script>

<style lang="stylus" scoped>
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 200px;
  min-height: 400px;
}

.el-menu {
  border-right: none;
}

.el-menu-item-group {
  .el-menu-item {
    font-size: 12px;
  }
}
</style>
