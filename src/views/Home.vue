<template>
  <el-container style="height: 700px; border: 1px solid #eee">
    <el-aside width="200px" style="background-color: rgb(238, 241, 246)">
      <el-popover trigger="hover" placement="right">
        <p>姓名: {{ user!==null?user.realname:''}}</p>
        <p>住址: {{ user!==null?user.homeAddr:''}}</p>
        <p>电话: {{ user!==null?user.phone:'' }}</p>
        <div slot="reference" class="name-wrapper">
          <h3 style="cursor:pointer;"><i class="el-icon-s-custom"></i>{{user!==null?user.realname:''}}</h3>
        </div>
      </el-popover>



      <el-menu
              default-active="1"
              class="el-menu-vertical-demo"
              @open="handleOpen"
              @close="handleClose">
        <el-menu-item index="1" @click="toIndex">
          <i class="el-icon-s-home"></i>
          <span slot="title" >首页</span>
        </el-menu-item>

        <el-menu-item index="2"  :disabled="user!==null?user.disable===0:false" @click="toAdmin">
          <i class="el-icon-user-solid"></i>
          <span slot="title" >管理员管理</span>
        </el-menu-item>

        <el-menu-item index="3" @click="toDormBuild">
          <i class="el-icon-s-order"></i>
          <span slot="title">宿舍楼管理</span>
        </el-menu-item>


        <el-submenu index="4">
          <template slot="title">
            <i class="el-icon-unlock"></i>
            <span>宿舍管理</span>
          </template>
          <el-menu-item-group>
            <el-menu-item :index='4+"-"+index' v-for="(item,index) in dormBuildList" @click="toDorm(item.dbId)">{{item.dbName}}</el-menu-item>
          </el-menu-item-group>

        </el-submenu>
        <el-submenu index="5">
          <template slot="title">
            <i class="el-icon-date"></i>
            <span>图表统计</span>
          </template>
          <el-menu-item-group>
            <el-menu-item index="5-1" @click="toEcharts">
              <i class="el-icon-s-data"></i>
              <span slot="title" >条形图</span>
            </el-menu-item>
            <el-menu-item index="5-2" @click="toEchartspie">
              <i class="el-icon-football"></i>
              <span slot="title" >饼图</span>
            </el-menu-item>
            <el-menu-item index="5-3" @click="toEchartssca">
              <i class="el-icon-cpu"></i>
              <span slot="title" >散点图</span>
            </el-menu-item>
          </el-menu-item-group>

        </el-submenu>


      </el-menu>
    </el-aside>

    <el-container>
      <el-header style="text-align: right;">

        <el-row :gutter="20" >
          <el-col :span="14">
          <span style="font-size: 20px;"><b>重庆城市职业学院宿舍管理系统</b></span>

          </el-col>
          <el-col :span="6" :offset="4"><div class="grid-content bg-purple">
            <el-dropdown :show-timeout="0" placement="bottom">
            <span class="el-dropdown-link">
                          <el-avatar :size="50" :src="user!==null?user.headPortrait:''">
                        </el-avatar>

            </span>
              <el-dropdown-menu slot="dropdown">
                <el-popover
                        placement="top"
                        trigger="hover">
                  <el-upload
                          accept="image/png, image/jpeg, image/jpg"
                          class="upload-demo"
                          :show-file-list="false"
                          :before-upload="beforeAvatarUpload"
                          :action="imageUpload"
                          :multiple="true"
                          :on-success="handleSuccess">
                    <el-button type="primary">上传<i class="el-icon-upload el-icon--right"></i></el-button>

                  </el-upload>
                  <el-dropdown-item slot="reference">更换头像</el-dropdown-item>
                </el-popover>
                <el-dropdown-item @click.native="updatePasswordHandle()">修改密码</el-dropdown-item>
                <el-dropdown-item @click.native="logoutHandle()">退出</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </div></el-col>
        </el-row>
                      </el-header>

      <el-dialog
              title="修改密码"
              :visible.sync="visible"
              :append-to-body="true">
        <el-form :model="dataForm" :rules="dataRule" ref="dataForm" @keyup.enter.native="dataFormSubmit()" label-width="80px">
          <el-form-item label="账号">
            <span>{{ user!==null?user.username:'' }}</span>
          </el-form-item>
          <el-form-item label="原密码" prop="password">
            <el-input type="password" v-model="dataForm.password"></el-input>
          </el-form-item>
          <el-form-item label="新密码" prop="newPassword">
            <el-input type="password" v-model="dataForm.newPassword"></el-input>
          </el-form-item>
          <el-form-item label="确认密码" prop="confirmPassword">
            <el-input type="password" v-model="dataForm.confirmPassword"></el-input>
          </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
      <el-button @click="visible = false">取消</el-button>
      <el-button type="primary" @click="dataFormSubmit()">确定</el-button>
    </span>
      </el-dialog>
                      <el-main>
                        <router-view :key="key"></router-view>
                      </el-main>
                    </el-container>
                  </el-container>

                </template>

                <script>

                export default {
                  name: 'Home',
                    data(){
                        var validateConfirmPassword = (rule, value, callback) => {
                            if (this.dataForm.newPassword !== value) {
                                callback(new Error('确认密码与新密码不一致'))
                            } else {
                                callback()
                            }
                        }

                        var validatePassword = (rule, value, callback) => {
                            if (this.user.password !== value) {
                                callback(new Error('原密码有误'))
                            } else {
                                callback()
                            }
                        }
                      return{
                          src:"",
                          user:null,
                          dormBuildList:[],
                          visible:false,
                          imageUpload:"http://localhost:8888/cqcvc_dorm/admin/upload/",

                          dataForm: {
                              password: '',
                              newPassword: '',
                              confirmPassword: ''
                          },
                          dataRule: {
                              password: [
                                  { required: true, message: '原密码不能为空', trigger: 'blur' },
                                  { validator: validatePassword, trigger: 'blur' }
                              ],
                              newPassword: [
                                  { required: true, message: '新密码不能为空', trigger: 'blur' }
                              ],
                              confirmPassword: [
                                  { required: true, message: '确认密码不能为空', trigger: 'blur' },
                                  { validator: validateConfirmPassword, trigger: 'blur' }
                              ]
                          },

                      }
                    },

                  components: {
                  },
                    methods:{

                        beforeAvatarUpload(file){
                            // 动态改变提交文件的路径
                            console.log(this.user);
                            // this.imageUpload+=this.user.userId
                            // 判断文件的格式合不合法
                            const isJPEG = file.type === 'image/jpeg';
                            const isJPG = file.type === 'image/jpg';
                            const isPNG = file.type === 'image/png';
                            const isLt10M = file.size / 1024 / 1024 < 10;

                            console.log(file,isJPEG,isJPG,isPNG);
                            if (!isJPG && !isJPEG && !isPNG) {
                                this.$message.error('上传头像图片只能是 JPG,JPEG,PNG 格式!');
                                return false
                            }
                            if (!isLt10M) {
                                this.$message.error('上传头像图片大小不能超过 10MB!');
                                return false
                            }
                            return true
                        }
                        ,
                        handleSuccess(response, file, fileList){

                            console.log(response,file,fileList);
                            if (response.code===0){
                                // 图片上传成功，重新请求数据
                                this.getAdmin()
                                this.$message.success("更换头像成功")
                            }else{
                                this.$message.error(response.msg)
                            }

                        },
                        getAdmin(){
                          this.$http.get({
                              url:"cqcvc_dorm/admin/info/"+this.$store.state.userId
                          }).then( ({data}) =>{
                                  this.user=data.admin
                                  this.imageUpload+=this.user.adminId
                          }
                          )
                        },
                        // 表单提交
                        dataFormSubmit () {
                            this.$refs['dataForm'].validate((valid) => {
                                if (valid) {
                                    this.$http.post({
                                        url:"cqcvc_dorm/admin/update",
                                        data:{
                                            adminId:this.user.adminId,
                                            password:this.dataForm.newPassword
                                        }
                                    }).then(({data}) => {
                                        if (data && data.code === 0) {
                                            this.$message({
                                                message: '操作成功,请重新登录',
                                                type: 'success',
                                            })
                                            //操作成功退出登录
                                            this.logoutHandle()
                                        } else {
                                            this.$message.error(data.msg)
                                        }
                                    })
                                }
                            })
                        },
                        toDorm(dbId){
                            // this.$destroy
                            // this.$destroy("Dorm")
                            if(this.$route.path!=="/home/dorm/list/"+dbId){
                                this.$router.push({
                                    path:"/home/dorm/list/"+dbId

                                })
                            }

                        },
                        toIndex(){
                            console.log(this.user.adminId);
                            if(this.$route.path!=="/home/index"){
                                this.$router.push({
                                    path:"/home/index"

                                })
                            }
                        },
                        toDormBuild(){

                            if(this.$route.path!=="/home/dormbuild/list"){
                                this.$router.push("/home/dormbuild/list")
                            }

                        },
                        toAdmin(){

                            if(this.$route.path!=="/home/admin/list"){
                                this.$router.push("/home/admin/list")
                            }

                        },
                        toEcharts(){

                            if(this.$route.path!=="/home/statistics/echarts"){
                                this.$router.push("/home/statistics/echarts")
                            }

                        },
                        toEchartspie(){

                            if(this.$route.path!=="/home/statistics/echartspie"){
                                this.$router.push("/home/statistics/echartspie")
                            }

                        },
                        toEchartssca(){

                            if(this.$route.path!=="/home/statistics/echartssca"){
                                this.$router.push("/home/statistics/echartssca")
                            }

                        },
                        updatePasswordHandle(){
                              this.visible=true
                            this.cleanForm()
                        },
                        cleanForm(){
                            this.dataForm.password=''
                            this.dataForm.newPassword=''
                            this.dataForm.confirmPassword=''
                        },
                        logoutHandle(){
                            this.$http.get({
                                url:"cqcvc_dorm/admin/closesession"
                            }).then( data =>{
                                this.$router.replace("/login")
                            })
                        },
                        handleOpen(key, keyPath) {
                            // console.log(key, keyPath);
                        },
                        handleClose(key, keyPath) {
                            // console.log(key, keyPath);
                        },
                        getDormBuildList(){
                            this.$http.get({
                                url:"cqcvc_dorm/dormbuild/list",
                            }).then(({data})=> {

                                this.dormBuildList=data.list
                            })
                        }

                    },
                    computed:{
                        key(){
                            return this.$route.path
                        },

                        // #判断是否可见
                    },
                    created() {
                        this.getAdmin()
                        this.getDormBuildList()
                        // 组件创建完毕之后为图片的url赋值


                    },
                }
                </script>

                <style>
                  .el-header {
                    background-color: #B3C0D1;
                    color: #333;
                    line-height: 60px;
                  }

                  .el-aside {
                    color: #333;
                  }
                </style>
