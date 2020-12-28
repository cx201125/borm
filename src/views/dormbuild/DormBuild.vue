<template>
  <div>
    <el-table :data="tableData">
      <el-table-column
              type="index"
              width="50">
      </el-table-column>


      <el-table-column  label="宿舍楼名称">

        <template slot-scope="scope">
          <el-popover trigger="hover" placement="top">
            <div>
              描述:{{scope.row.dbDescribe}}
            </div>
            <div slot="reference" class="name-wrapper">
              <el-tag>{{ scope.row.dbName }}</el-tag>
            </div>
          </el-popover>
        </template>
      </el-table-column>

      <el-table-column prop="dbCount" label="楼层">
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
          <el-dialog center :visible.sync="dialogFormVisible" width="800px">
            <div slot="title">
              <h4>{{title}}</h4>
            </div>
            <el-form :model="dbForm">
              <el-form-item label="宿舍楼名称" label-width="120px">
                <el-input v-model="dbForm.dbName" autocomplete="off"></el-input>
              </el-form-item>
              <el-form-item label="宿舍楼描述" label-width="120px">
                <el-input v-model="dbForm.dbDescribe" autocomplete="off"></el-input>
              </el-form-item>
              <el-form-item label="楼层" label-width="120px">
                <el-input v-model="dbForm.dbCount" autocomplete="off"></el-input>
              </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
              <el-button @click="cancelForm()">取 消</el-button>
              <el-button type="primary" @click="submitForm()">确 定</el-button>
            </div>
          </el-dialog>
          <el-button
                  size="mini"
                  type="danger"
                  @click="handleDelete(scope.$index, scope.row)">Delete</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
    export default {
        name: "UserIndex",
        data(){
            return{
                dialogtype:"",
                title:"",
                search:"",
                tableData:[],
                dialogFormVisible:false,
                dbForm:{
                    dbId:null,
                    dbName:null,
                    dbDescribe:null,
                    dbCount:null,

                }
            }
        },
        components: {
        },
        methods:{
            getdromBuildList(){
                this.$http.get({
                    url:"cqcvc_dorm/dormbuild/list",
                }).then(({data})=> {
                    console.log(data);
                    this.tableData=data.list
                })
            },
            cancelForm(){
                this.dialogFormVisible=false
            },
            submitForm(){
                this.$http.post(
                    {
                      url:"cqcvc_dorm/dormbuild/saveOrUpdate",
                        data:this.dbForm
                    }
                ).then(({data})=>{
                    //重新给后端发送请求(重新请求数据)
                    this.getdromBuildList();
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
            },
            clearForm(){
                this.dbForm.dbId=null
                this.dbForm.dbName=null
                this.dbForm.dbCount=null
                this.dbForm.dbDescribe=null
            },

            handleEdit(index, row) {

                //为表单赋值
                this.dialogFormVisible=true;
                this.dialogtype="edit";
                this.title="修改用户信息"
                this.dbForm.dbId=row.dbId
                this.dbForm.dbName=row.dbName
                this.dbForm.dbCount=row.dbCount
                this.dbForm.dbDescribe=row.dbDescribe


                console.log(this.dbForm)
                console.log(index, row);
            },
            handleDelete(index, row) {
                this.$confirm('此操作将永久删除该楼层, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(()=>{
                    //向后台发送请求进行删除
                    this.$http.post({
                        url:"cqcvc_dorm/dormbuild/delete",
                        data:[row.dbId]
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
                        this.getdromBuildList();
                    })
                }).catch(()=>{
                    this.$message({
                        type:"info",
                        message:"已取消删除"
                    })
                })


            },
            handleAdd(){
                this.clearForm()
                this.dialogFormVisible=true;
                this.dialogtype="add";
                this.title="添加宿舍楼信息";

            }

        },
        computed:{

        },
        created() {

            this.getdromBuildList()

        }
    }
</script>

<style scoped>

</style>
