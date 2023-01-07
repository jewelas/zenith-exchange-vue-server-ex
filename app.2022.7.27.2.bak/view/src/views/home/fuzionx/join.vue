<template>
  <div>
    <div class='fuz-gap' style='text-align:center'>
      <div class='fuz-title'>The Most Comprehensive</div>
      <div class='fuz-title fuz-gap'>Cryptocurrency Platform</div>
      <div class='fuz-content fuz-gap'>Explore the world of crypto and blockchain</div>
    </div>
    <Card>
      <div class="fuz-section">
        <!-- left -->
        <div class="left-section">
          <img class='fly' src="@/assets/fuzionx/images/home/plane.png" alt="">
        </div>
        <!-- right -->
        <div class='right-section'>
          <div class="fuz-title fuz-gap" style='font-size:28px'>
            Be Part of our Global Community
          </div>
          <div class="fuz-content fuz-gap">
            Join our global community of traders and team to gain an
            insight into the new trend in the cryptocurrency industry
          </div>
          <fuz-button animation width="190" @click='toView'>
            Join now
          </fuz-button>
        </div>
      </div>
    </Card>
  </div>
</template>
<script>
import Card from '@/components/fuzionx/card/Card.vue';

export default {
  components: { Card },
  methods: {
    toView() {
      window.open('https://support.fuzionx.io/hc/en-us');
    },
  },
};
</script>
<style lang="stylus" scoped>
  .fly {
    animation: flyAnim;
    animation-duration: 2s;
    animation-iteration-count: infinite;
    animation-timing-function: linear;
  }

  @keyframes flyAnim {
    0% {
      transform: translateY(0px);
    }
    25% {
      transform: translateY(-10px);
    }
    50% {
      transform: translateY(10px);
    }
    100% {
      transform: translateY(0px);
    }
  }
  .fuz-section {
    position: relative;
    height: 420px;
  }
  .left-section {
    width: 420px;
    position: absolute;
    top: 20px;
  }
  .right-section {
    position: absolute;
    right:0;
    top: 80px;
    width: 550px;
  }
  .box1
    position absolute
    right 10px
    top: 0;
  .box2
    position absolute
    right 300px
    top: 300px;
</style>
