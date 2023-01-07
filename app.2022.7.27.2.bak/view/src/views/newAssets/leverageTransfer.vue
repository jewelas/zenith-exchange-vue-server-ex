<template>
<!-- 划转 -->
    <c-v5-dialog
      :showFlag="showTransfer"
      class="v5-transfer-dialog"
      :titleText="$t('assets.otcAccount.CapitalTransfer')"
      :confirmText="$t('assets.leverageAccount.transfer')"
      :confirmDisabled="transferDisabled"
      size="large"
      @close="closeTransfer"
      @confirm="confirmTransfer">
      <div class="transfer-form">
        <!-- 账户 -->
        <div class="transfer-account" :class="{ 'reverse': transferSide === 2 }">
          <div class="exchange account-side">
            <c-v5-input
              width="184px"
              name="exchangeAccount"
              :readonly="true"
              :value="$t('assets.index.exchangeAccount')">
              <div class="v5-6-cl" slot="promptExtend">
                {{transferSide === 1 ? $t('assets.otcAccount.from') : $t('assets.otcAccount.to')}}
              </div>
            </c-v5-input>
              <div class="available v5-6-cl">
                {{$t('assets.otcAccount.Available')}}:
                {{exchangeAvailable | thousands}}&nbsp;{{transferCoin}}
              </div>
          </div>
          <div class="change-icon">
            <svg class='icon icon-24' aria-hidden='true' @click="changeTransferSide">
              <use xlink:href='#icon-assets_9'></use>
            </svg>
          </div>
          <div class="other account-side">
            <c-v5-input width="184px" :readonly="true" :value="$t('assets.index.leverage')">
              <div class="v5-6-cl" slot="promptExtend">
                {{transferSide === 2 ? $t('assets.otcAccount.from') : $t('assets.otcAccount.to')}}
              </div>
            </c-v5-input>
              <div class="available v5-6-cl">
                {{$t('assets.otcAccount.Available')}}:
                {{otherAvailable | thousands}}&nbsp;{{transferCoin}}
              </div>
          </div>
        </div>
        <!-- 币对 -->
        <div class="transfer-symbol">
          <c-v5-select
            width="100%"
            name="transferSymbol"
            :imgMap="imgMap"
            :filterable="true"
            :options="symbolList"
            :value="transferSymbol"
            @onChanges="selectChange">
            <div class="v5-6-cl" slot="promptExtend">
              {{$t('order.exchangeOrder.coin')}}
            </div>
          </c-v5-select>
        </div>
        <!-- 币种 -->
        <div class="transfer-coin">
          <c-v5-select
            width="100%"
            name="transferCoin"
            :imgMap="imgMap"
            :options="leverCoinList"
            :filterable="true"
            :value="transferCoin"
            @onChanges="selectChange">
            <div class="v5-6-cl" slot="promptExtend">
              {{$t('assets.otcAccount.coin')}}
            </div>
          </c-v5-select>
        </div>
        <!-- 数量 -->
        <div class="transfer-num">
          <c-v5-input
            width="100%"
            name="transferNum"
            :placeholder="$t('trade.pleaseInput') + $t('assets.otcAccount.volume')"
            :value="transferNum"
            :clearable="true"
            :errorFlag="transferError"
            :errorText="$t('assets.otcAccount.volumeError')"
            :warningText="transferWarningText"
            @onChanges="inputChange">
            <div class="v5-6-cl" slot="promptExtend">
              {{$t('assets.otcAccount.volume')}}
            </div>
            <span
              class="transfer-all v5-1-cl"
              slot="append"
              @click="transferAll">{{$t('assets.otcAccount.all')}}</span>
          </c-v5-input>
        </div>
      </div>
    </c-v5-dialog>
</template>
<script>
import mixin from 'BlockChain-ui/PC/common-mixin/newAssets/leverageTransfer/index';
import 'BlockChain-ui/PC/common-mixin/newAssets/leverageTransfer/index.styl';

export default {
  mixins: [mixin],
  mounted() {
    this.init();
  },
};
</script>
