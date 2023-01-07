<template>
  <section class="page-recharge">
    <header class="recharge-header b-1-cl a-3-bd">{{ $t('assets.recharge.recharge') }}</header>
    <div class="recharge-details clearfix a-7-bd">
      <div class="details-left">
        <!-- 充值 -->
        <div class="symbol b-1-cl">{{showSymbol}}</div>
        <div class="numberList clearfix">
          <ul class="numberList-key">
            <!-- 总额 -->
            <li>{{ $t('assets.recharge.lumpSum') }}</li>
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
        <div class="details-warking b-7-cl clearfix">
          <span class="wicon">
          <svg class="icon icon-16" aria-hidden="true" style="marginRight: 10px">
            <use xlink:href="#icon-c_2"></use>
          </svg>
          </span>
          <span class="text">
            <!-- 请勿向上述地址充值任何非本币种资产，否则资产将不可找回 -->
            {{ $t('assets.recharge.rechargeError') }}
          </span>
        </div>
      </div>
      <div class="details-right">
        <mainChain v-if="showBranch"
          :branchArr="branchArr"
          :activeBranch="activeBranch"
          :branchTip="branchTip"
          @setActiveBranch="setActiveBranch"/>
        <div class="details-title b-1-cl" v-else>
          <span>{{showSymbol}}</span>
          <!-- 充值地址 -->
          {{ $t('assets.recharge.rechargeAddress') }}
        </div>
        <!-- 二维码 -->
        <div class="addressQRCode"><img :src="addressQRCode" alt=""></div>
        <!-- 地址 -->
        <div class="address a-4-bg">
          <span class="text b-1-cl">{{address}}</span>
          <input :value="address" ref='address'>
          <span class="copy"
                @click="copy('address')"
                @mouseenter="handMouseenter('address')"
                @mouseleave="handMouseleave('address')">
            <span v-if="addressShow">
              <svg class="icon icon-14" aria-hidden="true">
                <use xlink:href="#icon-a_9"></use>
              </svg>
            </span>
            <span v-else>
              <svg class="icon icon-14" aria-hidden="true">
                <use xlink:href="#icon-a_9_1"></use>
              </svg>
            </span>
          </span>
        </div>
        <!-- 标签 -->
        <div class="addressPage a-4-bg" v-if="isHavePage">
          <!-- 标签 -->
          <span class="page">{{ $t('assets.recharge.label') }}</span>
          <span class="text b-1-cl">{{addressPage}}</span>
          <input :value="addressPage" ref='addressPage'>
          <span class="copy"
                @click="copy('addressPage')"
                @mouseenter="handMouseenter('addressPage')"
                @mouseleave="handMouseleave('addressPage')">
            <span v-if="addressPageShow">
              <svg class="icon icon-14" aria-hidden="true">
                <use xlink:href="#icon-a_9"></use>
              </svg>
            </span>
            <span v-else>
              <svg class="icon icon-14" aria-hidden="true">
                <use xlink:href="#icon-a_9_1"></use>
              </svg>
            </span>
          </span>
          <span class="iconPage">
            <svg class="icon icon-14" aria-hidden="true">
              <use xlink:href="#icon-a_15"></use>
            </svg>
            <div class="iconPage-market a-4-bg">
              {{ $t('assets.recharge.pageText') }}
            </div>
          </span>
        </div>
        <div class="details-right_loading" v-show="branchLoading">
          <c-loading></c-loading>
        </div>
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
    <!-- 提示框 -->
    <c-alert
      :showFlag="alertFlag"
      :imgMap="imgMap"
      :colorMap="colorMap"
      @close="alertClone"
      @confirm="alertClone">
      <!-- 充值提醒 -->
      <div class="alertTitle b-2-cl">
        {{ $t('assets.recharge.RechargeReminder') }}
      </div>
      <!-- 充值时必须要填写充值地址和标签，这是您账户的唯一标识，不填或填错将导致您的资产丢失。-->
      <div class="alertText">{{ $t('assets.recharge.rechargeWarning') }}</div>
    </c-alert>
  </section>
</template>
<script>
import mixin from 'BlockChain-ui/PC/common-mixin/assets/recharge/recharge';
import mainChainMixins from 'BlockChain-ui/PC/common-mixin/assets/mainChainMixins';
import mainChain from './mainChain.vue';
import 'BlockChain-ui/PC/common-mixin/assets/recharge/recharge.styl';

export default {
  mixins: [mixin, mainChainMixins],
  components: { mainChain },
  mounted() {
    this.init();
  },
};
</script>
