<template>
  <div class="areaAndIpLimit">
    <div class="explainText">
      <h3 class="b-1-cl">{{$t('serviceLimit.respectText')}}</h3>
      <p class="b-1-cl">
        {{$t('serviceLimit.explainText', {areaList: areaList})}}
      </p>
    </div>
    <aside>
      <img src="http://dev-saas-oss.oss-cn-hongkong.aliyuncs.com/upload/20210629171339539.png" alt="">
    </aside>
  </div>
</template>
<script>
import mixin from 'BlockChain-ui/PC/common-mixin/areaAndIpLimit/areaAndIpLimit';
import 'BlockChain-ui/PC/common-mixin/areaAndIpLimit/areaAndIpLimit.styl';

export default {
  name: 'AreaAndIpLimit',
  mixins: [mixin],
};
</script>
<style lang="stylus" scoped>

</style>
