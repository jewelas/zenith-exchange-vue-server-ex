<template>
  <div class="staking-record">
    <section class="table">
      <div class="header-row">
        <div class="cell" v-for="(item, index) in headerList" :key="index">{{ item }}</div>
      </div>
      <div class="content-row" v-for="(item, index) in contentList" :key="index">
        <div class="cell">
          <span class="qte-icon"
          :style="{background:`url(${item.logo}) no-repeat center`,backgroundSize: 'contain'}"/>
          {{ item.stakingCoin | analysisCoin(coinList) }}
        </div>
        <div class="cell">
          {{ item.stakingPeriod }}
          <span style="font-size: 14px; color: #888fa1">{{ $t("reward.day") }}</span>
        </div>
        <div class="cell">{{ item.stakingRate }}<span>%</span></div>
        <div class="cell">
          {{ item.stakingAmount }} {{ item.stakingCoin | analysisCoin(coinList) }}
        </div>
        <div class="cell">{{ item.stakingTime | formatTime }}</div>
        <div class="cell">
          {{ item.accumulatedReward }} {{item.stakingCoin | analysisCoin(coinList)}}
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
import mixin from 'BlockChain-ui/PC/common-mixin/reward/record/staking';
import 'BlockChain-ui/PC/common-mixin/reward/record/staking.styl';

export default {
  mixins: [mixin],
  created() {
    this.initData();
  },
};
</script>
