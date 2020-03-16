<template lang="pug">
  .form-content
    .form-header
      span.list-title 账号创建
    .form-main
      el-form(:model="info" :rules="rules" ref="info" label-width="100px" class="ruleForm" size="medium")
        el-form-item(label="账号名称" prop="name")
          el-input(v-model="info.name" maxlength="10")
        el-form-item(label="手机号" prop="phone")
          el-input(v-model="info.name" maxlength="11")
        el-form-item(label="验证码" prop="yzm")
          el-input(v-model="info.yzm")
        el-form-item
          el-button(@click="cancel") 取消
          el-button(type="primary" @click="submitForm('info')") 保存
</template>

<script>
export default {
  name: "goodslist",
  data() {
    return {
      info: {
        name: "",
        phone: "",
        yzm: ""
      },
      rules: {
        name: [
          { required: true, message: "请输入账号名称", trigger: "blur" },
          { min: 1, max: 10, message: "长度在 1 到 10 个字符", trigger: "blur" }
        ],
        phone: [
          { required: true, message: "请输入手机号", trigger: "change" },
          { min: 1, max: 11, message: "请输入正确的手机号", trigger: "change" }
        ],
        yzm: [
          { required: true, message: "请输入验证码", trigger: "change" },
        ]
      }
    };
  },
  methods: {
    // 取消
    cancel() {
      this.$router.go(-1);
    },
    // 保存
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          alert("submit!");
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    }
  },
  mounted() {
    // this.getInfoList();
  }
};
</script>

<style lang="stylus" scoped>
.ruleForm {
  width: 800px;
}

.line {
  text-align: center;
}
</style>
