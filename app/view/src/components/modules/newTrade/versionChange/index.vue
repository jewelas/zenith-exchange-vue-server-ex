<template>
  <div v-if="canChange" class="trade-version_change a-13-bg" @click="changeVersion">
    {{changeText}}
  </div>
</template>
<script>
import mixin from 'BlockChain-ui/PC/common-mixin/modules/newTrade/versionChange/versionChange';
import 'BlockChain-ui/PC/common-mixin/modules/newTrade/versionChange/versionChange.styl';

export default {
  mixins: [mixin],
};
</script>
