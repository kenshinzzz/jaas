<template>
    <div id="slideContainer" :style="{left:left}" v-on:transitionend="end">
        <div id="slideLeft">
            <div id="user">
              <div class="tAc">
                <div style="margin-left: 40%;padding: 10px 0;">
                  <span></span>
                </div>
                <div>
                  Zhuangzz
                </div>
              </div>
              <div class="bottom-menu">
                <div class="bottom-menu-item bmtax">
                  <div class="label">总收入</div>
                  <div class="amount tax">{{income}}</div>
                </div>
                <div class="bottom-menu-item">
                  <div class="label">税后收入</div>
                  <div class="amount">{{incomeByTax}}</div>
                </div>
              </div>

            </div>

            <ul>
              <router-link v-for="item in api.others" :to="item.path">
                <li @click="close">
                    <span>{{item.name}}</span>
                </li>
              </router-link>
            </ul>
        </div>
        <div id="slideRight" :style="{opacity:opacity}" @click="close"></div>
    </div>
</template>
<script>
export default {
  name: 'slide',
  props: {
    open: {
      type: Boolean,
      default: false
    },
    income: {
      type: String,
      default: '0.00'
    },
    incomeByTax: {
      type: String,
      default: '0.00'
    }
  },
  data: function () {
    return {
      opacity: '0',
      api: {
        'limit': 1000,
        'subscribed': [],
        'others': [
          {
            'id': 3,
            'name': '主页',
            'path': '/user/home'
          },
          {
            'id': 1,
            'name': '统计',
            'path': '/acct/charts'
          },
          {
            'id': 2,
            'name': '记一笔',
            'path': '/acct/income-add'
          }
        ]
      }
    }
  },
  computed: {
    left () {
      return this.open ? '0px' : '-100%'
    }
  },
  methods: {
    end: function () {
      if (this.open) {
        this.opacity = '0.5'
      } else {
        this.opacity = '0'
      }
    },
    close: function () {
      this.opacity = '0'
      this.rotate = false
      this.$emit('close')
    }
  },
  mounted: function () {
  }
}
</script>
<style lang="css">
$blue:#3f3f3f;  /*#5dcdbf*/
$th:transparent;
#slideContainer {
    height: inherit;
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    width: inherit;
    position: fixed;
    left: -100%;
    transition: left 0.5s;
    z-index: 50;
}

#slideLeft {
    width: 70%;
    height: inherit;
    overflow: auto;
    background-color: #3f3f3f;
}

#slideRight {
    width: 30%;
    height: inherit;
    background-color: #000;
    opacity: 0;
    transition: opacity 0.3s;
}

#user {
    height: auto;
    background-color: $blue;
    align-items: center;
    justify-content: space-between;
    color: #fff;
    	span{
    		display: block;
    		height: 60px;
    		width: 60px;
    		background-color: #f9f9f9;
    		border-radius: 2px solid #fff;
    		background-size: 70%;
    		background-position: center 70%;
    		background-repeat: no-repeat;
    		border-radius: 50%;
    	}


    .bottom-menu{
      display: flex;
      width: 100%;
      height: 80px;
    }
    .bottom-menu-item{
      flex: 1;
      text-align: center;
      padding: 10px 0 15px;
      border-bottom: 2px solid #5dcdbf;
    }
    .bottom-menu-item.bmtax{
      border-bottom: 2px solid #fd8842;
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

}

ul {
    width: 100%;
    display: flex;
    flex-direction: column;
    padding-left: 0px;
    a{
      text-decoration: none;
      color: #fff;
    }
    li {
        list-style-type: none;
        display: flex;
        width: 95%;
        padding-left: 5%;
        justify-content: flex-start;
        align-items: center;
        height: 50px;
        &:hover {
            background-color: #f2f2f2;
        }
        &:active {
            background-color: #f4f4f4;
        }
    }
}
</style>
