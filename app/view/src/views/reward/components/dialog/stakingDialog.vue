<template>
  <c-dialog
    :titleText="`${title} Staking`"
    :showFlag="showFlag"
    :haveOption="false"
    @close="handleClose"
    class="staking-dialog"
  >
    <section class="container">
      <div class="row">
        <div class="label">{{ $t("reward.dialog.staking.period") }}</div>
        <c-v5-select
          class="options"
          :width="'240px'"
          name="stakingId"
          :options="stakingList"
          @onChanges="selectStakingId"
          :value="stakingId"
        />
      </div>
      <div class="row">
        <div class="label">{{ $t("reward.dialog.staking.apr") }}</div>
        <div class="options">{{ this.curApr }}</div>
      </div>
      <div class="row">
        <div class="label">{{ $t("reward.dialog.staking.amount") }}</div>
        <c-v5-input
          :width="'240px'"
          name="amount"
          type="text"
          :value="amount"
          :errorHave="true"
          :errorFlag="amountError"
          @onChanges="inputChange"
        >
        </c-v5-input>
      </div>
      <div class="available">
        {{ $t("reward.dialog.staking.available") }}
        <span style="color: #14b886"> {{ balance | analysisAmount(self) }} </span>
        {{ curCoin | analysisCoin(self) }}
      </div>
    </section>
    <section style="margin-top:30px;">
      <!-- <div class="info">
        {{ $t("reward.dialog.staking.info", { apr: curApr }) }}
      </div> -->
      <c-v5-button :disabled="!amount && !amountFlag" class="btn" @click="handleStaking"
        >Staking</c-v5-button
      >
    </section>
  </c-dialog>
</template>

<script>
import mixin from 'BlockChain-ui/PC/common-mixin/reward/dialog/staking';
import 'BlockChain-ui/PC/common-mixin/reward/dialog/staking.styl';

export default {
  mixins: [mixin],
  created() {
    this.initData();
  },
};
</script>

<style lang="stylus" scoped>
>>> .dialog-frame {
  background: #FFFFFF !important;
  border-radius: 5px;
}
>>> .dialog-frame-head {
  background: #F2F4FB !important;
  border-radius: 5px 5px 0 0;
}
>>> .dialog-frame-head-text {
  color: rgba(22, 24, 29, 1) !important;
}

>>> .a-3-bg{
  background-color: rgba(232,235,243,1) !important
}
>>> .v5-9-bd {
  border: 0px !important;
}
>>> .v5-9-bg {
  background: #F1F4FA !important;
}
>>> .b-1-cl {
  color: #000000 !important;
}
>>> .v5-5-cl {
  color: #000 !important;
}
>>> .v5-10-bg {
  background: #F1F4FA !important;
}
>>> .v5-12-bd {
  border: 0px !important;
}
>>> .common-v5-select .select-options-box {
  border: 0px !important;
}
>>> .common-v5-select .input_line_content {
  border: 0px !important;
}
</style>
