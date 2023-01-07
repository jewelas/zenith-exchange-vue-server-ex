<template>
  <section class="page-exchangeOrder fuz-card">
    <div class="exchangeOrder-nav fuz-card-tab">
      <c-navTab
        activeClassName="b-1-cl"
        activeColor="a-12-bg"
        className="b-2-cl"
        :currentTab="nowType"
        :navTab="navTab"
        lineHeight="55"
        @currentType="currentType"
      />
      <div class="exchangeOrder-nav-switchs" v-if="nowType === 2">
        <!-- 显示已撤单 -->
        <c-switch
          :value="switchFlag"
          @click="switchChange"/>
        <span class="text">{{ $t('order.exchangeOrder.haveCancel') }}</span>
      </div>
    </div>
    <div class="exchangeOrder-options">
      <!-- 类别 -->
      <c-select :promptText="$t('order.exchangeOrder.type')"
        :value="side"
        :options="sideList"
        :errorHave="true"
        width="120px"
        @onChanges="sideChange"/>
      <!-- 市场 -->
      <c-select :promptText="$t('order.exchangeOrder.market')"
        :value="symbolMarket"
        :options="symbolMarketList"
        :errorHave="true"
        width="160px"
        :filterable="true"
        @onChanges="symbolMarketChange"/>
      <!-- 币种 -->
      <c-select :promptText="$t('order.exchangeOrder.coin')"
        :value="symbolCoin"
        :options="symbolCoinList"
        :errorHave="true"
        :filterable="true"
        width="150px"
        @onChanges="symbolCoinChange"/>
    </div>
    <div class="exchangeOrder-table">
      <c-table
        :imgMap="imgMap"
        :colorMap="colorMap"
        :loading="tabelLoading"
        :columns="columns"
        :dataList="tabelList"
        @elementClick="tableClick"
        :subContent="subContent"
        :subColumns="subColumns"
        :subContentId="subContentId"
        :subLoading="subLoading"
      />
      <c-pagination v-if="paginationObj.total > paginationObj.display"
        :total='paginationObj.total'
        :display='paginationObj.display'
        :currentPage='paginationObj.currentPage'
        @pagechange="pagechange"/>
    </div>
  </section>
</template>

<script>
import mixin from 'BlockChain-ui/PC/common-mixin/order/leverageOrder/leverageOrder';
import 'BlockChain-ui/PC/common-mixin/order/leverageOrder/leverageOrder.styl';

export default {
  mixins: [mixin],
  mounted() {
    this.init();
  },
};
</script>
