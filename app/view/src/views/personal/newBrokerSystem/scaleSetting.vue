<template>
  <div class="broker-system">
    <c-table
      :imgMap="imgMap"
      :colorMap="colorMap"
      :loading="loading1"
      :classes="classes"
      :headClasses="headClasses"
      :bodyClasses="bodyClasses"
      :lineClasses="lineClass"
      :columns="columns"
      :dataList="dataList"
      :lineNumber="lineNumber"
      :cellHeight="cellHeight"
      :headHeight="headHeight"
       @elementClick = 'tableClick'
    />
    <div class="pagination">
      <div >
        <c-pagination
          v-if="(list1Page.count/list1Page.pageSize) > 1"
          :total="list1Page.count"
          :current-page="list1Page.page"
          :display="list1Page.pageSize"
          classes="a-5-bg"
          @pagechange="pagechange1"
        />
      </div>
    </div>
  </div>
</template>

<script>
import mixin from 'BlockChain-ui/PC/common-mixin/personal/newBrokerSystem/scaleSetting/scaleSetting';
import 'BlockChain-ui/PC/common-mixin/personal/newBrokerSystem/scaleSetting/scaleSetting.styl';

export default {
  mixins: [mixin],
};
</script>
