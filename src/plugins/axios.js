"use strict";

import Vue from 'vue';
import axios from "axios";
import { Loading } from 'element-ui';

// loading 配置文件
const options = {
  fullscreen: true,
  background: "rgba(0,0,0,0.3)"
}
// loading 实例
let loadingInstance = null;

// Full config:  https://github.com/axios/axios#request-config
// axios.defaults.baseURL = process.env.baseURL || process.env.apiUrl || '';
// axios.defaults.headers.common['Authorization'] = AUTH_TOKEN;
// axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';

// api 配置
let config = {
  // baseURL: process.env.baseURL || process.env.apiUrl || ""
  baseURL: 'http://platform.dev.chedianai.com/' + 'admin/v1/auth/',
  timeout: 10000, // Timeout
  withCredentials: true, // Check cross-site Access-Control
};

const _axios = axios.create(config);

_axios.interceptors.request.use(
  function (config) {
    loadingInstance = Loading.service(options);
    console.log('request', config)
    // Do something before request is sent
    return config;
  },
  function (error) {
    console.log('request=error', error)
    // Do something with request error
    return Promise.reject(error);
  }
);

// Add a response interceptor
_axios.interceptors.response.use(
  function (response) {
    // Do something with response data
    console.log('response', response)
    loadingInstance.close()
    return response;
  },
  function (error) {
    // Do something with response error
    console.log('response-error', error)
    loadingInstance.close()
    if (error.response.status === 500 && error.response.data.error === "ERROR") {
      Message({
        type: "error",
        duration: 2000,
        message: error.response.data.message
      });
      // 登陆过期
      if(error.response.data.code === 200004){
        setTimeout(() => {
          window.location.href = window.location.origin + "/login"
        }, 2500)
      }
    }
    return Promise.reject(error);
  }
);

Plugin.install = function (Vue, options) {
  Vue.axios = _axios;
  window.axios = _axios;
  Object.defineProperties(Vue.prototype, {
    axios: {
      get() {
        return _axios;
      }
    },
    $axios: {
      get() {
        return _axios;
      }
    }
  });
};

Vue.use(Plugin);

export default Plugin;
