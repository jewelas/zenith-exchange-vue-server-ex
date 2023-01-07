<template>
  <div class="broker-system">
    <div class=" a-3-bd clearfix">
      <div class="date-select-cont clearfix">
        <c-inputLine
          class="date-selecter input"
          maxLength="8"
          name="uid"
          promptText="UID"
          :errorHave="true"
          :errorText="$t('login.formatIncorrect')"
          marginTop="0px"
          :value="uid"
          @onchanges="inputChanges"
          :isLogin="true"
        />
        <!-- <c-inputLine
          class="date-selecter input"
          maxLength="6"
          name="pid"
          promptText="上级UID"
          :errorHave="true"
          :errorText="$t('login.formatIncorrect')"
          marginTop="0px"
          :value="pid"
          @onchanges="inputChanges"
          :isLogin="true"
        /> -->
        <c-select :promptText="$t('brokerSystemList.text18')"
          class="date-selecter"
          :value="symbol"
          :options="symbolList"
          :errorHave="true"
          width="160px"
          :filterable="true"
          @onChanges="setSelect"/>
        <c-calendar
          class="date-selecter"
          width="120px"
          name="start-time"
          :value="startTime"
          :agoDayHide="startAgoDayHide"
          :futureDayHide="startFutureDayHide"
          :clearable="true"
          :promptText="startTimeText"
          @onSelect="setStartTime"
          inputLineStyle="c-1-bd"
          dateInfoTilteClass="f-8-cl"
        />
        <c-calendar
          class="date-selecter"
          width="120px"
          name="end-time"
          :value="endTime"
          :agoDayHide="endAgoDayHide"
          :futureDayHide="endFutureDayHide"
          :clearable="true"
          :promptText="endTimeText"
          @onSelect="setEndTime"
          inputLineStyle="c-1-bd"
          dateInfoTilteClass="f-8-cl"
        />

        <!-- <c-select :promptText="$t('brokerSystem.lowerTable1[1]')"
          class="date-selecter"
          :value="lowerType"
          :options="lowerTypeList"
          :errorHave="true"
          width="100px"
          @onChanges="setSelect"/>
        <c-select :promptText="$t('brokerSystem.lowerTable[4]')"
          class="date-selecter"
          :value="type"
          :options="typeList"
          :errorHave="true"
          width="100px"
          @onChanges="setSelect"/> -->
      </div>
      <div style='overflow:hidden'>
        <vue-scroll  :ops="ops" class="vuescrollBox">
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
        </vue-scroll>
      </div>

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
  </div>
</template>

<script>
import mixin from 'BlockChain-ui/PC/common-mixin/personal/newBrokerSystemList/positionList/positionList';
import 'BlockChain-ui/PC/common-mixin/personal/newBrokerSystemList/positionList/positionList.styl';

export default {
  mixins: [mixin],
  mounted() {
    this.init();
  },
  components: {
  },
};
</script>
