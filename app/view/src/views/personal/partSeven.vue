<template>
  <div class="user-management-excc-auth-form a-5-bg">
    <div class="radio-box">
      <p class="title">
        ECXX provide this risk warning to you as a customer of a Securities
        Tokens service provider, you should be aware of the following:
      </p>
      <p class="item-text">
        1.We are permitted to operate in a sandbox only for the period from 15
        August 2020 to 14 May 2021 (“Sandbox Period”), to only conduct the
        activity of establishing or operating an organised market regulated
        under the Securities and Futures Act (Cap. 289) (“SFA”).
      </p>
      <p class="item-text">
        2.We are exempted by MAS from complying with the full legal and
        regulatory requirements under the SFA, during the Sandbox Period.
      </p>
      <p class="item-text">
        3.We are not supervised by MAS during the Sandbox Period. Our operation
        of its organised market may be discontinued by us, or where MAS has
        concerns about us, it may require us to discontinue the operation of its
        organised market, during the Sandbox Period.
      </p>
      <p class="item-text">
        4.Our continued operations after the Sandbox Period would be subjected
        to us obtaining the required regulatory approvals from MAS. We may
        decide to discontinue its service after the Sandbox Period.
      </p>
      <p class="item-text">
        5.You are aware that you have no access to the dispute resolution scheme
        managed by the Financial Industry Disputes Resolution Centre (FIDReC).
      </p>
      <p class="item-text">
        6.We are exempted by MAS from complying with the full legal and
        regulatory requirements under the SFA, during the Sandbox Period.
      </p>
      <p class="item-text">
        7.We are not supervised by MAS during the Sandbox Period. Our operation
        of its organised market may be discontinued by us, or where MAS has
        concerns about us, it may require us to discontinue the operation of its
        organised market, during the Sandbox Period.
      </p>
      <p class="item-text">
        8.Our continued operations after the Sandbox Period would be subjected
        to us obtaining the required regulatory approvals from MAS. We may
        decide to discontinue its service after the Sandbox Period.
      </p>
    </div>
    <div class="button-boxs">
      <c-button
        type="text"
        :big="true"
        marginTop="18px"
        height="40px"
        width="178px"
        @click="previous('6B')"
        >Previous
      </c-button>
      <c-button
        type="solid"
        :big="true"
        marginTop="18px"
        height="40px"
        width="178px"
        @click="btnLink('8')"
        >I/We Acknowledged
      </c-button>
    </div>
  </div>
</template>

<script>
import mixin from 'BlockChain-ui/PC/common-mixin/personal/partSeven/partSeven';
import 'BlockChain-ui/PC/common-mixin/personal/partOne/common-part.styl';

export default {
  mixins: [mixin],
  created() {
    this.init();
  },
};
</script>
