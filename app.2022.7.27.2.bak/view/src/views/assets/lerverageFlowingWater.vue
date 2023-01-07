<template>
  <section class="page-flowingWater">
    <div class="flowingWater-nav a-3-bd">
      <c-navTab
        activeClassName="b-1-cl"
        activeColor="a-12-bg"
        className="b-2-cl"
        :currentTab="nowType"
        :navTab="navTab"
        lineHeight="55"
        @currentType="currentType"
      />
    </div>
    <div class="flowingWater-options">
      <!-- 方向 -->
      <c-select v-if="nowType === 3"
        :promptText="$t('assets.lerverageFlowingWater.direction')"
        :value="otherType"
        :options="otherTypeList"
        :errorHave="true"
        width="150px"
        @onChanges="otherTypeChange"/>
      <!-- 交易对 -->
      <c-select :promptText="$t('assets.lerverageFlowingWater.symbol')"
        :value="symbol"
        :options="symbolList"
        :errorHave="true"
        width="120px"
        :filterable="true"
        @onChanges="symbolChange"/>
    </div>
    <div class="flowingWater-table">
      <c-table
        :imgMap="imgMap"
        :colorMap="colorMap"
        :cellHeight='55'
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
    <leverageRepayment @success="repaymentSuccess"/>
  </section>
</template>
<script>
import mixin from 'BlockChain-ui/PC/common-mixin/assets/lerverageFlowingWater/lerverageFlowingWater';
import 'BlockChain-ui/PC/common-mixin/assets/lerverageFlowingWater/lerverageFlowingWater.styl';
import leverageRepayment from './leverageRepayment.vue';


export default {
  mixins: [mixin],
  components: {
    leverageRepayment,
  },
  mounted() {
    this.init();
  },
};
</script>
