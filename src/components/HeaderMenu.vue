<template lang="pug">
  .header
    .main
      .logo
        span 管理平台
      el-menu(:default-active="activeIndex", 
        mode="horizontal",
        background-color="#353943"
        text-color="#B8C3D1"
        active-text-color="#fff"
        router = true
        @select="selectMenu")
        el-menu-item(v-for="(menu, index) in list", 
          :key="index", 
          v-text="menu.value", 
          :index="menu.path"
          )
    .user
      <!-- span.name(v-text="USER.username") -->
      span.quit(@click="logout") 退出
</template>

<script>
import { mapActions, mapGetters } from "vuex";
export default {
  name: "HeaderMenu",
  data() {
    return {
      activeIndex: "/home",
      list: []
    };
  },
  computed: {
    ...mapGetters("MENU", {
      MENU: "getMenu",
      MENU_TOP: "getMenuTop"
    }),
    ...mapGetters("USER", {
      USER: "getUserInfo"
    }),
  },
  methods: {
    ...mapActions("MENU", ["setMenuLeft", "setMenuTop"]),
    // 选中头部按钮
    selectMenu(e) {
      this.setActive(e)
      this.MENU.forEach(i => {
        if(e.indexOf(i.path) > -1 && i.children){
          this.setMenuLeft(i.children)
        }
      })
    },
    // 设置当前
    setActive(path){
      this.list.some(i => {
        if(path.indexOf(i.path) > -1){
          this.activeIndex = i.path
        }
        return path.indexOf(i.path) > -1
      })
    },
    // 设置头部按钮
    initMenu() {
      let list = []
      this.MENU.forEach(i => {
        if(i.meta.is_show) {
        	let o = {
        		name: i.name,
        		value: i.value
        	}
          if(i.children && i.children.length) {
            o.path = i.children[0].path
          } else {
            o.path = i.path
          }
        	list.push(o)
        }
      })
      this.list = list
      this.setMenuTop(list)
    },
    // 退出
    async logout() {
      this.$router.push({
        name: "login"
      });
    }
  },
  mounted() {
    this.initMenu()
    this.setActive(this.$route.path)
  }
};
</script>

<style scoped lang="stylus">
.header {
  width: 100%;
  box-sizing: border-box;
  display: flex;
  min-width: 980px;
  align-items: center;
  justify-content: space-between;
  color: #fff;
  background: #353943;
  position: fixed;
  top: 0;
  left: 0;
  height: 60px;
  z-index: 10;
  padding: 0 20px 0 50px;
}

.main {
  display: flex;
  justify-content: flex-start;

  .logo {
    line-height: 60px;

    img {
      height: 34px;
      vertical-align: middle;
    }
  }

  .el-menu {
    margin-left: 60px;
  }
}

.user {
  line-height: 60px;

  .name {
    display: inline-block;
    position: relative;
    padding-right: 14px;

    &::after {
      display: block;
      content: '';
      width: 2px;
      height: 12px;
      background: #fefefe;
      position: absolute;
      right: 6px;
      top: 50%;
      margin-top: -6px;
    }
  }

  .quit {
    display: inline-block;
    cursor: pointer;
  }
}
</style>
