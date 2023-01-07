<template>
  <section class="b2cRecrgeHis">
    <c-QRcode :flag="QRflag"
      :imgUrl="imgUrl"
      @QRcodeClick="QRcodeClick"/>
    <c-table
      :colorMap="colorMap"
      :loading="tabelLoading"
      :columns="columns"
      :subContent="subTableData"
      :subContentId="subTableDataId"
      :subColumns="subColumns"
      :dataList="tabelList"
      @elementClick="tableClick"
    />
    <c-pagination
      v-if="paginationObj.total > paginationObj.display"
      :total="paginationObj.total"
      :display="paginationObj.display"
      :currentPage="paginationObj.currentPage"
      @pagechange="pagechange"
    />
  </section>
</template>

<script>
import mixin from 'BlockChain-ui/PC/common-mixin/assets/b2cWithdrawHis/b2cWithdrawHis';
import 'BlockChain-ui/PC/common-mixin/assets/b2cWithdrawHis/b2cWithdrawHis.styl';

export default {
  mixins: [mixin],
  name: 'b2cRecrgeHis',
  mounted() {
    this.init();
  },
};
</script>
