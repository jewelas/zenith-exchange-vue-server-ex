<template>
  <section class="v5-page-recharge">
    <div class="recharge-form fuz-card">
      <header class="recharge-header v5-5-cl">
        <svg class="icon icon-20" aria-hidden="true" @click="goBack">
          <use xlink:href="#icon-v5_36"></use>
        </svg>
        <span>{{ $t('assets.recharge.recharge') }}</span>
      </header>
      <div class="recharge-details">
        <div class="details-left">
          <!-- 充值 -->
          <c-v5-select
            width="340px"
            name="symbol"
            :imgMap="imgMap"
            :promptText="$t('assets.otcAccount.coin')"
            :options="rechargeCoinList"
            :filterable="true"
            :value="symbol"
            @onChanges="selectChange"></c-v5-select>
          <div class="numberList">
            <ul class="numberList-key v5-5-cl">
              <!-- 总额 -->
              <li>{{ $t('assets.recharge.lumpSum') }}</li>
              <!-- 可用 -->
              <li>{{ $t('assets.recharge.Available') }}</li>
              <!-- 冻结 -->
              <li>{{ $t('assets.recharge.freeze') }}</li>
            </ul>
            <ul class="numberList-value v5-5-cl">
              <li v-for="(item, index) in detailsList" :key="index">
                {{ item.value | fixDFn(that) }}
              </li>
            </ul>
          </div>
          <div class="details-warking b-7-cl">
            <!-- 请勿向上述地址充值任何非本币种资产，否则资产将不可找回 -->
            <svg class="icon icon-12" aria-hidden="true">
              <use xlink:href="#icon-c_2"></use>
            </svg>&nbsp;{{ $t('assets.recharge.rechargeError') }}
          </div>
        </div>
        <div class="cut-line v5-12-bg"></div>
        <div class="details-right">
          <mainChain
            :branchArr="branchArr"
            :activeBranch="activeBranch"
            :branchTip="branchTip"
            @setActiveBranch="setActiveBranch"/>
          <!-- 二维码 -->
          <div class="addressQRCode" v-if="symbol">
            <div class="qrcode-symbol v5-5-cl">
              {{showSymbol}}  {{ $t('assets.recharge.rechargeAddress') }}
            </div>
            <div class="qrcode-box fuz-noborder">
              <img v-if="addressQRCode" :src="addressQRCode" alt="" />
              <img v-else src="https://saas-test-bucket-21.s3.ap-northeast-1.amazonaws.com/5248/upload/20220413164112419.png" alt="" />
            </div>
            <div v-show="branchLoading" class="loading-layout">
              <div v-if="showReLoad" class="layout-content reload" @click="reload">
                <img src="https://dev-saas-oss.oss-cn-hongkong.aliyuncs.com/upload/20220407150701558.svg" alt=""/>
                {{$t('common.reload')}}
              </div>
              <div v-else class="layout-content loading">
                <img src="https://dev-saas-oss.oss-cn-hongkong.aliyuncs.com/upload/20220407150124151.svg" alt=""/>
                {{$t('h5Add.dropDownStatus3')}}
              </div>
            </div>
          </div>
          <div class="details-title v5-6-cl">
            <!-- 充值地址 -->
            {{ $t('assets.recharge.rechargeAddress') }}
          </div>
          <!-- 地址 -->
          <div class="address fuz-bg">
            <span class="text fuz-label">{{address}}</span>
            <input v-if="addressLong" :value="addressLong" ref='address'>
            <input v-else :value="address" ref='address'>
            <span
              class="copy"
              @click="copy('address')"
              @mouseenter="handMouseenter('address')"
              @mouseleave="handMouseleave('address')">
              <svg class="icon icon-14" aria-hidden="true">
                <use xlink:href="#icon-assets_7"></use>
              </svg>
            </span>
            <div v-if="addressLong" class="address-long v5-5-cl box-shadow">
              {{addressLong}}
            </div>
          </div>
          <!-- 标签 -->
          <div v-if="isHavePage" class="details-title label-title v5-6-cl">
            {{ $t('assets.recharge.label') }}
          </div>
          <div v-if="isHavePage" class="addressPage v5-9-bg">
            <span class="text v5-5-cl">{{addressPage}}</span>
            <input :value="addressPage" ref='addressPage'>
            <div class="icon-aside">
              <span
                class="iconPage"
                @mouseover="helpIconHover = true"
                @mouseleave="helpIconHover = false">
                <svg v-if="!helpIconHover" class="icon icon-12" aria-hidden="true">
                  <use xlink:href="#icon-assets_6"></use>
                </svg>
                <svg v-if="helpIconHover" class="icon icon-12" aria-hidden="true">
                  <use xlink:href="#icon-assets_6_h"></use>
                </svg>
                <c-popover
                  v-if="isHavePage"
                  :show="helpIconHover"
                  id="popover"
                  :content="$t('assets.recharge.pageText')"
                  parent=".iconPage">
                </c-popover>
              </span>
              <span
                class="copy"
                @click="copy('addressPage')"
                @mouseenter="handMouseenter('addressPage')"
                @mouseleave="handMouseleave('addressPage')">
                <svg class="icon icon-14" aria-hidden="true">
                  <use xlink:href="#icon-assets_7"></use>
                </svg>
              </span>
            </div>
          </div>
          <!-- <div class="details-right_loading" v-show="branchLoading">
            <c-loading></c-loading>
          </div> -->
          <!-- notice -->
          <div class='notice'>
            <div class='fuz-gap' />
            <div class="fuz-text-large fuz-gap" style='color:#fff'>Notice</div>
              <p class='fuz-text-small fuz-gap'>
                TRC20 Minimum Deposit Amount: 0.01 USDT.
                Deposits less than the minimum amount will not be captured and cannot be recovered.
              </p>
              <p class='fuz-text-small fuz-gap'>
                Please ensure that the correct type of crypto is transferred to the stated address.
                Transferring the wrong type of crypto will result in irreversible fund loss.
              </p>
              <p class='fuz-text-small'>
                Carrying out a deposit to this address requires 20 network confirmations.
              </p>
          </div>
        </div>
      </div>
    </div>
    <!-- 最近充值记录 -->
    <div class="rechargeRecord fuz-card">
      <div class="rechargeRecord-title fuz-card-title">
        <span class="title-text">
          {{ $t('assets.recharge.RecentRechargeRecord') }}
        </span>
        <span class="all-record v5-1-cl" @click="lookAll">{{$t('assets.otcAccount.all')}}</span>
      </div>
      <div class="recharge-table">
        <c-v5-table
          :imgMap="imgMap"
          :colorMap="colorMap"
          :loading="tabelLoading"
          :bodyHeight="420"
          :columns="columns"
          :dataList="tabelList"
        >
          <!-- 币种 -->
          <dl
            v-if="coinList && coinList[scope.row.coin]"
            slot="coin" slot-scope="scope" class="table-coin">
            <dt>
              <img :src="coinList[scope.row.coin].icon" alt="" />
            </dt>
            <dd>
              <div class="coinShowName v5-5-cl">{{scope.row.coin | getCoinShowName(coinList)}}</div>
              <div class="coinLongName v5-6-cl">
                {{ coinList[scope.row.coin].longName || scope.row.coin }}
              </div>
            </dd>
          </dl>
          <!-- 地址 -->
          <div class="address-col" slot="address" slot-scope="scope">
            <span class="col-value">{{scope.row.address}}</span>
            <span
              class="copy"
              @click="copy('table', scope.row.addressLong)">
              <svg class="icon icon-14" aria-hidden="true">
                <use xlink:href="#icon-assets_7"></use>
              </svg>
            </span>
            <div class="long-value v5-5-cl v5-19-bg box-shadow">
              {{scope.row.addressLong}}
            </div>
          </div>
          <!-- 交易ID -->
          <div class="address-col" slot="txid" slot-scope="scope">
            <span class="col-value">{{scope.row.txid}}</span>
            <span
              v-if="scope.row.txidLong"
              class="copy"
              @click="copy('table', scope.row.txidLong)">
              <svg class="icon icon-14" aria-hidden="true">
                <use xlink:href="#icon-assets_7"></use>
              </svg>
            </span>
            <div v-if="scope.row.txidLong" class="long-value v5-5-cl v5-19-bg box-shadow">
              {{scope.row.txidLong}}
            </div>
          </div>
        </c-v5-table>
        <c-v5-pagination v-if="paginationObj.total > paginationObj.display"
          :total='paginationObj.total'
          :display='paginationObj.display'
          :currentPage='paginationObj.currentPage'
          @pagechange="pagechange"/>
      </div>
    </div>
    <!-- 提示框 -->
    <c-alert
      :showFlag="alertFlag"
      :imgMap="imgMap"
      :colorMap="colorMap"
      @close="alertClone"
      @confirm="alertClone">
      <!-- 充值提醒 -->
      <div class="alertTitle v5-5-cl">
        {{ $t('assets.recharge.RechargeReminder') }}
      </div>
      <!-- 充值时必须要填写充值地址和标签，这是您账户的唯一标识，不填或填错将导致您的资产丢失。-->
      <div class="alertText">{{ $t('assets.recharge.rechargeWarning') }}</div>
    </c-alert>
    <!-- 复制使用 -->
    <input ref="copyValue" class="copyValue" type="text" :value="copyValue" />
  </section>
</template>
<script>
import mixin from 'BlockChain-ui/PC/common-mixin/newAssets/recharge/index';
import mainChainMixins from 'BlockChain-ui/PC/common-mixin/newAssets/mainChainMixins';
import mainChain from './mainChain.vue';
import 'BlockChain-ui/PC/common-mixin/newAssets/recharge/index.styl';

export default {
  mixins: [mixin, mainChainMixins],
  components: { mainChain },
  mounted() {
    this.init();
  },
};
</script>
<style scoped>
.address {
  width: 480px !important;
}
.notice {
  width: 480px;
}
</style>
