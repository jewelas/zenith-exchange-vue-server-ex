<template>
  <div class="rebate-record">
    <section class="table">
      <div class="header-row">
        <div class="cell" v-for="(item, index) in headerList" :key="index">{{ item }}</div>
      </div>
      <div class="content-row" v-for="(item, index) in contentList" :key="index">
        <div class="cell">{{ item.date | formatTime }}</div>
        <div class="cell">{{ item.uid }}</div>
        <div class="cell">{{ item.relation }}</div>
        <div class="cell">{{ item.uidAmount }} {{item.coinSymbol | analysisCoin(coinList) }}</div>
        <div class="cell">{{ item.pidAmount}} {{item.coinSymbol | analysisCoin(coinList) }}</div>
        <div class="cell">{{ item.type | analysisType(self) }}</div>
        <div class="cell" :style="item.status ? 'color:#14b886' : 'color:#888fa1'">
          {{ item.status | analysisStatus(self) }}
        </div>
      </div>
    </section>
    <section v-if="!contentList.length" class="nodata">
      <span>{{ $t("reward.nodata") }}</span>
    </section>
    <section class="page" v-if="total / pageSize > 1">
      <c-pagination
        :total="total"
        :current-page="page"
        :display="pageSize"
        @pagechange="onPagechange"
        classes="pagination-bar a-5-bg"
      />
    </section>
  </div>
</template>

<script>
import mixin from 'BlockChain-ui/PC/common-mixin/reward/record/rebate';
import 'BlockChain-ui/PC/common-mixin/reward/record/rebate.styl';

export default {
  mixins: [mixin],
  created() {
    this.initData();
  },
};
</script>

<style lang="stylus" scoped>
.a-5-bg {
  background: none !important;
}
.pagination-bar {
  border: none !important;
  >>> .pagination-bar {
    border: none !important;
  }
}
</style>
