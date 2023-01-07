<template>
  <div class="modify-settings">
    <p class="user-management-child-header b-1-cl a-3-bd">
      {{isCapitalPwordSet === 0
      ? $t('personal.modifySettings.setTitle')
      : $t('personal.modifySettings.modifyTitle') }}
    </p>
    <div class="center clearfix">
      <p class="center-title b-7-cl">
        <svg class="icon icon-16" aria-hidden="true">
          <use xlink:href="#icon-c_2"></use>
        </svg>
        {{safetyTimeSet.is_open && safetyTimeSet.is_open.toString() === '1' ?
         $t('personal.prompt.text4', { number: safetyTimeSet.hour })
         : $t('personal.prompt.warningPassword') }}
        </p>
      <c-inputLine
        maxLength="20"
        name="password"
        inputType="password"
        :promptText="moneyPassword"
        :errorHave="true"
        :errorText="errorText3"
        :errorFlag="checkErrorFlag3"
        marginTop="0px"
        :value="checkValue3"
        @onchanges="inputChanges"
      >
      </c-inputLine>
      <c-inputLine
        maxLength="20"
        name="passwordAgain"
        inputType="password"
        :promptText="confirmMoneyPassword"
        :errorHave="true"
        :errorText="errorText4"
        :errorFlag="checkErrorFlag4"
        marginTop="0px"
        :value="checkValue4"
        @onchanges="inputChanges"
      >
      </c-inputLine>
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
          @click="getCodeClick"
          :voiceOpen ="voiceSmsOpen"
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
      <c-button type="solid"
              :loading="loading"
              :big="true"
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
import mixin from 'BlockChain-ui/PC/common-mixin/personal/modifySettings/modifySettings';
import 'BlockChain-ui/PC/common-mixin/personal/modifySettings/modifySettings.styl';

export default {
  mixins: [mixin],
  mounted() {
    this.init();
  },
};
</script>
