<template>
  <div class="assets-overview">
    <!-- 资产总览 -->
    <div class="total-assets fuz-card" style="padding: 20px !important;">
      <h2 class="title">
        <span class="v5-5-cl">{{$t('assets.total')}}</span>
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
      <div class="folded-num">
        <div v-if="!isHide" class="num-display">
          <span class="v5-5-cl btcNum">{{totalBalance}}&nbsp;BTC</span>
          <span class="v5-6-cl fiatNum">
            &nbsp;≈&nbsp;{{totalBalance_folded}}&nbsp;{{userCurrency}}
          </span>
        </div>
        <div v-else class="num-hide v5-5-cl"><b>********</b></div>
      </div>
      <div class="funcButton-list">
        <!-- 充值 -->
        <c-v5-button
          v-if="depositOpen"
          type="hollow"
          height="32px"
          paddingW="18px"
          :defaultColorClass="colorList_1[0]"
          :hoverColorClass="colorList_1[1]"
          :activeColorClass="colorList_1[2]"
          @click="operation('exchange', 'recharge')">
          {{$t('assets.exchangeAccount.Recharge')}}
        </c-v5-button>
         <!-- 体现 -->
        <c-v5-button
          type="hollow"
          height="32px"
          paddingW="18px"
          :defaultColorClass="colorList_1[0]"
          :hoverColorClass="colorList_1[1]"
          :activeColorClass="colorList_1[2]"
          @click="operation('exchange', 'withdraw')">
          {{$t('assets.exchangeAccount.withdraw')}}
        </c-v5-button>
        <!-- 划转 -->
        <c-v5-button
          v-if="transferList.length"
          type="hollow"
          height="32px"
          paddingW="18px"
          :defaultColorClass="colorList_1[0]"
          :hoverColorClass="colorList_1[1]"
          :activeColorClass="colorList_1[2]"
          @click="operation('exchange', 'transfer')">
          {{$t('assets.leverageAccount.transfer')}}
        </c-v5-button>
      </div>
    </div>
    <!-- <div class="assets-charts v5-10-bg">
      <div class="charts-title v5-5-cl">{{$t('assets.distribute')}}</div>
      <div class="echart-box">
        <c-echart
          :propData="echartOption"
          id="canvans4"
          class="bar_canvas"
          ref="echart"></c-echart>
        <ul class="coin-list">
          <li
            class="coin-item v5-5-cl"
            :class="{'v5-9-bg': coinHoverIndex === index}"
            v-for="(item, index) in coinDataList"
            :key="index"
            @mouseover="coinHover(index, true)"
            @mouseout="coinHover(index, false)">
            <span>
              <i class="spot" :style="{ 'background-color': item.spotColor }"></i>
              {{item.coinSymbol}}
            </span>
            <span>{{item.proportion}}%</span>
          </li>
        </ul>
      </div>
    </div> -->
    <!-- 各账户 -->
    <ul class="account-balance fuz-card" style="overflow:hidden">
      <li
        class="account-item"
        v-for="(item, index) in accountList"
        :class="{ 'v5-9-bg': item.type === accountHover}"
        :key="index"
        @mouseover="accountHover = item.type"
        @mouseout="accountHover = null">
        <div class="account-name v5-6-cl">{{item.name}}</div>
        <div class="account-balance_num">
          <div v-if="!isHide" class="num-display">
            <span class="v5-5-cl btcNum">{{item.balance}}&nbsp;BTC</span>
            <span class="v5-6-cl fiatNum">
              &nbsp;≈&nbsp;{{item.balance_folded}}&nbsp;{{userCurrency}}
            </span>
          </div>
          <div v-else class="num-hide v5-5-cl"><span>********</span></div>
        </div>
        <div class="operation-btn">
          <!-- 操作button -->
          <c-v5-button
            v-for="(m, n) in item.butttonList"
            :key="'btn' + n"
            type="hollow"
            height="32px"
            paddingW="18px"
            :defaultColorClass="colorList_2[0]"
            :hoverColorClass="colorList_2[1]"
            :activeColorClass="colorList_2[2]"
            @click="operation(item.type, m.type)">
            {{ m.text }}
          </c-v5-button>
        </div>
      </li>
    </ul>
    <!-- 划转 -->
    <c-v5-dialog
      :showFlag="showTransfer"
      :titleText="$t('assets.leverageAccount.transfer')"
      :confirmText="$t('assets.leverageAccount.transfer')"
      :confirmDisabled="transferDisabled"
      size="large"
      @close="closeTransfer"
      @confirm="confirmTransfer">
      <div class="transfer-form">
        <!-- 账户 -->
        <div class="transfer-account" :class="{ 'reverse': transferSide === 2 }">
          <div class="exchange account-side">
            <c-v5-input
              width="184px"
              name="exchangeAccount"
              :readonly="true"
              :value="$t('assets.index.exchangeAccount')">
              <div class="v5-6-cl" slot="promptExtend">
                {{transferSide === 1 ? $t('assets.otcAccount.from') : $t('assets.otcAccount.to')}}
              </div>
            </c-v5-input>
              <div class="available v5-6-cl">
                {{$t('assets.otcAccount.Available')}}:
                {{exchangeAvailable | thousands}}&nbsp;{{transferCoin}}
              </div>
          </div>
          <div class="change-icon">
            <svg class='icon icon-24' aria-hidden='true' @click="changeTransferSide">
              <use xlink:href='#icon-assets_9'></use>
            </svg>
          </div>
          <div class="other account-side">
            <c-v5-select
              type="fill"
              width="184px"
              :imgMap="imgMap"
              name="transferAccount"
              :options="transferList"
              :value="transferAccount"
              @onChanges="selectChange">
              <div class="v5-6-cl" slot="promptExtend">
                {{transferSide === 2 ? $t('assets.otcAccount.from') : $t('assets.otcAccount.to')}}
              </div>
            </c-v5-select>
              <div class="available v5-6-cl">
                {{$t('assets.otcAccount.Available')}}:
                {{otherAvailable | thousands}}&nbsp;{{transferCoin}}
              </div>
          </div>
        </div>
        <!-- 币对 -->
        <div v-if="transferAccount === 'lever'" class="transfer-symbol">
          <c-v5-select
            width="100%"
            name="transferSymbol"
            :imgMap="imgMap"
            :filterable="true"
            :options="symbolList"
            :value="transferSymbol"
            @onChanges="selectChange">
            <div class="v5-6-cl" slot="promptExtend">
              {{$t('order.exchangeOrder.coin')}}
            </div>
          </c-v5-select>
        </div>
        <!-- 币种 -->
        <div class="transfer-coin">
          <c-v5-select
            width="100%"
            name="transferCoin"
            :imgMap="imgMap"
            :options="coinList"
            :filterable="true"
            :value="transferCoin"
            @onChanges="selectChange">
            <div class="v5-6-cl" slot="promptExtend">
              {{$t('assets.otcAccount.coin')}}
            </div>
          </c-v5-select>
        </div>
        <div class="transfer-num">
          <c-v5-input
            width="100%"
            name="transferNum"
            :placeholder="$t('trade.pleaseInput') + $t('assets.otcAccount.volume')"
            :value="transferNum"
            :clearable="true"
            :errorFlag="transferError"
            :errorText="$t('assets.otcAccount.volumeError')"
            :warningText="transferWarningText"
            @onChanges="inputChange">
            <div class="v5-6-cl" slot="promptExtend">
              {{$t('assets.otcAccount.volume')}}
            </div>
            <span
              class="transfer-all v5-1-cl"
              slot="append"
              @click="transferAll">{{$t('assets.otcAccount.all')}}</span>
          </c-v5-input>
        </div>
      </div>
    </c-v5-dialog>
    <c-alert :showFlag="isShowDialog"
        :buttonText="$t('otcRelease.DeCertification')"
        :imgMap="imgMap"
        @close="dialogClose"
        @confirm="gotoAuth">
      <div class="ts-content-text">
        {{$t('personal.exccAuthForm.text19')}}
      </div>
    </c-alert>
    <div v-show="loading" class="assets-loading">
      <c-loading size="50" />
    </div>
  </div>
</template>
<script>
import mixin from 'BlockChain-ui/PC/common-mixin/newAssets/totalAssets/index';
import 'BlockChain-ui/PC/common-mixin/newAssets/totalAssets/index.styl';

export default {
  mixins: [mixin],
  mounted() {
    this.init();
  },
};
</script>
<style scoped>
.account-item {
  border-bottom: 1px solid rgba(255,255,255,0.1);
}
.account-item:last-child {
  border: none !important;
}
.account-item.v5-9-bg {
  background: rgba(0,0,0,0.1) !important;
}
</style>
