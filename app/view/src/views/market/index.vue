<template>
  <NewMarket v-if="isNew" />
  <Market v-else />
</template>
<script>
import NewMarket from '../newMarket/index.vue';
import Market from './market.vue';

export default {
  components: {
    Market,
    NewMarket,
  },
  data() {
    return {
      isNew: true,
    };
  },
};
</script>
