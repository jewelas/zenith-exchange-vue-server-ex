<template>
  <div class="broker-system">
    <div class="broker-system-header a-3-bd clearfix">
      <c-navTab
        activeClassName="b-1-cl"
        activeColor="a-12-bg"
        class="b-2-cl"
        :currentTab="currentTab"
        :navTab="navTab"
        :lineHeight="lineHeight"
        :marginRight="marginRight"
        @currentType="currentType"
      />
    </div>
    <div class="broker-lower-content">
      <LowerInfo v-if="currentTab===1"></LowerInfo>
      <LowerInfoRebate v-if="currentTab===2"></LowerInfoRebate>
    </div>
  </div>
</template>

<script>
import mixin from 'BlockChain-ui/PC/common-mixin/personal/brokerSystem/lower/lower';
import 'BlockChain-ui/PC/common-mixin/personal/brokerSystem/lower/lower.styl';
import LowerInfo from './lowerInfo.vue';
import LowerInfoRebate from './lowerInfoRebate.vue';

export default {
  mixins: [mixin],
  mounted() {
    // this.init();
  },
  components: {
    LowerInfo,
    LowerInfoRebate,
  },
};
</script>
