import SettingLayout from "@/views/setting/SettingLayout.vue";

import Authorize from "./setting/Authorize";
import Password from "./setting/Password";

export default [
  {
    path: "/setting",
    name: "setting",
    component: SettingLayout,
    children: [...Authorize, ...Password]
  },
  {
    path: "/",
    redirect: { name: "setting" }
  }
];
