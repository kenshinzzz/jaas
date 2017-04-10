<template>
<div class="xm-row">
  <slot name="col" :style="slotCls"></slot>
</div>
</template>

<script>
/**
 * xm-row
 * @module components/Row
 * @desc 按键集合
 * @param {slot}  - 按键列表
 *
 * @example
 *  <xm-row>
 *    <mt-button type="primary" size="large">保存</mt-button>
 *  </xm-row>
 */
export default {
  name: 'xm-row',
  props: {
    prefixCls: {
      type: String,
      default: 'buttons'
    },
    type: {
      type: String,
      require: true
    },
    className: {
      type: String,
      default: ''
    }
  },
  computed: {
    classes () {
      return ''
    },
    slotCls () {
      return {
        flex: 1,
        margin: '0 10px'
      }
    }
  },
  created () {
    // console.log(this.slots.length)
    // console.log(this.slots) // slots获取不到
  },
  mounted () {
    // console.log(this.$slots.col.length)
    let length = this.$slots.col.length
    for (let i = 0; i < length; i++) {
      this.$slots.col[i].elm.style.margin = '0 10px'
      this.$slots.col[i].elm.style.flex = 1
    }
  }
}
</script>

<style>
  .xm-row {
    margin: 15px 10px;
    display: flex;
  }
</style>
