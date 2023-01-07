<template>
  <div class="fuz-section">
    <!-- left -->
    <div class='left-section'>
      <div class="fuz-title fuz-gap">
        Become a crypto trader in <i>seconds</i>
      </div>
      <div class="fuz-content fuz-gap">
        We've got everything you need to start trading
      </div>
      <fuz-button animation width="190" @click='toView'>
        Contact Us
      </fuz-button>
    </div>
    <!-- ritht -->
    <Watchbox class='box1' size='small' title='Buy & Sell Crypto'>
      <img slot='icon' src='@/assets/fuzionx/images/home/icon-coin.png'>
    </Watchbox>
    <Watchbox class='box2' size='small' title='Trade Assets' theme='black'>
      <img slot='icon' src='@/assets/fuzionx/images/home/icon-analytics.png'>
    </Watchbox>
    <Watchbox class='box3' size='small' title='Learn Crypto'>
      <img slot='icon' src='@/assets/fuzionx/images/home/icon-order.png'>
    </Watchbox>
  </div>
</template>
<script>
import Watchbox from '@/components/fuzionx/watchbox/Watchbox.vue';

export default {
  components: { Watchbox },
  methods: {
    toView() {
      window.open('https://support.fuzionx.io/hc/en-us');
    },
  },
};
</script>
<style lang="stylus" scoped>
  .fuz-section {
    position: relative;
    height: 520px;
  }
  .left-section {
    width: 420px;
    position: absolute;
    top: 78px;
  }
  .right-section {
    position: absolute;
    right:0;
    top: 0;
  }
  .box1
    position absolute
    right 0px
    top: 0;
  .box2
    position absolute
    right 220px
    top: 180px;
  .box3
    position absolute
    right 30px
    top: 380px;
</style>
