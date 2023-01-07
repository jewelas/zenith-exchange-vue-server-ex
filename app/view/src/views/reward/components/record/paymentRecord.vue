<template>
  <div class="payment-record">
    <section class="table">
      <div class="header-row">
        <div class="cell" v-for="(item, index) in headerList" :key="index">{{ item }}</div>
      </div>
      <div class="content-row" v-for="(item, index) in contentList" :key="index">
        <div class="cell">{{ item.orderId }}</div>
        <div class="cell">{{ item.amount }}</div>
        <div class="cell">{{ item.coinSymbol | analysisCoin(coinList) }}</div>
        <div class="cell">{{ item.vipName }}</div>
        <div class="cell">{{ item.ctime | formatTime }}</div>
        <div class="cell">{{ item.mtime | formatTime }}</div>
        <!-- <div class="cell" :style="item.status ? 'color:#14b886' : 'color:#888fa1'"> -->
        <div class="cell">
          <span :class="{unpaid:item.status==0,paid:item.status==1,cancel:item.status==2}">
          {{ item.status | analysisStatus(self) }}
          </span>
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
import mixin from 'BlockChain-ui/PC/common-mixin/reward/record/payment';
import 'BlockChain-ui/PC/common-mixin/reward/record/payment.styl';

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
