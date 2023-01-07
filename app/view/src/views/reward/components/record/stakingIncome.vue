<template>
  <div class="income-record">
    <section class="table">
      <div class="header-row">
        <div class="cell" v-for="(item, index) in headerList" :key="index">{{ item }}</div>
      </div>
      <div class="content-row" v-for="(item, index) in contentList" :key="index">
        <div class="cell">{{ item.date | formatTime }}</div>
        <div class="cell">{{ item.gainAmount }} {{item.gainCoin|analysisCoin(self)}}</div>
        <div class="cell">{{ item.stakingPeriod }} {{ $t("reward.day") }}</div>
        <div class="cell">
          <span :class="{
                  undetermined:[0,4,10].includes(item.status),
                  access:[1,3,11].includes(item.status),
                  reject:[2,12].includes(item.status)
          }">
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
import mixin from 'BlockChain-ui/PC/common-mixin/reward/record/income';
import 'BlockChain-ui/PC/common-mixin/reward/record/income.styl';

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
