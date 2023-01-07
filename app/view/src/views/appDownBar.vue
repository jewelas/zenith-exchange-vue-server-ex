<template>
  <section class="home-appdown">
    <div ref="downBtn" style="display: none;">
      <a :href="downData.ios_download_url" v-if="iphone"> {{$t('options.download')}}</a>
      <a :href="downData.android_download_url" v-if="android"> {{$t('options.download')}}</a>
      <a href="javascript:volid(0);" v-if="wechat" @click="we">{{$t('options.download')}}</a>
    </div>
    <div class="recomed"
       style="background-color: #edf4f8"
      ref="downloadContainer"
      v-show="cloe"
      v-if="downData.logo && !isApp">
      <div class="close" @click="Close"
        style="background-color: #edf4f8">
        <svg class="icon icon-16" aria-hidden="true">
          <use xlink:href="#icon-c_7"></use>
        </svg>
      </div>
      <div class="recomed-cont">
        <div class="left b-3-cl" @click="junp">
            <img :src="downData.logo" alt="">
            <div class="recomed-text" style="color: #1F3F59">
               <div class="recomed-text-title">{{downData.company_name}}</div>
               <div class="recomed-text-warn">{{$t('appDownLoad.desc')}}</div>
            </div>
        </div>
        <div class="right">
          <div class="button a-12-bg" @click="junp">
              <a href="javascript:;" class="f-1-cl" v-if="iphone">{{ $t('h5Add.download') }}</a>
              <a href="javascript:;" class="f-1-cl" v-if="android">{{ $t('h5Add.download') }}</a>
              <a href="javascript:volid(0);" class="f-1-cl" v-if="wechat">
                {{ $t('h5Add.download') }}</a>
          </div>
        </div>
      </div>
    </div>
    <!-- 在微信下 -->
    <div class="mask_layer f-1-cl" v-if="mask">
      <div class="brower">
        <span>{{ $t('h5Add.downloadWarn1') }}</span>
        <p>{{ $t('h5Add.downloadWarn2') }}</p>
      <!-- <img src="/static/images/point.png" alt="" class="img"> -->
      </div>
    </div>
    <div class="kyc-all" v-if="kycFlag"></div>
  <div class="kyc-mark" v-if="kycFlag">
    <div class="kyc-mark-title">{{ kycTitle }}</div>
    <div class="kyc-mark-text">{{ kycMess }}</div>
    <div class="kyc-mark-bottom" @click="kycClose">返回交易所</div>
  </div>
  </section>
</template>

<script>
import mixin from 'BlockChain-ui/PC/common-mixin/appDownBar/appDownBar';
import 'BlockChain-ui/PC/common-mixin/appDownBar/appDownBar.styl';

export default {
  mixins: [mixin],
  created() {
    this.init();
  },
};
</script>
