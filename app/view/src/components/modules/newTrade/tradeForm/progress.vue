<template>
  <div
    class="newTrade-progress"
    :class="[{'disabled': disabled}, 'progress-' + name]"
    @click="handleMouse($event, 'click')"
    @mousemove="handleMouse($event, 'move')"
    @mouseup="handleMouse($event, 'up')"
    @mousedown="handleMouse($event, 'down')"
  >
    <div class="progress-line a-4-bg"></div>
    <div
      v-if="!disabled"
      class="progress-current"
      :class="bgClass"
      :style="{ width: percent + '%'}"
      @mouseout.stop=""
    >
      <span
        class="spot a-7-bg"
        :class="bdClass"
      ></span>
      <div class="progress-percent a-4-bg b-1-cl">
        {{percent.toFixed(0)}}%
        <span class="arrow a-4-bd"></span>
      </div>
    </div>
    <ul class="progress-dot">
      <li class="a-5-bg">
        <span :class="[!disabled && percent > 0 ? bgClass : 'a-4-bg']"></span>
      </li>
      <li class="a-5-bg">
        <span :class="[!disabled && percent > 25 ? bgClass : 'a-4-bg']"></span>
      </li>
      <li class="a-5-bg">
        <span :class="[!disabled && percent > 50 ? bgClass : 'a-4-bg']"></span>
      </li>
      <li class="a-5-bg">
        <span :class="[!disabled && percent > 75 ? bgClass : 'a-4-bg']"></span>
      </li>
      <li class="a-5-bg">
        <span :class="[!disabled && percent === 100 ? bgClass : 'a-4-bg']"></span>
      </li>
    </ul>
  </div>
</template>
<script>
import mixin from 'BlockChain-ui/PC/common-mixin/modules/newTrade/tradeForm/progress/progress';
import 'BlockChain-ui/PC/common-mixin/modules/newTrade/tradeForm/progress/progress.styl';

export default {
  name: 'newTradeProgress',
  mixins: [mixin],
  mounted() {
    this.init();
  },
};
</script>
