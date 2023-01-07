<template>
  <div>
    <section v-if="homeHtml">
      <section v-html="homeHtml" class="interHome-custom"></section>
    </section>
    <section class="europeHome-custom" v-if="!homeHtml && homeEditReady">
      <div class="custom-bg">
        <h2 class="custom-title">{{$t('europe.product.title')}}</h2>
        <p class="custom-maker">{{$t('europe.product.desc')}}</p>
        <div class="product-inof clearfix">
          <div class="pro-img">
            <img :src="imgList.omProImg1" alt="">
          </div>
          <div class="pro-text">
            <div class="info-item clearfix" v-for="(item, inx) in productList" :key="inx">
              <div class="info-icon">
                <img :src="imgList[`omApp${inx + 1}`]" alt="">
              </div>
              <div class="info-text">
                <div class="tit">{{item.title}}</div>
                <p class="txt">
                  {{item.desc}}
                </p>
              </div>
            </div>
            <div class="down-block">
              <div class="down-btn">
                <span class="hover-bg"></span>
                <img :src="imgList.omBtn1" alt="">
              </div>
              <div class="down-btn down-btn-2">
                <span class="hover-bg"></span>
                <img :src="imgList.omBtn2" alt="">
              </div>
              <div class="ewm">
                <span class="hove-hide"><img :src="imgList.omEwm" alt=""></span>
                <span class="hove-show"><img :src="imgList.omEwm2" alt=""></span>
                <div class="bug-ewm" v-if="appDownload">
                  <span class="ewm-img"><img :src="appDownload.app_page_url" alt=""></span>
                  <p>Scanning Download</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="product-ser-box">
        <div class="product-ser">
          <div class="clearfix">
            <div class="text">
              <h2 class="title">{{$t('europe.serviceDetail.title')}}</h2>
              <p class="maker">{{$t('europe.serviceDetail.desc')}}</p>
            </div>
            <div class="img">
              <img :src="imgList.omImg" alt="">
            </div>
          </div>
          <div class="label-block clearfix">
            <div class="label-item" v-for="(item, inx) in serviceList"
                 :key="inx"
                 :class="lastItem(serviceList, inx)">
              <img :src="imgList[`omBicon${inx + 1}`]" >
              {{item}}
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import commonMixin from 'BlockChain-ui/PC/common-mixin/home/custom/custom';
import mixin from 'BlockChain-ui/PC/common-mixin/home/custom/europe/europe';
import 'BlockChain-ui/PC/common-mixin/home/custom/europe/europe.styl';
import 'BlockChain-ui/PC/common-mixin/home/custom/custom.styl';

export default {
  mixins: [commonMixin, mixin],
  created() {
    this.init();
  },
};
</script>
