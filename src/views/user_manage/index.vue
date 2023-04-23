<template>
    <el-dialog v-model="isShow">
        <el-form>
            <el-form-item label="用户名" label-width="80px">
                <el-input v-model="form.userName"></el-input>
            </el-form-item>
            <el-form-item label="昵称" label-width="80px">
                <el-input v-model="form.nickName"></el-input>
            </el-form-item>
            <el-form-item label="密码" label-width="80px">
                <el-input v-model="form.password"></el-input>
            </el-form-item>
            <el-form-item label="邮箱" label-width="80px">
                <el-input v-model="form.email"></el-input>
            </el-form-item>
            <el-form-item label="联系方式" label-width="80px">
                <el-input v-model="form.phone"></el-input>
            </el-form-item>
            <el-form-item label="创建时间" label-width="80px">
                <el-input disabled="disabled" v-model="form.createTime"></el-input>
            </el-form-item>
            <el-form-item label="头像" label-width="80px">
                <el-upload
                        class="avatar-uploader"
                        action="/api/admin/uploadImage"
                        :show-file-list="false"
                        :on-success="handleavatarSuccess"
                        :before-upload="beforeavatarUpload">
                    <img :src="form.avatar" class="avatar" alt=''>
                </el-upload>
            </el-form-item>
            <el-form-item label="权限" label-width="80px">
                <el-select v-model="form.role" placeholder="请选择">
                    <el-option label="volunteer" value="volunteer"></el-option>
                    <el-option label="user" value="user"></el-option>
                </el-select>
            </el-form-item>
            <div class="frustrated">
                <el-form-item>
                    <el-button type="primary" @click="submitDonate(type)">提交</el-button>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="close">取消</el-button>
                </el-form-item>
            </div>
        </el-form>
    </el-dialog>
    <el-row>
        <el-col :span="24">
            <el-card>
                <div slot="header" class="clearfix">
                    <span class="title">捐赠管理</span>
                </div>
                <el-table :data="activityList" style="width: 100%;">
                    <el-table-column prop="nickName" label="昵称" width="200"></el-table-column>
                    <el-table-column prop="createTime" label="创建时间" width="auto"></el-table-column>
                    <el-table-column prop="role" label="权限" width="auto"></el-table-column>
                    <el-table-column prop="email" label="邮箱" width="auto"></el-table-column>
                    <el-table-column prop="phone" label="电话" width="auto"></el-table-column>
                    <el-table-column prop="avatar" label="头像" width="150">
                        <template #default="scope">
                            <el-image :src="scope.row.avatar" alt="" class="avatar"/>
                        </template>
                    </el-table-column>
                    <el-table-column label="操作" width="180">
                        <template #default="scope">
                            <el-button type="primary" @click="Edit(scope)">编辑</el-button>
                            <el-popconfirm
                                    confirm-button-text="Yes"
                                    cancel-button-text="No"
                                    icon-color="#626AEF"
                                    title="确定要删除吗？"
                                    @confirm="deleteActivityFun(scope)"
                            >
                                <template #reference>
                                    <el-button type="danger">删除</el-button>
                                </template>
                            </el-popconfirm>
                        </template>
                    </el-table-column>
                </el-table>

                <div class="example-pagination-block">
                    <el-pagination layout="prev, pager, next" :total="total" @current-change="pageChange"
                                   :current-page="currentPage"/>
                </div>

                <el-button class="add" type="primary" @click="Addactivity">添加</el-button>
            </el-card>
        </el-col>
    </el-row>
</template>

<script setup>
import {addUser, deleteActivity, getUserListByPage, updateUser} from "@/http/api";
import {onMounted, reactive, ref} from "vue"
import {ElMessage} from "element-plus";
import {changeTime} from "@/utils/dataUtil";

let currentPage = ref(1)
const size = ref < 'default' | 'large' | 'small' > ('default')

let type = ref(0)
let activityList = reactive([])
let isShow = ref(false)
let form = reactive({
    nickName: "",
    id: "",
    createTime: "",
    role: "",
    avatar: "",
    email: "",
    phone: "",
    userName: "",
    password: ""
})
let total = ref(0)

function handleavatarSuccess(res, file) {
    form.avatar = res.data
}

function beforeavatarUpload(file) {
    const isJPG = file.type === 'image/jpeg';
    const isLt2M = file.size / 1024 / 1024 < 2;
    return isJPG && isLt2M;
}

function Addactivity() {
    isShow.value = true
    type.value = 1
    form.nickName = ""
    form.id = ""
    form.avatar = ""
    form.createTime = ""
    form.role = ""
    form.email = ""
    form.phone = ""
    form.userName = ""
    form.password = ""
    console.log(form);
}


// 分页组件切换页码时触发
const pageChange = async (value) => {
    currentPage.value = value
    let res = await getUserListByPage({
        page: currentPage.value,
        limit: 10
    })

    if (res.code === 200) {
        total.value = res.data.total
        activityList.length = 0
        res.data.forEach((e) => {
            // 正则判断是否是时间戳
            if (/\d{13}/.test(e.createTime)) {
                e.createTime = changeTime(e.createTime)
            }
            activityList.push(e)
        })
    }
    console.log(activityList);
}

async function submitDonate(type) {
    if (type === 1) {
        console.log(form);
        await addUser(form).then(res => {
            if (res.code === 200) {
                ElMessage.success('添加成功')
                isShow.value = false
                type = ""
            }
        })
    } else {
        await updateUser(form).then(res => {
            if (res.code === 200) {
                ElMessage.success('修改成功')
                isShow.value = false
            } else {

            }
        })
    }
    await pageChange(currentPage.value)
}

function Edit(index) {
    isShow.value = true
    form.nickName = index.row.nickName
    form.id = index.row.id
    form.role = index.row.role
    form.createTime = index.row.createTime
    form.avatar = index.row.avatar
    form.email = index.row.email
    form.phone = index.row.phone
    form.userName = index.row.userName
    form.password = index.row.password
    console.log(index);
}

function close() {
    isShow.value = false
}

async function deleteActivityFun(index) {
    console.log("删除操作")
    await deleteActivity(index.row.id).then(res => {
        if (res.code === 200) {
            ElMessage.success('删除成功')
            // getHelpList()
        } else {
            ElMessage.error('删除失败')
        }
    })
    await pageChange(currentPage.value)
}

onMounted(async () => {
    await pageChange(currentPage.value)
})
</script>

<style lang="less" scoped>
.avatar {
  width: 45px;
  height: 43px;
  transition: all 0.3s ease-in-out;

}

.avatar:hover {
  width: 100px;
  height: 100px;
}

.example-pagination-block {
  display: flex;
  margin-top: 20px;
  justify-content: center;
}

.frustrated {
  width: 30%;
  margin: 0 auto;
  display: flex;
  justify-content: space-around;

}

.title {
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 20px;
  font-weight: 500;
  color: #303133;
}
</style>