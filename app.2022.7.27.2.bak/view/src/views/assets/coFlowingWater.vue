<template>
  <section class="page-coflowingWater">
    <!-- 资金流水 -->
    <div class="flowingWater-nav a-3-bd e-1-cl">
      {{ $t('assets.otcFlowingWater.title') }}
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
import mixin from 'BlockChain-ui/PC/common-mixin/assets/coFlowingWater/coFlowingWater';
import 'BlockChain-ui/PC/common-mixin/assets/coFlowingWater/coFlowingWater.styl';

export default {
  mixins: [mixin],
  mounted() {
    this.init();
  },
};
</script>
