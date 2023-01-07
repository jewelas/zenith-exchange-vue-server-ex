<template>
  <section class="page-b2cWithdraw">
    <!-- 提现 -->
    <header class="withdraw-header b-1-cl a-3-bd">{{ $t('assets.withdraw.withdraw') }}</header>
    <div class="withdraw-details clearfix a-7-bd">
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
            <li v-for="(item, index) in detailsList" :key="index">
              {{ item.value }}
            </li>
          </ul>
        </div>
        <ul class="b-7-cl details-limit">
          <!-- 单笔最小提现金额： -->
          <li>{{ $t('assets.b2c.withdrawMin') }}：{{withdrawMin}} {{showSymbol}}</li>
          <!-- 单笔最大提现限额： -->
          <li>{{ $t('assets.b2c.withdrawMax') }}：{{withdrawMax}} {{showSymbol}}</li>
          <!-- 今日可提现金额： -->
          <li>{{ $t('assets.b2c.withdrawDay') }}：{{daywithdrawMax}} {{showSymbol}}</li>
        </ul>
        <div class="details-warking b-7-cl" v-if="warning">
          <svg class="icon icon-16 details-warking-icon"
            aria-hidden="true" style="marginRight: 10px">
            <use xlink:href="#icon-c_2"></use>
          </svg>
          <span
              class="details-warking-text"
            >{{warning}}</span>
        </div>
      </div>
      <div class="details-right">
        <!-- 提币账户 -->
        <c-select :promptText="$t('assets.b2c.withdrawAddress')"
          :value="addressValue"
          :options="addressList"
          :errorHave="true"
          type="double"
          @onChanges="addressChange"/>
        <!-- 提币数量 -->
        <c-inputLine name="numberValue"
          :errorHave="true"
          :promptText="inputW"
          @onchanges="inputChange"
          :errorFlag="numberValueObj.showError"
          :errorText="numberValueObj.text"
          :value="numberValue">
          <!-- 全部提现 -->
          <c-button type="text" height="30px" @click="allWithDraw">
            {{ $t('assets.withdraw.allWithdraw') }}
          </c-button>
        </c-inputLine>
        <!-- 手续费 -->
        <div class="in-text">{{$t('assets.b2c.fee')}}
          <span class="f-1-cl"> {{fee}} {{ symbol }}</span>
        </div>
        <!-- 到账金额 -->
        <div class="in-text">
          {{$t('assets.b2c.arrivalAccount')}}
          <span class="f-1-cl"> {{arrivalAccount}} {{ symbol }}</span>
          <span v-if="isOther"> ≈ <span class="f-1-cl">{{ aikrw }} KRW</span></span>
        </div>
        <!-- 提现按钮 -->
        <c-button width="120px"
          marginTop="32px"
          height="40px"
          @click="withdrawClick"
          :disabled="buttonDisabled">{{ $t('assets.withdraw.buttonWithdraw') }}</c-button>
        <!-- 提现账户管理 -->
        <span class="goAddress b-4-cl" @click="goAddress">
          {{$t('assets.b2c.addressMent')}}
        </span>
      </div>
      </div>
    </div>
    <!-- 最近提现记录 -->
    <header class="withdraw-header b-1-cl a-3-bd">
      {{ $t('assets.withdraw.RecentWithdrawalRecords') }}
    </header>
    <div class="withdraw-table">
      <hisTable :symbol="symbol" :lately="true"/>
    </div>
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
        name="phoneValue"
        :value="phoneValue"
        :promptText="$t('assets.withdraw.phoneCode')"
        :errorHave="true"
        :errorFlag="phoneError"
        :errorText="$t('assets.withdraw.phoneCodeError')"
        @onchanges="inputChange"
      >
        <!-- 获取验证码 -->
        <c-getCode
          name="withdrawGetcode"
          @click="getCodeClick"/>
      </c-inputLine>
      <!-- 谷歌验证码 -->
      <c-inputLine
        v-if="OpenGoogle"
        maxLength="6"
        name="googleValue"
        :value="googleValue"
        :promptText="$t('assets.withdraw.googleCode')"
        :errorHave="true"
        :errorFlag="googleError"
        :errorText="$t('assets.withdraw.googleCodeError')"
        @onchanges="inputChange"
      ></c-inputLine>
    </c-dialog>
     <c-verifyCationc-alert :showFlag="alertFlag"
      :imgMap="imgMap"
      :titleText="$t('assets.withdraw.safetyWarning')"
      :detaText="authTitleText"
      :dataList="alertData"
      :buttonText="$t('assets.withdraw.GotoOpen')"
      :haveClose="false"
      @close="alertClone"
      @confirm="alertGo"/>
  </section>
</template>
<script>
import b2cMixin from 'BlockChain-ui/PC/common-mixin/assets/b2cMixin/b2cMixin';
import mixin from 'BlockChain-ui/PC/common-mixin/assets/b2cWithdraw/b2cWithdraw';
import 'BlockChain-ui/PC/common-mixin/assets/b2cWithdraw/b2cWithdraw.styl';
import hisTable from './b2cWithdrawHis.vue';

export default {
  name: 'page-b2cWithdraw',
  components: {
    hisTable,
  },
  mixins: [b2cMixin, mixin],
  mounted() {
    this.init();
  },
};
</script>
