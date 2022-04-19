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
              :class="{ active: index == currIndex ? true : false }"
              @click="handleclick(index)"
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
              <vue-seamless-scroll
                :data="tableList"
                :class-option="defaultOption"
              >
                <div class="blist" v-for="(item,index) in tableList" :key="index"
                  @click="handleTable(index)"
                >
                  <div style="width: 53px">{{ item.num }}</div>
                  <div style="width: 150px; text-align: left">
                    {{ item.ht }}
                  </div>
                  <div style="width: 90px">{{ item.time }}</div>
                  <div style="width: 89px">
                    <span>{{ item.sc }}</span>
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
              <!-- 弹窗详情 -->
              <div class="details" v-if="ifShow2">
                <div class="detailsList">
                  <h2>合法性审查详情</h2>
                  <div class="details2">
                    <div>
                      <span>合同名称：</span>
                      <p>股权质押反担保合同</p>
                    </div>
                    <div>
                      <span>上传部门：</span>
                      <p>综治</p>
                    </div>
                    <div>
                      <span>上传时间：</span>
                      <p>2021-01-05</p>
                    </div>
                    <div>
                      <span>审查结果：</span>
                      <p>审查通过</p>
                    </div>
                    <div>
                      <span>审查状态：</span>
                      <p>
                        已审查
                      <img
                        src="../../images/ysc.png"
                        alt=""
                      />
                      </p>
                    </div>
                    <div>
                      <span>审核时间：</span>
                      <p>2021-02-05</p>
                    </div>
                    <div>
                      <span>律师意见/司法所意见：</span>
                      <p>
                        企业所得税汇算清缴纳税申报鉴证报告说明 我们接受委托,对被鉴证单位
                      </p>
                    </div>
                    <div>
                      <span>所属律师：</span>
                      <p>王小毛</p>
                    </div>
                  </div>
                  <div class="close" @click="handleClose">
                    <img src="../../images/close1.png" alt="">
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="scpople">
          <!-- 重点人员 -->
          <div class="title">重点人员</div>
          <!-- 饼图 -->
          <div id="pople"></div>
          <!-- 审查人员列表 -->
          <div class="sclist">
            <ul>
              <li
                v-for="(item, index) in sclist2"
                :key="index"
                :class="{ active: index == currIndex ? true : false }"
                @click="handleclick2(index)"
              >
                <h3>{{ item.nm }}</h3>
                <b>{{ item.number }}</b>
              </li>
            </ul>
            <!-- 审查人员列表 -->
            <div class="table">
              <div class="top">
                <div style="width: 70px">姓名</div>
                <div style="width: 80px">性别</div>
                <div style="width: 80px">村社</div>
                <div style="width: 132px">
                  联系方式
                  <span class="el-icon-arrow-up el-input__icon jt"></span>
                </div>
              </div>
              <div class="bottom">
                <vue-seamless-scroll
                  :data="tableList2"
                  :class-option="defaultOption2"
                >
                  <div class="blist" v-for="item in tableList2" :key="item.num">
                    <div style="width: 70px">{{ item.nm }}</div>
                    <div style="width: 80px">
                      {{ item.maxl }}
                    </div>
                    <div style="width: 80px">{{ item.sc }}</div>
                    <div style="width: 132px">
                      {{ item.lx }}
                    </div>
                  </div>
                </vue-seamless-scroll>
              </div>
            </div>
          </div>
        </div>
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

      <!-- 右边 -->
      <div class="hfsc">
        <div class="title">合法性审查</div>
        <div class="gaugecontent">
          <!-- 绘制仪表盘 -->
          <div id="gauge2"></div>
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
              :class="{ active: index == currIndex ? true : false }"
              @click="handleclick(index)"
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
              <vue-seamless-scroll
                :data="tableList"
                :class-option="defaultOption"
              >
                <div class="blist" v-for="(item,index) in tableList" :key="index"
                  @click="handleTable(index)"
                >
                  <div style="width: 53px">{{ item.num }}</div>
                  <div style="width: 150px; text-align: left">
                    {{ item.ht }}
                  </div>
                  <div style="width: 90px">{{ item.time }}</div>
                  <div style="width: 89px">
                    <span>{{ item.sc }}</span>
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
              <!-- 弹窗详情 -->
              <div class="details" v-if="ifShow2">
                <div class="detailsList">
                  <h2>合法性审查详情</h2>
                  <div class="details2">
                    <div>
                      <span>合同名称：</span>
                      <p>股权质押反担保合同</p>
                    </div>
                    <div>
                      <span>上传部门：</span>
                      <p>综治</p>
                    </div>
                    <div>
                      <span>上传时间：</span>
                      <p>2021-01-05</p>
                    </div>
                    <div>
                      <span>审查结果：</span>
                      <p>审查通过</p>
                    </div>
                    <div>
                      <span>审查状态：</span>
                      <p>
                        已审查
                      <img
                        src="../../images/ysc.png"
                        alt=""
                      />
                      </p>
                    </div>
                    <div>
                      <span>审核时间：</span>
                      <p>2021-02-05</p>
                    </div>
                    <div>
                      <span>律师意见/司法所意见：</span>
                      <p>
                        企业所得税汇算清缴纳税申报鉴证报告说明 我们接受委托,对被鉴证单位
                      </p>
                    </div>
                    <div>
                      <span>所属律师：</span>
                      <p>王小毛</p>
                    </div>
                  </div>
                  <div class="close" @click="handleClose">
                    <img src="../../images/close1.png" alt="">
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="scpople">
          <!-- 重点人员 -->
          <div class="title">重点人员</div>
          <!-- 饼图 -->
          <div id="pople2"></div>
          <!-- 审查人员列表 -->
          <div class="sclist">
            <ul>
              <li
                v-for="(item, index) in sclist2"
                :key="index"
                :class="{ active: index == currIndex ? true : false }"
                @click="handleclick2(index)"
              >
                <h3>{{ item.nm }}</h3>
                <b>{{ item.number }}</b>
              </li>
            </ul>
            <!-- 审查人员列表 -->
            <div class="table">
              <div class="top">
                <div style="width: 70px">姓名</div>
                <div style="width: 80px">性别</div>
                <div style="width: 80px">村社</div>
                <div style="width: 132px">
                  联系方式
                  <span class="el-icon-arrow-up el-input__icon jt"></span>
                </div>
              </div>
              <div class="bottom">
                <vue-seamless-scroll
                  :data="tableList2"
                  :class-option="defaultOption2"
                >
                  <div class="blist" v-for="item in tableList2" :key="item.num">
                    <div style="width: 70px">{{ item.nm }}</div>
                    <div style="width: 80px">
                      {{ item.maxl }}
                    </div>
                    <div style="width: 80px">{{ item.sc }}</div>
                    <div style="width: 132px">
                      {{ item.lx }}
                    </div>
                  </div>
                </vue-seamless-scroll>
              </div>
            </div>
          </div>
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
      currIndex: 0, // 审查列表当前选中下标
      pickerOptions: {
        shortcuts: [
          {
            text: "最近一周",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit("pick", [start, end]);
            }
          },
          {
            text: "最近一个月",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
              picker.$emit("pick", [start, end]);
            }
          },
          {
            text: "最近三个月",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
              picker.$emit("pick", [start, end]);
            }
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
      // 审查人员列表
      sclist2: [
        { nm: "吸毒人员", number: 15 },
        { nm: "矫正人员", number: 65 },
        { nm: "刑释解矫人员", number: 38 },
        { nm: "失信人员", number: 2 },
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
      // 弹窗内容
      // 默认弹窗隐藏
      ifShow2:false,
      
      tableList2: [
        { nm: "王小宝", maxl: "男", sc: "长石村", lx: "135****1254" },
        { nm: "王小宝", maxl: "男", sc: "长石村", lx: "135****1254" },
        { nm: "王小宝", maxl: "男", sc: "长石村", lx: "135****1254" },
        { nm: "王小宝", maxl: "男", sc: "长石村", lx: "135****1254" },
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
    //人员滚动配置
    defaultOption2() {
      return {
        step: 0.4, // 数值越大速度滚动越快
        limitMoveNum: 3, // 开始无缝滚动的数据量 this.dataList.length
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
                }
              }
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
      let that = this;
      //基于准备好的dom，初始化echarts实例
      var myChart = this.$echarts.init(document.getElementById("pople"));
      let data1 = [
        { value: 30, name: "长石村" },
        { value: 15, name: "九龙湖村 " },
        { value: 18, name: "汶溪村" },
        { value: 18, name: "秦山村" },
        { value: 18, name: "西经堂村" },
      ];
      // 绘制饼图
      myChart.setOption({
        tooltip: {
          trigger: "item",
          formatter: " {b}<br/> 总人数: {c} (%)",
        },
        legend: {
          right: "right",
          orient: "vertical",
          itemGap: 18,
          textStyle: {
            color: "#fff",
            fontSize: 14,
            fontFamily: "Microsoft YaHei",
          },
          formatter(name) {
            const count = that.arrCount(data1);
            //找到data中name和文本name值相同的对象
            const val = data1.filter((item) => {
              return item.name === name;
            });
            return name + "  " + (val[0].value / count).toFixed(4) * 100 + "%";
          },
        },
        toolbox: {
          show: true,
          feature: {
            mark: { show: true },
          },
        },
        series: [
          {
            name: "Nightingale Chart",
            type: "pie",
            radius: [20, 100],
            center: ["22%", "50%"],
            roseType: "radius",
            itemStyle: {
              borderRadius: 5,
            },
            label: {
              show: false,
            },
            data: data1,
          },
        ],
      });
    },
    arrCount(arr) {
      let count = 0;
      arr.forEach((item) => {
        count = count + item.value;
      });
      return count;
    },

    // 右侧仪表
    gauge2() {
      //基于准备好的dom，初始化echarts实例
      var myChart = this.$echarts.init(document.getElementById("gauge2"));
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
                }
              }
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

    // 右侧饼图
    drawChart2() {
      let that = this;
      //基于准备好的dom，初始化echarts实例
      var myChart = this.$echarts.init(document.getElementById("pople2"));
      let data1 = [
        { value: 30, name: "长石村" },
        { value: 15, name: "九龙湖村 " },
        { value: 18, name: "汶溪村" },
        { value: 18, name: "秦山村" },
        { value: 18, name: "西经堂村" },
      ];
      // 绘制饼图
      myChart.setOption({
        tooltip: {
          trigger: "item",
          formatter: " {b}<br/> 总人数: {c} (%)",
        },
        legend: {
          right: "right",
          orient: "vertical",
          itemGap: 18,
          textStyle: {
            color: "#fff",
            fontSize: 14,
            fontFamily: "Microsoft YaHei",
          },
          formatter(name) {
            const count = that.arrCount(data1);
            //找到data中name和文本name值相同的对象
            const val = data1.filter((item) => {
              return item.name === name;
            });
            return name + "  " + (val[0].value / count).toFixed(4) * 100 + "%";
          },
        },
        toolbox: {
          show: true,
          feature: {
            mark: { show: true },
          },
        },
        series: [
          {
            name: "Nightingale Chart",
            type: "pie",
            radius: [20, 100],
            center: ["22%", "50%"],
            roseType: "radius",
            itemStyle: {
              borderRadius: 5,
            },
            label: {
              show: false,
            },
            data: data1,
          },
        ],
      });
    },
    arrCount(arr) {
      let count = 0;
      arr.forEach((item) => {
        count = count + item.value;
      });
      return count;
    },
    
    // 审查列表
    handleclick(index) {
      this.currIndex = index;
    },
    handleTable(index){
      this.ifShow2=true
      console.log("555");
      // this.ifShow2=index

    },
    handleClose(){
      this.ifShow2=false;
      console.log("ccccc");
    },
    // 审查人员
    handleclick2(index) {
      this.currIndex = index;
    },
  },
  mounted() {
    this.gauge();
    this.drawChart();
    this.drawChart2();
    this.gauge2();
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
        #gauge2 {
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
          line-height: 32px;
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
          line-height: 25px;
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
          margin-bottom: 25px;
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
              span{
                width: 38px;
                display: inline-block;
              }
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
          // 弹窗详情
          .details {
            position: fixed;
            width: 100%;
            height: 100%;
            z-index: 9999;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: rgba(0, 0, 0, 0.5);
            .detailsList {
              width: 783px;
              height: 535px;
              position: absolute;
              left: 50%;
              top: 50%;
              margin-left: -391.5px;
              margin-top: -267.5px;
              background: url("../../images/hfscxq.png") no-repeat;
              background-size: 100%;
              padding-top: 42px;
              padding-left: 70px;
              padding-right: 55px;
              box-sizing: border-box;
              h2 {
                font-weight: bold;
                font-size: 29px;
                text-align: center;
                color: #6cfcff;
                line-height: 29px;
                background: linear-gradient(0deg, #41c3f5 0%, #cfe7ff 100%);
                background-clip: text;
                -webkit-text-fill-color: transparent;
                margin-bottom: 38px;
              }
              .details2 {
                font-size: 17px;
                font-family: "PingFang SC";
                font-weight: 500;
                color: #ffffff;
                line-height: 35px;
                div {
                  display: flex;
                  // justify-content: space-between;
                  flex: 1;
                  flex-wrap: nowrap;
                  margin-top: 10px;
                  span {
                    min-width: 70px;
                    display: block;
                  }
                  img{width: 18px;height: 15px;}
                }
                div:nth-child(7){
                  span{width: 200px;}
                }
              }
            }
            .close{
              position: absolute;
              right: 60px;
              top: 40px;
              cursor: pointer;
            }
          }
        }
      }
      .scpople {
        // 饼图
        #pople {
          width: 350px;
          height: 200px;
          margin: 0 auto;
          margin-top: 30px;
          margin-bottom: -20px;
        }
         #pople2{
          width: 350px;
          height: 200px;
          margin: 0 auto;
          margin-top: 30px;
          margin-bottom: -20px;
        }
        .sclist {
          b {
            color: #3affe4;
          }
        }
        .bottom {
          height: 84px !important;
        }
        /deep/.el-input__icon {
          line-height: 100%;
          color: #fff;
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