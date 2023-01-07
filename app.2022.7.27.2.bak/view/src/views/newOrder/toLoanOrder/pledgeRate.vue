<template>
  <section class="v5-toLoanHis v5-10-bg">
    <div class="toLoanHis-options">

      <!-- 抵押币种 -->
      <div class="search-box">
        <c-v5-select
          :value="coin"
          :options="coinList"
          :errorHave="true"
          width="160px"
          inputHeight="32px"
          @onChanges="coinChange"/>
      </div>
      <!-- 调整方向 -->
      <div class="search-box">
        <c-v5-select
          :value="side"
          :options="sideList"
          :errorHave="true"
          width="160px"
          inputHeight="32px"
          @onChanges="sideChange"/>
      </div>
    </div>
    <div class="exchangeOrder-table">
      <c-table
        :imgMap="imgMap"
        :colorMap="colorMap"
        :loading="tabelLoading"
        :columns="columns"
        :dataList="tabelList"
        @elementClick="tableClick"
        :classes="'v5-10-bg v5-table'"
        :lineClassesHover="'v5-9-bg'"
        :lineClasses ="'v5-12-bd'"
        :cellHeight = '60'
        :headHeight = '0'
      />
      <c-v5-pagination
        v-if="paginationObj.total > paginationObj.display"
        :total="paginationObj.total"
        :display="paginationObj.display"
        :currentPage="paginationObj.currentPage"
        @pagechange="pagechange"
      />
    </div>
  </section>
</template>

<script>
import {
  fixD,
  getCoinShowName,
  formatTime,
  imgMap,
  colorMap,
} from '@/utils';

export default {
  props: {
    borrowSymbolObj: {
      default: () => {},
      type: Object,
    },
    baseReady: {
      default: false,
      type: Boolean,
    },
  },
  data() {
    return {
      side: 'all', // 方向
      tabelList: [],
      tabelLoading: true,
      paginationObj: {
        total: 0, // 数据总条数
        display: 10, // 每页显示条数
        currentPage: 1, // 当前页码
      },
      coinList: [],
      coin: '',
      imgMap,
      colorMap,
    };
  },
  computed: {
    market() {
      return this.$store.state.baseData.market || {};
    },
    sideList() {
      return [
        // 方向选择列表
        // 全部
        { code: 'all', value: this.$t('broToloan.toLoanHis.t47') },
        // 转入调低
        { code: 1, value: this.$t('broToloan.pledgeRate.t3') },
        // 转出调高
        { code: 2, value: this.$t('broToloan.pledgeRate.t4') },
      ];
    },
    // 表格title
    columns() {
      let list = [];
      list = [
        // 订单号
        {
          title: this.$t('broToloan.pledgeRate.t5'),
          width: '60px',
        },
        // 调整时间
        {
          title: this.$t('broToloan.pledgeRate.t6'),
          // width: '90px',

          width: '100px',
        },
        // 抵押币种
        {
          title: this.$t('broToloan.pledgeRate.t7'),
          // width: '50px',
        },
        // 调整方向
        {
          title: this.$t('broToloan.pledgeRate.t8'),
        },
        // 调整金额
        {
          title: this.$t('broToloan.pledgeRate.t9'),
        },
        // 调整前质押率
        {
          title: this.$t('broToloan.pledgeRate.t10'),
        },
        // 调整后质押率
        {
          title: this.$t('broToloan.pledgeRate.t11'),
        },
        // 状态
        {
          title: this.$t('broToloan.pledgeRate.t12'),
        },
      ];
      return list;
    },
  },
  watch: {
    baseReady: {
      immediate: true,
      handler(v) {
        if (v) {
          this.getData();
        }
      },
    },
  },
  methods: {
    getCoinName(coin) {
      return getCoinShowName(coin, this.market.coinList);
    },
    // 抵押
    getMortgageSymbolFix(symbol) {
      let v = 8;
      const { market } = this.$store.state.baseData;
      if (market && market.coinList && market.coinList[symbol]) {
        v = market.coinList[symbol].showPrecision;
      }
      return v;
    },
    getData() {
      this.axios({
        url: 'borrow/get_change_rate_record_list',
        headers: {},
        params: {
          // borrowSymbol: this.borrowSymbol,
          // mortgageSymbol: this.mortgageSymbol,
          type: this.side === 'all' ? '' : this.side,
          pageSize: this.paginationObj.display, // 每页条数
          page: this.paginationObj.currentPage, // 页码
          mortgageSymbol: this.coin === 'all' ? '' : this.coin,
        },
        hostType: 'fe-increment-api',
        method: 'post',
      }).then((data) => {
        if (data.code === 0) {
          const arr = [];
          data.data.list.forEach((item) => {
            const mortgageSymbolFix = this.getMortgageSymbolFix(item.mortgageSymbol);
            arr.push({
              id: JSON.stringify(item),
              data: [
                item.orderId, // 订单id
                formatTime(item.ctime), // 调整时间
                this.getCoinName(item.mortgageSymbol), // 抵押币种
                // 转出调高 / 转入调低
                item.type === 2
                  ? this.$t('broToloan.pledgeRate.t4')
                  : this.$t('broToloan.pledgeRate.t3'), // 状态
                fixD(item.changeMortgageVolume, mortgageSymbolFix), // 调整金额
                `${item.beforeMortgageRate}%`, // 调整前质押率
                `${item.afterMortgageRate}%`, // 调整后质押率
                // 已完成 / 划转中
                item.status === 1
                  ? this.$t('broToloan.pledgeRate.t13')
                  : this.$t('broToloan.pledgeRate.t14'),
              ],
            });
          });
          this.tabelLoading = false;
          this.tabelList = arr;
          this.paginationObj.total = data.data.count;
          if (!this.coinList.length) {
            const coinArr = [{
              code: 'all',
              value: this.$t('broToloan.toLoanHis.t47'),
            }];
            data.data.mortgageSymbolList.forEach((item) => {
              coinArr.push({
                code: item.coinSymbol,
                value: item.showName,
              });
            });
            this.coinList = coinArr;
            this.coin = coinArr[0].code;
          }
        } else {
          this.$bus.$emit('tip', { text: data.msg, type: 'error' });
        }
      });
    },

    tableClick() {

    },
    // 分页器
    // 分页器
    pagechange(v) {
      this.paginationObj.currentPage = v;
      // this.clearSub();
      this.getData();
    },
    coinChange(item) {
      if (this.coin === item.code) {
        return;
      }
      this.coin = item.code;
      this.paginationObj.currentPage = 1; // 页码
      this.paginationObj.total = 0; // 总条数
      this.tabelList = [];
      this.tabelLoading = true;
      // this.clearSub();
      this.getData();
    },
    // 切换方向
    sideChange(item) {
      if (this.side === item.code) {
        return;
      }
      this.side = item.code;
      this.paginationObj.currentPage = 1; // 页码
      this.paginationObj.total = 0; // 总条数
      this.tabelList = [];
      this.tabelLoading = true;
      // this.clearSub();
      this.getData();
    },
  },
};
</script>

<style lang="stylus" scoped>
.v5-toLoanHis {
  .toLoanHis-options {
    width: 100%;
    box-sizing: border-box;
    padding: 0 20px;
    margin-top: 14px;
    display: flex;
    .common-select {
      display: inline-block;
      margin-right: 30px;
    }
    .search-box{
      float: left;
      margin-right: 20px;
    }
  }

  .toLoanHis-table {
    width: 100%;
    box-sizing: border-box;
    padding: 0 20px;
    margin-top:20px;
    .table-head, .table-body-bar, .pagination {
      padding: 0 !important;
    }
  }
}
</style>
