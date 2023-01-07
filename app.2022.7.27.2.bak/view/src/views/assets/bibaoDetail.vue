<template>
  <section class="page-flowingWater">
    <!-- 币宝详情 -->
    <div class="flowingWater-nav a-3-bd b-1-cl">
      {{ $t('assets.bibaoAccount.bibaoDetail') }}
    </div>
    <div class="flowingWater-options">
      <c-select :promptText="$t('assets.otcFlowingWater.coin')"
        :value="symbol"
        :options="symbolList"
        :errorHave="true"
        width="120px"
        @onChanges="symbolChange"/>
    </div>
    <div class="flowingWater-table">
      <c-table
        :loading="tabelLoading"
        :imgMap="imgMap"
        :colorMap="colorMap"
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
import mixin from 'BlockChain-ui/PC/common-mixin/assets/bibaoDetail/bibaoDetail';
import 'BlockChain-ui/PC/common-mixin/assets/bibaoDetail/bibaoDetail.styl';

export default {
  mixins: [mixin],
  mounted() {
    this.init();
  },
};
</script>
