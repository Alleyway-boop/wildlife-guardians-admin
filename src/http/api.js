import http from "./index";
import {getAdminToken} from "@/utils/auth";

// 管理员登录
export const adminLogin = (admin) => {
    return http({
        url: '/api/admin/login',
        method: 'post',
        data: {
            userName: admin.username,
            password: admin.password
        }
    })
}

// 获取管理员信息  /admin/getAdminByToken
export const getAdminByToken = () => {
    return http({
        url: '/api/admin/getAdminByToken',
        method: 'get',
        headers: {
            token: getAdminToken()
        },
        data: {}
    })
}
// GetHelpList 获取救援列表
export const GetHelpList = () => {
    return http({
        url: '/api/admin/getHelpAll',
        method: 'get',
    })
}

export const GetHelpListByPage = (pram) => {
    return http({
        url: '/api/admin/getHelpByPage/' + pram.page + '/' + pram.limit,
        method: 'get',
    })
}
export const UpdateHelp = (pram) => {
    return http({
        url: '/api/admin/UpdateHelp',
        method: 'post',
        data: pram
    })
}

export const deleteHelp = (id) => {
    return http({
        url: '/api/admin//deleteHelp/' + id,
        method: 'post',
    })
}
export const addHelp = (pram) => {
    console.log(getAdminToken())
    return http({
        url: '/api/admin/addHelp',
        method: 'post',
        headers: {
            token: getAdminToken()
        },
        data: pram
    })
}

export const getDonateList = () => {
    return http({
        url: '/api/admin/getDonateAll',
        method: 'get',
    })
}

export const getDonateListByPage = (pram) => {
    return http({
        url: '/api/admin/getDonateByPage/' + pram.page + '/' + pram.limit,
        method: 'GET',
    })
}
export const AddDonate = (pram) => {
    return http({
        url: '/api/admin/addDonate',
        method: 'POST',
        headers: {
            token: getAdminToken()
        },
        data: pram
    })
}

export const UpdateDonate = (pram) => {
    return http({
        url: '/api/admin/updateDonate',
        method: 'POST',
        data: pram
    })
}
export const deleteDonate = (id) => {
    return http({
        url: '/api/admin/deleteDonate',
        method: 'POST',
        data: {
            uuid: id
        }
    })
}
export const getActivityByPage = (pram) => {
    return http({
        url: '/api/admin//getActivityByPage/' + pram.page + '/' + pram.limit,
        method: 'GET',
    })
}
export const AddActivity = (pram) => {
    return http({
        url: '/api/admin/addActivity',
        method: 'POST',
        headers: {
            token: getAdminToken()
        },
        data: pram
    })
}

export const UpdateActivity = (pram) => {
    return http({
        url: '/api/admin/updateActivity',
        method: 'POST',
        data: pram
    })
}

export const deleteActivity = (id) => {
    return http({
        url: '/api/admin/deleteActivity/' + id,
        method: 'GET',
    })
}

export const getMsgByPage = (pram) => {
    return http({
        url: '/api/admin/getMsgByPage/' + pram.page + '/' + pram.limit,
        method: 'GET',
    })
}

export const addMsg = (pram) => {
    return http({
        url: '/api/admin/addMsg',
        method: 'POST',
        data: pram
    })
}

export const updateMsg = (pram) => {
    return http({
        url: '/api/admin/updateMsg',
        method: 'POST',
        data: pram
    })
}

export const deleteMsg = (id) => {
    return http({
        url: '/api/admin/deleteMsg/' + id,
        method: 'GET',
    })
}

export const UploadImg = (pram) => {
    return http({
        url: '/api/admin/uploadImage',
        method: 'POST',
        data: pram
    })
}

export const getUserListByPage = (pram) => {
    return http({
        url: '/api/admin/getUserListByPage/'+ pram.page + '/' + pram.limit,
        method: 'GET',
    })
}

export const updateUser = (pram) => {
    return http({
        url: '/api/admin/updateUser',
        method: 'POST',
        data: pram
    })
}
export const addUser = (pram) => {
    return http({
        url: '/api/admin/addUser',
        method: 'POST',
        data: pram
    })
}