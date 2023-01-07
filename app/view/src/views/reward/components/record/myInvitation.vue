<template>
  <div class="my-invite">
    <section class="table">
      <div class="header-row">
        <div class="cell" v-for="(item, index) in headerList" :key="index">{{ item }}</div>
      </div>
      <div class="content-row" v-for="(item, index) in contentList" :key="index">
        <div class="cell">{{ item.uid }}</div>
        <div class="cell">{{ item.registerTime | formatTime }}</div>
        <div class="cell kycstatus" :style="item.kycStatus ? 'color:#2762FF' : 'color:#B7BCCA'">
          <i class="kyc" :class="item.kycStatus ? 'active' : 'deactive'"></i>
          {{ item.kycStatus | analysisStatus(self) }}
        </div>
        <div class="cell">{{ item.type || '--' }}</div>
        <div class="cell">{{ item.level | analysisLevel(self) }}</div>
        <div class="cell">{{ item.endTime | formatTime }}</div>
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
import mixin from 'BlockChain-ui/PC/common-mixin/reward/record/invite';
import 'BlockChain-ui/PC/common-mixin/reward/record/invite.styl';

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
