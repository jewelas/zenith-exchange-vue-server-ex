<template>
  <broker v-if="!excheifFlag"></broker>
  <excheif v-else></excheif>
</template>

<script>
import mixin from 'BlockChain-ui/PC/common-mixin/broker/index/index';
import 'BlockChain-ui/PC/common-mixin/broker/index/index.styl';
import Broker from './broker.vue';
import Excheif from './excheif.vue';

export default {
  mixins: [mixin],
  components: {
    Broker,
    Excheif,
  },
};

</script>
