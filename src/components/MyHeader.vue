<template>
  <div class="headerContent" >
      <div class="headertop">
          <!-- 左 -->
          <div class="header-left">
              <ul class="menulist">
                  <li @click="topf"  :class="{active:cur==0}">概览</li>
                  <li @click="topc" :class="{active:cur==1}">普法调节</li>
              </ul>
          </div>
          <!-- 中 -->
          <div class="header-center">
              <ul class="menulist">
                  <li @click="topr" :class="{active:cur==2}">数字执法</li>
              </ul>
              <h2><img src="../images/fazizf.png" alt=""></h2>
          </div>
          <!-- 右 -->
          <div class="header-right">
              <div class="time">
                  {{nowTime}}
              </div>
              <div class="home">
                <div class="home2">
                    <a href="javascript:void(0):"  @click="toPage"  :class="{active:cur==3}">
                    返回首页</a>
                </div>
              </div>
          </div>
      </div>
  </div>
</template>

<script>
import moment from "moment";
export default {
    data(){
        return{
            nowTime:''
        }
    },
    props:{
        cur:{default:0}
    },
    mounted(){
        moment.locale("zh-cn");
        // this.nowTimes();
        setInterval(()=>{
          this.nowTime= moment().format("HH:mm:ss | YYYY-MM-DD dddd ")   
        //  this.until.formatDate()
        },1000)
    },
    methods:{
        //页面跳转
        topf() {
        window.location.href = "/";
        },
        topc() {
        window.location.href = "./pftj.html";
        },
        topr() {
        window.location.href = "./szzf.html";
        },
        toPage(){},
        
  
    }
}
</script>

<style lang="less" scoped>
//   @import url("../assets/css/font/font.css");
  .headerContent {
    width: 1920px;
    // position: fixed;
    // top: 0;
    // z-index: 9999;
    height: 110px;
    transform-origin: top left;
    .headertop{
        display: flex;
        justify-content: space-between;
        text-align: center;
        color: #fff;
        font-family: "Source Han Sans CN";
        padding:0 38px;
        box-sizing: border-box;
        .header-left{width: 404px;}
        .menulist{
            display: flex;
            justify-content: space-between;
            align-content: center;
            font-weight: bold;
            font-size: 18px;
            padding-top: 19px;
            width: auto;
            li{
                margin-right:50px;
                width: 128px;
                background: url("../images/m_nav.png") no-repeat;
                background-size: 100% 100%;
                height: 65px;
                line-height: 88px;
                display: block;
                color: rgba(108, 252, 255, .6);
               
                &.active{
                   color: #FFC650;
                    background: url("../images/m_navActive.png") no-repeat;
                    background-size: 100% 100%;

                    
               }
                cursor: pointer;
            }
        }
        .header-center{
            width: 788px;
            // float: left;
            display: flex;
            justify-content: space-between;
            img{display: block; width: 660px;}
        }
        .header-right{
            width: 552px;
            // float: right;
            display: flex;
            box-sizing: border-box;
            font-family: "Source Han Sans CN";
            .time{
                line-height: 96px;
                color: #fff;
                margin-top: 20px;
                font-size: 18px;
            }
            .home{
                padding-top: 19px;
                font-size: 18px;
                margin-left: 54px;
                .home2{
                    font-weight: bold;
                    a{
                    background: url("../images/m_nav.png") no-repeat;
                    background-size: 100% 100%;
                    width: 100%;
                    height: 65px;
                    line-height: 88px;
                    margin-right: 55px;
                    display: block;
                    color: rgba(108, 252, 255, .6);
                    }
                    cursor: pointer;
                }
            }
        }
    }
  }
</style>