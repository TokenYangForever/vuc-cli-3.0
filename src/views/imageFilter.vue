<template>
  <div class="if-content-wrap">
    <div class="if-img-panel" :style="{filter: filterStyle, backgroundImage: imgUrl, backgroundBlendMode: bgBlendMode}"></div>
    <div class="if-control-wrap">
      <div class="if-control-panel">
        <template v-if="supportList[0]">
          <div class="title">filter</div>
          <div class="item" v-for="item in filterArray" :key="item.name">
            {{item.name}}：
            <input v-model="item.value" type="range" :max="item.max" :min="item.min">
            {{item.value + item.unit}}
          </div>
        </template>
        <div v-else>你的浏览器不支持css filter，请使用最新版的Chrome浏览器</div>
      </div>
      <div class="if-control-preset">
        预设值：
        <select v-model="presetValue">
          <option value ="none">无</option>
          <option value ="pencil">铅笔画</option>
          <option value="黑白">黑白</option>
          <option value="airBrush">彩笔</option>
        </select>
        <button @click="resetAction">重置</button>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
const defaultValue = [{
        name: 'blur',
        value: 0,
        max: 10,
        min: 0,
        unit: 'px'
      }, {
        name: 'brightness',
        value: 100,
        max: 200,
        min: 0,
        unit: '%'
      }, {
        name: 'contrast',
        value: 100,
        max: 500,
        min: 0,
        unit: '%'
      }, {
        name: 'grayscale',
        value: 0,
        max: 100,
        min: 0,
        unit: '%'
      }, {
        name: 'hue-rotate',
        value: 0,
        max: 360,
        min: 0,
        unit: 'deg'
      }, {
        name: 'invert',
        value: 0,
        max: 100,
        min: 0,
        unit: '%'
      }, {
        name: 'opacity',
        value: 100,
        max: 100,
        min: 0,
        unit: '%'
      }, {
        name: 'saturate',
        value: 100,
        max: 1000,
        min: 0,
        unit: '%'
      }, {
        name: 'sepia',
        value: 0,
        max: 100,
        min: 0,
        unit: '%'
      }]
import { supportsCSS } from '../common/util'
function cloneAndModify(arr, items) {
  return arr.map(i => {
    let {name} = i
    let temp = Object.assign({}, i)
    if (items[name]) {
      temp.value = items[name]
    }
    return temp
  })
}
export default {
// 不支持css样式提示、一些预设样式、各个属性可单独调整、reset预设属性
  mounted() {
    window.vm = this
    let temp: String[] = []
    for (let item of ['filter']) {
      temp.push(item)
    }
    this.supportList = temp
  },
  computed: {
    filterStyle() {
      let {supportList, filterArray} = this
      return supportList[0] ? filterArray.reduce((pre, {name, value, unit}) => {
        pre += ` ${name}(${value + unit})`
        return pre
      }, '') : ''
    }
  },
  methods: {
    resetAction() {
      this.triggerPreset(this.presetValue)
    },
    triggerPreset(value) {
      switch (value) {
        case 'none':
          this.filterArray = defaultValue
          this.bgBlendMode = 'normal'
          break;
        case 'pencil':
          this.bgBlendMode = 'normal'
          this.filterArray = cloneAndModify(defaultValue, {
            brightness: 200,
            invert: 100,
            grayscale: 100
          })
          break;
        case '黑白':
          this.bgBlendMode = 'difference'
          this.filterArray = cloneAndModify(defaultValue, {
            brightness: 150,
            grayscale: 100
          })
          break
        case 'airBrush':
          this.filterArray = cloneAndModify(defaultValue, {
            blur: 1,
            brightness: 150,
            saturate: 1000,
            contrast: 500
          })
        default:
          break;
      }
    }
  },
  data() {
    return {
      // 支持样式的情况
      presetValue: 'none',
      supportList: [],
      bgBlendMode: 'normal',
      imgUrl:'url(https://ss1.baidu.com/9vo3dSag_xI4khGko9WTAnF6hhy/image/h%3D300/sign=10da86d6df43ad4bb92e40c0b2035a89/03087bf40ad162d93b3a196f1fdfa9ec8b13cde9.jpg)',
      filterArray: defaultValue
    }
  },
  watch: {
    presetValue(newValue) {
      this.triggerPreset(newValue)
    }
  }
}
</script>

<style lang="scss" scoped>
@import "../style/global.scss";

.if-content-wrap {
  position: relative;
}
.if-img-panel {
  @include screen-center;
  width: 400px;
  height: 400px;
  position: relative;
  -webkit-transform: translate(-50%, 0%);
  transform: translate(-50%, 0%);
  background: {
    repeat: no-repeat;
  }
}
.if-control-wrap {
  padding: 30px;
  margin: 0px 50px;
  border: solid 1px #e6e6e6;
  display: flex;
}
.if-control-panel {
  display: flex;
  flex-wrap: wrap;
  flex: 1;
  .item {
    margin: 10px 15px 10px 0;
  }
  .title {
    flex: 1;
    font-size: 26px;
    flex-basis: 100%;
    border-bottom: 1px dashed #e6e6e6;
    text-align: left;
  }
}
.if-control-preset {
  width: 80px;
  button {
    margin-top: 10px;
  }
}
</style>
