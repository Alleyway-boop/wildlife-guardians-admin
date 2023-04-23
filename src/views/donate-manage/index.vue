<template>
    <el-dialog v-model="isShow">
        <el-form>
            <el-form-item label="标题" label-width="80px">
                <el-input v-model="form.title"></el-input>
            </el-form-item>
            <el-form-item label="内容" label-width="80px">
                <el-input type="textarea" v-model="form.donateContent"></el-input>
            </el-form-item>
            <el-form-item label="联系方式" label-width="80px">
                <el-input v-model="form.contactInformation"></el-input>
            </el-form-item>
            <el-form-item label="作者" label-width="80px">
                <el-input disabled="disabled" v-model="form.donateUser"></el-input>
            </el-form-item>
            <el-form-item label="封面" label-width="80px">
                <el-upload
                        class="avatar-uploader"
                        action="/api/admin/uploadImage"
                        :show-file-list="false"
                        :on-success="handleCoverSuccess"
                        :before-upload="beforeCoverUpload">
                    <el-image :src="form.cover" class="cover" alt=""/>
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
                <el-table :data="donateList" style="width: 100%">
                    <el-table-column prop="title" label="标题" width="auto"></el-table-column>
                    <el-table-column prop="donateUser" label="作者" width="auto"></el-table-column>
                    <el-table-column prop="contactInformation" width="auto" label="联系方式"></el-table-column>
                    <el-table-column prop="state" label="状态" width="auto"></el-table-column>
                    <el-table-column prop="cover" label="封面" width="auto">
                        <template #default="scope">
                            <el-image :src="scope.row.cover" class="cover" alt=""/>
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
                                    @confirm="deleteDonateFun(scope)"
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

                <el-button class="add" type="primary" @click="AddDonateFun">添加</el-button>
            </el-card>
        </el-col>
    </el-row>
</template>

<script setup>
import {AddDonate, deleteDonate, getDonateListByPage, UpdateDonate} from "@/http/api";
import {onMounted, reactive, ref} from "vue"
import {ElMessage} from "element-plus";

let currentPage = ref(1)


let type = ref(0)
let donateList = reactive([])
let isShow = ref(false)
let form = reactive({
    title: "",
    donateUser: "",
    state: "",
    donateContent: "",
    uuid: "",
    contactInformation: "",
    cover: ""
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

function AddDonateFun() {
    isShow.value = true
    type.value = 1
    form.title = ""
    form.contactInformation = ""
    form.donateUser = ""
    form.state = ""
    form.donateContent = ""
    form.uuid = ""
    form.cover = ""
    console.log(form);
}


// 分页组件切换页码时触发
const pageChange = async (value) => {
    currentPage.value = value
    let res = await getDonateListByPage({
        page: currentPage.value,
        limit: 10
    })
    console.log(res)
    if (res.code === 200) {
        total.value = res.data.total
        donateList.length = 0
        res.data.records.forEach((e) => {
            donateList.push(e)
        })
    }
}

function submitDonate(type) {
    if (type === 1) {
        AddDonate(form).then(res => {
            if (res.code === 200) {
                ElMessage.success('添加成功')
                isShow.value = false
                type = ""
            }
        })
    } else {
        UpdateDonate(form).then(res => {
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
    console.log(index.row)
    isShow.value = true
    form.donateUser = index.row.donateUser
    form.title = index.row.title
    form.contactInformation = index.row.contactInformation
    form.state = index.row.state
    form.donateContent = index.row.donateContent
    form.uuid = index.row.uuid
    form.cover = index.row.cover
}

function close() {
    isShow.value = false
}

async function deleteDonateFun(index) {
    console.log("删除操作")
    await deleteDonate(index.row.uuid).then(res => {
        if (res.code === 200) {
            ElMessage.success('删除成功')
            // getHelpList()
        } else {
            ElMessage.error('删除失败')
        }
    })
}

onMounted(async () => {
    await pageChange(currentPage.value)
})
</script>

<style lang="less" scoped>

.cover {
  width: 40px;
  height: 30px;
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