<template>
  <div class="container-fluid">
    <div class="login-box">
      <div class="row title">
        <div class="col-lg-12">
          系统登录
        </div>
      </div>

      <div class="login-form">
        <div class="row username">
          <div class="col-lg-3">
            用户名:
          </div>
          <div class="col-lg-8">
            <input class="form-control" minlength="5" maxlength="10" v-model="loginInfo.username" type="text"
                   placeholder="请输入用户名">
          </div>
        </div>


        <div class="row password">
          <div class="col-lg-3">
            密码:
          </div>
          <div class="col-lg-8">
            <input class="form-control" minlength="4" maxlength="12" v-model="loginInfo.password" type="password"
                   placeholder="请输入密码">
          </div>
        </div>

        <div class="row login-btn">
          <div class="col-lg-12">
            <button @click="doLogin()" class="btn btn-primary">登录</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import '@/assets/bootstrap/dist/css/bootstrap.min.css'
import {reactive} from 'vue'
import {ElMessage} from "element-plus";
 import {adminLogin,getAdminByToken} from '@/http/api'
import {setAdmin, setAdminToken} from '@/utils/auth'
import {useRouter} from 'vue-router'

const router = useRouter()

const loginInfo = reactive({
  username: '',
  password: ''
})

const doLogin = async () => {
  if (loginInfo.username === '' || loginInfo.password === '') {
    ElMessage.warning('用户名/密码不能为空')
    return
  }

  if (loginInfo.username.length > 10 || loginInfo.username.length < 5) {
    ElMessage.warning('用户名应为5-10位字符')
    return;
  }
  if (loginInfo.password.length > 12 || loginInfo.password.length < 4) {
    ElMessage.warning('密码格应为4-12为字符')
    return;
  }

  console.log(loginInfo)
   let loginRes = await adminLogin(loginInfo);

  if(loginRes.code === 200){
    setAdminToken(loginRes.token)

    let getAdminRes = await getAdminByToken()
    console.log(getAdminRes)
    if(getAdminRes.code === 200){
      ElMessage.success('登录成功!')
      setAdmin(getAdminRes.data)

      await router.replace('/home/')
    } else  {
      ElMessage.error(getAdminRes.msg)
    }

  }
}

</script>

<style lang="less" scoped>
.container-fluid {
  background-color: #F4F4F4;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;

  .login-box {
    width: 600px;
    height: 400px;
    box-sizing: border-box;
    background-color: #fff;
    border-radius: 1rem;


    .row {
      margin: 70px;
    }

    .title {

      .col-lg-12 {
        text-align: center;
        font-size: 26px;
        font-weight: 400;
      }
    }

    .login-form {
      margin-top: 10%;

      .row {
        display: flex;
        align-items: center;
        margin: 20px;

        .col-lg-3 {
          display: flex;
          justify-content: flex-end;
        }

        .col-lg-12 {
          display: flex;
          justify-content: center;

          button {
            width: 40%;
          }
        }
      }
    }
  }
}
</style>
