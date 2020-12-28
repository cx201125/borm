<template>



  <div class="site-wrapper site-page--login">
    <div class="site-content__wrapper">
      <div class="site-content">
        <div class="brand-info">
          <h2 class="brand-info__text">城市职业学院宿舍管理系统</h2>
          <p class="brand-info__intro">这个是基于vue+element开发的一套简单的宿舍管理系统，后端使用的是mybatis-plus+springboot</p>
        </div>
        <div class="login-main">
          <h3 class="login-title">管理员登录</h3>
          <el-form :model="dataForm" :rules="dataRule" ref="dataForm" @keyup.enter.native="submitForm()" status-icon>
            <el-form-item prop="username">
              <el-input v-model="dataForm.username" placeholder="帐号"></el-input>
            </el-form-item>
            <el-form-item prop="password">
              <el-input v-model="dataForm.password" type="password" placeholder="密码"></el-input>
            </el-form-item>
            <el-form-item>
              <el-button class="login-btn-submit" type="primary" @click="submitForm()">登录</el-button>
            </el-form-item>
          </el-form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
    export default {
        data () {
            return {
                dataForm: {
                    username: '',
                    password: '',
                },
                dataRule: {
                    username: [
                        { required: true, message: '帐号不能为空', trigger: 'blur' }
                    ],
                    password: [
                        { required: true, message: '密码不能为空', trigger: 'blur' }
                    ],
                },
            }
        },
        created () {

        },
        methods: {
            // 提交表单
            submitForm () {
                this.$refs['dataForm'].validate((valid) => {
                    if (valid) {
                        this.$http.post({
                            url:"cqcvc_dorm/admin/login",
                            data:this.dataForm
                        }).then(({data}) => {
                            if(data.code==400){
                                this.$message({
                                    message: data.msg,
                                    type: 'error'
                                });
                            }

                            if (data.code === 0) {
                                this.$store.commit({
                                    type:'changeLogin',
                                    token:data.token,
                                    user:data.data
                                })
                                this.$router.replace("/home")
                            }
                        })
                    }
                })
            },
        }
    }
</script>

<style lang="scss">
  .site-wrapper.site-page--login {
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    background-color: rgba(38, 50, 56, .6);
    overflow: hidden;
    &:before {
      position: fixed;
      top: 0;
      left: 0;
      z-index: -1;
      width: 100%;
      height: 100%;
      content: "";
      background-image: url(https://gss0.baidu.com/70cFfyinKgQFm2e88IuM_a/forum/w=580/sign=f596b93f7ff0f736d8fe4c093a54b382/32ef9d99a9014c0830f4a7e50d7b020879f4f4eb.jpg);
      background-size: cover;
    }
    .site-content__wrapper {
      position: absolute;
      top: 0;
      right: 0;
      bottom: 0;
      left: 0;
      padding: 0;
      margin: 0;
      overflow-x: hidden;
      overflow-y: auto;
      background-color: transparent;
    }
    .site-content {
      min-height: 100%;
      padding: 30px 500px 30px 30px;
    }
    .brand-info {
      margin: 220px 100px 0 90px;
      color: #fff;
    }
    .brand-info__text {
      margin:  0 0 22px 0;
      font-size: 48px;
      font-weight: 400;
      text-transform : uppercase;
    }
    .brand-info__intro {
      margin: 10px 0;
      font-size: 16px;
      line-height: 1.58;
      opacity: .6;
    }
    .login-main {
      position: absolute;
      top: 0;
      right: 0;
      padding: 150px 60px 180px;
      width: 470px;
      min-height: 100%;
      background-color: #fff;
    }
    .login-title {
      font-size: 16px;
    }
    .login-captcha {
      overflow: hidden;
      > img {
        width: 100%;
        cursor: pointer;
      }
    }
    .login-btn-submit {
      width: 100%;
      margin-top: 38px;
    }
  }
</style>
