/**
 * Created by fengzy on 2016/10/14.
 */
import Vue from 'vue'
import Util from '../utils/util'

/**
 * 金额格式化
 */
Vue.filter('amount', (value, currency) => Util.formatAmt(value, currency))
