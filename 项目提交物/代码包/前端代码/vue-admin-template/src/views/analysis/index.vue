<!--  -->
<template>
  <div id="Chart-container">
    <div
      class="chart"
      id="myChart1"
      :style="{ display: 'inline-block', width: '45%', height: '500px' }"
    ></div>
    <div
      class="chart"
      id="myChart2"
      :style="{ display: 'inline-block', width: '45%', height: '500px' }"
    ></div>
  </div>
</template>
<script>
import apiHistory from '@/api/history'
export default {
  name: "Chart",
  data() {
    return {
      hotData:{},
      date:[],
      loginNum:[],
      playerNum:[],
      courseAddNum:[],
      registerNum:[],
    };
  },
  computed: {
    echarts() {
      return "echarts" + Math.random() * 100000;
    },
  },
  created() {
    apiHistory.getHotData().then((response)=>{
      this.hotData = response.data;
      var map = this.hotData.map;
      var i = '';
      for(i in this.hotData.map){
        this.date.push(i)
      } 
      for(i in this.hotData.map){
        this.loginNum.push(map[i][1])
        this.registerNum.push(map[i][0])
        this.courseAddNum.push(map[i][3])
        this.playerNum.push(map[i][2])
      }
      console.log(this.date)
      this.drawLine();
      // map:{} total:15
    })
  },
  mounted() {
    this.drawLine();
  },
  methods: {
    drawLine() {
      var chartDom1 = document.getElementById("myChart1");
      var myChart1 = this.$echarts.init(chartDom1);
      var xAxisData = this.date;
      var data1 = this.loginNum;
      var data2 = this.registerNum;

      console.log(xAxisData)
      console.log(data1)
      console.log(data2)
      const colors2 = [
        "#05f8d6",
        "#0082fc",
        "#fdd845",
        "#22ed7c",
        "#09b0d3",
        "#1d27c9",
        "#f9e264",
        "#f47a75",
        "#009db2",
        "#024b51",
        "#0780cf",
        "#765005",
      ];
      myChart1.setOption({
        color: colors2,
        title: {
          text: "热度概览",
        },
        legend: {
          data: ["登陆人数", "注册人数"],
        },
        toolbox: {
          // y: 'bottom',
          feature: {
            magicType: {
              type: ["stack", "tiled"],
            },
            dataView: {},
            saveAsImage: {
              pixelRatio: 2,
            },
          },
        },
        tooltip: {},
        xAxis: {
          data: xAxisData,
          splitLine: {
            show: true,
          },
        },
        yAxis: {
        },
        series: [
          {
            name: "登陆人数",
            type: "bar",
            data: data1,
            emphasis: {
              focus: "series",
            },
            animationDelay: function (idx) {
              return idx * 10;
            },
          },
          {
            name: "注册人数",
            type: "bar",
            data: data2,
            barGap:'0%',
            emphasis: {
              focus: "series",
            },
            animationDelay: function (idx) {
              return idx * 10 + 100;
            },
          },
        ],
        animationEasing: "elasticOut",
        animationDelayUpdate: function (idx) {
          return idx * 5;
        },
      });

      var chartDom2 = document.getElementById("myChart2");
      var myChart2 = this.$echarts.init(chartDom2);
      myChart2.setOption({
        color: colors2,
        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "cross",
            crossStyle: {
              color: "#999",
            },
          },
        },
        toolbox: {
          feature: {
            dataView: { show: true, readOnly: false },
            magicType: { show: true, type: ["line", "bar"] },
            restore: { show: true },
            saveAsImage: { show: true },
          },
        },
        legend: {
          data: ["登陆人数", "播放视频量", "课程新增量"],
        },
        xAxis: [
          {
            type: "category",
            data: this.date,
            axisPointer: {
              type: "shadow",
            },
          },
        ],
        yAxis: [
          {
            type: "value",
            name: "人数",
            min: 0,
            max: 30,
            interval: 5,
            axisLabel: {
              formatter: "{value}",
            },
          },
          {
            type: "value",
            name: "新增",
            min: 0,
            max: 25,
            interval: 5,
            axisLabel: {
              formatter: "{value}",
            },
          },
        ],
        series: [
          {
            name: "登陆人数",
            type: "bar",
            data: this.loginNum,
          },
          {
            name: "播放视频量",
            type: "bar",
            barGap:'0%',
            data: this.playerNum,
          },
          {
            name: "课程新增量",
            type: "line",
            yAxisIndex: 1,
            data: this.courseAddNum,
          },
        ],
      });
    },
  },
};
</script>

<style scoped>
#Chart-container {
  margin-top: 20px;
  text-align: center;
}
.chart {
  margin: auto;
}
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  text-decoration: none;
  color: #42b983;
}
</style>