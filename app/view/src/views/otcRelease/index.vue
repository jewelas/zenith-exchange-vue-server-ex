<template>
  <section class="page-otcRelease">
    <div class="otc-page-title a-5-bg a-7-bd">
      <div class="page-title-bar b-1-cl">
          {{$t('fiatdeal.navList')[6]}}
      </div>
    </div>
    <div class="page-otcRelease-coneent  fuz-card">
      <!-- <vue-scroll> -->
        <div class="page-otcRelease-bar">
          <!-- 选择币种 -->
          <div class="otcRelease-symbolNav fuz-card-tab">
            <c-navTab
              activeClassName="b-1-cl"
              activeColor="a-12-bg"
              className="b-2-cl"
              :currentTab="symbol"
              :navTab="navSymbolList"
              lineHeight="40"
              marginRight="64"
              @currentType="symbolChange"
            />
          </div>
          <!-- 介绍 -->
          <div class="otcRelease-message a-3-bd" :style="backgroundImg">
            <!-- 发布一个交易广告 -->
            <div class="otcRelease-message-title b-1-cl">
              {{ $t('otcRelease.title') }}
               -
              {{ showCoin }} </div>
            <div class="otcRelease-message-text">
              {{ $t('otcRelease.text1') }}<br/>
              {{ $t('otcRelease.text2') }}<br/>
              {{ $t('otcRelease.text3') }}<br/>
              {{ $t('otcRelease.text4') }}<br/>
              {{ $t('otcRelease.text5') }}</div>
          </div>
          <!-- 主体 -->
          <div class="otcRelease-main fuz-card-content">
            <!-- 广告类型  出售/购买 -->
            <div class="otcRelease-side">
              <!-- 广告类型 -->
              <span class="otcRelease-page otcRelease-page-side">
                {{ $t('otcRelease.type') }}
              </span>
              <span class="otcRelease-side-even otcRelease-side-first">
                <c-redio name="SELL"
                  :value="side==='SELL'"
                  @click="sideChange"/>
                <!-- 出售 -->
                <span class="text b-1-cl" @click="sideChange('SELL')">
                  {{ $t('otcRelease.sell') }}
                </span>
              </span>
              <span class="otcRelease-side-even">
                <c-redio name="BUY"
                  :value="side==='BUY'"
                  @click="sideChange"/>
                <!-- 购买 -->
                <span class="text b-1-cl" @click="sideChange('BUY')">
                  {{ $t('otcRelease.buy') }}
                </span>
              </span>
            </div>
            <!-- 法币类型 -->
            <div class="otcRelease-legalCurrency">
              <c-select
                :value="legalCurrency"
                :promptText="$t('otcRelease.currency')"
                @onChanges='legalCurrencyChange'
                name="legalCurrency"
                :errorHave="true"
                :errorFlag="false"
                :errorText="$t('otcRelease.currencyError')"
                :options="legalCurrencyList"
              />
            </div>
            <!-- 数量 -->
            <div class="otcRelease-number">
              <c-inputLine
                name="number"
                :value="number"
                :promptText="$t('otcRelease.volume')"
                :warningText="side === 'SELL'
                  ?
                  `${$t('otcRelease.Surplus')} ${otcRateFlag ? blance : numberValue} ${showCoin}`
                  : ''"
                :errorHave="true"
                :errorText="numberObj.errorText"
                :errorFlag="numberObj.errorFlag"
                @onchanges="inputLineChange">
                <span class="otcRelease-input-page b-1-cl">{{showCoin}}</span>
              </c-inputLine>
            </div>
            <!-- 当前单价 -->
            <div class="otcRelease-NowPrice">
              <div class="otcRelease-page otcRelease-NowPrice-side">
                {{ $t('otcRelease.CurrentUnitPrice') }}
                <a class="des-icon" href="javascript:;">
                  <svg class="icon icon-14" aria-hidden="true">
                    <use xlink:href="#icon-a_15"></use>
                  </svg>
                  <span class="a-5-bg b-2-cl">
                    {{$t('otcRelease.des')}}
                  </span>
                </a>
              </div>
              <div class="otcRelease-NowPrice-message">
                <span class="price b-1-cl">{{nowPrice}} {{legalCurrency}}</span>
                <!-- 参考网址 -->
<!--                <span class="address">
                  ({{ $t('otcRelease.ReferenceWebSite') }}
                  <a class="b-4-cl" target="_blank" :href="rateUrl">{{rateUrl}}</a>)
                </span>-->
              </div>
            </div>
            <!-- 定价方式 -->
            <div class="otcRelease-pricingMethod">
               <c-select
                :value="pricingMethod"
                :promptText="$t('otcRelease.PricingMethod')"
                @onChanges='pricingMethodChange'
                name="pricingMethod"
                :errorHave="true"
                :errorFlag="false"
                :errorText="$t('otcRelease.PricingMethodError')"
                :options="pricingMethodList"
              />
            </div>
            <!--溢价方向-->
            <div class="otcRelease-pricingMethod precent"
                 v-if="pricingMethod === '1'">
              <c-select
                :value="pricentMethod"
                :promptText="$t('otcRelease.precentWay')"
                @onChanges='precentMethodChange'
                name="precentMethod"
                :errorHave="false"
                :errorFlag="false"
                :options="pricentMethodList"
              />
            </div>
            <!--溢价百分比-->
            <div class="otcRelease-minPrice precentInput"
                 v-if="pricingMethod === '1'">
              <c-inputLine
                name='precent'
                :value="precent"
                :errorHave="true"
                :errorFlag="precentObj.errorFlag"
                :errorText="precentObj.errorText"
                @onchanges="inputLineChange"
                :promptText="$t('otcRelease.precent')">
                <span class="otcRelease-input-page">%</span>
              </c-inputLine>
            </div>
            <!-- 单价 -->
            <div class="otcRelease-sum MessPrice"  v-if="pricingMethod === '1'">
              <div class="otcRelease-page">{{ $t('otcDetailOrder.MessPrice') }}</div>
              <div class="otcRelease-sum-price b-1-cl">{{precentPrice}} {{legalCurrency}}</div>
            </div>
            <!-- 自定义价格 -->
            <div class="otcRelease-autoPrice"
              v-if="pricingMethod === '2'">
              <c-inputLine
                name='autoPrice'
                :value="autoPrice"
                :errorHave="true"
                :errorFlag="autoPriceObj.errorFlag"
                :errorText="autoPriceObj.errorText"
                @onchanges="inputLineChange"
                :promptText="$t('otcRelease.CustomPrice')">
                <span class="otcRelease-input-page">{{legalCurrency}}</span>
              </c-inputLine>
            </div>
            <!-- 总金额 -->
            <div class="otcRelease-sum">
              <div class="otcRelease-page">{{ $t('otcRelease.TotalSum') }}</div>
              <div class="otcRelease-sum-price b-1-cl">{{sum}} {{legalCurrency}}</div>
            </div>
            <!-- 最小限额 -->
            <div class="otcRelease-minPrice">
              <c-inputLine
                name='minPrice'
                :value="minPrice"
                :errorHave="true"
                :errorFlag="minPriceObj.errorFlag"
                :errorText="minPriceObj.errorText"
                @onchanges="inputLineChange"
                :promptText="$t('otcRelease.MinimumQuota')">
                <span class="otcRelease-input-page">{{legalCurrency}}</span>
              </c-inputLine>
            </div>
            <!-- 最大限额 -->
            <div class="otcRelease-maxPrice">
              <c-inputLine
                name='maxPrice'
                :value="maxPrice"
                :errorHave="true"
                :errorFlag="maxPriceObj.errorFlag"
                :errorText="maxPriceObj.errorText"
                @onchanges="inputLineChange"
                :promptText="$t('otcRelease.MaximumQuota')">
                <span class="otcRelease-input-page">{{legalCurrency}}</span>
              </c-inputLine>
            </div>
            <!-- 付款时限 -->
            <div class="otcRelease-tradeTime">
              <c-inputLine
                name='tradeTime'
                :value="tradeTime"
                :errorHave="true"
                :errorFlag="tradeTimeObj.errorFlag"
                :errorText="tradeTimeObj.errorText"
                @onchanges="inputLineChange"
                :promptText="$t('otcRelease.TimeLimitForPayment')">
                <!-- 分钟 -->
                <span class="otcRelease-input-page">{{ $t('otcRelease.min') }}</span>
              </c-inputLine>
            </div>
            <!-- 对方最少交易次数 -->
            <div class="otcRelease-frequency">
              <c-inputLine
                name='frequency'
                :value="frequency"
                :errorHave="true"
                @onchanges="inputLineChange"
                :promptText="$t('otcRelease.MinimumNumber')">
                <!-- 次 -->
                <span class="otcRelease-input-page">{{ $t('otcRelease.frequency') }}</span>
              </c-inputLine>
            </div>
            <!-- 失效时间 -->
            <div class="otcRelease-days">
              <c-select
                :value="days"
                :promptText="$t('otcRelease.FailureTime')"
                @onChanges='daysChange'
                name="days"
                :errorHave="true"
                :errorFlag="false"
                :errorText="$t('otcRelease.FailureTimeError')"
                :options="daysList"
              />
            </div>
            <!-- 支付方式 -->
            <div class="otcRelease-pays" v-if="side === 'BUY'">
              <div class="otcRelease-page">
                <!-- 支付方式 -->
                {{ $t('otcRelease.PaymentMethod') }}
                <!-- 最多可选择3种付款方式 -->
                ({{ $t('otcRelease.PaymentMethodWarning') }})
                </div>
              <ul class="otcRelease-paysList">
                <li v-for="(item, index) in buyPaysList"
                  :key="index">
                  <c-checkBox
                    @click="buyPayClick(item)"
                    :value="myBuyPaysList.indexOf(item.key) !== -1"/>
                  <!-- <span class="paysList-icon" @click="buyPayClick(item)">
                    <img :src="item.icon">
                  </span> -->
                  <!-- <c-otcPayIcon
                     @click="buyPayClick(item)"
                    :imgUrl="item.icon"/> -->
                  <span class="paysList-line" :style="{'background-color': item.color}"></span>
                  <span class="paysList-text" @click="buyPayClick(item)">{{ item.title }}</span>
                </li>
              </ul>
            </div>
            <!-- 收款方式 -->
            <div class="otcRelease-pays" v-if="side === 'SELL'">
              <!-- 收款方式 -->
              <div class="otcRelease-page">
                {{ $t('otcRelease.Receivables') }}
                <!-- 可选择多种收款方式 -->
                ({{ $t('otcRelease.ReceivablesWarning') }})</div>
              <ul class="otcRelease-paysList" v-if="sellPaysList.length">
                <li v-for="(item, index) in sellPaysList"
                  :key="index">
                  <c-checkBox @click="sellPayClick(item)"
                  :value="mySellPaysList.indexOf(item.payment) !== -1"/>
                  <!-- <span class="paysList-icon" @click="sellPayClick(item)">
                    <img :src="item.icon">
                  </span> -->
                  <span class="paysList-line" :style="{'background-color': item.color}"></span>
                  <span @click="sellPayClick(item)" class="paysList-text">{{ item.title }}</span>
                </li>
              </ul>
              <!-- 您还没有收款方式，请前往个人中心设置 -->
              <div
                class="noPay b-4-cl"
                @click="goNoPay" v-else>
                {{ $t('otcRelease.PaymentError') }}
              </div>
            </div>
            <!-- 自动回复 -->
            <c-textAreaLine name='reply'
              maxLength="500"
              marginTop="20px"
              :value="reply"
              :errorHave="true"
              @onchanges="inputLineChange"
              :warningText="`${reply.length}/500`"
              :promptText="$t('otcRelease.AutomaticRecovery')"/>
            <!-- 广告留言 -->
            <c-textAreaLine name='leavingText'
              maxLength="500"
              marginTop="30px"
              :value="leavingText"
              :errorHave="true"
              @onchanges="inputLineChange"
              :warningText="`${leavingText.length}/500`"
              :promptText="$t('otcRelease.AdvertisingMessage')"/>
            <c-button type="solid"
              paddingW="31px"
              height="40px"
              @click="confirm"
              :loading="confirmLoading"
              :disabled="confirmDisabled"
              marginTop="46px">
                {{$t('otcRelease.submit')}}
              </c-button>
            <c-otcReminder/>
            <c-dialog :showFlag="successDialogFlag"
              :titleText="$t('otcRelease.Reminder')"
              @confirm="successDialogConfirm"
              @close="successDialogClose"
              :confirmText="$t('otcRelease.AnotherOne')"
              :closeText="$t('otcRelease.goHall')">
              <!-- 恭喜您，广告发布成功。 -->
              <div class="success-dialog">{{ $t('otcRelease.success') }}</div>
            </c-dialog>
          </div>
          <c-verifyCationc-alert
            :showFlag="jurisdictionObj.flag"
            :imgMap="imgMap"
            :titleText="$t('otcRelease.SafetyTips')"
            :detaText="jurisdictionObj.str"
            :dataList="jurisdictionObj.data"
            :buttonText="jurisdictionObj.btnText"
            @confirm="alertConfirm"
            @close="alertClose"/>
        </div>
      <!-- </vue-scroll> -->
    </div>
  </section>
</template>
<script>
import mixin from 'BlockChain-ui/PC/common-mixin/otcRelease/index/index';
import 'BlockChain-ui/PC/common-mixin/otcRelease/index/index.styl';

export default {
  mixins: [mixin],
  mounted() {
    this.init();
  },
};

</script>
