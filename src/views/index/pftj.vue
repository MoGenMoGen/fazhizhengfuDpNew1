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
              <div class="line2">{{ info1.dynamicTotal }}<span>条</span></div>
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
              <div class="line2">
                {{ info1.replied + info1.Unanswered }}<span>条</span>
              </div>
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
          :data="list11"
          class="list11"
          :class-option="flzxOption"
          v-if="currentIndex1 == 0"
        >
          <div
            class="item11"
            @click="getFzdtDtl(item.id)"
            v-for="(item, index) in list11"
            :key="index"
          >
            <img class="cover" :src="item.banner" alt="" />
            <div class="rightbox">
              <div class="topbox">{{ item.title }}</div>
              <div class="bottombox">
                <div class="leftcontent">
                  <img src="~@/images/browse.png" alt="" />
                  {{ item.pv }}
                </div>
                <div class="rightcontent">
                  {{ item.updateTime ? item.updateTime.slice(0, 10) : "" }}
                </div>
              </div>
            </div>
          </div>
        </vue-seamless-scroll>
        <!-- 法制动态弹窗详情 -->
        <div class="details" v-show="isShow1">
          <div
            class="detailsList"
            :style="{
              height: '735px',
              background: 'url(' + require('../../images/tc2.png') + ')',
            }"
          >
            <h2>法制动态详情</h2>
            <div class="flxq">
              <div class="ft">
                {{ info2.title }}
              </div>
              <div class="fl3">
                <div class="autor">
                  <!-- <div>发起人：{{ info2.author }}</div> -->
                  <div class="ftime3">
                    {{ info2.updateTime ? info2.updateTime.slice(0, 10) : "" }}
                  </div>
                </div>
                <div class="ftime1">
                  <img src="~@/images/browse.png" alt="" />
                  <div class="ic2">1550</div>
                </div>
              </div>
              <div class="flBottom" v-html="info2.details">
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
            <div class="close" @click="handleClose(0)">
              <img src="../../images/close1.png" alt="" />
            </div>
          </div>
        </div>
        <vue-seamless-scroll
          :data="list12"
          class="list12"
          :class-option="flzxOption"
          v-if="currentIndex1 == 1"
        >
          <div class="item12" v-for="(item, index) in list12" :key="index">
            <div class="ft">{{ item.title }}</div>
            <div class="fl3">
              <div class="autor">
                <div>发起人：{{ item.author }}</div>
                <div class="ftime3">
                  {{ item.updateTime ? item.updateTime.slice(0, 10) : "" }}
                </div>
              </div>
              <div class="ftime1">
                <img src="../../images/aixin.png" alt="" />
                <div class="ic2">155</div>
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
            <div class="num">{{ info3.demonstration }}</div>
            <div class="content">示范村社</div>
            <img
              src="~@/images/upArrow.png"
              alt=""
              class="select"
              v-show="currentIndex21 == 0"
            />
          </div>
          <div class="itembox" @click="chooseTab21(1)">
            <div class="num">{{ info3.position }}</div>
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
              :style="{ left: item.position.split(',')[0], top: item.position.split(',')[1] }"
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
          <div class="title">共享法庭</div>
        </div>
        <div class="subtitle">{{ info4.title }}</div>
        <div class="ftbox">
          <div class="leftbox">
            <div class="fg">法官：{{ info4.judge }}</div>
            <img :src="info4.img1" alt="" />
          </div>
          <div class="rightbox">
            <div class="people">
              <div class="bg">被告：{{ info4.defendant }}</div>
              <div class="bg">原告：{{ info4.plaintiff }}</div>
            </div>
            <img :src="info4.img2" alt="" />
          </div>
        </div>
        <div class="titlebox">
          <img src="~@/images/subtitle.png" alt="" />
          <div class="title">法律宝典</div>
        </div>
        <div class="flbd_box">
          <div class="itembox" @click="chooseTab3(0)">
            <div class="title">法律文书</div>
            <div class="num">{{ info5.paperwork }}</div>
            <div class="data">
              <img src="~@/images/download.png" alt="" />
              <div class="val">50</div>
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
            <div class="num">{{ info5.story }}</div>
            <div class="data">
              <img src="~@/images/browse.png" alt="" />
              <div class="val">65</div>
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
            <div class="num">{{ info5.publicity }}</div>
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
        <!-- 法律文书列表 -->
        <div class="list3" v-show="currentIndex3 == 0">
          <div
            class="itembox"
            v-for="(item, index) in list31"
            :key="index"
            @click="hanldeClickf(item)"
          >
            <img src="~@/images/wenshu.png" alt="" />
            <div class="nm">{{ item.nm }}</div>
            <!-- 法律文书详情 -->
            <div class="details" v-show="fws && list21.length > 0">
              <div class="detailsList wenshu">
                <h2>法律文书详情</h2>
                <!-- pdf文件 -->
                <div id="iframe">
                  <div class="pdf">
                    <!--使用ifram 显示 pdf文件 获取文件地址 -->
                    <iframe
                      style="width: 100%; height: 680px"
                      :src="item.url"
                    ></iframe>
                  </div>
                </div>
                <div class="close" @click="handleClose(0)">
                  <img src="../../images/close1.png" alt="" />
                </div>
              </div>
            </div>
          </div>
        </div>
        <!-- 法律故事、普法宣传列表 -->
        <div
          class="list3 list32"
          v-show="currentIndex3 == 1 || currentIndex3 == 2"
        >
          <div
            class="itembox item2"
            v-for="(item, index) in list32"
            :key="index"
            @click="bofang(item.id)"
          >
            <div class="img"><img src="~@/images/fzgs.png" alt="" /></div>
            <div class="title">{{ item.name }}</div>
            <!-- 法律故事视频详情 -->
            <div class="details viodebox" v-if="isVideo && list32.length > 0">
              <div class="detailsList videoList">
                <h2 v-if="currentIndex3 == 1">法律故事详情</h2>
                <h2 v-if="currentIndex3 == 2">普法宣传详情</h2>
                <video
                  width="100%"
                  controls
                  loop
                  id="videoplay"
                  class="video-src"
                  ref="gsDtlVideo"
                  :src="item.url"
                ></video>
                <div class="close" @click.stop="handleClose(index)">
                  <img src="../../images/close1.png" alt="" />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="titlebox">
          <img src="~@/images/subtitle.png" alt="" />
          <div class="title">法治队伍</div>
        </div>
        <div class="fzdw_box">
          <div class="itembox" @click="chooseTab4(0)">
            <div class="title">法治带头人</div>
            <div class="num">{{ info6.leader }}</div>
            <img
              src="~@/images/upArrow.png"
              class="select"
              alt=""
              v-show="currentIndex4 == 0"
            />
          </div>
          <div class="itembox" @click="chooseTab4(1)">
            <div class="title">法律明白人</div>
            <div class="num">{{ info6.person }}</div>
            <img
              src="~@/images/upArrow.png"
              class="select"
              alt=""
              v-show="currentIndex4 == 1"
            />
          </div>
          <div class="itembox" @click="chooseTab4(2)">
            <div class="title">片区民警</div>
            <div class="num">{{ info6.police }}</div>
            <img
              src="~@/images/upArrow.png"
              class="select"
              alt=""
              v-show="currentIndex4 == 2"
            />
          </div>
          <div class="itembox" @click="chooseTab4(3)">
            <div class="title">律师</div>
            <div class="num">{{ info6.lawyer }}</div>
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
          <div class="top" v-if="currentIndex4 == 0 || currentIndex4 == 1">
            <div style="width: 77px">村、社区</div>
            <div style="width: 110px">姓名</div>
            <div style="width: 72px">职务</div>
            <div style="width: 109px">手机</div>
          </div>
          <div class="top" v-else-if="currentIndex4 == 2">
            <div style="width: 110px">姓名</div>
            <div style="width: 109px">手机</div>
            <div style="width: 109px">部门</div>
            <div style="width: 109px">职务</div>
          </div>
          <div class="top" v-else-if="currentIndex4 == 3">
            <div style="width: 88px">姓名</div>
            <div style="width: 60px">性别</div>
            <div style="width: 109px">学历</div>
            <div style="width: 109px">手机</div>
          </div>
          <div class="bottom">
            <vue-seamless-scroll :data="list4" :class-option="defaultOption">
              <div class="blist" v-for="(item, index) in list4" :key="index">
                <div
                  class="blistbox"
                  v-if="currentIndex4 == 1 || currentIndex4 == 0"
                >
                  <div class="row" style="width: 77px">
                    {{ item.villageName }}
                  </div>
                  <div class="row" style="width: 110px">
                    {{ item.name }}
                  </div>
                  <div class="row" style="width: 72px">
                    {{ item.job }}
                  </div>
                  <div class="row" style="width: 109px">
                    {{ item.phone }}
                  </div>
                </div>

                <div
                  class="blistbox"
                  v-else-if="currentIndex4 == 2"
                  @click="handleMjdDetail(item.id)"
                >
                  <div class="row" style="width: 110px">
                    {{ item.name }}
                  </div>
                  <div class="row" style="width: 109px">
                    {{ item.phone }}
                  </div>
                  <div class="row" style="width: 109px">
                    {{ item.department }}
                  </div>
                  <div class="row" style="width: 109px">
                    {{ item.job }}
                  </div>
                </div>
                <div class="blistbox" v-else-if="currentIndex4 == 3">
                  <div class="row" style="width: 88px">
                    {{ item.name }}
                  </div>
                  <div class="row" style="width: 60px">
                    {{ item.sex==0?'女':'男' }}
                  </div>
                  <div class="row" style="width: 109px">
                    {{ item.qualifications }}
                    本科
                  </div>
                  <div class="row" style="width: 109px">
                    {{ item.phone }}
                  </div>
                </div>
              </div>
            </vue-seamless-scroll>
          </div>
        </div>
        <!--片区民警详情 -->
        <div class="details" v-if="showMjdDetail">
          <div class="detailsList">
            <h2>片区民警</h2>
            <div class="detail">
              <img :src="info7.img" alt="" />
              <div class="content">
                <div class="row">
                  <div class="title">姓名：</div>
                  <div class="cont">{{ info7.name }}</div>
                </div>
                <div class="row">
                  <div class="title">手机号：</div>
                  <div class="cont">{{ info7.phone }}</div>
                </div>
                <div class="row">
                  <div class="title">短号：</div>
                  <div class="cont">{{ info7.phoneCornet }}</div>
                </div>
                <div class="row">
                  <div class="title">办公电话：</div>
                  <div class="cont">{{ info7.telephone }}</div>
                </div>
                <div class="row">
                  <div class="title">单位：</div>
                  <div class="cont">{{ info7.company }}</div>
                </div>
                <div class="row">
                  <div class="title">部门：</div>
                  <div class="cont">{{ info7.department }}</div>
                </div>
                <div class="row">
                  <div class="title">职务：</div>
                  <div class="cont">{{ info7.job }}</div>
                </div>
              </div>
            </div>
            <div class="close" @click="CloseMjDtl">
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
export default {
  data() {
    return {
      currentIndex1: 0, //法律服务下标
      choose: -1,
      info1: {}, //法律服务统计
      //法律服务-法制动态列表
      list11: [],
      info2: {}, // 法制动态详情
      isShow1: false, //法制动态详情显示
      //法律服务-法律咨询列表
      list12: [],
      info3: {}, //法治乡村统计
      currentIndex21: 0, //法治乡村标题下标
      // currentIndex22: -1, //法治乡村内容下标
      currentchoice:0,
      // 法治乡村列表
      list2: [],
      info4: {}, //共享法庭信息
      info5: {}, //法律宝典统计
      currentIndex3: 0, //法律宝典下标
      // 法律文书列表
      list31: [],
      fws: false, //法律文书详情
      // 法律故事、普法宣传列表
      list32: [],
      isVideo: false,
      info6: {}, //法治队伍人数统计
      currentIndex4: 0, //法治队伍下标
      // 法治队伍列表
      list4: [
      ],
      // 地图五星图标
      village: false,
      // 查看村庄
      xcList: [],
      info7: {}, //片区民警详情
      // 显示片区民警详情
      showMjdDetail: false,
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
    // 法律服务-法律咨询配置
    flzxOption() {
      return {
        step: 0.2, // 数值越大速度滚动越快
        limitMoveNum: 3, // 开始无缝滚动的数据量 this.dataList.length
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
    // // 左侧-村庄选择
    // chooseTab22(index) {
    //   this.currentIndex22 = index;
    //   this.choose = index;
    //   console.log(this.choose);
    // },
     // 左侧-村庄选择
    chooseTab12(index) {
      this.currentchoice = index;
      this.info4=this.list2.filter(item=>{
        return this.currentchoice==item.choice
      })[0]
      console.log("info4",this.info4);
      // this.choose = index;
    },
    // 右侧-法律宝典
    chooseTab3(index) {
      this.currentIndex3 = index;
      if (index == 0) {
        this.api
          .getFlbdList({ current: 1, size: 20, name: "法律文书" })
          .then((res) => {
            this.list31 = res.records;
          });
      } else if (index == 1) {
        this.api
          .getFlbdList({ current: 1, size: 20, name: "法律故事" })
          .then((res) => {
            this.list32 = res.records;
          });
      } else if (index == 2) {
        this.api
          .getFlbdList({ current: 1, size: 20, name: "普法宣传" })
          .then((res) => {
            this.list32 = res.records;
          });
      }
    },
    // 右侧-法治队伍
    chooseTab4(index) {
      this.currentIndex4 = index;
      if (index == 0) {
        this.api.getFzdwList({ current: 1, size: 10, type: 1 }).then((res) => {
          this.list4 = res.records;
        });
      } else if (index == 1) {
        this.api.getFzdwList({ current: 1, size: 10, type: 2 }).then((res) => {
          this.list4 = res.records;
        });
      } else if (index == 2) {
        this.api.getFzdwList({ current: 1, size: 10, type: 3 }).then((res) => {
          this.list4 = res.records;
        });
      } else if (index == 3) {
        this.api.getFzdwList({ current: 1, size: 10, type: 4 }).then((res) => {
          this.list4 = res.records;
        });
      }
    },
    // 民警详情
    async handleMjdDetail(id) {
      this.showMjdDetail = true;
      this.info7 = await this.api.getFzdwDtl(id);
    },
    // 关闭民警详情
    CloseMjDtl() {
      this.showMjdDetail = false;
    },
    // 法律文书pdf
    hanldeClickf(item) {
      this.fws = true;
    },
    // 法律故事弹窗
    bofang(id) {
      this.isVideo = true;
    },
    // 法治动态详情
    async getFzdtDtl(id) {
      this.isShow1 = true;
      this.info2 = await this.api.getFzdtDtl(id);
      this.info2.details = this.info2.details.replace(
        /<img[^>]*>/gi,
        function (match, capture) {
          return match.replace(/(<img[^>]*)(\/?>)/gi, "$1width='100%' $2"); // 添加width="100%"
        }
      );
      this.info2.details = this.info2.details.replace(
        /<img[^>]*>/gi,
        function (match, capture) {
          return match.replace(
            /style\s*?=\s*?([‘"])[\s\S]*?\1/gi,
            'style="max-width:100%;height:auto;"'
          ); // 替换style
        }
      );
    },
    handleClose(index) {
      this.isShow1 = false;
      this.isShow2 = false;
      this.isVideo = false;
      this.fws = false;
      this.village = false;
      // console.log(1111111111111,this.$refs.gsDtlVideo);
      // if (this.$refs.gsDtlVideo.length > 0) this.$refs.gsDtlVideo[0].pause(); //暂停
    },
    // 地图位置轮播详情
    handlemap() {
      this.village = true;
    },
  },
  async created() {
    //  法律咨询统计
    this.info1 = await this.api.getFlzxStatis();
    // 法制动态列表
    this.api.getFzdtList({ current: 1, size: 10 }).then((res) => {
      this.list11 = res.records;
      this.info1.dynamicTotal = res.total;
    });
    // 法律咨询分页
    this.api.getFlzxList({ current: 1, size: 10 }).then((res) => {
      this.list12 = res.records;
    });
    // 法治乡村统计
    this.info3 = await this.api.getFzxcStatis();
    // 法治乡村列表
    this.api.getFzxcList({ current: 1, size: 20, type: 1 }).then((res) => {
      this.list2 = res.records;
    });
     // 地图五星服务点
    this.api.getFzxcList({ current: 1, size: 20, type: 2 }).then((res) => {
      this.xcList = res.records;
      
    });
    // 共享法庭列表
    this.api.getGxftList({ current: 1, size: 1 }).then((res) => {
      if (res.records.length > 0) this.info4 = res.records[0];
    });
    // 法治宝典统计
    this.info5 = await this.api.getFlbdStatis();
    // 法治宝典列表
    this.api
      .getFlbdList({ current: 1, size: 100, name: "法律文书" })
      .then((res) => {
        this.list31 = res.records;
      });
    // 法治队伍统计
    this.info6 = await this.api.getFzdwStatis();
    // 法治队伍列表
    this.api.getFzdwList({ current: 1, size: 10, type: 1 }).then((res) => {
      this.list4 = res.records;
    });
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
        height: 445px;
        position: absolute;
        z-index: 2000;
        left: 50%;
        top: 50%;
        // margin-left: -391.5px;
        // margin-top: -267.5px;
        transform: translate(-50%, -50%);
        background: url("../../images/tc1.png") no-repeat;
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
          .autor {
            font-size: 18px;
            color: #fff;
            .ftime3 {
              font-size: 14px;
              color: rgba(255, 255, 255, 0.4);
              // margin-top: 8px;
            }
          }
          .ftime1 {
            display: flex;
            align-items: center;
            img {
              width: 17px;
              height: 14px;
              object-fit: cover;
              margin-right: 5px;
            }
            .ic2 {
              font-size: 14px;
              font-weight: 500;
              color: #ffffff;
              opacity: 0.4;
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
        .detail {
          margin-top: 45px;
          display: flex;
          justify-content: center;
          img {
            width: 140px;
            height: 140px;
            border-radius: 50%;
            object-fit: cover;
            margin-right: 45px;
          }
          .content {
            .row {
              display: flex;
              font-size: 17px;
              font-family: "PingFang SC";
              font-weight: 500;
              color: #ffffff;
              line-height: 40px;
              .title {
                margin-right: 4px;
              }
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
      .list11 {
        // width: 313px;
        width: 362px;
        height: 290px;
        margin: 20px 0 10px;
        overflow: hidden;
        .item11 {
          cursor: pointer;
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
      .list12 {
        width: 362px;
        height: 290px;
        margin: 20px 0 10px;
        overflow: hidden;
        .item12 {
          // margin-bottom: 20px;
          .ft {
            font-size: 18px;
            color: #fff;
            // height: 48px;
            line-height: 24px;
            // margin-bottom: 18px;
            // text-overflow: -o-ellipsis-lastline;
            // overflow: hidden;
            // text-overflow: ellipsis;
            // display: -webkit-box;
            // -webkit-line-clamp: 2;
            // -webkit-box-orient: vertical;
          }
          .fl3 {
            display: flex;
            justify-content: space-between;
            border-bottom: 1px solid rgba(255, 255, 255, 0.1);
            padding-bottom: 10px;
            .autor {
              font-size: 14px;
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
          // height:144px;
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
        // 地图五星
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
        margin-bottom: 20px;
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
            line-height: 55px;
          }
          .data {
            width: 72px;
            height: 33px;
            background: rgba(0, 48, 149, 0);
            border: 1px solid #ffffff;
            // opacity: 0.4;
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
          background: url("../../images/flws.png") no-repeat !important;
          background-size: 100% 100% !important;
        }
        .video_img {
          .video-src {
            object-fit: fill;
            height: 64px;
            width: 109px;
          }
        }
      }
      .list32 {
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
            height: 65px;
            img {
              width: 100%;
              height: 100%;
              display: block;
            }
          }
        }
        .viodebox {
          .videoList {
            width: 783px;
            height: 689px;
            // margin-left: -391.5px;
            // margin-top: -340px;
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

      .fzdw_box {
        width: 361px;
        display: flex;
        justify-content: space-around;
        padding-bottom: 15px;
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
            text-align: center;
            // margin-bottom: 25px;
          }
          .num {
            font-size: 26px;
            font-family: Agency FB;
            font-weight: bold;
            color: #2efdfb;
            line-height: 58px;
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
            &:nth-child(2n + 1) {
              background: rgba(255, 255, 255, 0.3);
            }
            &:nth-child(2n) {
              background: rgba(255, 255, 255, 0.2);
            }
            .blistbox {
              display: flex;
              justify-content: space-between;
              align-items: center;
              text-align: center;
              height: 28px;
              line-height: 28px;
              color: #fff;
              cursor: pointer;
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

