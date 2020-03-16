<template lang="pug">
  .list-content
    .list-header
      span.list-title 微信授权 
    .list-main
      .form-title
        .title 完成微信授权，开通更多业务
      .authorization-list
        .authorization-item
          .type-info
            .icon.icon-enterprise-wechat-mini 
            .heading 企业微信工作台小程序
            .content 完成微信小程序授权，开通企业微信工作台小程序
          .state-info
            template
              span.state.state-red 未授权
              a.go-accredit(:href="work_auth_detail.auth_url")
              el-button.default-button(size="small", type="primary", @click="") 前往授权
            template(v-if="work_auth_detail.installed")
              span.state.state-blue 已授权
              el-button.default-button 查看详情
              el-button.default-button 完善信息 
      .authorization-list
          .authorization-item
            .type-info
              .icon.icon-store-mini
              .heading 线上商城小程序
              .content 完成微信小程序授权，开通线上商城小程序
            .state-info
              template
                span.state.state-blue 已授权
                el-button.default-button 查看详情
                el-button.default-button 完善信息
      .authorization-list
        .authorization-item
          .type-info
            .icon.icon-enterprise
            .heading 企业微信
            .content 完成企业微信通讯录应用授权，开通客户管理服务
          .state-info
            template
              span.state.state-blue 已授权
              el-button.default-button(size="small", @click="goDetail(3)") 查看详情
</template>

<script>
export default {
  name: "authorize",
  data() {
    return {
      current_href: "",
      work_auth_detail: {}, // 企业微信小程序授权详情
      shop_auth_detail: {}, // 商城小程序授权详情
      contact_detail: {}, // 企业微信授权详情
      domain: "" // domain
    };
  },
  methods: {},
  mounted() {}
};
</script>

<style lang="stylus" scoped>
.content-block {
  padding: 30px;

  .form-title {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding-bottom: 22px;

    .title {
      font-size: 16px;
    }

    .question {
      font-size: 13px;
      color: #909399;

      i {
        font-size: 15px;
      }
    }
  }

  .content-form {
    margin-top: 20px;
  }

  .font-14 {
    font-size: 14px;
    color: #606266;
  }
}

.authorization-list {
  width: 100%;
  border-bottom: 1px solid #EBEEF5;

  .authorization-item {
    position: relative;
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 94px;
    padding-left: 20px;

    &::after {
      content: '';
      position: absolute;
      left: 0;
      bottom: 0;
      width: 100%;
      border-top: 1px solid rgba(0, 0, 0, 0.08);
    }

    &:last-child::after {
      display: none;
    }

    &.without-border {
      &::after {
        display: none;
      }
    }

    .type-info {
      position: relative;
      height: 38px;
      padding: 28px 0;
      padding-left: 76px;

      .icon {
        position: absolute;
        left: 0;
        top: 0;
        bottom: 0;
        margin: auto;
        width: 48px;
        height: 48px;
        border-radius: 48px;
        background: #e4e4e4 center no-repeat;
        background-size: contain;

        &.icon-enterprise-wechat-mini {
          background-image: url('~@/assets/setting/authorize-icon01.png');
        }

        &.icon-store-mini {
          background-image: url('~@/assets/setting/authorize-icon02.png');
        }

        &.icon-enterprise {
          background-image: url('~@/assets/setting/authorize-icon03.png');
        }
      }

      .heading {
        font-size: 16px;
        line-height: 1;
        margin-bottom: 10px;
        color: #3A3B3D;

        .tip {
          padding: 0 3px;
          color: placeholder;
        }
      }

      .content {
        font-size: 14px;
        line-height: 1;
        color: #606266;
        font-weight: 500;
      }
    }

    .state-info {
      position: relative;

      .state {
        display: inline-block;
        vertical-align: middle;
        padding-right: 24px;
        font-size: 14px;
        line-height: 40px;
      }

      .state-blue {
        color: #0486FE;
      }

      .state-red {
        color: #F56C6C;
      }

      .go-accredit {
        position: absolute;
        width: 80px;
        height: 42px;
        opacity: 0;
        right: 0;
      }
    }
  }
}

.empty-box {
  min-height: 400px;
  background: #ffffff;
  position: relative;

  .box {
    width: 200px;
    height: 200px;
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    margin: auto;
    font-size: 16px;
    text-align: center;

    .font-line {
      padding-top: 20px;
      text-align: center;
    }
  }
}
</style>
