<template>
  <div class="app">
    <div :id="currentId" class="echarts"></div>
    <div class="content">
      <p>{{text}}</p>
      <b :style="{color:currentId=='receipt3'? '#FF3F30':'#FFBA16'}">{{alreadyTotal}} </b>
      <span>单</span>
    </div>
  </div>
</template>
<script>
    export default {
        props: {
            text:{
                type: String,
                default: '完成工单'
            },
            currentId: {
                type: String,
                default: 'receipt'
            },
            alreadyTotal: {
                type: Number,
                default: 0
            },
            total:{
                type: Number,
                default: 0
            }
        },
        data() {
            return {
                resizeTimer: null,
                myChart: null,
                name: '水箱清洗率',
                dataList: [
                    {value: this.alreadyTotal, label: {show: true,}},
                    {value: this.total-this.alreadyTotal,},
                ],
                colorList: [ '#14ABF1','rgba(25, 73, 134, 0.5)'],
                bf:''
            };
        },

        mounted() {
            this.$nextTick(()=>{
                this.getV()
            })
        },
        methods: {


            getV(){
              if (this.alreadyTotal !== 0){
                  this.bf = Number(this.alreadyTotal/this.total*100).toFixed(1);
              }  else {
                  this.bf = 0;
              }
                this.init()
            },

            init() {
                this.myChart = this.$echarts.init(document.getElementById(this.currentId));

                let option = {
                    series: [
                        {
                            hoverAnimation: false,//添加后鼠标放上去不会再有效果
                            name: '访问来源',
                            type: 'pie',
                            radius: ['70%', '90%'],
                            avoidLabelOverlap: false,
                            color: this.colorList,
                            label: {
                                show: true,
                                position: 'center',
                                formatter: [`{a|${this.bf.split('.')[0]}}{b|.${this.bf.split('.')[1]}}{b|%}`].join('\n'),
                                rich: {
                                    a: {
                                        color: '#14ABF1',
                                        fontSize:'24',
                                        fontWeight:'bold',
                                        display:'inline'
                                    },
                                    b: {
                                        fontSize:'12',
                                        color:'#14ABF1',
                                        height: 40,
                                        display:'inline'
                                    },
                                }
                                // emphasis: {
                                //     show: true,
                                //     textStyle: {
                                //         fontSize: '24',
                                //         fontWeight: 'bold'
                                //     }
                                // }
                            },
                            labelLine: {
                                normal: {
                                    show: false
                                }
                            },
                            data: this.dataList
                        }
                    ]
                };
                this.myChart.setOption(option);
            }
        },
        components: {}
    };
</script>

<style scoped lang="less">
  @font-face {
    font-family: 'iconfont2';  /* project id 1286275 */
    src: url('../../static/AGENCYB.TTF');
    src: url('../../static/AGENCYB.TTF') format('embedded-opentype'),
    url('../../static/AGENCYB.TTF') format('truetype'),
  }
  .app {
    width: 100%;
    height: calc(100vw * 81/1920);
    display: flex;
    display: -webkit-flex;
    align-items: center;
    .echarts{
      width: calc(100vw * 83/1920);
      height: 100%;
    }
    .content{
      color: #FFFFFF;
      p{
        font-size: 18/24rem;
        padding-bottom: 0.5rem;
      }
      b{
        font-size: 41/24rem;
        font-family: iconfont2;
      }
    }
  }
</style>
