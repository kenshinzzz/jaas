<template>
  <a class="xm-cell" :href="href">
  <div class="xm-item">
    <div class="xm-item-media" :class="['xm-item-media-' + mediaSize]">
      <slot name="left"></slot>
    </div>
    <div class="xm-item-inner">
      <slot name="title" class="xm-item-title"><div class="xm-item-title" v-text="title"></div></slot>
      <div class="xm-item-content"><slot name="content"></slot></div>
    </div>
    <div v-if="isLink" class="xm-item-is-link">
      <i class="xm-allow-right"></i>
    </div>
  </div>
  </a>
</template>

<script>
/**
 * xm-item
 * @module components/Item
 * @desc 单元格
 * @param {string|Object} [to] - 跳转链接，使用 vue-router 的情况下 to 会传递给 router.push，否则作为 a 标签的 href 属性处理
 * @param {string} [title] - 标题
 * @param {boolean} [is-link=false] - 可点击的链接
 * @param {string} [mediaSize] - 显示的图片大小
 * @param {slot} - 同 value, 会覆盖 value 属性
 * @param {slot} [left] - 左侧内容
 * @param {slot} [content] - 中间内容
 *
 * @example
 * <xm-item v-for="item in list" :title="productName" is-link>
 *           <img slot="left" src="../../assets/product1.jpg"/>
 *             <div slot="content">
 *              内容
 *             </div>
 *         </xm-item>
 */
export default {
  name: 'xm-item',
  props: {
    to: [String, Object],
    title: String,
    isLink: Boolean,
    mediaSize: {
      type: String,
      default: 'medium'
    },
    className: {
      type: String,
      default: ''
    }
  },
  computed: {
    href () {
      if (this.to && !this.added && this.$router) {
        const resolved = this.$router.match(this.to)
        if (!resolved.matched.length) return this.to

        this.$nextTick(() => {
          this.added = true
          this.$el.addEventListener('click', this.handleClick)
        })
        return resolved.path
      }
      return this.to
    }
  },
  methods: {
    handleClick ($event) {
      $event.preventDefault()
      this.$router.push(this.href)
    }
  }
}
</script>
<style >
.xm-item {
  overflow: hidden;
  padding-bottom: 10px;
  border-bottom: solid 1px #eee;
  background: #fff;
  display: flex;
}

.xm-item-media {
  height: auto;
  margin: 10px;
  flex: .6;
}

.xm-item-media-small {
  flex: .3;
}

.xm-item-media-medium {
  flex: .6;
}

.xm-item-media  img{
  width: 100%;
  height: auto;
}

.xm-item-title{
  height: auto;
  font-size: 1.2em;
  margin-bottom: 8px;
  color: #3d4245;
}
.xm-item-content{
  height: auto;
  font-size: 1em;
  color: #999999;
  margin-bottom: 5px;
}
.xm-item-inner {
  margin:10px 5px;
  flex: 1;
}

.xm-item-is-link{
  position: relative;
  flex: .1;
}

.xm-allow-right{
  border: solid 2px #c8c8cd;
  border-bottom-width: 0;
  border-left-width: 0;
  content: " ";
  top: 50%;
  position: absolute;
  width: 5px;
  height: 5px;
  transform: translateY(-50%) rotate(45deg);
}
.xm-cell {
  /* background-color: #fff; */
  box-sizing: border-box;
  color: inherit;
  min-height: 48px;
  display: block;
  overflow: hidden;
  position: relative;
  text-decoration: none;
}

</style>
