<template>
  <c-dialog
    :titleText="$t('reward.dialog.order.title')"
    :showFlag="showFlag"
    :haveOption="false"
    @close="handleClose"
    class="order-dialog"
  >
    <section class="container">
      <div>
        <span style="color: #16181d; font-weight: 600">
          {{ $t("reward.dialog.order.amount") }}
          <span style="color: #eb4d5c; font-weight: 700">{{ config.vipAmount }} </span>
          <span style="color: #888fa1">{{ config.vipCoin | analysisCoin(coinList) }}</span>
        </span>
      </div>
      <div>
        <span style="color: #888fa1">{{ $t("reward.dialog.order.available") }}</span>
        <span style="color: #14b886">
          {{ balance }}
        </span>
        <span>{{ config.vipCoin | analysisCoin(coinList) }}</span>
      </div>
    </section>
    <section>
      <template v-if="config.type === 1">
        <div class="info" v-if="config.vipReward">
          {{
            $t("reward.dialog.order.info1", {
              rate: config.roleRate || "--",
            })
          }}
        </div>
        <div class="info">
          <span style="color: #16181d">{{ $t("reward.dialog.order.reminder") }}</span>
          {{ $t("reward.dialog.order.info2") }}
        </div>
      </template>
      <template v-else>
        <div class="info" v-if="config.vipReward">
          {{
            $t("reward.dialog.order.info1", {
              rate: config.roleRate || "--",
            })
          }}
        </div>
      </template>
      <c-v5-button class="btn" @click="handleStaking">{{ $t("reward.sub") }}</c-v5-button>
    </section>
  </c-dialog>
</template>

<script>
import mixin from 'BlockChain-ui/PC/common-mixin/reward/dialog/order';
import 'BlockChain-ui/PC/common-mixin/reward/dialog/order.styl';

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
</style>
