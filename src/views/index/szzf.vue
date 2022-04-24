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
            <p>{{ info1.total }}<span>份</span></p>
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
            value-format="yyyy-MM-dd"
            @change="handleChanges"
          >
          </el-date-picker>
          <span class="el-icon-arrow-up el-input__icon jt"></span>
        </div>
        <!-- 审查列表 -->
        <div class="sclist">
          <ul>
            <li @click="handleclick(0)">
              <h3>全部</h3>
              <b class="color1">{{ info3.totalNum }}</b>
              <img
                src="~@/images/upArrow.png"
                alt=""
                class="select"
                v-show="currIndex == 0"
              />
            </li>
            <li @click="handleclick(1)">
              <h3>已审查</h3>
              <b class="color2">{{ info3.passNum }}</b>
              <img
                src="~@/images/upArrow.png"
                alt=""
                class="select"
                v-show="currIndex == 1"
              />
            </li>
            <li @click="handleclick(2)">
              <h3>未审查</h3>
              <b class="color3">{{ info3.unPassNum }}</b>
              <img
                src="~@/images/upArrow.png"
                alt=""
                class="select"
                v-show="currIndex == 2"
              />
            </li>
            <li @click="handleclick(3)">
              <h3>逾期</h3>
              <b class="color4">{{ info3.overDate }}</b>
              <img
                src="~@/images/upArrow.png"
                alt=""
                class="select"
                v-show="currIndex == 3"
              />
            </li>
          </ul>
          <!-- 表格列 -->
          <div class="table">
            <div class="top">
              <div style="width: 56px">序号</div>
              <div style="width: 140px" class="listName">合同名称</div>
              <div style="width: 90px">上传时间</div>
              <div style="width: 89px">审查状态</div>
            </div>
            <div class="bottom">
              <vue-seamless-scroll
                :data="tableList"
                :class-option="defaultOption"
              >
                <div
                  class="blist"
                  v-for="(item, index) in tableList"
                  :key="index"
                  @click="handleTable(item.id)"
                >
                  <div style="width: 56px">{{ index + 1 }}</div>
                  <div style="width: 140px" class="listName">
                    {{ item.name }}
                  </div>
                  <div style="width: 90px">{{ item.upTime }}</div>
                  <div style="width: 89px">
                    <span>
                      {{
                        item.status == 1
                          ? "已审查"
                          : item.status == 2
                          ? "未审查"
                          : "逾期"
                      }}</span
                    >
                    <img
                      src="../../images/wsc.png"
                      alt=""
                      v-if="item.status == 2 ? show1 : show2"
                    />
                    <img
                      src="../../images/ysc.png"
                      alt=""
                      v-if="item.status == 1 ? show1 : show2"
                    />
                    <img
                      src="../../images/yq.png"
                      alt=""
                      v-if="item.status == 3 ? show1 : show2"
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
                      <p>{{ details.name }}</p>
                    </div>
                    <div>
                      <span>上传部门：</span>
                      <p>{{ details.deptName }}</p>
                    </div>
                    <div>
                      <span>上传时间：</span>
                      <p>{{ details.upTime }}</p>
                    </div>
                    <div>
                      <span>审查结果：</span>
                      <p>
                        {{
                          details.status == 1
                            ? "已审查"
                            : details.status == 2
                            ? "未审查"
                            : "逾期"
                        }}
                      </p>
                    </div>
                    <div>
                      <span>审查状态：</span>
                      <p>
                        {{
                          details.status == 1
                            ? "已审查"
                            : details.status == 2
                            ? "未审查"
                            : "逾期"
                        }}
                        <img
                          src="../../images/wsc.png"
                          alt=""
                          v-if="details.status == 2 ? show1 : show2"
                        />
                        <img
                          src="../../images/ysc.png"
                          alt=""
                          v-if="details.status == 1 ? show1 : show2"
                        />
                        <img
                          src="../../images/yq.png"
                          alt=""
                          v-if="details.status == 3 ? show1 : show2"
                        />
                      </p>
                    </div>
                    <div>
                      <span>审核时间：</span>
                      <p>{{ details.auditTime }}</p>
                    </div>
                    <div>
                      <span>律师意见/司法所意见：</span>
                      <p>
                        {{ details.suggestion }}
                      </p>
                    </div>
                    <div>
                      <span>所属律师：</span>
                      <p>{{ details.lawyer }}</p>
                    </div>
                  </div>
                  <div class="close" @click="handleClose">
                    <img src="../../images/close1.png" alt="" />
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
          <div class="sclist sclist2">
            <ul>
              <li @click="handleclick2(0)">
                <h3>吸毒人员</h3>
                <b>{{ info2.drugNum }}</b>
                <img
                  src="~@/images/upArrow.png"
                  alt=""
                  class="select"
                  v-show="currIndex2 == 0"
                />
              </li>
              <li @click="handleclick2(1)">
                <h3>矫正人员</h3>
                <b>{{ info2.corNum }}</b>
                <img
                  src="~@/images/upArrow.png"
                  alt=""
                  class="select"
                  v-show="currIndex2 == 1"
                />
              </li>
              <li @click="handleclick2(2)">
                <h3>刑释解矫人员</h3>
                <b>{{ info2.releaseNum }}</b>
                <img
                  src="~@/images/upArrow.png"
                  alt=""
                  class="select"
                  v-show="currIndex2 == 2"
                />
              </li>
              <li @click="handleclick2(3)">
                <h3>失信人员</h3>
                <b>{{ info2.untrustworthyNum }}</b>
                <img
                  src="~@/images/upArrow.png"
                  alt=""
                  class="select"
                  v-show="currIndex2 == 3"
                />
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
                    <div style="width: 70px">{{ item.name }}</div>
                    <div style="width: 80px">
                      {{ item.sex }}
                    </div>
                    <div style="width: 80px">{{ item.village }}</div>
                    <div style="width: 132px">
                      {{
                        item.phone
                          ? item.phone.replace(
                              /(\d{3})(\d{4})(\d{4})/,
                              "$1****$3"
                            )
                          : ""
                      }}
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
          <!-- 乡村点击星弹窗 -->
          <div class="xct">
            <el-popover
              placement="right"
              width="400"
              trigger="click"
              class="popover"
              v-for="(item, index) in xcList"
              :key="index"
              :style="{
                left: item.position.split(',')[0],
                top: item.position.split(',')[1],
              }"
            >
              <div class="xcbox">
                <div class="xcbox-top">
                  <h2>{{ item.name }}</h2>
                  <p>负责人：{{ item.pope }}</p>
                </div>
                <div class="xcbox-bottom">
                  <img :src="item.qr" alt="" />
                </div>
              </div>

              <el-button slot="reference" class="wx">
                <img src="../../images/wxing.png" alt="" />
              </el-button>
            </el-popover>
          </div>
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
            <p>{{ info1.total }}<span>份</span></p>
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
            value-format="yyyy-MM-dd"
            @change="handleChanges"
          >
          </el-date-picker>
          <span class="el-icon-arrow-up el-input__icon jt"></span>
        </div>
        <!-- 审查列表 -->
        <div class="sclist">
          <ul>
            <li @click="handleclick(0)">
              <h3>全部</h3>
              <b class="color1">{{ info3.totalNum }}</b>
              <img
                src="~@/images/upArrow.png"
                alt=""
                class="select"
                v-show="currIndex == 0"
              />
            </li>
            <li @click="handleclick(1)">
              <h3>已审查</h3>
              <b class="color2">{{ info3.passNum }}</b>
              <img
                src="~@/images/upArrow.png"
                alt=""
                class="select"
                v-show="currIndex == 1"
              />
            </li>
            <li @click="handleclick(2)">
              <h3>未审查</h3>
              <b class="color3">{{ info3.unPassNum }}</b>
              <img
                src="~@/images/upArrow.png"
                alt=""
                class="select"
                v-show="currIndex == 2"
              />
            </li>
            <li @click="handleclick(3)">
              <h3>逾期</h3>
              <b class="color4">{{ info3.overDate }}</b>
              <img
                src="~@/images/upArrow.png"
                alt=""
                class="select"
                v-show="currIndex == 3"
              />
            </li>
          </ul>
          <!-- 表格列 -->
          <div class="table">
            <div class="top">
              <div style="width: 56px">序号</div>
              <div style="width: 140px" class="listName">合同名称</div>
              <div style="width: 90px">上传时间</div>
              <div style="width: 89px">审查状态</div>
            </div>
            <div class="bottom">
              <vue-seamless-scroll
                :data="tableList"
                :class-option="defaultOption"
              >
                <div
                  class="blist"
                  v-for="(item, index) in tableList"
                  :key="index"
                  @click="handleTable(item.id)"
                >
                  <div style="width: 56px">{{ index + 1 }}</div>
                  <div style="width: 140px" class="listName">
                    {{ item.name }}
                  </div>
                  <div style="width: 90px">{{ item.upTime }}</div>
                  <div style="width: 89px">
                    <span>
                      {{
                        item.status == 1
                          ? "已审查"
                          : item.status == 2
                          ? "未审查"
                          : "逾期"
                      }}</span
                    >
                    <img
                      src="../../images/wsc.png"
                      alt=""
                      v-if="item.status == 2 ? show1 : show2"
                    />
                    <img
                      src="../../images/ysc.png"
                      alt=""
                      v-if="item.status == 1 ? show1 : show2"
                    />
                    <img
                      src="../../images/yq.png"
                      alt=""
                      v-if="item.status == 3 ? show1 : show2"
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
                      <p>{{ details.name }}</p>
                    </div>
                    <div>
                      <span>上传部门：</span>
                      <p>{{ details.deptName }}</p>
                    </div>
                    <div>
                      <span>上传时间：</span>
                      <p>{{ details.createTime }}</p>
                    </div>
                    <div>
                      <span>审查结果：</span>
                      <p>
                        {{
                          details.status == 1
                            ? "已审查"
                            : details.status == 2
                            ? "未审查"
                            : "逾期"
                        }}
                      </p>
                    </div>
                    <div>
                      <span>审查状态：</span>
                      <p>
                        {{
                          details.status == 1
                            ? "已审查"
                            : details.status == 2
                            ? "未审查"
                            : "逾期"
                        }}
                        <img
                          src="../../images/wsc.png"
                          alt=""
                          v-if="details.status == 2 ? show1 : show2"
                        />
                        <img
                          src="../../images/ysc.png"
                          alt=""
                          v-if="details.status == 1 ? show1 : show2"
                        />
                        <img
                          src="../../images/yq.png"
                          alt=""
                          v-if="details.status == 3 ? show1 : show2"
                        />
                      </p>
                    </div>
                    <div>
                      <span>审核时间：</span>
                      <p>{{ details.auditTime }}</p>
                    </div>
                    <div>
                      <span>律师意见/司法所意见：</span>
                      <p>
                        {{ details.suggestion }}
                      </p>
                    </div>
                    <div>
                      <span>所属律师：</span>
                      <p>{{ details.lawyer }}</p>
                    </div>
                  </div>
                  <div class="close" @click="handleClose">
                    <img src="../../images/close1.png" alt="" />
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
          <div id="pople2"><img src="../../images/yuebao.png" alt="" /></div>
          <!-- 审查人员列表 -->
          <div class="sclist sclist2">
            <ul>
              <li @click="handleclick2(0)">
                <h3>吸毒人员</h3>
                <b>{{ info2.drugNum }}</b>
                <img
                  src="~@/images/upArrow.png"
                  alt=""
                  class="select"
                  v-show="currIndex2 == 0"
                />
              </li>
              <li @click="handleclick2(1)">
                <h3>矫正人员</h3>
                <b>{{ info2.corNum }}</b>
                <img
                  src="~@/images/upArrow.png"
                  alt=""
                  class="select"
                  v-show="currIndex2 == 1"
                />
              </li>
              <li @click="handleclick2(2)">
                <h3>刑释解矫人员</h3>
                <b>{{ info2.releaseNum }}</b>
                <img
                  src="~@/images/upArrow.png"
                  alt=""
                  class="select"
                  v-show="currIndex2 == 2"
                />
              </li>
              <li @click="handleclick2(3)">
                <h3>失信人员</h3>
                <b>{{ info2.untrustworthyNum }}</b>
                <img
                  src="~@/images/upArrow.png"
                  alt=""
                  class="select"
                  v-show="currIndex2 == 3"
                />
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
                    <div style="width: 70px">{{ item.name }}</div>
                    <div style="width: 80px">
                      {{ item.sex }}
                    </div>
                    <div style="width: 80px">{{ item.village }}</div>
                    <div style="width: 132px">
                      {{
                        item.phone
                          ? item.phone.replace(
                              /(\d{3})(\d{4})(\d{4})/,
                              "$1****$3"
                            )
                          : ""
                      }}
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
      info1: {}, //审查统计
      info2: {}, //重点人员统计
      info3: {}, //审查列表人员统计
      details: {}, //审查列表详情
      currIndex: 0, // 审查列表当前选中下标
      currIndex2: 0, // 重点人员列表当前选中下标
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
      // 审查人员列表
      sclist2: [],
      //
      active: true,
      // 审查列表
      tableList: [],
      // 默认弹窗隐藏
      ifShow2: false,

      tableList2: [],
      // 判断状态
      show1: true,
      show2: false,
      // 查看村庄
      xcList: [],
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
          value: 33,
          name: "审查率",
          title: {
            offsetCenter: ["0%", "34%"],
            fontSize: 17,
            color: "#fff",
          },
          detail: {
            valueAnimation: true,
            offsetCenter: ["0%", "-22%"],
          },
        },
      ];
      gaugeData[0].value = this.info1.passRate;
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

                      color: "rgba(84, 255, 241, 1)", // 0%处的颜色为红色
                    },
                    {
                      offset: 0.5,

                      color: "rgba(84, 255, 241, 1)", // 0%处的颜色为红色
                    },
                    {
                      offset: 1,
                      color: "rgba(70, 49, 248, 1)", // 100%处的颜色为蓝
                    },
                  ],
                },
              },
            },
            axisLine: {
              lineStyle: {
                width: 6,
                color: [
                  [
                    1,
                    this.$echarts.graphic.LinearGradient(0, 0, 1, 0, [
                      {
                        offset: 0,
                        // 起始颜色
                        color: "rgba(70, 49, 248, .2)",
                      },
                      {
                        offset: 0.5,
                        // 起始颜色
                        color: "rgba(84, 255, 241, .2)",
                      },
                      {
                        offset: 1,
                        // 结束颜色
                        color: "rgba(70, 49, 248, .2)",
                      },
                    ]),
                  ],
                ],
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
              distance: 30,
            },
            data: gaugeData,
            title: {
              fontSize: 14,
            },
            detail: {
              // 里面的文字样式
              width: 55,
              height: 28,
              fontSize: 20,
              color: "#fff",
              borderColor: "none",
              formatter: "{value}%",
            },
          },
        ],
      });
      // 定时器
      // setInterval(function () {
      //   gaugeData[1].value = +(Math.random() * 100).toFixed(2);

      //   myChart.setOption({
      //     series: [
      //       {
      //         data: gaugeData,
      //         pointer: {
      //           show: false,
      //         },
      //       },
      //     ],
      //   });
      // }, 2000);
    },
    // 饼图
    drawChart() {
      let that = this;
      //基于准备好的dom，初始化echarts实例
      var myChart = this.$echarts.init(document.getElementById("pople"));
      let data1 = [
        // { value: 30, name: "长石村" },
        // { value: 15, name: "九龙湖村 " },
        // { value: 18, name: "汶溪村" },
        // { value: 18, name: "秦山村" },
        // { value: 18, name: "西经堂村" },
      ];

      let newData = that.info2.groupData.map((item, index) => {
        return Object.assign(
          {},
          { value: item.rate },
          { name: item.villageName }
        );
      });
      data1 = newData;
      data1.push(
        { value: 25, name: "长石村" },
        { value: 25, name: "九龙湖村 " },
        { value: 25, name: "汶溪村" }
      );

      // 绘制饼图
      myChart.setOption({
        tooltip: {
          trigger: "item",
          formatter: " {b}<br/> 总人数: {c} %",
        },
        legend: {
          right: "right",
          orient: "vertical",
          itemGap: 16,
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
            return name + "  " + (val[0].value / count).toFixed(2) * 100 + "%";
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
            radius: [16, 90],
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
            offsetCenter: ["0%", "34%"],
            fontSize: 17,
            color: "#fff",
          },
          detail: {
            valueAnimation: true,
            offsetCenter: ["0%", "-22%"],
          },
        },
      ];
      gaugeData[0].value = this.info1.passRate;
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

                      color: "rgba(84, 255, 241, 1)", // 0%处的颜色为红色
                    },
                    {
                      offset: 0.5,

                      color: "rgba(84, 255, 241, 1)", // 0%处的颜色为红色
                    },
                    {
                      offset: 1,
                      color: "rgba(70, 49, 248, 1)", // 100%处的颜色为蓝
                    },
                  ],
                },
              },
            },
            axisLine: {
              lineStyle: {
                width: 6,
                color: [
                  [
                    1,
                    this.$echarts.graphic.LinearGradient(0, 0, 1, 0, [
                      {
                        offset: 0,
                        // 起始颜色
                        color: "rgba(70, 49, 248, .2)",
                      },
                      {
                        offset: 0.5,
                        // 起始颜色
                        color: "rgba(84, 255, 241, .2)",
                      },
                      {
                        offset: 1,
                        // 结束颜色
                        color: "rgba(70, 49, 248, .2)",
                      },
                    ]),
                  ],
                ],
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
              distance: 30,
            },
            data: gaugeData,
            title: {
              fontSize: 14,
            },
            detail: {
              // 里面的文字样式
              width: 55,
              height: 25,
              fontSize: 20,
              color: "#fff",
              borderColor: "none",
              formatter: "{value}%",
            },
          },
        ],
      });
      // 定时器
      // setInterval(function () {
      //   gaugeData[1].value = +(Math.random() * 100).toFixed(2);

      //   myChart.setOption({
      //     series: [
      //       {
      //         data: gaugeData,
      //         pointer: {
      //           show: false,
      //         },
      //       },
      //     ],
      //   });
      // }, 2000);
    },

    // 审查列表
    handleclick(index) {
      this.currIndex = index;
    },
    handleTable(id) {
      this.ifShow2 = true;
      // 审查列表详情
      this.api.getAuditDetails(id).then((res) => {
        this.details = res;
        console.log("8888", res);
      });
      // this.ifShow2=index
    },
    // 根据时间选定
    handleChanges(e) {
      // 合法审查人数统计
      // let qry = this.query.new();
      // this.query.toW(qry, "startTime", e[0], "ge");
      // this.query.toW(qry, "endTime", e[1], "le");
      // this.query.toEncode(qry)
      this.api.getReviewCount({startTime:e[0],endTime:e[1]}).then((resp) => {
        this.info3 = resp;
      });

      // 合法审查列表
      this.api.getContractList({startTime:e[0],endTime:e[1]}).then((res) => {
        this.tableList = res;
      });
    },
    // 关闭弹窗
    handleClose() {
      this.ifShow2 = false;
      console.log("ccccc");
    },
    // 审查人员
    handleclick2(index) {
      this.currIndex2 = index;
    },
  },
  created() {},
  mounted() {
    // 合法审查率
    this.api.getCensorshipRate().then((res) => {
      this.info1 = res;
      this.gauge();
      this.gauge2();
    });
    // 合法审查人数统计
    let qry = this.query.new();
    // this.query.toW(qry, "startTime", "2022-04", "ge");
    // this.query.toW(qry, "endTime", "2022-05", "le");
    // this.query.toEncode(qry)
    this.api.getReviewCount().then((resp) => {
      this.info3 = resp;
    });
    // this.details = res;

    // 合法审查列表
    this.api.getContractList().then((res) => {
      this.tableList = res;
    });

    // 重点人员统计列表
    this.api.getKeyPersonnel().then((res) => {
      this.tableList2 = res;
    });
    // 重点人员统计
    this.api.getStatistics().then((res) => {
      this.info2 = res;
      this.drawChart();
    });

    // 乡村服务点列表
    this.api.getFzxcList({ current: 1, size: 20, type: 2 }).then((res) => {
      this.xcList = res.records;

    });

    // this.drawChart2();
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
    padding-top: 5px;
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
        margin-top: -15px;
        //
        #gauge {
          width: 135px;
          height: 155px;
          //   background-color: red;
        }
        #gauge2 {
          width: 135px;
          height: 155px;
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
        margin-top: -10px;
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
          // display: none;
          line-height: 26px;

          display: block;
        }
      }
      .sclist {
        font-size: 14px;
        font-family: "Source Han Sans CN";
        font-weight: 400;
        color: #ffffff;
        width: 372px;
        margin: 0 auto;
        margin-top: 12px;
        margin-bottom: 25px;
        ul {
          display: flex;
          justify-content: space-between;
          border-bottom: 1px solid #0088ff;
          width: 365px;
          margin-bottom: 17px;
          li {
            width: 25%;
            font-family: "Source Han Sans CN";
            text-align: center;
            position: relative;
            padding-bottom: 12px;
            cursor: pointer;
            b {
              font-size: 26px;
              font-size: 26px;
              font-family: "Agency FB";
              font-weight: bold;
              line-height: 50px;
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
            .select {
              position: absolute;
              bottom: 0px;
              left: 50%;
              transform: translateX(-50%);
            }
            // &.active::after {
            //   content: "";
            //   display: block;
            //   width: 0;
            //   border-left: 6px solid transparent;
            //   border-right: 6px solid transparent;
            //   border-bottom: 6px solid #0088ff;
            //   position: relative;
            //   left: 50%;
            //   margin-left: -3px;
            // }
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
            max-height: 140px;
            overflow: hidden;
            .blist {
              display: flex;
              justify-content: space-between;
              align-items: center;
              text-align: center;
              height: 26px;
              line-height: 26px;
              color: #fff;
              cursor: pointer;
              span {
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
          .listName {
            text-overflow: ellipsis;
            white-space: nowrap;
            overflow: hidden;
            padding-left: 5px;
            text-align: left;
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
                  img {
                    width: 18px;
                    height: 15px;
                  }
                }
                div:nth-child(7) {
                  span {
                    width: 200px;
                  }
                }
              }
            }
            .close {
              position: absolute;
              right: 60px;
              top: 40px;
              cursor: pointer;
            }
          }
        }
      }
      .sclist2 {
        margin-bottom: 0;
      }
      .scpople {
        // 饼图
        #pople {
          width: 350px;
          height: 180px;
          margin: 0 auto;
          margin-top: 30px;
          margin-bottom: -20px;
        }
        #pople2 {
          width: 300px;
          height: 100%;
          margin: 0 auto;
          margin-top: 25px;
          // margin-bottom: -24px;
          img {
            width: 100%;
            height: 100%;
            display: block;
          }
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
        margin-top: 97px;
        margin-left: 28px;
        position: relative;
        .map {
          width: auto;
          height: auto;
          display: block;
        }
        .xct {
          position: absolute;
          top: 0;
          width: 100%;
          height: 100%;
          .popover {
            display: block;
            position: absolute;
            left: 352px;
            top: 475px;
            &:nth-child(7) {
              transform: rotate(350deg);
            }
          }
          .fl1 {
            left: 409px;
            top: 486px;
          }

          /deep/.el-button {
            cursor: pointer;
            background: none;
            border: none;
            padding: 0;
          }
        }
      }
    }
  }
}
.xcbox {
  width: 262px;
  min-height: 249px;
  border-radius: 5px;
  background: rgba(0, 0, 0, 0.6);
  box-sizing: border-box;
  position: absolute;
  top: -120px;
  left: 0px;
  font-family: "Source Han Sans CN";
  .xcbox-top {
    font-size: 14px;
    color: #fff;
    padding: 20px;
    border-bottom: 1px solid rgba(255, 255, 255, 0.2);
    h2 {
      font-size: 19px;
      font-weight: bold;
      margin-bottom: 10px;
    }
  }
  .xcbox-bottom {
    width: 110px;
    height: 110px;
    padding: 20px;
    img {
      border: 3px solid #ffffff;
      border-radius: 5px;
    }
  }
}
</style>

<style lang="less">
.el-popover {
  background: none !important;
  border: none !important;
  box-shadow: none !important;
  width: auto !important;
  min-width: auto;
  padding: 0;
}
.el-popper .popper__arrow {
  display: none !important;
}
</style>
