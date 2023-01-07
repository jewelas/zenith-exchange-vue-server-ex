<template>
  <div class="user-management-bind-email a-5-bg">
    <p class="user-management-child-header b-1-cl a-3-bd">{{$t('personal.bindEmail.title')}}</p>
    <div class="user-management-center a-5-bg">
      <div class="center-input">
        <c-inputLine
          maxLength="100"
          name="email"
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
        <c-inputLine
          maxLength="6"
          name="emailCode"
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
            name="email"
            :autoStart="autoStart"
            @click="getCodeClick"
            buttonName="loginGetcodeBtn"/>
        </c-inputLine>
        <!--
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

          <c-getCode
            name="phone"
            :autoStart="autoStart"
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
        >
        </c-inputLine>
         -->
        <c-button type="solid"
                :big="true"
                :loading="loading"
                className=""
                paddingW="0px"
                :disabled="disabled"
                marginTop="18px"
                height="40px"
                width="100%"
                @click="btnLink">{{$t('personal.tool.bind')}}</c-button>
      </div>
    </div>
  </div>
</template>

<script>
import mixin from 'BlockChain-ui/PC/common-mixin/personal/BindEmail/BindEmail';
import 'BlockChain-ui/PC/common-mixin/personal/BindEmail/BindEmail.styl';

export default {
  mixins: [mixin],
  mounted() {
    this.init();
  },
};
</script>
