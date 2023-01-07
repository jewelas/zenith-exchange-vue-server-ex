<template>
  <section class="staking-container">
    <div class="title">Staking</div>
    <section class="table">
      <div class="header-row">
        <div class="cell" v-for="(item, index) in headerList" :key="index">{{ item }}</div>
      </div>
      <div class="content-row" v-for="(item, index) in contentList" :key="index">
        <div class="cell">
          <span
            class="qte-icon"
            :style="{
              backgroundImage: `url(${item.logo})`,
              backgroundSize: 'contain',
            }"
          />
          <!-- <span class="qte-icon"/> -->
          {{ item.stakingCoin | analysisCoin(self) }}
        </div>
        <div class="cell">
          {{ item.stakingPeriod }}
          <span style="font-size: 14px; color: #888fa1">{{$t('reward.day')}}</span>
        </div>
        <div class="cell">{{ item.stakingRate }}<span>%</span></div>
        <div class="cell">{{ item.type | analysisType(self) }}</div>
        <div class="cell">
          <c-button class="btn" @click="handleOnStaking(item)">Staking</c-button>
        </div>
      </div>
    </section>
    <section v-if="!contentList.length" class="nodata">
      <span>{{$t('reward.nodata')}}</span>
    </section>
    <StakingDialog
      v-if="showStakingDialog"
      :showFlag.sync="showStakingDialog"
      :config="contentList"
      :id="currentId"
    />
  </section>
</template>

<script>
import mixin from 'BlockChain-ui/PC/common-mixin/reward/staking';
import 'BlockChain-ui/PC/common-mixin/reward/staking.styl';

import StakingDialog from './dialog/stakingDialog.vue';

export default {
  mixins: [mixin],
  components: {
    StakingDialog,
  },
};
</script>
