<template>
  <div class="ex-broker">
    <div class="mining-tit f-2-cl c-5-bd">
      <span
        class="item"
        :class="{'selected c-8-bd f-1-cl' : tableType === item.key}"
        v-for="(item, index) in tabList"
        :key = "index"
        @click="switcherType(item.key)">{{item.text}}</span>
      <div class="search">
        <!-- 导出文档 -->
        <!-- <c-buttons
          class="button"
          type = "text"
          marginTop= "2px"
          @click = "exportWord">
          {{$t('broker.export')}}
        </c-buttons> -->
      </div>
    </div>
     <div class="broker-user-info a-7-bd clearfix">
       <div class="user-left">
         <!-- 用户名称 -->
        <div class="user-name">
          <div class="top b-2-cl">{{$t('assets.coAccount.accountRight')}}</div>
          <div class="phone b-1-cl">{{vuserName}}</div>
        </div>
        <!-- 推广助手 -->
        <!-- <c-button
          class="invite-help b-4-cl"
          type="text">
          {{$t('brokerSystem.navTab[4]')}}
        </c-button> -->
       </div>
        <div class="user-right">
          <div class="user-box">
            <!-- 邀请总人数 -->
            <div class="user-text a-4-bg">
              <span class="title b-2-cl">{{$t('broker.invitations')}}</span>
              <span class="info b-1-cl">{{ userCount }}</span>
            </div>
            <!-- 累计返佣 -->
            <div class="user-text a-4-bg">
              <span class="title b-2-cl">{{$t('broker.revenue')}}</span>
              <span class="info b-1-cl">
                {{fixDFun(allBonusAmount, allBonusCoin)}}
                <span
                  style="font-size: 12px"
                >{{allBonusCoin | getCoinShowName(coinList)}}</span>
              </span>
            </div>
          </div>
          <div>
          <div class="user-box">
            <!-- 我的角色 -->
            <div class="user-text a-4-bg" v-if="username">
              <span class="title b-2-cl">{{$t('broker.myType')}}</span>
              <span class="info b-1-cl">{{ username }}</span>
            </div>
            <!-- 直接邀请人数 -->
            <div class="user-text a-4-bg" v-if="isDiractShow">
              <span class="title b-2-cl">{{$t('broker.indirect')}}</span>
              <span class="info b-1-cl">
                 {{indirect}}
              </span>
            </div>
            </div>
          </div>
        </div>
    </div>
    <div class="warp main-content">
      <div class="mining-data">

        <div class="filter-box e-2-cl d-5-bd">
          <!-- 币种 -->
          <c-select
            :value="coinValue"
            :promptText="symbolType"
            width = "120px"
            name= "coinValue"
            :options="coinOPtion"
            :filterable="true"
            @onChanges = "selectOnChange"
          />
          <!-- 日期 -->
          <c-calendar
            v-if="tableType === 'agent_account'"
            width = "120px"
            name = "calendar"
            :value = "calendarData"
            :promptText="timeText"
            @onChanges = "onChangeCalendar"
          />
          <!-- 类型 -->
          <c-select
            :value="typeValue"
            :promptText="type"
            width = "120px"
            name= "typeValue"
            :options="typeOption"
            @onChanges = "selectOnChange"
          />
          <!-- 搜索输入框 -->
          <c-inputLine
            v-if="typeValue"
            name='searchValue'
            :value="searchValue"
            width="200px"
            :promptText="promptText"
            :errorHave="errorHave"
            @onchanges="inputLineChange">
          </c-inputLine>
        </div>
        <c-table
          :imgMap="imgMap"
          :colorMap="colorMap"
          :columns = 'columns'
          :dataList = 'dataList'
          :loading = 'tableLoading'
          :bodyClasses = 'bodyClasses'
          :headClasses = 'headClasses'
          @elementClick = "goViewPage"
        />
      </div>
      <c-pagination v-if="(pagination.count/pagination.pageSize) > 1"
                    :total="pagination.count"
                    classes="c-4-bg"
                    :current-page='pagination.page'
                    :display='pagination.pageSize'
                    @pagechange="pagechange">
      </c-pagination>
    </div>


  </div>
</template>
<script>
import mixin from 'BlockChain-ui/PC/common-mixin/personal/broker/broker/broker';
import 'BlockChain-ui/PC/common-mixin/personal/broker/broker/broker.styl';

export default {
  mixins: [mixin],
  mounted() {
    this.init();
  },
};
</script>
