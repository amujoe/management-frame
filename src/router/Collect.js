/*
 * @Author: amujoe
 * @Date: 2020-03-16 12:00:47
 * @Description: file content
 */
import menu from "@/views/myapp/MyApp"
import store from "../store/Index.js";

// export default {
//   icon: "", // 菜单以及权限验证所显示的 icon
//   cname: "商城", // 菜单以及权限验证所显示的中文名 （*必填）
//   ename: "shop", // 权限验证所使用的 key 值，同时还可当作 name 在路由跳转中使用 （*必填）
//   description: "商城", // 模块描述
//   is_show: true, // 是否显示在菜单
//   is_authorization: true, // 是否要进行权限验证
//   subset: [GoodsList, GoodsCreate]
// };

/**
 * 1. 格式转化
 * 1.1 path 路径 = ename / subset[0].ename
 * 1.2 name ename
 * 1.3 componet 
 * 1.4 mate = {
	 is_show: true,
	 is_authorization: false
 }
 */

const setComponent = path => {
 return () => import(`@/views/${path}`)
}

// 递归
/**
 * 递归格式化菜单
 * menu 是收集菜单
 * path 是根目录
 */
const recursion = (menu, path) => {
	if(Array.isArray(menu) && !!menu.length){
		// menu
		return menu.map(item => {
			let name = item.ename ? item.ename.toString() : ""
			let file_name = name.charAt(0).toUpperCase() + name.slice(1)
			let file_dir_path = path + `/${name}`
			let file_path = `${file_dir_path}/${file_name}.vue`
			let o ={
				name: file_dir_path.split("/").join("_").toLowerCase(),
				path: `/${path}/${name.toLowerCase()}`,
				// path: `/${name.toLowerCase()}`,
				value: item.cname,
        file_path: file_path,
				meta: {
					is_show: !!item.is_show,
					is_authorization: !!item.is_authorization,
					buttons: Array.isArray(item.buttons) ? item.buttons : []
				}
			}
      // component
      o.component = () => import(`@/views/${file_path}`)
			// children
			if(Array.isArray(item.subset) && !!item.subset.length) {
				let children = recursion(item.subset, file_dir_path)
				o.children = [
					...children,
					{
						path:'/',
						redirect: {
							name: children[0].name
						}
					}
				]
			} else {
        o.children = []
      }
			
			// buttons
			// o.buttons = Array.isArray(item.buttons) ? item.buttons : []
			
			return o
		}) 
		// menu end
	}
}

const newMenu = recursion(menu,"myapp")
store.dispatch("MENU/setMenu", newMenu)

// 整理 headerMenu
const topMenu = []
newMenu.forEach(i => {
	if(i.meta.is_show) {
		let o = {
			path: i.path,
			name: i.name,
			value: i.value
		}
		topMenu.push(o)
	}
})
store.dispatch("MENU/setMenuTop", topMenu)

export default newMenu;