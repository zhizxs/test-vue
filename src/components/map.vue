<template>
  <div class="map">
    <div id="main"></div>
  </div>
</template>

<script>
import echarts from "echarts";
import { YCData, geoCoordMap, XAData, XNData } from "../assets/map_data.js";

let china = require("../assets/china.json");

export default {
  data() {
    return {
      planePath: "none",
      color: ["#a6c84c", "#ffa022", "#46bee9"], //航线的颜色
      positionColor: "000", // 当前点的颜色
      position: "", // 当前的位置
      series: [],
      tes: [
        {
          name: "西安",
          value: 1
        }
      ]
    };
  },

  mounted() {
    this.init();
  },

  methods: {
    init() {
      let myCharts = echarts.init(document.getElementById("main"));

      this.formatSeries();

      let option = this.initOption();

      echarts.registerMap("china", china);

      myCharts.setOption(option, true, true);
    },
    /**
         * 
         * data
         * ["西安", XAData]
         * 
         * XAData
         *  [
        		[{
        			name: '西安'
        		}, {
        			name: '北京',
        			value: 100
        		}]
        	]
         */
    convertData(data) {
      let res = [];
      for (let i = 0; i < data.length; i++) {
        let dataItem = data[i];
        let fromCoord = geoCoordMap[dataItem[0].name];
        let toCoord = geoCoordMap[dataItem[1].name];
        if (fromCoord && toCoord) {
          res.push({
            fromName: dataItem[0].name,
            toName: dataItem[1].name,
            coords: [fromCoord, toCoord],
            value: dataItem[1].value
          });
        }
      }
      return res;
    },

    // 格式化页面数据
    formatSeries(data) {
      //   data = [["西安", XAData], ["西宁", XNData], ["银川", YCData]];

      data = [["西安", XAData]];
      /**
		 	 * 	[
					['西安', XAData],
					['西宁', XNData],
					['银川', YCData]
				]
		 	*/

      data.forEach((item, i) => {
        this.series.push(
          // 线条 canvas 2 层 变化的线条
          {
            name: item[0] + " Top3",
            type: "lines",
            zlevel: 1,
            effect: {
              show: true,
              period: 6,
              trailLength: 0.7,
              color: "red", //arrow箭头的颜色
              symbolSize: 3
            },
            lineStyle: {
              normal: {
                color: this.color[i],
                width: 0,
                curveness: 0.2
              }
            },
            data: this.convertData(item[1])
          },
          // 线条 canvas 2 层 静态
          {
            name: item[0] + " Top3",
            type: "lines",
            zlevel: 2,
            symbol: ["none"],
            symbolSize: 10,
            effect: {
              show: true,
              period: 6,
              trailLength: 0,
              symbol: this.planePath,
              symbolSize: 15
            },
            lineStyle: {
              normal: {
                color: this.color[i],
                width: 1,
                opacity: 0.6,
                curveness: 0.2
              }
            },
            data: this.convertData(item[1])
          },
          // canvas 2 层 定位数据层
          {
            name: item[0] + " Top3",
            type: "effectScatter",
            coordinateSystem: "geo",
            zlevel: 2,
            rippleEffect: {
              brushType: "stroke"
            },
            label: {
              normal: {
                show: true,
                position: "right",
                formatter: "{b}"
              }
            },
            symbolSize: function(val) {
              return val[2] / 8;
            },
            itemStyle: {
              normal: {
                color: this.color[i]
              },
              emphasis: {
                areaColor: "#2B91B7"
              }
            },
            data: item[1].map(function(dataItem) {
              return {
                name: dataItem[1].name,
                value: geoCoordMap[dataItem[1].name].concat([dataItem[1].value])
              };
            })
          }
        );
      });
    },
    initOption() {
      let _this = this;
      let option = {
        backgroundColor: "#000",
        title: {
          text: "模拟航线",
          subtext: "数据纯属虚构",
          left: "center",
          textStyle: {
            color: "#fff"
          }
        },
        tooltip: {
          trigger: "item",
          formatter: function(params, ticket, callback) {
            if (params.seriesType == "effectScatter") {
              return "线路：" + params.data.name + "" + params.data.value[2];
            } else if (params.seriesType == "lines") {
              return (
                params.data.fromName +
                ">" +
                params.data.toName +
                "<br />" +
                params.data.value
              );
            } else {
              return params.name;
            }
          }
        },
        legend: {
          orient: "vertical",
          top: "bottom",
          left: "right",
          data: ["西安 Top3", "西宁 Top3", "银川 Top3"],
          textStyle: {
            color: "#fff"
          },
          selectedMode: "multiple"
        },
        geo: {
          map: "china",
          label: {
            emphasis: {
              show: true,
              color: "#fff"
            }
          },
          roam: true,
          itemStyle: {
            normal: {
              areaColor: "#00186E",
              borderColor: "#195BB9",
              borderWidth: 1
            },
            emphasis: {
              areaColor: "#2B91B7"
            }
          }
        },
        series: _this.series
      };
      return option;
    }
  }
};
</script>
<style>
#main {
  width: 80%;
  height: 600px;
  margin: 0 auto;
}
</style>