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
              src="https://video.ship88.cn/sv/5817a612-17da269cc9d/5817a612-17da269cc9d.mp4"
            ></video>
          </div>

          <div class="text">
            法治政府就是政府在行使权力履行职责过程中坚持法治原则，严格依法行政，政府的各项权力都在法治轨道上运行。
            要求各级人民政府从决策到执行及监督的整个过程都纳入法制化轨道，权利与责任紧密相联，集阳光政府，有限政府，诚信政府，责任政府于一身，并用法律加以固定即为法治政府。关键是要推进政府法制建设，建立健全政府行政的法律依据和督促政府依法行政的法律制度。
            要求政府全面推进依法行政，不断提高政府公信力和执行力，为保障经济又好又快发展和社会和谐稳定发挥更大的作用。
          </div>
        </div>
        <div class="titlebox">
          <img src="~@/images/subtitle.png" alt="" />
          <div class="title">法治队伍</div>
        </div>
        <div class="gsinfo">
          <div class="itembox">
            <div class="num">15</div>
            <img src="~@/images/fzdtr.png" alt="" />
            <div class="desc">法治带头人</div>
          </div>
          <div class="itembox">
            <div class="num">65</div>
            <img src="~@/images/flmbr.png" alt="" />
            <div class="desc">法律明白人</div>
          </div>
          <div class="itembox">
            <div class="num">38</div>
            <img src="~@/images/pqmj.png" alt="" />
            <div class="desc">片区民警</div>
          </div>
          <div class="itembox">
            <div class="num">2</div>
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
            <div class="num">6</div>
            <div class="content">示范村社</div>
            <img
              src="~@/images/upArrow.png"
              alt=""
              class="select"
              v-show="currentIndex11 == 0"
            />
          </div>
          <div class="itembox" @click="chooseTab11(1)">
            <div class="num">12</div>
            <div class="content">法治阵地</div>
            <img
              src="~@/images/upArrow.png"
              alt=""
              class="select"
              v-show="currentIndex11 == 1"
            />
          </div>
        </div>
        <div class="rural_list">
          <div
            class="itembox"
            v-for="(item, index) in list1"
            :key="index"
            @click="chooseTab12(index)"
          >
            <div
              class="content"
              :class="{ active_content: currentIndex12 == index }"
            >
              <div
                class="icon"
                :class="{ active_icon: currentIndex12 == index }"
              >
                <img
                  v-if="currentIndex12 != index"
                  src="~@/images/badge1.png"
                  alt=""
                />
                <img v-else src="~@/images/badge2.png" alt="" />
              </div>
              <div
                class="text"
                :class="{ active_text: currentIndex12 == index }"
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
          <!-- 汶溪村 -->
          <div class="wxc" v-show="choose == 0">
            <img src="~@/images/map/wx.png" alt="" class="wxmap" />
            <div class="mapicon">汶溪村</div>
          </div>
          <!-- 田顾村 -->
          <div class="wxc left1" v-show="choose == 1">
            <img src="~@/images/map/tg.png" alt="" class="wxmap" />
            <div class="mapicon">田顾村</div>
          </div>
          <!-- 河头村 -->
          <div class="wxc left2" v-show="choose == 2">
            <img src="~@/images/map/ht.png" alt="" class="wxmap" />
            <div class="mapicon">河头村</div>
          </div>
          <!-- 长石村 -->
          <div class="wxc left3" v-show="choose == 3">
            <img src="~@/images/map/cs.png" alt="" class="wxmap" />
            <div class="mapicon">长石村</div>
          </div>
          <!-- 九龙湖村 -->
          <div class="wxc left4" v-show="choose == 4">
            <img src="~@/images/map/jlh.png" alt="" class="wxmap" />
            <div class="mapicon">九龙湖村</div>
          </div>
          <!-- 长石村 -->
          <div class="wxc left3" v-show="choose == 5">
            <img src="~@/images/map/cs.png" alt="" class="wxmap" />
            <div class="mapicon">思源社区</div>
          </div>
          <!-- 杜夹岙村 -->
          <div class="wxc left5" v-show="choose == 6">
            <img src="~@/images/map/sj.png" alt="" class="wxmap" />
            <div class="mapicon">杜夹岙村</div>
          </div>
          <!-- 田杨陈村 -->
          <div class="wxc left6" v-show="choose == 7">
            <img src="~@/images/map/tyc.png" alt="" class="wxmap" />
            <div class="mapicon">田杨陈村</div>
          </div>
          <!-- 西河村 -->
          <div class="wxc left7" v-show="choose == 8">
            <img src="~@/images/map/sh.png" alt="" class="wxmap" />
            <div class="mapicon">西河村</div>
          </div>
          <!-- 西经堂村 -->
          <div class="wxc left8" v-show="choose == 9">
            <img src="~@/images/map/xjt.png" alt="" class="wxmap" />
            <div class="mapicon">西经堂村</div>
          </div>
          <!-- 长宏村 -->
          <div class="wxc left9" v-show="choose == 10">
            <img src="~@/images/map/ch.png" alt="" class="wxmap" />
            <div class="mapicon">长宏村</div>
          </div>
          <!-- 中心村 -->
          <div class="wxc left10" v-show="choose == 11">
            <img src="~@/images/map/zx.png" alt="" class="wxmap" />
            <div class="mapicon">中心村</div>
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
            <div class="num">45</div>
            <div class="data">
              <img src="~@/images/download.png" alt="" />
              <div class="val">45</div>
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
            <div class="num">35</div>
            <div class="data">
              <img src="~@/images/browse.png" alt="" />
              <div class="val">45</div>
            </div>
            <img
              src="~@/images/upArrow.png"
              class="select"
              alt=""
              v-show="currentIndex2 == 1"
            />
          </div>
        </div>
        <div class="list2">
          <div class="itembox" v-for="(item, index) in list2" :key="index">
            <img src="~@/images/wenshu.png" alt="" />
            <div class="nm">{{ item.nm }}</div>
          </div>
        </div>
        <div class="titlebox">
          <img src="~@/images/subtitle.png" alt="" />
          <div class="title">重点人员</div>
        </div>
        <div class="gsinfo">
          <div class="itembox">
            <div class="num">15</div>
            <img src="~@/images/xdry.png" alt="" />
            <div class="desc">吸毒人员</div>
          </div>
          <div class="itembox">
            <div class="num">65</div>
            <img src="~@/images/jzdx.png" alt="" />
            <div class="desc">矫正对象</div>
          </div>
          <div class="itembox">
            <div class="num">38</div>
            <img src="~@/images/xsjj.png" alt="" />
            <div class="desc">刑释解矫人员</div>
          </div>
          <div class="itembox">
            <div class="num">2</div>
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
            <div class="num">15</div>
            <div class="content">已回复</div>
            <img
              src="~@/images/upArrow.png"
              alt=""
              class="select"
              v-show="currentIndex3 == 0"
            />
          </div>
          <div class="itembox" @click="chooseTab3(1)">
            <div class="num">12</div>
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
          <div class="item3" v-for="(item, index) in list3" :key="index">
            <div class="leftbox">{{ item.content }}</div>
            <div class="rightbox">{{ item.date }}</div>
          </div>
        </vue-seamless-scroll>
      </div>
    </div>
  </div>
</template>

<script>
import MyHeader from "../../components/MyHeader";
export default {
  data() {
    return {
      currentIndex11: 0, //法治乡村标题下标
      currentIndex12: 0, //法治乡村内容下标
      choose:0,
      // 法治乡村列表
      list1: [
        { content: "汶溪村" },
        { content: "田顾村" },
        { content: "河头村" },
        { content: "长石村" },
        { content: "九龙湖村" },
        { content: "思源社区" },
      ],
      currentIndex2: 0, //法律宝典下标
      // 法律宝典列表
      list2: [
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
      currentIndex3: 0, //法律咨询下标
      // 法律咨询列表
      list3: [
        {
          content:
            "九龙湖法律解答九龙湖法律解答九见识到了规划见识到了感觉哦十几个",
          date: "2021.02.03",
        },
        {
          content:
            "九龙湖法律解答九龙湖法律解答九见识到了规划见识到了感觉哦十几个",
          date: "2021.02.03",
        },
        {
          content:
            "九龙湖法律解答九龙湖法律解答九见识到了规划见识到了感觉哦十几个",
          date: "2021.02.03",
        },
        {
          content:
            "九龙湖法律解答九龙湖法律解答九见识到了规划见识到了感觉哦十几个",
          date: "2021.02.03",
        },
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
    // 左侧-法治乡村
    chooseTab11(index) {
      this.currentIndex11 = index;
    },
    // 左侧-村庄选择
    chooseTab12(index) {
      this.currentIndex12 = index;
      this.choose = index;
    },
    // 右侧-法律宝典
    chooseTab2(index) {
      this.currentIndex2 = index;
    },
    // 右侧-法律咨询
    chooseTab3(index) {
      this.currentIndex3 = index;
    },
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
      margin-bottom: 40px;
      display: flex;
      justify-content: space-between;
      .itembox {
        display: flex;
        flex-direction: column;
        align-items: center;
        .num {
          font-size: 36px;
          font-family:" Agency FB";
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
        height: 168px;
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
        margin-top: 30px;
        margin-bottom: 40px;
        .intro_video {
          width: 180px;
          height: 180px;
        }
        .text {
          overflow: hidden scroll;
          width: 176px;
          height: 166px;
          font-size: 16px;
          font-weight: 400;
          color: #ffffff;
          line-height: 30px;
          &::-webkit-scrollbar {
            display: none;
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
            margin-top: -60px;
            line-height: 80px;
            text-align: center;
            font-size: 14px;
            font-weight: 500;
            color: #ea0015;
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
            font-family: "Agency FB";
            font-weight: bold;
            color: #2efdfb;
            line-height: 60px;
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
      .list2 {
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
          .leftbox {
            width: 280px;
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
            width: 71px;
            height: 15px;
            font-size: 14px;
            font-weight: 400;
            color: #ffffff;
            line-height: 15px;
            opacity: 0.4;
          }
        }
      }
    }
  }
}
</style>