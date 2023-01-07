<!-- 币币交易 实时成交 -->
<template>
    <div class="order-list-box a-6-bg" :class="{'isLogin': isLogin}">
      <div class="tab-box b-2-cl a-4-bg">
        <span
          class="tab-item"
          v-for="(item, index) in tabTypeItem"
          :key="index + 'tab'"
          @click="switchType(item.value + 1, index)"
          @mouseover="hoverType = item.value"
          @mouseout="hoverType = null"
          :class="{
            'selected b-1-cl': orderType === item.value + 1,
            'b-1-cl': hoverType === item.value}">
            {{item.title}}
        </span>
        <span
          class="tab-underline a-12-bg"
          :style="tabLineStyle"
        ></span>
        <span
          v-if="orderType === 6 || orderType === 8"
          class="all-order-btn b-2-cl"
          @click="hideMinAssets">
          <c-checkBox :value="isHideMinAssets" />
          <!-- 全部订单 -->
          {{ $t("assets.hideMinAssets") }}
        </span>
        <span
          v-else-if="orderType !== 3 && orderType !== 4"
          class="all-order-btn b-2-cl"
          @click="showCurSymbol">
          <c-checkBox :value="isShowCurSymbol" />
          <!-- 全部订单 -->
          {{$t('trade5.curSymbol')}}
        </span>
      </div>
          <!-- 正在执行 -->
          <!-- 已完成 -->
      <!-- <div class="order_type a-3-bd b-2-cl a-5-bg" v-if="orderType === 3">
        <div class="order_type_btn"
        :class="filterGridStatus === 1 ? 'u-8-bd u-8-cl' : 'a-3-bd'"
         @click="() => {this.filterGridStatus = 1;this.getData()}">
          {{$t('gridTrade.orderType1')}}
        </div>
        <div class="order_type_btn"
        :class="filterGridStatus === 0 ? 'u-8-bd u-8-cl' : 'a-3-bd'"
         @click="() => {this.filterGridStatus = 0;this.getData()}">
          {{$t('gridTrade.orderType2')}}
        </div>
      </div> -->
      <div v-if="showSearch" class="search-form">
        <ul class="time-conv">
          <li
            v-for="(item, index) in dateList"
            :key="'date'+index"
            :class="{'a-5-bg b-1-cl': index === dateSelectIndex || index === dateHoverIndex}"
            @mouseover="dateHoverIndex = index"
            @mouseleave="dateHoverIndex = null"
            @click="selectDate(item, index)"
          >{{item.label}}</li>
        </ul>
        <div class="date-area a-5-bg">
          <c-calendar
            class="date-selecter"
            width="100px"
            name="start-time"
            :value="startTime"
            :futureDayHide="endTimeNum"
            :placeholder="'YYYY-MM-DD'"
            @onChanges="setStartTime"
            inputLineStyle="c-1-bd"
            dateInfoTilteClass="f-8-cl"
          />
          <span>—</span>
          <c-calendar
            class="date-selecter"
            width="100px"
            name="end-time"
            :value="endTime"
            :agoDayHide="startTimeNum"
            :placeholder="'YYYY-MM-DD'"
            @onChanges="setEndTime"
            inputLineStyle="c-1-bd"
            dateInfoTilteClass="f-8-cl"
          />
        </div>
        <div class="search-btn b-2-cl">
          <button
            class="a-5-bg"
            :class="{'b-1-cl': isHover, 'b-2-cl': !isHover}"
            @click="searchData"
            @mouseover="isHover=true"
            @mouseout="isHover=false"
          >{{$t('trade5.orderList.search')}}</button>
        </div>
      </div>
      <div
        v-if="isLogin"
        class="order-conent a-6-bg"
      >
        <vue-scroll>
          <div
            v-if="orderType !== 6"
            :class="{'historyOrder': orderType === 2}">
            <c-table
              :columns = 'columns'
              :imgMap="imgMap"
              :colorMap="colorMap"
              :dataList = 'dataList'
              :loading = 'false'
              :headHeight="40"
              :cellHeight="40"
              @elementClick = "elementClick"
              :lineNumber="8"
              :classes="'a-6-bg'"
              @sortOnChange="revokeAll"
              :lineClassesHover="'a-4-bg'"
            />
            <c-pagination
              v-show="(pagination.count/pagination.pageSize) > 1"
              :total="pagination.count"
              classes="a-6-bg"
              :current-page='pagination.page'
              :display='pagination.pageSize'
              @pagechange="pagechange">
            </c-pagination>
          </div>
          <div v-else :class="{'hide-smaill-account':isHideMinAssets}">
            <c-table
              :loading = 'false'
              :imgMap="imgMap"
              :headHeight="40"
              :cellHeight='40'
              :colorMap="colorMap"
              :columns="columns"
              :dataList="dataList"
              :lineNumber="8"
              :classes="'a-6-bg'"
              :lineClassesHover="'a-4-bg'"
            />
            <c-pagination
              v-show="paginationObj.total > paginationObj.display"
              :total="paginationObj.total"
              :display="paginationObj.display"
              :currentPage="paginationObj.currentPage"
              @pagechange="assetsPagechange"
            />
          </div>
        </vue-scroll>
      </div>
      <div v-else class="isNotLogin a-6-bg">
        <p class="b-1-cl">
          {{$t('orderList.tstext1')}}
          <span class="b-4-cl" @click="toLogin('login')">{{$t('login.login')}}</span>
          {{$t('trade5.or')}}
          <span class="b-4-cl" @click="toLogin('register')">{{$t('login.goRegister')}}</span>
          {{$t('trade5.trade')}}
        </p>
      </div>
      <div
        class="notData a-6-bg"
        :class="{'hasSearch': orderType === 5}"
        v-if="!dataList.length && isLogin">
        <svg class="icon icon-50" aria-hidden="true">
          <use xlink:href="#icon-g_2"></use>
        </svg>
        <p>
          <!-- 暂无数据 -->
          {{$t('common.notData')}}
        </p>
      </div>
      <grid-dialog
       :dataId="gridItemId"
       :type="filterGridStatus"
       :fixValue="fixValue"
        :gridShowFlag="gridDoliog" @gridDialogClose="gridClose"></grid-dialog>
        <!-- 未认证 提示框 -->
      <c-alert :showFlag="gridCancelDoliog"
          :buttonText="$t('application.confirm')"
          :imgMap="imgMap"
          @close="() => this.gridCancelDoliog = false"
          :btnEventFlag="true"
          @confirm="gridCancelEvent">
          <div class="tip_title b-1-cl">
            <!-- 交易须知 -->
            {{$t('gridTrade.tip')}}
          </div>
          <!-- 终止网格后，会撤消所有未成交订单，确定要终止此网格交易？ -->
          <p class="tip_text">{{$t('gridTrade.tipContent')}}</p>
      </c-alert>
      <c-dialog
        :showFlag="revokeFlag"
        @close="cancelRevoke"
        @confirm="confirmRevoke"
      >
        <div class="b-1-cl">{{$t('trade5.orderList.revokeAll')}}</div>
      </c-dialog>
    </div>
</template>
<script>
import mixin from 'BlockChain-ui/PC/common-mixin/modules/newTrade/orderList/orderList';
import 'BlockChain-ui/PC/common-mixin/modules/newTrade/orderList/orderList.styl';
import GridDialog from '../gridDialog/GridDialog.vue';

export default {
  mixins: [mixin],
  mounted() {
    this.init();
  },
  components: {
    GridDialog,
  },
  // 组价离开前执行
  beforeDestroy() {
    clearInterval(this.getDataInter);
  },
};
</script>

<style lang="stylus">
  .order_type {
    display flex;
    align-items center;
    padding 6px 26px;
        border-bottom-width: 1px;
    border-bottom-style: solid;
  }
  .tip_title {
    line-height 16px;
    margin-bottom 15px;
  }
  .tip_text {
    font-size 12px;
    line-height 18px;
  }
  .order_type_btn {
    box-sizing border-box;
    border-width: 1px;
    border-style: solid;
    padding 4px 20px;
    cursor pointer;
    font-size 12px;
    line-height 14px;
  }
  .order_type_btn:nth-child(1) {
    // border-right none;
  }
  .order_list-top .notData {
    top 107px;
  }
  .table-body td .grid_btn {
    margin-left 0;
  }
  .pro-trade .order-list-box .gridOrder {
    min-height 218px;
  }
  .Int-trade .order-list-box .order-conent.order-content_height {
    height 313px;
    .table-body {
      min-height 280px;
    }
  }
  .pro-trade .order-list-box .order-conent.pro-trade-order {
    height 250px;
  }
</style>
