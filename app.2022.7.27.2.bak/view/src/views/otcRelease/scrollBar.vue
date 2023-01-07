<template>
  <section class="otcRelease-scrollBar"
           :class="className">
    <div class="scrollBar-page b-1-cl">-50</div>
    <div class="scrollBar-line" ref='scroll'>
      <span class="scrollBar-line-left b-2-bg"></span>
      <span class="scrollBar-line-right a-12-bg"></span>
      <span class="scrollBar-line-ball a-12-bg"
            @mousedown="handMouseDown"
        :style="{left: `${left}px`}">
        <div class="num b-1-cl">{{num}}%</div>
      </span>
    </div>
    <div class="scrollBar-page scrollBar-last b-1-cl">+50</div>
  </section>
</template>
<script>
import mixin from 'BlockChain-ui/PC/common-mixin/otcRelease/scrollBar/scrollBar';
import 'BlockChain-ui/PC/common-mixin/otcRelease/scrollBar/scrollBar.styl';

export default {
  mixins: [mixin],
  mounted() {
    this.init();
  },
};

</script>
