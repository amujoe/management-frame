/*
 * @Author: amujoe
 * @Date: 2020-03-17 19:19:55
 * @Description: file content
 */
import Vue from "vue";
import Router from "vue-router";
import Routes from "./router/Index";

Vue.use(Router);

export default new Router({
  mode: "history",
  base: process.env.BASE_URL,
  routes: Routes
});
