<template>
  <div class="about-us-mask" v-if='isShow'>
    <div class="about-us-modal visible">
      <iframe noborder src='https://cdn.forms-content.sg-form.com/9750647a-0cd1-11ed-ab54-be3a0f9d4c7f' />
      <button class='close' @click='close'>X</button>
    </div>
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
    window.showForm = this.show;
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
.about-us-modal {
  height: 580px;
  width: 600px;
  max-width: 1100px;
  background-color: #fff;
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
.about-us-modal iframe {
  width: 100%;
  height: 100%;
  border: none;
}
.bg{
  position: absolute;
  right:0;
  bottom:0;
}
.about-us-modal.visible {
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
}
</style>
