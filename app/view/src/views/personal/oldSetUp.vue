<template>
  <div class="set-up">
    <p class="user-management-child-header b-2-cl a-3-bd">{{
      paymentList.length === 0
      ? this.$t('personal.setUp.title1')
      : this.$t('personal.setUp.title2')}}</p>
    <div class="center clearfix ">
            <p class="center-title b-7-cl" v-if="cardFlag && excheifFlag">
        <svg class="icon icon-16" aria-hidden="true">
          <use xlink:href="#icon-c_2"></use>
        </svg>{{$t('personal.setUp.hint')}}</p>
      <c-select
        v-show="set === 0"
        :value="collectionWays"
        :promptText="$t('personal.setUp.paymentMethods.text')"
        @onChanges='paymentsChange'
        name="collectionWays"
        :errorHave="true"
        :errorFlag="certificateTypeErrorFlag"
        :errorText="$t('personal.setUp.paymentMethods.errorText')"
        :options="certificateTypeList"
      />
      <c-inputLine
        v-show="set === 1"
        maxLength="6"
        name="smsCode"
        inputType="text"
        :promptText="$t('personal.setUp.paymentMethods.text')"
        :errorHave="true"
        :disabled="true"
        marginTop="0px"
        :value="this.obj.title"
      >
      </c-inputLine>
      <c-select
        v-if="excheifFlag && cardFlag"
        :value="paycoinsWays"
        :promptText="$t('personal.setUp.paymentMethods.text2')"
        @onChanges='paycoinsChange'
        name="paycoinsWays"
        :errorHave="true"
        :errorFlag="paycoinsTypeErrorFlag"
        :errorText="$t('personal.setUp.paymentMethods.errorText2')"
        :options="paycoinsTypeList"
      />
      <Payment1
        v-if="payment === 1"
        @callBack="callBack"
        :isModify="set"
        :payments="payments"/>
      <Payment2
        v-if="payment === 2"
        :isModify="set"
        @callBack="callBack"
        :payments="payments2"/>
        <Payment3
        v-if="payment === 3"
        :isModify="set"
        @callBack="callBack"
        :payments="payments3"/>
      <Payment4
        v-if="payment === 4"
        :isModify="set"
        @callBack="callBack"
        :payments="payments4"/>
      <Payment5
        v-if="payment === 5"
        :isModify="set"
        @callBack="callBack"
        :payments="payments5"/>
      <c-inputLine
        v-show="smsCode"
        maxLength="6"
        name="smsCode"
        inputType="text"
        :promptText="promptText1"
        :errorHave="true"
        :errorText="errorText1"
        :errorFlag="checkErrorFlag1"
        marginTop="0px"
        :value="checkValue1"
        @onchanges="inputChanges"
      >
        <!-- 获取验证码 -->
        <c-getCode
          name="phone"
          :autoStart="false"
          :voiceOpen ="voiceSmsOpen"
          @click="getCodeClick"
          buttonName="loginGetcodeBtn"/>
      </c-inputLine>
      <c-inputLine
        v-show="googleCode || enforceGoogleAuth"
        maxLength="6"
        name="googleCode"
        inputType="text"
        :promptText="promptText2"
        :errorHave="true"
        :errorText="errorText2"
        :errorFlag="checkErrorFlag2"
        marginTop="0px"
        :value="checkValue2"
        @onchanges="inputChanges"
      >
      </c-inputLine>
      <c-button
              :loading="loading"
              type="solid"
              :big="true"
              className=""
              paddingW="0px"
              :disabled="disabled"
              marginTop="18px"
              height="40px"
              width="100%"
              @click="btnLink">{{$t('personal.tool.submit')}}</c-button>
    </div>
  </div>
</template>
<script>
import mixin from 'BlockChain-ui/PC/common-mixin/personal/oldSetUp/SetUp';
import 'BlockChain-ui/PC/common-mixin/personal/oldSetUp/SetUp.styl';
import Payment1 from './payments/payment1.vue'; // 支付宝，微信
import Payment2 from './payments/payment2.vue'; // 银行卡
import Payment3 from './payments/payment3.vue'; // paypal
import Payment4 from './payments/payment4.vue'; // 其他
import Payment5 from './payments/payment5.vue'; // worldremit

export default {
  mixins: [mixin],
  components: {
    Payment1,
    Payment2,
    Payment3,
    Payment4,
    Payment5,
  },
  mounted() {
    this.init();
  },
};
</script>
