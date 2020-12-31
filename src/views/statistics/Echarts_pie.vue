<template>
  <!-- 为ECharts准备一个具备大小（宽高）的Dom -->
  <div>
    <div style="width:1200px;height:560px" ref="chart"></div>
  </div>
</template>

<script>
    const echarts = require('echarts');
    export default {
        name: "Echarts",
        methods: {
            initCharts () {
                let myChart = echarts.init(this.$refs.chart);
                // 绘制图表
                var option = {
                    backgroundColor: '#2c343c',

                    title: {
                        text: '宿舍人员统计',
                        subtext:'数据纯属虚构',
                        left: 'center',
                        top: 20,
                        textStyle: {
                            color: '#ccc'
                        }
                    },

                    tooltip: {
                        trigger: 'item',
                        formatter: '{a} <br/>{b} : {c} ({d}%)'
                    },

                    visualMap: {
                        show: false,
                        min: 80,
                        max: 600,
                        inRange: {
                            colorLightness: [0, 1]
                        }
                    },
                    series: [
                        {
                            name: '来源',
                            type: 'pie',
                            radius: '55%',
                            center: ['50%', '50%'],
                            data: [
                                {value: 335, name: '梅园A栋'},
                                {value: 310, name: '梅园B栋'},
                                {value: 274, name: '桔园A栋'},
                                {value: 235, name: '桔园B栋'},
                                {value: 400, name: '桂圆A栋'}
                            ].sort(function (a, b) { return a.value - b.value; }),
                            roseType: 'radius',
                            label: {
                                color: 'rgba(255, 255, 255, 0.3)'
                            },
                            labelLine: {
                                lineStyle: {
                                    color: 'rgba(255, 255, 255, 0.3)'
                                },
                                smooth: 0.2,
                                length: 10,
                                length2: 20
                            },
                            itemStyle: {
                                color: '#c23531',
                                shadowBlur: 200,
                                shadowColor: 'rgba(0, 0, 0, 0.5)'
                            },

                            animationType: 'scale',
                            animationEasing: 'elasticOut',
                            animationDelay: function (idx) {
                                return Math.random() * 200;
                            }
                        }
                    ]
                };
                myChart.setOption(option);
            }
        },
        mounted () {
            this.initCharts();
        }
    }
</script>

<style scoped>

</style>
