<!--suppress ALL -->
<template>
  <div class="home-custom-template korea-template">
    <section v-if="homeHtml" v-html="homeHtml" class="interHome-custom"></section>
    <div class="interHome-custom japanese" v-if="!homeHtml && homeEditReady">
      <div class="static-content">
        <div class="downLoade">
          <div class="downLoade-bar">
            <p class="text-1">{{ $t('appDownLoad.title') }}</p>
            <div class="download-text" :style="downloadStyle">
              <div class="button-box">
                <c-button className="download-button"
                         @click="download('ios_ipa')"
                         paddingW="24px"
                         width="200px"
                         height="50px">
                  <svg class="icon icon-30" aria-hidden="true">
                    <use xlink:href="#icon-b_13"></use>
                  </svg>
                  &nbsp;
                  {{$t('appDownLoad.platform')[0]}}
                </c-button>
                <c-button className="download-button no-margin"
                         @click="download('android')"
                         paddingW="24px"
                         width="200px"
                         height="50px">
                  <svg class="icon icon-30" aria-hidden="true">
                    <use xlink:href="#icon-b_14"></use>
                  </svg>
                  &nbsp;
                  {{$t('appDownLoad.platform')[1]}}
                </c-button>
              </div>
              <div v-for="(item, index) in navList"
                   :key="index"
                   class="text-item"
                   :class="'text-item-' + index">
                <h4>{{item.title}}</h4>
                <p>{{item.desc}}</p>
              </div>
            </div>
          </div>
        </div>
        <div class="product-info">
          <h2>{{$t('homeTemplate.text_04')}}</h2>
          <p class="market">{{$t('homeTemplate.text_05')}}</p>
          <div class="block-bar clearfix">
            <div class="img">
              <img class="custom-even-img" :src="ko4Img" alt="">
            </div>
            <div class="info-list">
              <ul class="custom">
                <li class="custom-even clearfix" v-for="(item, index) in list" :key="index">
                  <div class="custom-even-rp custom-even-imgBox">
                    <img class="custom-even-img" :src="item.img" alt="">
                  </div>
                  <div class="custom-even-rp custom-even-text">
                    <div class="custom-title f-1-cl">{{ item.title }}</div>
                    <div class="custom-mess">{{ item.mess }}</div>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div class="auth">
          <h2>{{$t('korea.authenticate.title')}}</h2>
          <p class="market">{{$t('korea.authenticate.desc')}}</p>
          <div class="auth-img clearfix">
            <div><img :src="authImg" alt=""></div>
            <div class="auth-text">
              <div class="tit">{{$t('korea.authenticate.system.title')}}</div>
              <p>{{$t('korea.authenticate.system.desc')}}</p>
            </div>
            <div class="auth-text auth-text2">
              <div class="tit">{{$t('korea.authenticate.iso.title')}}</div>
              <p>{{$t('korea.authenticate.iso.desc')}}</p>
            </div>
          </div>
        </div>
      </div>
      <div class="contact clearfix">
        <div class="contact-item contact-item1">
          <div class="tit">
            <img :src="ko6CImg.ko61" alt="" class="t-icon">
            {{$t('korea.service.center.title')}}
          </div>
          <div class="main">
            <p class="phone" v-if="publicInfo">{{publicInfo.msg.contact_number}}</p>
            <p class="text">{{$t('korea.service.center.time')}}</p>
          </div>
        </div>
        <div class="contact-item contact-item2">
          <div class="tit">
            <img :src="ko6CImg.ko62" alt="" class="t-icon">
            {{$t('korea.service.online.title')}}
          </div>
          <div class="main">
            <p class="text">{{$t('korea.service.online.desc')}}</p>
            <p class="text">{{$t('korea.service.online.time')}}</p>
          </div>
        </div>
        <div class="contact-item contact-item3">
          <div class="tit">
            <img :src="ko6CImg.ko63" alt="" class="t-icon">
            {{$t('korea.download.title')}}
          </div>
          <div class="main" clearfix>
            <div class="erwm">
              <img :src="ko6CImg.ko64" alt="">
            </div>
            <div class="button">
              <div class="button-btn" @click="download('ios_ipa')">
                <img :src="ko6CImg.ko65" alt="" class="dicon">
                {{$t('appDownLoad.platform')[0]}}
              </div>
              <div class="button-btn"  @click="download('ios_ipa')">
                <img :src="ko6CImg.ko66" alt="" class="dicon">
                {{$t('appDownLoad.platform')[1]}}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import commonMixin from 'BlockChain-ui/PC/common-mixin/home/custom/custom';
import 'BlockChain-ui/PC/common-mixin/home/custom/custom.styl';
import mixin from 'BlockChain-ui/PC/common-mixin/home/custom/korea/korea';
import 'BlockChain-ui/PC/common-mixin/home/custom/korea/korea.styl';

export default {
  mixins: [commonMixin, mixin],
  created() {
    this.init();
  },
};
</script>
