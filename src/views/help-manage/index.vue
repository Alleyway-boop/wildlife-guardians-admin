<template>
    <el-dialog v-model="isShow">
        <el-form>
            <el-form-item label="标题" label-width="80px">
                <el-input v-model="form.title"></el-input>
            </el-form-item>
            <el-form-item label="内容" label-width="80px">
                <el-input type="textarea" v-model="form.content"></el-input>
            </el-form-item>
            <el-form-item label="创建日期" label-width="80px">
                <el-date-picker disabled="disabled"
                                v-model="form.createTime"
                                type="date"
                                placeholder="选择日期">
                </el-date-picker>
            </el-form-item>
            <el-form-item label="作者" label-width="80px">
                <el-input disabled="disabled" v-model="form.name"></el-input>
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
            <el-form-item label="状态" label-width="80px">
                <el-select v-model="form.state" placeholder="请选择">
                    <el-option label="通过" value="通过"></el-option>
                    <el-option label="待通过" value="待通过"></el-option>
                    <el-option label="不通过" value="不通过"></el-option>
                </el-select>
            </el-form-item>
            <div class="frustrated">
                <el-form-item>
                    <el-button type="primary" @click="submitHelp(type)">提交</el-button>
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
                    <span class="title">帮助管理</span>
                </div>
                <el-table :data="HelpList" style="width: 100%">
                    <el-table-column prop="title" label="标题" width="auto"></el-table-column>
                    <el-table-column prop="createTime" label="创建日期" width="200"></el-table-column>
                    <el-table-column prop="sponsor" label="作者" width="auto"></el-table-column>
                    <el-table-column prop="state" label="状态" width="100"></el-table-column>
                    <el-table-column prop="cover" label="封面" width="100">
                        <template #default="scope">
                            <el-image class="cover" :src="scope.row.cover"></el-image>
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
                                    @confirm="deleteHelpFun(scope)"
                            >
                                <template #reference>
                                    <el-button type="danger">删除</el-button>
                                </template>
                            </el-popconfirm>
                        </template>
                    </el-table-column>
                </el-table>
                <div class="example-pagination-block">
                    <el-pagination layout="prev, pager, next" :total="50" @current-change="pageChange"
                                   :current-page="currentPage"/>
                </div>
                <el-button class="add" type="primary" @click="AddHelpFun">添加</el-button>
            </el-card>
        </el-col>
    </el-row>
</template>

<script setup>
import {addHelp, deleteHelp, GetHelpList, GetHelpListByPage, UpdateHelp} from "@/http/api";
import {onMounted, reactive, ref} from "vue"
import {ElMessage} from "element-plus";
import {changeTime} from "@/utils/dataUtil";

let type = ref(0)
let HelpList = reactive([])
let isShow = ref(false)
let form = reactive({
    title: "",
    createTime: "",
    name: "",
    state: "",
    content: "",
    uuid: "",
    cover: ""
})
let currentPage = ref(1)
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

const pageChange = async (value) => {
    currentPage.value = value
    let res = await GetHelpListByPage({
        page: currentPage.value,
        limit: 10
    })
    console.log(res)
    if (res.code === 200) {
        total.value = res.data.total
        HelpList.length = 0
        res.data.records.forEach((e) => {
            // 正则检查是否是时间戳
            if (/\d{13}/.test(e.createTime)) {
                e.createTime = changeTime(e.createTime)
            }
            HelpList.push(e)
        })
    }
}

function AddHelpFun() {
    isShow.value = true
    type.value = 1
    form.title = ""
    form.createTime = ""
    form.name = ""
    form.state = ""
    form.content = ""
    form.uuid = ""
    form.cover = ""
    console.log(form);
}

function submitHelp(type) {
    if (type === 1) {
        addHelp(form).then(res => {
            if (res.code === 200) {
                ElMessage.success('添加成功')
                isShow.value = false
                type = ""
            }
        })
    } else {
        UpdateHelp(form).then(res => {
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
    form.title = index.row.title
    form.createTime = index.row.createTime
    form.name = index.row.sponsor
    form.state = index.row.state
    form.content = index.row.content
    form.uuid = index.row.uuid
    form.cover = index.row.cover
}

function close() {
    isShow.value = false
}

async function deleteHelpFun(index) {
    console.log(index.row.uuid)
    await deleteHelp(index.row.uuid).then(res => {
        if (res.code === 200) {
            ElMessage.success('删除成功')
            pageChange(currentPage.value)
        } else {
            ElMessage.error('删除失败')
        }
    })
}

onMounted(async () => {
    await pageChange(currentPage.value)
})

async function getHelpList() {
    let temp = await GetHelpList()
    if (HelpList.length !== 0) {
        HelpList.splice(0, HelpList.length)
    }
    if (temp.code !== 200) {
        ElMessage.error(temp.msg)
    } else {
        if (temp.data.length === 0) {
            ElMessage.warning("暂无数据")
        } else {
            temp.data.forEach((e) => {
                HelpList.push(e)
            })
        }
    }
}
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
  justify-content: center;
  align-items: center;
  margin-top: 20px;
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