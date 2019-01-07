<template lang="pug">
  div.form-con
    .form-header
      el-button(size="small")
        i(class="el-icon-arrow-left")
        span 返回
      el-button(size="medium")
        i(class="el-icon-arrow-left")
        span 返回
    .form-box
      el-form(:model="info", label-width="80px")
        el-form-item(label="任务名称")
          el-input(v-model="info.passwordOld", size="small")
        el-form-item(label="任务类型")
          el-select(v-model="info.passwordNew", placeholder="请选择", filterable, size="medium")
            el-option(
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value")
        el-form-item(label="确认密码")
          el-input(v-model="info.passwordAgain")
        el-form-item
          el-button(type="primary", @click="onSubmit") 保存
          el-button(@click="onSubmit") 取消
      
</template>

<script>
export default {
  name: "password",
  data() {
    return {
      options: [
        {
          value: "选项1",
          label: "黄金糕"
        },
        {
          value: "选项2",
          label: "双皮奶"
        }
      ],
      info: {
        passwordOld: "",
        passwordNew: "",
        passwordAgain: ""
      }
    };
  },
  methods: {
    onSubmit() {
      console.log("修改密码", this.info);
    }
  }
};
</script>

<style lang="stylus" scoped>
.form-con {
  padding: 20px 50px;

  .form-box {
    padding-top: 50px;
    border: 1px solid #ccc;

    .el-form {
      width: 600px;
    }
  }
}
</style>
