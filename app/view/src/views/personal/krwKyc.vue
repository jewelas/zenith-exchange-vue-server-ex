<template>
<div class="common-krwkyc">
  <form name="form1" method="post" ref="myFrom" :action="commonSvlUrl">
    <!-- 认证请求信息-->
    <input type="hidden" name="tc" :value="tc"/>    <!-- 无法改变-->
    <input type="hidden" name="rqst_data" :value="rqstData"/>  <!-- 请求数据 -->
    <input type="hidden" name="target_id" :value="targetId"/>   <!-- Target ID -->
  </form>
</div>
</template>
<script>
import mixin from 'BlockChain-ui/PC/common-mixin/personal/krwKyc/krwKyc';
import 'BlockChain-ui/PC/common-mixin/personal/krwKyc/krwKyc.styl';

export default {
  mixins: [mixin],
  mounted() {
    this.init();
  },
};
</script>
