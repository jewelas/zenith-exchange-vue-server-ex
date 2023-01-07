<template>
  <section class="plans" :class="list.length > 3 ? 'more' : ''">
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
        <span class="cycle">{{$t('reward.plan.list.period',{period:item.dayPeriod})}}</span>
      </div>
      <c-button
        class="plans-item-button"
        @click="handleOnSub(index)">{{$t('reward.sub')}}</c-button>
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
import { mapState } from 'vuex';
import { getCoinShowName } from '@/utils';

import KycDialog from './dialog/kycDialog.vue';
import OrderDialog from './dialog/orderDialog.vue';
import VerifyDialog from './dialog/verifyDialog.vue';

export default {
  name: 'PlansList',
  components: {
    KycDialog,
    OrderDialog,
    VerifyDialog,
  },
  props: {
    flag: { type: Number, default: 0 },
    id: { type: Number, default: 0 },
  },
  data() {
    return {
      active: '',
      showKycDialog: false, // kYC
      showOrderDialog: false, // 订单详情
      showVerifyDialog: false, // 验证
      list: [],
      config: {},
      payment: {},
    };
  },
  created() {
    this.initData();
  },
  methods: {
    async initData() {
      try {
        const { data, code, msg } = await this.axios({
          url: 'noToken/members/list',
          headers: { 'Content-Type': 'application/json' },
          hostType: 'fe-increment-api',
          method: 'post',
        });
        if (code !== 0) throw new Error(msg);
        if (!data) return;
        const { list } = data;
        if (this.flag === 2) {
          const findSort = list.filter(item => item.vipId === this.id)[0].sort;
          this.list = list.filter(item => item.sort <= findSort);
        } else if (this.flag === 1) {
          const findSort = Math.min(...list.map(item => item.sort));
          const findIndex = list.findIndex(item => item.sort === findSort);
          this.list = list;
          this.config = list[findIndex];
          this.handleOnSub(findIndex);
        } else {
          this.list = list;
        }
        this.active = 0;
        this.config = list[this.active];
      } catch ({ message }) {
        this.$bus.$emit('tip', { text: message, type: 'error' });
      }
    },
    isActive(index) {
      this.active = index;
    },
    handleOnSub(index) {
      this.active = index;
      if (this.isLogin === false) return this.$router.push('/login');
      this.showOrderDialog = true;
      return true;
    },
    onChange(kyc, verify, payment) {
      this.showKycDialog = kyc;
      this.showVerifyDialog = verify;
      this.payment = payment;
    },
  },
  watch: {
    active: {
      handler() {
        this.config = this.list[this.active];
        this.$emit('update:config', this.config);
      },
      // immediate: true,
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
}

.active {
  background: linear-gradient(
    0deg,
    rgba(39, 98, 255, 0.1),
    rgba(39, 98, 255, 0.1)
  ), #FFFFFF !important;
  border: 2px solid #2762FF;
  box-shadow: 0px 2px 8px rgba(39, 98, 255, 0.1);
}

.plans {
  position: relative;
  display: flex;
  width: 1200px;
  height: 300px;
  flex-direction: row;
  justify-content: center;
  flex-wrap: nowrap;

  .plans-item {
    flex-shrink: 0;
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 32px 0px;
    width: 384px;
    height: 280px;
    margin: 0 20px 10px 0;
    background: #FFFFFF;
    white-space: nowrap;
    box-shadow: 0px 2px 20px rgba(0, 0, 0, 0.1);
    border-radius: 24px;

    .plans-item-header {
      display: flex;
      >span {
        width: 28px;
        height: 28px;
        margin-right: 16px;
      }
      >div {
        height: 28px;
        font-family: 'PingFang SC';
        font-style: normal;
        font-weight: 600;
        font-size: 20px;
        line-height: 28px;
        text-align: center;
        text-transform: capitalize;
        color: #16181D;
      }
    }

    .plans-item-content {
      display: flex;
      margin: 28px 0px;
      flex-direction: column;

      .count {
        font-family: 'DINPro';
        font-style: normal;
        font-weight: 700;
        font-size: 48px;
        line-height: 50px;
        color: #16181D;

        >span {
          font-size: 16px;
          font-weight: 500;
        }
      }

      .cycle {
        font-family: 'PingFang SC';
        font-style: normal;
        font-weight: 400;
        font-size: 16px;
        text-align: center;
        text-transform: lowercase;
        color: #888FA1;
        flex: none;
        order: 1;
        flex-grow: 0;
      }
    }

    .plans-item-button {
      width: 138px;
      height: 40px;
      background: #2762FF;
      border-radius: 4px;
    }
  }
}

.prev, .next {
  position: absolute;
  top: 140px;
  z-index: 99;
  width: 10px;
  height: 10px;
  background-color: red;
}
.more{
  justify-content: flex-start;
  overflow-y: hidden;
}
.member {
  background: url('../assets/level-1.png') no-repeat center;
}
.affiliate {
  background: url('../assets/level-2.png') no-repeat center;
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
