<template>
  <!-- 仅韩国人认证 -->
  <krwManagement v-if="coinsKrwOpen === '1'" />
  <!-- 普通认证 -->
  <UserManagement v-else-if="coinsKrwOpen === '0'" />
</template>

<script>
import mixin from 'BlockChain-ui/PC/common-mixin/personal/management/management';
import krwManagement from './krwManagement.vue';
import UserManagement from './UserManagement.vue';

export default {
  mixins: [mixin],
  components: {
    krwManagement,
    UserManagement,
  },
};
</script>
