<template>
  <div class="user-management-excc-auth-form a-5-bg">
    <div class="loadinBox" v-if="isLoading">
      <c-loading size="60" />
    </div>
    <template v-else>
      <p class="checkbox-box">
        <c-checkBox
          :value="check1"
          @click="checkOne"
        />
        <span class="b-8-cl checkbox-text">I/We agree and acknowledge that:</span>
      </p>
      <div class="checkbox-content">
        <p class="item b-2-cl">
          <span>1.</span>I/We have been assessed by ECXX to be an accredited investor as
          described in section 4A(1)(a)(i), (ii), (iii) or (iv) of the Securities
          and Futures Act, Chapter 289 of Singapore. General Warning Accredited
          investors are assumed to be better informed, and better able to access
          resources to protect their own interests, and therefore require less
          regulatory protection. Investors who agree to be treated as accredited
          investors therefore forgo the benefit of certain regulatory safeguards.
          For example, issuers of securities are exempted from issuing a full
          prospectus registered with the Monetary Authority of Singapore in
          respect of offers that are made only to accredited investors, and
          intermediaries are exempted from a number of business conduct
          requirements when dealing with accredited investors. Investors should
          consult a professional adviser if they do not understand any consequence
          of being treated as an accredited investor
        </p>
        <p class="item b-2-cl">
          <span>2.</span>By declaring that I am/we are an accredited investor, we acknowledge
          that ECXX will rely on this declaration to be exempted from fulfilling
          the certain obligations under Securities and Futures (Licensing and
          Conduct of Business) Regulations (“SFR”). We know and understand the
          consequences of being treated as an accredited investor.
        </p>
        <p class="item b-2-cl">
          <span>3.</span>I/we acknowledge that I/we have received, read and understood and the
          contents of the Accredited Investor Declaration, including the General
          Warning, explanation of effect of being treated as an accredited
          investor under the consent provisions and choose to opt-in to be
          classified as an accredited investor for the purpose of all of the
          consent provisions. See explanation of effect.
        </p>
      </div>
      <div class="checkbox-box2">
        <c-checkBox :value="check2" @click="checkTwo" />
        <span class="b-8-cl checkbox-text"
          >I/We agree to extend the above declaration to opt in as an accredited
          investor to our custody partner, Propine, Singapore.</span
        >
      </div>
      <p class="tip-note b-2-cl">
        Note: You may at any time withdraw your consent in writing to us. And we
        will inform you separately of our acknowledgment and the date when we stop
        treating you as an accredited investor for the purposes of all of the
        consent provisions. Until such time, you would still be considered AI.
      </p>
      <div class="button-boxs">
        <c-button
          type="text"
          :big="true"
          marginTop="18px"
          height="40px"
          width="178px"
          @click="previous"
          >Previous
        </c-button>
        <c-button
          type="solid"
          :big="true"
          :disabled="part6bDisabled"
          marginTop="18px"
          height="40px"
          width="178px"
          @click="btnLink('7')"
          >Next
        </c-button>
      </div>
    </template>
  </div>
</template>

<script>
import mixin from 'BlockChain-ui/PC/common-mixin/personal/partSixb/partSixb';
import 'BlockChain-ui/PC/common-mixin/personal/partOne/common-part.styl';

export default {
  mixins: [mixin],
  created() {
    this.init();
  },
};
</script>
