<template>
  <div>
    <el-select v-if="type == 'select'" v-model="model" :name="name" :size="size" :disabled="disabled" :clearable="clearable"
               :multiple="multiple" :multipleLimit="multipleLimit" :placeholder="placeholder" @change="change">
      <el-option v-for="item in items" :label="item.label" :value="item.value"></el-option>
    </el-select>

    <el-checkbox-group v-if="type == 'check'" v-model="model" :size="size" @change="$emit('change', $event)">
      <el-checkbox v-for="item in items" :label="item.label" :disabled="disabled"></el-checkbox>
    </el-checkbox-group>

    <el-radio-group v-if="type == 'radio'" v-model="model" :size="size" @change="change">
      <el-radio v-for="item in items" :label="item.value" :disabled="disabled">{{item.label}}</el-radio>
    </el-radio-group>
  </div>
</template>

<script>
  import Util from 'common/utils/util'

  export default{
    data () {
      return {
        items: []
      }
    },
    props: {
      type: {
        type: String,
        default: 'select'
      },
      dict: String,
      name: String,
      value: {},
      size: String,
      disabled: Boolean,
      clearable: Boolean,
      multiple: Boolean,
      multipleLimit: {
        type: Number,
        default: 0
      },
      placeholder: {
        type: String,
        default () {
          return this.$t('common.select.placeholder')
        }
      }
    },
    computed: {
      model: {
        get () {
          if (this.type === 'check') {
            return this.value2Label(this.value)
          } else {
            return this.value
          }
        },
        set (val) {
          if (this.type === 'check') {
            this.$emit('input', this.label2Value(val))
          } else {
            this.$emit('input', val)
          }
        }
      }
    },
    methods: {
      change (value) {
        this.$emit('change', value)
      },
      value2Label (values) {
        return this.items.filter((item) => {
          return values.indexOf(item.value) >= 0
        }).map((item) => {
          return item.label
        })
      },
      label2Value (labels) {
        return this.items.filter((item) => {
          return labels.indexOf(item.label) >= 0
        }).map((item) => {
          return item.value
        })
      }
    },
    created () {
      this.items = Util.getDict(this.dict)
    }
  }
</script>

<style>
</style>
