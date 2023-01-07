<template>
  <div class="user-management-close-google fuz-card">
    <p class="user-management-child-header fuz-card-title">{{$t('personal.closeGoogle.title')}}</p>
    <div class="user-management-center fuz-card-content">
      <div class="management-center">
      <c-inputLine
        name="smsCode"
        maxLength="6"
        inputType="text"
        :promptText="promptText2"
        :errorHave="true"
        :errorText="errorText2"
        :errorFlag="checkErrorFlag2"
        marginTop="0px"
        :value="checkValue2"
        @onchanges="inputChanges"
      >
        <!-- 获取验证码 -->
        <c-getCode
          name="smsCode"
          @click="getCodeClick"
          :voiceOpen ="voiceSmsOpen"
          :autoStart="false"
          buttonName="loginGetcodeBtn"/>
      </c-inputLine>
        <c-inputLine
          name="googleCode"
          maxLength="6"
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
      <c-button type="solid"
              :big="true"
              :loading = "loading"
              className=""
              paddingW="0px"
              :disabled="disabled"
              marginTop="18px"
              height="40px"
              width="100%"
              @click="btnLink">{{$t('personal.tool.submit')}}</c-button>
      </div>
    </div>
  </div>
</template>

<script>
import mixin from 'BlockChain-ui/PC/common-mixin/personal/CloseGoogle/CloseGoogle';
import 'BlockChain-ui/PC/common-mixin/personal/CloseGoogle/CloseGoogle.styl';

export default {
  mixins: [mixin],
};
</script>
