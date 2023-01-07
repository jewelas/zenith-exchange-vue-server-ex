<template>
  <section class="v5-page-exchangeOrder fuz-card">
    <div class="exchangeOrder-nav fuz-card-tab">
      <c-v5-navTab
        activeClassName="v5-5-cl"
        activeColor="v5-1-bg"
        className="v5-6-cl v5-12-bd"
        :currentTab="nowType"
        :navTab="navTab"
        lineHeight="60"
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
        <div class="search-box">
          <c-v5-select
            :value="side"
            :options="sideList"
            :errorHave="true"
            width="160px"
            inputHeight="32px"
            @onChanges="sideChange"/>
      </div>
      <div class="search-box">
          <c-v5-select
            :value="side"
            :options="sideList"
            :errorHave="true"
            width="160px"
            inputHeight="32px"
            @onChanges="sideChange"/>
      </div>
      <div class="search-box">
          <c-v5-select
            :value="symbolMarket"
            :options="symbolMarketList"
            :errorHave="true"
            width="160px"
            inputHeight="32px"
            @onChanges="symbolMarketChange"/>
      </div>
      <div class="search-box">
          <c-v5-select
            :value="symbolCoin"
            :options="symbolCoinList"
            :errorHave="true"
            width="160px"
            inputHeight="32px"
            @onChanges="symbolCoinChange"/>
      </div>
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
        :classes="'v5-10-bg v5-table'"
        :lineClassesHover="'v5-9-bg'"
        :lineClasses ="'v5-12-bd'"
        :cellHeight = '60'
        :headHeight = '0'
      />
      <c-v5-pagination v-if="paginationObj.total > paginationObj.display"
        :total='paginationObj.total'
        :display='paginationObj.display'
        :currentPage='paginationObj.currentPage'
        @pagechange="pagechange"/>
    </div>
  </section>
</template>

<script>
import mixin from 'BlockChain-ui/PC/common-mixin/newOrder/leverageOrder/leverageOrder';
import 'BlockChain-ui/PC/common-mixin/newOrder/leverageOrder/leverageOrder.styl';

export default {
  mixins: [mixin],
  mounted() {
    this.init();
  },
};
</script>
