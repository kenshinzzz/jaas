<template>
  <transition name="modal">
    <div class="xm-modal-mask">
      <div class="xm-modal-wrapper">
        <div class="xm-modal-container">
          <div class="xm-modal-header">
            <slot name="header" class="xm-modal-title">
              default header
            </slot>
          </div>
          <div class="xm-modal-body">
            <slot name="body">
              default body
            </slot>
          </div>
          <div class="xm-modal-footer">
            <slot name="footer">
              <button class="xm-modal-default-button xm-modal-btn" @click="$emit('close')">
                确&nbsp;定
              </button>
            </slot>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
/**
 * xm-modal
 * @module components/Modal
 * @desc 单元格
 * @param {slot} [header] - 标题头
 * @param {slot} [body] - 文本内容
 *
 * @example
 *   <xm-modal v-if="showModal" @close="showModal = false">
 *       <h4 slot="header">标题头</h4>
 *       <div slot="body">
 *         内容
 *       </div>
 *   </xm-modal>
 */
export default {
  name: 'xm-modal',

  props: {
    fixed: Boolean,
    title: String,
    transparent: Boolean,
    style: Object
  }
}
</script>

<style>
.xm-modal-mask {
  position: fixed;
  z-index: 9998;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, .5);
  display: table;
  transition: opacity .3s ease;
}

.xm-modal-wrapper {
  display: table-cell;
  vertical-align: middle;
}

.xm-modal-container {
  width: 250px;
  margin: 0px auto;
  padding: 40px 30px;
  background-color: #fff;
  border-radius: 2px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, .33);
  transition: all .3s ease;
  font-family: Helvetica, Arial, sans-serif;
}

.xm-modal-header h3 {
  margin-top: 0;
  color: #26a2ff;
}

.xm-modal-body {
  margin: 20px 0;
  position: relative;
  padding: 15px;
  border-top: 1px solid #e5e5e5;
}

.xm-modal-default-button {
  float: right;
}

/*
 * The following styles are auto-applied to elements with
 * transition="modal" when their visibility is toggled
 * by Vue.js.
 *
 * You can easily play with the modal transition by editing
 * these styles.
 */

.xm-modal-enter {
  opacity: 0;
}

.xm-modal-leave-active {
  opacity: 0;
}

.xm-modal-enter .xm-modal-container,
.xm-modal-leave-active .xm-modal-container {
  transform: scale(1.1);
}

/* write by yanw form this place on 2016/11/29*/
.xm-modal-info{
  font-family: "微软雅黑";
  display: block;
  font-weight: 200;
  margin: 6px;
  font-size: 14px;
}
.xm-modal-btn{
  width:80px;
  background-color: #fff;
  color:#26a2ff;
  border:1px solid #26a2ff;
  border-radius: 4px;
  font-size: 16px;
  font-weight: 600;
  padding: 5px 10px 3px 10px;
}
.xm-modal-title{
  font-family: "微软雅黑";
  font-size: 16px;
  margin:6px;
}
.xm-modal-header h4 {
  margin-top: 0;
  color: #26a2ff;
  font-family: "微软雅黑";
  font-size: 19px;
  margin:6px;
  text-align: center;
}
.xm-modal-footer {
    padding: 15px;
    text-align: right;
    border-top: 1px solid #e5e5e5;
}
</style>
