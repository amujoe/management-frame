/*
 * @Author: amujoe
 * @Date: 2020-03-13 18:22:11
 * @Description: file content
 */
import AccountList from "@/views/app/setting/account/List.vue";
import AccountCreate from "@/views/app/setting/account/Create.vue";

export default [
  {
    path: "/setting/accountList",
    name: "accountList",
    component: AccountList
  },
  {
    path: "/setting/accountCreate",
    name: "accountCreate",
    component: AccountCreate
  },
  {
    path: "/",
    redirect: { name: "accountList" }
  }
];
