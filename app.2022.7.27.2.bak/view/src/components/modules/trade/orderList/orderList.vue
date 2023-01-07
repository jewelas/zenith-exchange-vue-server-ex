<!-- 币币交易 实时成交 -->
<template>
    <div class="order-list-box a-5-bg">
      <div class="tab-box a-3-bd b-2-cl" :class="titleBlockClass">
        <span
          class="tab-item"
          v-for="(item, index) in tabTypeItem"
          :key="index + 'tab'"
          @click="switchType(index + 1)"
          :class="{'selected b-1-cl a-12-bd': orderType === index + 1}">
            {{item}}
        </span>
        <span v-if="openOrderCollect === '1'"
          class="all-order-btn u-8-cl"
          @click="goOrderPage">
          <!-- 全部订单 -->
          {{$t('trade.sellAll')}}
        </span>
      </div>
      <div class="order_type a-3-bd b-2-cl a-5-bg" v-if="orderType === 3">
        <div class="order_type_btn"
        :class="filterGridStatus === 1 ? 'u-8-bd u-8-cl' : 'a-3-bd'"
         @click="() => {this.filterGridStatus = 1;this.getData()}">
          <!-- 正在执行 -->
          {{$t('gridTrade.orderType1')}}
        </div>
        <div class="order_type_btn"
        :class="filterGridStatus === 0 ? 'u-8-bd u-8-cl' : 'a-3-bd'"
         @click="() => {this.filterGridStatus = 0;this.getData()}">
          <!-- 已完成 -->
          {{$t('gridTrade.orderType2')}}
        </div>
      </div>
      <div class="order-conent"
       :class="orderType === 3
       && $store.state.baseData.templateLayoutType === '2'
       ? 'order-content_height'
       : orderType === 3
       && $store.state.baseData.templateLayoutType != '2'
       ? 'pro-trade-order' : ''">
        <vue-scroll>
          <c-table
            :columns = 'columns'
            :imgMap="imgMap"
            :colorMap="colorMap"
            :dataList = 'dataList'
            :subContent = 'subTableData'
            :subContentId = 'subTableDataId'
            :subColumns = 'subColumns'
            :loading = 'false'
            :subLoading = 'subLoading'
            :cellHeight = 'cellHeight'
            @elementClick = "elementClick"
            :bodyClasses="orderType === 3 ? 'gridOrder a-7-bg': 'a-7-bg'"
           />
           <c-pagination v-if="(pagination.count/pagination.pageSize) > 1"
                    :total="pagination.count"
                    classes="a-7-bg"
                    :current-page='pagination.page'
                    :display='pagination.pageSize'
                    @pagechange="pagechange">
            </c-pagination>
        </vue-scroll>
      </div>
      <!-- <div class="notData a-7-bg" v-if="!dataList.length && !tableLoading"> -->
        <div class="notData a-7-bg"
         v-if="!dataList.length" :style="orderType === 3 ? 'top: 108px' : ''">
        <svg class="icon icon-50" aria-hidden="true">
          <use xlink:href="#icon-g_2"></use>
        </svg>
        <p>
          <!-- 暂无数据 -->
          {{$t('common.notData')}}
        </p>
      </div>
      <grid-dialog
       :dataId="gridItemId"
       :type="filterGridStatus"
       :fixValue="fixValue"
        :gridShowFlag="gridDoliog" @gridDialogClose="gridClose"></grid-dialog>
        <!-- 未认证 提示框 -->
      <c-alert :showFlag="gridCancelDoliog"
          :buttonText="$t('application.confirm')"
          :imgMap="imgMap"
          @close="() => this.gridCancelDoliog = false"
          :btnEventFlag="true"
          @confirm="gridCancelEvent">
          <div class="tip_title b-1-cl">
            <!-- 交易须知 -->
            {{$t('gridTrade.tip')}}
          </div>
          <!-- 终止网格后，会撤消所有未成交订单，确定要终止此网格交易？ -->
          <p class="tip_text">{{$t('gridTrade.tipContent')}}</p>
      </c-alert>
    </div>
</template>
<script>
import mixin from 'BlockChain-ui/PC/common-mixin/modules/trade/orderList/orderList';
import 'BlockChain-ui/PC/common-mixin/modules/trade/orderList/orderList.styl';
import {
  getCoinShowName, formatTime, fixD,
} from 'BlockChain-ui/utils';
import GridDialog from '../gridDialog/GridDialog.vue';

export default {
  mixins: [mixin],
  mounted() {
    this.init();
  },
  components: {
    GridDialog,
  },
  // 组价离开前执行
  beforeDestroy() {
    clearInterval(this.getDataInter);
  },
  data() {
    return {
      gridType: 0, // 网格类型 0: 网格详情； 1: 正在执行(20)； 2: 已完成
      gridDoliog: false, // 网格弹窗
      gridItemId: null, // list单个的数据
      gridCancelDoliog: false,
      filterGridStatus: 1, // 策略状态 0:启动中  1:正在执行   2:停止中   3:已关闭
    };
  },
  computed: {
    // tab 项
    tabTypeItem() {
      const arr = [
        this.$t('trade.activeOrder'), // 当前委托
        this.$t('trade.historyOrder'), // 历史委托
      ];
      if (this.gridTradeFlag && this.showGridFlag) {
        arr.push(this.$t('gridTrade.title'));
      }
      return arr;
    },
    // 表头
    columns() {
      if (this.orderType === 2) {
        return [
          {
            title: this.$t('trade.time'), // '时间',
            width: '100px',
          },
          {
            title: this.$t('trade.class'), // '类别'
            width: '200px',
          },
          {
            title: this.$t('trade.transaction'), // '交易对'
          },
          {
            title: `${this.$t('trade.price')}
            (${getCoinShowName(this.symbolUnit.units, this.coinList)})`, // 价格
          },
          {
            title: `${this.$t('trade.number')}
            (${getCoinShowName(this.symbolUnit.symbol, this.coinList)})`, // 数量
          },
          {
            title: this.$t('trade.average'), // '成交均价'
          },
          {
            title: this.$t('trade.status'), // '状态'
          },
          {
            title: this.$t('trade.opera'), // '操作'
            width: '100px',
          },
        ];
      }
      if (this.orderType === 3) {
        return [
          {
            title: this.$t('trade.time'), // '时间',
            width: '100px',
          },
          {
            title: this.$t('trade.transaction'), // '交易对'
            width: '100px',
          },
          {
            title: this.$t('gridTrade.clounms1'), // '总投入',
            width: '200px',
          },
          {
            title: this.$t('gridTrade.clounms2'), // 已产生利润
            width: '200px',
          },
          {
            title: this.$t('gridTrade.clounms3'), // 持仓盈亏
            width: '200px',
          },
          {
            title: this.$t('gridTrade.clounms4'), // '年化收益率'
            width: '200px',
          },
          {
            title: this.$t('gridTrade.clounms5'), // '运行时长'
            width: '200px',
          },
          {
            title: this.$t('trade.opera'), // '操作'
            width: '150px',
          },
        ];
      }
      return [
        {
          title: this.$t('trade.time'), // '时间',
          width: '100px',
        },
        {
          title: this.$t('trade.class'), // '类别'
          width: '150px',
        },
        {
          title: `${this.$t('trade.price')}
          (${getCoinShowName(this.symbolUnit.units, this.coinList)})`, // 价格
        },
        {
          title: `${this.$t('trade.number')}
          (${getCoinShowName(this.symbolUnit.symbol, this.coinList)})`, // 数量
        },
        {
          title: `${this.$t('trade.dealMoney')}
          (${getCoinShowName(this.symbolUnit.units, this.coinList)})`, // 交易额
        },
        {
          title: this.$t('trade.average'), // '成交均价'
        },
        {
          title: `${this.$t('trade.deal')}/${this.$t('trade.noDeal')}`, // 已成交/未成交
        },
        {
          title: this.$t('trade.opera'), // '操作'
          width: '100px',
          classes: 'opera',
        },
      ];
    },
    dataList() {
      if (this.orderData && this.orderData.orderType === this.orderType) {
        if (this.orderType === 1) {
          return this.formData(this.orderData.orderList, this.cancelOrderId);
        }
        if (this.orderType === 3) {
          return this.formGridData(this.orderData.strategyVoList);
        }
        return this.formHistoryData(this.orderData.orderList);
      }
      return [];
    },
  },
  methods: {
    gridClose() {
      this.gridDoliog = false;
    },
    // 请求订单数据
    getData(auto) {
      if (this.symbolCurrent && this.isLogin) {
        let url = this.$store.state.url.cointran.order;

        if (this.orderType === 2) {
          url = this.$store.state.url.ordercenter.historyNew;
        } else if (this.orderType === 3) { // 如果是网格直接请求网格接口
          url = 'quant/getStrategyList';
        }

        if (this.moduleType === 'lever') {
          url = this.$store.state.url.lever.old;
          if (this.orderType === 2) {
            url = this.$store.state.url.lever.all;
          }
        }
        const symbolArr = this.symbolCurrent.split('/');
        const symbol = symbolArr[0].toLowerCase() + symbolArr[1].toLowerCase();
        const data = {
          url,
          orderType: this.orderType,
          params: {
            symbol,
            pageSize: this.pagination.pageSize,
          },
        };
        if (this.orderType === 3) {
          data.hostType = 'quant';
          data.params.symbol = this.symbolCurrent;
          data.params.status = this.filterGridStatus;
        }
        if (this.orderIdArrar.length && this.orderType === 2) {
          data.params.idList = this.orderIdArrar;
        } else {
          data.params.page = this.pagination.page;
        }
        if (auto) {
          data.auto = true;
        }
        this.$store.dispatch('getOrderListData', data);
      }
    },
    // 轮训请求数据
    intervalGet() {
      if (this.filterGridStatus) {
        clearInterval(this.getDataInter);
        this.getDataInter = setInterval(() => {
          this.getData(true);
        }, this.timer);
      } else {
        clearInterval(this.getDataInter);
        this.getDataInter = null;
      }
    },
    // 网格交易数据格式化
    formGridData(data) {
      const dataArray = data || [];
      const newData = [];
      if (dataArray.length) {
        dataArray.forEach((item) => {
          let tableData = null;
          const symbolArr = item.symbol.split('/');
          // 网格状态 0:启动中 1:正在执行 2:停止中 3:已关闭
          if (this.filterGridStatus.toString() === '0') {
            tableData = {
              id: item.id,
              data: [
                formatTime(item.ctime),
                [
                  {
                    text: `${getCoinShowName(symbolArr[0], this.coinList)}/${getCoinShowName(symbolArr[1], this.coinList)}`,
                  },
                ],
                // 总投入
                [
                  {
                    text: `${fixD(item.configParamMap.totalQuoteAmount, this.fixValue.priceFix)}
                      ${getCoinShowName(symbolArr[1], this.coinList)} + ${fixD(item.configParamMap.totalBaseAmount, this.fixValue.priceFix)}
                      ${getCoinShowName(symbolArr[0], this.coinList)}`,
                  },
                ],
                // 已产生利润
                [
                  {
                    text: `${fixD(item.totalProfit, this.fixValue.priceFix)}
                      ${getCoinShowName(symbolArr[1], this.coinList)}(${fixD(item.totalProfitRate, 2)}%)`,
                  },
                ],
                // 持仓盈亏
                [
                  {
                    text: `${fixD(item.positionProfit, this.fixValue.priceFix)}
                      ${getCoinShowName(symbolArr[1], this.coinList)}`,
                  },
                ],
                // 年华收益率
                [
                  {
                    text: `${fixD(item.annualizedYield, 2)}%`,
                  },
                ],
                // 运行时长
                [
                  {
                    text: this.setTime(item.startTime, item.endTime),
                  },
                ],
                [
                  {
                    type: 'link',
                    text: this.$t('trade.view'), // 详情
                    eventType: 'gridDetail',
                  },
                ],
              ],
            };
          } else if (this.filterGridStatus.toString() === '1') {
            tableData = {
              id: item.id,
              data: [
                formatTime(item.ctime),
                [
                  {
                    text: `${getCoinShowName(symbolArr[0], this.coinList)}/${getCoinShowName(symbolArr[1], this.coinList)}`,
                  },
                ],
                // 总投入
                [
                  {
                    text: `${fixD(item.configParamMap.totalQuoteAmount, this.fixValue.priceFix)}
                      ${getCoinShowName(symbolArr[1], this.coinList)} + ${fixD(item.configParamMap.totalBaseAmount, this.fixValue.priceFix)}
                      ${getCoinShowName(symbolArr[0], this.coinList)}`,
                  },
                ],
                // 已产生利润
                [
                  {
                    text: `${fixD(item.totalProfit, this.fixValue.priceFix)}
                      ${getCoinShowName(symbolArr[1], this.coinList)}(${fixD(item.totalProfitRate, 2)}%)`,
                  },
                ],
                // 持仓盈亏
                [
                  {
                    text: `${fixD(item.positionProfit, this.fixValue.priceFix)}
                      ${getCoinShowName(symbolArr[1], this.coinList)}`,
                  },
                ],
                // 年华收益率
                [
                  {
                    text: `${fixD(item.annualizedYield, 2)}%`,
                  },
                ],
                // 运行时长
                [
                  {
                    text: this.setTime(item.startTime),
                  },
                ],
                [
                  {
                    type: 'link',
                    text: this.$t('trade.view'), // 详情
                    eventType: 'gridDetail',
                  },
                  {
                    type: 'link',
                    text: this.$t('gridTrade.close'), // 终止网格
                    eventType: 'gridCancel',
                    classes: 'grid_btn',
                  },
                ],
              ],
            };
          }
          if (tableData) {
            newData.push(tableData);
          }
        });
        return newData;
      }
      return [];
    },
    setTime(startTime, endTime) {
      if (!Number(startTime)) {
        return `0${this.$t('otcDetailOrder.day')}0${this.$t('innov.hours')}0${this.$t('otcDetailOrder.min')}`;
      }
      let dateEnd = new Date().getTime();
      if (endTime) {
        dateEnd = endTime;
      }
      const dateDiff = dateEnd - startTime;// 时间差的毫秒数
      const day = Math.floor(dateDiff / (24 * 3600 * 1000));// 计算出相差天数\
      const leave1 = dateDiff % (24 * 3600 * 1000); // 计算天数后剩余的毫秒数
      const hours = Math.floor(leave1 / (3600 * 1000));// 计算出小时数
      // 计算相差分钟数
      const leave2 = leave1 % (3600 * 1000); // 计算小时数后剩余的毫秒数
      const minutes = Math.floor(leave2 / (60 * 1000));// 计算相差分钟数
      function s(t) {
        return t < 10 && t > 0 ? `0${t}` : t;
      }
      return `${s(day)}${this.$t('otcDetailOrder.day')}${s(hours)}${this.$t('innov.hours')}${s(minutes)}${this.$t('otcDetailOrder.min')}`;
    },
    elementClick(type, data) {
      if (type === 'cancel') {
        this.cancelOrderEvent(data);
      } else if (type === 'gridDetail') {
        this.gridItemId = data;
        this.gridDoliog = true;
      } else if (type === 'gridCancel') {
        this.gridItemId = data;
        this.gridCancelDoliog = true;
      } else {
        this.getSubTableData(data);
      }
    },
    // 终止网格
    gridCancelEvent() {
      this.axios({
        url: 'quant/stopStrategy',
        hostType: 'quant',
        method: 'post',
        params: { strategyId: this.gridItemId },
      }).then((rep) => {
        if (rep.code.toString() === '0') {
          this.getData();
          // 重新请求资产
          this.$store.dispatch('assetsExchangeData', {
            auto: false,
            coinSymbols: this.coinSymbols,
          });
          // 撤单成功 提示
          this.$bus.$emit('tip', { text: rep.msg, type: 'success' });
        } else {
          this.$bus.$emit('tip', { text: rep.msg, type: 'error' });
        }
        this.gridCancelDoliog = false;
      });
    },
  },
};
</script>

<style lang="stylus">
  .order_type {
    display flex;
    align-items center;
    padding 6px 26px;
        border-bottom-width: 1px;
    border-bottom-style: solid;
  }
  .tip_title {
    line-height 16px;
    margin-bottom 15px;
  }
  .tip_text {
    font-size 12px;
    line-height 18px;
  }
  .order_type_btn {
    box-sizing border-box;
    border-width: 1px;
    border-style: solid;
    padding 4px 20px;
    cursor pointer;
    font-size 12px;
    line-height 14px;
  }
  .order_type_btn:nth-child(1) {
    // border-right none;
  }
  .order_list-top .notData {
    top 107px;
  }
  .table-body td .grid_btn {
    margin-left 0;
  }
  .pro-trade .order-list-box .gridOrder {
    min-height 218px;
  }
  .Int-trade .order-list-box .order-conent.order-content_height {
    height 313px;
    .table-body {
      min-height 280px;
    }
  }
  .pro-trade .order-list-box .order-conent.pro-trade-order {
    height 250px;
  }
  .order-conent th {
    padding:0 !important;
  }
  .order-content .table-head {
    background: #000 !important;
  }
</style>
