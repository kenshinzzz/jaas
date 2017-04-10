<template>
<div style="position: fixed;overflow-x: hidden;width: 100%;height:100vh;">
  <slide :open="open" v-on:close="closeSlide"></slide>
  <xm-header title="收入"  :sty="stobj">
    <!--<router-link to="/acct/index" slot="left">-->
      <mt-button @click="slide" slot="left"><span class="glyphicon glyphicon-th-list" :class="{'glyphicon-span-active': open}"></span></mt-button>
    <!--</router-link>-->
  </xm-header>

  <div>
    <div id="date-chart"></div>

    <div style="height:1px;background:#5dcdbf;">
    </div>

    <div class="save-opr">
      <div class="save-opr-date">{{date}}</div>
      <router-link to="/acct/income-add">
        <div class="save-opr-button">记一笔</div>
      </router-link>
    </div>
    <div class="save-list">
      <div v-for="(item, index) in lastIncome" class="save-item lightSpeedIn animated" :style="{ animationDelay: index + '00ms' }">
        <div class="date">{{item.date}}</div>
        <img  src="/static/img/salary.png"/>
        <div  class="amount">+ {{item.amount}}</div>
      </div>
    </div>
  </div>
</div>
</template>
<script>
  import echarts from 'echarts'
  import {httpPost} from 'common/utils/http-util'
  import * as Constants from 'common/const/constants'
  import Utils from 'common/utils/util.js'
  export default {
    data () {
      return {
        stobj: {backgroundColor: 'transparent', borderBottom: '0px', height: '45px'},
        chart: null,
        incomeDate: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
        incomeData: [],
        lastIncome: [],
        date: '',
        open: false
      }
    },
    methods: {
      drawPie (id) {
        this.chart = echarts.init(document.getElementById(id))
        this.chart.setOption({
          title: {
          },
          tooltip: {
            trigger: 'axis'
          },
          xAxis: {
            type: 'category',
            boundaryGap: false,
            data: this.incomeDate,
            axisTick: {show: false},
            axisLine: {show: false}
          },
          yAxis: {
            type: 'value',
            axisTick: {show: false},
            axisLine: {show: false},
            axisLabel: {show: false},
            splitLine: {show: false},
            scale: true
          },
          grid: {top: 30, bottom: 30, right: 20, left: 10, show: false},
          series: [
            {
              name: '收入',
              type: 'line',
              data: this.incomeData,
              markPoint: {
                data: [
                  {type: 'max', name: '最大值'},
                  {type: 'min', name: '最小值'}
                ]
              },
              markLine: {
                data: [
                  {type: 'average', name: '平均值'}
                ]
              }
            }
          ]
        })
      },
      slide: function () {
        this.open = true
      },
      closeSlide: function () {
        this.open = false
      }
    },
    mounted () {
      let param = {}
      httpPost(Constants.SYSTEM.ACT, 'main', param).then((data) => {
        console.log('success')
        this.incomeData = data.incomeData
        this.lastIncome = data.lastIncome
        this.date = data.date
        this.drawPie('date-chart')
      }, (data) => {
        Utils.showValidate(data)
      })
      /* this.$nextTick(function () {
        this.drawPie('date-chart')
      }) */
    }
  }
</script>
<style scoped>
.glyphicon{
transition: transform 1s;
}
.glyphicon-span-active{
transform: rotate(720deg);
}

.save-opr{
    	background: #f4f4f4;
    	overflow: hidden;
		}
		.save-opr-date{
			float: left;
    	font-size: 14px;
    	padding: 20px;
		}
		.save-opr-button{
			float: right;
    	font-size: 16px;
    	margin: 10px;
    	background: #fd8842;
    	padding: 8px;
    	border-radius: 6px;
    	color: #fff;
    	min-width: 80px;
    	text-align: center;
		}

		.save-list{
		}
		.save-item:nth-child(odd) {
    	background: #e6e6e6;
		}
		.save-item:nth-child(even) {
    	background: #f4f4f4;
		}
		.save-item{
			display: flex;
    	padding: 8px 15px;
		}
		.save-item .date{
			font-size: 14px;
    	padding-top: 10px;
    	flex: 1;
		}
		.save-item img{
			width: 40px;
    	height: 40px;
    	margin-left: 20px;
    	flex: 1;
		}
		.save-item .amount{
			padding-top: 10px;
    	font-size: 20px;
    	text-align: right;
    	flex: 7;
    	color: #5dcdbf;
		}

		#date-chart{
			height: 200px;
		}

		.header{
			background: #fff;
    	color: #000;
		}
</style>
