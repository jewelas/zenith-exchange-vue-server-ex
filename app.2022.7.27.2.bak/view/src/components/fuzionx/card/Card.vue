<template>
  <div class="card">
    <div class='card-wraper'>
      <div class="card-title" v-if='title || $slots.title'>
        {{title}}
        <slot name="title" />
      </div>
      <div class="card-content">
        <slot />
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    title: { type: String, default: '' },
  },
};
</script>
<style lang="stylus" scoped>
.card {
  position relative;
}
.card:before{
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 0;
  background: linear-gradient(210deg,#ffffff -10931.33%,#fefefe -10837.85%,
    #e1e1e1 -8501.04%,#cdcdcd -6164.23%,#c1c1c1 -3827.41%,#bdbdbd -1584.07%);
  background-blend-mode: overlay;
  mix-blend-mode: normal;
  opacity: .2;
  border-radius: 6px;
}
.card-title {
  font-weight: 600;
  font-size: 20px;
  height: 94px;
  display:flex;
  align-items:center;
  padding-left:70px;
  color:#fff;
  border-bottom: 2px solid rgba(198, 192, 199, 0.1);
}
.card-content {
  padding: 10px 70px;
}
.card-wraper {
  position: relative
}
</style>
