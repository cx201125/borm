<template>
  <div>
    <el-table :data="tableData">
      <el-table-column prop="createtime" :sortable="true" label="创建时间">

      </el-table-column>
      <el-table-column prop="username" label="用户名">
      </el-table-column>
      <el-table-column  label="真实姓名">

        <template slot-scope="scope">
          <el-popover trigger="hover" placement="top">
            <p>姓名: {{ scope.row.realname }}</p>
            <p>住址: {{ scope.row.homeAddr }}</p>
            <p>电话: {{ scope.row.phone }}</p>
            <div slot="reference" class="name-wrapper">
              <el-tag>{{ scope.row.realname }}</el-tag>
            </div>
          </el-popover>
        </template>
      </el-table-column>

      <el-table-column label="性别">

        <template slot-scope="scope">
          <span style="margin-left: 10px">{{ scope.row.adminSex===0?'男':'女' }}</span>
        </template>
      </el-table-column>



      <el-table-column prop="updatetime" label="更新时间">
      </el-table-column>

      <el-table-column
              align="right" width="200">
        <template slot="header" slot-scope="scope">
          <el-button type="success"@click="handleAdd()">新增</el-button>
        </template>
        <template slot-scope="scope">
          <el-button
                  size="mini"
                  @click="handleEdit(scope.$index, scope.row)">Edit</el-button>

          <el-button
                  size="mini"
                  type="danger"
                  @click="handleDelete(scope.$index, scope.row)">Delete</el-button>
        </template>
      </el-table-column>
    </el-table>

    <el-dialog center :visible.sync="dialogFormVisible" width="800px">
      <div slot="title">
        <h4>{{title}}</h4>
      </div>
      <el-form :model="adminForm" :rules="dataRule" ref="adminForm">
        <el-form-item label="用户名" label-width="120px" prop="username">
          <el-input v-model="adminForm.username" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="密码" label-width="120px" prop="password">
          <el-input v-model="adminForm.password" type="password" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="年龄" label-width="120px" prop="adminAge">
          <el-input v-model="adminForm.adminAge" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="真实姓名" label-width="120px">
          <el-input v-model="adminForm.realname" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="性别" label-width="120px">
          <el-select v-model="adminForm.adminSex" placeholder="请选择性别">
            <el-option label="男" :value="0"></el-option>
            <el-option label="女" :value="1"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="电话" label-width="120px">
          <el-input v-model="adminForm.phone" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="家庭住址" label-width="120px">
          <el-input v-model="adminForm.homeAddr" autocomplete="off"></el-input>
        </el-form-item>

      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="cancelForm()">取 消</el-button>
        <el-button type="primary" @click="submitForm()">确 定</el-button>
      </div>


    </el-dialog>
  </div>
</template>

<script>
    export default {
        name: "UserIndex",
        data(){
            return{
                dialogtype:"",
                title:"",
                tableData:[],
                dialogFormVisible:false,
                adminForm:{
                    adminId:0,
                    username:null,
                    password:null,
                    adminAge:null,
                    adminSex:null,
                    realname:null,
                    phone:null,
                    homeAddr:null,
                    headPortrait:null,
                    createtime:null,
                    updatetime:null,
                },
                dataRule: {
                    username: [
                        { required: true, message: '用户名不能为空', trigger: 'blur' },
                    ],
                    password: [
                        { required: true, message: '密码不能为空', trigger: 'blur' }
                    ],
                },
            }
        },
        components: {
        },
        methods:{
            getAdminList(){
                this.$http.get({
                    url:"cqcvc_dorm/admin/list",
                }).then(({data})=> {
                    this.tableData=data.page.list
                })
            },
            cancelForm(){
                this.dialogFormVisible=false
                this.clearForm()
            },
            submitForm(){
                this.$refs['adminForm'].validate((valid) => {
                    console.log(valid);
                    if (valid) {
                        this.$http.post(
                            {
                                url:"cqcvc_dorm/admin/saveOrUpdate",
                                data:this.adminForm
                            }
                        ).then(({data})=>{
                            //重新给后端发送请求
                            this.getAdminList();
                            this.dialogFormVisible=false
                            //拍段是否操作成功
                            if(data.code===0){
                                this.$message({
                                    type:"success",
                                    message:"操作成功"
                                })
                            }else{
                                if(data.code===0){
                                    this.$message({
                                        type:"error",
                                        message:"操作失败"
                                    })
                                }
                            }

                        })
                    } else {

                        return false;
                    }
                });

            },
            clearForm(){
                this.adminForm.adminId=null
                this.adminForm.adminAge=null
                this.adminForm.adminSex=null
                this.adminForm.username=null
                this.adminForm.password=null
                this.adminForm.realname=null
                this.adminForm.headPortrait=null
                this.adminForm.homeAddr=null
                this.adminForm.phone=null
                this.adminForm.updatetime=null
                this.adminForm.createtime=null
            },

            handleEdit(index, row) {
                //获取当前时间
                var date=new Date();
                date=date.getFullYear()+"-"+(date.getMonth()+1)+"-"+date.getDate()

                //为表单赋值
                this.dialogFormVisible=true;
                this.dialogtype="edit";
                this.title="修改用户信息"
                this.adminForm.adminId=row.adminId
                this.adminForm.adminAge=row.adminAge
                this.adminForm.adminSex=row.adminSex
                this.adminForm.username=row.username
                this.adminForm.password=row.password
                this.adminForm.realname=row.realname
                this.adminForm.headPortrait=row.headPortrait
                this.adminForm.homeAddr=row.homeAddr
                this.adminForm.phone=row.phone
                this.adminForm.updatetime=date

                console.log(this.adminForm)
                console.log(index, row);
            },
            handleDelete(index, row) {
                this.$confirm('此操作将永久删除该用户, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(()=>{
                    //向后台发送请求进行删除
                    this.$http.post({
                        url:"cqcvc_dorm/admin/delete",
                        data:[row.adminId]
                    }).then(({data}) =>{
                        if(data.code===0){
                            console.log(data);
                            this.$message({
                                type:"success",
                                message:"删除成功"
                            })

                        }else{
                            this.$message({
                                type:"error",
                                message:"删除失败"
                            })
                        }
                        this.getAdminList()
                    })
                }).catch(()=>{
                    this.$message({
                        type:"info",
                        message:"已取消删除"
                    })
                })


            },
            handleAdd(){
                //清空表单
                this.clearForm()
                //获取当前时间
                var date=new Date();
                date=date.getFullYear()+"-"+(date.getMonth()+1)+"-"+date.getDate()
                this.dialogFormVisible=true;
                this.dialogtype="add";
                this.title="添加用户信息";

                this.adminForm.createtime=date
                this.adminForm.updatetime=date
            }

        },
        computed:{

        },
        created() {

            this.getAdminList()

        }
    }
</script>

<style scoped>

</style>
