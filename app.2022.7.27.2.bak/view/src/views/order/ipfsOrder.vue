<template>
  <section class="page-innovations">
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
import mixin from 'BlockChain-ui/PC/common-mixin/order/ipfsOrder/ipfsOrder';
import 'BlockChain-ui/PC/common-mixin/order/ipfsOrder/ipfsOrder.styl';

export default {
  mixins: [mixin],
  mounted() {
    this.init();
  },
};
</script>
