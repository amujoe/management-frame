/*
 * @Author: amujoe
 * @Date: 2020-03-13 18:22:11
 * @Description: file content
 */
import Account from "@/views/setting/account/Account.vue";

export default [
  {
    path: "/setting/account",
    name: "account",
    component: Account
  },
  {
    path: "/",
    redirect: { name: "account" }
  }
];
