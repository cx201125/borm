<template>
  <!-- 为ECharts准备一个具备大小（宽高）的Dom -->
  <div>
    <div style="width:1300px;height:600px" ref="chart"></div>
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
                myChart.setOption({
                    title: {
                        text: '宿舍楼人数分布情况' ,
                        subtext: '纯属虚构'
                    },
                    tooltip: {

                    },
                    xAxis: {
                        type: 'category',
                        data: ["梅园A栋","梅园B栋","桔园A栋","桔园B栋","桂圆A栋","桂圆B栋","竹园A栋","竹圆B栋"]
                    },
                    yAxis: {
                        type:"value"
                    },
                    series: [{
                        name: '学生人数',
                        type: 'bar',
                        data: [578, 623, 734, 547, 478, 530,584,593]
                    }]
                });
            }
        },
        mounted () {
            this.initCharts();
        }
    }
</script>

<style scoped>

</style>
