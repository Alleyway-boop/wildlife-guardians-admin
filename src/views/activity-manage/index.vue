<template>
    <el-dialog v-model="isShow">
        <el-form>
            <el-form-item label="标题" label-width="80px">
                <el-input v-model="form.title"></el-input>
            </el-form-item>
            <el-form-item label="内容" label-width="80px">
                <el-input type="textarea" v-model="form.content"></el-input>
            </el-form-item>
            <el-form-item label="作者" label-width="80px">
                <el-input disabled="disabled" v-model="form.sponsor"></el-input>
            </el-form-item>
            <el-form-item label="创建时间" label-width="80px">
                <el-input disabled="disabled" v-model="form.createTime"></el-input>
            </el-form-item>
            <el-form-item label="更新时间" label-width="80px">
                <el-input disabled="disabled" v-model="form.updateTime"></el-input>
            </el-form-item>
            <el-form-item label="封面" label-width="80px">
                <el-upload
                        class="avatar-uploader"
                        action="/api/admin/uploadImage"
                        :show-file-list="false"
                        :on-success="handleCoverSuccess"
                        :before-upload="beforeCoverUpload">
                    <img :src="form.cover" class="cover" alt=''>
                </el-upload>
            </el-form-item>
            <el-form-item label="结束时间" label-width="80px">
                <el-date-picker
                        v-model="form.endTime"
                        type="datetime"
                        placeholder="Pick a day"
                />
            </el-form-item>
            <el-form-item label="权限" label-width="80px">
                <el-select v-model="form.role" placeholder="请选择">
                    <el-option label="volunteer" value="volunteer"></el-option>
                    <el-option label="user" value="user"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="状态" label-width="80px">
                <el-select v-model="form.status" placeholder="请选择">
                    <el-option label="通过" value="1"></el-option>
                    <el-option label="待通过" value="2"></el-option>
                    <el-option label="不通过" value="0"></el-option>
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
                    <el-table-column prop="title" label="标题" width="auto"></el-table-column>
                    <el-table-column prop="sponsor" label="作者" width="auto"></el-table-column>
                    <el-table-column prop="createTime" label="创建时间" width="auto"></el-table-column>
                    <el-table-column prop="updateTime" label="更新时间" width="auto"></el-table-column>
                    <el-table-column prop="endTime" label="结束时间" width="auto"></el-table-column>
                    <el-table-column prop="role" label="权限" width="auto"></el-table-column>
                    <el-table-column prop="status" label="状态" width="100"></el-table-column>
                    <el-table-column prop="cover" label="封面" width="150">
                        <template #default="scope">
                            <el-image :src="scope.row.cover" alt="" class="cover"/>
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
import {AddActivity, deleteActivity, getActivityByPage, UpdateActivity} from "@/http/api";
import {onMounted, reactive, ref} from "vue"
import {ElMessage} from "element-plus";

let currentPage = ref(1)
const size = ref < 'default' | 'large' | 'small' > ('default')

let type = ref(0)
let activityList = reactive([])
let isShow = ref(false)
let form = reactive({
    title: "",
    donateUser: "",
    status: "",
    content: "",
    uuid: "",
    createTime: "",
    role: "",
    updateTime: "",
    endTime: "",
    cover: "",
})
let total = ref(0)

function handleCoverSuccess(res, file) {
    form.cover = res.data
}

function beforeCoverUpload(file) {
    const isJPG = file.type === 'image/jpeg';
    const isLt2M = file.size / 1024 / 1024 < 2;

    if (!isJPG) {
        ElMessage.error('上传头像图片只能是 JPG 格式!');
    }
    if (!isLt2M) {
        ElMessage.error('上传头像图片大小不能超过 2MB!');
    }
    return isJPG && isLt2M;
}

function Addactivity() {
    isShow.value = true
    type.value = 1
    form.title = ""
    form.sponsor = ""
    form.status = ""
    form.content = ""
    form.uuid = ""
    form.cover = ""
    form.createTime = ""
    form.updateTime = ""
    form.endTime = ""
    form.role = ""
    console.log(form);
}


// 分页组件切换页码时触发
const pageChange = async (value) => {
    currentPage.value = value
    let res = await getActivityByPage({
        page: currentPage.value,
        limit: 5
    })

    if (res.code === 200) {
        total.value = res.data.total
        activityList.length = 0
        res.data.forEach((e) => {
            activityList.push(e)
        })
    }
    console.log(activityList);
}

function submitDonate(type) {
    if (type === 1) {
        console.log(form);
        AddActivity(form).then(res => {
            if (res.code === 200) {
                ElMessage.success('添加成功')
                isShow.value = false
                type = ""
            }
        })
    } else {
        UpdateActivity(form).then(res => {
            if (res.code === 200) {
                ElMessage.success('修改成功')
                isShow.value = false
            } else {

            }
        })
    }
    pageChange(currentPage.value)
}

function Edit(index) {
    isShow.value = true
    form.sponsor = index.row.sponsor
    form.title = index.row.title
    form.status = index.row.status
    form.content = index.row.content
    form.uuid = index.row.id
    form.role = index.row.role
    form.createTime = index.row.createTime
    form.updateTime = index.row.updateTime
    form.endTime = index.row.endTime
    form.cover = index.row.cover
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
.cover {
  width: 45px;
  height: 43px;
  transition: all 0.3s ease-in-out;

}

.cover:hover {
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