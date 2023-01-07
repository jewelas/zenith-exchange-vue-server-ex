<template>
  <div class="broker-system">
    <div class="date-select-cont clearfix">
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
      <c-inputLine
        class="date-selecter input"
        maxLength="20"
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
        maxLength="20"
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
          v-if="(listPage.count/listPage.pageSize) > 1"
          :total="listPage.count"
          :current-page="listPage.page"
          :display="pageSize"
          classes="a-5-bg"
          @pagechange="pagechange"
        />
      </div>
    </div>
  </div>
</template>

<script>
import mixin from 'BlockChain-ui/PC/common-mixin/personal/brokerSystem/lowerInfo/lowerInfo';
import 'BlockChain-ui/PC/common-mixin/personal/brokerSystem/lowerInfo/lowerInfo.styl';

export default {
  mixins: [mixin],
  mounted() {
    this.init();
  },
};
</script>
