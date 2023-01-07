<template>
  <section>
    <!-- {{index_international_open}} -->
    <!-- <component v-bind:is="index_international_open" v-if="swiperFlag"></component> -->
    <Fuzionx/>
    <c-homeDialog></c-homeDialog>
  </section>
</template>
<script>
import mixin from 'BlockChain-ui/PC/common-mixin/home/index';
import Fuzionx from './fuzionx/fuzionx.vue';

export default {
  mixins: [mixin],
  components: {
    Fuzionx,
  },
};
</script>
