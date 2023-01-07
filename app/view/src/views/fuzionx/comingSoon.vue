<template>
  <div class="about-us" :class="{visible: isShow}">
    <div class="fuz-center">
      <div class="fuz-title title">Coming Soon</div>
    </div>
    <div class="fuz-center" style='margin-top: 80px'>
      <input type="text" class='fuz-text'  placeholder="Enter you email addresss" />
      <c-button class='fuz-text'>Subscribe for updates</c-button>
    </div>
    <img class='bg' src="@/assets/fuzionx/images/home/aboutus.svg" alt="">
    <button @click='close'>X</button>
  </div>
</template>
<script>
export default {
  props: {
    visible: { type: Boolean, default: false },
  },
  data() {
    return {
      isShow: false,
    };
  },
  mounted() {
    window.showComing = this.show;
  },
  methods: {
    show() {
      this.isShow = true;
    },
    close() {
      this.isShow = false;
    },
  },
};
</script>
<style scoped>
.about-us {
  min-height: 800px;
  max-width: 1280px;
  margin: 0 auto;
  position:relative;
}
.title {
  margin-top: 140px;
}
.bg{
  position: absolute;
  right:0;
  bottom:0;
  background: transparent !important;
}
input {
  border: 1px solid #7D7D7D;
  border-radius: 4px;
  width: 320px;
  height: 40px;
  padding: 0 5px;
  color:#fff;
}
input::-webkit-input-placeholder {
  color:rgba(255,255,255,0.9) !important;
}
input::placeholder{
  color:rgba(255,255,255,0.9) !important;
}
/* .about-us-mask {
  position: fixed;
  height: 100vh;
  width: 100vw;
  background-color: #00000080;
  z-index: 299;
  top: 50%;
  left: 50%;
  transform: translate(-50%,-50%);
}
.about-us-modal {
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
.bg{
  position: absolute;
  right:0;
  bottom:0;
}
.about-us.visible {
    transform: translate(-50%,-50%);
}
.close {
  position: absolute;
  right: 24px;
  top: 24px;
  width: 35px;
  height: 35px;
  background-color: #fff;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #222;
  margin: 0;
  padding: 0;
  line-height: 1;
  cursor: pointer;
  border: none;
} */
</style>
