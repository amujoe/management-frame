<template lang="pug">
.list-content
    .list-header
      span.list-title 修改密码
    .list-main
      el-form.box(:model="info", label-width="80px", ref="info", :rules="rules")
        el-form-item(label="原始密码", prop="password_old")
          el-input(v-model="info.password_old", size="medium", type="password", maxlength="16")
        el-form-item(label="新密码", prop="password_new")
          el-input(v-model="info.password_new", size="medium", type="password", maxlength="16")
        el-form-item(label="确认密码", prop="password_again")
          el-input(v-model="info.password_again", size="medium", type="password", maxlength="16")
        el-form-item
          el-button(size="small", @click="cancel") 取消
          el-button(type="primary", size="small", @click="onSubmit") 保存
      
</template>

<script>
import Api from "@/api/Setting";
export default {
  name: "password",
  data() {
    // 确认密码校验
    const checkRange = (rule, value, callback) => {
      if (value !== this.info.password_new) {
        callback(new Error("两次密码不相同"));
      } else {
        callback();
      }
    };
    // 新密码校验
    const checkRange2 = (rule, value, callback) => {
      if (value.length < 6) {
        callback(new Error("密码长度应在6-16位之间"));
      } else {
        callback();
      }
    };
    return {
      info: {
        password_old: "",
        password_new: "",
        password_again: ""
      },
      rules: {
        password_old: [
          {
            validator: checkRange2,
            trigger: ["blur", "change"]
          }
        ],
        password_new: [
          {
            validator: checkRange2,
            trigger: ["blur", "change"]
          }
        ],
        password_again: [
          {
            validator: checkRange,
            trigger: ["blur", "change"]
          }
        ]
      }
    };
  },
  methods: {
    cancel() {
      this.$router.go(-1);
    },
    onSubmit() {
      this.$refs["info"].validate(valid => {
        if (valid) {
          this.setPassword();
        } else {
          return false;
        }
      });
    },
    async setPassword() {
      let _this = this;
      Api.setPswdApi({
        old_password: _this.info.password_old,
        password: _this.info.password_new,
        re_password: _this.info.password_again
      }).then(() => {
        this.$message({
          type: "success",
          message: "修改成功"
        });
        this.$router.push({
          name: "login"
        });
      });
    }
  }
};
</script>

<style lang="stylus" scoped>
.box {
  width: 400px;
  padding-top: 20px;
}

.main-content {
  padding: 30px;
}

.footer {
  text-align: left;
  padding-left: 80px;
}
</style>
