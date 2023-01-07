<template>
  <div class="user-management-change-password fuz-card with-title">
    <p class="user-management-child-header fuz-card-title">
      {{$t('personal.changePassword.title')}}</p>
    <div class="user-management-center fuz-card-content">
      <p class="center-title b-7-cl">
        <svg class="icon icon-16" aria-hidden="true">
          <use xlink:href="#icon-c_2"></use>
        </svg>
        {{safetyTimeSet.is_open && safetyTimeSet.is_open.toString() === '1' ?
         $t('personal.prompt.text2', { number: safetyTimeSet.hour })
         : $t('personal.prompt.warningChangePassword') }}
      </p>
      <div class="center-input">
        <c-inputLine
          maxLength="20"
          name="oldPassword"
          inputType="password"
          :promptText="promptText1"
          :errorHave="true"
          :errorText="errorText1"
          :errorFlag="checkErrorFlag1"
          marginTop="0px"
          :value="checkValue1"
          @onchanges="inputChanges"
          @focus="checkFocus(1)"
        >
        </c-inputLine>
        <c-inputLine
          maxLength="20"
          name="newPassword"
          inputType="password"
          :promptText="promptText2"
          :errorHave="true"
          :errorText="errorText2"
          :errorFlag="checkErrorFlag2"
          marginTop="0px"
          :value="checkValue2"
          @onchanges="inputChanges"
          @focus="checkFocus(2)"
        >
        </c-inputLine>
        <c-inputLine
          maxLength="20"
          name="newPasswordAgain"
          inputType="password"
          :promptText="promptText3"
          :errorHave="true"
          :errorText="errorText3"
          :errorFlag="checkErrorFlag3"
          marginTop="0px"
          :value="checkValue3"
          @onchanges="inputChanges"
          @focus="checkFocus(3)"
        >
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
          @focus="checkFocus(4)"
        >
          <!-- 获取验证码 -->
          <c-getCode
            name="loginGetcode"
            :voiceOpen ="voiceSmsOpen"
            @click="getCodeClick"
            buttonName="loginGetcodeBtn"/>
        </c-inputLine>
        <c-inputLine
          v-if="googleCode"
          maxLength="6"
          name="googleCode"
          inputType="text"
          :promptText="promptText5"
          :errorHave="true"
          :errorText="errorText5"
          :errorFlag="checkErrorFlag5"
          marginTop="0px"
          :value="checkValue5"
          @onchanges="inputChanges"
          @focus="checkFocus(5)"
        >
        </c-inputLine>
        <c-button type="solid"
                :big="true"
                className=""
                paddingW="0px"
                :disabled="disabled"
                :loading="loading"
                marginTop="18px"
                height="40px"
                width="100%"
                @click="btnLink">{{$t('personal.tool.modify')}}</c-button>
      </div>
    </div>
  </div>
</template>

<script>
import mixin from 'BlockChain-ui/PC/common-mixin/personal/ChangePassword/ChangePassword';
import 'BlockChain-ui/PC/common-mixin/personal/ChangePassword/ChangePassword.styl';

export default {
  mixins: [mixin],
  mounted() {
    this.init();
  },
};
</script>
