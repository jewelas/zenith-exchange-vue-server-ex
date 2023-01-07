<template>
  <div class="orderList">
    <!-- <c-pageBanner
      :title="bannerTitle"
      :backgroungImgUrl="bannerImg"
      :imgMap="imgMap"
    ></c-pageBanner> -->
    <div class="orderListCon fuz-card">
      <div class="orderListTop fuz-card-title">
        {{$t('manageFinances.record')}}
      </div>
        <div class="orderListCon-options">
          <!-- 币种 -->
          <c-select :promptText="$t('assets.flowingWater.coin')"
            :value="symbol"
            :options="symbolList"
            :errorHave="true"
            width="120px"
            :filterable="true"
            @onChanges="symbolChange"/>
          <!-- 类型 -->
          <c-select
            :promptText="$t('assets.flowingWater.type')"
            :value="otherType"
            :options="otherTypeList"
            :errorHave="true"
            width="150px"
            @onChanges="otherTypeChange"/>
        </div>
        <div class="orderListCon-table">
          <c-table
            :imgMap="imgMap"
            :colorMap="colorMap"
            :cellHeight='55'
            :loading="tabelLoading"
            :subContent = 'subTableData'
            :subContentId = 'subTableDataId'
            :subColumns = 'subColumns'
            :columns="columns"
            :dataList="tabelList"
            classes="c-4-bg"
            @elementClick="tableClick"
          />
          <c-pagination v-if="paginationObj.total > paginationObj.display"
            :total='paginationObj.total'
            :display='paginationObj.display'
            :class="['c-4-bg']"
            :currentPage='paginationObj.currentPage'
            @pagechange="pagechange"/>
        </div>
    </div>
  </div>

</template>
<script>
import mixin from 'BlockChain-ui/PC/common-mixin/manageFinances/orderList/orderList';
import 'BlockChain-ui/PC/common-mixin/manageFinances/orderList/orderList.styl';

export default {
  mixins: [mixin],
  created() {

  },
};
</script>
<style scoped>
.orderListCon {
  width: 1280px;
}
</style>
