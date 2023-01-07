<template v-if="homeEditReady">
  <div>
    <section v-if="homeHtml">
      <section v-html="homeHtml" class="interHome-custom"></section>
    </section>
    <section class="interHome-custom" v-if="!homeHtml && homeEditReady">
      <div class="navsBase c-5-bd">
        <div class="title f-1-cl">
          {{$t('homeTemplate.text_04')}}
        </div>
        <div class="mess">
          {{$t('homeTemplate.text_05')}}
        </div>
        <ul class="custom">
          <li class="custom-even-base" v-for="(item, index) in list" :key="index">
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
      <div class="appDownBase">
        <div class="appDownBase-center">
          <div class="text">
            <p class="text-1 z-1-cl">{{ $t('appDownLoad.title') }}</p>
            <p class="text-2 z-2-cl">{{ $t('appDownLoad.desc') }}</p>
          </div>
          <div class="appDownBase-button">
            <a class="b-2-bd b-8-cl appDownBase-but"
               href="/appDownload">
              <!-- <svg class="icon icon-40" aria-hidden="true">
                <use xlink:href="#icon-i_1"></use>
              </svg> -->
              <img :src="downloadIconUrl" alt="">
              {{ $t('homeTemplate.text_03') }}</a>
          </div>
          <div class="appDownBase-imgBox">
            <img :src="appImg" alt="">
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import commonMixin from 'BlockChain-ui/PC/common-mixin/home/custom/custom';
import mixin from 'BlockChain-ui/PC/common-mixin/home/custom/international/international';
import 'BlockChain-ui/PC/common-mixin/home/custom/custom.styl';
import 'BlockChain-ui/PC/common-mixin/home/custom/international/international.styl';


export default {
  mixins: [commonMixin, mixin],
  created() {
    this.init();
  },
};
</script>
