<template>
  <div class="download-container f-2-cl" v-if="flag" :style="mainBg">
    <div class="download-options c-5-bd">
      <div class="download-options-logo">
        <img :src="appDownload.logo" alt="">
      </div>
      <p class="download-options-name f-8-cl">
        {{ $t('appDownLoad.title') }}
      </p>
      <!-- 随时随地 多平台终端交易 -->
      <p class="download-options-text">{{ $t('appDownLoad.desc') }}</p>
      <div class="download-options-buttons">
        <c-button
          v-if="iphone&&appDownload.ios_testFlight_url"
          className="download-button test-filght"
          @click="downloadTestFilght('iphone')">
          <svg class="icon icon-18" aria-hidden="true">
            <use xlink:href="#icon-b_42"></use>
          </svg>
          &nbsp;
          {{$t('appDownLoad.testFilght')}}
        </c-button>
        <c-button
          v-else-if="iphone"
          className="download-button"
          @click="download('iphone')">
          <svg class="icon icon-18" aria-hidden="true">
            <use xlink:href="#icon-b_13"></use>
          </svg>
          &nbsp;
          {{$t('appDownLoad.platform')[0]}}
        </c-button>
        <c-button
          v-else
          className="download-button"
          @click="download('android')">
          <svg class="icon icon-18" aria-hidden="true">
            <use xlink:href="#icon-b_14"></use>
          </svg>
          &nbsp;
          {{$t('appDownLoad.platform')[1]}}
        </c-button>
      </div>
    </div>
    <div class="download-nav c-5-bd">
      <ul class="download-nav-list clearfix">
        <li v-for="(item, index) in navList"
          :key="index"
          class="download-nav-even clearfix">
          <img :src="item.url" alt=""
            class="download-nav-img">
          <div class="download-nav-mode">
            <p class="download-nav-title f-1-cl">{{item.title}}</p>
            <p class="download-nav-text">{{item.desc}}</p>
          </div>
        </li>
      </ul>
    </div>
    <div class="download-step" v-if="iphone">
      <!-- iOS 用户安装教程 -->
      <p class="download-step-title f-1-cl">{{ $t('appDownLoad.setUp.title') }}</p>
      <ul class="download-step-list">
        <li v-for="(item, index) in stepList"
          :key="index"
          class="download-step-even">
          <div class="download-step-label">{{ item.step }}</div>
          <div class="download-step-mode c-5-bd">
            <p class="download-step-h f-1-cl">{{ item.title }}</p>
            <p class="download-step-t">{{ item.desc }}</p>
          </div>
          <div class="download-step-img c-5-bg">
            <img :src="item.url" alt="">
          </div>
        </li>
      </ul>
    </div>
    <!-- 在微信下 -->
    <div class="mask_layer f-1-cl" v-if="wechat">
      <div class="brower">
        <span>点击右上角</span>
        <p>选择“在浏览器中打开”</p>
      <!-- <img src="/static/images/point.png" alt="" class="img"> -->
      </div>
    </div>
    <a :href="appDownload.ios_download_url" ref="iphone" v-if="iphone"></a>
    <a :href="appDownload.android_download_url" ref="android" v-else></a>
  </div>
</template>

<script>
import mixin from 'BlockChain-ui/PC/common-mixin/h5appDownload/h5appDownload';
import 'BlockChain-ui/PC/common-mixin/h5appDownload/h5appDownload.styl';

export default {
  mixins: [mixin],
  created() {
    this.init();
  },
};
</script>
