<template>
    <div class="payment1">
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
      <c-select
        :value="mobile"
        :promptText="$t('personal.setUp.paymentMethods.paymentsWA.type')"
        @onChanges='typeChanges'
        :errorHave="true"
        name="mobile"
        :options="mobileList"
      />
      <c-inputLine
        name="account"
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
    </div>
</template>

<script>
import mixin from 'BlockChain-ui/PC/common-mixin/personal/payments/payments4/payments4';
import 'BlockChain-ui/PC/common-mixin/personal/payments/payments4/payments4.styl';

export default {
  mixins: [mixin],
  mounted() {
    this.init();
  },
};
</script>
