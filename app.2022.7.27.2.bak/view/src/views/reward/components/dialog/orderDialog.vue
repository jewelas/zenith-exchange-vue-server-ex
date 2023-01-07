<template>
  <c-dialog
    :titleText="$t('reward.dialog.order.title')"
    :showFlag="showFlag"
    :haveOption="false"
    @close="handleClose"
  >
    <section class="container">
      <div>
        <span style="color: #16181d; font-weight: 600">
          {{$t('reward.dialog.order.amount')}}
          <span style="color: #eb4d5c; font-weight: 700">{{ config.vipAmount }} </span>
          <span style="color: #888fa1">{{ config.vipCoin | analysisCoin(coinList) }}</span>
        </span>
      </div>
      <div>
        <span style="color: #888fa1">{{$t('reward.dialog.order.available')}}</span>
        <span style="color: #14b886">
          {{ balance }}
        </span>
        <span>{{ config.vipCoin | analysisCoin(coinList) }}</span>
      </div>
    </section>
    <section>
      <template v-if="config.type===1">
        <div class="info" v-if="config.vipReward">
          {{$t('reward.dialog.order.info1',{
            rate:config.roleRate || '--'
          })}}
        </div>
        <div class="info">
          <span style="color: #16181d">{{$t('reward.dialog.order.reminder')}}</span>
          {{$t('reward.dialog.order.info2')}}
        </div>
      </template>
      <template v-else>
        <div class="info">
          {{$t('reward.dialog.order.info3',{rate:config.transRewardRate || '--'})}}
        </div>
      </template>
      <c-v5-button class="btn" @click="handleStaking">{{$t('reward.sub')}}</c-v5-button>
    </section>
  </c-dialog>
</template>

<script>
import { fixD, getCoinShowName } from '@/utils';
import { mapState } from 'vuex';

export default {
  name: 'OrderDialog',
  props: {
    showFlag: { type: Boolean, default: false },
    config: { type: Object, default: () => ({}) },
  },
  data() {
    return {
      self: this,
      payment: {},
      coinMap: {},
      balance: '0',
    };
  },
  created() {
    this.initData();
  },
  // watch: {
  //   'config.vipCoin': {
  //     handler(val) {
  //       if (this.coinMap) {
  //         this.balance = this.coinMap[val].normal_balance;
  //       } else {
  //         this.balance = 0;
  //       }
  //     },
  //     immediate: true,
  //   },
  // },
  methods: {
    async initData() {
      try {
        const { data, code, msg } = await this.axios({
          url: 'finance/v5/account_balance',
          params: { coinSymbols: '' },
          method: 'post',
        });
        if (code !== '0') throw new Error(msg);
        if (!data) return;
        const { allCoinMap } = data;
        this.coinMap = allCoinMap;
        this.balance = this.coinMap[this.config.vipCoin].normal_balance;
        this.balance = fixD(this.balance, this.showPrecision);
      } catch ({ message }) {
        this.$bus.$emit('tip', { text: message, type: 'error' });
      }
    },
    handleStaking() {
      if (Number(this.config.vipAmount) > Number(this.balance)) {
        return this.$bus.$emit('tip', { text: this.$t('reward.error.amount'), type: 'error' });
      }
      if (this.config.kycLimit === 1 && this.authLevel !== 1) {
        this.$emit('change', true, false, false);
      } else {
        this.$emit('change', false, true, {
          amount: this.config.vipAmount,
          coinSymbol: this.config.vipCoin,
          vipId: this.config.vipId,
        });
      }
      this.handleClose();
      return true;
    },
    handleClose() {
      this.$emit('update:showFlag', false);
    },
  },
  // filters: {
  //   analysisAmount(amount, self) {
  //     return amount ? fixD(amount, self.showPrecision) : '';
  //   },
  // },
  computed: {
    ...mapState({
      authLevel: state => state.baseData.userInfo.authLevel,
      market: state => state.baseData.market,
    }),
    coinList() {
      return this.market ? this.market.coinList : '';
    },
    showPrecision() {
      let res = 0;
      if (this.coinList && this.coinList[this.config.vipCoin]) {
        res = this.coinList[this.config.vipCoin].showPrecision;
      }
      return res;
    },
  },
  filters: {
    analysisCoin(coin, coinList) {
      return coinList ? getCoinShowName(coin, coinList) : '';
    },
  },
};
</script>

<style lang="stylus" scoped>
* {
  box-sizing: border-box;
  font-family: 'DINPro';
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  line-height: 24px;
}

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

.container {
  width: 100%;
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  margin: 40px 0;

  >div {
    margin-bottom: 24px;
  }
}

.info {
  font-family: 'DINPro';
  font-style: normal;
  font-weight: 400;
  font-size: 14px;
  line-height: 22px;
  letter-spacing: -0.04em;
  color: #888FA1;
  margin-bottom: 20px;
}

.btn {
  width: 100%;
  background-color: #2762FF;
  border-radius: 4px;
}
</style>
