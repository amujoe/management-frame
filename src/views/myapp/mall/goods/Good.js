/*
 * @Author: amujoe
 * @Date: 2020-03-16 12:01:42
 * @Description: file content
 */
import GoodsList from "./list/List"
import GoodsCreate from "./create/Create"

export default {
  icon: "", // 菜单以及权限验证所显示的 icon
  cname: "商城管理", // 菜单以及权限验证所显示的中文名 （*必填）
  ename: "goods", // 权限验证所使用的 key 值，同时还可当作 name 在路由跳转中使用 （*必填）
  description: "商城", // 模块描述
  is_show: true, // 是否显示在菜单
  is_authorization: true, // 是否要进行权限验证
  subset: [GoodsList, GoodsCreate]
};
