<template>
  <section v-if="homeHtml">
    <section v-html="homeHtml" class="interHome-custom"></section>
  </section>
  <section class="interHome-custom" v-else>
    <div class="navs c-5-bd">
      <div class="title f-1-cl">
        {{$t('homeTemplate.text_04')}}
      </div>
      <div class="mess">
        {{$t('homeTemplate.text_05')}}
      </div>
      <ul class="custom">
        <li class="custom-even" v-for="(item, index) in list" :key="index">
          <div class="custom-even-rp custom-even-text">
            <div class="custom-title f-1-cl">{{ item.title }}</div>
            <div class="custom-mess">{{ item.mess }}</div>
          </div>
          <div class="custom-even-rp custom-even-imgBox">
            <img class="custom-even-img" :src="item.img" alt="">
          </div>
        </li>
      </ul>
    </div>
    <div class="appDown" :style="backgroundImg">
      <div class="appDown-center">
        <div class="appDown-imgBox">
          <img :src="appImg" alt="">
        </div>
        <div class="appDown-mess" v-if="flag">
          <div class="appDown-logo">
            <img :src="appDownload.logo" alt="">
          </div>
          <p class="appDown-name f-8-cl">
            {{ $t('appDownLoad.title') }}
          </p>
          <!-- 随时随地 多平台终端交易 -->
          <p class="appDown-text">{{ $t('appDownLoad.desc') }}</p>
          <p class="appDown-type">iOS | Android</p>
          <div class="appDown-button">
            <a class="f-8-bd f-8-cl appDown-but"
               href="/appDownload">{{ $t('homeTemplate.text_03') }}</a>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import commonMixin from 'BlockChain-ui/PC/common-mixin/home/custom/custom';
import mixin from 'BlockChain-ui/PC/common-mixin/home/custom/biki/biki';
import 'BlockChain-ui/PC/common-mixin/home/custom/biki/biki.styl';

export default {
  mixins: [commonMixin, mixin],
  created() {
    this.init();
  },
};
</script>
