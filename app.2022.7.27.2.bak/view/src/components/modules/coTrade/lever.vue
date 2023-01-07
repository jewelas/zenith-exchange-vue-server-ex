<!-- 杠杆 -->
<template>
  <div class="lever-box" :class="{ 'no-drop': !levelSwitch }">
    <div class="risk-Percentage">
      <div class="percentage_bar">
        <div class="risk-num transition" :style="{ left: lineIndicator + '%' }">
          <span class="b-1-cl"> {{ level }}X </span>
        </div>
      </div>
      <div class="risk-bar"></div>
      <!-- 杠杆 -->
      <!-- <div class="gg_text">0000</div> -->
      <i class="warning_icon icon-warning"></i>
    </div>
    <div class="transaction-drag" ref="dragStepWrap">
      <span
        class="drag-step transition c-8-bg"
        @mousedown="onmousedown"
        ref="dragStep"
        :style="{ left: stepPosition + '%' }"
      >
        <i class="icon_h"></i>
      </span>
      <span class="drag-def a-3-bg"></span>
      <i
        v-for="(item, index) in levelList"
        :key="index"
        class="a-3-bg a-6-bd"
        @click="dragStep(item, index)"
        :style="{ left: parseInt(index * changeLevelLeftNum) + '%' }"
        :class="'drag-step' + index"
      >
        <b class="mark">{{ item }}x</b>
      </i>
    </div>
  </div>
</template>
<script>
import mixin from 'BlockChain-ui/PC/common-mixin/modules/coTrade/lever/lever';
import 'BlockChain-ui/PC/common-mixin/modules/coTrade/lever/lever.styl';

export default {
  mixins: [mixin],
  mounted() {
    this.init();
  },
};
</script>
