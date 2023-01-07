<template>
  <section class="questionsList">
    <div class="title f-1-cl a-3-bd">{{$t('questions.list')}}</div>
    <div class="content">
      <c-table
        :imgMap="imgMap"
        :colorMap="colorMap"
        :loading="tabelLoading"
        :columns="columns"
        :dataList="tabelList"
        @elementClick="tableClick"
        classes="nobg"
        headClasses="nobg"
        bodyClasses="nobg"
      />
      <c-pagination v-if="paginationObj.total > paginationObj.display"
        :total='paginationObj.total'
        :display='paginationObj.display'
        :currentPage='paginationObj.currentPage'
        classes="nobg"
        @pagechange="pagechange"/>
    </div>
  </section>
</template>
<script>
import mixin from 'BlockChain-ui/PC/common-mixin/problemCenter/questionsList/questionsList';
import 'BlockChain-ui/PC/common-mixin/problemCenter/questionsList/questionsList.styl';

export default {
  mixins: [mixin],
  mounted() {
    this.init();
  },
};
</script>
