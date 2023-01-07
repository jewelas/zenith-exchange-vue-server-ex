<template>

  <section class="europe-swiper-base">
    <!-- 解释文案 -->
    <!-- <div class="text">{{slideListTitle.subTitle}}</div> -->
    <!-- title -->
    <!-- <div class="title b-1-cl">{{slideListTitle.title}}</div> -->
    <!-- 图片区域 -->
      <!-- 图片 -->
    <div class="banner-box">
      <div v-for="(item, index) in imgs" :key="`${page}${index}`"
          class="u-8-bd banner-item"
          v-show="(index + 1) === page"
          @click="goTo(item.httpUrl)"
          :style="{backgroundImage: 'url(' + item.imageUrl + ')'}"
          @mouseenter="enter"
          @mouseleave="leave">
      </div>
    </div>
    <!-- 锚点 -->
    <div class="thumb-nav">
      <span
        class="prevBtn slideBtn"
        @click="prev"
        :class="{'opy': Math.abs(parseFloat(thumbLeft)) === 0}">
        <img :src="imgData.omLeft" alt="">
      </span>
      <span
        class="nextBtn slideBtn"
        @click="next"
        :class="{'opy': Math.abs(parseFloat(thumbLeft)) >= maxLeft}">
        <img :src="imgData.omRight" alt="">
      </span>
      <div class="thumb-box">
        <ul class="thumb-ul clearfix" :style="{width: thumbWidth, left: thumbLeft}">
          <li class="thumb-item" v-for="(item, index) in imgs" :key="index"
              :class="(index + 1) === page ? 'active' : ''"
              @click="pageClick(index + 1)">
              <p> {{item.title}}</p>
            <span class="pageBg"></span>
            <span
              v-if="(index + 1) === page"
              class="pageBar"
              :style="{width: thumbLineWidth + 'px'}">
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
import 'BlockChain-ui/PC/common-mixin/home/swiper/europe/europe.styl';

export default {
  mixins: [commonMixin],
  created() {
    this.init();
  },
};
</script>
