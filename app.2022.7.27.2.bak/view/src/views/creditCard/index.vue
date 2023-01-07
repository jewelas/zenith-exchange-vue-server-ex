<template>
  <component :is="comp"></component>
</template>
<script>
import mixin from 'BlockChain-ui/PC/common-mixin/creditCard/index';
import creditCard from './creditCard.vue';
import newCreditCard from '../newCreditCard/index.vue';
import latestCreditCard from '../latestCreditCard/index.vue';

export default {
  mixins: [mixin],
  components: {
    creditCard,
    newCreditCard,
    latestCreditCard,
  },
};

</script>
