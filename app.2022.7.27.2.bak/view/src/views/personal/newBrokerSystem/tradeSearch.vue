<template>
  <div class="broker-system">
    <p
      class="user-management-child-header b-1-cl a-3-bd"
    >{{$t('brokerSystem.tradeSearchNavTab[0]')}}</p>
    <div class="date-select-cont clearfix">
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
        dateInfoTilteClass="f-8-cl"
      />
      <c-select
        :promptText="$t('brokerSystem.otherText[1]')"
        class="date-selecter"
        :value="coinType"
        :options="coinTypeList"
        :errorHave="true"
        width="100px"
        :filterable="true"
        @onChanges="setSelect"
      />
      <c-inputLine
        class="date-selecter input"
        maxlength="20"
        name="uidValue"
        :promptText="$t('brokerSystem.lowerTable[1]')"
        :errorHave="true"
        :errorText="$t('login.formatIncorrect')"
        marginTop="0px"
        :value="uidValue"
        inputType="text"
        @onchanges="inputChanges"
        :isLogin="true"
      />
      <c-inputLine
        class="date-selecter input"
        maxlength="20"
        name="phoneValue"
        :promptText="$t('brokerSystem.lowerTable[2]')"
        :errorHave="true"
        :errorText="$t('login.formatIncorrect')"
        marginTop="0px"
        :value="phoneValue"
        inputType="text"
        @onchanges="inputChanges"
        :isLogin="true"
      />
    </div>
    <c-table
      :imgMap="imgMap"
      :colorMap="colorMap"
      :loading="loading"
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
    <div class="pagination">
      <div>
        <c-pagination
          v-if="(count/pageSize) > 1"
          :total="count"
          :current-page="page"
          :display="pageSize"
          classes="a-5-bg"
          @pagechange="pagechange"
        />
      </div>
    </div>
  </div>
</template>

<script>
import mixin from 'BlockChain-ui/PC/common-mixin/personal/newBrokerSystem/tradeSearch/tradeSearch';
import 'BlockChain-ui/PC/common-mixin/personal/newBrokerSystem/tradeSearch/tradeSearch.styl';

export default {
  mixins: [mixin],
  mounted() {
    this.init();
  },
};
</script>
