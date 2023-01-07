// Created by 任泽阳 on 19/03/14.
// 资产中心 合约账户页面
<template>
  <section class="page-coAccount">
    <div class="coAccount-header-bg fuz-card fuz-gap small">
      <div class="coAccount-header" :style="exchangeHeader">
        <!-- 账户余额 -->
        <div class="quota b-8-cl">
          <!-- 账户余额 -->
          <div class="title b-9-cl">{{ $t('assets.coAccount.quota') }}</div>
          <div class="number">
            {{ detailsData.margin | fixDFn(this) }}
            <span class="Company">{{detailsData.quoteSymbol}}</span>
          </div>
          <div class="Legal">≈ {{ detailsData.margin | fixRateFn(this) }}</div>
          <!-- <div class="options" @click="clickDialog">
            <svg class="icon icon-16" aria-hidden="true">
              <use xlink:href="#icon-b_26"></use>
            </svg>
            {{ $t('assets.coAccount.transfer') }}
          </div> -->
        </div>
        <ul class="cohead-list b-1-cl a-22-bd">
          <!-- 可用余额 -->
          <li>
            <div class="key b-9-cl">{{ $t('assets.coAccount.totel') }}</div>
            <div class="value b-8-cl">
              {{ detailsData.canUseBalance | fixDFn(this) }} {{detailsData.quoteSymbol}}
            </div>
          </li>
          <!-- 账户权益 -->
          <li>
            <div class="key b-9-cl">{{ $t('assets.coAccount.accountRight') }}</div>
            <div class="value b-8-cl">
              {{ detailsData.accountRight | fixDFn(this) }} {{detailsData.quoteSymbol}}
            </div>
          </li>
          <!-- 委托保证金 -->
          <li>
            <div class="key b-9-cl">{{ $t('assets.coAccount.orderMargin') }}</div>
            <div class="value b-8-cl">
              {{ detailsData.orderMargin | fixDFn(this) }} {{detailsData.quoteSymbol}}
            </div>
          </li>
        </ul>
        <ul class="cohead-list b-1-cl a-22-bd">
          <!-- 仓位保证金 -->
          <li>
            <div class="key b-9-cl">{{ $t('assets.coAccount.positionMargin') }}</div>
            <div class="value b-8-cl">
              {{ detailsData.positionMargin | fixDFn(this) }} {{detailsData.quoteSymbol}}
            </div>
          </li>
          <!-- 未实现盈亏 -->
          <li>
            <div class="key b-9-cl">{{ $t('assets.coAccount.unrealisedAmount') }}</div>
            <div class="value b-8-cl">
              {{ detailsData.unrealisedAmount | fixDFn(this) }} {{detailsData.quoteSymbol}}
            </div>
          </li>
        </ul>
      </div>
    </div>
    <div class="exchangeAccount-body fuz-noborder fuz-card">
      <div class="exchangeAccount-title fuz-card-title">
        <!-- 资金列表 -->
        <!-- 未平仓合约 -->
        <div class="text b-1-cl medium" style='line-height: 1;float:none'>
          {{ $t('assets.coAccount.listTitle') }}
        </div>
        <div class="client f-7-cl"  style='line-height: 1;'>
          <svg class="icon icon-16 client-icon" aria-hidden="true" style="marginRight: 10px">
            <use xlink:href="#icon-c_2"></use>
          </svg>
          <span class="client-text">
            {{ $t('assets.coAccount.useMarginRate') }}：
            {{ detailsData.useMarginRate }}%</span>
        </div>
      </div>
      <div class="exchangeAccount-center fuz-full">
        <c-table
          :cellHeight='55'
          :imgMap="imgMap"
          :colorMap="colorMap"
          :loading="tabelLoading"
          :lineNumber="tableData.length"
          @elementClick="tableClick"
          :columns="columns"
          :dataList="tableData"
        />
      </div>
    </div>
    <c-dialog :showFlag="showFlag"
      :titleText="$t('assets.coAccount.transfer')"
      @close="dialogClose"
      @confirm="dialogConfirm"
      :confirmLoading="dialogConfirmLoading"
      :confirmDisabled="dialogConfirmDisabled">
      <section class="transfer-box">
          <!-- 方向 -->
          <ul class="transfer-content a-4-bg">
            <li class="transfer-page">
              <!-- 从 -->
              <div class="transfer-page-side">{{ $t('assets.otcAccount.from') }}</div>
              <div class="transfer-page-name b-1-cl">{{ side.from }}</div>
            </li>
            <li class="transfer-icon">
              <svg class="icon icon-36" aria-hidden="true"  @click="setTransferSide">
                <use xlink:href="#icon-f_4"></use>
              </svg>
            </li>
            <li class="transfer-page">
              <!-- 划转到 -->
              <div class="transfer-page-side">{{ $t('assets.otcAccount.to') }}</div>
              <div class="transfer-page-name b-1-cl">{{ side.to }}</div>
            </li>
          </ul>
          <!-- 划转数量 -->
          <c-inputLine
            name='transferValue'
            :value="transferValue"
            :promptText="$t('assets.otcAccount.volume')"
            :errorHave="true"
            :errorFlag="transferError"
            :errorText="$t('assets.otcAccount.volumeError')"
            :warningText="transferWarningText"
            @onchanges="inputLineChange">
            <!-- 全部 -->
            <c-button type="text" height="30px" @click="allTransfer">
              {{ $t('assets.otcAccount.all') }}
            </c-button>
          </c-inputLine>
        </section>
    </c-dialog>
  </section>
</template>

<script>
import mixin from 'BlockChain-ui/PC/common-mixin/assets/coAccount/coAccount';
import 'BlockChain-ui/PC/common-mixin/assets/coAccount/coAccount.styl';

export default {
  mixins: [mixin],
  mounted() {
    this.init();
  },
};
</script>
