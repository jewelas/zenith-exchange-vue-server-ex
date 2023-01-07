<template>
  <div>
    <section class="table">
      <div class="header-row">
        <div class="cell" v-for="(item, index) in headerList" :key="index">{{ item }}</div>
      </div>
      <div class="content-row" v-for="(item, index) in contentList" :key="index">
        <div class="cell">
          <!-- <span class="qte-icon"></span> -->
          <span class="qte-icon"
          :style="{background:`url(${item.logo}) no-repeat center`,backgroundSize: 'contain'}"/>
          {{ item.stakingCoin | analysisCoin(coinList) }}
        </div>
        <div class="cell">
          {{ item.stakingPeriod }}
          <span style="font-size: 14px; color: #888fa1">{{ $t("reward.day") }}</span>
        </div>
        <div class="cell">{{ item.stakingRate }}<span>%</span></div>
        <div class="cell">
          {{ item.stakingAmount }} {{ item.stakingCoin | analysisCoin(coinList) }}
        </div>
        <div class="cell">{{ item.stakingTime | formatTime }}</div>
        <div class="cell">
          {{ item.accumulatedReward }} {{item.stakingCoin | analysisCoin(coinList)}}
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
import { getCoinShowName } from '@/utils';

export default {
  name: 'StakingReward',
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
          url: 'members/stakingRecordList',
          headers: { 'Content-Type': 'application/json' },
          params: this.searchList,
          hostType: 'fe-increment-api',
          method: 'post',
        });
        if (code !== 0) throw new Error(msg);
        if (!data) return;
        const {
          stakingRecordList, count, page, pageSize,
        } = data;
        if (stakingRecordList) this.contentList = stakingRecordList;
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
    headerList() {
      return this.$t('reward.stakingRecoedList');
    },
  },
  filters: {
    analysisRate(state) {
      return state || '--';
    },
    analysisCoin(coin, coinList) {
      return coinList ? getCoinShowName(coin, coinList) : '';
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
  font-family: 'DINPro';
  font-weight: 400;
  font-style: normal;
  box-sizing: border-box;
}

.table {
  width: 100%;
  display: table;
  font-size: 14px;

  .header-row, .content-row {
    display: table-row;

    .cell {
      display: table-cell;
      padding: 16px 10px;
      vertical-align: middle;

      button {
        padding: 8px 16px;
        background: #14B886;
        border-radius: 4px;
        color: #FFFFFF;
        font-size: 16px;
        font-family: 'PingFang SC';
      }
    }
  }

  .cell:first-child {
    padding-left: 0;
  }

  .cell:last-child {
    padding-right: 0;
  }
}

.content-row {
  color: #16181D;

  .cell:first-child {
    display: flex;
    align-items: center;
  }

  .cell:nth-child(-n+4) {
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
  background: url('../../assets/qte.png') no-repeat center;
}
.nodata {
  display: flex;
  height: 80px;
  justify-content: center;
  align-items: center;
}
</style>
