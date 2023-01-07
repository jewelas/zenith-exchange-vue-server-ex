<template>
  <section class="toLoanHis">
    <div class="toLoanHis-options">
      <!-- 状态 -->
      <c-select
        :promptText="$t('broToloan.toLoanHis.t1')"
        :value="side"
        :options="sideList"
        :errorHave="true"
        width="160px"
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
    <!-- 查看利息 / 还款  -->
    <c-dialog
      :showFlag="seeRateFlag"
      :titleText="$t('broToloan.toLoanHis.t2')"
      :confirmText="$t('broToloan.toLoanHis.t3')"
      @close="seeRateClose"
      @confirm="goHk"
      :haveOption="InerestDteObj.status === 1"
    >
      <section class="toLoan-dialog-box">
        <ul class="toLoan-dialog-list">
          <!-- 借币数量 -->
          <li class="a-4-bg">
            <span class="key">{{ $t('broToloan.toLoanHis.t4') }}</span>
            <span class="value b-1-cl">
              {{ getCoinName(InerestDte.mortgageSymbol) }}</span>
          </li>
          <!-- 抵押数量 -->
          <li class="a-4-bg">
            <span class="key">{{ $t('broToloan.toLoanHis.t5') }}</span>
            <span class="value b-1-cl">
              {{ formatTimeFN(InerestDte.borrowTime, {splitDay: true}) }}
              ~{{ formatTimeFN(InerestDte.expireTime, {splitDay: true}) }}
            </span>
          </li>
          <!-- 借币期限 -->
          <li class="a-4-bg">
            <span class="key">{{ $t('broToloan.toLoanHis.t6') }}</span>
            <span class="value b-1-cl">
              {{
                toFix(InerestDte.totalInserest, 8)
              }}
              {{ getCoinName(InerestDteObj.borrowSymbol) }}</span>
          </li>
          <!-- 日利率 -->
          <li class="a-4-bg">
            <span class="key">{{ $t('broToloan.toLoanHis.t7') }}</span>
            <span class="value b-1-cl">
              {{
                toFix(InerestDte.returnInserest, 8)
              }}
              {{ getCoinName(InerestDteObj.borrowSymbol) }}</span>
          </li>
        </ul>
        <c-table
          :imgMap="imgMap"
          :colorMap="colorMap"
          :loading="rateListLoading"
          :columns="rateColumns"
          :dataList="rateList"
        />
      </section>
    </c-dialog>
    <!-- 还款 -->
    <c-dialog
      :showFlag="repaymentFlag"
      :titleText="$t('broToloan.toLoanHis.t3')"
      :confirmText="$t('broToloan.toLoanHis.t3')"
      :confirmDisabled="!repaymentValueObjs.flag"
      :confirmLoading="repaymentDialogLoading"
      @close="repaymentDialogClose"
      @confirm="repaymentDialogConfirm"
    >
      <section class="toLoan-dialog-box">
        <!-- 还款金额 -->
        <c-inputLine
          name='repaymentValue'
          :value="repaymentValue"
          :promptText="$t('broToloan.toLoanHis.t8')"
          :errorHave="true"
          :errorText="repaymentValueObjs.text"
          :errorFlag="repaymentValueObjs.error"
          @onchanges="inputLineChange">
          <div>
            <c-button type="text" height="30px" @click="maxClick">
              <!-- 最大 -->
              {{ $t('broToloan.toLoanHis.t9') }}
            </c-button>
            <span style="vertical-align: middle;">
              {{ getCoinName(repObj.borrowSymbol) }}</span>
          </div>
        </c-inputLine>
        <div class="toLoan-dialog-repayment-text" style="margin-top: 5px">
          <!-- 应还本息 -->
          <span class="toLoan-dialog-repayment-textK">
            {{ $t('broToloan.toLoanHis.t10') }}：</span>
          <span class="f-1-cl toLoan-dialog-repayment-textV">
              {{
                toFix(repObj.remainInserestAndPrincipal, 8)
              }}
            {{ getCoinName(repObj.borrowSymbol) }}</span>
        </div>
        <div class="toLoan-dialog-repayment-text">
          <!-- 余额 -->
          <span class="toLoan-dialog-repayment-textK">
            {{ $t('broToloan.toLoanHis.t11') }}：</span>
          <span class="f-1-cl toLoan-dialog-repayment-textV">
              {{
                toFix(nowBanlance, 8)
              }}
              {{ getCoinName(repObj.borrowSymbol) }}
          </span>
        </div>
        <div class="toLoan-dialog-repayment-spk clearfix">
          <div class="toLoan-dialog-repayment-spk-even"
            :class="activeSpk === item ? 'u-8-bd f-1-cl' : 'a-2-bd'"
            @click="setSpk(item)"
            v-for="(item, index) in spkList"
            :key="index">
            {{ item }}%
          </div>
        </div>
        <!-- 以下是您的还款详情 -->
        <div style="margin-top: 34px">{{ $t('broToloan.toLoanHis.t12') }}：</div>
        <div class="f-1-cl" style="margin: 10px 0 20px 0">
          <!-- 借币周期({{ repObj.periodDays }}天): -->
          {{ $t('broToloan.toLoanHis.t13') }}
          ({{ getDay(repObj.borrowTime, repObj.nowTime) }}
          <!-- 天 -->
          {{ $t('broToloan.toLoanHis.t14') }}):
          {{ formatTimeFN(repObj.borrowTime) }}~{{ formatTimeFN(repObj.nowTime) }}</div>
          <!-- this.repObj. = new Date().getTime() -->
          <!-- {{ formatTimeFN(repObj.borrowTime) }}~{{ formatTimeFN(repObj.) }}</div> -->
        <ul class="toLoan-dialog-list">
          <!-- 借币数量 -->
          <li class="a-4-bg">
            <span class="key">
              <!-- 利息应还 -->
              {{ $t('broToloan.toLoanHis.t15') }}
            </span>
            <span class="value b-1-cl">
              {{
                toFix(repObj.remainInserest, 8)
              }}
            {{ getCoinName(repObj.borrowSymbol) }}
            </span>
          </li>
          <!-- 本金应还 -->
          <li class="a-4-bg">
            <!-- 本金应还 -->
            <span class="key">{{ $t('broToloan.toLoanHis.t16') }}</span>
            <span class="value b-1-cl">
              {{
                toFix(repObj.remainCost, 8)
              }}
              {{ getCoinName(repObj.borrowSymbol) }}
            </span>
          </li>
          <!-- 总额应还 -->
          <li class="a-4-bg">
            <span class="key">{{ $t('broToloan.toLoanHis.t17') }}</span>
            <span class="value b-1-cl">
              {{
                toFix(repObj.remainInserestAndPrincipal, 8)
              }}
              {{ getCoinName(repObj.borrowSymbol) }}</span>
          </li>
          <!-- 本次还款后剩余应还 -->
          <li class="a-4-bg">
            <span class="key">{{ $t('broToloan.toLoanHis.t18') }}</span>
            <span class="value b-1-cl">
              {{
                toFix(syRp, 8)
              }}
              {{ getCoinName(repObj.borrowSymbol) }}
            </span>
          </li>
          <!-- 本次还款后质押率 -->
          <li class="a-4-bg">
            <span class="key">{{ $t('broToloan.toLoanHis.t19') }}</span>
            <span class="value b-1-cl">{{ mortgageRate }}%</span>
          </li>
        </ul>
      </section>
    </c-dialog>
    <!-- 借贷详情 -->
    <c-dialog
      :showFlag="viewFlag"
      :haveOption="false"
      :titleText="$t('broToloan.toLoanHis.t20')"
      @close="viewDialogClose"
    >
      <section class="toLoan-dialog-box">
        <ul class="toLoan-dialog-list">
          <!-- 订单号 -->
          <li class="a-4-bg">
            <span class="key">{{ $t('broToloan.toLoanHis.t21') }}</span>
            <span class="value b-1-cl">{{ detObj.id }}</span>
          </li>
          <!-- 实际计息天数 -->
          <li class="a-4-bg">
            <span class="key">{{ $t('broToloan.toLoanHis.t22') }}</span>
            <span class="value b-1-cl">{{ detObj.inserestDays }}
              <!-- 天 -->
              {{ $t('broToloan.toLoanHis.t14') }}
            </span>
          </li>
          <!-- 已还本息 -->
          <li class="a-4-bg">
            <span class="key">{{ $t('broToloan.toLoanHis.t23') }}</span>
            <span class="value b-1-cl">
                {{ toFix(
                detObj.returnInserestAndPrincipal,
                8
                ) }}</span>
          </li>
          <!-- 抵押币种 -->
          <li class="a-4-bg">
            <span class="key">{{ $t('broToloan.toLoanHis.t24') }}</span>
            <span class="value b-1-cl">{{ getCoinName(detObj.mortgageSymbol) }}</span>
          </li>
          <!-- 抵押数量 -->
          <li class="a-4-bg">
            <span class="key">{{ $t('broToloan.toLoanHis.t25') }}</span>
            <span class="value b-1-cl">
              {{ mortgageSymbolFixD(
                detObj.mortgageVolume,
                detObj.mortgageSymbol
                ) }}
            </span>
          </li>
          <!-- 质押率 -->
          <li class="a-4-bg">
            <span class="key">{{ $t('broToloan.toLoanHis.t26') }}</span>
            <span class="value b-1-cl">{{ detObj.mortgageRate }}%</span>
          </li>
          <!-- 预计平仓价格 -->
          <li class="a-4-bg">
            <span class="key">{{ $t('broToloan.toLoanHis.t27') }}</span>
            <span class="value b-1-cl">
              {{ toFix(
                detObj.closePositionPrice,
                getPriceFix(detObj)
                ) }}
            </span>
          </li>
        </ul>
      </section>
    </c-dialog>
    <!-- 调整质押率 -->
    <c-dialog
      :showFlag="setRateFlag"
      paddingTop="10px"
      :titleText="$t('broToloan.toLoanHis.t28')"
      @close="setRateFlagClose"
      @confirm="setRateFlagConfirm"
      :confirmLoading="setRateFlagLoading"
      :confirmText="setRateTexts.button"
      :confirmDisabled="!setRateValueObjs.flag"
    >
      <section class="toLoan-dialog-box">
        <div class="toLoanHis-nav a-3-bd">
            <c-navTab
                activeClassName="b-1-cl"
                activeColor="a-12-bg"
                className="b-2-cl"
                :currentTab="nowType"
                :navTab="navTab"
                lineHeight="40"
                @currentType="currentType"
            />
        </div>
        <!-- 归还数量 -->
        <c-inputLine
          name='setRateValue'
          :value="setRateValue"
          :promptText="setRateTexts.inputTitle"
          :errorHave="true"
          :errorText="setRateValueObjs.text"
          :errorFlag="setRateValueObjs.error"
          @onchanges="inputLineChange">
          <div>
            <c-button type="text" height="30px" @click="setRateMaxClick">
              <!-- 最大 -->
              {{ $t('broToloan.toLoanHis.t9') }}
            </c-button>
            <span style="vertical-align: middle;">
              {{ getCoinName(setRateObj.mortgageSymbol) }}</span>
          </div>
        </c-inputLine>
        <div>
          {{ setRateTexts.inputBot }}
          <span class="b-1-cl">{{ nowType === 1
            ? mortgageSymbolFixD(setRateBanlance,
              setRateObj.mortgageSymbol)
            : mortgageSymbolFixD(canTransferAmount,
              setRateObj.mortgageSymbol)  }}
            {{ getCoinName(setRateObj.mortgageSymbol) }}</span>
        </div>
        <ul class="toLoan-dialog-list" style="margin-top: 20px">
          <!-- 当前质押率 -->
          <li class="a-4-bg">
            <span class="key">{{ $t('broToloan.toLoanHis.t29') }}</span>
            <span class="value b-1-cl">{{ setRateObj.mortgageRate }}%</span>
          </li>
          <!-- 本次补仓后质押率 -->
          <li class="a-4-bg">
            <span class="key">{{setRateTexts.endText }}</span>
            <span class="value b-1-cl">
              {{  setRateValue * 1 ? afterMortgageRate + '%' : '--%' }}</span>
          </li>
        </ul>
      </section>
    </c-dialog>
  </section>
</template>

<script>
import {
  fixD,
  fixInput,
  // getCoinShowName,
  formatTime,
  imgMap,
  colorMap,
  getCoinShowName,
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
      rateList: [],
      repaymentValue: '', // 还款金额
      tabelLoading: true,
      rateListLoading: false,
      paginationObj: {
        total: 0, // 数据总条数
        display: 10, // 每页显示条数
        currentPage: 1, // 当前页码
      },
      seeRateFlag: false, // 查看利息
      repaymentFlag: false, // 还款
      viewFlag: false, // 详情弹窗
      imgMap,
      colorMap,
      detObj: {}, // 详情
      repObj: {}, // 还款
      InerestDte: {}, // 利息详情
      InerestDteObj: {}, // 利息详情obj
      mortgageRate: '', // 本次还款后质押率
      repaymentDialogLoading: false, // 还款loading
      allBanlance: {},
      spkList: [25, 50, 75, 100],
      activeSpk: '',
      nowType: 1, // 质押率 当前选择
      setRateFlag: false, // 质押率展示
      setRateValue: '', // 质押率 输入框
      setRateObj: {}, // 当条质押率详情
      afterMortgageRate: '', // 调整后质押率
      canTransferAmount: '', // 可转出数量
      setRateFlagLoading: false,
      inputTimer: null,
      setRateValueTimer: null,
    };
  },
  computed: {
    market() {
      return this.$store.state.baseData.market || {};
    },
    repaymentValueObjs() {
      const obj = {
        flag: false,
        error: false,
        text: '',
      };
      if (this.repaymentValue.length && this.repaymentValue * 1) {
        const repaymentValue = this.repaymentValue * 1;
        const nowBanlance = this.nowBanlance * 1;
        const remainInserestAndPrincipal = this.repObj.remainInserestAndPrincipal * 1;
        if (repaymentValue > nowBanlance) {
          obj.flag = false;
          obj.error = true;
          // 币币可用余额不足
          obj.text = this.$t('broToloan.toLoanHis.t30');
        } else if (repaymentValue > remainInserestAndPrincipal) {
          obj.flag = false;
          obj.error = true;
          // 输入的还款金额不能大于应还本息最大值
          obj.text = this.$t('broToloan.toLoanHis.t31');
        } else {
          obj.flag = true;
          obj.error = false;
          obj.text = '';
        }
      }
      return obj;
    },
    setRateValueObjs() {
      const obj = {
        flag: false,
        error: false,
        text: '',
      };
      if (this.setRateValue.length && this.setRateValue * 1) {
        const setRateValue = this.setRateValue * 1;
        const setRateBanlance = this.setRateBanlance * 1;
        const canTransferAmount = this.canTransferAmount * 1;
        if (this.nowType === 1) {
          if (setRateValue > setRateBanlance) {
            obj.flag = false;
            obj.error = true;
            // 币币可用余额不足
            obj.text = this.$t('broToloan.toLoanHis.t30');
          } else {
            obj.flag = true;
            obj.error = false;
            obj.text = '';
          }
        } else if (setRateValue > canTransferAmount) {
          obj.flag = false;
          obj.error = true;
          // 转出金额不能超过最大转出金额
          obj.text = this.$t('broToloan.toLoanHis.t32');
        } else {
          obj.flag = true;
          obj.error = false;
          obj.text = '';
        }
      }
      return obj;
    },
    // setRateCoin()  {
    //   if(this..)
    // },
    setRateTexts() {
      if (this.nowType === 1) {
        return {
          // 补仓金额
          inputTitle: this.$t('broToloan.toLoanHis.t33'),
          // 币币余额
          inputBot: this.$t('broToloan.toLoanHis.t34'),
          // 本次补仓后质押率
          endText: this.$t('broToloan.toLoanHis.t35'),
          // 补仓
          button: this.$t('broToloan.toLoanHis.t36'),
        };
      }
      return {
        // 转出金额
        inputTitle: this.$t('broToloan.toLoanHis.t37'),
        // 可转出数量
        inputBot: this.$t('broToloan.toLoanHis.t38'),
        // 本次转出后质押率
        endText: this.$t('broToloan.toLoanHis.t39'),
        // 转出
        button: this.$t('broToloan.toLoanHis.t40'),
      };
    },
    navTab() {
      return [
        // 补仓
        { name: this.$t('broToloan.toLoanHis.t41'), index: 1 },
        // 转出质押资金
        { name: this.$t('broToloan.toLoanHis.t42'), index: 2 },
      ];
    },
    syRp() {
      if (this.repObj.remainInserestAndPrincipal - (this.repaymentValue * 1) > 0) {
        return this.repObj.remainInserestAndPrincipal - (this.repaymentValue * 1);
      }
      return 0;
    },
    rateColumns() {
      return [
      // 计息币种
        {
          title: this.$t('broToloan.toLoanHis.t43'),
          width: '80px',
        },
        // 计息数量
        {
          title: this.$t('broToloan.toLoanHis.t44'),
          width: '80px',
        },
        // 时间
        {
          title: this.$t('broToloan.toLoanHis.t45'),
          width: '80px',
        },
        // 状态
        {
          title: this.$t('broToloan.toLoanHis.t46'),
          width: '80px',
        },
      ];
    },
    sideList() {
      //  0：划转中 1： 待还款  2：平仓中  3：已平仓 4：手动还款  5：到期自动还款
      return [
        // 方向选择列表
        // 全部
        { code: 'all', value: this.$t('broToloan.toLoanHis.t47') },
        // 划转中
        { code: '0', value: this.$t('broToloan.toLoanHis.t48') },
        // 待还款
        { code: '1', value: this.$t('broToloan.toLoanHis.t49') },
        // 平仓中
        { code: '2', value: this.$t('broToloan.toLoanHis.t50') },
        // 已平仓
        { code: '3', value: this.$t('broToloan.toLoanHis.t51') },
        // 手动还款
        { code: '4', value: this.$t('broToloan.toLoanHis.t52') },
        // 到期自动还款
        { code: '5', value: this.$t('broToloan.toLoanHis.t53') },
        // 订单异常
        { code: '7', value: this.$t('broToloan.add.t1') },
        // 穿仓
        { code: '8', value: this.$t('broToloan.add.t2') },
      ];
    },
    // 表格title
    columns() {
      let list = [];
      list = [
        // 借款时间
        {
          title: this.$t('broToloan.toLoanHis.t54'),
          width: '80px',
        },
        // 到期时间
        {
          title: this.$t('broToloan.toLoanHis.t55'),
          width: '70px',
          align: 'left',
        },
        // 借贷周期
        {
          title: this.$t('broToloan.toLoanHis.t56'),
          width: '70px',
        },
        // 借贷币种
        {
          title: this.$t('broToloan.toLoanHis.t57'),
        },
        // 日利率
        {
          title: this.$t('broToloan.toLoanHis.t58'),
        },
        // 借贷数量(负债)'
        {
          title: this.$t('broToloan.toLoanHis.t59'),
        },
        // 剩余应还本息
        {
          title: this.$t('broToloan.toLoanHis.t60'),
          // width: '130px',
        },
        // 状态
        {
          title: this.$t('broToloan.toLoanHis.t61'),
          // width: '140px',
        },
        // 操作
        {
          title: this.$t('order.exchangeOrder.nowOrderOptions'),
          width: '280px',
        },
      ];
      return list;
    },
    nowBanlance() {
      // return '10000'
      if (this.repObj.borrowSymbol
        && this.allBanlance[this.repObj.borrowSymbol]) {
        return this.allBanlance[this.repObj.borrowSymbol].normal_balance;
      }
      return '--';
    },
    setRateBanlance() {
      if (this.setRateObj.mortgageSymbol
        && this.allBanlance[this.setRateObj.mortgageSymbol]) {
        return this.allBanlance[this.setRateObj.mortgageSymbol].normal_balance;
      }
      return '--';
    },
  },
  created() {
    this.getBanlance();
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
    repaymentFlag(v) {
      if (v) {
        this.activeSpk = '';
      }
    },
    repaymentValue() {
      if (!this.repaymentFlag) {
        this.repaymentValue = '';
        return;
      }
      this.repaymentValue = fixInput(
        this.repaymentValue,
        8,
      );
      clearTimeout(this.inputTimer);
      this.inputTimer = setTimeout(() => {
        this.calculateMortgageRate();
      }, 100);
    },
    setRateValue(v) {
      if (!this.setRateFlag) {
        this.setRateValue = '';
        return;
      }
      this.setRateValue = fixInput(
        v,
        this.getMortgageSymbolFix(this.setRateObj.mortgageSymbol),
      );
      clearTimeout(this.setRateValueTimer);
      this.afterMortgageRate = '--';
      this.setRateValueTimer = setTimeout(() => {
        this.setRateValueChange();
      }, 100);
    },
  },
  methods: {
    getPriceFix(v) {
      let fix = 8;
      if (v.borrowSymbol && v.mortgageSymbol && this.market && this.market.market) {
        const symbol = `${v.mortgageSymbol}/${v.borrowSymbol}`;
        fix = this.market.market[v.borrowSymbol][symbol].price;
      }
      return fix;
    },
    getDay(start, end) {
      if (end && start) {
        const day = (end - start) / 1000 / 60 / 60 / 24;
        return Math.ceil(day);
      }
      return '';
    },
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
    borrowSymbolFixD(v, symbol) {
      return fixD(v, this.getBorrowSymbolFix(symbol));
    },
    toFix(v, fix) {
      return fixD(v, fix);
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
    mortgageSymbolFixD(v, symbol) {
      return fixD(v, this.getMortgageSymbolFix(symbol));
    },
    setRateMaxClick() {
      if (this.nowType === 1) {
        this.setRateValue = this.mortgageSymbolFixD(this.setRateBanlance,
          this.setRateObj.mortgageSymbol);
      } else {
        // console.log(this.canTransferAmount , fixInput(this.canTransferAmount, 8))
        this.setRateValue = this.mortgageSymbolFixD(this.canTransferAmount,
          this.setRateObj.mortgageSymbol);
      }
    },
    setRateFlagClose() {
      this.setRateFlag = false;
    },
    currentType(item) {
      if (this.nowType === item.index) { return; }
      this.afterMortgageRate = '--';
      this.nowType = item.index;
      this.setRateValue = '';
      if (item.index === 2) {
        this.setRateValueTranValue();
      }
      // this.setRateValueChange();
    },
    setSpk(v) {
      this.activeSpk = v;
      this.repaymentValue = `${this.repObj.remainInserestAndPrincipal * (v / 100)}`;
    },
    maxClick() {
      if ((this.repObj.remainInserestAndPrincipal * 1)
        > this.nowBanlance * 1) {
        this.repaymentValue = `${this.nowBanlance}`;
      } else {
        this.repaymentValue = `${this.repObj.remainInserestAndPrincipal}`;
      }
    },
    setRateFlagConfirm() {
      this.setRateFlagLoading = true;
      this.axios({
        url: 'borrow/change_borrow_rate',
        headers: {},
        params: {
          order_id: this.setRateObj.id,
          amount: this.setRateValue || 0,
          type: this.nowType,
        },
        hostType: 'fe-increment-api',
        method: 'post',
      }).then((data) => {
        this.setRateFlagLoading = false;
        if (data.code === 0) {
          this.$bus.$emit('tip', { text: data.msg, type: 'success' });
          // this.setRateFlagClose();
          this.setRateValue = '';
          this.setRateFlag = false;
          this.getData();
          this.getBanlance();
        } else {
          this.$bus.$emit('tip', { text: data.msg, type: 'error' });
        }
      });
    },
    getBanlance() {
      this.axios({
        url: 'finance/v5/account_balance',
        // headers,
        // params: { coinSymbols },
      }).then((data) => {
        if (data.code.toString() === '0') {
          this.allBanlance = data.data.allCoinMap;
        } else {
          this.$bus.$emit('tip', { text: data.msg, type: 'error' });
        }
      });
    },
    calculateMortgageRate() {
      this.axios({
        url: 'borrow/calculate_mortgage_rate',
        headers: {},
        params: {
          orderId: this.repObj.id,
          returnVolume: this.repaymentValue || 0,
        },
        hostType: 'fe-increment-api',
        method: 'post',
      }).then((data) => {
        if (data.code === 0) {
          this.mortgageRate = data.data.mortgageRate;
        } else {
          this.$bus.$emit('tip', { text: data.msg, type: 'error' });
        }
      });
    },
    setRateValueChange() {
      this.axios({
        url: 'borrow/calculate_rate_tranfer',
        headers: {},
        params: {
          type: this.nowType,
          amount: this.setRateValue || 0,
          orderId: this.setRateObj.id,
        },
        hostType: 'fe-increment-api',
        method: 'post',
      }).then((data) => {
        if (data.code === 0) {
          // this.mortgageRate = data.data.mortgageRate;
          this.afterMortgageRate = data.data.afterMortgageRate;
          // this.canTransferAmount = data.data.canTransferAmount
        } else if (data.code === 20542) {
          this.afterMortgageRate = '--';
        } else {
          this.$bus.$emit('tip', { text: data.msg, type: 'error' });
          this.afterMortgageRate = '--';
        }
      });
    },
    setRateValueTranValue() {
      this.axios({
        url: 'borrow/calculate_can_transfer_amount',
        headers: {},
        params: {
          type: this.nowType,
          amount: this.setRateValue || 0,
          orderId: this.setRateObj.id,
        },
        hostType: 'fe-increment-api',
        method: 'post',
      }).then((data) => {
        if (data.code === 0) {
          // this.mortgageRate = data.data.mortgageRate;
          // this.afterMortgageRate = data.data.afterMortgageRate
          this.canTransferAmount = data.data.canTransferAmount;
        } else {
          this.$bus.$emit('tip', { text: data.msg, type: 'error' });
        }
      });
    },
    formatTimeFN(v, obj) {
      return formatTime(v, obj);
    },
    getInerestList(id) {
      this.axios({
        url: 'borrow/get_inerest_list',
        headers: {},
        params: {
          orderId: id,
        },
        hostType: 'fe-increment-api',
        method: 'post',
      }).then((data) => {
        if (data.code === 0) {
          this.InerestDte = data.data;
          const rateList = [];
          data.data.interestList.forEach((item) => {
            rateList.push({
              id: JSON.stringify(item),
              data: [
                this.getCoinName(item.interestSymbol),
                fixD(item.interestVolume, 8),
                formatTime(item.ctime, { splitDay: true }),
                // 未计息 / 已计息
                item.status === 0
                  ? this.$t('broToloan.toLoanHis.t62')
                  : this.$t('broToloan.toLoanHis.t63'),
              ],
            });
          });
          this.rateList = rateList;
          this.seeRateFlag = true;
        } else {
          this.$bus.$emit('tip', { text: data.msg, type: 'error' });
        }
      });
    },
    repaymentDialogClose() {
      this.repaymentFlag = false;
      this.repaymentValue = '';
      this.mortgageRate = '';
    },
    repaymentDialogConfirm() {
      this.repaymentDialogLoading = true;
      this.axios({
        url: 'borrow/borrow_return',
        headers: {},
        params: {
          orderId: this.repObj.id,
          amount: this.repaymentValue || 0,
        },
        hostType: 'fe-increment-api',
        method: 'post',
      }).then((data) => {
        this.repaymentDialogLoading = false;
        if (data.code === 0) {
          this.$bus.$emit('tip', { text: data.msg, type: 'success' });
          this.repaymentDialogClose();
          this.getData();
          this.getBanlance();
        } else {
          this.$bus.$emit('tip', { text: data.msg, type: 'error' });
        }
      });
    },
    inputLineChange(value, name) {
      this[name] = value;
      this.activeSpk = '';
    },
    seeRateClose() {
      this.seeRateFlag = false;
    },
    viewDialogClose() {
      this.viewFlag = false;
    },
    tableClick(type, id) {
      // 查看利息
      if (type === 'seeRate') {
        this.InerestDteObj = JSON.parse(id);
        this.getInerestList(JSON.parse(id).id);
        // this.seeRateFlag = true;
      }
      // 还款
      if (type === 'repayment') {
        this.repaymentFlag = true;
        this.repObj = JSON.parse(id);
        const nowTime = new Date().getTime();
        if (this.repObj.expireTime > nowTime) {
          this.repObj.nowTime = nowTime;
        } else {
          this.repObj.nowTime = this.repObj.expireTime;
        }
        this.calculateMortgageRate();
        this.getBanlance();
      }
      // 调整质押率
      if (type === 'setRate') {
        this.setRateFlag = true;
        this.setRateObj = JSON.parse(id);
        this.nowType = 1;
        this.setRateValueChange();
        this.setRateValueTranValue();
      }
      // 详情
      if (type === 'view') {
        this.viewFlag = true;
        this.detObj = JSON.parse(id);
      }
    },
    getStatus(v) {
      // 0：划转中 1： 待还款  2：平仓中  3：已平仓 4：手动还款  5：到期自动还款
      let str = '';
      switch (v) {
        // 划转中
        case 0:
          str = this.$t('broToloan.toLoanHis.t64');
          break;
        // 待还款
        case 1:
          str = this.$t('broToloan.toLoanHis.t65');
          break;
        // 平仓中
        case 2:
          str = this.$t('broToloan.toLoanHis.t66');
          break;
        // 已平仓
        case 3:
          str = this.$t('broToloan.toLoanHis.t67');
          break;
        // 手动还款
        case 4:
          str = this.$t('broToloan.toLoanHis.t68');
          break;
        // 到期自动还款
        case 5:
          str = this.$t('broToloan.toLoanHis.t69');
          break;
        // 订单异常
        case 7:
          str = this.$t('broToloan.add.t1');
          break;
        // 穿仓
        case 8:
          str = this.$t('broToloan.add.t2');
          break;
        // 平仓异常
        default:
          str = this.$t('broToloan.toLoanHis.t70');
      }
      return str;
    },
    getData() {
      this.axios({
        url: 'borrow/get_borrow_order_list',
        headers: {},
        params: {
          // borrowSymbol: this.borrowSymbol,
          // mortgageSymbol: this.mortgageSymbol,
          status: this.side === 'all' ? '' : this.side,
          pageSize: this.paginationObj.display, // 每页条数
          page: this.paginationObj.currentPage, // 页码
        },
        hostType: 'fe-increment-api',
        method: 'post',
      }).then((data) => {
        if (data.code === 0) {
          const arr = [];
          data.data.list.forEach((item) => {
            // 借贷币种精度
            const borrowSymbolFix = this.getBorrowSymbolFix(
              item.borrowSymbol + item.mortgageSymbol,
            );
            let buts = [
              {
                type: 'button',
                text: this.$t('broToloan.toLoanHis.t71'), // 查看利息
                eventType: 'seeRate',
              },
            ];
            if (item.status === 1) {
              buts = [...[], ...buts, ...[
                {
                  type: 'button',
                  text: this.$t('broToloan.toLoanHis.t72'), // 还款
                  eventType: 'repayment',
                },
                {
                  type: 'button',
                  text: this.$t('broToloan.toLoanHis.t73'), // 调整质押率
                  eventType: 'setRate',
                },
              ]];
            }
            buts.push({
              type: 'button',
              text: this.$t('broToloan.toLoanHis.t74'), // 详情
              eventType: 'view',
            });
            arr.push({
              id: JSON.stringify(item),
              data: [
                formatTime(item.borrowTime), // 借贷时间戳
                formatTime(item.expireTime), // 到期时间
                `${item.periodDays}${this.$t('broToloan.toLoanHis.t14')}`, // 借贷周期
                this.getCoinName(item.borrowSymbol), // 借贷币种
                `${item.dailyRate}%`, // 日利率
                fixD(item.borrowVolume,
                  borrowSymbolFix), // 借贷数量
                // fixD(item.remainInserestAndPrincipal,
                //   borrowSymbolFix), // 剩余应还本息
                fixD(item.remainInserestAndPrincipal,
                  8), //
                this.getStatus(item.status),
                buts,
              ],
            });
          });
          this.tabelLoading = false;
          this.tabelList = arr;
          this.paginationObj.total = data.data.count;
        } else {
          this.$bus.$emit('tip', { text: data.msg, type: 'error' });
        }
      });
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
    goHk() {
      this.seeRateFlag = false;
      this.repaymentFlag = true;
      this.repObj = this.InerestDteObj;
      const nowTime = new Date().getTime();
      if (this.repObj.expireTime > nowTime) {
        this.repObj.nowTime = nowTime;
      } else {
        this.repObj.nowTime = this.repObj.expireTime;
      }

      this.calculateMortgageRate();
      this.getBanlance();
    },
  },
};
</script>

<style lang="stylus">
.toLoan-dialog-box {
    // padding-top: 10px;
    // padding-bottom: 16px;
    .common-tabel-content {
      min-width: 100%!important
      margin-top: 20px;
    }
    .table-body {
      min-height: 200px!important
    }
}
.toLoanHis-nav {
    height: 40px;
    border-bottom-width: 1px;
    border-bottom-style: solid;
    position: relative;
    // padding-left: 32px;
    margin-bottom: 20px
  }
.toLoanHis {

  .toLoan-dialog-box {
    // padding-top: 10px;
    // padding-bottom: 16px;
    .toLoan-dialog-repayment-spk {
      margin-top: 30px;
      .toLoan-dialog-repayment-spk-even {
        width: 92px;
        margin-right: 10px;
        border-width: 1px;
        border-style: solid;
        box-sizing: border-box;
        float:left;
        text-align: center;
        height: 24px;
        line-height: 24px;
        cursor: pointer;
        border-radius: 2px;
      }
       .toLoan-dialog-repayment-spk-even:last-child {
         margin-right: 0px;
       }
    }
    .toLoan-dialog-repayment-text {
      margin-bottom: 20px
    }
    .common-tabel-content {
      min-width: 100%!important
    }
    .table-body {
      min-height: 200px!important
    }
    .toLoan-dialog-list {
      li {
        margin-bottom: 2px;
        padding: 15px 20px;
      }
      .key {
        display: block;
        font-size: 12px;
      }
      .value {
        display: block;
        margin-top: 4px;
      }
    }
  }
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
