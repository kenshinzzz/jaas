<template>
<div>
  <xm-header title="Todo"  :sty="stobj">
    <router-link to="/acct/income" slot="right">
      <mt-button icon="more"></mt-button>
    </router-link>
  </xm-header>

  <div>
    <div class="save-opr">
      <div class="save-opr-date">{{date}}</div>
    </div>
    <div class="save-list">
      <div v-for="(item, index) in todos" class="save-item lightSpeedIn animated" :style="{ animationDelay: index + '00ms' }">
        <div class="date">{{item.date}}</div>
        <img  src="/static/img/salary.png"/>
        <div  class="amount">+ {{item.amount}}</div>
      </div>
    </div>
  </div>
</div>
</template>
<script>
  import {httpPost} from 'common/utils/http-util'
  import * as Constants from 'common/const/constants'
  import Utils from 'common/utils/util.js'
  export default {
    data () {
      return {
        stobj: {backgroundColor: 'transparent', borderBottom: '0px', height: '45px'},
        chart: null,
        incomeData: [],
        lastIncome: [],
        date: '',
        open: false
      }
    },
    methods: {
    },
    mounted () {
      let param = {}
      httpPost(Constants.SYSTEM.ACT, 'main', param).then((data) => {
        console.log('success')
        this.incomeData = data.incomeData
        this.lastIncome = data.lastIncome
        this.date = data.date
      }, (data) => {
        Utils.showValidate(data)
      })
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
