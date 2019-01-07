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
        @select="")
        el-menu-item(v-for="(menu, index) in list", :key="index", v-text="menu.value", :index="menu.path")
    .user
      span.name(v-text="USER.username")
      span.quit(@click="logout") 退出
</template>

<script>
import { mapActions, mapGetters } from "vuex";
export default {
  name: "HeaderMenu",
  data() {
    return {
      activeIndex: "/home",
      list: [
        {
          name: "home",
          path: "/home",
          value: "首页"
        },
        {
          name: "mall",
          path: "/mall",
          value: "商城管理"
        },
        {
          name: "setting",
          path: "/setting",
          value: "设置"
        }
      ]
    };
  },
  methods: {
    ...mapActions("MENU", ["setMenuTop"]),
    // 退出
    async logout() {
      this.$router.push({
        name: "login"
      });
      // Api.logout().then(() => {
      //   this.$router.push({
      //     name: "login"
      //   });
      // });
    }
  },
  computed: {
    ...mapGetters("USER", {
      USER: "getUserInfo"
    })
  },
  mounted() {
    this.activeIndex = "/" + this.$route.path.split("/")[1];
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
