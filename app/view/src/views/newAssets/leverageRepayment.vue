<template>
  <c-v5-dialog
    :showFlag="transferFlag"
    paddingBottom="32px"
    :titleText="$t('assets.leverageRepayment.title')"
    :confirmLoading="transferConfirmLoading"
    :confirmDisabled="transferConfirmDisabled"
    @close="transferDialogClose"
    @confirm="transferDialogConfirm">
    <section class="v5-repayment-box">
      <ul class="repayment-list">
        <!-- 杠杆账户 -->
        <li class="v5-9-bg">
          <span class="key">{{ $t('assets.leverageRepayment.symbol') }}</span>
          <span class="value v5-5-cl">{{ getShowSymbol(transferObj.name) }}</span>
        </li>
        <!-- 归还币种 -->
        <li class="v5-9-bg">
          <span class="key">{{ $t('assets.leverageRepayment.coin') }}</span>
          <span class="value v5-5-cl">{{ getShowCoin(repaymentMess.coin) }}</span>
        </li>
        <!-- 应还数量 -->
        <li class="v5-9-bg">
          <span class="key">{{ $t('assets.leverageRepayment.Surplus') }}</span>
          <span class="value v5-5-cl">
            {{ repaymentMess.Surplus | fixDReturnFn(this) }}
             {{ getShowCoin(repaymentMess.coin) }}</span>
        </li>
        <!-- 借贷数量 -->
        <li class="v5-9-bg">
          <span class="key">{{ $t('assets.leverageRepayment.sum') }}</span>
          <span class="value v5-5-cl">
            {{ repaymentMess.sum | fixDFn(this) }} {{ getShowCoin(repaymentMess.coin) }}
          </span>
        </li>
        <!-- 利息 -->
        <li class="v5-9-bg">
          <span class="key">{{ $t('assets.leverageRepayment.rate') }}</span>
          <span class="value v5-5-cl">
            {{ repaymentMess.rate | fixDReturnFn(this) }} {{ getShowCoin(repaymentMess.coin) }}
          </span>
        </li>
      </ul>
      <div class="repayment-num">
        <!-- 归还数量 -->
        <c-v5-input
          name='transferValue'
          width="378px"
          :value="transferValue"
          :promptText="$t('assets.leverageRepayment.RepaymentNum')"
          prompClass="v5-6-cl"
          :errorHave="true"
          :errorFlag="inputMess.showError"
          :errorText="inputMess.text"
          :warningText="transferWarningText"
          @onChanges="inputLineChange">
          <c-v5-button slot="append" type="text" @click="allTransfer">
            {{ $t('assets.otcAccount.all') }}
          </c-v5-button>
        </c-v5-input>
      </div>
    </section>
  </c-v5-dialog>
</template>
<script>
import mixin from 'BlockChain-ui/PC/common-mixin/newAssets/leverageRepayment/index';
import 'BlockChain-ui/PC/common-mixin/newAssets/leverageRepayment/index.styl';

export default {
  mixins: [mixin],
  mounted() {
    this.init();
  },
};
</script>
