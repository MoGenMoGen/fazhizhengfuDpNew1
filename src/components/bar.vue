<template>
  <div class="app" :id="currentId">
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
                xList:['名字1','名字2','名字1','名字2','名字1','名字2'],
                dataList: [],
                colorList: [ '#C33430','#EFE52A','#64BD3C','#EF9300','#46BDE8','#B74AE5','#0AAF9F','#E99589','#C39BD3','#F9E79F'],
            };
        },

        mounted() {

            this.$nextTick(()=>{
                this.getData()

            })
        },
        methods: {
            getData(){
                this.xList = []
                this.$api.getVal().then(res=>{
                    res.forEach(item=>{
                        this.xList.push(item.sysCatVo.arg5)
                        this.dataList.push({
                            value:item.sysCatVo.arg2/item.sysCatVo.arg1*100,
                            num:item.sysCatVo.arg2,
                            total:item.sysCatVo.arg1
                        })
                    })
                    this.init()
                })
            },
            init() {
                this.myChart = this.$echarts.init(document.getElementById(this.currentId));

                let option = {
                    grid:{
                      top:30,
                      bottom:30,
                      right:10
                    },
                    xAxis: {
                        type: 'category',
                        data: this.xList,
                        axisLabel:{ //字体设置
                            color:'#fff'
,                           rotate:45

                        },
                        axisTick:{ //文字和标签对齐
                            alignWithLabel:true
                        },
                        color:this.colorList
                    },
                    yAxis: {
                        axisTick:{ //刻度显示
                            show:true,
                            inside:false,
                        },
                        splitLine: { //隐藏刻度线
                            show: false,
                        },
                        type: 'value',
                        name: '(上线/全部)',
                        nameTextStyle:{//坐标轴名称样式
                            color:'rgba(255,255,255,0.2)',
                            fontSize:10
                        },
                        splitNumber:5,
                        position: 'left',
                        alignTicks: false,
                        axisLine: {
                            show: true,
                            lineStyle: {
                                color: '#ffffff'
                            }
                        },
                        axisLabel: {
                            formatter: '{value}',
                            show:true,
                        },


                    },
                    // 数据区域缩放组件配置
                    dataZoom: [{
                        type: 'inside',
                        // 数据窗口范围的起始百分比
                        start: 5/this.dataList.length*100,
                        // 数据窗口范围的结束百分比
                        end: 5,
                        // 是否锁定选择区域（或叫做数据窗口）的大小，如果设置为 true 则锁定选择区域的大小，也就是说，只能平移，不能缩放
                        zoomLock: true
                    },],
                    series: [
                        {
                            hoverAnimation: false,//添加后鼠标放上去不会再有效果
                            name: '访问来源',
                            type: 'bar',
                            itemStyle: {
                                color:(params)=>{
                                    return this.colorList[params.dataIndex%this.colorList.length]
                                }
                            },
                            label: {
                                show: true,
                                position: 'top',
                                formatter: (value)=>{
                                    return this.dataList[value.dataIndex].num+'/'+this.dataList[value.dataIndex].total
                                },
                                color:'#fff',
                                rich: {
                                    a: {
                                        color: '#14ABF1',
                                        fontSize:'24',
                                        fontWeight:'bold',
                                        display:'inline'
                                    },
                                    b: {
                                        fontSize:'14',
                                        color:'#14ABF1',
                                        height: 40,
                                        display:'inline'
                                    },
                                }

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
  .app {
    width: calc(100vw * 435/1080);
    height: calc(100vh * 134/1080);
  }
</style>
