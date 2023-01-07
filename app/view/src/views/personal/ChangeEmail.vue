<template>
  <div class="user-management-change-email fuz-card">
    <p class="user-management-child-header fuz-card-title">
      {{$t('personal.changeEmail.title')}}</p>
    <div class="user-management-center">
      <p class="center-title b-7-cl">
        <svg class="icon icon-16" aria-hidden="true">
          <use xlink:href="#icon-c_2"></use>
        </svg>
        {{safetyTimeSet.is_open && safetyTimeSet.is_open.toString() === '1' ?
         $t('personal.prompt.text3', { number: safetyTimeSet.hour })
         : $t('personal.prompt.warningChangeEmail') }}
      </p>
      <div class="center-input">
        <c-inputLine
          name="oldEmail"
          inputType="text"
          :promptText="promptText1"
          :errorHave="true"
          :disabled="true"
          errorText="errorText1"
          :errorFlag="checkErrorFlag1"
          marginTop="0px"
          :value="checkValue1"
          @onchanges="inputChanges"
        >
        </c-inputLine>
        <c-inputLine
          maxLength="6"
          name="oldEmailCode"
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
            name="oldEmailCode"
            @click="getCodeClick"
            :autoStart="false"
            buttonName="loginGetcodeBtn"/>
        </c-inputLine>
        <c-inputLine
          maxLength="100"
          name="newEmail"
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
        <c-inputLine
          maxLength="6"
          name="newEmailCode"
          inputType="text"
          :promptText="promptText6"
          :errorHave="true"
          :errorText="errorText6"
          :errorFlag="checkErrorFlag6"
          marginTop="0px"
          :value="checkValue6"
          @onchanges="inputChanges"
        >
          <!-- 获取验证码 -->
          <c-getCode
            name="newEmailCode"
            @click="getCodeClick"
            :autoStart="false"
            buttonName="loginGetcodeBtn"/>
        </c-inputLine>
        <c-inputLine
          v-if="smsCode"
          maxLength="6"
          name="smsCode"
          inputType="text"
          :promptText="promptText4"
          :errorHave="true"
          :errorText="errorText4"
          :errorFlag="checkErrorFlag4"
          marginTop="0px"
          :value="checkValue4"
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
          v-if="googleCode"
          name="googleCode"
          maxLength="6"
          inputType="text"
          :promptText="promptText5"
          :errorHave="true"
          :errorText="errorText5"
          :errorFlag="checkErrorFlag5"
          marginTop="0px"
          :value="checkValue5"
          @onchanges="inputChanges"
        >
        </c-inputLine>
        <c-button type="solid"
                :loading="loading"
                :big="true"
                className="fuz-primary-btn"
                paddingW="0px"
                :disabled="disabled"
                marginTop="18px"
                height="40px"
                width="100%"
                @click="btnLink">{{$t('personal.tool.modify')}}</c-button>
      </div>
    </div>
  </div>
</template>

<script>
import mixin from 'BlockChain-ui/PC/common-mixin/personal/ChangeEmail/ChangeEmail';
import 'BlockChain-ui/PC/common-mixin/personal/ChangeEmail/ChangeEmail.styl';

export default {
  mixins: [mixin],
  mounted() {
    this.init();
  },
};
</script>
