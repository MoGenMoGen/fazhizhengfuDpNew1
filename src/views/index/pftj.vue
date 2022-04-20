<template>
  <div id="page_pftj" :style="{ transform: `scale(${percentX},${percentY})` }">
    <MyHeader cur="1"></MyHeader>

    <div class="container">
      <div class="left">
        <div class="titlebox">
          <img src="~@/images/subtitle.png" alt="" />
          <div class="title">法律服务</div>
        </div>
        <div class="servicebox">
          <div class="itembox" @click="chooseTab1(0)">
            <img class="icon" src="~@/images/fzdt.png" alt="" />
            <div class="rightbox">
              <div class="line1">法治动态</div>
              <div class="line2">15<span>条</span></div>
            </div>
            <img
              src="~@/images/upArrow.png"
              alt=""
              class="select"
              v-show="currentIndex1 == 0"
            />
          </div>
          <div class="itembox" @click="chooseTab1(1)">
            <img class="icon" src="~@/images/flzx.png" alt="" />
            <div class="rightbox">
              <div class="line1">法律咨询</div>
              <div class="line2">25<span>条</span></div>
            </div>
            <img
              src="~@/images/upArrow.png"
              alt=""
              class="select"
              v-show="currentIndex1 == 1"
            />
          </div>
        </div>
        <vue-seamless-scroll
          :data="list1"
          class="list1"
          :class-option="defaultOption"
        >
          <div class="item1" v-for="(item, index) in list1" :key="index">
            <img class="cover" :src="item.pic" alt="" />
            <div class="rightbox">
              <div class="topbox">{{ item.content }}</div>
              <div class="bottombox">
                <div class="leftcontent">
                  <img src="~@/images/browse.png" alt="" />
                  {{ item.num }}
                </div>
                <div class="rightcontent">{{ item.date }}</div>
              </div>
            </div>
          </div>
        </vue-seamless-scroll>
        <div class="titlebox">
          <img src="~@/images/subtitle.png" alt="" />
          <div class="title">法治乡村</div>
        </div>
        <div class="fzxcbox">
          <div class="itembox" @click="chooseTab21(0)">
            <div class="num">6</div>
            <div class="content">示范村社</div>
            <img
              src="~@/images/upArrow.png"
              alt=""
              class="select"
              v-show="currentIndex21 == 0"
            />
          </div>
          <div class="itembox" @click="chooseTab21(1)">
            <div class="num">12</div>
            <div class="content">法治阵地</div>
            <img
              src="~@/images/upArrow.png"
              alt=""
              class="select"
              v-show="currentIndex21 == 1"
            />
          </div>
        </div>
        <div class="rural_list">
          <div
            class="itembox"
            v-for="(item, index) in list2"
            :key="index"
            @click="chooseTab22(index)"
          >
            <div
              class="content"
              :class="{ active_content: currentIndex22 == index }"
            >
              <div
                class="icon"
                :class="{ active_icon: currentIndex22 == index }"
              >
                <img
                  v-if="currentIndex22 != index"
                  src="~@/images/badge1.png"
                  alt=""
                />
                <img v-else src="~@/images/badge2.png" alt="" />
              </div>
              <div
                class="text"
                :class="{ active_text: currentIndex22 == index }"
              >
                {{ item.content }}
              </div>
            </div>
          </div>
        </div>
      </div>
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
          <!-- 地图点击五星 -->
          <div class="xct">
            <div class="popover" v-for="(item,index) in wxList" :key="index"
            @click="handleVill(index)"
            :style="{left:item.left,top:item.top}"
            >
              <img src="../../images/wxing.png" alt="" />
            </div>
            <div class="carousel" v-show="village">
              <div class="carousel2">
                <h2>汶溪村</h2>
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
          </div>
          <!-- 地图凸起 -->
          <!-- 汶溪村 -->
          <div class="wxc" v-show="choose==0">
            <img src="~@/images/map/wx.png" alt="" class="wxmap">
            <div class="mapicon">
              汶溪村
            </div>
          </div>
          <!-- 田顾村 -->
          <div class="wxc left1" v-show="choose==1">
            <img src="~@/images/map/tg.png" alt="" class=" wxmap">
            <div class="mapicon">
              田顾村
            </div>
          </div>
          <!-- 河头村 -->
          <div class="wxc left2" v-show="choose==2">
            <img src="~@/images/map/ht.png" alt="" class=" wxmap">
            <div class="mapicon">
              河头村
            </div>
          </div>
           <!-- 长石村 -->
          <div class="wxc left3" v-show="choose==3">
            <img src="~@/images/map/cs.png" alt="" class=" wxmap">
            <div class="mapicon">
              长石村
            </div>
          </div>
          <!-- 九龙湖村 -->
          <div class="wxc left4" v-show="choose==4">
            <img src="~@/images/map/jlh.png" alt="" class=" wxmap">
            <div class="mapicon">
              九龙湖村
            </div>
          </div>
           <!-- 长石村 -->
          <div class="wxc left3" v-show="choose==5">
            <img src="~@/images/map/cs.png" alt="" class=" wxmap">
            <div class="mapicon">
              思源社区
            </div>
          </div>
          <!-- 杜夹岙村 -->
          <div class="wxc left5" v-show="choose==6">
            <img src="~@/images/map/sj.png" alt="" class=" wxmap">
            <div class="mapicon">
              杜夹岙村
            </div>
          </div>
           <!-- 田杨陈村 -->
          <div class="wxc left6" v-show="choose==7">
            <img src="~@/images/map/tyc.png" alt="" class=" wxmap">
            <div class="mapicon">
              田杨陈村
            </div>
          </div>
          <!-- 西河村 -->
          <div class="wxc left7" v-show="choose==8">
            <img src="~@/images/map/sh.png" alt="" class=" wxmap">
            <div class="mapicon">
              西河村
            </div>
          </div>
          <!-- 西经堂村 -->
          <div class="wxc left8" v-show="choose==9">
            <img src="~@/images/map/xjt.png" alt="" class=" wxmap">
            <div class="mapicon">
              西经堂村
            </div>
          </div>
           <!-- 长宏村 -->
          <div class="wxc left9" v-show="choose==10">
            <img src="~@/images/map/ch.png" alt="" class=" wxmap">
            <div class="mapicon">
              长宏村
            </div>
          </div>
           <!-- 中心村 -->
          <div class="wxc left10" v-show="choose==11">
            <img src="~@/images/map/zx.png" alt="" class=" wxmap">
            <div class="mapicon">
              中心村
            </div>
          </div>

        </div>
      </div>
      <div class="right">
        <div class="titlebox">
          <img src="~@/images/subtitle.png" alt="" />
          <div class="title">共享法庭</div>
        </div>
        <div class="subtitle">河头村民事纠纷案</div>
        <div class="ftbox">
          <div class="leftbox">
            <div class="fg">法官：摩根</div>
            <img
              src="https://s.cn.bing.net/th?id=OIP-C.Jj3IR8UTuF55Zv9EL9IKWwHaFh&w=289&h=215&c=8&rs=1&qlt=90&o=6&pid=3.1&rm=2"
              alt=""
            />
          </div>
          <div class="rightbox">
            <div class="people">
              <div class="bg">被告：姚峰</div>
              <div class="bg">原告:张昕</div>
            </div>
            <img
              src="https://tse2-mm.cn.bing.net/th/id/OIP-C.xDrJBt3iAwa7pY-SgmK5pQHaE7?w=281&h=187&c=7&r=0&o=5&pid=1.7"
              alt=""
            />
          </div>
        </div>
        <div class="titlebox">
          <img src="~@/images/subtitle.png" alt="" />
          <div class="title">法律宝典</div>
        </div>
        <div class="flbd_box">
          <div class="itembox" @click="chooseTab3(0)">
            <div class="title">法律文书</div>
            <div class="num">45</div>
            <div class="data">
              <img src="~@/images/download.png" alt="" />
              <div class="val">45</div>
            </div>
            <img
              src="~@/images/upArrow.png"
              class="select"
              alt=""
              v-show="currentIndex3 == 0"
            />
          </div>
          <div class="itembox" @click="chooseTab3(1)">
            <div class="title">法律故事</div>
            <div class="num">35</div>
            <div class="data">
              <img src="~@/images/browse.png" alt="" />
              <div class="val">45</div>
            </div>
            <img
              src="~@/images/upArrow.png"
              class="select"
              alt=""
              v-show="currentIndex3 == 1"
            />
          </div>
          <div class="itembox" @click="chooseTab3(2)">
            <div class="title">普法宣传</div>
            <div class="num">15</div>
            <div class="data">
              <img src="~@/images/browse.png" alt="" />
              <div class="val">45</div>
            </div>
            <img
              src="~@/images/upArrow.png"
              class="select"
              alt=""
              v-show="currentIndex3 == 2"
            />
          </div>
        </div>
        <div class="list3">
          <div class="itembox" v-for="(item, index) in list3" :key="index">
            <img src="~@/images/wenshu.png" alt="" />
            <div class="nm">{{ item.nm }}</div>
          </div>
        </div>
        <div class="titlebox">
          <img src="~@/images/subtitle.png" alt="" />
          <div class="title">法治队伍</div>
        </div>
        <div class="fzdw_box">
          <div class="itembox" @click="chooseTab4(0)">
            <div class="title">法治带头人</div>
            <div class="num">15</div>
            <img
              src="~@/images/upArrow.png"
              class="select"
              alt=""
              v-show="currentIndex4 == 0"
            />
          </div>
          <div class="itembox" @click="chooseTab4(1)">
            <div class="title">法律明白人</div>
            <div class="num">65</div>
            <img
              src="~@/images/upArrow.png"
              class="select"
              alt=""
              v-show="currentIndex4 == 1"
            />
          </div>
          <div class="itembox" @click="chooseTab4(2)">
            <div class="title">片区民警</div>
            <div class="num">55</div>
            <img
              src="~@/images/upArrow.png"
              class="select"
              alt=""
              v-show="currentIndex4 == 2"
            />
          </div>
          <div class="itembox" @click="chooseTab4(3)">
            <div class="title">律师</div>
            <div class="num">34</div>
            <img
              src="~@/images/upArrow.png"
              class="select"
              alt=""
              v-show="currentIndex4 == 3"
            />
          </div>
        </div>
        <!-- 表格列 -->
        <div class="table">
          <div class="top">
            <div style="width: 77px">村、社区</div>
            <div style="width: 110px;">姓名</div>
            <div style="width: 72px">职务</div>
            <div style="width: 109px">手机</div>
          </div>
          <div class="bottom">
            <vue-seamless-scroll :data="list4" :class-option="defaultOption">
              <div class="blist" v-for="(item, index) in list4" :key="index">
                <div class="row" style="width: 77px">{{ item.val1 }}</div>
                <div class="row" style="width: 110px;">
                  {{ item.val2 }}
                </div>
                <div class="row" style="width: 72px">{{ item.val3 }}</div>
                <div class="row" style="width: 109px">
                  {{ item.val4 }}
                </div>
              </div>
            </vue-seamless-scroll>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import MyHeader from "../../components/MyHeader";
export default {
  data() {
    return {
      // percentX: 1, //缩放比列
      // percentY: 1, //缩放比列
      currentIndex1: 0, //法律服务下标
      choose:-1,
      //法律服务列表
      list1: [
        {
          pic: "https://tse3-mm.cn.bing.net/th/id/OIP-C.xMJSb4rjACfDQgOX_wliAwHaHa?w=195&h=196&c=7&r=0&o=5&pid=1.7",
          content:
            "法治动态法治动态法治动态法治态法治动态法治动态法治动态法治动态法治态法治动态法治动态法治动态法治动态法治态法治动态",
          num: 1540,
          date: "2021.02.05",
        },
        {
          pic: "https://tse3-mm.cn.bing.net/th/id/OIP-C.xMJSb4rjACfDQgOX_wliAwHaHa?w=195&h=196&c=7&r=0&o=5&pid=1.7",
          content: "法治动态法治动态法治动态法治态法治动态",
          num: 1540,
          date: "2021.02.05",
        },
        {
          pic: "https://tse3-mm.cn.bing.net/th/id/OIP-C.xMJSb4rjACfDQgOX_wliAwHaHa?w=195&h=196&c=7&r=0&o=5&pid=1.7",
          content: "法治动态法治动态法治动态法治态法治动态",
          num: 1540,
          date: "2021.02.05",
        },
        {
          pic: "https://tse3-mm.cn.bing.net/th/id/OIP-C.xMJSb4rjACfDQgOX_wliAwHaHa?w=195&h=196&c=7&r=0&o=5&pid=1.7",
          content: "法治动态法治动态法治动态法治态法治动态",
          num: 1540,
          date: "2021.02.05",
        },
      ],
      currentIndex21: 0, //法治乡村标题下标
      currentIndex22: 0, //法治乡村内容下标
      // 法治乡村列表
      list2: [
        { content: "汶溪村" },
        { content: "田顾村" },
        { content: "河头村" },
        { content: "长石村" },
        { content: "九龙湖村" },
        { content: "思源社区" },
      ],
      currentIndex3: 0, //法律宝典下标
      list3: [
        { nm: "民间借贷起诉状" },
        { nm: "借条" },
        { nm: "追索劳动报酬仲裁申多好多好东方红" },
        { nm: "借条" },
        { nm: "借条" },
        { nm: "借条" },
        { nm: "民间借贷起诉状" },
        { nm: "民间借贷起诉状" },
        { nm: "借条" },
        { nm: "追索劳动报酬仲裁申多好多好东方红" },
        { nm: "借条" },
        { nm: "借条" },
        { nm: "借条" },
        { nm: "民间借贷起诉状" },
      ],
      currentIndex4: 0, //法治队伍下标
      // 法治队伍列表
      list4: [
        {
          val1: "龙源社区",
          val2: "王  柯",
          val3: "法律顾问",
          val4: "13858269256",
        },
        {
          val1: "龙源社区",
          val2: "王  柯",
          val3: "法律顾问",
          val4: "13858269256",
        },
        {
          val1: "龙源社区",
          val2: "王  柯",
          val3: "法律顾问",
          val4: "13858269256",
        },
        {
          val1: "龙源社区",
          val2: "王  柯",
          val3: "法律顾问",
          val4: "13858269256",
        },
      ],
      // 地图五星图标
      village: false,
      wxList: [
        {left: "371px", top: "487px",},
        {left: "427px", top: "498px",},
        {left: "561px", top: "393px",},
        {left: "647px", top: "501px",},
        {left: "664px", top: "628px",},
        {left: "749px", top: "627px",},
        {left: "712.5px", top: "699.5px"},
        {left: "815px", top: "468px"},
        {left: "728px", top: "310px"},
        {left: "663px", top: "266px"},
        {left: "747px", top: "243px"},
        {left: "822px", top: "183px"},
        {left: "878px", top: "197px"},
        {left: "890px", top: "237px"},
        {left: "901px", top: "349px"},
      ],
    };
  },
  components: { MyHeader },
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
    // 左侧-法律服务
    chooseTab1(index) {
      this.currentIndex1 = index;
    },
    // 左侧-法治乡村
    chooseTab21(index) {
      this.currentIndex21 = index;
    },
    // 左侧-村庄选择
    chooseTab22(index) {
      this.currentIndex22 = index;
      this.choose=index;
      console.log(this.choose)
    },
    // 右侧-法律宝典
    chooseTab3(index) {
      this.currentIndex3 = index;
    },
    // 右侧-法治宝典
    chooseTab4(index) {
      this.currentIndex4 = index;
    },
    // 地图星轮播详情
    handleVill() {
      this.village = true;
    },
    handleClose() {
      this.village = false;
    },
  },
  created() {
    window.onresize = () => {
      // console.log("onresize");
      // let x = document.body.clientWidth || document.documentElement.clientWidth;
      // let y =
      //   document.body.clientHeight || document.documentElement.clientHeight;
      // this.percentX = x / 1920;
      // this.percentY = y / 1080;
      // console.log(x, this.percentX);
    };
  },
};
</script>

<style lang="less" scoped>
@import "../../assets/css/font/font.css";
#page_pftj {
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
    .left {
      width: 442px;
      display: flex;
      flex-direction: column;
      align-items: center;

      .servicebox {
        margin-top: 25px;
        // width: 313px;
        width: 362px;
        padding-bottom: 25px;
        display: flex;
        justify-content: space-between;
        border-bottom: 1px solid #0088ff;
        .itembox {
          width: 100%;
          display: flex;
          align-items: center;
          position: relative;
          cursor: pointer;
          .icon {
            width: 51px;
            height: 51px;
            margin-right: 14px;
          }
          .rightbox {
            .line1 {
              font-size: 14px;
              font-weight: 400;
              color: #ffffff;
              line-height: 25px;
            }
            .line2 {
              font-size: 36px;
              font-family: Agency FB;
              font-weight: bold;
              color: #ffc650;
              line-height: 43px;
              span {
                font-size: 14px;
                font-weight: 400;
                color: #ffffff;
                line-height: 25px;
              }
            }
          }
          .select {
            position: absolute;
            bottom: -25px;
            left: 16px;
          }
        }
      }
      .list1 {
        // width: 313px;
        width: 362px;
        height: 330px;
        margin: 20px 0 40px;
        overflow: hidden;
        .item1 {
          margin-bottom: 20px;
          display: flex;
          .cover {
            width: 95px;
            height: 95px;
            object-fit: cover;
          }
          .rightbox {
            padding: 0px 12px;
            width: 270px;
            height: 95px;
            box-sizing: border-box;
            position: relative;
            .topbox {
              height: 70px;
              font-size: 16px;
              font-weight: 400;
              color: #ffffff;
              line-height: 24px;
              text-overflow: -o-ellipsis-lastline;
              overflow: hidden;
              text-overflow: ellipsis;
              display: -webkit-box;
              -webkit-line-clamp: 3;
              -webkit-box-orient: vertical;
            }
            .bottombox {
              width: 100%;
              padding-right: 24px;
              box-sizing: border-box;
              display: flex;
              justify-content: space-between;
              align-items: center;
              position: absolute;
              bottom: 0;
              .leftcontent {
                img {
                  width: 17px;
                  height: 11px;
                  margin-right: 10px;
                }
                font-size: 14px;
                font-weight: 400;
                color: #ffffff;
                opacity: 0.4;
              }
              .rightcontent {
                font-size: 14px;
                font-weight: 400;
                color: #ffffff;
                opacity: 0.2;
              }
            }
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
            font-family: Agency FB;
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
      .rural_list {
        width: 313px;
        display: flex;
        flex-wrap: wrap;
        justify-content: space-between;
        .itembox {
          width: 140px;
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
         // 地图五星
        .xct {
          position: absolute;
          top: 0;
          width: 100%;
          height: 100%;
          .popover {
            display: block;
            position: absolute;
            left: 371px;
            top: 487px;
            z-index: 99;
            cursor: pointer;
            &:nth-child(7) {
              transform: rotate(350deg);
            }
          }
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
              height: 30px;
              border-radius: 50%;
              border: 1px solid #fff;
              background-color: none;
            }
          }
        }
        .wxc{
          position: absolute;
          left: 17px;
          top: 175px;
          // height: 482px;
          font-family: "Source Han Sans CN";
          .wxmap{
            height: 100%;
          }
          .mapicon{
            background: url("~@/images/map/icon1.png") no-repeat center center;
            height: 120px;
            width: 67px;
            position: absolute;
            top: 50%;
            left: 50%;
            margin-top: -60px;
            line-height: 80px;
            text-align: center;
            font-size: 14px;
            font-weight: 500;
            color: #EA0015;
            // margin-left: -33px;
            
          }
          &.left1{
            right: 168px;
            top: 251px;
            left: auto;
            .mapicon{margin-top: -100px;}
          }
          &.left2{
            right: 40px;
            top: 52px;
            left: auto;
            .mapicon{margin-left: -30px;}
          }
          &.left3{
            bottom: 19px;
            right: 173px;
            top: auto;
            left: auto;
          }
          &.left4{
            top: 24px;
            left: 195px;
          }
          &.left5{
            top: 274px;
            left: 425px;
          }
          &.left6{
            right: 24px;
            top: 283px;
            left: auto;
            .mapicon{margin-left: -16px;}
          }
          &.left7{
            top: 414px;
            left: 568px;
            .mapicon{margin-left: -30px;}
          }
          &.left8{
            top: 373px;
            left: 676px;
            .mapicon{margin-left: -30px;}
          }
           &.left9{
            top: 477px;
            left: 688px;
            .mapicon{margin-left: -30px;}
          }
           &.left10{
            top: 411px;
            left: 384px;
            .mapicon{margin-left: -30px;}
          }
        }
      }
    }
    .right {
      width: 442px;
      display: flex;
      flex-direction: column;
      align-items: center;
      .subtitle {
        font-size: 18px;
        font-weight: bold;
        color: #ffffff;
        line-height: 49px;
      }
      .ftbox {
        width: 364px;
        display: flex;
        justify-content: space-between;
        margin-bottom: 30px;
        .leftbox {
          width: 172px;
          .fg {
            text-align: center;
            font-size: 14px;
            font-weight: 400;
            color: #ffffff;
            line-height: 32px;
          }
          img {
            width: 172px;
            height: 102px;
            object-fit: cover;
          }
        }
        .rightbox {
          width: 172px;
          .people {
            padding: 0 4px;
            box-sizing: border-box;
            display: flex;
            justify-content: space-between;
            .bg {
              font-size: 14px;
              font-weight: 400;
              color: #ffffff;
              line-height: 32px;
            }
          }
          img {
            width: 172px;
            height: 102px;
            object-fit: cover;
          }
        }
      }
      .flbd_box {
        width: 361px;
        display: flex;
        justify-content: space-around;
        padding-bottom: 30px;
        border-bottom: 1px solid #0088ff;
        margin-top: 20px;
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
            font-family: Agency FB;
            font-weight: bold;
            color: #2efdfb;
            line-height: 70px;
          }
          .data {
            width: 72px;
            height: 33px;
            background: rgba(0, 48, 149, 0);
            border: 1px solid #ffffff;
            opacity: 0.4;
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
            bottom: -30px;
            left: 50%;
            transform: translateX(-50%);
          }
        }
      }
      .list3 {
        margin-bottom: 30px;
        width: 362px;
        height: 210px;
        overflow-y: scroll;
        overflow-x: hidden;
        padding: 5px 17px;
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
            margin-bottom: 15px;
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
      }
      .fzdw_box {
        width: 361px;
        display: flex;
        justify-content: space-around;
        padding-bottom: 15px;
        border-bottom: 1px solid #0088ff;
        margin-top: 30px;
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
            text-align: center;
            // margin-bottom: 25px;
          }
          .num {
            font-size: 26px;
            font-family: Agency FB;
            font-weight: bold;
            color: #2efdfb;
            line-height: 64px;
          }
          .select {
            position: absolute;
            bottom: -15px;
            left: 50%;
            transform: translateX(-50%);
          }
        }
      }
      .table {
        width: 372px;
        font-size: 12px;
        margin: 20px 0;
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
            &:nth-child(2n + 1) {
              background: rgba(255, 255, 255, 0.3);
            }
            &:nth-child(2n) {
              background: rgba(255, 255, 255, 0.2);
            }
            .row {
              font-size: 12px;
              font-weight: 400;
              color: #ffffff;
              line-height: 28px;
              text-align: center;
            }
          }
        }
      }
    }
  }
}
</style>