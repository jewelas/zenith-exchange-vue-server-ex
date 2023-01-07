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
      <studioInfo v-if="currentTab===1"></studioInfo>
      <studioInfoRebate v-if="currentTab===2"></studioInfoRebate>
    </div>
  </div>
</template>

<script>
import mixin from 'BlockChain-ui/PC/common-mixin/personal/brokerSystem/studio/studio';
import 'BlockChain-ui/PC/common-mixin/personal/brokerSystem/studio/studio.styl';
import studioInfo from './studioInfo.vue';
import studioInfoRebate from './studioInfoRebate.vue';

export default {
  mixins: [mixin],
  mounted() {
    // this.init();
  },
  components: {
    studioInfo,
    studioInfoRebate,
  },
};
</script>
