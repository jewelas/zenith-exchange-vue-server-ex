<template>
  <section class="toLoanHis">
    <div class="toLoanHis-options">
      <!-- 抵押币种 -->
      <c-select
        :promptText="$t('broToloan.pledgeRate.t1')"
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
      side: '', // 方向
      tabelList: [],
      tabelLoading: true,
      paginationObj: {
        total: 0, // 数据总条数
        display: 10, // 每页显示条数
        currentPage: 1, // 当前页码
      },
      sideList: [],
      imgMap,
      colorMap,
    };
  },
  computed: {
    market() {
      return this.$store.state.baseData.market || {};
    },
    // 表格title
    columns() {
      let list = [];
      list = [
        // 订单号
        {
          title: this.$t('broToloan.paymentHis.t2'),
          width: '60px',
        },
        // 借贷时间
        {
          title: this.$t('broToloan.paymentHis.t3'),
          width: '90px',
        },
        // 还款时间
        {
          title: this.$t('broToloan.paymentHis.t4'),
          width: '90px',
        },
        // 还款币种
        {
          title: this.$t('broToloan.paymentHis.t5'),
        },
        // 还款总额
        {
          title: this.$t('broToloan.paymentHis.t6'),
        },
        // 还款本金
        {
          title: this.$t('broToloan.paymentHis.t7'),
        },
        // 还款利息
        {
          title: this.$t('broToloan.paymentHis.t8'),
          // width: '130px',
        },
        // 抵押币种
        {
          title: this.$t('broToloan.paymentHis.t9'),
          width: '140px',
        },
        // 状态
        {
          title: this.$t('broToloan.paymentHis.t10'),
          width: '100px',
        },
      ];
      return list;
    },
  },
  created() {
    // this.getData();
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
    getBorrowSymbolFix(symbol) {
      if (this.borrowSymbolObj[symbol]) {
        return this.borrowSymbolObj[symbol].showPrecision;
      }
      return 8;
    },
    getData() {
      this.axios({
        url: 'borrow/get_return_record_list',
        headers: {},
        params: {
          // borrowSymbol: this.borrowSymbol,
          // mortgageSymbol: this.mortgageSymbol,
          mortgageSymbol: this.side === 'all' ? '' : this.side,
          pageSize: this.paginationObj.display, // 每页条数
          page: this.paginationObj.currentPage, // 页码
        },
        hostType: 'fe-increment-api',
        method: 'post',
      }).then((data) => {
        if (data.code === 0) {
          const arr = [];
          data.data.list.forEach((item) => {
            // const borrowSymbolFix = this.getBorrowSymbolFix(
            //   item.returnSymbol + item.mortgageSymbol,
            // );
            arr.push({
              id: JSON.stringify(item),
              data: [
                item.orderId, // 订单id
                item.borrowTime ? formatTime(item.borrowTime) : '--', // 借贷时间戳
                item.returnTime ? formatTime(item.returnTime) : '--', // 还款时间
                this.getCoinName(item.returnSymbol), // 还款币种
                fixD(item.returnVolume, 8), // 还款总额
                fixD(item.costVolume, 8), // 还款本金
                fixD(item.inserestVolume, 8), // 还款利息
                this.getCoinName(item.mortgageSymbol), // 抵押币种
                //
                // 已完成 / 还款中
                item.status === 1
                  ? this.$t('broToloan.paymentHis.t11')
                  : this.$t('broToloan.paymentHis.t12'),
              ],
            });
          });
          this.tabelLoading = false;
          this.tabelList = arr;
          this.paginationObj.total = data.data.count;
          if (!this.sideList.length) {
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
            this.sideList = coinArr;
            this.side = coinArr[0].code;
          }
        } else {
          this.$bus.$emit('tip', { text: data.msg, type: 'error' });
        }
      });
    },
    tableClick() {

    },
    // 分页器
    pagechange(v) {
      this.paginationObj.currentPage = v;
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
