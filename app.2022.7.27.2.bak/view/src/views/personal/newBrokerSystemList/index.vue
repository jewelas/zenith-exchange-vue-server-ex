<template>
    <div class="broker-system fuz-card">
      <div class="broker-system-header fuz-card-tab">
        <c-navTab
          activeClassName="b-1-cl"
          activeColor="a-12-bg"
          className="b-2-cl"
          :currentTab="currentTab"
          :navTab="navTab"
          :lineHeight="lineHeight"
          :marginRight="marginRight"
          @currentType="currentType"
        />
      </div>

      <div class="broker-content">
        <RegisterList v-if="currentTab===1"/>
        <RechargeList v-if="currentTab===2"/>
        <TradeList v-if="currentTab===3"/>
        <PositionList v-if="currentTab===4"/>
        <OrderList v-if="currentTab===5"/>
      </div>
    </div>
</template>

<script>
import mixin from 'BlockChain-ui/PC/common-mixin/personal/newBrokerSystemList/index/index';
import 'BlockChain-ui/PC/common-mixin/personal/newBrokerSystemList/index/index.styl';
import RegisterList from './registerList.vue';
import RechargeList from './rechargeList.vue';
import TradeList from './tradeLists.vue';
import PositionList from './positionList.vue';
import OrderList from './orderList.vue';


export default {
  mixins: [mixin],
  mounted() {
    this.init();
  },
  components: {
    RegisterList,
    RechargeList,
    TradeList,
    PositionList,
    OrderList,
  },
};
</script>
