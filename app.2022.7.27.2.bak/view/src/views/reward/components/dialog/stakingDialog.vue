<template>
  <c-dialog
    :titleText="`${title} Staking`"
    :showFlag="showFlag"
    :haveOption="false"
    @close="handleClose"
  >
    <section class="container">
      <div class="row">
        <div class="label">{{$t('reward.dialog.staking.period')}}</div>
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
        <div class="label">{{$t('reward.dialog.staking.apr')}}</div>
        <div class="options">{{ this.curApr }}</div>
      </div>
      <div class="row">
        <div class="label">{{$t('reward.dialog.staking.amount')}}</div>
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
        {{$t('reward.dialog.staking.available')}}
        <span style="color: #14b886">
          {{ balance | analysisAmount(self) }} </span>
        {{ curCoin | analysisCoin(self) }}
      </div>
    </section>
    <section>
      <div class="info">
        {{$t('reward.dialog.staking.info',{apr:curApr})}}
      </div>
      <c-v5-button
      :disabled='!amount&&!amountFlag' class="btn" @click="handleStaking">Staking</c-v5-button>
    </section>
  </c-dialog>
</template>

<script>
import { fixD, getCoinShowName, fixInput } from '@/utils';
import { mapState } from 'vuex';

export default {
  name: 'StakingDialog',
  props: {
    showFlag: { default: false, type: Boolean },
    config: { default: () => [], type: Array },
    id: { default: 0, type: Number },
  },
  data() {
    return {
      self: this,
      stakingId: 0,
      amount: '',
      coinMap: {},
      curApr: '',
      curCoin: '',
      balance: '',
      title: '',
    };
  },
  watch: {
    stakingId: {
      handler() {
        this.curApr = `${
          this.config.find(item => item.stakingId === this.stakingId).stakingRate
        } %`;
        this.curCoin = this.config.find(item => item.stakingId === this.stakingId).stakingCoin;
        this.balance = this.coinMap ? this.coinMap[this.curCoin].normal_balance : '';
        this.amount = '';
      },
      // immediate: true,
    },
    amount(v) {
      this.amount = fixInput(v, this.showPrecision);
      if (v === 0) this.amount = '';
    },
  },
  computed: {
    ...mapState({
      isLogin: state => state.baseData.isLogin,
      market: state => state.baseData.market,
    }),
    coinList() {
      return this.market ? this.market.coinList : '';
    },
    stakingList() {
      const list = this.config ? this.config : [];
      return list.map(item => ({
        code: item.stakingId,
        value: `${item.stakingPeriod} Days`,
      }));
    },
    amountFlag() {
      return this.$store.state.regExp.number.test(this.amount);
    },
    amountError() {
      if (this.amount.length !== 0 && !this.amountFlag) return true;
      return false;
    },
    showPrecision() {
      let res = 0;
      if (this.coinList && this.coinList[this.curCoin]) {
        res = this.coinList[this.curCoin].showPrecision;
      }
      return res;
    },
  },
  created() {
    this.initData();
  },
  methods: {
    async initData() {
      try {
        this.stakingId = this.id;
        const { data, code, msg } = await this.axios({
          url: 'finance/v5/account_balance',
          params: { coinSymbols: '' },
          method: 'post',
        });
        if (code.toString() !== '0') throw new Error(msg);
        if (!data) return;
        const { allCoinMap } = data;
        this.coinMap = allCoinMap;
        this.balance = this.coinMap[this.curCoin].normal_balance;
      } catch ({ message }) {
        this.$bus.$emit('tip', { text: message, type: 'error' });
      }
    },
    async handleStaking() {
      if (!this.isLogin) {
        this.$router.push('/login');
        return;
      }
      try {
        if (Number(this.amount) > Number(this.balance)) throw new Error(this.$t('reward.error.amount'));
        const { data, code, msg } = await this.axios({
          url: 'staking_create_order',
          hostType: 'fe-increment-api',
          params: {
            amount: this.amount,
            projectId: this.stakingId,
            returnUrl: window.location.href,
          },
          method: 'post',
        });
        if (code.toString() !== '0') throw new Error(msg);
        if (!data) return;
        window.location.href = `${data.opUrl}?appKey=${data.appKey}&orderNum=${data.orderNum}&userId=${data.userId}`;
      } catch ({ message }) {
        this.$bus.$emit('tip', { text: message, type: 'error' });
      }
    },
    selectStakingId(item) {
      this.stakingId = item.code;
    },
    inputChange(value, name) {
      this[name] = Number(value);
    },
    handleClose() {
      this.$emit('update:showFlag', false);
    },

  },
  filters: {
    analysisAmount(amount, self) {
      return amount ? fixD(amount, self.showPrecision) : '';
    },
    analysisCoin(coin, self) {
      /* eslint no-param-reassign: "error" */
      // this.$set(self, 'title', getCoinShowName(coin, self.coinList));
      self.title = getCoinShowName(coin, self.coinList);
      return coin ? getCoinShowName(coin, self.coinList) : '';
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
>>> .v5-9-bd {
  border: 0px !important;
}

>>> .v5-9-bg {
  background: #F1F4FA;
}

>>> .v5-5-cl {
  color: #000;
}

.container {
  width: 100%;

  .row {
    width: 100%;
    display: flex;
    margin-bottom: 32px;
    align-items: center;

    .label {
      width: 140px;
      text-align: right;
    }
  }

  .row:nth-child(3) {
    margin-bottom: 0px !important;
  }
}

.available {
  margin: 10px 0 0 135px;
  font-size: 14px;
  line-height: 22px;
}

.info {
  font-family: 'DINPro';
  font-style: normal;
  font-weight: 400;
  font-size: 14px;
  line-height: 22px;
  letter-spacing: -0.04em;
  color: #888FA1;
  margin: 36px 0;
}

.btn {
  width: 100%;
  background-color: #2762FF;
  border-radius: 4px;
}

>>> .v5-10-bg {
  background: #F1F4FA;
}

>>> v5-12-bd {
  border: 0px !important;
}

>>> .common-v5-select .select-options-box {
  border: 0px !important;
}

>>> .common-v5-select .input_line_content {
  border: 0px !important;
}

>>> .b-1-cl {
  color: #000000 !important;
}
</style>
