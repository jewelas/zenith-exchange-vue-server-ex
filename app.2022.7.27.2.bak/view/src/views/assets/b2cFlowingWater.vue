<template>
  <section class="page-flowingWater">
    <div class="flowingWater-nav a-3-bd">
      <c-navTab
        activeClassName="b-1-cl"
        activeColor="a-12-bg"
        className="b-2-cl"
        :currentTab="nowType"
        :navTab="navTab"
        lineHeight="55"
        @currentType="currentType"
      />
    </div>
    <div class="flowingWater-options">
      <!-- 币种 -->
        <c-select
          :promptText="$t('assets.flowingWater.coin')"
          :value="symbol"
          :options="symbolList"
          :errorHave="true"
          width="120px"
          :filterable="true"
          @onChanges="symbolChange"
        />
    </div>
    <rechangeTable v-if="nowType === 1" :symbol="symbol"/>
    <withdrawTable v-if="nowType === 2" :symbol="symbol"/>
  </section>
</template>
<script>
import mixin from 'BlockChain-ui/PC/common-mixin/assets/b2cFlowingWater/b2cFlowingWater';
import 'BlockChain-ui/PC/common-mixin/assets/b2cFlowingWater/b2cFlowingWater.styl';
import rechangeTable from './b2cRecrgeHis.vue';
import withdrawTable from './b2cWithdrawHis.vue';

export default {
  mixins: [mixin],
  name: 'page-flowingWater',
  components: {
    rechangeTable,
    withdrawTable,
  },
  mounted() {
    this.init();
  },
};
</script>
