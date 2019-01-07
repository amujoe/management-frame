<template lang="pug">
  .login
    .login-box
      .title 畅移·天鲟CRS管理系统
      el-input(v-model="info.account", maxlength=11, placeholder="请输入手机号", clearable)
      el-input(type="password", v-model="info.password", placeholder="请输入密码", @keyup.enter.native="goLogin", clearable)
      //- .remember
      //-   el-checkbox(v-model="remember") 记住密码
      el-button(@click="goLogin") 登录
</template>

<script>
import { mapActions } from "vuex";
// import Api from "@/api/Common";

export default {
  name: "login",
  data() {
    return {
      info: {
        account: "13260269999",
        password: "123456"
      },
      remember: false
    };
  },
  methods: {
    ...mapActions("USER", ["setUserInfo"]),
    goLogin() {
      if (!/^1\d{10}$/.test(this.info.account)) {
        this.$message({
          showClose: true,
          message: "手机号填写不正确",
          type: "error"
        });
        return;
      }
      if (!this.info.password) {
        this.$message({
          showClose: true,
          message: "密码不能为空",
          type: "error"
        });
        return false;
      }
      this.$message({
        showClose: true,
        message: "登录成功",
        type: "success"
      });
      this.$router.push({
        name: "home"
      });

      // Api.login(this.info).then(res => {
      //   this.$message({
      //     showClose: true,
      //     message: "登录成功",
      //     type: "success"
      //   });
      //   this.setUserInfo(res.data.data);
      //   this.$router.push({
      //     name: "home"
      //   });
      // });
    }
  },
  mounted() {}
};
</script>

<style lang="stylus">
.login {
  width: 100%;
  height: 100vh;
  background: url('../assets/login-bac.jpg');
  background-repeat: no-repeat;
  background-size: cover;
}

.login-box {
  position: fixed;
  left: 50%;
  top: 50%;
  width: 460px;
  height: 306px;
  border-radius: 4px;
  background: #fff;
  box-shadow: 0 0 25px rgba(0, 0, 0, 0.3);
  box-sizing: border-box;
  margin-top: -168px;
  margin-left: -230px;
  padding: 40px 60px;

  .title {
    font-size: 16px;
    color: #1989FA;
  }

  .el-input {
    margin-top: 20px;
  }

  .remember {
    margin: 30px 0;
  }

  .el-button {
    width: 100%;
    color: #fff;
    margin-top: 30px;
    background-color: #282A32;
    border-color: #282A32;
    box-shadow: 0 0 6px rgba(0, 0, 0, 0.2);
  }

  .el-button:hover, .el-button:focus {
    color: #fff;
    background-color: #282A32;
    border-color: #282A32;
  }

  input {
    text-indent: 0;
    padding-left: 0 !important;
    border-radius: 0px;
    border-left: none;
    border-right: none !important;
    border-top: none;
  }
}
</style>
