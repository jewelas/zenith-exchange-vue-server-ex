<template>
  <section class="toLoan-content">
    <div class="toLoan-content-img"
      :style="{backgroundImage: `url(${topBannerImg})`}">
      <!-- <img
        :src="topBannerImg"
        alt=""
      /> -->
    </div>
    <div class="toLoan-box c-4-bg">
      <!-- 查看我的借贷订单 -->
      <div class="toLoan-box-goOrder u-8-cl"
        @click="goOrder">{{ $t('broToloan.toLoanHome.t1') }}</div>
      <!-- 我想借 -->
      <div class="toLoan-box-tit b-1-cl">{{ $t('broToloan.toLoanHome.t2') }}</div>
      <div class="toLoan-box-line clearfix">
        <div class="toLoan-box-input">
          <c-inputLine
            :activeHideTitle="true"
            name="borrowInput"
            :value="borrowInput"
            :promptText="borrowInputWarn"
            :errorFlag="borrowInputFlags.error"
            :errorText="borrowInputFlags.text"
            :errorHave="true"
            @onchanges="inputChanges"
          >
          <div></div>
          </c-inputLine>
        </div>
        <div class="toLoan-box-select">
          <c-select
            :value="borrowSymbol"
            name="loginType"
            :options="borrowSymbolList"
            @onChanges="borrowSymbolChange"
          />
        </div>
      </div>
      <div class="toLoan-box-tit b-1-cl" style="margin-top: 26px">
        <!-- 借贷期限 -->
        {{ $t('broToloan.toLoanHome.t3') }}
        <span style="font-size: 12px; margin-left: 10px" class="b-2-cl"
          >
          <!-- 可提前还款,利息按天计算,无借贷手续费 -->
          {{ $t('broToloan.toLoanHome.t4') }}
        </span>
      </div>
      <div class="toLoan-box-times">
        <span class="toLoan-box-times-even" v-for="(item, index) in projectDateObj" :key="index">
          <c-redio name="SELL" :value="projectDate*1 === index*1 ? true : false"
            @click="projectDateClick(index*1)"/>
            <!-- 天 -->
          <span class="toLoan-box-times-text">{{ index }}{{$t('broToloan.toLoanHome.t35')}}</span>
        </span>
      </div>
      <div class="toLoan-box-tit b-1-cl" style="margin-top: 56px">
        <!-- 质押资产 -->
        {{ $t('broToloan.toLoanHome.t5') }}
        <span style="font-size: 12px; margin-left: 10px" class="b-2-cl" v-if="loginFlag">
          <!-- 币币可用： -->
          {{ $t('broToloan.toLoanHome.t6') }}：
          {{ getFix(mortgageBanlance, mortgageSymbolFix)  }}
          {{ getCoinName(showMortgageSymbol) }}</span
        >
      </div>
      <div class="toLoan-box-line clearfix">
        <div class="toLoan-box-input">
          <c-inputLine
            :activeHideTitle="true"
            name="userValue"
            :value="mortgageInput"
            :disabled="true"
            :errorHave="true"
            :errorText="mortgageInputFlags.text"
            :errorFlag="mortgageInputFlags.error"
          >
          </c-inputLine>
        </div>
        <div class="toLoan-box-select">
          <c-select
            :value="mortgageSymbol"
            name="loginType"
            :options="mortgageSymbolList"
            @onChanges="mortgageSymbolChange"
          />
        </div>
      </div>
      <div class="toLoan-box-warns clearfix">
        <div class="toLoan-box-warns-even">
          <span class="toLoan-box-warns-key"
            >
            <!-- 初始质押率 -->
            {{ $t('broToloan.toLoanHome.t7') }}
            <div class="toLoan-box-warns-market a-5-bg a-3-bd">
              <!-- 可借贷的资产价值=质押资产价值*初始质押率 -->
              {{ $t('broToloan.toLoanHome.t8') }}
            </div>
          </span>
          <span class="toLoan-box-warns-value b-1-cl">：{{ initBorrowRate }}</span>
        </div>
        <div class="toLoan-box-warns-even">
          <span class="toLoan-box-warns-key"
            >
            <!-- 补仓提醒质押率 -->
            {{ $t('broToloan.toLoanHome.t9') }}
            <div class="toLoan-box-warns-market a-5-bg a-3-bd">
              <!-- 当订单借贷资产加累计利息价值/质押资产价值>=补仓质押率时，系统会提醒您补充质押资产 -->
              {{ $t('broToloan.toLoanHome.t10') }}
            </div>
          </span>
          <span class="toLoan-box-warns-value b-1-cl">：{{ alarmBorrowRate }}</span>
        </div>
        <div class="toLoan-box-warns-even">
          <span class="toLoan-box-warns-key"
            >
            <!-- 平仓质押率 -->
            {{ $t('broToloan.toLoanHome.t11') }}
            <div class="toLoan-box-warns-market a-5-bg a-3-bd">
              <!-- 当订单借贷资产加累计利息价值/质押资产价值>=平仓质押率时，系统会自动平仓您的质押资产来偿还借币。请及时补充质押金避免平仓 -->
              {{ $t('broToloan.toLoanHome.t12') }}
            </div>
          </span>
          <span class="toLoan-box-warns-value b-1-cl">：{{ explosionBorrowRate }}</span>
        </div>
      </div>
      <div class="toLoan-box-numbers">
        <div class="toLoan-box-numbers-even clearfix">
          <div class="toLoan-box-numbers-key">
            <div class="toLoan-box-numbers-key-ev">
              <!-- 收款账户 -->
              {{ $t('broToloan.toLoanHome.t13') }}
            </div>
            <div class="toLoan-box-numbers-key-ev">
              <!-- 日利率 -->
              {{ $t('broToloan.toLoanHome.t14') }}
            </div>
            <div class="toLoan-box-numbers-key-ev">
              <!-- 总利息 -->
              {{ $t('broToloan.toLoanHome.t15') }}
            </div>
          </div>
          <div class="toLoan-box-numbers-value b-1-cl">
            <div class="toLoan-box-numbers-value-ev">
              <!-- 币币账户 -->
              {{ $t('broToloan.toLoanHome.t16') }}
            </div>
            <div class="toLoan-box-numbers-value-ev">
              {{ projectDateObj[projectDate] ? projectDateObj[projectDate] + '%' : '--' }}</div>
            <div class="toLoan-box-numbers-value-ev">
              <!-- {{ getFix(totalInserest, borrowSymbolFix) }} {{ showBorrowSymbol }}</div> -->
              {{ getFix(totalInserest, 8) }} {{ getCoinName(showBorrowSymbol) }}</div>
          </div>
          <div class="toLoan-box-numbers-text">
            <div class="toLoan-box-numbers-text-ev">
              （
              <!-- 到账币种 -->
              {{ $t('broToloan.toLoanHome.t17') }}
              :{{ getCoinName(showBorrowSymbol) }},
              <!-- 实时到账 -->
              {{ $t('broToloan.toLoanHome.t18') }}
              ）
            </div>
            <div class="toLoan-box-numbers-text-ev">（
              <!-- 参考年化 -->
              {{ $t('broToloan.toLoanHome.t19') }}
              {{ yearRate }}）</div>
            <div class="toLoan-box-numbers-text-ev">
              <!-- （{{ expireTime }} 应还 {{ getFix(totalReturn, borrowSymbolFix) }}  -->
              （{{ expireTime }}
              <!-- 应还 -->
              {{ $t('broToloan.toLoanHome.t20') }}
               {{ getFix(totalReturn, 8) }}
              {{ getCoinName(showBorrowSymbol)}}）</div>
          </div>
        </div>
      </div>
      <c-button
        type="solid"
        marginTop="40px"
        height="40px"
        width="100%"
        paddingW="0px"
        @click="buttonClick"
        :disabled="loginFlag ? buttonDisabled : false"
        >  <!-- '开始抵押借贷' / 登录 -->
        {{ loginFlag
         ? $t('broToloan.toLoanHome.t21')
         : $t('broToloan.toLoanHome.t22')
        }}
      </c-button>
    </div>
    <div class="toLoan-content-img" style="height: 418px"
      :style="{backgroundImage: `url(${middleAdvantageImg})`}">
      <!-- <img
        :src="middleAdvantageImg"
        alt=""
        style="height: 418px"
      /> -->
    </div>
    <div class="toLoan-content-img"
      style="height: 418px;"
      :style="{backgroundImage: `url(${bottomStepImg})`}">
      <!-- <img
        :src="bottomStepImg"
        alt=""
        style="height: 418px"
      /> -->
    </div>
    <div class="toLoan-warn-title f-1-cl">
      <!-- 常见问题 -->
      {{ $t('broToloan.toLoanHome.t23') }}
    </div>
    <div class="toLoan-warn-text f-1-cl c-4-bg" v-html="qaContent">
    </div>
    <div class="toLoan-warn-btn u-8-cl" @click="goQaUrl" v-if="qaUrl && qaUrl.length">
      <!-- 查看更多 -->
      {{ $t('broToloan.toLoanHome.t24') }}
    </div>
    <!-- 确认借币订单 / 确认借贷 -->
    <c-dialog
      :showFlag="dialogFlag"
      :titleText="$t('broToloan.toLoanHome.t25')"
      :confirmText="$t('broToloan.toLoanHome.t26')"
      :confirmDisabled="!passCheck"
      :confirmLoading="confirmLoading"
      @close="dialogDialogClose"
      @confirm="submit"
    >
      <section class="toLoan-dialog-box">
        <ul class="toLoan-dialog-list">
          <!-- 借币数量 -->
          <li class="a-4-bg">
            <span class="key">{{ $t('broToloan.toLoanHome.t27') }}</span>
            <span class="value b-1-cl">
              {{ getFix(borrowInput, borrowSymbolFix) }} {{ getCoinName(showBorrowSymbol) }}
              </span>
          </li>
          <!-- 抵押数量 -->
          <li class="a-4-bg">
            <span class="key">{{ $t('broToloan.toLoanHome.t28') }}</span>
            <span class="value b-1-cl">
              {{ mortgageInput }} {{ getCoinName(showMortgageSymbol) }}
            </span>
          </li>
          <!-- 借币期限 -->
          <li class="a-4-bg">
            <span class="key">{{ $t('broToloan.toLoanHome.t29') }}</span>
            <span class="value b-1-cl">{{ projectDate }}{{ $t('broToloan.toLoanHome.t35') }}</span>
          </li>
          <!-- 日利率 -->
          <li class="a-4-bg">
            <span class="key">{{ $t('broToloan.toLoanHome.t30') }}</span>
            <span class="value b-1-cl">
              {{ projectDateObj[projectDate] ? projectDateObj[projectDate] + '%' : '--' }}
            </span>
          </li>
          <!-- 总利息 -->
          <li class="a-4-bg">
            <span class="key">{{ $t('broToloan.toLoanHome.t31') }}</span>
            <span class="value b-1-cl">
              <!-- {{ getFix(totalInserest, borrowSymbolFix) }} {{ showBorrowSymbol }} -->
              {{ getFix(totalInserest, 8) }} {{ getCoinName(showBorrowSymbol) }}
              </span>
          </li>
          <!-- 到期时间 -->
          <li class="a-4-bg">
            <span class="key">{{ $t('broToloan.toLoanHome.t32') }}</span>
            <span class="value b-1-cl">{{ expireTime }} </span>
          </li>
          <!-- 到期还款数量 -->
          <li class="a-4-bg">
            <span class="key">{{ $t('broToloan.toLoanHome.t33') }}</span>
            <span class="value b-1-cl">

              {{getFix(totalReturn, 8) }} {{ getCoinName(showBorrowSymbol) }}
              </span>
          </li>
        </ul>
        <div class="toLoan-passValueText">
            <!-- <c-checkBox :value="passCheck" @click="passCheckClick"/>&nbsp; -->
            <!-- 我确认已登录收款账户，并核对收款无误 -->
            <!--  @click="passCheckClick" -->
            <span class="passValueText-text b-7-cl">
              <!-- 由于价格时刻变动，您实际到账金额可能与页面显示有偏差，请以实际入账为准 -->
              {{ $t('broToloan.toLoanHome.t34') }}
            </span>
          </div>
      </section>
    </c-dialog>
    <!-- 温馨提示 /  请您先完成实名认证，谷歌和手机验证至少绑定一个-->
    <c-verifyCationc-alert
      :showFlag="alertFlag"
      :imgMap="imgMap"
      :titleText="$t('broToloan.toLoanHome.t36')"
      :detaText="$t('broToloan.toLoanHome.t37')"
      :dataList="alertData"
      :buttonText="$t('assets.addressMent.GotoOpen')"
      @close="alertClone"
      @confirm="alertGo"/>
    <!-- 安全验证 -->
    <c-dialog
      :showFlag="cfmFlag"
      :titleText="$t('broToloan.toLoanHome.t38')"
      @close="cfmFlagClose"
      @confirm="cfmFlagConfirm"
      :confirmDisabled="cfmDisabled"
      :confirmLoading="cfmLoading"
      paddingTop="10px"
    >
      <section class="ylbCard-dialog-box">
        <c-inputLine
          v-if="OpenMobile"
          name='smsCode'
          :value="smsCode"
          :promptText="$t('assets.withdraw.phoneCode')"
          maxLength="6"
          :errorHave="true"
          marginTop="20px"
          :errorFlag="phoneError"
          :errorText="$t('assets.withdraw.phoneCodeError')"
          @onchanges="inputLineChange">
          <!-- 获取验证码 -->
          <c-getCode
            name="withdrawGetcode"
            @click="getCodeClick"/>
        </c-inputLine>
        <c-inputLine
           v-if="OpenGoogle"
          name='googleCode'
          :value="googleCode"
          :promptText="$t('assets.withdraw.googleCode')"
          maxLength="6"
          :errorHave="true"
          :errorFlag="googleError"
          :errorText="$t('assets.withdraw.googleCodeError')"
          @onchanges="inputLineChange">
        </c-inputLine>
      </section>
    </c-dialog>
  </section>
</template>

<script>
import {
  formatTime,
  fixInput,
  fixD,
  imgMap,
  getCoinShowName,
} from '@/utils';

export default {
  name: 'toLoan',
  data() {
    return {
      cfmLoading: false,
      googleCode: '',
      smsCode: '',
      cfmFlag: false,
      alertFlag: false,
      imgMap,
      borrowInput: '', // 借款
      mortgageInput: '', // 抵押
      dialogFlag: false,
      dialogConfirmDisabled: false,
      passCheck: true,
      borrowSymbol: '', // 借贷币种
      borrowSymbolList: [], // 借贷币种列表
      projectList: [], // 项目列表
      mortgageSymbol: '', // 抵押币种
      mortgageSymbolList: [], // 抵押币种列表
      topBannerImg: '', // 顶部banner图片链接
      middleAdvantageImg: '', // 中间产品展示图片链接
      bottomStepImg: '', // 底部借贷步骤展示图片链接
      projectDate: 0, // 项目时间
      projectDateObj: {}, // 项目时间列表
      initBorrowRate: '--', // 初始质押率
      alarmBorrowRate: '--', // 补仓提醒质押率
      explosionBorrowRate: '--', // 平仓质押率
      expireTime: '--', // 应还 时间戳
      yearRate: '--', // 参考年化利率
      projectId: '', // 项目 id
      projectReady: false, // 项目请求成功
      totalInserest: '--', // 总利息
      totalReturn: '--', // 到期还款数量
      confirmLoading: false,
      allBanlance: {},
      inputTimer: null,
      minLimitAmount: '', // 最小借贷金额
      maxLimitAmount: '', // 最大借贷金额
      qaContent: '',
      qaUrl: '',
      // base
    };
  },
  watch: {
    borrowInput: {
      immediate: true,
      handler() {
        if (!this.projectReady) {
          this.borrowInput = '';
          return;
        }
        this.borrowInput = fixInput(this.borrowInput, this.borrowSymbolFix);
        clearTimeout(this.inputTimer);
        this.inputTimer = setTimeout(() => {
          this.getSpk();
        }, 100);
      },
    },
    mortgageInput(v) {
      if (fixD(v, this.mortgageSymbolFix) * 1) {
        this.mortgageInput = fixD(v, this.mortgageSymbolFix);
      } else {
        this.mortgageInput = '';
      }
    },
    userInfoIsReady: {
      immediate: true,
      handler(v) {
        if (v && this.$store.state.baseData.isLogin) {
          this.getBanlance();
        }
        if (v) {
          this.getBaseDate();
        }
      },
    },
  },
  created() {
    this.init();
  },
  computed: {
    // market 接口
    market() {
      return this.$store.state.baseData.market || {};
    },
    // phoneValue 是否复合正则验证
    phoneValueFlag() { return this.$store.state.regExp.verification.test(this.smsCode); },
    // googleValue 是否复合正则验证
    googleValueFlag() { return this.$store.state.regExp.verification.test(this.googleCode); },
    phoneError() {
      if (this.smsCode.length !== 0 && !this.phoneValueFlag) return true;
      return false;
    },
    googleError() {
      if (this.googleCode.length !== 0 && !this.googleValueFlag) return true;
      return false;
    },
    // 弹窗确认按钮
    cfmDisabled() {
      let phone = true;
      let google = true;
      if (this.OpenMobile) { phone = this.phoneValueFlag; }
      if (this.OpenGoogle) { google = this.googleValueFlag; }
      if ((phone && google) || this.cfmLoading) {
        return false;
      }
      return true;
    },
    alertData() {
      return [
        { text: this.$t('otcRelease.authentication'), flag: this.idAuth === 1 },
        { text: this.$t('assets.withdraw.bindGoogle'), flag: this.OpenGoogle },
        { text: this.$t('assets.withdraw.bindPhone'), flag: this.OpenMobile },
      ];
    },
    // 用户是否开启手机
    OpenMobile() {
      let flag = false;
      const { userInfo } = this.$store.state.baseData;
      if (userInfo && userInfo.isOpenMobileCheck.toString() === '1') {
        flag = true;
      }
      return flag;
    },
    idAuth() {
      // return 1;
      const { userInfo } = this.$store.state.baseData;
      let idAuth = 0;
      if (userInfo) {
        idAuth = Number(userInfo.authLevel);
      }
      return idAuth;
    },
    // 用户是否开启谷歌
    OpenGoogle() {
      let flag = false;
      const { userInfo } = this.$store.state.baseData;
      if (userInfo && userInfo.googleStatus.toString() === '1') {
        flag = true;
      }
      return flag;
    },
    borrowSymbolFixAll() {
      const obj = {};
      this.projectList.forEach((item) => {
        obj[item.borrowSymbol + item.mortgageSymbol
        ] = item.borrowSymbolScale;
      });
      return obj;
    },
    // 借贷币种 精度
    borrowSymbolFix() {
      const symbol = this.borrowSymbol + this.mortgageSymbol;
      return this.borrowSymbolFixAll[symbol] || 8;
    },
    // 借贷币种 错误提示
    borrowInputFlags() {
      const obj = {
        flag: false,
        error: false,
        text: '',
      };
      if (this.borrowInput.length) {
        const borrowInput = this.borrowInput * 1;
        const maxLimitAmount = this.maxLimitAmount * 1;
        const minLimitAmount = this.minLimitAmount * 1;
        if (minLimitAmount > borrowInput || borrowInput > maxLimitAmount) {
          obj.flag = false;
          obj.error = true;
          obj.text = this.borrowInputWarn;
        } else {
          obj.flag = true;
          obj.error = false;
          obj.text = '';
        }
      }
      return obj;
    },
    // 抵押币种 精度
    mortgageSymbolFix() {
      let v = 8;
      const { market } = this.$store.state.baseData;
      if (market && market.coinList && market.coinList[this.mortgageSymbol]) {
        v = market.coinList[this.mortgageSymbol].showPrecision;
      }
      return v;
    },
    // 抵押币种 错误提示
    mortgageInputFlags() {
      const obj = {
        flag: false,
        error: false,
        text: '',
      };
      if (this.mortgageInput.length && this.loginFlag) {
        const mortgageInput = this.mortgageInput * 1;
        const mortgageBanlance = this.mortgageBanlance * 1;
        if (mortgageInput > mortgageBanlance) {
          obj.flag = false;
          obj.error = true;
          // 币币可用余额不足
          obj.text = this.$t('broToloan.toLoanHome.t39');
        } else {
          obj.flag = true;
          obj.error = false;
          obj.text = '';
        }
      }
      return obj;
    },
    borrowInputWarn() {
      // 可借范围
      return `${this.$t('broToloan.toLoanHome.t40')}
      ${fixD(this.minLimitAmount)} ${this.getCoinName(this.showBorrowSymbol)} 
      ~ ${fixD(this.maxLimitAmount)} ${this.getCoinName(this.showBorrowSymbol)} `;
    },
    loginFlag() {
      const { isLogin, userInfoIsReady } = this.$store.state.baseData;
      if (isLogin && userInfoIsReady) {
        return true;
      }
      return false;
    },
    userInfoIsReady() {
      return this.$store.state.baseData.userInfoIsReady;
    },
    buttonDisabled() {
      if (this.mortgageInputFlags.flag && this.borrowInputFlags.flag) {
        return false;
      }
      return true;
    },
    // 展示借贷币种
    showBorrowSymbol() {
      let symbol = '';
      this.borrowSymbolList.forEach((item) => {
        if (item.code === this.borrowSymbol) {
          symbol = item.code;
        }
      });
      return symbol;
    },
    // 展示抵押币种
    showMortgageSymbol() {
      let symbol = '';
      this.mortgageSymbolList.forEach((item) => {
        if (item.code === this.mortgageSymbol) {
          symbol = item.code;
        }
      });
      return symbol;
    },
    // 抵押币种余额
    mortgageBanlance() {
      // return '10000'
      if (this.mortgageSymbol
        && this.allBanlance[this.mortgageSymbol]) {
        return this.allBanlance[this.mortgageSymbol].normal_balance;
      }
      return '--';
    },
  },
  methods: {
    getCoinName(coin) {
      return getCoinShowName(coin, this.market.coinList);
    },
    // 获取验证码
    getCodeClick() {
      this.sendSmsCode();
    },
    sendSmsCode() {
      this.axios({
        url: 'v4/common/smsValidCode',
        params: { operationType: '210' },
      }).then((data) => {
        if (data.code.toString() !== '0') {
          setTimeout(() => {
            // 倒计时重置
            this.$bus.$emit('getCode-clear', 'withdrawGetcode');
            // tip框提示错误
            this.$bus.$emit('tip', { text: data.msg, type: 'error' });
          }, 2000);
        } else {
          this.$bus.$emit('tip', { text: this.$t('assets.withdraw.phoneSendSuccess'), type: 'success' });
        }
      });
    },
    inputLineChange(value, name) {
      this[name] = value;
    },
    alertClone() {
      this.alertFlag = false;
    },
    alertGo() {
      this.$router.push('/personal/userManagement');
    },
    goOrder() {
      if (this.loginFlag) {
        this.$router.push('/order/toLoanOrder');
      } else {
        this.$router.push('/login');
      }
    },
    getFix(v, fix) {
      return fixD(v, fix);
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
    buttonClick() {
      if (!this.$store.state.baseData.isLogin) {
        this.$router.push('/login');
        return;
      }
      if (this.OpenGoogle || this.OpenMobile) {
        if (this.idAuth === 1) {
          // this.activeObj = v;
          this.dialogFlag = true;
          this.smsCode = '';
          this.googleCode = '';
          return;
        }
      }
      this.alertFlag = true;
      // if (this.loginFlag) {
      //   this.dialogFlag = true;
      // } else {
      //   this.$router.push('/login');
      // }
    },
    // 获取基础配置
    getBaseDate() {
      this.axios({
        url: 'noToken/borrow/get_base_config',
        headers: {},
        params: {},
        hostType: 'fe-increment-api',
        method: 'post',
      }).then((data) => {
        if (data.code === 0) {
          this.topBannerImg = data.data.topBannerImg;
          this.middleAdvantageImg = data.data.middleAdvantageImg;
          this.bottomStepImg = data.data.bottomStepImg;
          this.qaContent = data.data.qaContent;
          this.qaUrl = data.data.qaUrl;
          this.projectList = data.data.projectList;
          const borrowSymbolList = [];
          data.data.borrowSymbolList.forEach((item) => {
            borrowSymbolList.push({
              code: item.coinSymbol,
              value: item.showName || item.coinSymbol,
              fix: item.showPrecision,
            });
          });
          this.borrowSymbolList = borrowSymbolList;
          if (borrowSymbolList.length) {
            this.borrowSymbol = borrowSymbolList[0].code;
            this.getMortgageSymbolList();
          }
        } else {
          this.$bus.$emit('tip', { text: data.msg, type: 'error' });
        }
      });
    },
    // 获取抵押币种
    getMortgageSymbolList() {
      this.axios({
        url: 'noToken/borrow/getMortgageSymbolList',
        headers: {},
        params: {
          borrowSymbol: this.borrowSymbol,
        },
        hostType: 'fe-increment-api',
        method: 'post',
      }).then((data) => {
        if (data.code === 0) {
          const mortgageSymbolList = [];
          data.data.mortgageSymbolList.forEach((item) => {
            mortgageSymbolList.push({
              value: item.showName || item.coinSymbol,
              code: item.coinSymbol,
            });
          });
          this.mortgageSymbolList = mortgageSymbolList;
          if (mortgageSymbolList.length) {
            this.mortgageSymbol = mortgageSymbolList[0].code;
            this.getProjectDate();
          }
        } else {
          this.$bus.$emit('tip', { text: data.msg, type: 'error' });
        }
      });
    },
    goQaUrl() {
      window.location.href = this.qaUrl;
    },
    // 获取项目日期
    getProjectDate() {
      const url = this.$store.state.baseData.isLogin
        ? 'borrow/get_project_info'
        : 'noToken/borrow/get_project_info';
      this.axios({
        url,
        headers: {},
        params: {
          borrowSymbol: this.borrowSymbol,
          mortgageSymbol: this.mortgageSymbol,
        },
        hostType: 'fe-increment-api',
        method: 'post',
      }).then((data) => {
        if (data.code === 0) {
          const obj = {};
          data.data.period_rate.forEach((item, index) => {
            obj[item.period] = item.dailyRate;
            if (index === 0) {
              this.projectDate = item.period;
            }
          });
          this.projectDateObj = obj;
          this.getProjectMess();
        } else {
          this.$bus.$emit('tip', { text: data.msg, type: 'error' });
        }
      });
    },
    // 获取项目mess
    getProjectMess() {
      const url = this.$store.state.baseData.isLogin
        ? 'borrow/get_project_info'
        : 'noToken/borrow/get_project_info';
      this.projectReady = false;
      this.axios({
        url,
        headers: {},
        params: {
          borrowSymbol: this.borrowSymbol,
          mortgageSymbol: this.mortgageSymbol,
          period: this.projectDate,
        },
        hostType: 'fe-increment-api',
        method: 'post',
      }).then((data) => {
        if (data.code === 0) {
          this.initBorrowRate = `${data.data.initBorrowRate}%`; // 初始质押率
          this.alarmBorrowRate = `${data.data.alarmBorrowRate}%`; // 补仓提醒质押率
          this.explosionBorrowRate = `${data.data.explosionBorrowRate}%`; // 平仓质押率
          this.yearRate = `${data.data.yearRate}%`; // 参考年化利率
          this.expireTime = formatTime(data.data.expireTime, { splitSec: true }); // 应还 时间戳
          this.projectId = data.data.projectId; // 项目id
          this.projectReady = true;
          this.minLimitAmount = data.data.minLimitAmount;
          this.maxLimitAmount = data.data.maxLimitAmount;
          this.getSpk();
        } else {
          this.$bus.$emit('tip', { text: data.msg, type: 'error' });
        }
      });
    },
    // 实时计算
    getSpk() {
      this.axios({
        url: 'noToken/borrow/calculate_inerest_mortgage',
        headers: {},
        params: {
          borrowSymbol: this.borrowSymbol,
          mortgageSymbol: this.mortgageSymbol,
          period: this.projectDate,
          dailyRate: this.projectDateObj[this.projectDate],
          borrowVolume: this.borrowInput || 0,
        },
        hostType: 'fe-increment-api',
        method: 'post',
      }).then((data) => {
        if (data.code === 0) {
          this.mortgageInput = `${data.data.mortgageVolume}`; // 抵押数量
          this.totalInserest = data.data.totalInserest; // 总利息
          this.totalReturn = data.data.totalReturn; // 到期还款数量
        } else {
          this.$bus.$emit('tip', { text: data.msg, type: 'error' });
        }
      });
    },
    cfmFlagClose() {
      this.cfmFlag = false;
    },
    submit() {
      this.dialogFlag = false;
      this.cfmFlag = true;
    },
    cfmFlagConfirm() {
      this.cfmLoading = true;
      this.axios({
        url: 'borrow/mortgage_borrow',
        headers: {},
        params: {
          // borrowSymbol: this.borrowSymbol,
          // mortgageSymbol: this.mortgageSymbol,
          // period: this.projectDate,
          // dailyRate: this.projectDateObj[this.projectDate],
          // borrowVolume: this.borrowInput || 0,
          projectId: this.projectId,
          amount: this.borrowInput,
          period: this.projectDate,
          mortgageVolume: this.mortgageInput,
          smsCode: this.smsCode,
          googleCode: this.googleCode,
        },
        hostType: 'fe-increment-api',
        method: 'post',
      }).then((data) => {
        this.cfmLoading = false;
        if (data.code === 0) {
          this.cfmFlag = false;
          this.borrowInput = '';
          this.mortgageInput = '';
          this.$bus.$emit('tip', { text: data.msg, type: 'success' });
          this.getBanlance();
          this.getProjectMess();
          // this.mortgageInput = data.data.mortgageVolume + '' // 抵押数量
          // this.totalInserest = data.data.totalInserest // 总利息
          // this.totalReturn = data.data.totalReturn // 到期还款数量
        } else {
          this.$bus.$emit('tip', { text: data.msg, type: 'error' });
        }
      });
    },
    projectDateClick(v) {
      if (`${this.projectDate}` === `${v}`) return;
      this.projectDate = v;
      this.getProjectMess();
    },
    passCheckClick() {
      this.passCheck = !this.passCheck;
    },
    dialogDialogClose() {
      this.dialogFlag = false;
    },
    dialogDialogConfirm() {
      this.dialogFlag = false;
    },
    // 切换抵押币种
    mortgageSymbolChange({ code }) {
      if (this.mortgageSymbol === code) return;
      this.mortgageSymbol = code;
      this.projectReady = false;
      this.borrowInput = '';
      this.mortgageInput = '';

      this.getProjectDate();
    },
    // 切换借贷币种
    borrowSymbolChange({ code }) {
      if (this.borrowSymbol === code) return;
      this.borrowSymbol = code;
      this.projectReady = false;
      this.borrowInput = '';
      this.mortgageInput = '';
      this.getMortgageSymbolList();
    },
    inputChanges(value, name) {
      this[name] = value;
    },
    init() {},
  },
};
</script>

<style lang="stylus">
// 确认收款并放币Dialog{
.toLoan-passValueText {
  font-size: 14px;
  // cursor: pointer;
  user-select: none;
  margin-top: 15px;
  .common-checkout {
    vertical-align: middle;
  }
  .passValueText-text {
    vertical-align: middle;
    font-size: 12px;
    line-height: 16px
  }
}
.toLoan-box-select {
  input {
    text-align: center;
  }
}

.toLoan-content {
  .toLoan-warn-title {
    text-align: center;
    margin-top: 80px;
    font-size: 36px;
    line-height: 60px;
    margin-bottom: 50px;
    // font-weight: 500
  }
  .toLoan-warn-btn{
    text-align: center;
    cursor pointer
  }
  .toLoan-warn-text {
    width: 1180px;
    padding: 20px;
    line-height: 20px;
    box-sizing: border-box;
    margin: 0 auto;
    font-size:12px;
    text-indent: 25px;
    margin-bottom: 50px;
    word-wrap: break-word;
    // box-shadow: 0 2px 10px 0 rgba(227,227,227,0.50);
  }
  .toLoan-dialog-box {
    // padding-top: 10px;
    // padding-bottom: 16px;
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
  .toLoan-box-numbers {
    .toLoan-box-numbers-key {
      float: left;
      line-height: 20px;

      .toLoan-box-numbers-key-ev {
        margin-bottom: 20px;
      }
    }

    .toLoan-box-numbers-value {
      float: left;
      line-height: 20px;
      margin-left: 30px;

      .toLoan-box-numbers-value-ev {
        margin-bottom: 20px;
      }
    }

    .toLoan-box-numbers-text {
      float: right;
      line-height: 20px;

      .toLoan-box-numbers-text-ev {
        margin-bottom: 20px;
        text-align: right;
      }
    }
  }

  .toLoan-box-warns {
    margin-bottom: 50px;
  }

  .toLoan-box-warns-even {
    margin-right: 40px;
    float: left;

    .toLoan-box-warns-key {
      border-bottom-style: dashed;
      border-bottom-width: 1px;
      cursor: pointer;
      position: relative;
    }

    .toLoan-box-warns-market {
      position: absolute;
      box-shadow: 0 3px 4px 1px rgba(0, 0, 0, 0.28);
      top: 20px;
      width: 300px;
      box-sizing: border-box;
      padding: 15px;
      font-size: 12px;
      line-height: 20px;
      border-radius: 4px;
      display: none;
      left: 0;
    }

    &:hover {
      .toLoan-box-warns-market {
        display: block;
      }
    }
  }

  .toLoan-content-img {
    width: 100%;
    height: 280px
    background-repeat: no-repeat;
    background-position: center;
    background-size: auto 100%;
    // img {
    //   position: absolute;
    //   left: 50%;
    //   transform: translate3d(-50%,0, 0);
    //   // width: 100%;
    //   height: 280px;
    //   // max-width: 100%
    // }
  }

  .toLoan-box-times {
    margin-top: 24px;

    .toLoan-box-times-even {
      cursor: pointer;
      margin-right: 60px;
    }

    .toLoan-box-times-text {
      margin-left: 10px;
    }
  }

  .toLoan-box {
    width: 750px;
    box-sizing: border-box;
    margin: 0 auto;
    padding: 50px;
    margin-top: 70px;
    margin-bottom: 70px
    position: relative
  }
  .toLoan-box-goOrder {
    position: absolute;
    right: 50px;
    top: 25px;
    cursor: pointer;
  }

  .toLoan-box-tit {
    font-size: 16px;
    line-height: 30px;
  }

  .toLoan-box-line {
    margin-top: -12px;

    .toLoan-box-input {
      width: 560px;
      float: left;
    }

    .toLoan-box-select {
      width: 90px;
      float: left;

      .input_line_inp input {
        text-align: center;
      }
    }
  }
}
</style>
