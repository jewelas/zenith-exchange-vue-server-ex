<template>
  <section class="page-flowingWater">
    <!-- 资金流水 -->
    <div class="flowingWater-nav a-3-bd b-1-cl">
      {{ $t('assets.otcFlowingWater.title') }}
    </div>
    <div class="flowingWater-options">
      <c-select :promptText="$t('assets.otcFlowingWater.type')"
        :value="type"
        :options="typeList"
        :errorHave="true"
        width="120px"
        @onChanges="typeChange"/>
      <c-select :promptText="$t('assets.otcFlowingWater.coin')"
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
import mixin from 'BlockChain-ui/PC/common-mixin/assets/otcFlowingWater/otcFlowingWater';
import 'BlockChain-ui/PC/common-mixin/assets/otcFlowingWater/otcFlowingWater.styl';

export default {
  mixins: [mixin],
  mounted() {
    this.init();
  },
};
</script>
