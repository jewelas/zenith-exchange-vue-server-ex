<template>
 <div>
   <!-- 选择认证方式 -->
    <c-dialog :showFlag="kycExccFlag"
      paddingBottom="14px"
      :titleText="$t('personal.exccAuth.text2')"
      @close="kycExccClose"
      @confirm="kycExccConfirm"
      :confirmLoading="kycLoading">
      <div class="select-box">
        <div class="select-block a-4-bg" @click="clickSlectType('1')">
          <c-redio :value="exccAuthType === '1'" />
          <div class="img"><img class="imgExccAuthType1" :src="imgExccAuthType1" alt=""></div>
          <h4 class="b-1-cl">{{$t('personal.exccAuth.text3')}}</h4>
          <div class="text">
            <p>{{$t('personal.exccAuth.text5')}}</p>
            <p>{{$t('personal.exccAuth.text6')}}</p>
          </div>
        </div>
        <div class="select-block select-block2 a-4-bg" @click="clickSlectType('2')">
          <c-redio :value="exccAuthType === '2'" />
          <div class="img"><img class="imgExccAuthType2" :src="imgExccAuthType2" alt=""></div>
          <h4 class="b-1-cl">{{$t('personal.exccAuth.text4')}}</h4>
          <div class="text">
            <p>{{$t('personal.exccAuth.text7')}}</p>
            <p>{{$t('personal.exccAuth.text8')}}</p>
          </div>
        </div>
      </div>
    </c-dialog>
 </div>
</template>

<script>
import mixin from 'BlockChain-ui/PC/common-mixin/personal/kycAuthselect/kycAuthselect';
import 'BlockChain-ui/PC/common-mixin/personal/kycAuthselect/kycAuthselect.styl';

export default {
  mixins: [mixin],
  mounted() {
    this.init();
  },
};
</script>
