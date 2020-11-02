<template>
    <div>
        <div class="box">
            <div style="margin: 20px ">账号注册</div>
        <el-form :model="formData" class="login-box" >
            <el-form-item>
                <el-input type="text" v-model="formData.usercont" placeholder="请输入手机或者邮箱"></el-input>
            </el-form-item>
            <el-form-item >
                <el-input  v-model="formData.password" placeholder="请输入密码" type="password"></el-input>
            </el-form-item>
            <!-- <el-form-item >
                <el-input  v-model="formData.password" placeholder="请确认密码" type="password"></el-input>
            </el-form-item> -->
             <el-form-item >
                <el-input  v-model="formData.username" placeholder="请输入姓名" ></el-input>
            </el-form-item>
            <el-button type="primary"  @click="registClick"> 注册</el-button>
        </el-form>
        
    </div>

    </div>

</template>
<script>

import axios from 'axios'
import qs from 'qs'

export default {
    name: "login",
    data () {
        return {
            formData: {
                usercont: "",
                password: "",
                username:""
            }
        }
    },
    mounted() {
        console.log(this.$router)
    },
    methods: {
        registClick () {
             axios.defaults.headers.post['Content-Type'] = 'appliction/x-www-form-urlencoded'
             axios({
                     method: 'post',
                     url: 'http://localhost:8080/user/regist',
                     data: qs.stringify(this.formData),
                     headers: {
                        'Content-Type': 'application/x-www-form-urlencoded'
                     }
             }).then(data => {
                 console.log(data)
                 if(data.data.code===0) {
                     this.$message({
                        type: 'success',
                        message: data.data.msg
                     })
                     console.log(this.$router)
                     this.$router.replace({path:'/login'})
                 } else {
                   this.$message({
                         type: 'error',
                         message: data.data.msg
                    })
                 }
             })
           
            
        }
    }
}
</script>
<style scoped>

.box {
    display: flex;
     flex-direction: column;
     align-items: center;
    justify-content: center;
}
.login-box {

    display: flex;
    justify-content: center;
    flex-wrap: wrap;
     flex-direction: column;
     align-items: center;
}
.el-input {
    width: 230px;
}
.el-button {
    width: 230px;
 
        
}
</style>