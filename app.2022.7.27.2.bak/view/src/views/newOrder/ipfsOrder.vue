<template>
  <section class="v5-page-innovations v5-10-bg">
    <div class="flowingWater-table">
      <c-table
        :loading="tabelLoading"
        :imgMap="imgMap"
        :colorMap="colorMap"
        :columns="columns"
        :dataList="tabelList"
        @elementClick = "goViewPage"
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
import mixin from 'BlockChain-ui/PC/common-mixin/newOrder/ipfsOrder/ipfsOrder';
import 'BlockChain-ui/PC/common-mixin/newOrder/ipfsOrder/ipfsOrder.styl';

export default {
  mixins: [mixin],
  mounted() {
    this.init();
  },
};
</script>
