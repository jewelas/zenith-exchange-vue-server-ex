<template>
  <section class="v5-page-manageFinance">
    <div class="total-assets fuz-bg">
      <div class="manageFinance-balance">
        <h2 class="title">
          <!-- 理财账户 -->
          <span class="v5-5-cl">{{$t('assets.manageFinance.title')}}</span>
          <span
            class="hide-assets v5-9-bg"
            @click="hideAssets">
            <svg v-if="isHide" class="icon icon-12" aria-hidden="true">
              <use xlink:href="#icon-assets_13"></use>
            </svg>
            <svg v-else class="icon icon-12" aria-hidden="true">
              <use xlink:href="#icon-assets_12"></use>
            </svg>
          </span>
        </h2>
        <div class="folded-text">
          {{$t('assets.exchangeAccount.TotalAssets')}}
        </div>
        <!-- 资产折合 -->
        <div class="folded-num">
          <div v-if="!isHide" class="num-display">
            <span class="v5-5-cl btcNum">
              {{totalBalance | thousands}}&nbsp;{{totalBalanceSymbol}}
            </span>
            <span class="v5-6-cl fiatNum">
              &nbsp;≈&nbsp;{{totalFold | thousands}}&nbsp;{{userCurrency}}
            </span>
          </div>
          <div v-else class="num-hide v5-5-cl"><span>********</span></div>
        </div>
      </div>
      <!-- 收益 -->
      <div class="manageFinance-PNL">
        <div class="PNL-item">
          <!-- 30日收益 -->
          <div class="PNL-title v5-6-cl">
            {{$t('assets.manageFinance.tpl')}}({{interestSymbol}})
          </div>
          <div v-if="!isHide" class="PNL-amount v5-5-cl">{{thirtyProfit}}</div>
          <div class="v5-5-cl PNL-amount" v-else>********</div>
        </div>
        <div class="PNL-item">
           <!-- 昨日收益 -->
          <div class="PNL-title v5-6-cl">
            {{$t('assets.manageFinance.ypl')}}({{interestSymbol}})
          </div>
          <div v-if="!isHide" class="PNL-amount v5-5-cl">{{yesterdayProfit}}</div>
          <div class="v5-5-cl PNL-amount" v-else>********</div>
        </div>
      </div>
      <div class="funcButton-list">
        <!-- 申购 -->
        <c-v5-button
          type="hollow"
          height="32px"
          paddingW="18px"
          :defaultColorClass="colorList_1[0]"
          :hoverColorClass="colorList_1[1]"
          :activeColorClass="colorList_1[2]"
          @click="subscribeNow">
          {{$t("assets.manageFinance.subscription")}}
        </c-v5-button>
      </div>
    </div>
    <!-- 持仓记录 -->
    <div class="manageFinance-list fuz-card">
      <div class="list-header fuz-card-title">
        <!-- 持仓中 -->
        <div class="title v5-5-cl">
          {{ $t("assets.manageFinance.handle") }}
        </div>
        <div class="find">
          <!-- 搜索币种 -->
          <c-v5-inputFind
            :promptText="$t('assets.exchangeAccount.SearchCurrency')"
            :value="coinSearch"
            :clearable="true"
            @onChanges="findChanges"
            className="findClass"
          />
        </div>
      </div>
      <div class="manageFinance-center">
        <c-v5-table
          :loading="tabelLoading"
          :imgMap="imgMap"
          :colorMap="colorMap"
          :columns="columns"
          :dataList="tableList">
          <!-- 无认购数据 -->
          <template slot="noData">
            <div class="noData-wrap">
              <svg class='icon icon-50' aria-hidden='true'>
                <use xlink:href='#icon-assets_24'></use>
              </svg>
              <div class="noData-tip v5-5-cl">{{$t("assets.manageFinance.noData")}}</div>
              <c-v5-button
                width="170px"
                @click="subscribeNow">
                {{$t("assets.manageFinance.subscriptionNow")}}
              </c-v5-button>
            </div>
          </template>
          <!-- head -->
          <template slot="th_autoStatus" slot-scope="scope">
            <div
              class="autoStatus-tip v5-9-bd"
              @mouseover="showAutoStatusTip = true"
              @mouseleave="showAutoStatusTip = false">
              {{scope.row.title}}
              <transition name="slide-fade">
                <div v-show="showAutoStatusTip" class="tip-content box-shadow v5-19-bg v5-5-cl">
                  {{$t("assets.manageFinance.tip1")}}
                  <span class="triangle v5-19-bd"></span>
                </div>
              </transition>
            </div>
          </template>
          <!-- 币种 -->
          <dl
            v-if="coinList && coinList[scope.row.coinSymbol]"
            slot="coinSymbol" slot-scope="scope" class="table-coin">
            <dt>
              <img :src="coinList[scope.row.coinSymbol].icon" alt="" />
            </dt>
            <dd>
              <div class="coinShowName v5-5-cl">
                {{scope.row.coinSymbol | getCoinShowName(coinList)}}
              </div>
              <div class="coinLongName v5-6-cl">
                {{ coinList[scope.row.coinSymbol].longName || scope.row.coinSymbol }}
              </div>
            </dd>
          </dl>
          <!-- 自动转入 -->
          <template slot="autoStatus" slot-scope="scope">
            <div class="auto-subscribe_icon">
              <svg
                v-if="scope.row.autoStatus === 0"
                class='icon icon-40'
                aria-hidden='true'
                @click="tableClick(scope.row, 'autoStatus')">
                <use xlink:href='#icon-assets_22'></use>
              </svg>
              <svg
                v-else
                class='icon icon-40'
                aria-hidden='true'
                @click="tableClick(scope.row, 'autoStatus')">
                <use xlink:href='#icon-assets_23'></use>
              </svg>
            </div>
          </template>
          <!-- 数量 -->
          <template slot="balance" slot-scope="scope">
            <div v-if="isHide">********</div>
            <div v-else>{{scope.row.balance | thousands}}</div>
          </template>
          <!-- 年化 -->
          <template slot="yearRate" slot-scope="scope">
            <div v-if="isHide">********</div>
            <div v-else>{{scope.row.yearRate | thousands}}%</div>
          </template>
          <!-- 累计收益 -->
          <template slot="totalInterest" slot-scope="scope">
            <div v-if="isHide">********</div>
            <div v-else>{{scope.row.totalInterest | thousands}}</div>
          </template>
          <!-- 操作 -->
          <div slot="operate" slot-scope="scope">
            <c-v5-button
              class="operation-button"
              type="text"
              paddingW="0"
              @click="tableClick(scope.row, 'redemption')">
              {{$t("assets.manageFinance.redemption")}}
            </c-v5-button>
            <c-v5-button
              class="operation-button"
              type="text"
              paddingW="0"
              @click="tableClick(scope.row, 'subscribe')">
              {{$t("assets.manageFinance.subscription")}}
            </c-v5-button>
          </div>
        </c-v5-table>
      </div>
    </div>
    <!-- 认购 -->
    <c-v5-dialog
      :showFlag="showSubscribeDialog"
      :titleText="$t('assets.manageFinance.subscribeTitle')"
      :confirmText="$t('assets.manageFinance.confirmSubscribe')"
      :confirmDisabled="subscribeDisabled"
      paddingBottom="28px"
      @close="closeSubscribe"
      @confirm="confirmSubscribe">
      <div class="subscribe-wrap">
        <!-- 选择币种 -->
        <c-v5-select
          width="378px"
          :value="coinSymbol"
          :options="projectList"
          :imgMap="imgMap"
          name="coinSymbol"
          @onChanges="selectChange">
          <div class="v5-6-cl" slot="promptExtend">
            {{$t('assets.manageFinance.coin')}}
          </div>
        </c-v5-select>
        <!-- 年化和类型 -->
        <ul class="project-info">
          <li class="project-info_item">
            <span class="v5-6-cl name">{{$t('assets.manageFinance.refAnnualized')}}</span>
            <span class="v5-5-cl value">{{projectInfo.dailyAnnualizedInterestRate}}%</span>
          </li>
          <li class="project-info_item">
            <span class="v5-6-cl name">{{$t('assets.manageFinance.type')}}</span>
            <span class="v5-5-cl value">{{$t('assets.manageFinance.period')}}</span>
          </li>
        </ul>
        <!-- 认购金额 -->
        <div class="subscribe-amount">
          <c-v5-input
            width="100%"
            name="subscribeAmount"
            :placeholder="subscribePlaceholder"
            :value="subscribeAmount"
            :errorFlag="subscribeError.flag"
            :errorText="subscribeError.text"
            @onChanges="inputChange">
            <div class="v5-6-cl" slot="promptExtend">
              {{$t('assets.manageFinance.amount')}}
            </div>
            <div class="v5-1-cl subscribeAll" slot="append" @click="subscribeAll">
              {{$t('assets.manageFinance.all')}}
            </div>
          </c-v5-input>
          <div class="avaliable-tip v5-6-cl">
            {{$t('assets.manageFinance.available')}} {{subscribeAvaliable}} {{coinShowSymbol}}
          </div>
        </div>
        <!-- 自动申购 -->
        <div class="auto-subscribe">
          <div class="auto-subscribe_text">
            <div class="auto-subscribe_title v5-5-cl">
              {{$t('assets.manageFinance.autoSubscribe')}}
            </div>
            <div class="auto-subscribe_status v5-6-cl">
              {{autoSubscribeStatus}}
            </div>
          </div>
          <div class="auto-subscribe_icon" @click="changeAutoType">
            <svg v-if="autoStatus === 0" class='icon icon-40' aria-hidden='true'>
              <use xlink:href='#icon-assets_22'></use>
            </svg>
            <svg v-else class='icon icon-40' aria-hidden='true'>
              <use xlink:href='#icon-assets_23'></use>
            </svg>
          </div>
        </div>
      </div>
    </c-v5-dialog>
    <!-- 赎回 -->
    <c-v5-dialog
      :showFlag="showRedemptionDialog"
      :titleText="$t('assets.manageFinance.redemption')"
      :confirmDisabled="redemptionDisabled"
      paddingBottom="28px"
      @close="closeRedemption"
      @confirm="confirmRedemption">
      <div class="redemption-wrap">
        <!-- 选择币种 -->
        <c-v5-select
          width="378px"
          :value="redemptionCoin"
          :options="projectList"
          :disabled="true"
          :imgMap="imgMap"
          name="redemptionCoin"
          @onChanges="selectChange">
          <div class="v5-6-cl" slot="promptExtend">
            {{$t('assets.manageFinance.coin')}}
          </div>
        </c-v5-select>
        <!-- 赎回金额 -->
        <div class="redemption-amount">
          <c-v5-input
            width="100%"
            name="redemptionAmount"
            :placeholder="$t('assets.manageFinance.hint2')"
            :value="redemptionAmount"
            :errorFlag="redemptionError.flag"
            :errorText="redemptionError.text"
            @onChanges="inputChange">
            <div class="v5-6-cl" slot="promptExtend">
              {{$t('assets.manageFinance.redemptionAmount')}}
            </div>
            <div class="v5-1-cl subscribeAll" slot="append" @click="redemptionAll">
              {{$t('assets.manageFinance.all')}}
            </div>
          </c-v5-input>
          <div class="avaliable-tip v5-6-cl">
            {{$t('assets.manageFinance.available')}} {{redemptionAvaliable}} {{redemptionShowCoin}}
          </div>
        </div>
        <div class="redemptionTip v5-6-cl">
          {{$t('assets.manageFinance.redemptionTip')}}
        </div>
      </div>
    </c-v5-dialog>
    <!-- 提示弹窗 -->
    <c-v5-dialog
      :showFlag="showTip"
      class="tip-dialog"
      :titleText="tipTitle"
      paddingBottom="28px"
      @close="closeTip"
      @confirm="confirmTip">
      <div v-if="tipType === 'info'" class="autoSubscribeTip v5-5-cl">
        {{$t('assets.manageFinance.autoSubscribeTip')}}
      </div>
      <div v-if="tipType === 'success'" class="subscribe-success">
        <svg class='icon icon-60' aria-hidden='true'>
          <use xlink:href='#icon-assets_25'></use>
        </svg>
        <div class="v5-5-cl">{{$t('assets.manageFinance.success')}}</div>
      </div>
      <div v-if="tipType === 'fail'" class="subscribe-fail">
        <svg class='icon icon-60' aria-hidden='true'>
          <use xlink:href='#icon-assets_26'></use>
        </svg>
        <div class="v5-5-cl">{{$t('assets.manageFinance.fail')}}</div>
      </div>
    </c-v5-dialog>
    <!-- 未实名提示 -->
    <c-alert
      :showFlag="showAuthAlert"
      :buttonText="$t('assets.manageFinance.toAuth')"
      :imgMap="imgMap"
      @close="closeAlert"
      @confirm="gotoAuth">
      <div class="ts-content-text">
        {{$t('assets.manageFinance.authTip')}}
      </div>
    </c-alert>
    <div v-show="loading" class="assets-loading">
      <c-loading size="50" />
    </div>
  </section>
</template>

<script>
import mixin from 'BlockChain-ui/PC/common-mixin/newAssets/manageFinance/index';
import 'BlockChain-ui/PC/common-mixin/newAssets/manageFinance/index.styl';

export default {
  mixins: [mixin],
  mounted() {
    this.init();
  },
};
</script>
