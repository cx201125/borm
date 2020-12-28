<template>
  <div>
  <el-drawer
          :visible.sync="stuTable"
          direction="rtl"
          size="75%">
    <el-table :data="stuData">
      <el-table-column
              type="index"
              width="50">
      </el-table-column>
      <el-table-column property="stuNum" label="学号" ></el-table-column>

      <el-table-column  label="姓名">
        <template slot-scope="scope">
          <el-popover trigger="hover" placement="top">
            <p>姓名: {{ scope.row.stuName}}</p>
            <p>电话: {{ scope.row.phone}}</p>
            <div slot="reference" class="name-wrapper">
              <el-tag>{{ scope.row.stuName}}</el-tag>
            </div>
          </el-popover>
        </template>

      </el-table-column>
      <el-table-column property="department" label="系部" ></el-table-column>
      <el-table-column property="grade" label="年级"></el-table-column>
      <el-table-column property="stuClass" label="班级"></el-table-column>

      <el-table-column
              align="right">
        <template slot="header" slot-scope="scope">
          <el-button type="success"@click="stuAdd()">新增</el-button>
        </template>
        <template slot-scope="scope">
          <el-button
                  size="mini"
                  @click="stuEdit(scope.$index, scope.row)">Edit</el-button>
          <el-button
                  size="mini"
                  type="danger"
                  @click="stuDelete(scope.$index, scope.row)">Delete</el-button>
        </template>
      </el-table-column>


    </el-table>
  </el-drawer>

  <el-dialog :title="stuTitle" :visible.sync="stuDialog">
    <el-form :model="stuForm">
      <el-form-item label="学号" label-width="120px">
        <el-input v-model="stuForm.stuNum" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="名字" label-width="120px">
        <el-input v-model="stuForm.stuName" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="电话" label-width="120px">
        <el-input v-model="stuForm.phone" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="系部" label-width="120px">
        <el-input v-model="stuForm.department" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="年级" label-width="120px">
        <el-input v-model="stuForm.grade" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="班级" label-width="120px">
        <el-input v-model="stuForm.stuClass" autocomplete="off"></el-input>
      </el-form-item>

    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="cancelStuFrom()">取 消</el-button>
      <el-button type="primary" @click="subStuForm()">确 定</el-button>
    </div>
  </el-dialog>
  </div>
</template>

<script>
    export default {
        name: "Stu",
        props:["studormid","isshow"]
        ,
        data(){
            return {
                stuForm:{
                    stuId:null,
                    stuNum:null,
                    stuName:null,
                    phone:null,
                    department:null,
                    grade:null,
                    stuClass:null,
                    dormId:null
                },
                dormId:this.studormid,
                stuTable:this.isshow,
                stuData:[],
                stuDialog:false,
                stuDialogType:"",
                stuTitle:null,

            }
        },
        methods:{
            cancelStuFrom(){
                this.stuDialog=false;
                this.cleanStuFrom()
            },
            cleanStuFrom(){
                this.stuForm.stuId=null
                this.stuForm.stuNum=null
                this.stuForm.stuName=null
                this.stuForm.phone=null
                this.stuForm.department=null
                this.stuForm.grade=null
                this.stuForm.stuClass=null
                this.stuForm.dormId=null
            },
            subStuForm(){

                this.$http.post(
                    {
                        url:"cqcvc_dorm/stu/saveOrUpdate",
                        data:this.stuForm
                    }
                ).then(({data})=>{
                    //重新给后端发送请求
                    this.showStu()
                    this.stuDialog=false
                    //判断是否操作成功
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
            },
            stuAdd(){
                this.cleanStuFrom()
                this.stuDialog=true
                this.stuForm.dormId=this.dormId
                this.stuDialogType="add";
                this.stuTitle="添加学生信息";
            },
            stuEdit(index,row){
                this.stuDialog=true
                this.stuForm.stuId=row.stuId
                this.stuForm.stuNum=row.stuNum
                this.stuForm.stuName=row.stuName
                this.stuForm.phone=row.phone
                this.stuForm.department=row.department
                this.stuForm.grade=row.grade
                this.stuForm.stuClass=row.stuClass
                this.stuForm.dormId=row.dormId
                this.stuDialogType="edit";
                this.stuTitle="编辑学生信息";

            },
            stuDelete(index,row){
                this.$confirm('此操作将删除该学生, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(()=>{
                    //向后台发送请求进行删除
                    this.$http.post({
                        url:"cqcvc_dorm/stu/delete",
                        data:[row.stuId]
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
                        //重新获取网页数据
                        this.showStu()
                    })
                }).catch(()=>{
                    this.$message({
                        type:"info",
                        message:"已取消删除"
                    })
                })
            },
            showStu(){
                this.$http.get({
                    url:"cqcvc_dorm/stu/dormstu/"+this.dormId
                }).then(({data}) => {
                    console.log(data);
                    this.stuData=data.list
                })
            },
        },


        created() {
            console.log(this.dormId,this.stuTab);
        },
        beforeUpdate() {
            console.log("====");
        }
    }
</script>

<style scoped>

</style>
