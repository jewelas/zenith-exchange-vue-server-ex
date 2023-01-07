<template>
  <div class="modify-api a-5-bg">
    <p class="modify-api-header b-2-cl a-3-bd">{{$t('personal.modifyApi.title')}}</p>
    <div class="center-inputs" v-show="divShow === 1">
      <c-inputLine name="ip"
                   inputType="text"
                   :promptText="promptText1"
                   :errorHave="true"
                   :errorText="errorText1"
                   :errorFlag="checkErrorFlag1"
                   marginTop="0px"
                   :value="checkValue1"
                   @onchanges="inputChanges"
      >
      </c-inputLine>
      <c-inputLine name="note"
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
      <c-inputLine v-show="smsCode"
                   maxLength="6"
                   name="phoneCode"
                   inputType="text"
                   :promptText="promptText3"
                   :errorHave="true"
                   :errorText="errorText3"
                   :errorFlag="checkErrorFlag3"
                   marginTop="0px"
                   :value="checkValue3"
                   @onchanges="inputChanges"
      >
        <!-- 获取验证码 -->
        <c-getCode
          name="phone"
          :autoStart="false"
          @click="getCodeClick"
          :voiceOpen ="voiceSmsOpen"
          buttonName="loginGetcodeBtn"/>
      </c-inputLine>
      <c-inputLine v-show="googleCode"
                   name="googleCode"
                   maxLength="6"
                   inputType="text"
                   :promptText="promptText4"
                   :errorHave="true"
                   :errorText="errorText4"
                   :errorFlag="checkErrorFlag4"
                   marginTop="0px"
                   :value="checkValue4"
                   @onchanges="inputChanges"
      >
      </c-inputLine>
      <c-button type="solid"
              :big="true"
              :loading="loading"
              className=""
              paddingW="0px"
              :disabled="disabled"
              marginTop="18px"
              height="40px"
              width="100%"
              @click="btnLink">{{$t('personal.tool.confirm')}}</c-button>
    </div>
  </div>
</template>
<script>
import mixin from 'BlockChain-ui/PC/common-mixin/personal/modifyApi/modifyApi';
import 'BlockChain-ui/PC/common-mixin/personal/modifyApi/modifyApi.styl';

export default {
  mixins: [mixin],
  mounted() {
    this.init();
  },
};
</script>
