<template>
  <section class="v5-page-thirdOrder fuz-card">
    <div class="thirdOrder-nav fuz-card-tab">
      <c-v5-navTab
        activeClassName="v5-5-cl"
        activeColor="v5-1-bg"
        className="v5-6-cl v5-12-bd"
        :currentTab="nowType"
        :navTab="navTab"
        lineHeight="60"
        @currentType="currentType"
      />
        <!-- 显示已撤单 -->
      <!-- <div class="otcOrder-nav-switchs" v-if="nowType === 2">

        <c-switch
          :value="switchFlag"
          @click="switchChange"/><span class="text">{{ $t('order.otcOrder.haveCancel') }}</span>
      </div> -->
    </div>
    <div class="thirdOrder-options">

        <div class="search-box">
          <c-v5-select
              :value="status"
              :options="statusList"
              :errorHave="true"
              width="160px"
              inputHeight="32px"
              @onChanges="statusChange"/>
        </div>
        <div class="search-box">
        <c-v5-select
            :value="symbol"
            :options="symbolList"
            :errorHave="true"
            width="160px"
            inputHeight="32px"
            @onChanges="symbolChange"/>
      </div>
      <div class="search-box">
        <c-v5-select
          :value="way"
          :options="wayList"
          :errorHave="true"
          width="160px"
          inputHeight="32px"
          @onChanges="wayChange"/>
      </div>


      <div  class="search-box">
        <c-v5-calendar
          :value="startTime"
          class="date-selecter"
          width="150px"
          inputHeight="32px"
          name="startTime"
          :placeholder="$t('profitAndLoss.startTime')"
          :agoDayHide="startAgoDayHide"
          :futureDayHide="startFutureDayHide"
          @onSelect="dateChange"
        />
        <span class="line v5-12-cl">—</span>
        <c-v5-calendar
          :value="endTime"
          class="date-selecter"
          width="150px"
          inputHeight="32px"
          name="endTime"
          :placeholder="$t('profitAndLoss.endTime')"
          :agoDayHide="endAgoDayHide"
          :futureDayHide="endFutureDayHide"
          @onSelect="dateChange"
        />
      </div>
    </div>
     <div class="thirdOrder-table">
      <c-table
        :imgMap="imgMap"
        :colorMap="colorMap"
        :loading="tabelLoading"
        :columns="columns"
        :dataList="tabelList"
        @elementClick="tableClick"
        :classes="'v5-10-bg v5-table'"
        :lineClassesHover="'v5-9-bg'"
        :lineClasses ="'v5-12-bd'"
        :cellHeight = '60'
        :headHeight = '0'
      />
      <c-v5-pagination v-if="paginationObj.total > paginationObj.display"
        :total='paginationObj.total'
        :display='paginationObj.display'
        :currentPage='paginationObj.currentPage'
        @pagechange="pagechange"/>
    </div>
  </section>
</template>
<script>
import mixin from 'BlockChain-ui/PC/common-mixin/newOrder/thirdOrder/thirdOrder';
import 'BlockChain-ui/PC/common-mixin/newOrder/thirdOrder/thirdOrder.styl';

export default {
  mixins: [mixin],
  mounted() {
    this.init();
  },
};
</script>
<style scoped>
.thirdOrder-table >>> .table-head {
    border-bottom: 1px solid rgba(198, 192, 199, 0.1) !important;
}
.v5-page-thirdOrder >>> .date-selecter.common-select .input_line_inp {
  transform: translateY(7px);
}
.v5-page-thirdOrder >>> .date-selecter.common-select .select-options-box {
  transform: translateY(17px);
}
</style>
