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
    <template v-if="nowType === 4">
      <innovations />
    </template>
    <template v-else>
      <div class="flowingWater-options">
        <!-- 币种 -->
        <c-select
          :promptText="$t('assets.flowingWater.coin')"
          :value="symbol"
          :options="symbolList"
          :errorHave="true"
          width="120px"
          :filterable="true"
          @onChanges="symbolChange"
        />
        <!-- 类型 -->
        <c-select
          v-if="nowType === 3"
          :promptText="$t('assets.flowingWater.type')"
          :value="otherType"
          :options="otherTypeList"
          :errorHave="true"
          :width="lan === 'zh_CN' ? '150px':'250px'"
          @onChanges="otherTypeChange"
        />
        <!-- 类型 -->
        <c-select
          v-if="nowType === 5"
          :promptText="$t('assets.flowingWater.type')"
          :value="currentIncomeType"
          :options="incomeType"
          :errorHave="true"
          width="150px"
          @onChanges="setIncomeType"
        />
      </div>
      <div class="flowingWater-table">
        <c-table
          :cellHeight="55"
          :imgMap="imgMap"
          :colorMap="colorMap"
          :loading="tabelLoading"
          :subContent="subTableData"
          :subContentId="subTableDataId"
          :subColumns="subColumns"
          :columns="columns"
          :dataList="tabelList"
          bodyClasses="bodyClasses"
          @elementClick="tableClick"
        />
        <c-pagination
          v-if="paginationObj.total > paginationObj.display"
          :total="paginationObj.total"
          :display="paginationObj.display"
          :currentPage="paginationObj.currentPage"
          @pagechange="pagechange"
        />
      </div>
    </template>
  </section>
</template>
<script>
import mixin from 'BlockChain-ui/PC/common-mixin/assets/flowingWater/flowingWater';
import 'BlockChain-ui/PC/common-mixin/assets/flowingWater/flowingWater.styl';
import innovations from './innovations.vue';

export default {
  mixins: [mixin],
  mounted() {
    this.init();
  },
  components: {
    innovations,
  },
};
</script>
