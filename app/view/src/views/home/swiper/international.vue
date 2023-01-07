<template>
  <section class="internationalHome-swiper-base" style="background-color:#0e1a2e;">
    <!-- 解释文案 -->
    <div class="text">{{slideListTitle.subTitle}}</div>
    <!-- title -->
    <div class="title b-8-cl">{{slideListTitle.title}}</div>
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
import commonMixin from 'BlockChain-ui/PC/common-mixin/home/swiper/swiper';
import 'BlockChain-ui/PC/common-mixin/home/swiper/swiper.styl';


export default {
  mixins: [commonMixin],
  created() {
    this.init();
  },
};
</script>
