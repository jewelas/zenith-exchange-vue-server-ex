<template>
  <div class="payment2">
    <c-inputLine
      name="userName"
      maxLength="50"
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
      name="bank"
      maxLength="50"
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
      name="branch"
      maxLength="50"
      :promptText="promptText3"
      :errorHave="true"
      :errorText="errorText3"
      :errorFlag="checkErrorFlag3"
      marginTop="0px"
      :value="checkValue3"
      @onchanges="inputChanges"
    >
    </c-inputLine>
    <c-inputLine
      name="account"
      maxLength="50"
      :promptText="promptText4"
      :errorHave="true"
      :errorText="errorText4"
      :errorFlag="checkErrorFlag4"
      marginTop="0px"
      :value="checkValue4"
      @onchanges="inputChanges"
    >
    </c-inputLine>
  </div>
</template>

<script>
/*
* bank: '开户行',
          branch: '开户支行(选填)',
          account: '银行账号',
*
* */
import mixin from 'BlockChain-ui/PC/common-mixin/personal/payments/payments2/payments2';
import 'BlockChain-ui/PC/common-mixin/personal/payments/payments2/payments2.styl';

export default {
  mixins: [mixin],
  mounted() {
    this.init();
  },
};


</script>
