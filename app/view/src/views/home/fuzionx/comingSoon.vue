<template>
  <div class="about-us-mask" v-if='visible'>
    <div class="about-us">
      <div class="fuz-title">Coming Soon</div>
      <div class="fuz-row">
        <c-input type="text" placeholder="Enter you email addresss" />
        <c-button>Subscribe for updates</c-button>
      </div>
      <img src="@/assets/fuzionx/images/home/about-us.svg" alt="">
    </div>
  </div>
</template>
<script>
export default {
  name: 'page-coming',
  props: {
    visible: { type: Boolean, default: false },
  },
  data() {
    return {
      isShow: false,
    };
  },
  mounted() {
    window.showComming = this.show();
  },
  methods: {
    show() {
      this.isShow = true;
    },
  },
};
</script>
<style scoped>

.about-us-mask {
  position: fixed;
  height: 100vh;
  width: 100vw;
  background-color: #00000080;
  z-index: 299;
  top: 50%;
  left: 50%;
  transform: translate(-50%,-50%);
}
.about-us {
  min-height: 400px;
  width: 95%;
  max-width: 1100px;
  background-color: #222;
  box-shadow: 0 0 30px #0000004d;
  position: fixed;
  z-index: 300;
  top: 50%;
  left: 50%;
  transform: translate(-50%,110vh);
  border-radius: 16px;
  display: grid;
  overflow: hidden;
  transition: all 1s ease;
}
</style>
