<template lang="pug">
  .form-content
    .form-header
      span.list-title 商品创建
    .form-main
      el-form(:model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="ruleForm" size="medium")
        el-form-item(label="活动名称" prop="name")
          el-input(v-model="ruleForm.name" maxlength="16")
        el-form-item(label="活动区域" prop="region")
          el-select(v-model="ruleForm.region" placeholder="请选择活动区域" style="width: 100%;")
            el-option(label="区域一" value="shanghai")
            el-option(label="区域一" value="beijing")
        el-form-item(label="活动时间" required)
          el-col(:span="11")
            el-form-item(prop="date1")
              el-date-picker(type="date" placeholder="选择日期" v-model="ruleForm.date1" style="width: 100%;")
          el-col(class="line" :span="2") -
          el-col(:span="11")
            el-form-item(prop="date2")
              el-time-select(:picker-options="{start: '08:30',step: '00:15',end: '18:30'}" placeholder="选择时间" v-model="ruleForm.date2" style="width: 100%;")
        el-form-item(label="即时配送" prop="delivery")
          el-switch(v-model="ruleForm.delivery")
        el-form-item(label="活动性质" prop="type")
          el-checkbox-group(v-model="ruleForm.type")
            el-checkbox(label="美食/餐厅线上活动" name="type")
            el-checkbox(label="地推活动" name="type")
        el-form-item(label="特殊资源" prop="resource")
          el-radio-group(v-model="ruleForm.resource")
            el-radio(label="线上品牌商赞助")
            el-radio(label="线下场地免费")
        el-form-item(label="活动形式" prop="desc")
          el-input(type="textarea" v-model="ruleForm.desc")
        el-form-item
          el-button(@click="cancel") 取消
          el-button(type="primary" @click="submitForm('ruleForm')") 保存
</template>

<script>
export default {
  name: "goodslist",
  data() {
    return {
      ruleForm: {
        name: "",
        region: "",
        date1: "",
        date2: "",
        delivery: false,
        type: [],
        resource: "",
        desc: ""
      },
      rules: {
        name: [
          { required: true, message: "请输入活动名称", trigger: "blur" },
          { min: 3, max: 5, message: "长度在 3 到 5 个字符", trigger: "blur" }
        ],
        region: [{ required: true, message: "请选择活动区域", trigger: "change" }],
        date1: [{ type: "date", required: true, message: "请选择日期", trigger: "change" }],
        date2: [{ type: "string", required: true, message: "请选择时间", trigger: "change" }],
        type: [{ type: "array", required: true, message: "请至少选择一个活动性质", trigger: "change" }],
        resource: [{ required: true, message: "请选择活动资源", trigger: "change" }],
        desc: [{ required: true, message: "请填写活动形式", trigger: "blur" }]
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
