<template>
  <c-dialog :showFlag="transferFlag"
    :titleText="$t('assets.leverageRepayment.title')"
    :confirmLoading="transferConfirmLoading"
    :confirmDisabled="transferConfirmDisabled"
    @close="transferDialogClose"
    @confirm="transferDialogConfirm">
    <section class="repayment-box">
      <ul class="repayment-list">
        <!-- 杠杆账户 -->
        <li class="a-4-bg">
          <span class="key">{{ $t('assets.leverageRepayment.symbol') }}</span>
          <span class="value b-1-cl">{{ getShowSymbol(transferObj.name) }}</span>
        </li>
        <!-- 归还币种 -->
        <li class="a-4-bg">
          <span class="key">{{ $t('assets.leverageRepayment.coin') }}</span>
          <span class="value b-1-cl">{{ getShowCoin(repaymentMess.coin) }}</span>
        </li>
        <!-- 应还数量 -->
        <li class="a-4-bg">
          <span class="key">{{ $t('assets.leverageRepayment.Surplus') }}</span>
          <span class="value b-1-cl">
            {{ repaymentMess.Surplus | fixDReturnFn(this) }}
             {{ getShowCoin(repaymentMess.coin) }}</span>
        </li>
        <!-- 借贷数量 -->
        <li class="a-4-bg">
          <span class="key">{{ $t('assets.leverageRepayment.sum') }}</span>
          <span class="value b-1-cl">
            {{ repaymentMess.sum | fixDFn(this) }} {{ getShowCoin(repaymentMess.coin) }}
          </span>
        </li>
        <!-- 利息 -->
        <li class="a-4-bg">
          <span class="key">{{ $t('assets.leverageRepayment.rate') }}</span>
          <span class="value b-1-cl">
            {{ repaymentMess.rate | fixDReturnFn(this) }} {{ getShowCoin(repaymentMess.coin) }}
          </span>
        </li>
      </ul>
      <!-- 归还数量 -->
      <c-inputLine
        name='transferValue'
        :value="transferValue"
        :promptText="$t('assets.leverageRepayment.RepaymentNum')"
        :errorHave="true"
        :errorFlag="inputMess.showError"
        :errorText="inputMess.text"
        :warningText="transferWarningText"
        @onchanges="inputLineChange">
        <c-button type="text" height="30px" @click="allTransfer">
          {{ $t('assets.otcAccount.all') }}
        </c-button>
      </c-inputLine>
    </section>
  </c-dialog>
</template>
<script>
import mixin from 'BlockChain-ui/PC/common-mixin/assets/leverageRepayment/leverageRepayment';
import 'BlockChain-ui/PC/common-mixin/assets/leverageRepayment/leverageRepayment.styl';

export default {
  mixins: [mixin],
  mounted() {
    this.init();
  },
};
</script>
