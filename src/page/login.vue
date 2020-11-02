<template>
    <div class="all">
        <div><img src="../assets/1.png" class="logo"></div>
        <div class="box">
            <div style="margin: 20px; color:#fff">账号登录</div>
        <el-form :model="formData"  class="login-box" >
            <el-form-item prop="cont">
                <el-input type="text" v-model="formData.usercont" placeholder="请输入手机或者邮箱"></el-input>
            </el-form-item>
            <el-form-item  prop="pass">
                <el-input  v-model="formData.password" placeholder="请输入密码" type="password"></el-input>
            </el-form-item>
            <el-button type="primary"  @click="loginClick"> 登录</el-button>
        </el-form>
        <router-link to="/register"><div style="margin: 20px">去注册</div></router-link>
    </div>
</transition>
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
            }
        }
    },
    mounted() {
        console.log(this.$router)

    },
    methods: {
        loginClick () {
             axios.defaults.headers.post['Content-Type'] = 'appliction/x-www-form-urlencoded'
             axios({
                     method: 'post',
                     url: 'http://localhost:8080/user/login',
                     data: qs.stringify(this.formData),
                     headers: {
                        'Content-Type': 'application/x-www-form-urlencoded'
                     }
             }).then(data => {
                 console.log(data)
                 if(data.data.code===0) {
                     console.log(this.$router)
                     this.$message({
                        type: 'success',
                        message: data.data.msg
                     })
                     this.$router.replace({path:'/index'})
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
.logo {
    position: absolute;
    top: 108px;
    left: 262px;
}

.all {
    background: url("../assets/1.jpg") no-repeat;
    width: 100%;
    height: 100%;
    background-size:100% 100%;
    position:absolute;
}
.box {
    opacity: 88%;
    border-radius: 20px;
    position: relative;
    top: 170px;
    left: 260px;
    width: 400px;
    margin: 0 auto;
    background: #fff;
    display: flex;
    flex-direction: column;
     align-items: center;
    justify-content: center;
}
 .box::before {
    content: '';
    position: absolute;
    top:-2px;
    left: -2px;
    right: -2px;
    bottom: -2px;
    background: #FFFFFF;
    z-index: -1;/*元素堆叠顺序*/
            
        }

 .box::after {
    content: '';
    position: absolute;
    top: -5px;
    left: -5px;
    right: -5px;
    bottom: -5px;
    background: #FFFFFF;
    z-index: -2;
    /*添加模糊滤镜*/
    filter: blur(10px);
        }
 .box::before,
 .box::after{
     
            /*三色渐变，中间为背景色，融入背景*/
            background: linear-gradient(235deg,#614915,#060c21,#523b0b);
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
a {
  text-decoration: none;
  color: #fff;

}
 
.router-link-active {
    
  text-decoration: none;
}
</style>