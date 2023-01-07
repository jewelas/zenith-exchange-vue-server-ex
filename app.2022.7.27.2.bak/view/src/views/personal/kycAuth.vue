<template>
  <section class="common-keyAuth">
    <p class="user-management-child-header b-1-cl a-3-bd">{{$t('personal.idAuth.title')}}</p>
    <div class="keyAuth-loadingBox" v-if="loading"><c-loading size="60"/></div>
    <div v-else class="keyAuth-body">
      <!-- 请使用手机浏览器扫描下方二维码，打开实名认证界面 -->
      <div class="keyAuth-body-title b-1-cl">{{ $t('personal.kyc.kycAuth1') }}</div>
      <!-- 拍摄身份证正反面，并通过人脸识别即可完成认证 -->
      <div class="keyAuth-body-text">{{ $t('personal.kyc.kycAuth2') }}</div>
      <!-- 二维码 -->
      <div class="keyAuth-body-img b-1-bg"><img :src="qrCode" alt=""></div>
      <!-- 倒计时 -->
      <div class="keyAuth-body-time" v-if="!timeReload">
        {{ $t('personal.kyc.kycAuth3') }}：{{ showTime }}</div>
      <div class="keyAuth-body-time b-6-cl" v-else>{{ $t('personal.kyc.kycAuth4') }}</div>
      <!-- 已在手机上完成验证 -->
      <c-button
        height="40px"
        width="100%"
        :loading='statusLoading'
        @click="getStatus">{{ $t('personal.kyc.kycAuth5') }}</c-button>
      <!-- 想继续在当前界面完成认证？ -->
      <c-button marginTop="10px"
        type="text"
        v-if="forceAuto"
        @click="goIDauth">{{ $t('personal.kyc.kycAuth6') }}</c-button>
    </div>
    <kycAuthselect countryVal="156" countryKeyCodeVal="86" />
  </section>
</template>

<script>
import mixin from 'BlockChain-ui/PC/common-mixin/personal/kycAuth/kycAuth';
import 'BlockChain-ui/PC/common-mixin/personal/kycAuth/kycAuth.styl';
import kycAuthselect from './kycAuthselect.vue';

export default {
  mixins: [mixin],
  components: { kycAuthselect },
  mounted() {
    this.init();
  },
};
</script>
