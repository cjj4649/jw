<template>
    <div>
             <div class="title"><div @click="change1">数据上传</div><div @click="change0">数据修改</div></div>
        <el-form class="all1" :model="fromData" v-show="value">
            <!-- 1 -->
 
                 <div>选择省份</div>
            <el-select v-model="fromData.areaname"  @change="areaChange(value)">
             <el-option
                 v-for="item in options"
                :label="item.name"
                :key="item.id"
                :value="item.name">
            </el-option>
            </el-select>


            <!-- 2 -->
                <br>
               <div>上传图片</div>
          <el-upload
                name="uploadfile"
               action="http://localhost:8080/oss/uploadfile"
               :auto-upload ="true"
               class="upload-demo"
               :on-preview="handlePreview"
               :on-remove="handleRemove"
               :before-remove="beforeRemove"
                multiple
               :limit="1"
               :on-success="success"
               :on-change="handlePreview"
               :on-exceed="handleExceed"
               :file-list="fileList"
             >
                <el-button size="small" type="primary">点击上传</el-button>
                 </el-upload>


            <!-- 3 -->
  <br>
            <div>食物名字</div>
            <el-input type="text"  v-model="fromData.foodname"></el-input>


            <!-- 4 -->
  <br>
            <div>食物评论</div>
            <el-input type="text"  v-model="fromData.foodpl"></el-input>

  <br>                  
            <el-button @click="setfood">提交</el-button>
        </el-form>


<!-- 收到是 -->
 <el-form  :model="fromData1" v-show="!value" class="all1">
            <!-- 1 -->
 
                 <div>选择省份</div>
            <el-select v-model="fromData1.areaname"  @change="areaChange1(value)">
             <el-option
                 v-for="item in options1"
                :label="item.name"
                :key="item.id"
                :value="item.name">
            </el-option>
            </el-select>



<el-dialog
  title="提示"
  :visible.sync="dialogVisible"
  width="30%"
  :before-close="handleClose">
    <el-form :model="fromData3">
        <div><label>食物名称</label><el-input type="text" v-model="fromData3.foodname"></el-input></div>
      <div  style="margin-bottom: 10px"><label>食物评论</label> <el-input type="text" v-model="fromData3.foodpl"></el-input></div> 
<div></div>
        <div  style="margin-bottom: 10px"><el-input type="text" v-model="fromData3.foodimg" :disabled="true"></el-input></div>
      
        <el-upload
                name="uploadfile"
               action="http://localhost:8080/oss/uploadfile"
               :auto-upload ="true"
               class="upload-demo"
               :on-preview="handlePreview"
               :on-remove="handleRemove"
               :before-remove="beforeRemove"
                multiple
               :limit="1"
               :on-success="success1"
               :on-change="handlePreview"
               :on-exceed="handleExceed"
               :file-list="fileList"
             >
                <el-button size="small" type="primary"  style="margin-bottom: 10px">图片修改</el-button>
                 </el-upload>
    </el-form>
    <el-button @click="dialogVisible = false">取 消</el-button>
    <el-button type="primary" @click="xiugaixinxi">修改信息</el-button>
  </span>
</el-dialog>

         <el-table
          :selectionShow="true"
      :data="tableData"
      @select="handleSelectionChange"
      style="width: 900px; margin: 0 auto">
      <el-table-column
      
      type="selection"
      width="55">
    </el-table-column>
      <el-table-column
        prop="foodname"
        label="名字"
        width="180">
      </el-table-column>
      <el-table-column
        prop="foodpl"
        label="评论"
        width="180">
      </el-table-column>
      <el-table-column
        prop="foodimg"
        label="图片">
      </el-table-column>
      <el-table-column
      :formatter="text"
        prop="ifshow"
        label="是否显示">
      </el-table-column>
    </el-table>
    <div>
            <el-button @click="getfood">查看</el-button>
            <el-button  @click="xiugai" type="primary">修改</el-button>
            <el-button  @click="changetext" type="primary">显示</el-button>
            <el-button  @click="changetext1" type="primary">隐藏</el-button></div>
        </el-form>

    </div>
</template>
<script>

import axios from 'axios'
import qs from 'qs'

export default {
    data () {
        return {
                flag: {},
                flag2: [],
               dialogVisible: false,
             tableData: [{}],
             fileList:[],
             value: true,
            fromData:{
              ifshow: 1,
            },
             fromData1:{
            },
             fromData3:{
            
            },
            options: [{
        }],
            options1: [{
        }],
            data:{}
        }
    },
    mounted () {
        
      axios
      .post("http://localhost:8080/user/getarea")
      .then(data => { 
          console.log(data.data.detail)
        console.log("返回的data是这个",data)
         this.options = data.data.detail
          this.options1 = data.data.detail
          console.log(this.options)
          
     })
      .catch(function (error) { // 请求失败处理
    })
    },
    getDetails(row){
        console.log(row)//此时就能拿到整行的信息
      },
    methods: {
      changetext() {
        this.fromData3.ifshow = 1
                 axios.defaults.headers.post['Content-Type'] = 'appliction/x-www-form-urlencoded'
          axios({
                     method: 'post',
                     url: 'http://localhost:8080/user/updateifshow',
                     data: qs.stringify(this.fromData3),

                     headers: {
                        'Content-Type': 'application/x-www-form-urlencoded'
                     }
             }).then(data => {
                 console.log("asdsad",data)
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
      changetext1() {
        this.fromData3.ifshow = 0
                 axios.defaults.headers.post['Content-Type'] = 'appliction/x-www-form-urlencoded'
          axios({     
                     method: 'post',
                     url: 'http://localhost:8080/user/updateifshow',
                     data: qs.stringify(this.fromData3),

                     headers: {
                        'Content-Type': 'application/x-www-form-urlencoded'
                     }
             }).then(data => {
                 console.log("asdsad",data)
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
       text (row, column) {
      return row.ifshow === 1 ? '显示状态' : row.ifshow === 0 ? '隐藏状态' : '未知'
    },
        handleSelectionChange (row) {
      console.log('handleSizeChange', row);
      this.flag = {};
      if (row.length != 0) {
         this.fromData3 = row[0]
         this.flag2 = row
 
      } else {
          this.fromData3 = this.flag
          this.flag2 = row
          
      }
      

    },
        change1() {

            this.value = true
            
        },
        change0() {
            this.value = false
        },
        success(response,file,fileList) {
                console.log(response.data)
                this.fromData.foodimg = response.data.url
        },
        success1(response,file,fileList) {
                console.log(response.data)
                this.fromData3.foodimg = response.data.url
        },
        remove(file, fileList) {
            alert("aaa")
        },
         handleRemove (file, fileList) {
      console.log(file, fileList)
    },
    handlePreview (file) {
        console.log(file)

    },
    handleExceed (files, fileList) {
      this.$message.warning(`当前限制选择 1 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length} 个文件`)
    },
    beforeRemove (file, fileList) {
      return this.$confirm(`确定移除 ${file.name} ？`)
    },

        setfood() {
             axios.defaults.headers.post['Content-Type'] = 'appliction/x-www-form-urlencoded'
             if (this.fromData.areaname == null) {
                    this.$message({
                        type: 'error',
                        message: "请选择省份"
                     })
             } else {
                 axios({
                     method: 'post',
                     url: 'http://localhost:8080/user/setfood',
                     data: qs.stringify(this.fromData),

                     headers: {
                        'Content-Type': 'application/x-www-form-urlencoded'
                     }
             }).then(data => {
                 console.log("asdsad",data)
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

             }
             

        },
        getfood() {
            axios.defaults.headers.post['Content-Type'] = 'appliction/x-www-form-urlencoded'
            if (this.fromData1.areaname == null) {
                 this.$message({
                        type: 'error',
                        message: "选择省份"
                     })
            } else {
                axios({
                     method: 'post',
                     url: 'http://localhost:8080/user/getfoodall',
                     data: qs.stringify(this.fromData1),
                     headers: {
                        'Content-Type': 'application/x-www-form-urlencoded'
                     }
             }).then(data => {
                 this.tableData = data.data.detail
                 console.log(this.tableData)
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
            }
             
            
        },
      areaChange1(value) {
          console.log(this.fromData1.areaname)
      },
      areaChange(value) {
          console.log(this.fromData.areaname)
      },
     handleClose(done) {
        this.$confirm('确认关闭？')
          .then(_ => {
            done();
          })
          .catch(_ => {});
      },
      xiugai() {
         
     console.log(this.flag2)
          if (this.flag2.length == 1) {
        this.dialogVisible=true
          } else {
                this.$message({
                         type: 'error',
                         message: "选择数据且至多选择一条数据"
                    }) 
          }
         
         
        
      },
       xiugaixinxi() {
             axios({
                     method: 'post',
                     url: 'http://localhost:8080/user/updatefood',
                     data: qs.stringify(this.fromData3),
                     headers: {
                        'Content-Type': 'application/x-www-form-urlencoded'
                     }
             }).then(data => {
               console.log(data)
                 if(data.data.code===0) {
                    this.dialogVisible = false
                     this.getfood()
                     this.$message({
                        type: 'success',
                        message: data.data.msg
                     })
           
                 } else {
                    this.dialogVisible = true
                    this.$message({
                         type: 'error',
                         message: data.data.msg
                    }) 
                 }
             })

     
      },
    }
}
</script>
<style scoped>
.title {

    display: flex;
    justify-content: space-around;
    margin-bottom: 50px;
}

.title div:hover {
    color: blue;

}

.all1 {

     margin: 0 auto;
    width: 625px;
    display: flex;
    justify-content: center;
    flex-direction: column;
    align-items: center;
}
.all {
     margin: 0 auto;
    width: 225px;
    display: flex;
    justify-content: center;
    flex-direction: column;
    align-items: center;
    
}
</style>