<template>
  <section class="page-otcTrade ">
    <div class="page-otcTrade-content">
      <div class="page-otcTrade-bar">
        <!-- 头部 -->
        <div class="otcTrade-header fuz-border">
          <!-- 头像 -->
          <div class="otcTrade-page a-12-bg" @click="goUser" style="color: #EDF4F8;">
            <div v-if="axiosObj.imageUrl"><img :src="axiosObj.imageUrl" alt=""></div>
            <div v-else-if="axiosObj.otcNickName">{{ axiosObj.otcNickName[0] }}</div>
            <div class="lineIcon a-5-bd"
                 :class="axiosObj.loginStatus === 1 ? 'a-18-bg' : 'a-1-bg'"></div>
          </div>
          <!-- 名称/在线状态 -->
          <div class="otcTrade-user">
            <div class="otcTrade-userName b-1-cl">
              {{axiosObj.otcNickName}}
              <span v-html="userVip" style="margin-left: 10px"></span>
            </div>
            <div class="otcTrade-userStatus">{{axiosObj.loginStatus === 1
              ? $t('otcTrade.inLine')
              : $t('otcTrade.outLine')}}
            </div>
          </div>
          <!-- 交易次数 -->
          <div class="otcTrade-header-even">
            <div class="otcTrade-header-even-value b-1-cl">{{axiosObj.dealVolume}}</div>
            <div class="otcTrade-header-even-key">{{ $t('otcTrade.TransactionTimes') }}</div>
          </div>
          <!-- 信用度 -->
          <div class="otcTrade-header-even">
            <div class="otcTrade-header-even-value b-1-cl">{{credit}}</div>
            <div class="otcTrade-header-even-key">{{ $t('otcTrade.CreditDegree') }}</div>
          </div>
          <!-- 历史成交 -->
          <div class="otcTrade-header-even">
            <div class="otcTrade-header-even-value b-1-cl">
              {{axiosObj.turnover | BTCFixD(that)}} BTC
            </div>
            <!-- 历史成交(折合BTC) -->
            <div class="otcTrade-header-even-key">{{ $t('otcTrade.his') }}</div>
          </div>
        </div>
        <!-- 主体 -->
        <div class="otcTrade-message a-3-bd">
          <div class="otcTrade-message-title b-1-cl">{{messageTitle}}</div>
          <div class="otcTrade-message-box clearfix">
            <ul class="otcTrade-message-keys">
              <!-- 单价 -->
              <li>{{ $t('otcTrade.price') }}</li>
              <!-- 数量 -->
              <li>{{ $t('otcTrade.volume') }}</li>
              <!-- 交易限额 -->
              <li>{{ $t('otcTrade.TradingLimit') }}</li>
              <!-- 付款时限 -->
              <li>{{ $t('otcTrade.TimeLimitPayment') }}</li>
              <li>{{sidePay}}</li>
              <!-- 商家备注 -->
              <li>{{ $t('otcTrade.MerchantRemarks') }}</li>
            </ul>
            <ul class="otcTrade-message-values b-1-cl">
              <li>{{axiosObj.price | payFixD(that)}} {{axiosObj.payCoin}}</li>
              <li>{{axiosObj.volumeBalance | coinFixD(that)}} {{ getShowCoin(axiosObj.coin) }}</li>
              <li>{{axiosObj.minTrade | payFixD(that)}} - {{axiosObj.maxTrade | payFixD(that)}}
                {{axiosObj.payCoin}}
              </li>
              <!-- 分钟 -->
              <li>{{axiosObj.limitTime}} {{ $t('otcTrade.min') }}</li>
              <li>
                <div
                  class="payment-item"
                  v-for="(item, index) in payments"
                  :key="index">
                  <span class="line" :style="{'background-color': item.color}"></span>
                  <span class="text b-1-cl">{{item.title}}</span>
                </div>
                <!-- <c-otcPayIcon class="otcTrade-otcPayIcon"
                               :imgUrl="item.icon"
                               v-for="(item, index) in payments"
                               :key="index"/> -->
              </li>
              <!-- 商家备注 -->
              <li v-if="isShowEscription">{{axiosObj.description}}</li>
              <!-- 无 -->
              <li v-else>{{ $t('otcTrade.none') }}</li>
            </ul>
          </div>
        </div>
        <!-- 关闭广告弹窗 -->
        <c-dialog :showFlag="closeTradeFlag"
                :titleText="$t('otcTrade.closeTitle')"
                :confirmLoading="closeTradeConfirmLoading"
                @confirm="closeTradeConfirm"
                @close="closeTradeClose">
          <div class="closeTrade-dialog">{{ $t('otcTrade.closeWarning') }}</div>
        </c-dialog>
        <!-- 操作 自己的订单 -->
        <div class="otcTrade-options-myself" v-if="optionsFlag === 'myself'">
          <div>
            <!-- 返回法币交易大厅 -->
            <c-button type="solid"
                       paddingW="24px"
                       height="40px"
                       @click="goHall">
              {{
                fiatTradeOpen
                ? $t('assets.b2c.otcShow.goHall')
                : $t('otcTrade.goHall')
              }}
            </c-button>
            <!-- 关闭广告 -->
            <c-button
              v-if="axiosObj.status && axiosObj.status !== 4"
              type="text"
              className="textButton"
              paddingW="24px"
              height="40px"
              @click="closeTrade">
              {{ $t('otcTrade.close') }}
            </c-button>
          </div>
          <p class="myself-tip">{{ axiosObj.tip }}</p>
        </div>
        <!-- 操作 非自己的订单 -->
        <div class="otcTrade-options-trade" v-if="optionsFlag === 'even'">
          <div class="options-trade-title b-1-cl">
            {{axiosObj.side === 'SELL'
            ? $t('otcTrade.PurchaseAmount')
            : $t('otcTrade.AmountSale')}}
          </div>
          <div class="options-trade-form clearfix">
            <div class="leftInp">
              <c-inputLine :promptText="leftInputOptions.promptText"
                         name="leftInp"
                         :value="leftInp"
                         :errorHave="true"
                         :errorText="leftInpObj.errorText"
                         :errorFlag="leftInpObj.errorFlag"
                         :warningText="leftInputOptions.warningText"
                         @onchanges="inputLineChange">
                <!-- 全部 -->
                <c-button type="text"
                           height="30px"
                           v-if="axiosObj.side === 'BUY'"
                           @click="inputAll('left')">{{ $t('otcTrade.all') }}
                </c-button>
              </c-inputLine>
            </div>
            <div class="tradeIcon">
              <svg class="icon icon-16" aria-hidden="true">
                <use xlink:href="#icon-c_18"></use>
              </svg>
            </div>
            <div class="rightInp">
              <c-inputLine :promptText="rightInputOptions.promptText"
                         name="rightInp"
                         :value="rightInp"
                         :errorHave="true"
                         :errorText="rightInpObj.errorText"
                         :errorFlag="rightInpObj.errorFlag"
                         :warningText="rightInputOptions.warningText"
                         @onchanges="inputLineChange">
                <c-button type="text"
                           height="30px"
                           v-if="axiosObj.side === 'SELL'"
                           @click="inputAll('right')">{{ $t('otcTrade.all') }}
                </c-button>
              </c-inputLine>
            </div>
          </div>
          <!-- 资金密码 buy时 -->
          <div class="options-trade-pass" v-if="axiosObj.side === 'BUY'">
            <c-inputLine :promptText="$t('otcTrade.pass')"
                       name="passCode"
                       inputType="password"
                       :value="passCode"
                       :errorHave="true"
                       :errorText="$t('otcTrade.passError')"
                       :errorFlag="passErrorFlag"
                       @onchanges="inputLineChange">
            </c-inputLine>
          </div>
          <!-- 提交BUtton -->
          <div class="options-trade-button">
            <!-- 立即出售 -->
            <c-button v-if="axiosObj.side === 'BUY'"
                       paddingW="32px"
                       marginTop="18px"
                       :disabled="mySellBtnDisabled"
                       :loading="btnLoading"
                       @click="BtnClick">{{ $t('otcTrade.ImmediateSale') }}
            </c-button>
            <!-- 立即购买 -->
            <c-button v-if="axiosObj.side === 'SELL'"
                       paddingW="32px"
                       marginTop="50px"
                       :disabled="myBuyBtnDisabled"
                       :loading="btnLoading"
                       @click="BtnClick">{{ $t('otcTrade.ImmediatePurchase') }}
            </c-button>
            <div class="buttonTimer">
              <!-- 倒计时 -->
              <span class="b-1-cl">{{ $t('otcTrade.CountDown') }}：</span>
              <span class="b-7-cl">{{time}}s</span>
            </div>
          </div>
          <div class="b-7-cl warning" v-if="axiosObj.side === 'SELL' && windFlag">
              {{ !fiatTradeOpen ? $t('otcTrade.warning')
              : $t('assets.b2c.otcShow.otcTradeWarning') }}</div>
          <c-otcReminder v-if="optionsFlag === 'even'"/>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import mixin from 'BlockChain-ui/PC/common-mixin/otcTrade/otcTrade';

export default {
  mixins: [mixin],
  mounted() {
    this.init();
  },
};
</script>
