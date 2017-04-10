<template>
<div>
  <xm-header :sty="stobj">
    <router-link to="/acct/income" slot="left">
      <mt-button icon="back"></mt-button>
    </router-link>
  </xm-header>
  <div>
    <div>
      <div id="date-chart"></div>
      <div id="type-chart"></div>
    </div>

    <div class="bottom-menu">
      <div class="bottom-menu-item bmtax">
        <div class="label">总收入</div>
        <div class="amount tax">{{income}}</div>
      </div>
      <div class="bottom-menu-item">
        <div class="label">总支出</div>
        <div class="amount">{{incomeByTax}}</div>
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
        stobj: {backgroundColor: '#5dcdbf', borderBottom: '0px', height: '45px'},
        dateChart: null,
        typeChart: null,
        date: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
        dateData: [5, 20, 36, 10, 10, 20],
        type: ['赵大', '王五', '张三', '李四', '其他'],
        typeData: [{value: 10, name: '张三'},
          {value: 5, name: '其他'},
          {value: 15, name: '李四'},
          {value: 25, name: '王五'},
          {value: 20, name: '赵大'}
        ],
        income: '0.00',
        incomeByTax: '0.00'
      }
    },
    methods: {
      drawDate (id) {
        this.dateChart = echarts.init(document.getElementById(id))
        this.dateChart.setOption({
          tooltip: {},
          xAxis: {
            data: this.date,
            axisTick: {show: false},
            axisLine: {show: false},
            axisLabel: {textStyle: {color: '#fff'}}
          },
          yAxis: {
            axisTick: {show: false},
            axisLine: {show: false},
            axisLabel: {textStyle: {color: '#fff'}},
            splitLine: {show: false}
          },
          series: [{
            name: '交易',
            type: 'bar',
            data: this.dateData
          }],
          backgroundColor: 'rgb(93,205,191)',
          color: ['#fff'],
          grid: {top: 10, bottom: 30, right: 20, show: false}
        })
      },
      drawType (id) {
        this.typeChart = echarts.init(document.getElementById(id))
        this.typeChart.setOption({
          title: {
            text: '转账详情',
            x: 'center'
          },
          tooltip: {
            trigger: 'item',
            formatter: '{a} <br/>{b} : {c} ({d}%)'
          },
          legend: {
            x: 'center',
            y: 'bottom',
            data: this.type
          },
          toolbox: {
            show: true,
            feature: {
              mark: {show: true},
              magicType: {
                show: true,
                type: ['pie', 'funnel']
              }
            }
          },
          calculable: true,
          series: [
            {
              name: '转账数据',
              type: 'pie',
              radius: [30, 110],
              center: ['50%', '50%'],
              roseType: 'area',
              data: this.typeData
            }
          ]
        })
      }
    },
    mounted () {
      let param = {}
      let that = this
      httpPost(Constants.SYSTEM.ACT, 'charts', param).then((data) => {
        console.log('success')
        that.dateData = data.dateData
        let td = []
        let t = []
        for (let i = 0; i < data.typeData.length; i++) {
          t[i] = data.typeData[i].name
          let v = parseFloat(data.typeData[i].value)
          td[i] = {value: v, name: data.typeData[i].name}
        }
        that.type = t
        that.typeData = td
        that.income = data.income
        that.incomeByTax = data.incomeByTax
        that.drawDate('date-chart')
        that.drawType('type-chart')
      }, (data) => {
        Utils.showValidate(data)
      })
      /* this.$nextTick(function () {
        this.drawDate('date-chart')
        this.drawType('type-chart')
      }) */
    }
  }
</script>

<style scoped>
.bottom-menu{
			display: flex;
			/*position: fixed;*/
    	bottom: 0;
    	left: 0;
    	width: 100%;
    	height: 12vh;
		}
		.bottom-menu-item{
			flex: 1;
    	text-align: center;
    	padding: 10px 0 15px;
    	border-top: 2px solid #5dcdbf;
		}
		.bottom-menu-item.bmtax{
			border-top: 2px solid #fd8842;
		}
		.bottom-menu-item .label{
			font-size: 12px;
		}
		.bottom-menu-item .amount{
			font-size: 30px;
    	padding: 10px 0 5px;
    	color: #5dcdbf;
    	font-weight: 400;
		}
		.bottom-menu-item .tax{
			color: #fd8842;
		}
		#date-chart{
			height: 30vh;
			background: #5dcdbf;
			min-height: 200px;
		}
		#type-chart{
			height: 50vh;
			min-height: 330px;
		}

		.xm-header .mint-header {
      background-color: #5dcdbf;
      border-bottom: 0px;
    }
</style>
