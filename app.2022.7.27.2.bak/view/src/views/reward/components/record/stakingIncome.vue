<template>
  <div>
    <section class="table">
      <div class="header-row">
        <div class="cell" v-for="(item, index) in headerList" :key="index">{{ item }}</div>
      </div>
      <div class="content-row" v-for="(item, index) in contentList" :key="index">
        <div class="cell">{{ item.date | formatTime }}</div>
        <div class="cell">{{ item.gainAmount }} {{item.gainCoin|analysisCoin(self)}}</div>
        <div class="cell">{{ item.stakingPeriod }} {{ $t("reward.day") }}</div>
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
import { getCoinShowName } from '@/utils';

export default {
  name: 'StakingIncome',
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
          url: 'members/stakingGainRecordList',
          headers: { 'Content-Type': 'application/json' },
          params: this.searchList,
          hostType: 'fe-increment-api',
          method: 'post',
        });
        if (code !== 0) throw new Error(msg);
        if (!data) return;
        const {
          stakingGainRecordList, count, page, pageSize,
        } = data;
        if (stakingGainRecordList) this.contentList = stakingGainRecordList;
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
      return this.$t('reward.stakingIncomeList');
    },
  },
  filters: {
    analysisStatus(state, self) {
      const statusMap = {
        // 0: '待审核',
        // 1: '审核通过',
        // 2: '审核拒绝',
        // 3: '已发放',
        // 4: '待发放',
        // 10: '待领取',
        // 11: '已领取',
        // 12: '已过期',
        0: self.$t('reward.status.tobeReviewed'),
        1: self.$t('reward.status.approved'),
        2: self.$t('reward.status.rejected'),
        3: self.$t('reward.status.issued'),
        4: self.$t('reward.status.tobeIssued'),
        10: self.$t('reward.status.unclaimed'),
        11: self.$t('reward.status.received'),
        12: self.$t('reward.status.expired'),
      };
      return statusMap[state];
    },
    formatTime(time) {
      const padZero = num => (num < 10 ? `0${num}` : num);
      const date = new Date(time);
      const year = date.getFullYear();
      const month = padZero(date.getMonth() + 1);
      const day = padZero(date.getDate());
      return `${year}/${month}/${day}`;
    },
    analysisCoin(coin, self) {
      return getCoinShowName(coin, self.coinList);
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
      width: 25%;
      padding: 12px 0;
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
