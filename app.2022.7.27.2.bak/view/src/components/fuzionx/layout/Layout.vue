<template>
  <div class='bg' :class="[`theme-${pageTheme}`]">
    <div class='bg-item style1' />
    <div class='bg-item style2' />
    <div class='bg-item style3' />
    <div class='bg-item style4' />
    <slot/>
  </div>
</template>

<script>

const pageTheme = {
  exTrade: 'black',
  marginTrade: 'black',
  login: 'gold',
  register: 'gold',
};

export default {
  components: {},
  computed: {
    pageTheme() {
      const name = this.$route.name || 'default';
      console.log('theme', this.$route);
      return pageTheme[name] || 'default';
    },
  },
};
</script>
<style lang="stylus">
body {
  background: #000 !important;
}
#app .page-content{
  min-height: 100vh;
}
.bg {
  position relative;
  padding-top: 119px;
  background:#000;
}
.bg-item {
  position absolute;
  left:0;
  right:0;
  top:0;
  bottom:0;
}
.bg.theme-default, .bg.theme-gold, .bg.theme-black  {
  .bg-item.style1 {
    background-image: url('../../../assets/fuzionx/images/ellipse.png');
    background-repeat: repeat;
    opacity: 0.6;
  }
  .bg-item.style2 {
    background-image: url('../../../assets/fuzionx/images/ellipse2.png');
    background-position: 350px 200px;
    background-repeat: repeat;
  opacity: 0.5;
  }
  .bg-item.style3 {
    background-image: url('../../../assets/fuzionx/images/ellipse3.png');
    background-position: 250px 350px;
    background-repeat: repeat;
    opacity: 0.3;
  }
}
.bg.theme-black {
  background: #151513;
  .bg-item.style4 {
    background: radial-gradient(#482f70, transparent, transparent) no-repeat -35vw 500px;
    background-size: 50vw 50vw;
  }
}
.bg.theme-gold {
  background: #151513;
  .bg-item.style4 {
    background: url('../../../assets/fuzionx/images/gold.png') no-repeat 0 500px;
    opacity:0.4;
  }
  .bg-item.style1 {
    background: url('../../../assets/fuzionx/images/home/star.png') no-repeat 100% 300px;
    opacity:0.4;
  }
}

#app, #footer-box {
  background: transparent !important;
}
.page-content-chain {
  // max-width: 1280px;
}
.newTrade-content, .trade-content {
  // max-width: calc(100vw - 60px);
  margin: 0 auto;
  &.a-8-bg {
    background:transparent !important;
  }
}
</style>
