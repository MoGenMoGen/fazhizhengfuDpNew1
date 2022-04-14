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
          <div class="itembox" @click="chooseTab2(0)">
            <div class="num">6</div>
            <div class="content">示范村社</div>
            <img
              src="~@/images/upArrow.png"
              alt=""
              class="select"
              v-show="currentIndex21 == 0"
            />
          </div>
          <div class="itembox" @click="chooseTab2(1)">
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
        </div>
      </div>
      <div class="right"></div>
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
    };
  },
  components:{MyHeader},
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
      get(){
         let y =
        document.body.clientHeight || document.documentElement.clientHeight;
      return y / 1080;
      },
      set(){}
     
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
    },
    topage() {
      window.location.href = "/pftj";
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
    padding-top: 119px;
    box-sizing: border-box;
    min-height: 100%;
    padding-bottom: 50px;
    display: flex;
    justify-content: space-between;
    .left {
      width: 442px;
      display: flex;
      flex-direction: column;
      align-items: center;
      .titlebox {
        width: 313px;
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
        }
      }
      .servicebox {
        margin-top: 25px;
        width: 313px;
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
        width: 313px;
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
            width: 223px;
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
        width: 313px;
        border-bottom: 1px solid #0088ff;
        .itembox {
          width: 50%;
          height: 193px;
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
            bottom: 30px;
            left: 50%;
            transform: translateX(-50%);
          }
          .select {
            position: absolute;
            bottom: 0px;
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
    .right {
      width: 442px;
      background: red;
    }
  }
}
</style>