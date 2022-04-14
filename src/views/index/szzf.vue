<template>
  <!-- 内容 -->
  <div class="main" :style="{ transform: `scale(${percentX},${percentY})` }">
    <!-- 头 -->
    <MyHeader cur="2"></MyHeader>

    <div class="content">
      <!-- 合法性审查left -->
      <div class="hfsc">
        <div class="title">合法性审查</div>
        <div class="gaugecontent">
          <!-- 绘制仪表盘 -->
          <div id="gauge"></div>
          <!-- 合同总数 -->
          <div class="number">
            <p>150<span>份</span></p>
            <div class="ht">合同总数</div>
          </div>
        </div>
        <!-- 时间选择 -->
        <div class="bltime">
          <el-date-picker
            v-model="value1"
            type="daterange"
            range-separator="~"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
          >
          </el-date-picker>
          <span class="el-icon-arrow-up el-input__icon jt"></span>
        </div>
        <!-- 审查列表 -->
        <div class="sclist">
          <ul>
            <li
              v-for="(item, index) in sclist"
              :key="index"
              :class="{ active: index == 0 ? true : flase }"
              @click="handleclick"
            >
              <h3>{{ item.nm }}</h3>
              <b
                :class="{
                  color1: item.color == 1,
                  color2: item.color == 2,
                  color3: item.color == 3,
                  color4: item.color == 4,
                }"
                >{{ item.number }}</b
              >
            </li>
          </ul>
          <!-- 表格列 -->
          <div class="table">
            <div class="top">
              <div style="width: 53px">序号</div>
              <div style="width: 150px; text-align: left">合同名称</div>
              <div style="width: 90px">上传时间</div>
              <div style="width: 89px">审查状态</div>
            </div>
            <div class="bottom">
              <vue-seamless-scroll :data="tableList" :class-option="defaultOption">
                <div class="blist" v-for="item in tableList" :key="item.num">
                  <div style="width: 53px">{{ item.num }}</div>
                  <div style="width: 150px; text-align: left">
                    {{ item.ht }}
                  </div>
                  <div style="width: 90px">{{ item.time }}</div>
                  <div style="width: 89px">
                    {{ item.sc }}
                    <img
                      src="../../images/wsc.png"
                      alt=""
                      v-if="item.sc == '未审查' ? show1 : show2"
                    />
                    <img
                      src="../../images/ysc.png"
                      alt=""
                      v-if="item.sc == '已审查' ? show1 : show2"
                    />
                    <img
                      src="../../images/yq.png"
                      alt=""
                      v-if="item.sc == '逾期' ? show1 : show2"
                    />
                  </div>
                </div>
              </vue-seamless-scroll>
            </div>
          </div>
        </div>
        <!-- 重点人员 -->
        <div class="title">重点人员</div>
        <!-- 饼图 -->
        <div id="pople"></div>
      </div>
      <!-- 中间 -->
      <div class="center">
        <div class="title">
          <img src="~@/images/servicePoint.png" alt="" />
          公共法律服务点
          <div class="tip">
            （点击<img src="~@/images/servicePoint.png" />查看详情）
          </div>
        </div>
        <div class="mapbox">
          <img src="~@/images/map.png" alt="" class="map" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import MyHeader from "../../components/MyHeader";
import vueSeamlessScroll from "vue-seamless-scroll";

export default {
  data() {
    return {
      pickerOptions: {
        shortcuts: [
          {
            text: "最近一周",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit("pick", [start, end]);
            },
          },
          {
            text: "最近一个月",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
              picker.$emit("pick", [start, end]);
            },
          },
          {
            text: "最近三个月",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
              picker.$emit("pick", [start, end]);
            },
          },
        ],
      },
      value1: "",
      // 审查列表
      sclist: [
        { nm: "全部", number: 118, color: "1" },
        { nm: "已审查", number: 15, color: "2" },
        { nm: "未审查", number: 65, color: "3" },
        { nm: "逾期", number: 38, color: "4" },
      ],
      //
      active: true,
      // 审查列表
      tableList: [
        {
          num: 1,
          ht: "股权质押反担保合同",
          time: "2021-01-05",
          sc: "未审查",
        },
        {
          num: 2,
          ht: "股权质押反担保合同",
          time: "2021-01-05",
          sc: "已审查",
        },
        {
          num: 3,
          ht: "股权质押反担保合同",
          time: "2021-01-05",
          sc: "逾期",
        },
        {
          num: 4,
          ht: "股权质押反担保合同",
          time: "2021-01-05",
          sc: "未审查",
        },
        {
          num: 5,
          ht: "股权质押反担保合同",
          time: "2021-01-05",
          sc: "未审查",
        },
        {
          num: 6,
          ht: "股权质押反担保合同",
          time: "2021-01-05",
          sc: "未审查",
        },
      ],
      // 判断状态
      show1: true,
      show2: false,
    };
  },
  computed: {
    //滚动配置
    defaultOption() {
      return {
        step: 0.4, // 数值越大速度滚动越快
        limitMoveNum: 5, // 开始无缝滚动的数据量 this.dataList.length
        hoverStop: true, // 是否开启鼠标悬停stop
        direction: 1, // 0向下 1向上 2向左 3向右
        openWatch: true, // 开启数据实时监控刷新dom
        singleHeight: 0, // 单步运动停止的高度(默认值0是无缝不停止的滚动) direction => 0/1
        singleWidth: 0, // 单步运动停止的宽度(默认值0是无缝不停止的滚动) direction => 2/3
        waitTime: 2000, // 单步运动停止的时间(默认值1000ms)
      };
    },
    percentX: {
      get() {
        let x =
          document.body.clientWidth || document.documentElement.clientWidth;
        return x / 1920;
      },
      set(val) {
        // console.log(111111111, val);
      },
    },
    percentY: {
      get() {
        let y =
          document.body.clientHeight || document.documentElement.clientHeight;
        return y / 1080;
      },
      set() {},
    },
  },
  components: {
    MyHeader,
    vueSeamlessScroll,
  },
  methods: {
    // 仪表
    gauge() {
      //基于准备好的dom，初始化echarts实例
      var myChart = this.$echarts.init(document.getElementById("gauge"));
      const gaugeData = [
        {
          value: 45,
          name: "审查率",
          title: {
            offsetCenter: ["0%", "30%"],
            fontSize: 17,
            color: "#fff",
          },
          detail: {
            valueAnimation: true,
            offsetCenter: ["0%", "-20%"],
          },
        },
      ];
      // 绘制仪表盘
      myChart.setOption({
        series: [
          {
            type: "gauge",
            startAngle: 230,
            endAngle: -50,
            pointer: {
              show: false,
            },
            progress: {
              show: true,
              overlap: false,
              roundCap: true,
              clip: false,
              itemStyle: {
                borderWidth: 1,
                borderColor: "#4631F8",
                color: {
                  type: "linear", // 线性渐变

                  x: 0,

                  y: 0,

                  x2: 0,

                  y2: 1,

                  colorStops: [
                    {
                      offset: 0,

                      color: "#54FFF1", // 0%处的颜色为红色
                    },
                    {
                      offset: 1,

                      color: "#4631F8", // 100%处的颜色为蓝
                    },
                  ],
                },
              },
            },
            axisLine: {
              lineStyle: {
                width: 7,
              },
            },
            splitLine: {
              show: false,
              distance: 0,
              length: 10,
            },
            axisTick: {
              show: false,
            },
            axisLabel: {
              show: false,
              distance: 50,
            },
            data: gaugeData,
            title: {
              fontSize: 14,
            },
            detail: {
              // 里面的文字样式
              width: 50,
              height: 25,
              fontSize: 28,
              color: "#fff",
              borderColor: "none",
              formatter: "{value}%",
            },
          },
        ],
      });
      // 定时器
      setInterval(function () {
        gaugeData[1].value = +(Math.random() * 100).toFixed(2);

        myChart.setOption({
          series: [
            {
              data: gaugeData,
              pointer: {
                show: false,
              },
            },
          ],
        });
      }, 2000);
    },
    // 饼图
    drawChart() {
      //基于准备好的dom，初始化echarts实例
      var myChart = this.$echarts.init(document.getElementById("main"));

      // 绘制图表
      myChart.setOption({});
    },
    handleclick() {},
  },
  mounted() {
    this.gauge();
  },
};
</script>

<style lang="less" scoped >
@import "../../assets/css/font/font.css";
.main {
  width: 1920px;
  height: 1080px;
  transform-origin: top left;
  .content {
    padding-top: 10px;
    display: flex;
    .hfsc {
      width: 442px;
      .title {
        background: url("../../images/title.png") no-repeat;
        height: 34px;
        font-size: 18px;
        font-family: "Source Han Sans CN";
        font-weight: bold;
        color: #13ecff;
        text-align: center;
        line-height: 50px;
        margin-bottom: 13px;
      }
      .gaugecontent {
        display: flex;
        justify-content: center;
        align-items: center;
        font-family: "Source Han Sans CN";
        //
        #gauge {
          width: 135px;
          height: 150px;
          //   background-color: red;
        }
        .number {
          p {
            font-size: 48px;
            font-family: "Agency FB";
            font-weight: bold;
            color: #ffc650;
            line-height: 40px;
            span {
              font-size: 18px;
              font-weight: 400;
              color: #ffffff;
              padding-left: 6px;
            }
          }
          .ht {
            font-size: 16px;
            font-weight: 400;
            color: #cccccc;
          }
        }
      }
      .bltime {
        font-family: "font-family: Source Han Sans CN";
        width: 80%;
        height: 30px;
        line-height: 30px;
        margin: 0 auto;
        box-sizing: border-box;
        position: relative;
        cursor: pointer;
        .jt {
          position: absolute;
          right: 10px;
          color: #fff;
          top: 0;
          transform: rotate(180deg);
          height: auto;
          line-height: 30px;
        }
        /deep/.el-input__inner {
          background: rgba(0, 48, 149, 0);
          border: 1px solid rgba(255, 255, 255, 0.3);
          border-radius: 999px;
          padding-left: 20px;
          position: relative;
          z-index: 1;
          width: 100%;
          height: 100%;
        }
        /deep/.el-range-editor .el-range-input {
          background: none;
          font-size: 14px;
          color: #fff;
          width: 30%;
        }
        /deep/.el-date-editor .el-range-separator {
          color: #fff;
          padding: 0;
        }
        /deep/.el-date-editor .el-range__icon {
          display: none;
        }
        /deep/.el-date-editor .el-range__close-icon {
          //   margin-left: 60px;
          display: none;
        }
      }
      .sclist {
        font-size: 14px;
        font-family: "Source Han Sans CN";
        font-weight: 400;
        color: #ffffff;
        width: 372px;
        margin: 0 auto;
        margin-top: 22px;
        margin-bottom: 40px;
        ul {
          display: flex;
          justify-content: space-between;
          border-bottom: 1px solid #0088ff;
          width: 365px;
          li {
            width: 25%;
            font-family: "Source Han Sans CN";
            text-align: center;
            cursor: pointer;
            b {
              font-size: 26px;
              font-size: 26px;
              font-family: "Agency FB";
              font-weight: bold;
              line-height: 60px;
              &.color1 {
                color: #3affe4;
              }
              &.color2 {
                color: #16d53b;
              }
              &.color3 {
                color: #ffc650;
              }
              &.color4 {
                color: #ff2c2c;
              }
            }
            &.active::after {
              content: "";
              display: block;
              width: 0;
              border-left: 6px solid transparent;
              border-right: 6px solid transparent;
              border-bottom: 6px solid #0088ff;
              position: relative;
              left: 50%;
              margin-left: -3px;
            }
          }
          margin-bottom: 22px;
        }
        .table {
          font-size: 12px;
          .top {
            display: flex;
            justify-content: space-between;
            color: rgba(255, 255, 255, 0.3);
            background: rgba(255, 255, 255, 0.05);
            height: 28px;
            line-height: 28px;
            text-align: center;
          }
          .bottom {
            height: 140px;
            overflow: hidden;
            .blist {
              display: flex;
              justify-content: space-between;
              align-items: center;
              text-align: center;
              height: 28px;
              line-height: 28px;
              color: #fff;
              cursor: pointer;
              img {
                display: inline-block;
                padding-left: 5px;
              }
              &:nth-child(2n + 1) {
                background: rgba(255, 255, 255, 0.3);
              }
              &:nth-child(2n) {
                background: rgba(255, 255, 255, 0.2);
              }
            }
          }
        }
      }
    }
    .center {
      flex: 1;
      position: relative;
      .title {
        position: absolute;
        z-index: 100;
        top: 45px;
        left: 64px;
        display: flex;
        align-items: center;
        font-size: 18px;
        font-weight: 500;
        color: #ffffff;
        img {
          width: 28px;
          height: 28px;
          margin: 0 5px;
        }
        .tip {
          display: flex;
          align-items: center;
          color: #ffffff;
          font-size: 13px;
          margin-left: 10px;
          img {
            width: 20px;
            height: 20px;
            margin: 0 5px;
          }
        }
      }
      .mapbox {
        position: absolute;
        z-index: 100;
        top: 97px;
        left: 28px;
        .map {
          width: 983px;
          height: 802px;
        }
      }
    }
  }
}
</style>