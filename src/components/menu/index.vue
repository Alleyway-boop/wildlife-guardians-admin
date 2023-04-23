<template>
    <el-menu
            active-text-color="#ffd04b"
            background-color="#545C65"
            class="el-menu-vertical-demo"
            :default-active="defaultActive"
            text-color="#fff"
            @open="handleOpen"
            @close="handleClose"
    >
        <el-menu-item index="1" @click="routerPush('1','/home')">
            <el-icon>
                <HomeFilled/>
            </el-icon>
            <span>首页</span>
        </el-menu-item>
        <el-menu-item index="2" @click="routerPush('2','/home/user_manage')">
            <el-icon>
                <UserFilled/>
            </el-icon>
            <span>用户管理</span>
        </el-menu-item>

        <el-menu-item index="3" @click="routerPush('3','/home/help-manage')">
            <el-icon>
                <icon-menu/>
            </el-icon>
            <span>救援管理</span>
        </el-menu-item>

        <el-menu-item index="4" @click="routerPush('4','/home/donate-manage')">
            <el-icon>
                <document/>
            </el-icon>
            <span>捐助管理</span>
        </el-menu-item>

        <el-menu-item index="5" @click="routerPush('5','/home/activity-manage')">
            <el-icon>
                <Star/>
            </el-icon>
            <span>活动管理</span>
        </el-menu-item>

        <el-menu-item index="6" @click="routerPush('6','/home/message-manage')">
            <el-icon>
                <Bell/>
            </el-icon>
            <span>留言管理</span>
        </el-menu-item>

        <el-menu-item @click="logout()">
            <el-icon>
                <SwitchButton/>
            </el-icon>
            <span>退出登录</span>
        </el-menu-item>

    </el-menu>

</template>
<script setup>
import {Bell, Document, HomeFilled, Menu as IconMenu, UserFilled, Star, SwitchButton,} from '@element-plus/icons-vue'
import {useRouter} from 'vue-router'
import {useMainStore} from "@/stores/store";
import {ref} from 'vue'

// 创建router实例
const router = useRouter()

// 创建store实例
const store = useMainStore()
let defaultActive = ref(store.$state.menuIndex)

// 路由跳转
const routerPush = (value, path) => {
    store.changeMenuIndex(value)
    router.push(path)
}

// 退出登录
const logout = () => {
    localStorage.removeItem('adminInfo')
    router.push('/login')
}

const handleOpen = (key, keyPath) => {
    console.log(key, keyPath)
}
const handleClose = (key, keyPath) => {
    console.log(key, keyPath)
}
</script>

<style lang="less" scoped>
.el-menu {
  width: 200px;
  height: 100%;
  padding: 0;
  box-sizing: border-box;
  border-right: 1px solid #545C65;
}
</style>