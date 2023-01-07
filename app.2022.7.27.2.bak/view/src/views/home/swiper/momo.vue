<template>
  <section class="momo-swiper-base" style="background-color:#0e1a2e;">
    <!-- logo -->
    <div class="topLogo">
    </div>
    <!-- 解释文案 -->
    <!-- <div class="text" v-html="home_edit_html">{{slideListTitle.subTitle}}</div> -->
    <!-- title -->
    <div class="text " v-html="slideListTitle.title"></div>

    <!-- sub -->
    <div class="subtitle">{{slideListTitle.subTitle}}</div>
    <!-- button -->
    <!-- <div class= 'goSignBut' >
      <button v-if="
      !isLogin && userInfoIsReady"
      class="common-button common-button-solid u-8-bg u-16-cl " @click="goSign">
      TRY NOW
      </button>
    </div> -->
    <!-- 图片区域 -->
    <div class="imgBox" v-if="imgs.length">
      <!-- 图片 -->
      <ul class="img-ul clearfix">
        <transition-group name="aaa">
          <li v-for="(item, index) in imgList" :key="`${page}${index}`"
              class="u-8-bd"
              @click="goTo(item.httpUrl)"
              @mouseenter="enter"
              @mouseleave="leave">
            <img :src="item.imageUrl" alt="">
          </li>
        </transition-group>
      </ul>
      <!-- 锚点 -->
      <div class="sNav">
        <ul class="img-pages clearfix" v-if="imgs.length > 4">
          <li v-for="(item, index) in pageLength" :key="index"
              :class="(index + 1) === page ? 'active' : ''"
              @click="pageClick(index + 1)">
            <span class="pageBg"></span>
            <span v-if="(index + 1) === page" class="pageBar" :style="{width: pageWidth + 'px'}">
            </span>
          </li>
        </ul>
      </div>
    </div>
  </section>
</template>

<script>
import commonMixin from 'BlockChain-ui/PC/common-mixin/home/swiper/momo/momo';
import 'BlockChain-ui/PC/common-mixin/home/swiper/momo/momo.styl';


export default {
  mixins: [commonMixin],
  created() {
    this.init();
  },
};
</script>

<style lang="stylus" scoped>


</style>
