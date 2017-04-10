<template>
  <div>
    <mt-field :label='label' @click.native="popup = true;"  v-model="model" :placeholder="placeholder" :readonly=true></mt-field>

    <mt-popup v-model="popup" position="bottom" class="mint-popup">
      <mt-picker ref="picker" :slots="slots" :value-key="'desc'" :visible-item-count="5" :show-toolbar="false" @change="change"></mt-picker>
    </mt-popup>
  </div>
</template>

<script>
  import Util from 'common/utils/util'

  export default{
    name: 'xm-dict',
    data () {
      return {
        items: [],
        popup: false
      }
    },
    props: {
      type: {
        type: String,
        default: 'select'
      },
      dict: String,
      label: String,
      placeholder: {
        type: String,
        default () {
          return '请选择'
        }
      },
      value: {}
    },
    computed: {
      model: {
        get () {
          if (this.type === 'check') {
            return this.value2Label(this.value)
          } else {
            return this.value2Label(this.value)
          }
        },
        set (val) {
          if (this.type === 'check') {
            this.$emit('input', this.label2Value(val))
          } else {
            this.$emit('input', this.label2Value(val))
            // this.$emit('input', val)
          }
        }
      },
      slots () {
        return [{values: this.items, defaultIndex: 0, className: 'slot1'}]
      }
    },
    methods: {
      change (picker, values) {
        // this.value = values[0].key
        // this. = values[0].desc
        let t = values[0].key
        let desc = values[0].desc
        // this.$emit('input', t)
        this.model = desc
        this.$emit('change', t, desc)
      },
      value2Label (values) {
        let arr = this.items.filter((item) => {
          return values === item.key
        }).map((item) => {
          return item.desc
        })
        if (arr.length > 0) {
          return arr[0]
        }
        return ''
      },
      label2Value (labels) {
        let arr = this.items.filter((item) => {
          return labels.indexOf(item.desc) >= 0
        }).map((item) => {
          return item.key
        })
        if (arr.length > 0) {
          return arr[0]
        }
        return ''
      }
    },
    created () {
      this.items = Util.getDict(this.dict)
    },
    mounted () {
      if (this.items.length > 0) {
        if (!this.model) {
          this.model = this.items[0].desc
        } else {
          var slot = this.slots[0]
          slot.values.forEach((value, index) => {
            if (value.desc === this.model) {
              this.$refs.picker.setSlotValue(0, value)
              return
            }
          })
        }
      }
    }
  }
</script>

<style>
</style>
