<template>
  <section class="page-withdraw">
    <!-- 提现 -->
    <header class="withdraw-header b-1-cl a-3-bd">{{ $t('assets.withdraw.withdraw') }}</header>
    <div class="withdraw-details clearfix a-7-bd">
      <div class="details-left">
        <div class="symbol b-1-cl">{{symbol}}</div>
        <div class="numberList clearfix">
          <ul class="numberList-key">
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
        <div class="details-warking b-7-cl">
          <svg class="icon icon-16" aria-hidden="true" style="marginRight: 10px">
            <use xlink:href="#icon-c_2"></use>
          </svg>
          <!-- 最小提币限额 -->
          {{ $t('assets.withdraw.MinimumCoinLimit') }} {{withdrawMin | fixDFn(that)}}，
          <!-- 最大提币限额 -->
          {{ $t('assets.withdraw.MaximumCoinLimit') }} {{withdrawMax | fixDFn(that)}}
          <br/>
          <!-- <span></span>小时限额 0.0000 BTC -->
        </div>
      </div>
      <div class="details-right">
        <div class="details-title b-1-cl">
          <!-- 提现银行账号 -->
          {{ $t('assets.krw.withdrawAccount') }}
        </div>
        <table class="messages a-4-bg" v-if="krwUserBank">
          <tr class="even a-5-bd">
            <!-- 银行账户名 -->
            <td class="key">{{ $t('assets.krw.withdrawUserName') }}</td>
            <td class="value b-1-cl">
              {{krwUserBank.name}}
            </td>
          </tr>
          <tr class="even a-5-bd">
            <!-- 银行名称 -->
            <td class="key">{{ $t('assets.krw.withdrawBankName') }}</td>
            <td class="value b-1-cl">
              {{krwUserBank.bankName}}
            </td>
          </tr>
          <tr class="even a-5-bd">
            <!-- 银行账号 -->
            <td class="key">{{ $t('assets.krw.withdrawBankAccount') }}</td>
            <td class="value b-1-cl">
              {{krwUserBank.cardNo}}
            </td>
          </tr>
        </table>
        <!-- 提币数量 -->
        <c-inputLine name="numberValue"
          marginTop="24px"
          :errorHave="true"
          :promptText="$t('assets.withdraw.NumberOfCoins')"
          @onchanges="inputChange"
          :value="numberValue"
          :errorFlag="false"
          :errorText="''">
          <!-- 全部提现 -->
          <c-button type="text" height="30px" @click="allWithDraw">
            {{ $t('assets.withdraw.allWithdraw') }}
          </c-button>
        </c-inputLine>
        <div class="options-message">
          <!-- withdrawFee -->
          <p class="key">{{ $t('assets.krw.withdrawFee') }}</p>
          <p class="value  b-1-cl">{{proceduresValue}} {{symbol}}</p>
        </div>
        <div class="options-message">
          <!-- 总金额 -->
          <p class="key">{{ $t('assets.krw.withdrawNum') }}</p>
          <p class="value b-1-cl">{{amount}} {{symbol}}</p>
        </div>
        <!-- 提现按钮 -->
        <c-button width="120px"
          marginTop="15px"
          height="40px"
          @click="withdrawClick"
          :disabled="btnDisabled">{{ $t('assets.withdraw.buttonWithdraw') }}</c-button>
      </div>
    </div>
    <!-- 最近提现记录 -->
    <header class="withdraw-header b-1-cl a-3-bd">
      {{ $t('assets.withdraw.RecentWithdrawalRecords') }}
    </header>
    <div class="withdraw-table">
      <c-table
        :imgMap="imgMap"
        :colorMap="colorMap"
        :loading="tabelLoading"
        :columns="columns"
        :dataList="tabelList"
      />
      <c-pagination v-if="paginationObj.total > paginationObj.display"
        :total='paginationObj.total'
        :display='paginationObj.display'
        :currentPage='paginationObj.currentPage'
        @pagechange="pagechange"/>
    </div>
    <!-- 对话框  38-24=14 -->
    <c-dialog :showFlag="dialogFlag"
      @close="dialogClose"
      @confirm="dialogConfrim"
      paddingBottom="14px"
      :confirmLoading="dialogConfirmLoading"
      :confirmDisabled="dialogConfirmDisabled"
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
      />
    </c-dialog>
    <!-- 提示框 -->
    <c-verifyCationc-alert
      :showFlag="alertFlag"
      :imgMap="imgMap"
      :titleText="$t('assets.addressMent.safetyWarning')"
      :detaText="$t('personal.krw.alertText')"
      :dataList="alertData"
      :buttonText="$t('assets.addressMent.GotoOpen')"
      @close="alertClone"
      @confirm="alertGo"/>
  </section>
</template>
<script>
import mixin from 'BlockChain-ui/PC/common-mixin/assets/krwWithdraw/krwWithdraw';
import 'BlockChain-ui/PC/common-mixin/assets/krwWithdraw/krwWithdraw.styl';

export default {
  mixins: [mixin],
  mounted() {
    this.init();
  },
};
</script>
