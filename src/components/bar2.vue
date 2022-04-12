<template>
  <div class="app" :style="{height:height * 134/1080+'px'}" :id="currentId" >
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
            height: {
                type: Number,
                default: 100
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
                xList:['1月','2月','3月','4月','5月','6月','7月','8月','9月','10月','11月','12月'],
                dataList: [
                    {value: 11, name:100,num:100,total:'1111'},
                    {value: 22, name:200,num:200,total:'2111'},
                    {value: 11, name:300,num:300,total:'3111'},
                    {value: 22, name:400,num:400,total:'4111'},
                    {value: 11, name:500,num:500,total:'5111'},
                    {value: 22, name:600,num:600,total:'6111'},
                    {value: 11, name:100,num:100,total:'1111'},
                    {value: 22, name:200,num:200,total:'2111'},
                    {value: 11, name:300,num:300,total:'3111'},
                    {value: 22, name:400,num:400,total:'4111'},
                    {value: 11, name:500,num:500,total:'5111'},
                    {value: 22, name:600,num:600,total:'6111'},
                ],
                colorList: [ '#C33430','#EFE52A','#64BD3C','#EF9300','#46BDE8','#B74AE5','#0AAF9F','#E99589','#C39BD3','#F9E79F'],
                bf:''
            };
        },

        mounted() {
            this.$nextTick(()=>{
                this.getData()
            })
        },
        methods: {

           async getData(){
               let qry = this.query.new()
               this.query.toW(qry,'plan2Tm',new Date().getFullYear(),'LK')
               let data = null
               if(this.currentId=='bar21'){ //巡检保养维护完成率
                    data = await this.$api.listInspection(this.query.toEncode(qry))
                }else { //水质仪器维护完成率
                    data = await this.$api.washListInspection(this.query.toEncode(qry))
                }
               this.xList = []
               this.dataList = []
               data.forEach(item=>{
                   this.xList.push(item.month)
                   this.dataList.push({
                       value:parseInt(item.completeRatio*100),
                       num:item.completeNum1,
                       total:item.orderNum1
                   })
               })

                this.init()
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
                        splitNumber:12,
                        type: 'category',
                        data: this.xList,
                        axisLabel:{ //字体设置
                            color:'#fff'

                        },
                        axisLine: {
                            show: true,
                            lineStyle: {
                                color: '#ffffff'
                            }
                        },
                        axisTick:{ //文字和标签对齐
                            alignWithLabel:true
                        },
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
                    tooltip: {
                        trigger: 'axis',
                        backgroundColor:'rgba(0,0,0,0.5)',
                        borderWidth:0,
                        textStyle:{
                          color:'#fff'
                        },
                        formatter:(value)=>{
                            // console.log(value)
                            return `完成率${value[0].value}%<br/>${this.dataList[value[0].dataIndex].num}/${this.dataList[value[0].dataIndex].total}`
                        }
                    },
                    series: [
                        {
                            type: 'line',

                            label: {
                                show: false,
                            },
                            labelLine: {
                                normal: {
                                    show: false
                                }
                            },
                            symbol: 'circle', //折线点设置为实心点
                            symbolSize: 6, //折线点的大小
                            itemStyle : {
                                normal : {
                                    color:'rgba(10, 30, 55, 0.97)',
                                    borderColor:'#0090F6',
                                    borderWidth:2,
                                    lineStyle:{
                                        color:'#0090F6'
                                    }
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
  }
</style>
