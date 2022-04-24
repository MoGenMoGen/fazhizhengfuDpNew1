<template>
  <div id="page_gl" :style="{ transform: `scale(${percentX},${percentY})` }">
    <MyHeader cur="0"></MyHeader>
    <div class="container">
      <div class="left">
        <div class="titlebox">
          <img src="~@/images/subtitle.png" alt="" />
          <div class="title">法治政府介绍</div>
        </div>
        <div class="zfintro_box">
          <div class="intro_video">
            <video
              id="video"
              ref="video"
              controls
              style="width: 100%; height: 100%; object-fit: fill"
              :src="info1.video ? info1.video : ''"
            ></video>
          </div>
          <div id="text" ref="text" @click="roll">
            <ul id="ul1" ref="ul1">
              <li>
                {{ info1.details }}
              </li>
            </ul>
            <ul id="ul2" ref="ul2"></ul>
          </div>
        </div>
        <div class="titlebox">
          <img src="~@/images/subtitle.png" alt="" />
          <div class="title">法治队伍</div>
        </div>
        <div class="gsinfo">
          <div class="itembox">
            <div class="num">{{ info2.leader }}</div>
            <img src="~@/images/fzdtr.png" alt="" />
            <div class="desc">法治带头人</div>
          </div>
          <div class="itembox">
            <div class="num">{{ info2.person }}</div>
            <img src="~@/images/flmbr.png" alt="" />
            <div class="desc">法律明白人</div>
          </div>
          <div class="itembox">
            <div class="num">{{ info2.police }}</div>
            <img src="~@/images/pqmj.png" alt="" />
            <div class="desc">片区民警</div>
          </div>
          <div class="itembox">
            <div class="num">{{ info2.lawyer }}</div>
            <img src="~@/images/ls.png" alt="" />
            <div class="desc">律师</div>
          </div>
        </div>
        <div class="titlebox">
          <img src="~@/images/subtitle.png" alt="" />
          <div class="title">法治乡村</div>
        </div>
        <div class="fzxcbox">
          <div class="itembox" @click="chooseTab11(0)">
            <div class="num">{{ info3.demonstration }}</div>
            <div class="content">示范村社</div>
            <img
              src="~@/images/upArrow.png"
              alt=""
              class="select"
              v-show="currentIndex11 == 0"
            />
          </div>
          <div class="itembox" @click="chooseTab11(1)">
            <div class="num">{{ info3.position }}</div>
            <div class="content">法治阵地</div>
            <img
              src="~@/images/upArrow.png"
              alt=""
              class="select"
              v-show="currentIndex11 == 1"
            />
          </div>
        </div>
        <!-- 示范村 -->
        <div class="rural_list">
          <div
            class="itembox"
            v-for="(item, index) in list1"
            :key="index"
            @click="chooseTab12(item.choice)"
          >
            <div
              class="content"
              :class="{ active_content: currentchoice == item.choice }"
            >
              <div
                class="icon"
                :class="{ active_icon: currentchoice == item.choice }"
              >
                <img
                  v-if="currentchoice != item.choice"
                  src="~@/images/badge1.png"
                  alt=""
                />
                <img v-else src="~@/images/badge2.png" alt="" />
              </div>
              <div
                class="text"
                :class="{ active_text: currentchoice == item.choice }"
              >
                {{ item.name }}
              </div>
            </div>
          </div>
        </div>
      </div>
      <!-- 中间地图 -->
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
          <!-- 地图凸起 -->
          <!-- 汶溪村 -->
          <div class="wxc" v-show="currentchoice == 15">
            <img src="~@/images/map/wx.png" alt="" class="wxmap" />
            <div class="mapicon" @click="handlemap">汶溪村</div>
            <div class="carousel" v-show="village">
              <div class="carousel2">
                <h2>汶溪村</h2>
                <el-carousel :interval="5000" arrow="always">
                  <el-carousel-item
                    v-for="(item, index) in info4.img
                      ? info4.img.split(',')
                      : []"
                    :key="index"
                  >
                    <img :src="item" alt="" />
                  </el-carousel-item>
                </el-carousel>
                <div class="close" @click="handleClose">
                  <img src="../../images/close1.png" alt="" />
                </div>
              </div>
            </div>
          </div>
          <!-- 田顾村 -->
          <div class="wxc left1" v-show="currentchoice == 9">
            <img src="~@/images/map/tg.png" alt="" class="wxmap" />
            <div class="mapicon" @click="handlemap">田顾村</div>
            <div class="carousel" v-show="village">
              <div class="carousel2">
                <h2>田顾村</h2>
                <el-carousel :interval="5000" arrow="always">
                  <el-carousel-item
                    v-for="(item, index) in info4.img
                      ? info4.img.split(',')
                      : []"
                    :key="index"
                  >
                    <img :src="item" alt="" />
                  </el-carousel-item>
                </el-carousel>
                <div class="close" @click="handleClose">
                  <img src="../../images/close1.png" alt="" />
                </div>
              </div>
            </div>
          </div>
          <!-- 河头村 -->
          <div class="wxc left2" v-show="currentchoice == 12">
            <img src="~@/images/map/ht.png" alt="" class="wxmap" />
            <div class="mapicon" @click="handlemap">河头村</div>
            <div class="carousel" v-show="village">
              <div class="carousel2">
                <h2>河头村</h2>
                <el-carousel :interval="5000" arrow="always">
                  <el-carousel-item
                    v-for="(item, index) in info4.img
                      ? info4.img.split(',')
                      : []"
                    :key="index"
                  >
                    <img :src="item" alt="" />
                  </el-carousel-item>
                </el-carousel>
                <div class="close" @click="handleClose">
                  <img src="../../images/close1.png" alt="" />
                </div>
              </div>
            </div>
          </div>
          <!-- 长石村 -->
          <div class="wxc left3" v-show="currentchoice == 4">
            <img src="~@/images/map/cs.png" alt="" class="wxmap" />
            <div class="mapicon" @click="handlemap">长石村</div>
            <div class="carousel" v-show="village">
              <div class="carousel2">
                <h2>长石村</h2>
                <el-carousel :interval="5000" arrow="always">
                  <el-carousel-item
                    v-for="(item, index) in info4.img
                      ? info4.img.split(',')
                      : []"
                    :key="index"
                  >
                    <img :src="item" alt="" />
                  </el-carousel-item>
                </el-carousel>
                <div class="close" @click="handleClose">
                  <img src="../../images/close1.png" alt="" />
                </div>
              </div>
            </div>
          </div>
          <!-- 九龙湖村 -->
          <div class="wxc left4" v-show="currentchoice == 10">
            <img src="~@/images/map/jlh.png" alt="" class="wxmap" />
            <div class="mapicon" @click="handlemap">九龙湖村</div>
            <div class="carousel" v-show="village">
              <div class="carousel2">
                <h2>九龙湖村</h2>
                <el-carousel :interval="5000" arrow="always">
                  <el-carousel-item
                    v-for="(item, index) in info4.img
                      ? info4.img.split(',')
                      : []"
                    :key="index"
                  >
                    <img :src="item" alt="" />
                  </el-carousel-item>
                </el-carousel>
                <div class="close" @click="handleClose">
                  <img src="../../images/close1.png" alt="" />
                </div>
              </div>
            </div>
          </div>
          <!-- 长石村 -->
          <!-- <div class="wxc left3" v-show="currentchoice == 4">
            <img src="~@/images/map/cs.png" alt="" class="wxmap" />
            <div class="mapicon" @click="handlemap">思源社区</div>
            <div class="carousel" v-show="village">
              <div class="carousel2">
                <h2>思源社区</h2>
                <el-carousel :interval="5000" arrow="always">
                  <el-carousel-item v-for="item in 4" :key="item">
                    <img src="../../images/czimg.jpg" alt="" />
                  </el-carousel-item>
                </el-carousel>
                <div class="close" @click="handleClose">
                  <img src="../../images/close1.png" alt="" />
                </div>
              </div>
            </div>
          </div> -->
          <!-- 杜夹岙村 -->
          <div class="wxc left5" v-show="currentchoice == 2">
            <img src="~@/images/map/sj.png" alt="" class="wxmap" />
            <div class="mapicon" @click="handlemap">杜夹岙村</div>
            <div class="carousel" v-show="village">
              <div class="carousel2">
                <h2>杜夹岙村</h2>
                <el-carousel :interval="5000" arrow="always">
                  <el-carousel-item
                    v-for="(item, index) in info4.img
                      ? info4.img.split(',')
                      : []"
                    :key="index"
                  >
                    <img :src="item" alt="" />
                  </el-carousel-item>
                </el-carousel>
                <div class="close" @click="handleClose">
                  <img src="../../images/close1.png" alt="" />
                </div>
              </div>
            </div>
          </div>
          <!-- 田杨陈村 -->
          <div class="wxc left6" v-show="currentchoice == 8">
            <img src="~@/images/map/tyc.png" alt="" class="wxmap" />
            <div class="mapicon" @click="handlemap">田杨陈村</div>
            <div class="carousel" v-show="village">
              <div class="carousel2">
                <h2>田杨陈村</h2>
                <el-carousel :interval="5000" arrow="always">
                  <el-carousel-item
                    v-for="(item, index) in info4.img
                      ? info4.img.split(',')
                      : []"
                    :key="index"
                  >
                    <img :src="item" alt="" />
                  </el-carousel-item>
                </el-carousel>
                <div class="close" @click="handleClose">
                  <img src="../../images/close1.png" alt="" />
                </div>
              </div>
            </div>
          </div>
          <!-- 西河村 -->
          <div class="wxc left7" v-show="currentchoice == 3">
            <img src="~@/images/map/sh.png" alt="" class="wxmap" />
            <div class="mapicon" @click="handlemap">西河村</div>
            <div class="carousel" v-show="village">
              <div class="carousel2">
                <h2>西河村</h2>
                <el-carousel :interval="5000" arrow="always">
                  <el-carousel-item
                    v-for="(item, index) in info4.img
                      ? info4.img.split(',')
                      : []"
                    :key="index"
                  >
                    <img :src="item" alt="" />
                  </el-carousel-item>
                </el-carousel>
                <div class="close" @click="handleClose">
                  <img src="../../images/close1.png" alt="" />
                </div>
              </div>
            </div>
          </div>
          <!-- 西经堂村 -->
          <div class="wxc left8" v-show="currentchoice == 7">
            <img src="~@/images/map/xjt.png" alt="" class="wxmap" />
            <div class="mapicon" @click="handlemap">西经堂村</div>
            <div class="carousel" v-show="village">
              <div class="carousel2">
                <h2>西经堂村</h2>
                <el-carousel :interval="5000" arrow="always">
                  <el-carousel-item
                    v-for="(item, index) in info4.img
                      ? info4.img.split(',')
                      : []"
                    :key="index"
                  >
                    <img :src="item" alt="" />
                  </el-carousel-item>
                </el-carousel>
                <div class="close" @click="handleClose">
                  <img src="../../images/close1.png" alt="" />
                </div>
              </div>
            </div>
          </div>
          <!-- 长宏村 -->
          <div class="wxc left9" v-show="currentchoice == 5">
            <img src="~@/images/map/ch.png" alt="" class="wxmap" />
            <div class="mapicon" @click="handlemap">长宏村</div>
            <div class="carousel" v-show="village">
              <div class="carousel2">
                <h2>长宏村</h2>
                <el-carousel :interval="5000" arrow="always">
                  <el-carousel-item
                    v-for="(item, index) in info4.img
                      ? info4.img.split(',')
                      : []"
                    :key="index"
                  >
                    <img :src="item" alt="" />
                  </el-carousel-item>
                </el-carousel>
                <div class="close" @click="handleClose">
                  <img src="../../images/close1.png" alt="" />
                </div>
              </div>
            </div>
          </div>
          <!-- 中心村 -->
          <div class="wxc left10" v-show="currentchoice == 1">
            <img src="~@/images/map/zx.png" alt="" class="wxmap" />
            <div class="mapicon" @click="handlemap">中心村</div>
            <div class="carousel" v-show="village">
              <div class="carousel2">
                <h2>中心村</h2>
                <el-carousel :interval="5000" arrow="always">
                  <el-carousel-item
                    v-for="(item, index) in info4.img
                      ? info4.img.split(',')
                      : []"
                    :key="index"
                  >
                    <img :src="item" alt="" />
                  </el-carousel-item>
                </el-carousel>
                <div class="close" @click="handleClose">
                  <img src="../../images/close1.png" alt="" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="right">
        <div class="titlebox">
          <img src="~@/images/subtitle.png" alt="" />
          <div class="title">法律宝典</div>
        </div>
        <div class="flbd_box">
          <div class="itembox" @click="chooseTab2(0)">
            <div class="title">法律文书</div>
            <div class="num">{{ info5.paperwork }}</div>
            <div class="data">
              <img src="~@/images/download.png" alt="" />
              <div class="val">10</div>
            </div>
            <img
              src="~@/images/upArrow.png"
              class="select"
              alt=""
              v-show="currentIndex2 == 0"
            />
          </div>
          <div class="itembox" @click="chooseTab2(1)">
            <div class="title">法律故事</div>
            <div class="num">{{ info5.story }}</div>
            <div class="data">
              <img src="~@/images/browse.png" alt="" />
              <div class="val">20</div>
            </div>
            <img
              src="~@/images/upArrow.png"
              class="select"
              alt=""
              v-show="currentIndex2 == 1"
            />
          </div>
        </div>
        <!-- 法律文书列表 -->
        <div class="list21" v-show="currentIndex2 == 0">
          <div
            class="itembox"
            v-for="(item, index) in list21"
            :key="index"
            @click="hanldeClickf(index)"
          >
            <img src="~@/images/wenshu.png" alt="" />
            <div class="nm">{{ item.name }}</div>
            <!-- 法律文书详情 -->
            <div
              class="details"
              v-if="fws && list21.length > 0 && currentIndex21 == index"
            >
              <div class="detailsList wenshu">
                <h2>法律文书详情</h2>
                <pdf :pdfurl="item.url"></pdf>
                <div class="close" @click.stop="handleClose">
                  <img src="../../images/close1.png" style="width: 19px;height: 19px;" alt="" />
                </div>
              </div>
            </div>
          </div>
        </div>
        <!-- 法律故事列表 -->
        <div class="list21 list22" v-show="currentIndex2 == 1">
          <div
            class="itembox item2"
            v-for="(item, index) in list22"
            :key="index"
            @click="bofang(item.id)"
          >
            <div class="img">
              <img :src="item.img" class="gsimg" alt="" />
              <div class="zzc"></div>
              <img src="~@/images/vimg.png" class="anbutton" alt="" />
            </div>
            <div class="title">{{ item.name }}</div>
            <!-- 法律故事视频详情 -->
            <div class="details viodebox" v-if="isVideo && list22.length > 0">
              <div class="detailsList videoList">
                <h2>法律故事详情</h2>
                <video
                  width="100%"
                  controls
                  loop
                  id="videoplay"
                  class="video-src"
                  ref="gsDtlVideo"
                  :src="item.url"
                ></video>
                <div class="close" @click.stop="handleClose">
                  <img src="../../images/close1.png" alt="" />
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="titlebox">
          <img src="~@/images/subtitle.png" alt="" />
          <div class="title">重点人员</div>
        </div>
        <div class="gsinfo">
          <div class="itembox">
            <div class="num">{{ info6.drugNum }}</div>
            <img src="~@/images/xdry.png" alt="" />
            <div class="desc">吸毒人员</div>
          </div>
          <div class="itembox">
            <div class="num">{{ info6.corNum }}</div>
            <img src="~@/images/jzdx.png" alt="" />
            <div class="desc">矫正对象</div>
          </div>
          <div class="itembox">
            <div class="num">{{ info6.releaseNum }}</div>
            <img src="~@/images/xsjj.png" alt="" />
            <div class="desc">刑释解矫人员</div>
          </div>
          <div class="itembox">
            <div class="num">{{ info6.untrustworthyNum }}</div>
            <img src="~@/images/sxry.png" alt="" />
            <div class="desc">失信人员</div>
          </div>
        </div>
        <div class="titlebox">
          <img src="~@/images/subtitle.png" alt="" />
          <div class="title">法律咨询</div>
        </div>
        <div class="fzxcbox">
          <div class="itembox" @click="chooseTab3(0)">
            <div class="num">{{ info7.replied }}</div>
            <div class="content">已回复</div>
            <img
              src="~@/images/upArrow.png"
              alt=""
              class="select"
              v-show="currentIndex3 == 0"
            />
          </div>
          <div class="itembox" @click="chooseTab3(1)">
            <div class="num">{{ info7.Unanswered }}</div>
            <div class="content">未回复</div>
            <img
              src="~@/images/upArrow.png"
              alt=""
              class="select"
              v-show="currentIndex3 == 1"
            />
          </div>
        </div>
        <vue-seamless-scroll
          :data="list3"
          class="list3"
          :class-option="defaultOption"
        >
          <div
            class="item3"
            v-for="(item, index) in list3"
            :key="index"
            @click="handleChanges(item.id)"
          >
            <div class="leftbox">{{ item.title }}</div>
            <div class="rightbox">
              {{ item.updateTime ? item.updateTime.slice(0, 10) : "" }}
            </div>
          </div>
        </vue-seamless-scroll>
        <!-- 弹窗详情 -->
        <div class="details" v-show="isShow2">
          <div
            class="detailsList"
            :style="{
              height: '750px',
            }"
          >
            <h2>法律咨询详情</h2>
            <div class="flxq">
              <div class="ft">
                {{ info8.title }}
              </div>
              <div class="fl3">
                <div class="autor">
                  <div>发起人：{{ info8.author }}</div>
                  <div class="ftime3">
                    {{ info8.updateTime ? info8.updateTime.slice(0, 10) : "" }}
                  </div>
                </div>
                <div class="ftime1">
                  <img src="~@/images/aixin.png" alt="" />
                  <div class="ic2">155</div>
                </div>
              </div>
              <div class="flBottom" v-html="info8.details">
                <!-- <div class="fb2">
                  九龙湖法律解答九龙湖法律解答九龙湖法律解答九龙湖法律解答九龙湖法律解答九龙湖法律解
                  答九龙湖法律解答九龙湖法律解答九龙湖法律解答九龙湖法律解答九龙湖法律解答九龙湖法律
                  解答九龙湖法律解答九龙湖
                </div>
                <div class="fbimg">
                  <img src="../../images/pope.png" alt="" />
                </div> -->
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
</template>

<script>
import MyHeader from "../../components/MyHeader";
import pdf from "../../components/pdf";
export default {
  data() {
    return {
      info1: {}, //法治政府介绍
      info2: {}, //法治队伍人数统计
      info3: {}, //法治乡村统计
      info4: {}, //法治乡村详情
      info5: {}, //法治宝典统计
      info6: {}, //重点人员统计
      info7: {}, //法律咨询统计
      info8: {}, //法律咨询详情
      currentIndex11: 0, //法治乡村标题下标
      currentchoice: 0, //法治乡村内容下标
      choose: -1, // 乡村默认
      // 法治乡村列表
      list1: [],
      currentIndex2: 0, //法律宝典下标

      fws: false, //显示法律文书详情
      currentIndex21: -1, //选中文书下标
      // 法律宝典-法律文书列表
      list21: [],
      // 法律故事列表
      list22: [],
      isVideo: false,
      currentIndex3: 0, //法律咨询下标

      // 法律咨询列表
      list3: [],
      isShow2: false,
      // 地图五星图标
      village: false,
      mapList: {},
      // 查看村庄
      xcList: [],
    };
  },
  components: { MyHeader, pdf },
  computed: {
    //滚动配置
    defaultOption() {
      return {
        step: 0.2, // 数值越大速度滚动越快
        limitMoveNum: 4, // 开始无缝滚动的数据量 this.dataList.length
        hoverStop: true, // 是否开启鼠标悬停stop
        direction: 1, // 0向下 1向上 2向左 3向右
        openWatch: true, // 开启数据实时监控刷新dom
        singleHeight: 0, // 单步运动停止的高度(默认值0是无缝不停止的滚动) direction => 0/1
        singleWidth: 0, // 单步运动停止的宽度(默认值0是无缝不停止的滚动) direction => 2/3
        waitTime: 1000, // 单步运动停止的时间(默认值1000ms)
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
  methods: {
    roll(t) {
      let ul1 = this.$refs.ul1;
      let ul2 = this.$refs.ul2;
      let text = this.$refs.text;
      ul2.innerHTML = ul1.innerHTML;
      text.scrollTop = 0;
      let that = this;
      let timer = setInterval(() => {
        that.rollStart(text, ul1, ul2);
      }, t);
      text.onmouseover = () => {
        console.log("onmouseover");
        clearInterval(timer);
      };
      text.onmouseout = () => {
        console.log("onmouseout");
        timer = setInterval(() => {
          that.rollStart(text, ul1, ul2);
        }, t);
      };
    },

    rollStart(text, ul1, ul2) {
      if (text.scrollTop >= ul1.scrollHeight) {
        // console.log(1111111);
        text.scrollTop = 0;
      } else {
        // console.log(2222222);
        text.scrollTop++;
      }
    },
    // 左侧-法治乡村
    chooseTab11(index) {
      this.currentIndex11 = index;
    },
    // 左侧-村庄选择
    chooseTab12(index) {
      this.currentchoice = index;
      this.info4 = this.list1.filter((item) => {
        return this.currentchoice == item.choice;
      })[0];
      console.log("info4", this.info4);
      // this.choose = index;
    },
    // 右侧-法律宝典
    chooseTab2(index) {
      this.currentIndex2 = index;
      if (index == 0) {
        this.api.getFlbdList({ current: 1, size: 20, type: 1 }).then((res) => {
          this.list21 = res.records;
        });
      } else if (index == 1) {
        this.api.getFlbdList({ current: 1, size: 20, type: 2 }).then((res) => {
          this.list22 = res.records;
        });
      }
    },
    // 右侧-法律咨询
    chooseTab3(index) {
      this.currentIndex3 = index;
      if (index == 0) {
        // 已回复
        this.api
          .getFlzxList({ current: 1, size: 10, isReply: 1 })
          .then((res) => {
            this.list3 = res.records;
          });
      } else if (index == 1) {
        // 未回复
        this.api
          .getFlzxList({ current: 1, size: 10, isReply: 2 })
          .then((res) => {
            this.list3 = res.records;
          });
      }
    },
    // 法律文书pdf
    hanldeClickf(index) {
      this.fws = true;
      this.currentIndex21 = index;
    },
    // 法律故事弹窗
    async bofang(id) {
      this.isVideo = true;
      // 浏览量+1
      // await this.api.AddPageview(id);
    },
    // 法律咨询详情
    async handleChanges(id) {
      this.isShow2 = true;
      this.info8 = await this.api.getFlzxDtl(id);
      this.info8.details = this.info8.details.replace(
        /<img[^>]*>/gi,
        function (match, capture) {
          return match.replace(/(<img[^>]*)(\/?>)/gi, "$1width='100%' $2"); // 添加width="100%"
        }
      );
      this.info8.details = this.info8.details.replace(
        /<img[^>]*>/gi,
        function (match, capture) {
          return match.replace(
            /style\s*?=\s*?([‘"])[\s\S]*?\1/gi,
            'style="max-width:100%;height:auto;"'
          ); // 替换style
        }
      );
    },
    // 地图位置轮播详情
    handlemap() {
      this.village = true;
    },
    handleClose() {
      this.isShow2 = false;
      this.fws = false;
      this.village = false;
      this.isVideo = false;
      // if (this.$refs.gsDtlVideo.length > 0) this.$refs.gsDtlVideo[0].pause(); //暂停
    },
  },
  async created() {
    // 获取法治政府视频、介绍
    this.api.getFzIntro().then((res) => {
      this.info1 = res[0] || "";
    });
    // 法治队伍人数统计
    this.info2 = await this.api.getFzdwStatis();
    // 法治乡村统计
    this.info3 = await this.api.getFzxcStatis();
    // 法治乡村列表
    this.api.getFzxcList({ current: 1, size: 20, type: 1 }).then((res) => {
      this.list1 = res.records;
    });
    // 地图五星服务点
    this.api.getFzxcList({ current: 1, size: 20, type: 2 }).then((res) => {
      this.xcList = res.records;
    });

    // 法治宝典统计
    this.info5 = await this.api.getFlbdStatis();
    // 法治宝典列表
    this.api.getFlbdList({ current: 1, size: 100, type: 1 }).then((res) => {
      this.list21 = res.records;
    });

    // 重点人员统计
    this.info6 = await this.api.getStatistics();
    // 法律咨询统计
    this.info7 = await this.api.getFlzxStatis();
    // 法律咨询分页
    this.api.getFlzxList({ current: 1, size: 100, isReply: 1 }).then((res) => {
      this.list3 = res.records;
    });
  },
  async mounted() {
    window.onload = this.roll(80);
  },
};
</script>

<style lang="less" scoped>
@import "../../assets/css/font/font.css";
#page_gl {
  // width: calc(~"1920px + 24px");
  width: 1920px;
  height: 1080px;
  // background: url(~@/images/bg.png) top center;
  // background-attachment: fixed;
  // background-size: 100% 100vh;

  // overflow: scroll hidden;
  // overflow:  hidden;
  transform-origin: top left;
  // overflow: hidden scroll;
  .container {
    // padding-top: 119px;
    box-sizing: border-box;
    min-height: 100%;
    // padding-bottom: 50px;
    display: flex;
    justify-content: space-between;
    .titlebox {
      width: 442px;
      img {
        width: 100%;
        height: auto;
      }
      .title {
        width: 100%;
        text-align: center;
        font-size: 18px;
        font-weight: bold;
        color: #13ecff;
        margin-top: -20px;
      }
    }
    .gsinfo {
      width: 376px;
      margin-bottom: 30px;
      display: flex;
      justify-content: space-between;
      .itembox {
        display: flex;
        flex-direction: column;
        align-items: center;
        .num {
          font-size: 36px;
          font-family: "Agency FB";
          font-weight: bold;
          color: #3affe4;
          line-height: 74px;
          text-align: center;
        }
        img {
          width: 34px;
          height: 34px;
          object-fit: cover;
        }
        .desc {
          font-size: 14px;
          font-weight: 400;
          color: #ffffff;
          line-height: 40px;
          text-align: center;
        }
      }
    }
    .fzxcbox {
      display: flex;
      width: 362px;
      padding-bottom: 10px;
      border-bottom: 1px solid #0088ff;
      .itembox {
        width: 50%;
        // height: 193px;
        height: 174px;
        background: url(~@/images/bg2.png) center center;
        background-repeat: no-repeat;
        background-size: 117px 94px;
        position: relative;
        cursor: pointer;
        .num {
          font-size: 43px;
          font-family: "Agency FB";
          font-weight: bold;
          color: #ffffff;
          text-align: center;
          position: absolute;
          top: 53%;
          left: 50%;
          transform: translate(-50%, -50%);
        }
        .content {
          font-size: 16px;
          font-weight: 400;
          color: #ffffff;
          text-align: center;
          position: absolute;
          bottom: 20px;
          left: 50%;
          transform: translateX(-50%);
        }
        .select {
          position: absolute;
          bottom: -10px;
          left: 50%;
          transform: translateX(-50%);
        }
      }
    }
    // @keyframes rowup {
    //   0% {
    //     -webkit-transform: translate3d(0, 0, 0);
    //     transform: translate3d(0, 0, 0);
    //   }
    //   100% {
    //     -webkit-transform: translate3d(0, -380px, 0);
    //     transform: translate3d(0, -380px, 0);
    //   }
    // }
    .left {
      width: 442px;
      display: flex;
      flex-direction: column;
      align-items: center;
      .zfintro_box {
        width: 376px;
        height: 180px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-top: 14px;
        margin-bottom: 21px;
        // overflow-y: hidden;
        .intro_video {
          width: 180px;
          height: 180px;
        }
        #text {
          // -webkit-animation: 50s rowup linear infinite normal;
          // animation: 50s rowup linear infinite normal;
          // position: relative;
          overflow: hidden;
          width: 176px;
          height: 166px;
          font-size: 16px;
          font-weight: 400;
          color: #ffffff;
          padding-top: 14px;

          // line-height: 30px;
          // &::-webkit-scrollbar {
          //   display: none;
          // }
          li {
            width: 130px;
            // height:50px;
          }
        }
      }

      .rural_list {
        width: 313px;
        display: flex;
        flex-wrap: wrap;
        justify-content: space-between;
        height: 222px;
        &::-webkit-scrollbar {
          display: none;
        }
        overflow-y: scroll;
        .itembox {
          width: 142px;
          position: relative;
          margin-top: 30px;
          height: 41px;
          .content {
            position: absolute;
            width: 140px;
            height: 41px;
            background: #040423;
            border: 1px solid #ffffff;
            border-radius: 20px;
            font-size: 18px;
            font-weight: 500;
            color: #ffffff;
            line-height: 41px;
            cursor: pointer;
            // text-align: center;
            .icon {
              width: 33px;
              height: 33px;
              background: #ffffff;
              border-radius: 50%;
              position: absolute;
              top: 50%;
              left: 5px;
              transform: translateY(-50%);
              img {
                position: absolute;
                top: 50%;
                left: 50%;
                transform: translate(-50%, -50%);
              }
            }
            .text {
              font-size: 18px;
              font-weight: 500;
              color: #ffffff;
              line-height: 41px;
              height: 41px;
              position: absolute;
              top: 50%;
              left: 43px;
              transform: translateY(-50%);
            }
          }
          .active_content {
            background: #f4be4e;
            border: none;
            .active_icon {
              background: #040423;
            }
            .active_text {
              color: #030421;
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
            z-index: 99;
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
        // 地图浮起弹窗轮播
        .carousel {
          position: fixed;
          width: 100%;
          height: 100%;
          top: 0;
          left: 0;
          bottom: 0;
          right: 0;
          background: rgba(0, 0, 0, 0.5);
          z-index: 999;
          .carousel2 {
            width: 783px;
            height: 689px;
            background: url("../../images/cz.png") no-repeat;
            background-size: 100% 100%;
            position: absolute;
            left: 50%;
            top: 50%;
            margin-left: -391.5px;
            margin-top: -344.5px;
            padding-top: 42px;
            box-sizing: border-box;
            img {
              width: 100%;
              height: 100%;
            }
            .close {
              position: absolute;
              right: 60px;
              top: 40px;
              cursor: pointer;
            }
          }
          h2 {
            font-weight: bold;
            font-size: 29px;
            text-align: center;
            color: #6cfcff;
            line-height: 29px;
            background: linear-gradient(0deg, #41c3f5 0%, #cfe7ff 100%);
            background-clip: text;
            -webkit-text-fill-color: transparent;
            margin-bottom: 30px;
          }
          /deep/.el-carousel__container {
            height: 535px;
          }
          /deep/.el-carousel--horizontal {
            overflow: hidden;
            height: 530px;
            padding-left: 55px;
            padding-right: 55px;
            margin-left: 24px;
            margin-right: 24px;
          }
          /deep/.el-carousel__indicators {
            display: none;
          }
          /deep/.el-carousel__arrow--left {
            left: 0;
            margin-left: -50px;
          }
          /deep/.el-carousel__arrow--right {
            right: 0;
            margin-right: -50px;
          }
          /deep/.el-carousel__arrow {
            width: 30px;
            height: 35px;
            border-radius: 50%;
            border: 1px solid #fff;
            background-color: none;
          }
        }

        // 地图突起
        .wxc {
          position: absolute;
          left: 17px;
          top: 175px;
          // height: 482px;
          font-family: "Source Han Sans CN";
          .wxmap {
            height: 100%;
          }
          .mapicon {
            background: url("~@/images/map/icon1.png") no-repeat center center;
            height: 120px;
            width: 67px;
            position: absolute;
            top: 50%;
            left: 50%;
            margin-top: -100px;
            margin-left: -20px;
            line-height: 80px;
            text-align: center;
            font-size: 14px;
            font-weight: 500;
            color: #ea0015;
            cursor: pointer;
            // margin-left: -33px;
          }
          &.left1 {
            right: 168px;
            top: 251px;
            left: auto;
            .mapicon {
              margin-top: -100px;
            }
          }
          &.left2 {
            right: 40px;
            top: 52px;
            left: auto;
            .mapicon {
              margin-left: -30px;
            }
          }
          &.left3 {
            bottom: 19px;
            right: 173px;
            top: auto;
            left: auto;
          }
          &.left4 {
            top: 24px;
            left: 195px;
          }
          &.left5 {
            top: 274px;
            left: 425px;
          }
          &.left6 {
            right: 24px;
            top: 283px;
            left: auto;
            .mapicon {
              margin-left: -16px;
            }
          }
          &.left7 {
            top: 414px;
            left: 568px;
            .mapicon {
              margin-left: -30px;
            }
          }
          &.left8 {
            top: 373px;
            left: 676px;
            .mapicon {
              margin-left: -30px;
            }
          }
          &.left9 {
            top: 477px;
            left: 688px;
            .mapicon {
              margin-left: -30px;
            }
          }
          &.left10 {
            top: 411px;
            left: 384px;
            .mapicon {
              margin-left: -30px;
            }
          }
        }
      }
    }
    .right {
      width: 442px;
      display: flex;
      flex-direction: column;
      align-items: center;
      .flbd_box {
        width: 361px;
        display: flex;
        justify-content: space-around;
        padding-bottom: 20px;
        border-bottom: 1px solid #0088ff;
        margin-top: 16px;
        .itembox {
          position: relative;
          cursor: pointer;
          display: flex;
          flex-direction: column;
          align-items: center;
          .title {
            font-size: 14px;
            font-weight: 400;
            color: #ffffff;
          }
          .num {
            font-size: 26px;
            font-family: "Agency FB";
            font-weight: bold;
            color: #2efdfb;
            line-height: 56px;
          }
          .data {
            width: 72px;
            height: 33px;
            background: rgba(0, 48, 149, 0);
            border: 1px solid #ffffff;
            border-radius: 16px;
            display: flex;
            align-items: center;
            justify-content: space-around;
            img {
              width: 13px;
              height: 13px;
            }
            .val {
              font-size: 14px;
              font-weight: 400;
              color: #ffffff;
            }
          }
          .select {
            position: absolute;
            bottom: -20px;
            left: 50%;
            transform: translateX(-50%);
          }
        }
      }
      .list21 {
        margin-bottom: 20px;
        width: 362px;
        height: 210px;
        overflow-y: scroll;
        overflow-x: hidden;
        padding: 0px 17px;
        box-sizing: border-box;
        display: flex;
        flex-wrap: wrap;
        justify-content: flex-start;
        &::-webkit-scrollbar {
          display: none;
        }
        .itembox {
          width: 25%;
          display: flex;
          flex-direction: column;
          align-items: center;
          margin-top: 15px;
          cursor: pointer;
          img {
            width: 37px;
            height: 42px;
            margin-bottom: 10px;
          }
          .nm {
            width: 70px;
            height: 40px;
            font-size: 14px;
            font-weight: 400;
            text-align: center;
            color: #ffffff;
            line-height: 20px;
            text-overflow: -o-ellipsis-lastline;
            overflow: hidden;
            text-overflow: ellipsis;
            display: -webkit-box;
            -webkit-line-clamp: 2;
            -webkit-box-orient: vertical;
            &:hover {
              color: #0088ff;
            }
          }
        }
        .wenshu {
          width: 683px !important;
          height: 850px !important;
          margin-top: -425px !important;
          margin-left: -342.5px !important;
          background: url("../../images/flws.png") no-repeat !important;
          background-size: 100% 100% !important;
          #iframe {
            width: 513px;
            height: 753px;
            iframe {
              width: 100%;
              height: 680px;
            }
          }
        }
        .video_img {
          .video-src {
            object-fit: fill;
            height: 64px;
            width: 109px;
          }
        }
      }
      .list22 {
        padding-left: 0;
        padding-right: 0;
        margin-bottom: 20px;
        height: 210px;
        .item2 {
          width: 30.33%;
          margin-top: 8px;
          // flex: 1;
          cursor: pointer;
          & + .item2 {
            margin-left: 3%;
          }
          .img {
            width: 100%;
            height: 65px;
            position: relative;
            img {
              width: 100%;
              height: 100%;
              display: block;
            }
            .zzc {
              position: absolute;
              top: 0;
              left: 0;
              width: 100%;
              height: 100%;
              background-color: rgba(0, 0, 0, 0.55);
            }
            img.anbutton {
              width: 28px;
              height: 28px;
              position: absolute;
              top: 50%;
              left: 50%;
              margin-left: -14.5px;
              margin-top: -14.5px;
            }
          }
        }
        .viodebox {
          .videoList {
            width: 783px;
            height: 689px;
            margin-left: -391.5px;
            margin-top: -340px;
            background: url("../../images/video.png") no-repeat;
            background-size: 100% 100%;
            .video-src {
              object-fit: fill;
              width: 97%;
              height: 82%;
            }
          }
        }

        .title {
          font-size: 16px;
          font-family: "Source Han Sans CN";
          font-weight: 400;
          color: #ffffff;
          line-height: 24px;
          margin-top: 10px;
          width: 96%;
          overflow: hidden;
          white-space: nowrap; // 溢出不换行
          text-overflow: ellipsis;
          display: -webkit-box; // 将对象作为弹性伸缩盒子模型显示
          -webkit-line-clamp: 1; // 将对象作为弹性伸缩盒子模型显示。
          -webkit-box-orient: vertical; // 从上到下垂直排列子元素（设置伸缩盒子的子元素排列方式）
        }
      }

      .list3 {
        width: 376px;
        height: 180px;
        margin: 10px 0;
        overflow: hidden;
        .item3 {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-top: 20px;
          cursor: pointer;
          .leftbox {
            width: 260px;
            // height: 20px;
            font-size: 16px;
            font-weight: 400;
            color: #ffffff;
            line-height: 20px;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
          }
          .rightbox {
            width: 91px;
            height: 15px;
            font-size: 14px;
            font-weight: 400;
            color: #ffffff;
            line-height: 15px;
            opacity: 0.4;
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
        font-family: "Source Han Sans CN";
        .detailsList {
          width: 783px;
          height: 756px;
          position: absolute;
          left: 50%;
          top: 50%;
          margin-left: -391.5px;
          margin-top: -340px;
          background: url("../../images/fl.png") no-repeat;
          background-size: 100% 100%;
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
            margin-bottom: 30px;
          }
          .ft {
            font-size: 22px;
            color: #fff;
            line-height: 30px;
            margin-bottom: 15px;
          }
          .fl3 {
            display: flex;
            justify-content: space-between;
            border-bottom: 1px solid rgba(255, 255, 255, 0.1);
            padding-bottom: 10px;
            margin-bottom: 10px;
            .autor {
              font-size: 18px;
              color: #fff;
              .ftime3 {
                font-size: 14px;
                color: rgba(255, 255, 255, 0.4);
                margin-top: 8px;
              }
            }
            .ftime1 {
              color: #fff;
              font-size: 14px;
              cursor: pointer;
              .ic2 {
                margin-top: 6px;
              }
            }
          }
          .flBottom {
            font-size: 16px;
            color: #fff;
            line-height: 26px;
            height: 494px;
            overflow-y: scroll;
            &::-webkit-scrollbar {
              display: none;
            }
            .fb2 {
              margin: 16px 0;
            }
            .fbimg {
              height: 341px;
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