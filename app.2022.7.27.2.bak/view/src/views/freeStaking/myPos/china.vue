<template>
  <div class="pos-history fuz-card" v-if="pageData">
    <div class="pos-history-title f-1-cl">{{pageData.tipMine}}</div>
    <div class="nav-tab fuz-card-tab">
      <c-navTab
        minWidth="120px"
        activeClassName="f-1-cl"
        activeColor="c-8-bg"
        class="c-5-bd"
        :currentTab="currentType"
        :navTab="navTabList"
        lineHeight="55"
        @currentType="selectType"
      />
      <div class="clearfix"></div>
    </div>
    <div class="date-select-cont">
      <c-calendar
        v-if="startTime"
        class="date-selecter"
        width="120px"
        name="start-time"
        :value="startTime"
        :futureDayHide="endTimeNum"
        :promptText="startTimeText"
        @onChanges="setStartTime"
        inputLineStyle="c-1-bd"
        :showDateInfo="true"
        dateInfoTilteClass="f-8-cl"
      />
      <c-calendar
        v-if="endTime"
        class="date-selecter"
        width="120px"
        name="end-time"
        :value="endTime"
        :agoDayHide="startTimeNum"
        :promptText="endTimeText"
        @onChanges="setEndTime"
        inputLineStyle="c-1-bd"
        :showDateInfo="true"
        dateInfoTilteClass="f-8-cl"
      />
      <div class="clearfix"></div>
    </div>
    <div class="date-table-cont">
      <c-table
        :imgMap="imgMap"
        :colorMap="colorMap"
        class=""
        :loading="loading"
        :columns="columns"
        :dataList="posData"
        :subColumns="subColumns"
        :subContent="subTableData"
        :subContentId="subTableDataId"
        @elementClick="tableClick"
        @subElementClick="subTableClick"
        subClass="c-5-bg"
      />
      <c-pagination
        v-if="paginationData.total > paginationData.display"
        class="fuz-bg"
        :total="paginationData.total"
        :display="paginationData.display"
        :currentPage="paginationData.currentPage"
        @pagechange="pagechange"
      />
    </div>
  </div>
</template>
<script>
import mixin from 'BlockChain-ui/PC/common-mixin/freeStaking/myPos/myPos';
import 'BlockChain-ui/PC/common-mixin/freeStaking/myPos/myPos.styl';

export default {
  mixins: [mixin],
  mounted() {
    this.init();
  },
};
</script>
<style scoped>
.pagination{
  background: transparent !important;
}
.pagination >>> .pagination-bar {
  border: none;
}
</style>
