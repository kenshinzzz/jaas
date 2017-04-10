<template>
<div>
  <xm-header title="Save"  :sty="stobj">
    <router-link to="/acct/income" slot="left">
      <mt-button icon="back"></mt-button>
    </router-link>
    <mt-button slot="right" @click="record">OK</mt-button>
  </xm-header>

  <div>
            <div class="income-div">
              <div class="font-l income-label" for="income">$</div>
              <input class="font-xl"  id="income" v-model="income" readonly @click="setInput('')">
            </div>

        <div class="more-div">
          <div class="more-item">
            <div class="label">收入日期</div>
            <div class="date">
              <input id="year" placeholder="年" v-model="year" @click="popupYear = true;" readonly>
              <input id="month" placeholder="月" v-model="month" @click="popupMonth = true;" readonly>
            </div>
          </div>
          <div class="more-item">
            <div class="label">Tax</div>
            <input id="tax" v-model="tax" placeholder="Tax" @click="setInput('tax')" readonly>
          </div>
          <div class="more-item">
            <div class="label">Safe</div>
            <input id="safe" v-model="safe" placeholder="Safe" @click="setInput('safe')" readonly>
          </div>
          <div class="more-item">
            <div class="label">Fund</div>
            <input id="fund" v-model="fund" placeholder="Fund" @click="setInput('fund')" readonly>
          </div>
        </div>

            <input type="hidden" style="display:none;" id="type">
            <table class="type">
              <tbody >
              <tr>
                <td class="grid" data-type="salary"  @click="changeType('salary')">
                  <img  src="/static/img/salary.png" :class="{selected: isSalary}"/><br>
                  <span>Salary</span>
                </td>
                <td class="grid" data-type="performance" @click="changeType('performance')">
                  <img src="/static/img/performance.png" :class="{selected: isPerformance}"/><br>
                  <span>Performance</span></td>
                <td class="grid" data-type="bonus"  @click="changeType('bonus')">
                  <img src="/static/img/bonus.png" :class="{selected: isBonus}"/><br>
                  <span>Bonus</span></td>

                <td class="grid" data-type="income"  @click="changeType('other')">
                  <img src="/static/img/other.png" :class="{selected: isOther}"/><br>
                  <span>Income</span></td>
              </tr>
              </tbody>
            </table>
  </div>

  <div id="_income_keyboard">
    <table id="table_0909099" border="0" cellspacing="0" cellpadding="0">
      <tbody>
      <tr><td>1</td><td>2</td><td>3</td></tr>
      <tr><td>4</td><td>5</td><td>6</td></tr>
      <tr><td>7</td><td>8</td><td>9</td></tr>
      <tr><td>.</td><td>0</td><td style="color: #f47272">DEL</td></tr>
      </tbody>
    </table>
  </div>

  <mt-popup v-model="popupMonth" position="bottom" class="mint-popup" zIndex="10000">
    <mt-picker ref="monthPicker" :slots="monthSlots"  :visible-item-count="5" :show-toolbar="false" @change="onMonthPick"></mt-picker>
  </mt-popup>

  <mt-popup v-model="popupYear" position="bottom" class="mint-popup" zIndex="10000">
    <mt-picker ref="yearPicker" :slots="yearSlots" :visible-item-count="5" :show-toolbar="false" @change="onYearPick"></mt-picker>
  </mt-popup>
</div>
</template>
<script>
  import {httpPost} from 'common/utils/http-util'
  import * as Constants from 'common/const/constants'
  import Utils from 'common/utils/util.js'
  export default {
    data () {
      return {
        stobj: {backgroundColor: '#5dcdbf', borderBottom: '0px', height: '45px'},
        income: '',
        type: '',
        tax: 0.00,
        fund: 0.00,
        safe: 0.00,
        year: '2017',
        month: '3',
        isSalary: false,
        isOther: false,
        isBonus: false,
        isPerformance: false,
        taxOn: false,
        safeOn: false,
        fundOn: false,
        salaryOn: true,
        popupDate: false,
        popupMonth: false,
        popupYear: false,
        monthSlots: [
          {
            values: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12'],
            className: 'slot1',
            defaultIndex: 2
          }
        ],
        yearSlots: [
          {
            values: ['2016', '2017', '2018'],
            className: 'slot2',
            defaultIndex: 1
          }
        ]
      }
    },
    methods: {
      changeType: function (type) {
        console.log(type)
        this.isSalary = false
        this.isOther = false
        this.isBonus = false
        this.isPerformance = false
        this.type = type
        if (this.type === 'salary') {
          this.isSalary = true
        } else if (this.type === 'bonus') {
          this.isBonus = true
        } else if (this.type === 'performance') {
          this.isPerformance = true
        } else if (this.type === 'other') {
          this.isOther = true
        }
      },
      setInput: function (type) {
        console.log(type)
        this.taxOn = false
        this.safeOn = false
        this.salaryOn = false
        this.fundOn = false
        if (this.tax === '') {
          this.tax = '0'
        }
        if (this.safe === '') {
          this.tax = '0'
        }
        if (this.fund === '') {
          this.tax = '0'
        }

        if (type === 'tax') {
          this.taxOn = true
          this.tax = ''
        } else if (type === 'safe') {
          this.safeOn = true
          this.safe = ''
        } else if (type === 'fund') {
          this.fundOn = true
          this.fund = ''
        } else {
          this.salaryOn = true
        }
      },
      addEvent: function () {
        let de = document.getElementById('_income_keyboard')
        let that = this
        de.ontouchstart = function (e) {
          let ev = e || window.event
          let clickEl = ev.element || ev.target
          let value = clickEl.textContent || clickEl.innerText
          if ((clickEl.tagName.toLocaleLowerCase() === 'td' && value !== 'DEL')) {
            if (that.salaryOn) {
              that.income += value
            } else if (that.fundOn) {
              that.fund += value
            } else if (that.safeOn) {
              that.safe += value
            } else if (that.taxOn) {
              that.tax += value
            }
          } else if (clickEl.tagName.toLocaleLowerCase() === 'td' && value === 'OK') {
            console.log('ok')
          } else if (clickEl.tagName.toLocaleLowerCase() === 'td' && value === 'DEL') {
            if (that.income && that.salaryOn) {
              let newNum = that.income.substr(0, that.income.length - 1)
              that.income = newNum
            } else if (that.tax && that.taxOn) {
              let newNum = that.tax.substr(0, that.tax.length - 1)
              that.tax = newNum
            } else if (that.fund && that.fundOn) {
              let newNum = that.fund.substr(0, that.fund.length - 1)
              that.fund = newNum
            } else if (that.safe && that.safeOn) {
              let newNum = that.safe.substr(0, that.safe.length - 1)
              that.safe = newNum
            }
          }
        }
      },
      record: function () {
        if (this.income === '' || this.type === '') {
          return
        }
        // let param = {'income': this.income, 'type': this.type}
        let param = {'data': {'income': this.income, 'type': this.type, 'year': this.year, 'month': this.month, 'fund': this.fund, 'safe': this.safe, 'tax': this.tax}}
        httpPost(Constants.SYSTEM.ACT, 'add', param).then((data) => {
          console.log('success')
          this.$router.push({'path': '/acct/income'})
        }, (data) => {
          Utils.showValidate(data)
        })
      },
      onMonthPick (picker, values) {
        console.log(values[0])
        this.month = values[0]
      },
      onYearPick (picker, values) {
        console.log(values[0])
        this.year = values[0]
      }
    },
    mounted () {
      this.addEvent()
    }
  }
</script>
<style scoped>
.more-div{
display: flex;
background: #5dcdbf;
color: #fff;
}
.more-item{
flex: 1;
}
.more-item input{
border: none;
	  resize: none;width: 100%;
	  background: 0 0;outline: none;color: #fff;text-align: center;
}
.more-item .label{
width:100%;text-align:center;
}
.more-item .date{
display: flex;
}
.more-item .date input{
flex: 1;
}

.income-div{
height:50px;display: flex;padding: 20px 0px;background: #5dcdbf;color: #fff;font-weight: bold;
}
.income-label{
  height:50px;line-height: 50px;flex: 3;text-align: center;
}
.selected{background: #5dcdbf;}
.source-text{
		background:  rgba(240, 240, 240,0.3) none repeat scroll 0% 0%;
		color: #000000;
		padding: 3px 5px;
		border-radius:6px;
		float: left;
		font-size: 14px;
		margin-right: 5px;
	}
	.source-text-selected{
		background:  rgba(0, 128, 128,0.3) none repeat scroll 0% 0%;
		color: #fff;
	}
	.source-list{
		padding: 3px 0px;
		margin-top: 10px;
	}
	.for-salary{
	}
	.font-xl{
		font-size: 30px;
	}
	.font-l{
		font-size: 24px;
	}
	.font-normal{
		font-size: 14px;
	}

	.type{
		text-align: center;
		width: 100%;
		border-collapse:collapse;
		margin-top: 20px;
	}

	.type img{
		width: 50px;
		height: 50px;
	}
	.type span{
		font-size: 14px;
	}
	.grid{
		width: 25%;
	}

	#income{
		border: none;
	  resize: none;
	  background: 0 0;
	  flex: 7;outline: none;color: #fff;text-align: center;
	}



  #_income_keyboard{position: absolute; left: 0px; right: 0px; bottom: 0px; z-index: 1000; width: 100%; height: 40vh; background: #fff;}
	#table_0909099{text-align:center;width:100%;height:100%;border-top:1px solid #CECDCE;background-color:#FFF;}
	#table_0909099 td{width:33%;border:1px solid #ddd;border-right:0;border-top:0;}
	#table_0909099 td:hover{background-color:#5dcdbf;color:#FFF;}

	.mint-popup {
    width: 100%;
  }

@media (max-height: 480px) {
  #_income_keyboard{height: 30vh;}
}
</style>
