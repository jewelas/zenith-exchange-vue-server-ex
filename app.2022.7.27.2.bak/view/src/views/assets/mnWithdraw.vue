<template>
  <section class="page-mnWithdraw">
    <!-- 提现 -->
    <header class="mnWithdraw-header b-1-cl a-3-bd">{{ $t('assets.withdraw.withdraw') }}</header>
    <div class="mnWithdraw-details clearfix a-7-bd">
      <div class="clearfix">
      <div class="details-left">
        <div class="symbol b-1-cl">{{showSymbol}}</div>
        <div class="numberList clearfix">
          <ul class="numberList-key">
            <!-- 总额 -->
            <li>{{ $t('assets.withdraw.lumpSum') }}</li>
            <!-- 可用 -->
            <li>{{ $t('assets.withdraw.Available') }}</li>
            <!-- 冻结 -->
            <li>{{ $t('assets.withdraw.freeze') }}</li>
          </ul>
          <ul class="numberList-value b-1-cl">
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
      <div class="details-right">
        <!-- 选择银行卡 -->
        <div class="select-bank">
          <c-newSelect
            :promptText="$t('assets.recharge.selectBank')"
            type="doubleAndImg"
            :value="bankId"
            :options="bankList"
            @onChanges="bankChange"/>
        </div>
        <ul class="company-info" v-if="bankInfo">
          <li class="company-name a-4-bg b-1-cl">
            {{ bankInfo.bankCardNumber}}&nbsp;{{bankInfo.bankAccount}}
          </li>
        </ul>
        <!-- 提币数量 -->
        <c-inputLine
          name="amount"
          :fixValue="showPrecision"
          inputType="num"
          :errorHave="true"
          :promptText="$t('assets.withdraw.NumberOfCoins')"
          @onchanges="inputChange"
          :value="amount"
          :errorFlag="numberOptions.error"
          :errorText="numberOptions.text">
          <!-- 全部提现 -->
          <c-button type="text" height="30px" @click="allWithDraw">
            {{ $t('assets.withdraw.allWithdraw') }}
          </c-button>
        </c-inputLine>
        <!-- 手续费 -->
        <c-inputLine
          name="fee"
          :errorHave="true"
          :promptText="feePrompt"
          :value="fee"
          :disabled="true"
          >
        </c-inputLine>
        <!-- 提现按钮 -->
        <c-button width="120px"
          marginTop="32px"
          height="40px"
          @click="withdrawClick"
          :disabled="btnDisabled">{{ $t('assets.withdraw.buttonWithdraw') }}</c-button>
        <!-- 添加银行卡 -->
        <span class="goAddress b-4-cl" @click="goBindBankCard">
          {{ $t('assets.withdraw.bindBankCard') }}
        </span>
      </div>
      </div>
    </div>
    <!-- 最近提现记录 -->
    <header class="mnWithdraw-header b-1-cl a-3-bd">
      {{ $t('assets.withdraw.RecentWithdrawalRecords') }}
    </header>
    <div class="mnWithdraw-table">
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
    <c-alert
      :showFlag="isShowBindCardTip"
      :imgMap="imgMap"
      imageType="1"
      :buttonText="$t('assets.withdraw.goBind')"
      @close="isShowBindCardTip = false"
      @confirm="goBindBankCard">
      <div class="b-1-cl bindCardTipTitle">
        {{ $t("assets.withdraw.withdrawTip") }}
      </div>
      <p class="b-2-cl bindCardTip">
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
        @close="alertClone"
        @confirm="gotoAuth">
      <div class="ts-content-text">
        {{$t('personal.exccAuthForm.text19')}}
      </div>
    </c-alert>
    <!-- 信息确认 -->
    <c-popup
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
        {{ $t('assets.withdraw.orderTip') }}
      </div>
      <div v-if="orderInfo && orderInfo.checkDesc" class="refuseReason-tip b-7-cl">
        {{ orderInfo.checkDesc }}
      </div>
    </c-popup>
  </section>
</template>
<script>
import mixin from 'BlockChain-ui/PC/common-mixin/assets/mnWithdraw/index';
import 'BlockChain-ui/PC/common-mixin/assets/mnWithdraw/index.styl';

export default {
  mixins: [mixin],
  mounted() {
    this.init();
  },
};

</script>
