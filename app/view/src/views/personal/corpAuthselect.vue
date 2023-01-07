<template>
  <div>
    <!-- 选择认证方式 -->
    <c-dialog
      :showFlag="corpExccFlag"
      paddingBottom="14px"
      :titleText="$t('personal.exccAuth.text2')"
      @close="kycExccClose"
      @confirm="kycExccConfirm"
      :confirmLoading="kycLoading"
    >
      <div class="corp-select-box">
        <div class="select-block a-4-bg" @click="clickSlectType('1')">
          <c-redio :value="exccAuthType === '1'" />
          <div class="img">
            <img class="imgExccAuthType1" :src="imgExccAuthType1" alt="" />
          </div>
          <h4 class="b-1-cl">{{ $t("personal.exccAuth.text3") }}</h4>
          <div class="text">
            <p>{{ $t("personal.exccAuth.text5") }}</p>
            <p>{{ $t("personal.exccAuth.text6") }}</p>
          </div>
        </div>
        <div
          class="select-block select-block2 a-4-bg"
          @click="clickSlectType('2')"
        >
          <c-redio :value="exccAuthType === '2'" />
          <div class="img">
            <img class="imgExccAuthType2" :src="imgExccAuthType2" alt="" />
          </div>
          <h4 class="b-1-cl">Proceed with CorpPass</h4>
          <div class="text">
            <p></p>
            <p>By using CorpPass profile data to pre-fill the application form,it will make
              the application process smoother and faster.</p>
          </div>
        </div>
      </div>
    </c-dialog>
  </div>
</template>

<script>
import mixin from 'BlockChain-ui/PC/common-mixin/personal/corpAuthselect/corpAuthselect';
import 'BlockChain-ui/PC/common-mixin/personal/corpAuthselect/corpAuthselect.styl';

export default {
  mixins: [mixin],
  mounted() {
    this.init();
  },
};
</script>
