<template>
  <div>
    <section class='common-dialog'>
    <!-- 背景遮罩层 -->
    <div class='dialog_markAll u-7-bg' v-if='gridShowFlag'></div>
    <!-- 弹出框 -->
      <transition name='drop'>
        <div class='dialog_frame a-5-bg' v-if='gridShowFlag' ref='dialog'>
          <div class='dialog_frame_head a-4-bg'>
            <span class='dialog_frame_head_text b-1-cl'>
              {{symbol ?
               getCoinShowName(symbol[0], coinList)+'/'+getCoinShowName(symbol[1], coinList) : ''}}
              <!-- 运行时长 -->
               {{$t('gridTrade.clounms5')}}
               {{type.toString() === '0'
               ? setTime(gridData.startTime,gridData.endTime) : setTime(gridData.startTime)}}</span>
            <span class='dialog_frame_head_close'>
              <c-iconButton @click='dialogClose'>
                <svg class='icon icon-16' aria-hidden='true'>
                  <use xlink:href='#icon-c_7'></use>
                </svg>
              </c-iconButton>
            </span>
          </div>
          <div class='dialog_frame_body'>
            <div class="grid_tab a-3-bd">
              <span class="tab_item"
                @click="switchTradeType(1)"
                :class="{'a-12-bd b-1-cl': transactionType === 1}">
                <!-- 网格详情 -->
                {{$t('gridTrade.tab1')}}
              </span>
              <span class="tab_item"
                @click="switchTradeType(2)"
                :class="{'a-12-bd b-1-cl': transactionType === 2}">
                <!-- 正在执行 -->
                {{$t('gridTrade.tab2')}}
                ({{beingLeng}})
              </span>
              <span class="tab_item"
                @click="switchTradeType(3)"
                :class="{'a-12-bd b-1-cl': transactionType === 3}">
                <!-- 已完成 -->
                {{$t('gridTrade.tab3')}}
                ({{endLeng}})
              </span>
            </div>
            <div class="dialog_detail" v-if="transactionType === 1">
              <div class="detail_title a-3-bd">
                <div class="detail_title_item">
                  <div class="title_item_head">
                    <!-- 网格利润 -->
                    {{$t('gridTrade.dialog1')}}
                    ({{symbol ? getCoinShowName(symbol[1], coinList) : ' '}}）
                  </div>
                  <div class="title_item_content u-1-cl">
                    {{ fixD(gridData.totalProfit, this.fixValue.priceFix) }}
                  </div>
                </div>
                <div class="detail_title_item">
                  <div class="title_item_head">
                    <!-- 年化收益 -->
                    {{$t('gridTrade.dialog2')}}
                  </div>
                  <div class="title_item_content  u-1-cl">
                    {{fixD(gridData.annualizedYield,2)}}%
                  </div>
                </div>
                <div class="detail_title_item">
                  <div class="title_item_head">
                    <!-- 持仓盈亏 -->
                    {{$t('gridTrade.dialog3')}}
                    ({{symbol ? getCoinShowName(symbol[1], coinList) : ' '}}）
                  </div>
                  <div class="title_item_content  u-1-cl">
                    {{ fixD(gridData.positionProfit, this.fixValue.priceFix)}}
                  </div>
                </div>
              </div>
              <div class="detail_content">
                <div class="detail_content_item">
                  <div class="detail_content_item_key">
                    <!-- 价格区间 -->
                    {{$t('gridTrade.setText2')}}
                  </div>
                  <div class="detail_content_item_val">
                    {{
                      gridData && gridData.configParamMap ?
                      fixD(gridData.configParamMap.lowestPrice, this.fixValue.priceFix) : '--'
                    }}
                     - {{gridData && gridData.configParamMap ?
                      fixD(gridData.configParamMap.highestPrice, this.fixValue.priceFix) : '--'}}
                  </div>
                </div>
                <div class="detail_content_item">
                  <div class="detail_content_item_key">
                    <!-- 网格类型 -->
                    {{$t('gridTrade.dialog4')}}
                  </div>
                  <div class="detail_content_item_val">
                    <!-- 等差网格 -->
                    {{gridData && gridData.configParamMap
                    && Number(gridData.configParamMap.gridLineType) === 1 ?
                     $t('gridTrade.setText6') : $t('gridTrade.setText7')}}
                  </div>
                </div>
                <div class="detail_content_item">
                  <div class="detail_content_item_key">
                    <!-- 初始投入资产 -->
                    {{$t('gridTrade.dialog5')}}
                  </div>
                  <div class="detail_content_item_val">
                    {{
                      gridData && gridData.configParamMap ?
                      fixD(gridData.configParamMap.totalQuoteAmount, this.fixValue.priceFix) : '--'
                    }}
                    {{symbol ? getCoinShowName(symbol[1], coinList) : ' '}}
                    {{gridData && gridData.configParamMap
                     && gridData.configParamMap.totalBaseAmount ?
                    `+${fixD(gridData.configParamMap.totalBaseAmount, this.fixValue.priceFix)}
                    ${symbol ? getCoinShowName(symbol[0], coinList) : ''}` : ''}}
                  </div>
                </div>
                <div class="detail_content_item">
                  <div class="detail_content_item_key">
                    <!-- 网格数量 -->
                    {{$t('gridTrade.setText5')}}
                  </div>
                  <div class="detail_content_item_val">
                    {{
                      gridData && gridData.configParamMap ?
                      fixD(gridData.configParamMap.gridNumber, 0) : '--'
                    }}
                  </div>
                </div>
                <div class="detail_content_item">
                  <div class="detail_content_item_key">
                    <!-- 委托时间 -->
                    {{$t('gridTrade.dialog6')}}
                  </div>
                  <div class="detail_content_item_val">
                    {{formatTime(gridData.ctime)}}
                  </div>
                </div>
              </div>
            </div>
            <div class="dialog_being" v-if="transactionType === 2">
              <div class="being_conent">
                <vue-scroll>
                  <c-table
                    :columns='columns'
                    :colorMap="colorMap"
                    :dataList='beingTabelList'
                    :loading='BeingLoding'
                    :cellHeight='cellHeight'
                    bodyClasses='a-5-bg grid_class'
                  />
                  <c-pagination v-if="(pagination.total/pagination.pageSize) > 1"
                            :total="pagination.total"
                            classes="a-5-bg"
                            :current-page='pagination.page'
                            :display='pagination.pageSize'
                            @pagechange="pagechange">
                    </c-pagination>
                </vue-scroll>
              </div>
            </div>
            <div class="dialog_end" v-if="transactionType === 3">
              <div class="bend_conent">
                <vue-scroll>
                  <GridTabel
                    :columns='columns'
                    :colorMap="colorMap"
                    :dataList='endTabelList'
                    :loading='endLoding'
                    :cellHeight='cellHeight'
                    :subContent='subTableData'
                    :subContentId='subTableDataId'
                    :subLoading='subLoading'
                    @elementClick="elementClick"
                    bodyClasses='a-5-bg grid_class'
                  />
                  <c-pagination v-if="(pagination.total/pagination.pageSize) > 1"
                            :total="pagination.total"
                            classes="a-5-bg"
                            :current-page='pagination.page'
                            :display='pagination.pageSize'
                            @pagechange="pagechange">
                    </c-pagination>
                </vue-scroll>
              </div>
            </div>
          </div>
        </div>
      </transition>
    </section>
  </div>
</template>

<script>
import {
  colorMap,
  formatTime,
  fixD,
  getCoinShowName,
} from 'BlockChain-ui/utils';
import GridTabel from './GridTabel.vue';

export default {
  name: 'GridDialog',
  props: {
    gridShowFlag: {
      default: false,
      type: Boolean,
    },
    dataId: {
      default: null,
      type: [Number, String],
    },
    fixValue: {
      default: null,
      type: Object,
    },
    type: { // 网格状态已完成和正在执行
      default: null,
      type: [Number, String],
    },
  },
  data() {
    return {
      beingTabelList: [],
      endTabelList: [],
      tableLoading: false,
      cellHeight: 38,
      pagination: {
        total: 0, // 数据总条数
        pageSize: 30, // 每页显示条数
        page: 1, // 当前页码
      },
      transactionType: 1, // 选择哪个tab
      colorMap,
      BeingLoding: false,
      endLoding: false,
      subTableData: [],
      subLoading: false,
      subTableDataId: null,
      getDataInter: null,
      gridData: {},
      beingLeng: 0,
      endLeng: 0,
      timer: 5000,
    };
  },
  components: {
    GridTabel,
  },
  watch: {
    gridShowFlag(v) {
      if (v) {
        this.$nextTick(() => {
          this.getGridData();
          this.intervalGet();
          if (this.$refs.dialog.offsetHeight % 2 !== 0) {
            const str = `${this.$refs.dialog.offsetHeight + 1}px`;
            this.$refs.dialog.style.height = str;
          }
        });
      }
    },
  },
  computed: {
    // 表头
    columns() {
      if (this.transactionType === 2) {
        return [
          {
            title: this.$t('gridTrade.dialog7'), // '买盘',
            width: '10%',
          },
          {
            title: this.$t('gridTrade.dialog8'), // '买入价格'
            width: '30%',
          },
          {
            title: this.$t('gridTrade.dialog9'), // '卖出价格'
            width: '30%',
          },
          {
            title: this.$t('gridTrade.dialog10'), // 卖盘
            width: '25%',
          },
        ];
      } if (this.transactionType === 3) {
        return [
          {
            title: this.$t('trade.time'), // '时间',
            width: '300px',
          },
          {
            title: `${this.$t('gridTrade.dialog11')}(${this.symbol ? getCoinShowName(this.symbol[1], this.coinList) : ''})`, // '利润'
          },
        ];
      }
      return [];
    },
    symbol() {
      let symbol = null;
      if (this.gridData && this.gridData.symbol) {
        symbol = this.gridData.symbol.split('/');
      }
      return symbol;
    },
    // 全部币种列表
    coinList() {
      if (this.$store.state.baseData && this.$store.state.baseData.market) {
        return this.$store.state.baseData.market.coinList;
      }
      return null;
    },
  },
  methods: {
    formatTime,
    fixD,
    getCoinShowName,
    dialogClose() {
      this.beingTabelList = [];
      this.endTabelList = [];
      this.tableLoading = false;
      this.pagination.total = 0;
      this.transactionType = 1; // 选择哪个tab
      this.gridData = {};
      this.beingLeng = 0;
      this.endLeng = 0;
      clearInterval(this.getDataInter);
      this.getDataInter = null;
      this.$emit('gridDialogClose');
    },
    // 点击tab
    switchTradeType(val) {
      this.transactionType = val;
      this.pagination.total = 0;
      this.pagination.page = 1; // 当前页码
      clearInterval(this.getDataInter);
      this.getDataInter = null;
      if (val === 2) {
        this.getBeingData();
      } else if (val === 3) {
        this.getEndData();
      } else {
        this.getGridData();
        this.intervalGet();
      }
    },
    // 轮训请求数据
    intervalGet() {
      clearInterval(this.getDataInter);
      // 如果定时器没有和等于详情tab和是正在进行再论训
      if (!this.getDataInter && this.transactionType === 1 && this.type === 1) {
        this.getDataInter = setInterval(() => {
          this.getGridData();
        }, this.timer);
      }
    },
    // 翻页事件
    pagechange(num) {
      this.pagination.page = num;
      this.subTableData = null;
      this.subTableDataId = null;
      // this.orderIdArrar = [];
      if (this.transactionType === 3) {
        this.getEndData();
      } else if (this.transactionType === 2) {
        this.getBeingData();
      }
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
    // 请求详情
    getGridData() {
      const params = {
        id: this.dataId,
      };
      this.axios({
        url: 'quant/getStrategyById ',
        hostType: 'quant',
        method: 'post',
        params,
      }).then((data) => {
        if (data.code.toString() === '0') {
          if (data.data) {
            this.gridData = { ...data.data };
            // 正在执行总条数
            this.beingLeng = this.gridData.orderingCount;
            // 已执行总条数
            this.endLeng = this.gridData.finishCount;
          }
        } else {
          this.$bus.$emit('tip', { text: data.msg, type: 'error' });
        }
      });
    },
    // 请求正在执行tabel
    getBeingData() {
      if (this.BeingLoding) {
        return;
      }
      this.BeingLoding = true;
      this.beingTabelList = [];
      const params = {
        strategyId: this.dataId,
      };
      this.axios({
        url: 'quant/getOrderingGridList',
        hostType: 'quant',
        method: 'post',
        params,
      }).then((data) => {
        if (data.code.toString() === '0') {
          const newList = [];
          if (data.data && data.data) {
            if (data.data.BUY && data.data.BUY.length) {
              data.data.BUY.forEach((item, i) => {
                if (!data.data.SELL[i]) {
                  newList[i] = {
                    id: i,
                    data: [
                      i + 1,
                      [
                        {
                          text: fixD(item, this.fixValue.priceFix),
                          classes: 'u-1-cl',
                        },
                      ],
                      null,
                      null,
                    ],
                  };
                } else {
                  newList[i] = {
                    id: i,
                    data: [
                      i + 1,
                      [
                        {
                          text: fixD(item, this.fixValue.priceFix),
                          classes: 'u-1-cl',
                        },
                      ],
                    ],
                  };
                }
              });
            }
            if (data.data.SELL && data.data.SELL.length) {
              data.data.SELL.forEach((item, i) => {
                if (!newList[i]) {
                  newList[i] = {
                    id: i,
                    data: [
                      null,
                      null,
                      [
                        {
                          text: fixD(item, this.fixValue.priceFix),
                          classes: 'u-4-cl',
                        },
                      ],
                      i + 1,
                    ],
                  };
                } else {
                  newList[i].data.push(
                    [
                      {
                        text: fixD(item, this.fixValue.priceFix),
                        classes: 'u-4-cl',
                      },
                    ],
                    i + 1,
                  );
                }
              });
            }
            this.beingLeng = data.data.BUY.length + data.data.SELL.length;
          }
          this.beingTabelList = [...newList];
          this.BeingLoding = false;
        } else {
          this.$bus.$emit('tip', { text: data.msg, type: 'error' });
        }
      });
    },
    // 请求已完成tabel
    getEndData() {
      if (this.endLoding) {
        return;
      }
      this.endLoding = true;
      this.endTabelList = [];
      if (this.gridData) {
        const params = {
          strategyId: this.dataId,
          pageSize: this.pagination.pageSize,
          page: this.pagination.page, // 页码
        };
        this.axios({
          url: 'quant/getFinishGridList',
          hostType: 'quant',
          method: 'post',
          params,
        }).then((data) => {
          if (data.code.toString() === '0') {
            const list = [];
            if (data.data && data.data && data.data.list.length) {
              data.data.list.forEach((item, i) => {
                const subData = [];
                if (item.buyOrder && !item.sellOrder) {
                  subData.push({
                    typeText: item.buyOrder.orderSide === 'BUY' ? this.$t('trade.buy') : this.$t('trade.sell'),
                    balanceSymbol: this.symbol ? getCoinShowName(this.symbol[1], this.coinList) : '',
                    numSymbol: this.symbol ? getCoinShowName(this.symbol[0], this.coinList) : '',
                    avgPrice: fixD(item.buyOrder.avgPrice, this.fixValue.priceFix), // 成交均价
                    dealMoney: fixD(item.buyOrder.dealMoney, this.fixValue.priceFix), // 成交金额
                    orderCtime: formatTime(item.buyOrder.orderCtime),
                    type: 1,
                    dealVolume: fixD(item.buyOrder.dealVolume, this.fixValue.volumeFix), // 成交数量
                  });
                } else if (item.buyOrder && item.sellOrder) {
                  subData.push({
                    typeText: item.buyOrder.orderSide === 'BUY' ? this.$t('trade.buy') : this.$t('trade.sell'),
                    balanceSymbol: this.symbol ? getCoinShowName(this.symbol[1], this.coinList) : '',
                    numSymbol: this.symbol ? getCoinShowName(this.symbol[0], this.coinList) : '',
                    avgPrice: fixD(item.buyOrder.avgPrice, this.fixValue.priceFix), // 成交均价
                    dealMoney: fixD(item.buyOrder.dealMoney, this.fixValue.priceFix), // 成交金额
                    orderCtime: formatTime(item.buyOrder.orderCtime),
                    type: 1,
                    dealVolume: fixD(item.buyOrder.dealVolume, this.fixValue.volumeFix), // 成交数量
                  },
                  {
                    typeText: item.sellOrder.orderSide === 'BUY' ? this.$t('trade.buy') : this.$t('trade.sell'),
                    balanceSymbol: this.symbol ? getCoinShowName(this.symbol[1], this.coinList) : '',
                    numSymbol: this.symbol ? getCoinShowName(this.symbol[0], this.coinList) : '',
                    type: 2,
                    orderCtime: formatTime(item.sellOrder.orderCtime),
                    avgPrice: fixD(item.sellOrder.avgPrice, this.fixValue.priceFix), // 成交均价
                    dealMoney: fixD(item.sellOrder.dealMoney, this.fixValue.priceFix), // 成交金额
                    dealVolume: fixD(item.sellOrder.dealVolume, this.fixValue.volumeFix), // 成交数量
                  });
                } else if (!item.buyOrder && item.sellOrder) {
                  subData.push({
                    typeText: item.sellOrder.orderSide === 'BUY' ? this.$t('trade.buy') : this.$t('trade.sell'),
                    balanceSymbol: this.symbol ? getCoinShowName(this.symbol[1], this.coinList) : '',
                    numSymbol: this.symbol ? getCoinShowName(this.symbol[0], this.coinList) : '',
                    type: 2,
                    orderCtime: formatTime(item.sellOrder.orderCtime),
                    avgPrice: fixD(item.sellOrder.avgPrice, this.fixValue.priceFix), // 成交均价
                    dealMoney: fixD(item.sellOrder.dealMoney, this.fixValue.priceFix), // 成交金额
                    dealVolume: fixD(item.sellOrder.dealVolume, this.fixValue.volumeFix), // 成交数量
                  });
                }
                list.push({
                  id: i,
                  data: [
                    [
                      {
                        classes: 'size_text',
                        text: item.buyTime ? formatTime(item.buyTime) : '--',
                      },
                    ],
                    [
                      {
                        type: 'subTable',
                        text: item.profit ? fixD(item.profit, this.fixValue.priceFix) : '--',
                        eventType: 'view',
                        classes: 'u-1-cl size_text',
                      },
                    ],
                  ],
                  subData,
                });
              });
            }
            this.endTabelList = [...list];
            this.endLeng = data.data.count; // 已执行总条数
            this.endLoding = false;
            this.pagination.total = data.data.count;
          } else {
            this.$bus.$emit('tip', { text: data.msg, type: 'error' });
          }
        });
      }
    },
    elementClick(type, data) {
      this.setSubTableData(data);
    },
    // 查看详情
    setSubTableData(data) {
      this.subLoading = true;
      this.subTableDataId = data.id;
      this.subTableData = [];
      if (this.endTabelList.length) {
        this.endTabelList.forEach((item) => {
          if (item.id === data.id) {
            this.subTableData = [...item.subData];
          }
        });
      }
      this.subLoading = false;
    },
  },
};
</script>

<style>
  .grid_tab {
    height: 39px;
    line-height: 39px;
    padding: 0 30px;
    border-bottom-width: 1px;
    border-bottom-style: solid;
  }
  .detail_title {
    border-bottom-width: 1px;
    border-bottom-style: solid;
    padding: 10px 40px;
    display: flex;
    justify-content: space-between;
  }
  .detail_content {
    padding: 20px 40px;
  }
  .detail_content_item {
    margin-bottom: 10px;
    display: flex;
    line-height: 15px;
  }
  .detail_content_item_key {
    width: 360px;
  }
  .title_item_head {
    margin-bottom: 6px;
    font-size: 12px;
    line-height: 16px;
  }
  .title_item_content {
    font-size: 16px;
    line-height: 22px;
  }
  .tab_item {
    display: inline-block;
    border-bottom-style: solid;
    border-bottom-width: 0px;
    height: 38px;
    cursor: pointer;
    user-select: none;
    margin-right: 36px;
    font-size: 14px;
  }
  .tab_item.a-12-bd {
    border-bottom-style: solid;
    border-bottom-width: 2px;
  }
  .trade-content .grid_class {
    height: 300px;
    overflow: auto;
  }
 .table-body .size_text {
    font-size: 14px;
  }
@keyframes drop-in {
  0% {
    /* // transform: translateY(-100%); */
    top: 35%;
    opacity: 0.7
  }
  100% {
    /* margin-top: 10px; */
    /* // transform: translateY(-50%); */
    opacity: 1;
  }
}
  .dialog_markAll {
    position: fixed;
    width: 100%;
    height: 100%;
    z-index: 999;
    top: 0;
    left: 0;
  }
  .dialog_frame {
    transform: 0.3s transition;
    position: fixed;
    z-index: 1000;
    left: 50%;
    top: 50%;
    transform: translate3d(-50%, -50%, 0);
    width: 800px;
    border-radius: 2px;
  }
  .dialog_frame_head {
    box-sizing: border-box;
    height: 60px;
    width: 100%;
    padding: 0 40px;
    line-height: 60px;
  }
  .dialog_frame_head_text {
    font-size: 16px;
  }
  .dialog_frame_head_close {
    float: right;
    cursor: pointer;
    font-size: 20px;
    margin-top: 12px;
  }
  .dialog_frame_body {
    padding-bottom: 50px;
  }
</style>
