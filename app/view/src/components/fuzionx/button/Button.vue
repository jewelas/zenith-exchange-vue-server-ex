<template>
  <button class='fuz-button fuz-text'
    :class="{ani:animation,ghost:ghost,noborder: !border,}"
    :style="{ minWidth: width +'px'}"
    @click='onClick'
  >
    <div class='up-layer' :style="{color:color}">
      <slot name='icon' v-if='$slots.icon'/>
      <slot/>
    </div>
    <div class='bottom-layer' v-if='animation' :style="{color:color}">
      <slot name='icon' v-if='$slots.icon'/>
      <slot/>
    </div>
  </button>
</template>
<script>
export default {
  props: {
    animation: {
      type: Boolean,
      default: false,
    },
    ghost: {
      type: Boolean,
      default: false,
    },
    border: {
      type: Boolean,
      default: true,
    },
    width: {
      type: [Number, String],
      default: 130,
    },
    color: {
      type: String,
      default: '',
    },
  },
  methods: {
    onClick(evt) {
      this.$emit('click', evt);
    },
  },
};
</script>
<style lang="stylus" scoped>
.fuz-button {
    cursor: pointer;
    background: none;
    border: none;
    outline: none;
    height: 60px;
    box-sizing: border-box;
    border-radius: 30px;
    background: #4056D8;
    transition: .3s;
    align-items: center;
    justify-content: center;
    overflow:hidden;
    position relative;
    color:#fff;
    font-size:16px;
    display: inline-block;
    vertical-align: middle;
}
.fuz-button > * {
  line-height: 50px;
  font-weight: bold;
  display:flex;
  align-items:center;
  justify-content: center;
  gap: 10px;
}
.fuz-button.ani {
  & > * {
    position:absolute;
    inset:0;
    transition: 0.3s;
  }
  .up-layer{
    transform: translateY(0%) rotate(0deg);
    transform-origin: right;
  }
  .bottom-layer{
    transform: translateY(100%) rotate(90deg);
    transform-origin: left;
  }
  &:hover{
    box-shadow: 0 0 31px #ffffff4d;
    background: #452dbf;
  }
  &:hover .up-layer{
    transform: translateY(-100%) rotate(90deg);
  }
  &:hover .bottom-layer{
    transform: translateY(0%) rotate(0deg);
  }
}

.fuz-button.size-small {
  height: 50px;
  border-radius: 57px;
  font-size:16px;
}
.fuz-button.ghost {
  border:1px solid #4056D8;
  background: transparent;
  color:#4056d8;
  &:hover {
    color:#fff;
    background: #4056D8;
  }
}
.fuz-button.noborder {
  border:1px solid transparent;
  &:hover {
    color:#fff;
    background: transparent;
  }
}
</style>
