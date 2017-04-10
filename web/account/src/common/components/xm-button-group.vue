<template>
<div class="xm-button-group">
  <slot></slot>
</div>
</template>

<script>
/**
 * xm-button-group
 * @module components/ButtonGroup
 * @desc 按键集合
 * @param {slot}  - 按键列表
 *
 * @example
 *  <xm-button-group>
 *    <mt-button type="primary" size="large">保存</mt-button>
 *  </xm-button-group>
 */
export default {
  name: 'xm-button-group',
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
    }
  }
}
</script>

<style>
  .xm-button-group {
    margin: 15px 10px;
  }
</style>
