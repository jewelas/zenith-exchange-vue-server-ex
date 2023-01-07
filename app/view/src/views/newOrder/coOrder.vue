<template>
  <section class="page-otcOrder fuz-card">
    <div class="otcOrder-nav fuz-card-tab">
      <c-navTab
        activeClassName="b-1-cl"
        activeColor="a-12-bg"
        className="e-2-cl"
        :currentTab="nowType"
        :navTab="navTab"
        lineHeight="55"
        @currentType="currentType"
      />
      <div class="otcOrder-nav-switchs" v-if="nowType === 2">
        <!-- 显示已撤单 -->
        <c-switch
          :value="switchFlag"
          @click="switchChange"/><span class="text">{{ $t('order.otcOrder.haveCancel') }}</span>
      </div>
    </div>
    <div class="otcOrder-options">
      <!-- 类型 -->
      <c-select :promptText="$t('order.coOrder.type')"
        :value="side"
        :options="sideList"
        :errorHave="true"
        width="120px"
        @onChanges="sideChange"/>
      <!-- 合约 -->
      <c-select :promptText="$t('order.coOrder.contract')"
        :value="contract"
        :options="contractList"
        :errorHave="true"
        :filterable="true"
        width="330px"
        @onChanges="contractChange"/>
    </div>
     <div class="otcOrder-table">
      <c-table
        :imgMap="imgMap"
        :colorMap="colorMap"
        :loading="tabelLoading"
        :columns="columns"
        :dataList="tabelList"
        @elementClick="tableClick"
        :cellHeight='55'
      />
      <c-pagination v-if="paginationObj.total > paginationObj.display"
        :total='paginationObj.total'
        :display='paginationObj.display'
        :currentPage='paginationObj.currentPage'
        @pagechange="pagechange"/>
    </div>
  </section>
</template>
<script>
import mixin from 'BlockChain-ui/PC/common-mixin/order/coOrder/coOrder';
import 'BlockChain-ui/PC/common-mixin/order/coOrder/coOrder.styl';

export default {
  mixins: [mixin],
  mounted() {
    this.init();
  },
};

</script>
