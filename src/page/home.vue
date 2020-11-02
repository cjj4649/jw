<template>
   <div class="all">
     <el-container>
       <el-header>
         <router-link to="/index"><div class="iconfont iconzuojiantou-copy"></div></router-link>
         <div style="color:#fff; margin-left:85px">当前浏览:{{fromData.areaname}}</div>
         <el-input class="search" type="text"  size="medium" v-model="Stext"></el-input><button class="iconfont iconfangdajing" id="header-search-btn" @click="search"></button>
         <ul class="navbar" style="color:#ffff">
           <li v-show="username">欢迎!{{username}}</li>
           <li v-show="!username">去登陆？</li>
           <li>美食补充</li>
           <li>关于我们</li>
         </ul>
       </el-header>
         <div class="food-box"> 
           <div class="pic-box">
            <div style="border-bottom: #e3e4e5 solid 2px; margin-bottom: 10px"></div>
           <el-carousel :interval="4000" type="card" height="400px" style="opacity:90%">
           <el-carousel-item v-for="(item, index) in picList" :key="index">
             <div>
               <label>{{picList[index].foodname}}</label>
                <label>:{{picList[index].foodpl}}</label>
          <img :src="picList[index].foodimg" alt="" class="pic">
         
        </div>
        </el-carousel-item>
          </el-carousel>
          
          <div class="pinglun">
            

            
         </div>
          </div>
         </div>
     </el-container>
      
  </div>
</template>
<script>

import axios from 'axios'
import qs from 'qs'

import '../css/font_1685723_vxb33keaz5/iconfont.css'
export default {
    data () {
        return {
          picList: [
          ],
          fromData: {
            areaname: ""
          },
          foodname:'食物名称',
          username: '',
          menuList: [],
          areaname: '',
          introduce:'省份内容',
          Stext: '',
    }
},
mounted () {
  
  let url = document.location.href
  var urlList = url.split('=');//“=”代表你拿哪个标点符号后的值例如：“/”“？”
  var place = decodeURIComponent(urlList[urlList.length-1]);
 
  this.fromData.areaname = place

     axios.defaults.headers.post['Content-Type'] = 'appliction/x-www-form-urlencoded'
             axios({
                     method: 'post',
                     url: 'http://localhost:8080/user/getfood',
                     data: qs.stringify(this.fromData),
                     headers: {
                        'Content-Type': 'application/x-www-form-urlencoded'
                     }
             }).then(data => {
                 this.picList = data.data.detail
                 console.log(this.picList)
                 if(data.data.code===0) {
 
                     this.$message({
                        type: 'success',
                        message: data.data.msg
                     })
           
                 } else {
                    this.$message({
                         type: 'error',
                         message: data.data.msg
                    }) 
                 }
             })
           
            
        
},
methods: {
  search () {
    alert("aaa")
  }

  
  }
}
</script>

<style scoped>
.pic {
  width: 600px;
  height: 400px;
}
.all {
  background: url('../assets/a.jpg') ;
      width:100%;
    height:100%;
    background-size:100% 100%;
    position:absolute;
  
}
.el-header {

  opacity: 90%;
}


.iconzuojiantou-copy {
  color: #9999;
  border: #9999 solid 2px;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-left: 10px;

}

.pinglun {
   border-top: #ffff solid 2px;
}
.navbar {
    height: 100%;
    display: flex;
    align-items: center;
    font-size: 14px;
    margin-left: 305px;
}
.navbar1  {

      width: 500px;
    display: flex;
    align-items: center;
    justify-content: space-around;

}
.navbar1 li {
  margin-left: 20px;
  color: white;

}
.navbar2 {
  opacity: 90%;
    width: 450px;
    border: #fff solid 1px;
    display: flex;
    align-items: center;
    justify-content: space-around;

}

.navbar li {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 120px;
  height: 100%;
  color: white;
}
.navbar li:hover {
  border: #ffff solid 1px;
  }
.navbar  a{

  color: #fff; 
}



 .el-carousel__item h3 {
    color: #475669;
    font-size: 14px;
    opacity: 0.75;
    line-height: 200px;
    margin: 0;
  }
  
  .el-carousel__item:nth-child(2n) {
    font-size: 12px;


    margin: 0;
    background-color: #fff;
  }
  
  .el-carousel__item:nth-child(2n+1) {
    font-size: 12px;


    margin: 0;
    background-color: #fff;
  }

.el-header {
  display: flex;
  align-items: center;
  box-sizing: border-box;
}

.iconfangdajing {
  width: 50px;
  color: #9999;
  height: 36px;
  background: white ;
  border:1px solid #9999;
  border-top-right-radius: 10px;
  border-bottom-right-radius: 10px;
}

.el-input{

  width: 400px;
  margin-left: 20px;

}
.food-box {
  margin-top: 66px;


  width:100%;
}
.pic-box {
  width: 1200px;
  margin: 0 auto;
}
</style>