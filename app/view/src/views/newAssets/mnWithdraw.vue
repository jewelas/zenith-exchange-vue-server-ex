<template>
  <section class="v5-page-mnWithdraw">
    <!-- 提现 -->
    <div class="mnWithdraw-details clearfix v5-10-bg">
      <div class="details-left">
        <!-- <div class="symbol v5-5-cl">{{showSymbol}}</div> -->
        <c-v5-select
            width="340px"
            name="symbol"
            :imgMap="imgMap"
            :promptText="$t('assets.otcAccount.coin')"
            :options="withdrawCoinList"
            :value="symbol"
            @onChanges="selectChange"></c-v5-select>
        <div class="numberList clearfix">
          <ul class="numberList-key">
            <!-- 总额 -->
            <li>{{ $t('assets.withdraw.lumpSum') }}</li>
            <!-- 可用 -->
            <li>{{ $t('assets.withdraw.Available') }}</li>
            <!-- 冻结 -->
            <li>{{ $t('assets.withdraw.freeze') }}</li>
          </ul>
          <ul class="numberList-value v5-5-cl">
            <li v-for="(item, index) in quotaList" :key="index">
              {{ item.value }}
            </li>
          </ul>
        </div>
        <div class="details-warking b-7-cl">
          <svg class="icon icon-16" aria-hidden="true" style="marginRight: 10px">
            <use xlink:href="#icon-c_2"></use>
          </svg>
          <span>{{$t('assets.withdraw.tip')}}</span>
        </div>
      </div>
      <div class="cut-line v5-12-bg"></div>
      <div class="details-right">
        <!-- 选择银行卡 -->
        <div class="select-bank">
          <c-v5-select
            width="100%"
            :promptText="$t('assets.recharge.selectBank')"
            optionType="double"
            :value="bankId"
            :options="bankList"
            @onChanges="bankChange"/>
          <div class="goAddress v5-1-cl" @click="goBindBankCard">
            {{ $t('assets.withdraw.bindBankCard') }}
          </div>
        </div>
        <ul class="company-info" v-if="bankInfo">
          <li class="company-name v5-9-bg v5-5-cl">
            {{ bankInfo.bankNameShow}}&nbsp;{{bankInfo.bankCardNumber}}
          </li>
          <li class="company-name v5-9-bg v5-5-cl" v-if="Number(symbolType) === 3">
            IFSC:&nbsp;{{bankInfo.remark}}
          </li>
          <li class="company-name v5-9-bg v5-5-cl" v-if="Number(symbolType) === 3">
            {{$t('personal.label.name')}}:&nbsp;{{bankInfo.bankAccount}}
          </li>
        </ul>

        <div class="withdraw-amount">
        <!-- 提币数量 -->
          <c-v5-input
            name="amount"
            inputType="num"
            width="100%"
            :errorHave="true"
            :promptText="$t('assets.withdraw.NumberOfCoins')"
            :placeholder="amoutPlaceholder"
            @onChanges="inputChange"
            :value="amount"
            :errorFlag="numberOptions.error"
            :errorText="numberOptions.text">
            <!-- 全部提现 -->
            <span class="allWithdraw v5-1-cl" slot="append" @click="allWithDraw">
              {{ $t('assets.withdraw.allWithdraw') }}
            </span>
          </c-v5-input>
        </div>
        <div class="withdraw-fee">
          <!-- 手续费 -->
            <c-v5-input
              name="fee"
              width="100%"
              :errorHave="true"
              :promptText="feePrompt"
              :value="fee"
              :readonly="true"
              >
            </c-v5-input>
        </div>
        <!-- 提现按钮 -->
        <c-v5-button width="100%"
          marginTop="16px"
          height="40px"
          @click="withdrawClick"
          :disabled="btnDisabled">{{ $t('assets.withdraw.buttonWithdraw') }}</c-v5-button>
        <!-- 添加银行卡 -->
      </div>
    </div>
    <div class="faitWithdrawRecord v5-5-cl v5-10-bg">
      <!-- 最近提现记录 -->
      <div class="faitWithdrawRecord-title v5-12-bd">
        <span class="title-text">
          {{ $t('assets.withdraw.RecentWithdrawalRecords') }}
          <span class="title-line v5-1-bg"></span>
        </span>
      </div>
      <div class="mnWithdraw-table">
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


    <c-alert
      :showFlag="isShowBindCardTip"
      :imgMap="imgMap"
      imageType="1"
      :buttonText="$t('assets.withdraw.goBind')"
      @close="isShowBindCardTip = false"
      @confirm="goBindBankCard">
      <div class="v5-5-cl bindCardTipTitle">
        {{ $t("assets.withdraw.withdrawTip") }}
      </div>
      <p class="v5-6-cl bindCardTip">
        {{ $t("assets.withdraw.bindCardTip") }}
      </p>
    </c-alert>
    <!-- 提示框 -->
    <c-verifyCationc-alert
      :showFlag="alertFlag"
      :imgMap="imgMap"
      :titleText="$t('assets.withdraw.safetyWarning')"
      :detaText="authTitleText"
      :dataList="alertData"
      :buttonText="$t('assets.withdraw.GotoOpen')"
      @close="alertClone"
      @confirm="alertGo"/>
    <!-- 对话框  38-24=14 -->
    <c-dialog :showFlag="dialogFlag"
      paddingBottom="14px"
      :confirmLoading="dialogConfirmLoading"
      :confirmDisabled="dialogConfirmDisabled"
      @close="dialogClose"
      @confirm="dialogConfirm"
      :titleText="$t('assets.withdraw.safetyVerification')">
      <!-- 手机号验证框 -->
      <c-inputLine
        v-if="OpenMobile"
        maxLength="6"
        name="smsCode"
        :value="smsCode"
        :promptText="$t('assets.withdraw.phoneCode')"
        :errorHave="true"
        :errorFlag="phoneError"
        :errorText="$t('assets.withdraw.phoneCodeError')"
        @onchanges="inputChange"
      >
        <!-- 获取验证码 -->
        <c-getCode
          name="withdrawGetcode"
          :voiceOpen ="voiceSmsOpen"
          @click="getCodeClick"/>
      </c-inputLine>
      <!-- 谷歌验证码 -->
      <c-inputLine
        v-if="OpenGoogle"
        maxLength="6"
        name="googleCode"
        :value="googleCode"
        :promptText="$t('assets.withdraw.googleCode')"
        :errorHave="true"
        :errorFlag="googleError"
        :errorText="$t('assets.withdraw.googleCodeError')"
        @onchanges="inputChange"
      />
    </c-dialog>
    <!-- 提示框 -->
    <c-alert :showFlag="notIdShowDialog"
        :buttonText="$t('otcRelease.DeCertification')"
        :imgMap="imgMap"
        :colorMap="colorMap"
        @close="alertClone"
        @confirm="gotoAuth">
      <div class="ts-content-text">
        {{$t('personal.exccAuthForm.text19')}}
      </div>
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
      @close="closeInfoDialog"
      @cancel="cancelOrder"
      @confirm="closeInfoDialog">
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
      <div v-if="orderStatus === 0" class="refuseReason-tip b-7-cl">
        {{ $t('assets.withdraw.orderTip') }}
      </div>
      <div v-if="orderInfo && orderInfo.checkDesc" class="refuseReason-tip b-7-cl">
        {{ orderInfo.checkDesc }}
      </div>
    </c-v5-popup>
  </section>
</template>
<script>
import mixin from 'BlockChain-ui/PC/common-mixin/newAssets/mnWithdraw/index';
import 'BlockChain-ui/PC/common-mixin/newAssets/mnWithdraw/index.styl';

export default {
  mixins: [mixin],
  mounted() {
    this.init();
  },
};

</script>
