<template>
  <div class="personal-bankCard fuz-card">
    <p class="user-management-child-header fuz-card-title">{{ title }}</p>
    <div class="bankCard-form fuz-card-content">
      <div class="select-fiat b-2-cl">{{$t('fiatAccount.selectFiat')}}</div>
      <ul class="fiat-list">
        <li class="fiat-item" v-for="(item, index) in fiatSymbolList" :key ='index'>
          <c-checkBox
            :value="supportSymbols.indexOf(item.symbol) > -1"
            @click='checkSymbol(item)' />
            {{item.symbol}}
        </li>
      </ul>
      <c-newSelect
        :value="bank"
        type="icon"
        :promptText="$t('fiatAccount.selectBank')"
        @onChanges='bankChange'
        :errorHave="true"
        name="bank"
        :options="bankList"
        :filterable="true"
        :disabled="type === 'modify'"
      ></c-newSelect>
      <c-inputLine
        name="bankAccount"
        :promptText="$t('fiatAccount.prompt')"
        :errorHave="true"
        marginTop="0px"
        :value="bankAccount"
        @onchanges="inputChanges"
      ></c-inputLine>
      <c-inputLine
        name="bankCardNum"
        :promptText="$t('fiatAccount.bankCardNum')"
        :errorHave="true"
        marginTop="0px"
        :value="bankCardNum"
        @onchanges="inputChanges"
      ></c-inputLine>
      <c-inputLine
        name="remark"
        :promptText="remarkPrompt"
        :errorHave="true"
        marginTop="0px"
        :value="remark"
        @onchanges="inputChanges"
      ></c-inputLine>
      <c-inputLine
        v-show="isShowSmsCode"
        maxLength="6"
        name="smsCode"
        inputType="text"
        :promptText="$t('personal.label.smsCodeText')"
        :errorHave="true"
        marginTop="0px"
        :value="smsCode"
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
        v-show="isShowGoogleCode || enforceGoogleAuth"
        maxLength="6"
        name="googleCode"
        inputType="text"
        :promptText="$t('personal.label.googleCodeText')"
        :errorHave="true"
        marginTop="0px"
        :value="googleCode"
        @onchanges="inputChanges"
      >
      </c-inputLine>
      <c-button
        type="solid"
        :big="true"
        className="fuz-primary-btn"
        paddingW="0px"
        :disabled="!canSubmit"
        marginTop="18px"
        height="40px"
        width="100%"
        @click="submit">{{$t('personal.tool.submit')}}
      </c-button>
    </div>
    <!-- 提示框 -->
    <c-verifyCationc-alert
      :showFlag="alertFlag"
      :imgMap="imgMap"
      :titleText="$t('assets.withdraw.safetyWarning')"
      :detaText="authTitleText"
      :dataList="alertData"
      :buttonText="$t('assets.withdraw.GotoOpen')"
      @close="alertClone"
      @confirm="alertGo"/>
  </div>
</template>
<script>
import mixin from 'BlockChain-ui/PC/common-mixin/personal/bindBankCard/index';
import 'BlockChain-ui/PC/common-mixin/personal/bindBankCard/index.styl';

export default {
  mixins: [mixin],
  mounted() {
    this.init();
  },
};
</script>
