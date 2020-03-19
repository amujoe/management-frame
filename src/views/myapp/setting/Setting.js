/*
 * @Author: amujoe
 * @Date: 2020-03-16 12:01:42
 * @Description: file content
 */
import Account from "./account/Account.js"
import Authorize from "./authorize/Authorize.js"
import Password from "./password/Password.js"

export default {
  icon: "", // 菜单以及权限验证所显示的 icon
  cname: "设置", // 菜单以及权限验证所显示的中文名 （*必填）
  ename: "setting", // 权限验证所使用的 key 值，同时还可当作 name 在路由跳转中使用 （*必填）
  description: "设置", // 模块描述
  is_show: true, // 是否显示在菜单
  is_authorization: true, // 是否要进行权限验证
  subset: [Account, Authorize, Password]
};
