<template>
  <section ref="listRef" class="planslist-container" :class="listLen>3?'more':''">
    <div
      class="plans-item"
      v-for="(item, index) in list"
      :key="index"
      :class="{ active: active === index }"
      @click="isActive(index)"
    >
      <div class="plans-item-header">
        <span :class="item.type===1?'member':'affiliate'"></span>
        <div>{{ item.vipName }}</div>
      </div>
      <div class="plans-item-content">
        <div class="count">
          {{ item.vipAmount }}<span>{{ item.vipCoin | analysisCoin(coinList) }}</span>
        </div>
        <span v-if="item.sort==curLevel" class="cycle">
          {{$t('reward.plan.datail.date')}}: <i>{{ user.endTime | formatTime }}</i>
        </span>
        <span v-else class="cycle">{{$t('reward.plan.list.period',{period:item.dayPeriod})}}</span>
      </div>
      <c-v5-button
        v-if="item.sort==curLevel"
        :disabled="renewTime>nowTime"
        class="plans-item-button"
        @click="handleOnSub(index)">{{$t('reward.sub')}}
      </c-v5-button>
       <c-v5-button
        v-else
        :disabled="item.sort<curLevel"
        class="plans-item-button"
        @click="handleOnSub(index)">{{$t('reward.sub')}}
      </c-v5-button>
    </div>
    <KycDialog v-if="showKycDialog" :showFlag.sync="showKycDialog" />
    <OrderDialog
      v-if="showOrderDialog"
      :showFlag.sync="showOrderDialog"
      :config="config"
      @change="onChange"
    />
    <VerifyDialog v-if="showVerifyDialog" :showFlag.sync="showVerifyDialog" :payment="payment" />
  </section>
</template>

<script>
import mixin from 'BlockChain-ui/PC/common-mixin/reward/plans/list';
import 'BlockChain-ui/PC/common-mixin/reward/plans/list.styl';

import KycDialog from './dialog/kycDialog.vue';
import OrderDialog from './dialog/orderDialog.vue';
import VerifyDialog from './dialog/verifyDialog.vue';

export default {
  mixins: [mixin],
  components: {
    KycDialog,
    OrderDialog,
    VerifyDialog,
  },
  created() {
    this.initData();
  },
  beforeUpdate() {
    if (this.user.flag) {
      if (this.listLen - this.curIndex >= 3) {
        this.user.flag = false;
        this.$nextTick(() => {
          this.$refs.listRef.scrollLeft = this.curIndex * (384 + 20);
        });
      } else {
        this.user.flag = false;
        this.$nextTick(() => {
          this.$refs.listRef.scrollLeft = (this.listLen - 3) * (384 + 20);
        });
      }
    }
  },
};
</script>

<style lang="stylus" scoped>
>>> .a-3-bg{
  background-color: rgba(232,235,243,1) !important
}
.more {
  padding-left: 10px;
  max-width:1212px !important;
  justify-content: flex-start !important;
  overflow-y: hidden !important;
}
::-webkit-scrollbar {
  width: 6px;
  height: 6px;
  background-color: #f5f5f5;
}
::-webkit-scrollbar-track {
  -webkit-box-shadow: inset 0 0 6px rgba(128, 128, 128, 0.7);
  border-radius: 10px;
  background-color: #f5f5f5;
}
::-webkit-scrollbar-thumb {
  border-radius: 10px;
  -webkit-box-shadow: inset 0 0 6px rgba(128, 128, 128, 0.7);
  background-color: rgb(149, 147, 147);
}
</style>
