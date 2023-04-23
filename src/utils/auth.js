// 引入Cookies库
import Cookies from "js-cookie";

// 把token添加到cookie
export const setAdminToken = (token) => {
    return Cookies.set("adminToken", token)
}

// 从cookie中获取token
export const getAdminToken = () => {
    return Cookies.get("adminToken")
}

// 从cookie中移除token
export const removeAdminToken = () => {
    return Cookies.remove("adminToken")
}

// 从本地删除用户
export const removeAdmin = () => {
    localStorage.removeItem('admin')
}

// 添加用户到本地
export const setAdmin = (admin) => {
    console.log(admin);
    localStorage.setItem('adminInfo', JSON.stringify(admin))
}

// 从本地获取用户
export const getAdmin = () => {
    return localStorage.getItem('adminInfo')
}
