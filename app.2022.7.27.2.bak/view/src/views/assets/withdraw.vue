<template>
  <section class="page-withdraw">
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
        <div class="amount-tips">
          <div class="b-1-cl">{{$t('assets.b2c.warning')}}</div>
          <ul>
            <li>
              <span class="b-2-cl">{{$t('assets.withdraw.withdrawable')}}</span>
              <i class="b-1-cl">{{withdrawalbe}}&nbsp;{{showSymbol}}</i>
            </li>
            <li>
              <span class="b-2-cl">{{$t('assets.withdraw.withdrawLimit')}}</span>
              <i class="b-1-cl">{{withdrawalLimit}}&nbsp;USDT</i>
            </li>
          </ul>
        </div>
        <div class="details-warking b-7-cl">
          <svg class="icon icon-16" aria-hidden="true" style="marginRight: 10px">
            <use xlink:href="#icon-c_2"></use>
          </svg>
          <!-- 最小提币限额 -->
          <template v-if="idAuth === 1">
          {{ $t('assets.withdraw.MinimumCoinLimit') }} {{withdrawMin}}，
          </template>
          <!-- 最大提币限额 -->
          {{ $t('assets.withdraw.MaximumCoinLimit') }} {{withdrawMax}}
          <br/>
            <!-- 今日提现剩余 -->
          <!-- <div class="dayMax" v-if="switchadd === 1">
             {{ $t('assets.withdraw.dayMaximumCoinLimit') }} {{daywithdrawMax}}
          </div> -->
          <!-- <span></span>小时限额 0.0000 BTC -->
        </div>
      </div>
      <div class="details-right">
        <div class="details-branch" v-if="showBranch">
          <mainChain
            :branchTip="branchTip"
            :branchArr="branchArr"
            :activeBranch="activeBranch"
            @setActiveBranch="setActiveBranch"/>
        </div>
        <!-- 提币地址 -->
        <c-inputSelect :promptText="$t('assets.withdraw.CoinAddress')"
          :value="addressValue"
          :options="addressList"
          :errorHave="true"
          :filterable="true"
          type="double"
          :optionsTitle="$t('assets.withdraw.addressBook')"
          @onChanges="addressChange"/>
        <!-- 标签 -->
        <c-inputLine v-if="isHavePage"
          name="pagesValue"
          :errorHave="true"
          :promptText="$t('assets.withdraw.label')"
          :value="pagesValue"
          :disabled="!canLableEdit"
          @onchanges="inputChange">
          <div class="addressBox-page-icon">
            <svg class="icon icon-14" aria-hidden="true">
              <use xlink:href="#icon-a_15"></use>
            </svg>
            <div class="addressBox-page-market a-4-bg">
              {{ $t('assets.withdraw.pageText') }}
            </div>
          </div>
        </c-inputLine>
        <!-- 提币数量 -->
        <c-inputLine name="numberValue"
          :errorHave="true"
          :promptText="$t('assets.withdraw.NumberOfCoins')"
          @onchanges="inputChange"
          :value="numberValue"
          :errorFlag="numberOptions.error"
          :errorText="numberOptions.text">
          <!-- 全部提现 -->
          <c-button type="text" height="30px" @click="allWithDraw">
            {{ $t('assets.withdraw.allWithdraw') }}
          </c-button>
        </c-inputLine>
        <!-- 矿工手续费 -->
        <c-inputLine name="proceduresValue"
          :errorHave="true"
          :promptText="$t('assets.withdraw.fee')"
          @onchanges="inputChange"
          :value="proceduresValue"
          :errorFlag="proceduresError"
          :errorText="$t('assets.withdraw.feeError')"
          :disabled="true"
          >
          <!-- 范围 -->
          <!-- <div class="ServiceSpk">
            ({{ $t('assets.withdraw.range') }}{{feeMin}}-{{feeMax}})
          </div> -->
        </c-inputLine>
        <!-- 提现按钮 -->
        <c-button width="120px"
          marginTop="32px"
          height="40px"
          @click="withdrawClick"
          :disabled="btnDisabled">{{ $t('assets.withdraw.buttonWithdraw') }}</c-button>
        <!-- 添加提币地址 -->
        <span class="goAddress b-4-cl" @click="goAddress">
          {{ $t('assets.withdraw.addAddrss') }}
        </span>
      </div>
      </div>
      <div v-if="symbol_withdraw_msg" class="withdrawMsg b-2-cl">
        <p>{{$t('application.applyRegion.focus')}}</p>
        <p>{{symbol_withdraw_msg}}</p>
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
        :subContent = 'subTableData'
        :subContentId = 'subTableDataId'
        :subColumns = 'subColumns'
        :dataList="tabelList"
        @elementClick="tableClick"
      />
      <c-pagination v-if="paginationObj.total > paginationObj.display"
        :total='paginationObj.total'
        :display='paginationObj.display'
        :currentPage='paginationObj.currentPage'
        @pagechange="pagechange"/>
    </div>
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
          :voiceOpen ="voiceSmsOpen"
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
    <c-alert :showFlag="notIdShowDialog"
        :buttonText="$t('otcRelease.DeCertification')"
        :imgMap="imgMap"
        @close="alertClone"
        @confirm="gotoAuth">
      <div class="ts-content-text">
        {{$t('personal.exccAuthForm.text19')}}
      </div>
    </c-alert>
    <!-- 提示框 -->
    <!-- <c-alert :showFlag="faceShowDialog"
        :buttonText="$t('face.know')"
        :imgMap="imgMap"
        @close="alertClone"
        @confirm="alertClone">
      <div class="ts-content-text">
        {{$t('face.note1')}}
      </div>
    </c-alert> -->
        <!-- 当前提币存在风险，为了资金安全，请取消本次提币，使用APP端进行提币，并完成提币后的人脸识别！ -->
  </section>
</template>
<script>
import mixin from 'BlockChain-ui/PC/common-mixin/assets/withdraw/withdraw';
import 'BlockChain-ui/PC/common-mixin/assets/withdraw/withdraw.styl';
import mainChainMixins from 'BlockChain-ui/PC/common-mixin/assets/mainChainMixins';
import mainChain from './mainChain.vue';

export default {
  mixins: [mixin, mainChainMixins],
  components: { mainChain },
  mounted() {
    this.init();
  },
};

</script>
