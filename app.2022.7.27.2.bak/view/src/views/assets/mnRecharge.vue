<template>
  <section class="page-mnRecharge">
    <header class="mnRecharge-header b-1-cl a-3-bd">{{ $t('assets.recharge.recharge') }}</header>
    <div class="mnRecharge-details clearfix a-7-bd">
      <div class="details-left">
        <!-- 充值 -->
        <div class="symbol b-1-cl">{{showSymbol}}</div>
        <div class="numberList clearfix">
          <ul class="numberList-key">
            <!-- 余额 -->
            <li>{{ $t('assets.recharge.quota') }}</li>
          </ul>
          <ul class="numberList-value b-1-cl">
            <li>{{ quota | fixDFn(that) }}</li>
          </ul>
        </div>
        <div class="details-warking b-7-cl clearfix">
          <span class="wicon">
          <svg class="icon icon-16" aria-hidden="true" style="marginRight: 10px">
            <use xlink:href="#icon-c_2"></use>
          </svg>
          </span>
          <span class="text">
            <!-- 备注提示 -->
            {{ rechargeRemark }}
          </span>
        </div>
        <div class="my-message a-4-bg">
          <span class="title">{{$t('assets.recharge.myInfo')}}</span>
          <input readonly ref="myInfo" :value="myInfo" class="b-1-cl" />
          <span class="copy" @click="copy('myInfo')">
            <svg class="icon icon-14 hoverHide" aria-hidden="true">
              <use xlink:href="#icon-a_9"></use>
            </svg>
            <svg class="icon icon-14 hoverShow" aria-hidden="true">
              <use xlink:href="#icon-a_9_1"></use>
            </svg>
          </span>
        </div>
      </div>
      <div class="details-right">
        <div class="select-bank">
          <c-newSelect
            :promptText="$t('assets.recharge.selectBank')"
            type="img"
            :value="bank"
            :options="bankList"
            @onChanges="bankChange"/>
        </div>
        <ul class="company-info" v-if="bankInfo">
          <li class="company-name a-4-bg b-1-cl">
            <input
              readonly
              :value="bankInfo.bankAccount"
              ref="companyName"
              type="text"
              class="b-1-cl">
            <span class="copy" @click="copy('companyName')">
              <svg class="icon icon-14 hoverHide" aria-hidden="true">
                <use xlink:href="#icon-a_9"></use>
              </svg>
              <svg class="icon icon-14 hoverShow" aria-hidden="true">
                <use xlink:href="#icon-a_9_1"></use>
              </svg>
            </span>
          </li>
          <li class="company-id a-4-bg b-1-cl">
            <input
              readonly
              :value="bankInfo.bankCardNumber"
              ref="companyId"
              type="text"
              class="b-1-cl">
            <span class="copy" @click="copy('companyId')">
              <svg class="icon icon-14 hoverHide" aria-hidden="true">
                <use xlink:href="#icon-a_9"></use>
              </svg>
              <svg class="icon icon-14 hoverShow" aria-hidden="true">
                <use xlink:href="#icon-a_9_1"></use>
              </svg>
            </span>
          </li>
        </ul>
        <div class="recharge-amount">
          <c-inputLine
            name="amount"
            :fixValue="showPrecision"
            inputType="num"
            :promptText="$t('assets.recharge.RechargeVolume')"
            :value="amount"
            @onchanges="inputChange"
          ></c-inputLine>
        </div>
        <div class="recharge-fee">
          <c-inputLine
            v-if="isFeeShow"
            name="fee"
            :promptText="$t('assets.withdraw.fee')"
            :value="fee"
            :disabled="true"
          ></c-inputLine>
        </div>
        <c-button
          width="120px"
          marginTop="24px"
          height="40px"
          @click="confirm"
          :disabled="btnDisabled">{{ $t('assets.recharge.confirm') }}</c-button>
      </div>
    </div>
    <!-- 最近充值记录 -->
    <header class="mnRecharge-header b-1-cl a-3-bd">
      {{ $t('assets.recharge.RecentRechargeRecord') }}
    </header>
    <div class="mnRecharge-table">
      <c-table
        :imgMap="imgMap"
        :colorMap="colorMap"
        :loading="tabelLoading"
        :columns="columns"
        :dataList="tabelList"
        @elementClick="tableClick"
      />
      <c-pagination v-if="paginationObj.total > paginationObj.display"
        :total='paginationObj.total'
        :display='paginationObj.display'
        :currentPage='paginationObj.currentPage'
        @pagechange="pagechange"/>
    </div>
    <!-- 充值提醒 -->
    <c-dialog
      :showFlag="alertFlag"
      paddingBottom="14px"
      @close="alertClose"
      @confirm="confirmRecharge"
      :titleText="$t('personal.leaglTenderSet.dlalogText')">
      {{ $t('assets.recharge.rechargeTip') }}
    </c-dialog>
    <!-- 信息确认 -->
    <c-popup
      :showFlag="isShowInfoDialog"
      :titleText="infoDialogTitle"
      :closeText="dialogCloseText"
      :confirmText="dialogConfirmText"
      :showCancel="!!dialogCloseText"
      paddingBottom="24px"
      paddingTop="0"
      :confirmDisabled="dialogConfirmDisabled"
      @close="dialogClose"
      @cancel="dialogCancel"
      @confirm="dialogConfirm">
      <div class="order-status" :class="orderStatusText.class">
        <img v-if="orderStatusText.icon" :src="orderStatusText.icon" alt="">
        {{orderStatusText.title}}
      </div>
      <ul class="order-detail" v-if="orderInfo">
        <li
          class="detail-item a-4-bg"
          v-for="(item, index) in orderDetailRow"
          :key="index"
          v-show="item.show">
          <span class="detail-key b-2-cl">{{item.title}}</span>
          <span class="detail-value b-1-cl">
            <span class="text" v-if="item.key === 'ctime'">{{ orderInfo.ctime | formatTime }}</span>
            <input
              v-else
              class="text b-1-cl"
              type="text"
              :ref="item.key" readonly
              :value="orderInfo[item.key]"
            >
            <span v-if="item.hasSymbol">{{orderInfo.symbolName}}</span>
            <i v-if="item.copy" class="copy" @click="copy(item.key)">
              <svg class="icon icon-14 hoverHide" aria-hidden="true">
                <use xlink:href="#icon-a_9"></use>
              </svg>
              <svg class="icon icon-14 hoverShow" aria-hidden="true">
                <use xlink:href="#icon-a_9_1"></use>
              </svg>
            </i>
          </span>
        </li>
      </ul>
      <div v-if="orderStatus === 0" class="refuseReason-tip b-7-cl">
        {{ $t('assets.recharge.orderTip') }}
      </div>
      <div v-if="orderStatus === 3" class="refuseReason-tip b-7-cl">
        {{ orderInfo.checkDesc }}
      </div>
    </c-popup>
  </section>
</template>
<script>
import mixin from 'BlockChain-ui/PC/common-mixin/assets/mnRecharge/index';
import 'BlockChain-ui/PC/common-mixin/assets/mnRecharge/index.styl';

export default {
  mixins: [mixin],
  mounted() {
    this.init();
  },
};
</script>
