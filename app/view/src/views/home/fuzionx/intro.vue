<template>
  <div class="fuz-section">
    <!-- left -->
    <div class='left-section'>
      <div class="fuz-title fuz-gap">
        First Web 3.0 Infused Exchange
      </div>
      <div class="fuz-content fuz-gap">
        Experience cryptocurrency trading with real-time market data,
        advanced charting tools and margin trading.
      </div>
      <div class='start-btn'>
        <fuz-circle class='circle-show' :class="{visible: visible}" />
        <div @mouseenter="visible = true" @mouseleave="visible = false">
          <fuz-button animation width="190" @click='toSignup'>
            Get started now
          </fuz-button>
        </div>
      </div>
    </div>
    <!-- ritht -->
    <div class="right-section">
      <img src="@/assets/fuzionx/images/home/intro-01.png" alt="">
    </div>
    <Watchbox class='box1' title='200+' content='Cryptocurrencies listed'/>
    <Watchbox class='box2' title='175' content='Supported countries'/>
  </div>
</template>
<script>
import Watchbox from '@/components/fuzionx/watchbox/Watchbox.vue';
import Circle from '@/components/fuzionx/circle/Circle.vue';

export default {
  components: { Watchbox, FuzCircle: Circle },
  data() {
    return { visible: false };
  },
  methods: {
    toSignup() {
      this.$router.push({ path: '/register' });
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
    width: 480px;
    position: absolute;
    top: 78px;
  }
  .right-section
    position absolute
    right 0
    top 0

  .start-btn
    position relative
    display inline-flex

  .circle-show
    position:absolute;
    top: 50%
    left: 50%
    opacity 0
    transition 0.3
    transform translate(-50%, -50%)

  .circle-show.visible
    opacity 1

  .box1
    position absolute
    right 10px
    top: 0;
  .box2
    position absolute
    top: 247px;
    right: 385px;
</style>
