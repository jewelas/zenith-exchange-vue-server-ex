<template>
  <section class="page-innovations">
    <!-- 创新实验区 -->
    <!-- <div class="flowingWater-nav a-3-bd b-1-cl"> -->
      <!-- 创新实验区 -->
      <!-- {{$t('innov.innov_tit')}} -->
    <!-- </div> -->
    <div class="flowingWater-table">
      <c-table
        :loading="tabelLoading"
        :imgMap="imgMap"
        :colorMap="colorMap"
        :columns="columns"
        :dataList="tabelList"
        @elementClick = "goViewPage"
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
import mixin from 'BlockChain-ui/PC/common-mixin/assets/innovations/innovations';
import 'BlockChain-ui/PC/common-mixin/assets/innovations/innovations.styl';

export default {
  mixins: [mixin],
  mounted() {
    this.init();
  },
};
</script>
