<template>
  <div class="broker">
    <div class="top-content" :style="username? backgroundImg2 : backgroundImg">
      <div class="warp">
        <h2 class="page-title f-8-cl">
          <!-- 经纪人系统 -->
          {{$t('broker.broker')}}
        </h2>
        <div class="wk-info">
          <div class="item-box" :class="username ? 'userName' : ''" v-if="username">
            <div class="box-bar c-9-bd">
              <p class="name f-8-cl">
                {{username}}
              </p>
              <p class="txt f-9-cl">
                <!-- 我的角色 -->
                {{$t('broker.myType')}}
              </p>
            </div>
          </div>
          <div class="item-box item-box-left"
           :class="isDiractShow ? 'indireact' : ''" :style="username ? 'margin-left:0' : ''">
            <div class="box-bar c-9-bd">
              <p class="name f-8-cl">
                {{userCount}}
              </p>
              <p class="txt f-9-cl">
                <!-- 邀请总人数 -->
                {{$t('broker.invitations')}}
              </p>
            </div>
          </div>
          <div class="item-box" v-if="isDiractShow">
            <div class="box-bar c-9-bd">
              <p class="name f-8-cl">
                {{indirect}}
              </p>
              <p class="txt f-9-cl">
                {{$t('broker.indirect')}}
              </p>
            </div>
          </div>
          <div class="item-box">
            <div class="box-bar c-9-bd">
              <p class="name f-8-cl">
                {{fixDFun(allBonusAmount, allBonusCoin)}}
                <span class="dy">
                {{allBonusCoin | getCoinShowName(coinList)}}
              </span>
              </p>
              <p class="txt f-9-cl">
                <!-- 本月总收入 -->
                {{$t('broker.revenue')}}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="warp main-content">
      <div class="mining-data">
        <div class="mining-tit f-2-cl c-5-bd c-4-bg">
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
        <div class="filter-box e-2-cl d-5-bd c-4-bg">
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
import mixin from 'BlockChain-ui/PC/common-mixin/broker/broker/broker';
import 'BlockChain-ui/PC/common-mixin/broker/broker/broker.styl';

export default {
  mixins: [mixin],
  mounted() {
    this.init();
  },
};
</script>
