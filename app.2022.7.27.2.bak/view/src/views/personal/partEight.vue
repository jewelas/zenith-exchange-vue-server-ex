<template>
  <div class="user-management-excc-auth-form a-5-bg">
    <div class="radio-box">
      <p class="item-text-8 b-2-cl">
        I/We hereby declare that the details furnished above in the Securities
        Token Investor Account Opening Form are true and correct to the best of
        my/our knowledge and belief and I/we undertake to inform you of any
        changes therein, immediately. In case any of the above information is
        found to be false or untrue or misleading or misrepresenting, I am/we
        are aware that I/we may be held liable for it .
      </p>
    </div>
    <div class="button-boxs">
      <c-button
        type="text"
        :big="true"
        marginTop="18px"
        height="40px"
        width="178px"
        @click="previous('7')"
        >Previous
      </c-button>
      <c-button
        type="solid"
        :big="true"
        :disabled="disabled"
        marginTop="18px"
        height="40px"
        width="178px"
        @click="submit"
        >Submit
      </c-button>
    </div>
  </div>
</template>

<script>
import mixin from 'BlockChain-ui/PC/common-mixin/personal/partEight/partEight';
import 'BlockChain-ui/PC/common-mixin/personal/partOne/common-part.styl';

export default {
  mixins: [mixin],
  created() {
    this.init();
  },
  destoryed() {
    this.timer = null;
  },
};
</script>
