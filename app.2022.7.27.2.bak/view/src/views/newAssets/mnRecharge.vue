<template>
  <section class="v5-page-mnRecharge">
    <div class="mnRecharge-details clearfix v5-10-bg">
      <div class="details-left">
        <!-- 充值 -->
        <!-- <div class="symbol v5-5-cl">{{showSymbol}}</div> -->
          <c-v5-select
            width="340px"
            name="symbol"
            :imgMap="imgMap"
            :promptText="$t('assets.otcAccount.coin')"
            :options="rechargeCoinList"
            :filterable="true"
            :value="symbol"
            @onChanges="selectChange"></c-v5-select>
        <div class="numberList clearfix">
          <ul class="numberList-key v5-5-cl">
            <!-- 余额 -->
            <li v-if="isInr">{{ $t('assets.recharge.lumpSum') }}</li>
            <li v-else>{{ $t('assets.recharge.quota') }}</li>
          </ul>
          <ul class="numberList-value v5-5-cl">
            <li>{{ quota | fixDFn(that) }}</li>
          </ul>
        </div>
        <div v-if="rechargeRemark" class="details-warking b-7-cl clearfix">
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
        <!-- 我的信息 -->
        <div class="my-message v5-9-bg" v-if="!isInr && symbolType">
          <span class="title">{{$t('assets.recharge.myInfo')}}</span>
          <input readonly ref="myInfo" :value="myInfo" class="v5-5-cl" />
          <span class="copy" @click="copy('myInfo')">
            <svg class="icon icon-14" aria-hidden="true">
                <use xlink:href="#icon-assets_7"></use>
              </svg>
          </span>
        </div>
      </div>
      <div class="cut-line v5-12-bg"></div>
      <div class="details-right">
        <div class="select-bank" v-if="!isInr && symbolType">
          <c-v5-select
            :promptText="$t('assets.recharge.selectBank')"
            type="img"
            width="100%"
            :value="bank"
            :options="bankList"
            @onChanges="bankChange">
          </c-v5-select>
        </div>
        <ul class="company-info" v-if="bankInfo && !isInr" >
          <li class="company-name v5-9-bg v5-5-cl">
            <input
              readonly
              :value="bankInfo.bankAccount"
              ref="companyName"
              type="text"
              class="v5-5-cl">
            <span class="copy" @click="copy('companyName')">
              <svg class="icon icon-14" aria-hidden="true">
                <use xlink:href="#icon-assets_7"></use>
              </svg>
            </span>
          </li>
          <li class="company-id v5-9-bg v5-5-cl">
            <input
              readonly
              :value="bankInfo.bankCardNumber"
              ref="companyId"
              type="text"
              class="v5-5-cl">
            <span class="copy" @click="copy('companyId')">
              <svg class="icon icon-14" aria-hidden="true">
                <use xlink:href="#icon-assets_7"></use>
              </svg>
            </span>
          </li>
        </ul>
        <div v-if="isInr" class="recharge-way">
          <!-- 充值方式 -->
          <div class="v5-5-cl way-title">{{$t('assets.recharge.selectRechargeWay')}}</div>
          <ul class="way-list">
            <li
              v-for="(item, index) in typeList"
              :key="index"
              class="way-item"
              :class="{
                'u-16-cl v5-1-bg': item.thirdPayType === activeInrType,
                'v5-9-bg': item.thirdPayType !== activeInrType,
                'v5-5-cl': item.thirdPayType === typeHover && item.thirdPayType !== activeInrType,
                'v5-6-cl ': item.thirdPayType !== typeHover && item.thirdPayType !== activeInrType,
              }"
              @mouseover="typeHover = item.thirdPayType"
              @mouseout="typeHover = null"
              @click="setActiveType(item)">
              {{ item.thirdPayTypeName }}
            </li>
          </ul>
        </div>
        <!-- 充值数量 -->
        <div class="recharge-amount">
          <c-v5-input
            name="amount"
            width="100%"
            :promptText="$t('assets.recharge.RechargeVolume')"
            :placeholder="rechargeAmoutPlaceholder"
            :value="amount"
            @onChanges="inputChange"
            :errorFlag="amountErrorFlag"
            :errorText="amountErrorText"
          ></c-v5-input>
        </div>
        <!-- 充值手续费 -->
        <div class="recharge-fee">
          <c-v5-input
            v-if="isFeeShow"
            name="fee"
            width="100%"
            :promptText="$t('assets.withdraw.fee')"
            :value="fee"
            :readonly="true"
          ></c-v5-input>
        </div>
        <c-v5-button
          width="100%"
          marginTop="35px"
          height="40px"
          @click="confirm"
          :disabled="btnDisabled">{{ $t('assets.recharge.confirm') }}</c-v5-button>
      </div>
    </div>
    <div class="faitRechargeRecord v5-5-cl v5-10-bg">
      <!-- 最近充值记录 -->
      <div class="faitRechargeRecord-title v5-12-bd">
        <span class="title-text">
          {{ $t('assets.recharge.RecentRechargeRecord') }}
          <span class="title-line v5-1-bg"></span>
        </span>
      </div>
      <div class="mnRecharge-table  v5-10-bg">
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
    </div>

    <!-- 充值提醒 -->
    <c-alert
      :showFlag="alertFlag"
      paddingBottom="14px"
      :imgMap="imgMap"
      :colorMap="colorMap"
      @close="alertClose"
      @confirm="confirmRecharge"
      :titleText="$t('personal.leaglTenderSet.dlalogText')">
      {{ $t('assets.recharge.rechargeTip') }}
    </c-alert>
    <!-- 信息确认 -->
    <c-v5-popup
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
          class="detail-item v5-9-bg"
          v-for="(item, index) in orderDetailRow"
          :key="index"
          v-show="item.show">
          <span class="detail-key v5-6-cl">{{item.title}}</span>
          <span class="detail-value v5-5-cl">
            <span class="text" v-if="item.key === 'ctime'">{{ orderInfo.ctime | formatTime }}</span>
            <input
              v-else
              class="text v5-5-cl"
              type="text"
              :ref="item.key" readonly
              :value="orderInfo[item.key]"
            >
            <span v-if="item.hasSymbol">{{orderInfo.symbolName}}</span>
            <i v-if="item.copy" class="copy" @click="copy(item.key)">
              <svg class="icon icon-14" aria-hidden="true">
                <use xlink:href="#icon-assets_7"></use>
              </svg>
            </i>
          </span>
        </li>
      </ul>
      <div v-if="orderStatus === 0 && !isInr" class="refuseReason-tip b-7-cl">
        {{ $t('assets.recharge.orderTip') }}
      </div>
      <div v-if="orderStatus === 3" class="refuseReason-tip b-7-cl">
        {{ orderInfo.checkDesc }}
      </div>
    </c-v5-popup>
    <!-- 充值提示 -->
    <c-v5-dialog
      :showFlag="isShowDialog"
      paddingBottom="40px"
      paddingTop="40px"
      :haveOption="inrStatus === 2 || inrStatus === 3"
      :showCancel="false"
      :confirmText="$t('components.alert.buttonText')"
      @close="closePayInfoDialog"
      @confirm="closePayInfoDialog"
      :titleText="$t('assets.b2c.warning')">
      <div class="thirdPay-info">
        <img :src="thirdPayInfo.icon" alt="" />
        <h3 class="b-1-cl pay-statusText">{{thirdPayInfo.statusText}}</h3>
        <p class="pay-tip b-2-cl">{{thirdPayInfo.payTip}}</p>
      </div>
    </c-v5-dialog>
    <div v-show="loading" class="assets-loading">
      <c-loading size="50" />
    </div>
  </section>
</template>
<script>
import mixin from 'BlockChain-ui/PC/common-mixin/newAssets/mnRecharge/index';
import 'BlockChain-ui/PC/common-mixin/newAssets/mnRecharge/index.styl';

export default {
  mixins: [mixin],
  mounted() {
    this.init();
  },
};
</script>
