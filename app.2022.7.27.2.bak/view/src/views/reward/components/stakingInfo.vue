<template>
  <section>
    <div class="title">Staking</div>
    <section class="table">
      <div class="header-row">
        <div class="cell" v-for="(item, index) in headerList" :key="index">{{ item }}</div>
      </div>
      <div class="content-row" v-for="(item, index) in contentList" :key="index">
        <div class="cell">
          <span
            class="qte-icon"
            :style="{
              backgroundImage: `url(${item.logo})`,
              backgroundSize: 'contain',
            }"
          />
          <!-- <span class="qte-icon"/> -->
          {{ item.stakingCoin | analysisCoin(self) }}
        </div>
        <div class="cell">
          {{ item.stakingPeriod }}
          <span style="font-size: 14px; color: #888fa1">{{$t('reward.day')}}</span>
        </div>
        <div class="cell">{{ item.stakingRate }}<span>%</span></div>
        <div class="cell">{{ item.type | analysisType(self) }}</div>
        <div class="cell">
          <c-button class="btn" @click="handleOnStaking(item)">Staking</c-button>
        </div>
      </div>
    </section>
    <section v-if="!contentList.length" class="nodata">
      <span>{{$t('reward.nodata')}}</span>
    </section>
    <StakingDialog
      v-if="showStakingDialog"
      :showFlag.sync="showStakingDialog"
      :config="contentList"
      :id="currentId"
    />
  </section>
</template>

<script>
import { mapState } from 'vuex';
import { getCoinShowName } from '@/utils';
import StakingDialog from './dialog/stakingDialog.vue';

export default {
  name: 'StakingInfo',
  components: {
    StakingDialog,
  },
  props: {
    id: { default: 0, type: Number },
  },
  data() {
    return {
      self: this,
      contentList: [],
      newList: [],
      showStakingDialog: false,
      currentId: '',
      currentCoin: '',
    };
  },
  methods: {
    async initData() {
      try {
        const { data, code, msg } = await this.axios({
          url: 'noToken/members/stakingList',
          headers: { 'Content-Type': 'application/json' },
          hostType: 'fe-increment-api',
          params: { vipId: this.id },
          method: 'post',
        });
        if (code !== 0) throw new Error(msg);
        if (!data) return;
        const { list } = data;
        if (list) this.contentList = list;
      } catch ({ message }) {
        this.$bus.$emit('tip', { text: message, type: 'error' });
      }
    },
    handleOnStaking(item) {
      if (this.isLogin === false) return this.$router.push('/login');
      this.showStakingDialog = true;
      this.currentId = item.stakingId;
      this.currentCoin = item.stakingCoin;
      return true;
    },
  },
  watch: {
    id: {
      handler() {
        if (this.id) this.initData();
      },
      immediate: true,
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
    headerList() {
      return this.$t('reward.stakingInfoList');
    },
  },
  filters: {
    analysisType(state, self) {
      const statusMap = {
        1: self.$t('reward.level.level1'),
        2: self.$t('reward.level.level2'),
        3: self.$t('reward.level.level3'),
      };
      return statusMap[state];
    },
    // analysisIcon(path, self) {
    //   let res;
    //   if (self.coinList[path]) {
    //     res = {
    //       background: `url(${self.coinList[path].icon}) no-repeat center`,
    //       backgroundSize: 'contain',
    //     };
    //   } else {
    //     res = '';
    //   }
    //   return res;
    // },
    analysisCoin(coin, self) {
      return self.coinList ? getCoinShowName(coin, self.coinList) : '';
    },
  },
};
</script>

<style lang="stylus" scoped>
* {
  font-family: 'DINPro';
  font-weight: 400;
  font-style: normal;
}

.title {
  font-weight: 700;
  font-size: 24px;
  line-height: 24px;
  color: #16181D;
}

.table {
  width: 100%;
  display: table;
  margin-top: 20px;
  font-size: 14px;

  .header-row, .content-row {
    display: table-row;

    .cell {
      display: table-cell;
      padding: 16px 60px;
      vertical-align: middle;
    }
  }

  .cell:first-child {
    padding-left: 0;
  }

  .cell:last-child {
    text-align: right;
    padding-right: 0;
  }
}

.content-row {
  color: #16181D;

  .cell:first-child {
    display: flex;
    align-items: center;
  }

  .cell:nth-child(-n+3) {
    font-size: 20px;
  }

  .cell:nth-child(3) {
    color: #EB4D5C;
  }
}

.qte-icon {
  display: inline-block;
  width: 32px;
  height: 32px;
  margin-right: 24px;
  background: url('../assets/qte.png') no-repeat center;
  background-size: contain,
}

.btn {
  background: #14B886;
  border-radius: 4px;
}
.nodata {
  display: flex;
  height: 80px;
  justify-content: center;
  align-items: center;
}
</style>
