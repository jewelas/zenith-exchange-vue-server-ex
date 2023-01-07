<template>
  <c-dialog
    class="new-leverageTransfer-container"
    :showFlag="transferFlag"
    :titleText="$t('assets.leverageTransfer.title')"
    :confirmLoading="transferConfirmLoading"
    :confirmDisabled="transferConfirmDisabled"
    @close="transferDialogClose"
    @confirm="transferDialogConfirm">
    <div class="transfer-loadingBox" v-if="loading">
      <div class="transfer-loading"><c-loading size="50"/></div>
    </div>
    <section class="transfer-box" v-else>
      <div class="transfer-reverse" @click="setTransferSide">
        <img src="http://dev-saas-oss.oss-cn-hongkong.aliyuncs.com/upload/20210824102354158.png" alt="">
      </div>
      <div class="transfer-account">
        <div>{{ $t('assets.otcAccount.from') }}</div>
        <div class="transfer-fixed">
          <div class="transfer-from b-1-cl" :class="{'reverse': transferSide === '2'}">
            <div class="transfer-name a-4-bg">
              {{ $t('assets.otcAccount.exchangeAccount') }}
            </div>
          </div>
        </div>
        <div>{{ $t('assets.otcAccount.to') }}</div>
        <div class="transfer-fixed">
          <div class="transfer-to b-1-cl" :class="{'reverse': transferSide === '2'}">
            <div class="transfer-name a-4-bg">
              {{ $t('assets.leverageTransfer.leverageAccount') }}
            </div>
            <div class="transfer-symbol a-4-bg">
              {{ getShowCoin(transferObj.baseCoin) }}/{{ getShowCoin(transferObj.quoteCoin) }}
            </div>
          </div>
        </div>
      </div>
    </section>
    <section class="transfer-form">
      <div class="coin-title">{{$t('futures.transfer.coin')}}</div>
      <c-select
        :value="transferCoin"
        :options="transferOptions"
        @onChanges="(item) => transferCoinChange(item.code)"
      />
      <!-- 划转数量 -->
      <c-inputLine
        name='transferValue'
        :value="transferValue"
        :promptText="$t('assets.otcAccount.volume')"
        :errorHave="true"
        :errorFlag="transferError"
        :errorText="$t('assets.otcAccount.volumeError')"
        :warningText="transferWarningText"
        @onchanges="inputLineChange">
        <div>
          <span
            class='delete-icon'
            @click='clear'
            @mouseover="isDeleteHover = true"
            @mouseout="isDeleteHover = false"
            v-show='transferValue'
          >
            <img
              v-show="isDeleteHover"
              src="http://dev-saas-oss.oss-cn-hongkong.aliyuncs.com/upload/20210818105609762.png" alt="" />
            <img
              v-show="!isDeleteHover"
              src="http://dev-saas-oss.oss-cn-hongkong.aliyuncs.com/upload/20210818105625849.png" alt="" />
          </span>
          <!-- 全部 -->
          <c-button type="text" height="30px" @click="allTransfer">
            {{ $t('assets.otcAccount.all') }}
          </c-button>
        </div>
      </c-inputLine>
    </section>
  </c-dialog>
</template>
<script>
import mixin from 'BlockChain-ui/PC/common-mixin/assets/leverageTransfer/leverageTransfer';
import 'BlockChain-ui/PC/common-mixin/assets/leverageTransfer/leverageTransfer.styl';

export default {
  mixins: [mixin],
  mounted() {
    this.init();
  },
};
</script>
