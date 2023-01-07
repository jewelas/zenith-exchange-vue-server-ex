<template>
  <div class="code-modal" :v-show="showCodeFlag">
    <div class="bg"></div>
    <div class="card">
      <div class="close" @click="closeFn"><img src="http://dev-saas-oss.oss-cn-hongkong.aliyuncs.com/upload/20220608201525875.png" alt="" /></div>
      <p class="title">{{ $t("invitePrize.modalQRCode_title") }}</p>
      <div class="code">
        <div class="qr-code">
          <img :src="imgBase64" width="95%" alt="" />
        </div>
        <div class="invite-code">
          <p>{{ $t("invitePrize.invite_code") }}</p>
          <div>{{ code }}</div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import mixin from 'BlockChain-ui/PC/common-mixin/promotion/QRCode/QRCode';
import 'BlockChain-ui/PC/common-mixin/promotion/QRCode/QRCode.styl';

export default {
  mixins: [mixin],
  props: {
    showCodeFlag: { default: false, type: Boolean },
    imgBase64: { default: '', type: String },
    code: { default: '', type: String },
    backgroundImg: { default: '', type: String },
  },
  mounted() {
    this.init();
  },
};
</script>
