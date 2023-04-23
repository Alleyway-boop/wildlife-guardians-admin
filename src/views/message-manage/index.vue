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
                <el-input disabled="disabled" v-model="form.userid"></el-input>
            </el-form-item>
            <el-form-item label="创建时间" label-width="80px">
                <el-input disabled="disabled" v-model="form.createTime"></el-input>
            </el-form-item>
            <el-form-item label="联系方式" label-width="80px">
                <el-input disabled="disabled" v-model="form.phone"></el-input>
            </el-form-item>
            <el-form-item>
                <el-select v-model="form.status" placeholder="请选择">
                    <el-option label="珍稀植物" value="珍稀植物"></el-option>
                    <el-option label="待通过" value="2"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="图片" label-width="80px">
                <el-image
                        style="width: 100px; height: 100px"
                        :src="form.image"
                        fit="cover"
                ></el-image>
            </el-form-item>
            <div class="frustrated">
                <el-form-item>
                    <el-button type="primary" @click="submitMessage(type)">提交</el-button>
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
                <el-table :data="activityList" style="width: 100%">
                    <el-table-column prop="title" label="标题" width="auto"></el-table-column>
                    <el-table-column prop="userid" label="作者" width="auto"></el-table-column>
                    <el-table-column prop="createTime" label="创建时间" width="auto"></el-table-column>
                    <el-table-column prop="phone" label="联系方式" width="auto"></el-table-column>
                    <el-table-column prop="messageType" label="状态" width="auto"></el-table-column>
                    <el-table-column label="操作" width="180">
                        <template #default="scope">
                            <el-button type="primary" @click="Edit(scope)">编辑</el-button>
                            <el-popconfirm
                                    confirm-button-text="Yes"
                                    cancel-button-text="No"
                                    icon-color="#626AEF"
                                    title="确定要删除吗？"
                                    @confirm="deleteMessageFun(scope)"
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
import {addMsg, deleteMsg, getMsgByPage, updateMsg} from "@/http/api";
import {onMounted, reactive, ref} from "vue"
import {ElMessage} from "element-plus";
import {changeTime} from "@/utils/dataUtil";

let currentPage = ref(1)
const size = ref < 'default' | 'large' | 'small' > ('default')

let type = ref(0)
let activityList = reactive([])
let isShow = ref(false)
let form = reactive({
    title: "",
    userid: "",
    content: "",
    uuid: "",
    phone: "",
    image: "",
    createTime: "",
    messageType: "",
})
let total = ref(0)

function Addactivity() {
    isShow.value = true
    type.value = 1
    form.title = ""
    form.userid = ""
    form.content = ""
    form.uuid = ""
    form.phone = ""
    form.image = ""
    form.createTime = ""
    form.messageType = ""
    console.log(form);
}


// 分页组件切换页码时触发
const pageChange = async (value) => {
    currentPage.value = value
    let res = await getMsgByPage({
        page: currentPage.value,
        limit: 10
    })

    if (res.code === 200) {
        total.value = res.data.total
        activityList.length = 0
        res.data.forEach((e) => {
            // 正则检查是否是时间戳
            if (/\d{13}/.test(e.createTime)) {
                e.createTime = changeTime(e.createTime)
            }
            activityList.push(e)
        })
    }
    console.log(activityList);
}

async function submitMessage(type) {
    if (type === 1) {
        console.log(form);
        await addMsg(form).then(res => {
            if (res.code === 200) {
                ElMessage.success('添加成功')
                isShow.value = false
                type = ""
            }
        })
    } else {
        await updateMsg(form).then(res => {
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
    form.userid = index.row.userid
    form.title = index.row.title
    form.status = index.row.status
    form.content = index.row.content
    form.uuid = index.row.uuid
    form.createTime = index.row.createTime
    form.messageType = index.row.messageType
    form.phone = index.row.phone
    console.log(index);
}

function close() {
    isShow.value = false
}

async function deleteMessageFun(index) {
    console.log("删除操作")
    await deleteMsg(index.row.uuid).then(res => {
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