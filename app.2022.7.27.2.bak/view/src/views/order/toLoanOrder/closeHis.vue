<template>
  <section class="toLoanHis">
    <div class="toLoanHis-options">
      <!-- 抵押币种 -->
      <c-select
        :promptText="$t('broToloan.closeHis.t1')"
        :value="coin"
        :options="coinList"
        :errorHave="true"
        width="155px"
        @onChanges="coinChange"
      />
      <!-- 状态 -->
      <c-select
        :promptText="$t('broToloan.closeHis.t2')"
        :value="side"
        :options="sideList"
        :errorHave="true"
        width="155px"
        @onChanges="sideChange"
      />
    </div>
    <div class="exchangeOrder-table">
      <c-table
        :imgMap="imgMap"
        :colorMap="colorMap"
        :loading="tabelLoading"
        :columns="columns"
        :dataList="tabelList"
        @elementClick="tableClick"
      />
      <c-pagination
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
        // 平仓中
        { code: '0', value: this.$t('broToloan.closeHis.t3') },
        // 已完成
        { code: '1', value: this.$t('broToloan.closeHis.t4') },
        // 订单异常
        { code: '2', value: this.$t('broToloan.add.t1') },
        // 已完成
        { code: '3', value: this.$t('broToloan.add.t2') },
      ];
    },
    // 表格title
    columns() {
      let list = [];
      list = [
        // 订单号
        {
          title: this.$t('broToloan.closeHis.t5'),
          width: '60px',
        },
        // 抵押物卖出金额
        {
          title: this.$t('broToloan.closeHis.t6'),
          width: '90px',
        },
        // 平仓使用金额
        {
          title: this.$t('broToloan.closeHis.t7'),
          width: '90px',
        },
        // 平仓后剩余金额
        {
          title: this.$t('broToloan.closeHis.t8'),
          width: '90px',
        },
        // 借贷币种
        {
          title: this.$t('broToloan.closeHis.t9'),
        },
        // 借贷金额
        {
          title: this.$t('broToloan.closeHis.t10'),
        },
        // 处理时间
        {
          title: this.$t('broToloan.closeHis.t11'),
          width: '100px',
        },
        // 平仓原因
        {
          title: this.$t('broToloan.closeHis.t12'),
        },
        // 状态
        {
          title: this.$t('broToloan.closeHis.t13'),
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
    // 借贷
    getBorrowSymbolFix() {
      // if (this.borrowSymbolObj[symbol]) {
      //   return this.borrowSymbolObj[symbol].showPrecision;
      // }
      return 8;
    },
    getData() {
      this.axios({
        url: 'borrow/get_close_position_record_list',
        headers: {},
        params: {
          // borrowSymbol: this.borrowSymbol,
          // mortgageSymbol: this.mortgageSymbol,
          status: this.side === 'all' ? '' : this.side,
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
            const borrowSymbolFix = this.getBorrowSymbolFix(item.borrowSymbol);
            let statusText = '';
            switch (item.status) {
              case 1:
                statusText = this.$t('broToloan.closeHis.t16'); // 已完成
                break;
              case 2:
                statusText = this.$t('broToloan.add.t1'); // 订单异常
                break;
              case 3:
                statusText = this.$t('broToloan.add.t2'); // 穿仓
                break;
              default:
                statusText = this.$t('broToloan.closeHis.t17'); // 平仓中
            }
            arr.push({
              id: JSON.stringify(item),
              data: [
                item.orderId, // 订单id
                fixD(item.mortgageSellAmount, borrowSymbolFix), // 抵押物卖出金额
                fixD(item.needReturnAmount, borrowSymbolFix), // 平仓使用金额
                fixD(item.closeLeftAmount, borrowSymbolFix), // 平仓后剩余金额
                this.getCoinName(item.borrowSymbol), // 借贷币种
                fixD(item.borrowVolume, borrowSymbolFix), // 借贷数量
                item.complateTime ? formatTime(item.complateTime) : '--', // 平仓处理时间
                // 逾期产生平仓 / 质押率达到平仓质押率产生平仓
                item.type === 1
                  ? this.$t('broToloan.closeHis.t14')
                  : this.$t('broToloan.closeHis.t15'), // 平仓原因
                // 已完成 / 平仓中
                statusText,
              ],
            });
          });
          this.tabelLoading = false;
          this.tabelList = arr;
          this.paginationObj.total = data.data.count;
          if (!this.coinList.length) {
            const coinArr = [
              {
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
.toLoanHis {
  .toLoanHis-options {
    width: 100%;
    box-sizing: border-box;
    padding: 0 20px;
    margin-top: 14px;

    .common-select {
      display: inline-block;
      margin-right: 30px;
    }
  }

  .toLoanHis-table {
    width: 100%;
    box-sizing: border-box;
    padding: 0 20px;

    .table-head, .table-body-bar, .pagination {
      padding: 0 !important;
    }
  }
}
</style>
