<template>
  <div class="user-management-change-phone fuz-card">
    <p class="user-management-child-header b-1-cl a-3-bd a-5-bg">
      <!-- 修改银行账号 -->
      <span v-if="krwUserBank">{{ $t('personal.krwBank.setBank') }}</span>
      <!-- 绑定银行账号 -->
      <span v-else>{{ $t('personal.krwBank.addBank') }}</span>
    </p>
    <div class="user-management-center a-5-bg">
      <p class="center-title b-7-cl"></p>
      <div class="center-input">
        <!-- 户名 -->
        <c-inputLine
          name="userName"
          inputType="text"
          :promptText="$t('personal.krwBank.userName')"
          :errorHave="true"
          :disabled="true"
          marginTop="0px"
          :value="userName"
        >
        </c-inputLine>
        <!-- 开户行 -->
        <c-select
          :value="backType"
          :promptText="$t('personal.krwBank.country')"
          @onChanges='backTypeChange'
          name="country"
          :errorHave="true"
          :options="backTypeOptions"
        />
        <!-- 银行账号 -->
        <c-inputLine
          name="bankAccount"
          inputType="text"
          :promptText="$t('personal.krwBank.bankAccount')"
          :errorHave="true"
          :errorText="$t('personal.krwBank.bankAccountError')"
          :errorFlag="bankAccountErrorFlag"
          marginTop="0px"
          :value="bankAccount"
          @onchanges="inputChanges"
        ></c-inputLine>
        <!-- 短信验证码 -->
        <c-inputLine
          v-if="OpenMobile"
          name="smsCode"
          maxLength="6"
          :promptText="$t('personal.krwBank.smsCode')"
          :errorHave="true"
          :errorText="$t('personal.krwBank.smsCodeError')"
          :errorFlag="smsCodeFlagErrorFlag"
          marginTop="0px"
          :value="smsCode"
          @onchanges="inputChanges"
        >
          <!-- 获取验证码 -->
          <c-getCode
            name="smsCode"
            @click="getCodeClick"
            buttonName="loginGetcodeBtn"/>
        </c-inputLine>
        <!-- 谷歌验证码 -->
        <c-inputLine
          v-if="OpenGoogle"
          name="googleCode"
          maxLength="6"
          :promptText="$t('personal.krwBank.googleCode')"
          :errorHave="true"
          :errorText="$t('personal.krwBank.googleCodeError')"
          :errorFlag="false"
          marginTop="0px"
          :value="googleCode"
          @onchanges="inputChanges"
        >
        </c-inputLine>
        <c-button type="solid"
          :loading="submitLoading"
          :big="true"
          paddingW="0px"
          :disabled="submitDisabled"
          marginTop="18px"
          height="40px"
          width="100%"
          @click="submit">{{$t('personal.tool.modify')}}</c-button>
      </div>
    </div>
  </div>
</template>

<script>
import mixin from 'BlockChain-ui/PC/common-mixin/personal/krwBank/krwBank';
import 'BlockChain-ui/PC/common-mixin/personal/krwBank/krwBank.styl';

export default {
  mixins: [mixin],
  mounted() {
    this.init();
  },
};
</script>
