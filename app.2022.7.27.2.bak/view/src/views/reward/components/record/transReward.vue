<template>
  <div>
    <section class="table">
      <div class="header-row">
        <div class="cell" v-for="(item, index) in headerList" :key="index">{{ item }}</div>
      </div>
      <div class="content-row" v-for="(item, index) in contentList" :key="index">
        <div class="cell">{{ item.date | formatTime }}</div>
        <div class="cell">
          {{ item.beginAmount | analysisAmount(item.coinSymbol,self)}}
          {{item.coinSymbol | analysisCoin(coinList) }}</div>
        <div class="cell">
          {{ item.freezeAmount | analysisAmount(item.coinSymbol,self) }}
           {{item.coinSymbol | analysisCoin(coinList) }}</div>
        <div class="cell">
          {{ item.endAmount | analysisAmount(item.coinSymbol,self) }}
          {{item.coinSymbol | analysisCoin(coinList) }}</div>
        <div class="cell">
          {{ item.buyAmount | analysisAmount(item.coinSymbol,self)}}
          {{item.coinSymbol | analysisCoin(coinList) }}</div>
        <div class="cell">{{ item.qualifiedNum }}</div>
        <div class="cell">
          {{ item.rewardAmount| analysisAmount(item.rewardCoin,self) }}
          {{item.rewardCoin | analysisCoin(coinList) }}</div>
        <div class="cell" :style="item.status ? 'color:#14b886' : 'color:#888fa1'">
          {{ item.status | analysisStatus(self) }}
        </div>
      </div>
    </section>
    <section v-if="!contentList.length" class="nodata">
      <span>{{ $t("reward.nodata") }}</span>
    </section>
    <section class="page" v-if="total / pageSize > 1">
      <c-pagination
        :total="total"
        :current-page="page"
        :display="pageSize"
        @pagechange="onPagechange"
        classes="pagination-bar a-5-bg"
      />
    </section>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import { fixD, getCoinShowName } from '@/utils';

export default {
  name: 'TransReward',
  data() {
    return {
      self: this,
      contentList: [],
      total: 0,
      searchList: {
        page: undefined,
        pageSize: undefined,
      },
      page: 1,
      pageSize: 10,
    };
  },
  created() {
    this.initData();
  },
  methods: {
    async initData() {
      try {
        const { data, code, msg } = await this.axios({
          url: 'members/transRewardRecordList',
          headers: { 'Content-Type': 'application/json' },
          params: this.searchList,
          hostType: 'fe-increment-api',
          method: 'post',
        });
        if (code !== 0) throw new Error(msg);
        if (!data) return;
        const {
          transRewardRecordList, count, page, pageSize,
        } = data;
        this.contentList = transRewardRecordList;
        this.total = count;
        this.page = page;
        this.pageSize = pageSize;
      } catch ({ message }) {
        this.$bus.$emit('tip', { text: message, type: 'error' });
      }
    },
    onPagechange(num) {
      this.searchList.page = num;
      this.initData();
    },
  },
  computed: {
    ...mapState({
      market: state => state.baseData.market,
    }),
    coinList() {
      return this.market ? this.market.coinList : '';
    },
    showPrecision(coin) {
      let res = 0;
      if (this.coinList && this.coinList[coin]) {
        res = this.coinList[coin].showPrecision;
      }
      return res;
    },
    headerList() {
      return this.$t('reward.transRewardList');
    },
  },
  filters: {
    analysisStatus(state, self) {
      const statusMap = {
        0: self.$t('reward.status.unissued'),
        1: self.$t('reward.status.issued'),
        2: self.$t('reward.status.cancel'),
      };
      return statusMap[state] || '--';
    },
    analysisCoin(coin, coinList) {
      return coinList ? getCoinShowName(coin, coinList) : '';
    },
    analysisAmount(amount, coin, self) {
      function showPrecision() {
        let res = 0;
        if (self.coinList && self.coinList[coin]) {
          res = self.coinList[coin].showPrecision;
        }
        return res;
      }
      return amount ? fixD(amount, showPrecision()) : 0;
    },
    formatTime(time) {
      const padZero = num => (num < 10 ? `0${num}` : num);
      const date = new Date(time);
      const year = date.getFullYear();
      const month = padZero(date.getMonth() + 1);
      const day = padZero(date.getDate());
      const hour = padZero(date.getHours());
      const minute = padZero(date.getMinutes());
      const second = padZero(date.getSeconds());
      return `${year}/${month}/${day} ${hour}:${minute}:${second}`;
    },
  },
};
</script>

<style lang="stylus" scoped>
* {
  box-sizing: border-box;
  border-collapse: collapse;
}

.table {
  width: 100%;
  display: table;
  border: 1px solid #cccccc;

  .header-row, .content-row {
    display: table-row;
    text-align: center;
    border: 1px solid #cccccc;

    .cell {
      display: table-cell;
      padding: 12px 0;
      width: 12.5%;
      vertical-align: middle;
      border: 1px solid #cccccc;
    }
  }

  .content-row {
    .cell {
      color: #16181D;
    }
  }
}

.a-5-bg {
  background: none !important;
}

.pagination-bar {
  border: none !important;

  >>> .pagination-bar {
    border: none !important;
  }
}

.page {
  display: flex;
  justify-content: flex-end;
}

.nodata {
  display: flex;
  height: 80px;
  justify-content: center;
  align-items: center;
}
</style>
