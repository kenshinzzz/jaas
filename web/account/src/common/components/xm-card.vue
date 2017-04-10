<template>
  <a class="xm-cell" :href="href">
  <div class="xm-card" :style="borderColor">
    <div class="xm-card-header" v-if="hasTitle">
        <slot name="title">
        {{title}}
        </slot>
    </div>

    <div class="xm-card-content">
      <slot name="content"></slot>
    </div>
    <div class="xm-card-footer" v-if="hasFooter">
        <slot name="footer">
        </slot>
    </div>

  </div>
  </a>
</template>

<script>
/**
 * xm-card
 * @module components/Card
 * @desc 单元格
 * @param {string|Object} [to] - 跳转链接，使用 vue-router 的情况下 to 会传递给 router.push，否则作为 a 标签的 href 属性处理
 * @param {string} [title] - 标题
 * @param {boolean} [hasTitle=false] - 显示标题头
 * @param {boolean} [hasFooter=false] - 显示标题footer
 * @param {slot} [content] - 卡片内容
 * @param {slot} [title] - 同 title, 会覆盖 title 属性
 * @param {slot} [footer] - footer内容
 *
 * @example
 * <xm-card :to="{ path: '/xibui/index' }">
      <div slot="content">
      </div>
   </xm-card>
 */
export default {
  name: 'xm-card',
  props: {
    to: [String, Object],
    title: String,
    hasTitle: Boolean,
    hasFooter: Boolean,
    type: {
      type: String,
      title: String,
      require: true
    },
    className: {
      type: String,
      default: ''
    },
    /* radius: {
      type: String,
      default: '0.1rem'
    }, */
    border: {
      type: String,
      default: 'transparent'
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
    },
    borderColor () {
      return {
        borderTopColor: this.border
      }
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
<style>
.xm-card {
    background: #fff;
    box-shadow: 0 0.05rem 0.1rem rgba(0, 0, 0, 0.3);
    margin: 0.5rem;
    position: relative;
    border-radius: 0.5rem 0.5rem 0.1rem 0.1rem;
    font-size: 0.7rem;
    border-top: 3px solid;
}

.xm-card-header {
    border-radius: 0.5rem 0.5rem 0 0;
    font-size: 0.85rem;
}
.xm-card-header, .xm-card-footer {
    min-height: 2.2rem;
    position: relative;
    padding: 0.5rem 0.75rem;
    box-sizing: border-box;
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.xm-card-header::after {
    content: '';
    position: absolute;
    left: 0;
    bottom: 0;
    right: auto;
    top: auto;
    height: 1px;
    width: 100%;
    background-color: #e1e1e1;
    display: block;
    z-index: 15;
    transform-origin: 50% 100%;
}

.xm-card-content {
    position: relative;
}

.xm-card-footer {
    border-radius: 0 0 0.1rem 0.1rem;
    color: #5f646e;
}

.xm-card-footer::before {
    content: '';
    position: absolute;
    left: 0;
    top: 0;
    bottom: auto;
    right: auto;
    height: 1px;
    width: 100%;
    background-color: #e1e1e1;
    display: block;
    z-index: 15;
    transform-origin: 50% 0%;
}

.xm-cell {
    box-sizing: border-box;
    color: inherit;
    min-height: 48px;
    display: block;
    overflow: hidden;
    position: relative;
    text-decoration: none;
}
</style>
