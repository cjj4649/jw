<template>
 <div class="all">
    <el-container>
      <el-header height="70px">
        <router-link to="/">绝味展示平台</router-link>
      </el-header>


        <el-main class="box">
  <div id="china_map" style='width:900px;height:600px;'> </div>
        </el-main>
      </el-container>
    </el-container>
  </div>

       
  
</template>
<script>
import echarts from 'echarts'
import qs from 'qs'
require('echarts/map/js/china')
export default {
    methods: {


    },
    
    mounted () {
        console.log(this.$router)
        
  // 初始化echarts实例
  this.chinachart = echarts.init(document.getElementById('china_map'))
  
  // 进行相关配置r
  this.chartOption = { 
      
    tooltip: { // 鼠标移到图里面的浮动提示框
     // formatter详细配置： https://echarts.baidu.com/option.html#tooltip.formatter
      formatter (params, ticket, callback) { 
        // params.data 就是series配置项中的data数据遍历
        
        let htmlStr = `
          <div style='font-size:18px;'> ${params.name}</div>
          <p style='text-align:left;margin-top:-10px;'>
	         
          </p>
        `
        return htmlStr
      }
      // backgroundColor:"#ff7f50",//提示标签背景颜色
      // textStyle:{color:"#fff"} //提示标签字体颜色
    }, 
    // visualMap的详细配置解析：https://echarts.baidu.com/option.html#visualMap
   
    // geo配置详解： https://echarts.baidu.com/option.html#geo
    geo: { // 地理坐标系组件用于地图的绘制
      map: 'china', // 表示中国地图
      // roam: true, // 是否开启鼠标缩放和平移漫游
      zoom: 1.2, // 当前视角的缩放比例（地图的放大比例）
      label: {
        show: true
      },
      itemStyle: { // 地图区域的多边形 图形样式。
        borderColor: 'rgba(0, 0, 0, 0.2)',
        emphasis: { // 高亮状态下的多边形和标签样式
          shadowBlur: 20,
          shadowColor: 'rgba(1, 0, 0, 0.5)'
        }
      }
    },
    series: [
      {
        name: '', // 浮动框的标题（上面的formatter自定义了提示框数据，所以这里可不写）
        type: 'map',
        geoIndex: 0,
       
        label: {
          show: true
        },
        // 这是需要配置地图上的某个地区的数据，根据后台的返回的数据进行拼接（下面是我定义的假数据）
       
      }
    ]
  }
  
  // 使用刚指定的配置项和数据显示地图数据
  this.chinachart.setOption(this.chartOption)
    this.chinachart.on('click', function(params) {
          console.log(params)
            window.location.href='/#/home?params='+params.name;


     }) 
}
}
0

</script>

<style scoped>
.box {
  width: 1000px;
  height: 650px;

  margin: 0 auto;;
}

.all {

  width: 100%;
  height: 100%;
  position: absolute;
   background-size:100% 100%;
   z-index: 1;
}
#china_map {
    margin: 0 auto;
}
a {
  text-decoration: none;
  color: black;
}
</style>
