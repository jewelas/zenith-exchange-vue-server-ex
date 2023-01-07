<template>
  <div class="switch">
    <div class="value-label fuz-text" :class="{active: value === false}">{{onValue}}</div>
    <div class="switch-track" :class="{on: value === true}"  @click="onClick">
      <div class="inner">
        <div class="switch-thumb">
          <img src="@/assets/fuzionx/images/icons/refresh.svg" alt="">
        </div>
      </div>
    </div>
    <div class="value-label fuz-text" :class="{active: value === true}">{{offValue}}</div>
  </div>
</template>
<script>
export default {
  props: {
    onValue: { type: String, default: '' },
    offValue: { type: String, default: '' },
  },
  data() {
    return {
      value: false,
    };
  },
  methods: {
    onClick() {
      this.$emit('change', !this.value);
    },
  },
};
</script>
<style lang="stylus" scoped>
.switch
  display flex
  align-items center

.switch-track
    position: relative;
    z-index: 3;
    cursor: pointer;
    margin: 0 16px;
    width: 80px;
    height: 30px;
    border-radius: 77px;
    display: flex;
    align-items: center;
    justify-content: center;
    background: linear-gradient(90deg,#2d2d34,#454b51);

.inner
  position: relative;
  width: 78px;
  height: 28px;
  background: linear-gradient(304.62deg,#26282c -14.56%,#282a2e 81.46%);
  box-shadow: inset -4px -4px 10px #ffffff0d, inset 4px 4px 10px #1a1b1e;
  border-radius: 77px;
  padding: 0px;


.value-label
  color #fff
  font-weight bold

.value-label.active
  color #3F61E8


.switch-thumb
  display flex
  align-items center
  justify-content center
  height 26px
  width 26px
  border-radius 50%
  background: #5171ff
  transition 1s
  cursor pointer
  position absolute
  left 0
  &:hover
    box-shadow: 0 0 50px #ffffffe6;

.switch-track.on .switch-thumb
  left calc(100% - 26px)
</style>
