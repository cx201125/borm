<template>
  <div>
    <el-container>
      <el-header height="40px">
        <el-row>

          <el-col :span="6"><div class="grid-content bg-purple">
            <template>
              <el-select v-model="searchFloor"  clearable filterable @change="subFloor" placeholder="请选择楼层">
                <el-option
                        v-for="item in floorList"
                        :key="item"
                        :label="item"
                        :value="item">
                </el-option>
              </el-select>
            </template>
          </div></el-col>
          <el-col :span="6"><div class="grid-content bg-purple">

          </div></el-col>
          <el-col :span="6"><div class="grid-content bg-purple">

            <template>

                <el-input
                        placeholder="门牌号"
                        v-model="searchHouNum"
                        clearable
                >
                </el-input>



            </template>
          </div></el-col>

          <el-col :span="6"><div class="grid-content bg-purple">

            <el-button type="success" @click="subhouNum()" >查找</el-button>
          </div></el-col>
        </el-row>

      </el-header>
      <el-main>
        <el-dialog center :visible.sync="dialogFormVisible">
          <div slot="title">
            <h4>{{title}}</h4>
          </div>

          <el-form :model="Dorm" label-position="left" :rules="dormRule" ref="Dorm">
            <el-form-item label="门牌号" label-width="120px" prop="houNum">
              <el-input v-model="Dorm.houNum" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="楼层" prop="floor">
              <el-select v-model="Dorm.floor" placeholder="请选择楼层" label-width="120px">
                <el-option
                        v-for="item in floorList"
                        :key="item"
                        :label="item"
                        :value="item">
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="床位数量" label-width="120px" prop="bedCount">
              <el-input v-model="Dorm.bedCount" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="是否居住" label-width="120px" prop="isReside">
              <el-switch
                      v-model="Dorm.isReside"
                      active-color="#13ce66"
                      inactive-color="#ff4949">
              </el-switch>
            </el-form-item>
            <el-form-item label="描述" label-width="120px" prop="dormDescribe">
              <el-input
                      type="textarea"
                      placeholder="请输入描述内容"
                      v-model="Dorm.dormDescribe"
                      maxlength="30"
                      show-word-limit
              >
              </el-input>
            </el-form-item>

          </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button @click="dialogFormVisible=falsef">取 消</el-button>
            <el-button type="primary" @click="submitForm()">确 定</el-button>
          </div>
        </el-dialog>
        <el-table :data="tableData">

        <el-table-column
                type="index"
                width="50">
        </el-table-column>
        <el-table-column prop="floor"  label="楼层">
        </el-table-column>

        <el-table-column  label="门牌号">

        <template slot-scope="scope">
          <el-popover trigger="hover" placement="top">
            <p>门牌号: {{ scope.row.houNum}}</p>
            <p>描述: {{ scope.row.dormDescribe}}</p>
            <div slot="reference" class="name-wrapper">
              <el-tag>{{ scope.row.houNum}}</el-tag>
            </div>
          </el-popover>
        </template>
      </el-table-column>

        <el-table-column  label="是否显示学生" >

          <template slot-scope="scope">

                <el-button type="primary" plain @click="showStu(scope.row.dormId)">显示</el-button>

          </template>
        </el-table-column>





        <el-table-column prop="bedCount" label="床位数量">
        </el-table-column>




        <el-table-column label="是否用于居住">

          <template slot-scope="scope">
            <span style="margin-left: 10px">{{ scope.row.isReside===0?'是':'否' }}</span>
          </template>
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
                <el-button type="success"  @click="stuAdd()">新增</el-button>
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
          <el-form :model="stuForm" :rules="stuRule" ref="stuForm">
            <el-form-item label="学号" label-width="120px" prop="stuNum">
              <el-input v-model="stuForm.stuNum" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="名字" label-width="120px" prop="stuName">
              <el-input v-model="stuForm.stuName" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="电话" label-width="120px" prop="phone">
              <el-input v-model="stuForm.phone" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="系部" label-width="120px" prop="department">
              <el-input v-model="stuForm.department" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="年级" label-width="120px" prop="grade">
              <el-input v-model="stuForm.grade" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="班级" label-width="120px" prop="stuClass">
              <el-input v-model="stuForm.stuClass" autocomplete="off"></el-input>
            </el-form-item>

          </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button @click="cancelStuFrom()">取 消</el-button>
            <el-button type="primary" @click="subStuForm()">确 定</el-button>
          </div>
        </el-dialog>
      </el-main>
    </el-container>

  </div>

</template>

<script>
    export default {
        name: "Dorm",
        data(){
            return {
                dialogtype:"",
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
                searchHouNum:'',
                searchFloor:null,
                stuTable:false,
                stuData:[],
                stuDialog:false,
                stuDialogType:"",
                stuTitle:null,
                Dorm:{
                    dormId:null,
                    floor:null,
                    houNum:null,
                    isReside:true,
                    bedCount:null,
                    dormDescribe:null,
                    dormBuildId:null
                },
                DormBuild:{
                    dbId:null,
                    dbName:null,
                    dbDescribe:null,
                    dbCount:null,

                },
                floorList:[],
                tableData:[],
                dialogFormVisible:false,
                title:"",
                dormRule: {
                    houNum: [
                        { required: true, message: '房间号不能为空', trigger: 'blur' },
                    ],
                    floor: [
                        { required: true, message: '楼层不能为空', trigger: 'blur' }
                    ],
                    isReside: [
                        { required: true, message: '是否居住不能为空', trigger: 'blur' }
                    ],
                    bedCount: [
                        { required: true, message: '床位数量不能为空', trigger: 'blur' }
                    ],
                    dormDescribe: [
                        { required: true, message: '描述不能为空', trigger: 'blur' }
                    ],
                },

                stuRule: {
                    stuNum: [
                        { required: true, message: '学号不能为空', trigger: 'blur' },
                    ],
                    stuName: [
                        { required: true, message: '姓名不能为空', trigger: 'blur' }
                    ],
                    phone: [
                        { required: true, message: '电话不能为空', trigger: 'blur' }
                    ],
                    grade: [
                        { required: true, message: '所在年级不能为空', trigger: 'blur' }
                    ],
                    department: [
                        { required: true, message: '院系不能为空', trigger: 'blur' }
                    ],
                    stuClass: [
                        { required: true, message: '班级不能为空', trigger: 'blur' }
                    ],

                },

            }
        },
        methods:{
            getDormByDbId(){
                this.Dorm.dormBuildId=this.$route.params.dbId
                this.$http.get({
                    url:"cqcvc_dorm/dorm/list/"+this.Dorm.dormBuildId
                }).then(({data}) => {


                        this.tableData = data.list
                    if(this.floorList.length===0) {
                        setTimeout(() => {
                            for (let i = 1; i <= this.DormBuild.dbCount; i++) {
                                this.floorList.push(i)
                            }

                        }, 300)
                    }




                })

            },
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
            },
            subStuForm(){
                this.$refs['stuForm'].validate((valid) => {
                    if (valid) {
                        this.$http.post(
                            {
                                url:"cqcvc_dorm/stu/saveOrUpdate",
                                data:this.stuForm
                            }
                        ).then(({data})=>{
                            //重新给后端发送请求
                            this.sendStuReq()
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
                    } else {
                        return false
                    }
                });

            },
            stuAdd(){
                console.log(this.Dorm);
                this.cleanStuFrom()
                this.stuDialog=true
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
                        this.sendStuReq()
                    })
                }).catch(()=>{
                    this.$message({
                        type:"info",
                        message:"已取消删除"
                    })
                })
            },
            showStu(dormId){
                this.stuForm.dormId=dormId
                this.stuTable=true
                this.sendStuReq()
            },
            sendStuReq(){
                this.$http.get({
                    url:"cqcvc_dorm/stu/dormstu/"+this.stuForm.dormId
                }).then(({data}) => {
                    console.log(data);
                    this.stuData=data.list
                })
            },
            handleAdd(){
                console.log(this.DormBuild);
                this.clearForm()
                this.dialogFormVisible=true;
                this.Dorm.dormBuildId=this.DormBuild.dbId
                this.dialogtype="add";
                this.title="添加宿舍楼信息";
            },
            handleDelete(index, row) {
                this.$confirm('此操作将永久删除该宿舍, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(()=>{
                    //向后台发送请求进行删除
                    this.$http.post({
                        url:"cqcvc_dorm/dorm/delete",
                        data:[row.dormId]
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
                        this.getDormByDbId()
                    })
                }).catch(()=>{
                    this.$message({
                        type:"info",
                        message:"已取消删除"
                    })
                })


            },
            handleEdit(index, row) {

                //为表单赋值
                this.dialogFormVisible=true;
                this.dialogtype="edit";
                this.title="修改用户信息"
                this.Dorm.dormId=row.dormId
                this.Dorm.floor=row.floor
                this.Dorm.houNum=row.houNum
                this.Dorm.isReside=row.isReside===0?true:false
                this.Dorm.bedCount=row.bedCount
                this.Dorm.dormDescribe=row.dormDescribe
                this.Dorm.dormBuildId=row.dormBuildId


                console.log(this.dbForm)
                console.log(index, row);
            },
            submitForm(){
                this.$refs['Dorm'].validate((valid) => {
                    if (valid) {
                        this.Dorm.isReside=this.Dorm.isReside?0:1
                        this.$http.post(
                            {
                                url:"cqcvc_dorm/dorm/saveOrUpdate",
                                data:this.Dorm
                            }
                        ).then(({data})=>{
                            //重新给后端发送请求
                            this.getDormByDbId();
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
                            //还原表单

                        })
                    } else {

                        return false;
                    }
                });

            },

            clearForm(){
                this.Dorm.dormId=null
                this.Dorm.floor=null
                this.Dorm.houNum=null
                this.Dorm.isReside=true
                this.Dorm.bedCount=null
                this.Dorm.dormDescribe=null
                this.Dorm.dormBuildId=null
            },
            subhouNum(){

                let value=this.searchHouNum
                if(value!=null && value!=="") {
                    this.$http.get({
                        url: "cqcvc_dorm/dorm/hounum",
                        params:{
                            "dormBuildId":this.DormBuild.dbId,
                            "hounum":value
                        }
                    }).then(data => {
                        this.tableData = data.data.list
                    })
                }
            },
            getDbById(){
                this.$http.get({
                    url:"cqcvc_dorm/dormbuild/info/"+this.Dorm.dormBuildId
                }).then(({data}) => {
                    console.log(data);
                    this.DormBuild=data.dormBuild
                })

            },
            subFloor(value){

                if(value!=null && value!=="") {
                    this.$http.get({
                        url: "cqcvc_dorm/dorm/floor",
                        params:{
                            "dormBuildId":this.DormBuild.dbId,
                            "floor":value
                        }
                    }).then(data => {
                        this.tableData = data.data.list
                    })
                }
            }
        },
        created() {

            // 根据dormBuildId获取宿舍信息
            this.getDormByDbId()
            //根据dbid获取宿舍楼的信息
            this.getDbById()
        },



    }
</script>

<style scoped>
  .el-header{
    background-color: white;

  }
  .bg-purple {
    background: white;
    text-align: left;
  }
  .grid-content {
    border-radius: 4px;
    min-height: 36px;
    line-height: 20px;
  }
</style>
