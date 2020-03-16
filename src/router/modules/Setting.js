/*
 * @Author: amujoe
 * @Date: 2020-03-13 17:26:28
 * @Description: file content
 */
import SettingLayout from "@/views/app/setting/SettingLayout.vue";
import Account from "./setting/Account";
import Authorize from "./setting/Authorize";
import Password from "./setting/Password";

export default [
  {
    path: "/setting",
    name: "setting",
    component: SettingLayout,
    children: [...Account, ...Authorize, ...Password]
  },
  {
    path: "/",
    redirect: { name: "setting" }
  }
];
