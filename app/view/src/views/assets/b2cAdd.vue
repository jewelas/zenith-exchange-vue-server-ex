<template>
  <section class="b2cAdd">
    <!-- 添加提币账户 -->
    <header class="addressMent-header b-1-cl a-3-bd">
      {{ nowType === 'add'
        ? $t('assets.b2c.addressAddTit')
        : $t('assets.b2c.addressSetTit') }}
    </header>
    <div class="b2cAdd-content">
      <!-- 法币币种 -->
      <c-inputLine
        :value="symbol"
        :promptText="$t('assets.b2c.lagel')"
        :disabled="true"
        :errorHave="true"/>
      <!-- 收款方式 -->
      <c-inputLine
        :promptText="$t('assets.b2c.firstWay')"
        :value="$t('assets.b2c.bankCard')"
        :disabled="true"
        :errorHave="true"/>
      <!-- 开户行 -->
      <c-select
        :value="bank"
        :filterable="true"
        :promptText="$t('assets.b2c.country')"
        name="country"
        :errorHave="true"
        :options="bankList"
        @onChanges="addressChange"
      />
      <!-- 开户支行 -->
      <c-inputLine
        name="bankSub"
        maxLength="64"
        :promptText="$t('assets.b2c.countrySub')"
        :value="bankSub"
        :errorHave="true"
        @onchanges="inputChanges"/>
      <!-- 银行账号 -->
      <c-inputLine
        name="cardNo"
        :promptText="$t('assets.b2c.countryNo')"
        maxLength="64"
        :value="cardNo"
        :errorHave="true"
        @onchanges="inputChanges"/>
      <!-- 收款人 -->
      <c-inputLine
        name="name"
        :promptText="$t('assets.b2c.addressUserName')"
        :value="name"
        :errorHave="true"
        :disabled="true"
        @onchanges="inputChanges"/>
      <c-inputLine
        v-if="OpenMobile"
        name="cms"
        :promptText="$t('assets.withdraw.phoneCode')"
        maxLength="6"
        :value="cms"
        :errorHave="true"
        :errorFlag="cmsErrorFlag"
        :errorText="$t('assets.withdraw.phoneCodeError')"
        @onchanges="inputChanges">
        <c-getCode
          name="withdrawGetcode"
          @click="getCodeClick"/>
      </c-inputLine>
      <c-inputLine
        v-if="OpenGoogle"
        name="google"
        :promptText="$t('assets.withdraw.googleCode')"
        maxLength="6"
        :value="google"
        :errorHave="true"
        :errorFlag="googleErrorFlag"
        :errorText="$t('assets.withdraw.googleCodeError')"
        @onchanges="inputChanges"/>
      <!-- 提交 -->
      <c-button
        :disabled="buttonDisable"
        :loading="btnLoading"
        @click="submit"
        marginTop="30px"
        width="100%">{{ $t('assets.b2c.submit') }}</c-button>
    </div>
    <c-verifyCationc-alert
      :imgMap="imgMap"
      :showFlag="alertFlag"
      :titleText="$t('assets.withdraw.safetyWarning')"
      :detaText="authTitleText"
      :dataList="alertData"
      :buttonText="$t('assets.withdraw.GotoOpen')"
      :haveClose="false"
      @close="alertClone"
      @confirm="alertGo"/>
  </section>
</template>

<script>
import b2cMixin from 'BlockChain-ui/PC/common-mixin/assets/b2cMixin/b2cMixin';
import mixin from 'BlockChain-ui/PC/common-mixin/assets/b2cAdd/b2cAdd';
import 'BlockChain-ui/PC/common-mixin/assets/b2cAdd/b2cAdd.styl';

export default {
  mixins: [b2cMixin, mixin],
  mounted() {
    this.init();
  },
};
</script>
