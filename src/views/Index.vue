<template>
  <div>

    <h1>{{title}}</h1>
    <el-calendar v-model="value">
    </el-calendar>

  </div>
</template>

<script>
    export default {
        name: "Index",
        data() {
            return {
                admin:{},
                value: new Date()
            }
        },
        methods:{
            getAdmin(){
                this.$http.get({
                    url:"cqcvc_dorm/admin/info/"+this.$store.state.userId
                }).then( ({data}) =>{
                        this.admin=data.admin
                    }
                )
            },
        },
        computed:{
            title(){
                var hour = new Date().getHours()
                var title=""
                if(hour < 6){title+="凌晨好"}
                else if (hour < 9){title+="早上好"}
                else if (hour < 12){title+="上午好"}
                else if (hour < 14){title+="中午好"}
                else if (hour < 17){title+="下午好"}
                else if (hour < 19){title+="傍晚好"}
                else if (hour < 22){title+="晚上好"}
                else {title+="夜里好"}
                title+="!"+this.admin.realname
                if(this.admin.adminSex===0){
                    title+="先生"
                }else{
                    title+="女士"
                }


                return title
            }
        },
        created() {
            this.getAdmin()
        }
    }
</script>

<style scoped>
  .mod-home {
    line-height: 1.5;
  }
</style>
