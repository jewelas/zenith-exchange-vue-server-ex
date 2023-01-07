<template>
  <div class='circlesWrapper'>
    <div class='circleItem circle'
      v-for='index in 10' :key='index' :style="{animationDelay: `${index * delay}ms`}"
    />
  </div>
</template>
<script>
export default {
  data() {
    return {
      count: 10,
      delay: 800,
    };
  },
};
</script>
<style scoped>
.circle {
  animation-name: circleAnimation;
  animation-timing-function: linear;
  animation-iteration-count: infinite;
  animation-duration: 8800ms;
}
.circlesWrapper {
  position: absolute;
  width: 1px;
  height: 1px;
  transition: 0.6s;
}
.circleItem {
  position: absolute;
  z-index: 1;
  width: 20px;
  height: 20px;
  background: radial-gradient(#468126, #cad020);
  border-radius: 50%;
}
.circleItem:nth-child(2n) {
  background: radial-gradient(#4047cd, #400080);
}

@keyframes circleAnimation {
  0% {
    transform: scale(0);
    opacity: 0.5;
  }
  100% {
    transform: scale(50);

    opacity: 0.0;
  }
}
</style>
