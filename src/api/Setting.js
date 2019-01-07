import Vue from "vue";

const http = Vue.axios;

let apis = {
  // 企业微信小程序授权详情接口
  workAuthDetailApi(data) {
    return http("auth/work-auth-detail", {
      method: "POST",
      data: data
    });
  },
  // 商城小程序授权详情接口
  shopAuthDetailApi(data) {
    return http("auth/shop-auth-detail", {
      method: "POST",
      data: data
    });
  },
  // 通讯录授权详情接口
  shopAuthContactApi(data) {
    return http("auth/auth-contact", {
      method: "POST",
      data: data
    });
  },
  // 企业微信小程序完善信息接口
  workAuthCompleteApi(data) {
    return http("auth/work-auth-complete", {
      method: "POST",
      data: data
    });
  },
  // 商城小程序完善信息接口
  shopAuthCompleteApi(data) {
    return http("auth/shop-auth-complete", {
      method: "POST",
      data: data
    });
  },
  // 保存支付配置
  setPayApi(data) {
    let formdata = new FormData();
    formdata.append("private_key", data.private_key);
    formdata.append("public_key", data.public_key);
    formdata.append("merchant_id", data.merchant_id);
    formdata.append("merchant_key", data.merchant_key);
    return http("payment/save", {
      method: "POST",
      data: formdata
    });
  },
  // 获取支付配置
  getPayApi() {
    return http("payment/detail", {
      method: "GET"
    });
  },
  // 修改密码
  setPswdApi(data) {
    return http("admin/password", {
      method: "POST",
      data: data
    });
  }
};

export default apis;
