<template>
  <section class="fuzionx-home">
    <SocialList/>
    <div class='fuz-center' style='padding-top: 40px'>
      <fuz-switch on-value='Exchange' off-value='DeFi-Zone' @change='onChange'/>
    </div>
    <div class="page-section max-width">
      <Intro />
    </div>
    <!-- 推荐位 -->
    <div class="page-section with-line recommend">
       <Recommend class="max-width"/>
    </div>
    <div class="page-section max-width">
      <Card class="recommend" title="Market trend">
        <Market :dataList='marketDataList' :marketCurrent='marketCurrent' />
      </Card>
    </div>
    <!-- 信用卡 -->
    <div class="page-section max-width">
      <CreditCard />
    </div>
    <div class="page-section max-width">
      <Steps />
    </div>
    <!-- 联系我们 -->
    <div class="page-section max-width">
      <Contact />
    </div>
    <!-- APP -->
    <div class="page-section max-width">
      <Apps />
    </div>
    <!-- Community -->
    <div class="page-section max-width">
      <Join />
    </div>
    <!-- Learn -->
    <div class="page-section max-width">
      <Learn />
    </div>
    <i v-if="!baseInfo"></i>
  </section>
</template>

<script>
import commonMixin from 'BlockChain-ui/PC/common-mixin/home/home/home';
import 'BlockChain-ui/PC/common-mixin/home/home/home.styl';
import Card from '@/components/fuzionx/card/Card.vue';
import Switch from '@/components/fuzionx/switch/Switch.vue';
import Intro from './intro.vue';
import Recommend from './recommend.vue';
import Market from './market.vue';
import Apps from './apps.vue';
import Contact from './contact.vue';
import Steps from './steps.vue';
import Join from './join.vue';
import Learn from './learn.vue';
import CreditCard from './creditCard.vue';
import SocialList from './socialList.vue';

export default {
  mixins: [commonMixin],
  components: {
    Intro,
    Card,
    Recommend,
    Market,
    Apps,
    Steps,
    Contact,
    Join,
    Learn,
    SocialList,
    CreditCard,
    FuzSwitch: Switch,
  },
  created() {
    this.init();
  },
  methods: {
    onChange() {
      window.location.href = 'https://defi.fuzionx.io/';
    },
  },
};
</script>
<style lang="stylus" scoped>
.fuzionx-home {
  margin: 0 auto;
  background: url('../../../assets/fuzionx/images/home/img-left.png') no-repeat 0 1300px,
  url('../../../assets/fuzionx/images/home/half-sphere.png') calc(100% - 200px) 1150px no-repeat;
  background-size: 300px auto, 400px auto;
}
.with-line {
  border-top:1px solid #35363F;
  border-bottom: 1px solid #35363F;
}
.max-width {
  max-width: 1280px;
  margin-left: auto;
  margin-right:auto;
}
.page-section {
  margin-top:40px;
  margin-bottom:160px;
}
</style>
