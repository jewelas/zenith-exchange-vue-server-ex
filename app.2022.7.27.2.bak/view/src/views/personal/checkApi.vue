<template>
  <div class="check-api a-5-bg">
    <p class="check-api-header b-1-cl a-3-bd">{{$t('personal.checkApi.title')}}</p>
    <div class="center-inputs" v-show="divShow === 1">
      <c-inputLine
        v-show="smsCode"
        maxLength="6"
        name="phoneCode"
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
        v-show="googleCode"
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
    <div class="center-code" v-show="divShow === 2">
        <img :src="qrCode"/>
        <div class="a-4-bg">
          <p class="b-2-cl">SecretKey</p>
          <p class="b-1-cl">{{secretKey}}
            <span @click="copyClick('secretKey')"
                  @mouseenter="handMouseenter"
                  @mouseleave="handMouseleave">
              <span v-if="svgShow">
                <svg class="icon icon-14" aria-hidden="true">
                  <use xlink:href="#icon-a_9"></use>
                </svg>
              </span>
              <span v-else>
                <svg class="icon icon-14" aria-hidden="true">
                  <use xlink:href="#icon-a_9_1"></use>
                </svg>
              </span>
            </span>
          </p>
        </div>
    </div>
  </div>
</template>
<script>
import mixin from 'BlockChain-ui/PC/common-mixin/personal/checkApi/checkApi';
import 'BlockChain-ui/PC/common-mixin/personal/checkApi/checkApi.styl';

export default {
  mixins: [mixin],
  mounted() {
    this.init();
  },
};
</script>
