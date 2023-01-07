<template>
  <section class="page-krw-recharge">
    <header class="recharge-header b-1-cl a-3-bd">{{ $t('assets.recharge.recharge') }}</header>
    <div class="recharge-details clearfix a-7-bd">
      <div class="details-left">
        <!-- 充值 -->
        <div class="symbol b-1-cl">{{symbol}}</div>
        <div class="numberList clearfix">
          <ul class="numberList-key">
            <!-- 总额 -->
            <!-- <li>{{ $t('assets.recharge.lumpSum') }}</li> -->
            <!-- 可用 -->
            <li>{{ $t('assets.recharge.Available') }}</li>
            <!-- 冻结 -->
            <li>{{ $t('assets.recharge.freeze') }}</li>
          </ul>
          <ul class="numberList-value b-1-cl">
            <li v-for="(item, index) in detailsList" :key="index">
              {{ item.value | fixDFn(that) }}
            </li>
          </ul>
        </div>
        <div class="details-warking b-7-cl">
          <svg class="icon icon-16" aria-hidden="true" style="marginRight: 10px">
            <use xlink:href="#icon-c_2"></use>
          </svg>
          <!-- 充值金额不小于 -->
          {{ $t('assets.krw.rechargeMin') }} {{minRecharge | fixDFn(that) }} {{symbol}}
        </div>
      </div>
      <div class="details-right">
        <div class="details-title b-1-cl">
          <!-- 充值银行账号 -->
          {{ $t('assets.krw.rechargeAccount') }}
        </div>
        <table class="messages a-4-bg">
          <tr class="even a-5-bd">
            <!-- '银行账户名', -->
            <td class="key">{{ $t('assets.krw.rechargeUserName') }}</td>
            <td class="value b-1-cl">{{bankUser}}
              <input type="text" ref="bankUser"
                :value="bankUser" class="valueInp">
            </td>
            <td class="copyTd">
              <span class="svgs" @click="copy('bankUser')">
                <svg class="icon icon-14 info" aria-hidden="true">
                <use xlink:href="#icon-a_9"></use>
                </svg>
                <svg class="icon icon-14 active" aria-hidden="true">
                  <use xlink:href="#icon-a_9_1"></use>
                </svg>
              </span>
            </td>
          </tr>
          <tr class="even a-5-bd">
            <!-- 银行名称 -->
            <td class="key">{{ $t('assets.krw.rechargeBankName') }}</td>
            <td class="value b-1-cl">{{ bankName }}</td>
            <td class="copyTd"></td>
          </tr>
          <tr class="even a-5-bd">
            <!-- 银行账号 -->
            <td class="key">{{ $t('assets.krw.rechargeBankAccount') }}</td>
            <td class="value b-1-cl">
              {{bankAccount}}
              <input type="text" ref="bankAccount"
                :value="bankAccount" class="valueInp">
            </td>
            <td class="copyTd">
              <span class="svgs" @click="copy('bankAccount')">
                <svg class="icon icon-14 info" aria-hidden="true">
                  <use xlink:href="#icon-a_9"></use>
                </svg>
                <svg class="icon icon-14 active" aria-hidden="true">
                  <use xlink:href="#icon-a_9_1"></use>
                </svg>
              </span>
            </td>
          </tr>
        </table>
        <!-- 充值金额 -->
        <c-inputLine
          name="rechargeNum"
          :promptText="$t('assets.krw.rechargeSum')"
          marginTop="24px"
          :errorHave="true"
          :value="rechargeNum"
          @onchanges="inputChanges"/>
        <!-- 充值按钮 -->
        <c-button marginTop="6px" paddingW="44px"
          :disabled="buttonDisabled"
          @click="buttonClick"
          >{{ $t('assets.recharge.recharge') }}</c-button>
      </div>
    </div>
    <!-- 最近充值记录 -->
    <header class="recharge-header b-1-cl a-3-bd">
      {{ $t('assets.recharge.RecentRechargeRecord') }}
    </header>
    <div class="recharge-table">
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
    <c-dialog :showFlag="showFlag"
      :titleText="$t('assets.krw.rechargeConfrim')"
      :confirmLoading="confirmLoading"
      @confirm="DialogConfrim"
      @close="DialogClose">
      <ul class="confirmMess">
        <li class="a-4-bg">
          <!-- rechargeConfrim -->
          <p class="key">{{$t('assets.krw.rechargeSum')}}</p>
          <p class="value b-1-cl">{{ rechargeNum }} {{ symbol }}</p>
        </li>
        <li class="a-4-bg">
          <!-- 充值到指定帐号 -->
          <p class="key">{{$t('assets.krw.rechargeTo')}}</p>
          <p class="value b-1-cl">{{ bankAccount }}</p>
        </li>
        <li class="a-4-bg">
          <!-- 转账备注内容 -->
          <p class="key">{{ $t('assets.krw.rechargeText') }}</p>
          <p class="value b-1-cl">{{ userInfo.realName }} {{ userInfo.id }}</p>
        </li>
      </ul>
    </c-dialog>
  </section>
</template>
<script>
import mixin from 'BlockChain-ui/PC/common-mixin/assets/krwRecharge/krwRecharge';
import 'BlockChain-ui/PC/common-mixin/assets/krwRecharge/krwRecharge.styl';

export default {
  mixins: [mixin],
  mounted() {
    this.init();
  },
};
</script>
