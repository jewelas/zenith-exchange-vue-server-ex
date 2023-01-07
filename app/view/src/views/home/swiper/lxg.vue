<template>
  <section class="lxg-swiper-base">
    <!-- <img src="http://localhost:8081/assets/banner_bg.png?1581935605893" alt=""> -->
    <div class="king-box">
      <div class="king-otc-content" :class="flag ? 'king-otc-content-sm' : ''">
        <div class="king-otc-text1"
          style="color: #fff"
          v-html="slideListTitle.title"></div>
        <!-- <div class="king-otc-text1 f-1-cl">of Transaction System Solutions</div> -->
        <div class="king-otc-text2"
          style="color: #fff"
          v-html="slideListTitle.subTitle"></div>
        <div class="king-otc-options clearfix">
          <div class="king-otc-coin" style="border-radius: 2px 0 0 2px">USDT</div>
          <div class="king-otc-inp"><input type="text"
            :placeholder="$t('kingAdd.input')"></div>
          <div class="king-otc-coin">CNY</div>
          <a class="king-otc-btn" href="https://otc.lxg.tw/zh_CN/" target="_block">
            {{ $t('kingAdd.buy') }}</a>
        </div>
      </div>
      <div class="king-img-content" :style="imgBoxStyle" v-if="kingImgs.length">
        <!-- <div @click="bigClick"> big {{ bigPage }} </div>
        <div @click="smallClick"> small {{ smallPage }} </div> -->
        <div class="side-box">
          <div :class="flag ? 'king-jt-r' : 'king-jt-l'"
            @click="setFlag">
            <div class="king-jt"></div>
          </div>
        </div>
        <div class="king-imgs" :class="flag ? 'king-type-big' : 'king-type-small'">
          <div class="king-imgs-big" v-if="flag"
            :style="bigStyle">
            <div class="king-imgs-even"
              @click="imgClick(item.httpUrl)"
              v-for="(item, index) in kingSort" :key="index"
              :style="(index + 1) % 4 ? 'margin-right: 20px' : ''">
              <img :src="item.imageUrl" alt="">
            </div>
          </div>
          <div class="king-imgs-small clearfix" v-else
            :style="smallStyle">
            <div class="king-imgs-even"
              @click="imgClick(item.httpUrl)"
              v-for="(item, index) in kingSort" :key="index">
              <img :src="item.imageUrl" alt="">
            </div>
          </div>
        </div>
        <div class="bigPage-box clearfix" v-if="flag">
          <div v-for="(item, index) in Math.ceil(this.kingSort.length / 4)" :key="index"
            class="bigPage-box-even" :class="bigPage === index ? 'bigPage-box-active' : ''"
            @click="bigPageClick(index)">
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import kingMixin from 'BlockChain-ui/PC/common-mixin/home/swiper/lxg/lxg';
// import 'BlockChain-ui/PC/common-mixin/home/swiper/swiper.styl';
import 'BlockChain-ui/PC/common-mixin/home/swiper/lxg/lxg.styl';

export default {
  mixins: [kingMixin],
  created() {
  },
};
</script>
