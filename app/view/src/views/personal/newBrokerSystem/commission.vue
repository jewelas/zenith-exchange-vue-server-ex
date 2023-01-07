<template>
  <div class="broker-system">
    <div class="broker-system-header fuz-card-tab">
      <c-navTab
        activeClassName="b-1-cl"
        activeColor="a-12-bg"
        class="b-2-cl"
        :currentTab="currentTab"
        :navTab="navTab"
        :lineHeight="lineHeight"
        :marginRight="marginRight"
        @currentType="currentType"
      />
      <div class="update-time b-2-cl">{{$t('brokerSystem.updateTime')}}</div>
    </div>
    <div class="date-select-cont clearfix" v-if="currentTab === 2">
      <c-calendar
        v-if="startTime"
        class="date-selecter"
        width="120px"
        name="start-time"
        :value="startTime"
        :futureDayHide="endTimeNum"
        :promptText="startTimeText"
        @onSelect="startTimeSelect"
        inputLineStyle="c-1-bd"
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
        @onSelect="endTimeSelect"
        inputLineStyle="c-1-bd"
        dateInfoTilteClass="f-8-cl"
      />
      <c-select :promptText="$t('brokerSystem.otherText[0]')"
        class="date-selecter"
        :value="coin"
        :options="coinList"
        :errorHave="true"
        width="120px"
        :filterable="true"
        @onChanges="coinChange"/>
    </div>
    <c-table
      :imgMap="imgMap"
      :colorMap="colorMap"
      v-if="currentTab === 1"
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
    />
    <c-table
      :imgMap="imgMap"
      :colorMap="colorMap"
      v-if="currentTab === 2"
      :loading="loading2"
      :classes="classes"
      :headClasses="headClasses"
      :bodyClasses="bodyClasses"
      :lineClasses="lineClass"
      :columns="columns2"
      :dataList="dataList2"
      :lineNumber="lineNumber"
      :cellHeight="cellHeight"
      :headHeight="headHeight"
    />
    <div class="pagination">
      <div v-if="currentTab === 1">
        <c-pagination
          v-if="(list1Page.count/list1Page.pageSize) > 1"
          :total="list1Page.count"
          :current-page="list1Page.page"
          :display="list1Page.pageSize"
          classes="a-5-bg"
          @pagechange="pagechange1"
        />
      </div>
      <div v-if="currentTab === 2">
        <c-pagination
          v-if="(list2Page.count/list2Page.pageSize) > 1"
          :total="list2Page.count"
          :current-page="list2Page.page"
          :display="list2Page.pageSize"
          classes="a-5-bg"
          @pagechange="pagechange2"
        />
      </div>
    </div>
  </div>
</template>

<script>
import mixin from 'BlockChain-ui/PC/common-mixin/personal/newBrokerSystem/commission/commission';
import 'BlockChain-ui/PC/common-mixin/personal/newBrokerSystem/commission/commission.styl';

export default {
  mixins: [mixin],
};
</script>
