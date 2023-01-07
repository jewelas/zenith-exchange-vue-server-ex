<template>
  <div class="fuz-section">
    <!-- left -->
    <div class='left-section'>
      <div class="fuz-title fuz-gap">
        Step into the crypto trading world with just <i>one click!</i>
      </div>
      <div class="fuz-content fuz-gap">
        Anytime, anywhere. Trade crypto on your terms.
      </div>
      <div class='fuz-row'>
        <fuz-button animation width="240" ghost @click='onClick'>
          <span class='icon-apple' slot='icon' style='font-size:25px'></span>
          Get on AppStore
        </fuz-button>
        <fuz-button animation width="240" ghost @click='onClick'>
          <span class='icon-google-play' slot='icon'  style='font-size:25px'></span>
          Get on Google Play
        </fuz-button>
      </div>
    </div>
    <!-- ritht -->
    <img  class='img1' src="@/assets/fuzionx/images/home/star.png" :style="getStyle()" alt="">
    <div class='img2'>
      <img
        src="@/assets/fuzionx/images/home/stone.png"
        style='transform-origin: 390px 290px; 655px'
        :style="getStyle()" alt=""
      >
    </div>
  </div>
</template>
<script>

export default {
  data() {
    return {
      scrollY: 0,
    };
  },
  mounted() {
    window.addEventListener('scroll', this.onScroll);
  },
  beforeDestroy() {
    window.removeEventListener('scroll', this.onScroll);
  },
  methods: {
    getStyle() {
      return { transform: `rotate(${0.1 * this.scrollY}deg)` };
    },
    onScroll() {
      this.scrollY = window.scrollY;
    },
    onClick() {
      this.$router.push({ path: '/coming' });
    },
  },
};
</script>
<style lang="stylus" scoped>
  .fuz-section
    position relative
    height 520px

  .left-section
    width 520px
    position absolute
    top 78px
    z-index 1
  .img1
    position absolute
    width: 512px;
    height: 512px;
    left: 180px;
    top: -310px;
  .img2
    position absolute
    bottom: 0px;
    right: 0px;
    overflow:hidden;
    transform-origin: 390px 290px;
</style>
