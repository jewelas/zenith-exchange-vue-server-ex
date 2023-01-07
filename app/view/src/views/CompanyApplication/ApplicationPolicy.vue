<template>
  <div class="application-policy-container">
    <div class="company-application">
      <h1 class="b-1-cl title a-5-bg">{{ $t("application.policy.title") }}</h1>
      <div>
        <p
          class="b-1-cl desc a-5-bg"
          v-html="$t('application.policy.desc')"
        ></p>
      </div>
    </div>
  </div>
</template>

<script>
import mixin from 'BlockChain-ui/PC/common-mixin/CompanyApplication/ApplicationPolicy/ApplicationPolicy';
import 'BlockChain-ui/PC/common-mixin/CompanyApplication/ApplicationPolicy/ApplicationPolicy.styl';

export default {
  mixins: [mixin],
};
</script>
