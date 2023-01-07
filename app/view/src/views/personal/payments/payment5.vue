<template>
  <div class="payment5">
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
import mixin from 'BlockChain-ui/PC/common-mixin/personal/payments/payments5/payments5';
import 'BlockChain-ui/PC/common-mixin/personal/payments/payments5/payments5.styl';

export default {
  mixins: [mixin],
  mounted() {
    this.init();
  },
};


</script>
