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
      <!-- 币种 -->
      <c-select :promptText="$t('assets.flowingWater.coin')"
        :value="symbol"
        :options="symbolList"
        :errorHave="true"
        width="120px"
        @onChanges="symbolChange"/>
    </div>
    <div class="flowingWater-table">
      <c-table
        :cellHeight='55'
        :imgMap="imgMap"
        :colorMap="colorMap"
        :loading="tabelLoading"
        :columns="columns"
        :dataList="tabelList"
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
import mixin from 'BlockChain-ui/PC/common-mixin/assets/krwFlowingWater/krwFlowingWater';
import 'BlockChain-ui/PC/common-mixin/assets/krwFlowingWater/krwFlowingWater.styl';

export default {
  mixins: [mixin],
  mounted() {
    this.init();
  },
};
</script>
