<template>
  <div :class="{ 'xm-header-wrapper': !transparent }">
  <header
    class="xm-header"
    :class="{ 'xm-header-fixed': fixed,  'xm-transparent': transparent }" >
    <div class="mint-header" :style="[sty, styleObject]" :class="{ 'xm-transparent-bg': transparent }">
      <div class="mint-header-button is-left">
        <slot name="left"></slot>
      </div>
      <h1 class="mint-header-title" v-text="title"></h1>
      <div class="mint-header-button is-right">
        <slot name="right"></slot>
      </div>
    </div>
  </header>
    </div>
</template>

<script>
/**
 * xm-header
 * @module components/Header
 * @desc 顶部导航，在mintui Header基础上增加transparent参数和style参数
 * @param {boolean} [fixed=false] - 固定顶部
 * @param {string} [title] - 标题
 * @param {slot} [left] - 显示在左侧区域
 * @param {slot} [right] - 显示在右侧区域
 * @param {boolean} [transparent=false] - 是否透明
 * @param {object} [style] - 设置导航栏样式
 *
 * @example
 * <xm-header title="Header" transparent>
 *   <mt-button slot="left" icon="back" @click="handleBack">返回</mt-button>
 *   <mt-button slot="right" icon="more"></mt-button>
 * </xm-header>
 */
export default {
  name: 'xm-header',

  props: {
    fixed: Boolean,
    title: String,
    transparent: Boolean,
    showOnScroll: Boolean,
    sty: Object
  },
  data () {
    return {
      styleObject: {
        // backgroundColor: '',
        // border: '',
        opacity: '1.0'
      }
    }
  },
  methods: {
    initScrollEvents () {
      let that = this
      window.onscroll = function () {
        var t = document.documentElement.scrollTop || document.body.scrollTop
        let op = 1.0
        if (t < 30) {
          that.styleObject.backgroundColor = ''
          that.styleObject.opacity = op
        } else if (t < 100) {
          let opp = t / 100.0
          if (opp > 0.3) {
            op = opp
          }
          that.styleObject.backgroundColor = '#fff'
          that.styleObject.opacity = op
        } else {
          that.styleObject.backgroundColor = '#fff'
          that.styleObject.opacity = '1.0'
        }
      }
    }
  },
  mounted () {
    if (this.showOnScroll) {
      this.initScrollEvents()
    }
  }
}
</script>

<style>
@import "var.css";
@import "mixins.css";
.xm-header{
  background-color: transparent;
  border: none;
  position: relative;
  width: 100vw;
  .mint-header{
    background-color: $color-white;
  }
}

.xm-header-fixed {
  position: fixed;
  z-index: 1;
}

.xm-transparent{
  position: fixed;
}
/* .mint-header.xm-transparent-bg{
  background-color: transparent;
  border: none;
} */
@mixin header xm-transparent-bg, transparent;

.xm-header-wrapper{
  height:45px;
}
.mint-header{
font-size: 20px;
}
</style>
