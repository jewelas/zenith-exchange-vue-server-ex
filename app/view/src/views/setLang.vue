<template>
  <div class="common-setLang">
    <c-navSelect :flag="true"
      :currentTab="activeLang"
      :navTab="langList"
      @currentType="headleChange"/>
  </div>
</template>

<script>
import mixin from 'BlockChain-ui/PC/common-mixin/setLang/setLang';

export default {
  mixins: [mixin],
};
</script>
