<template>
  <c-dialog
    class="leverageTransfer-container"
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
      <div class="transfer-mess a-4-bg">
        <div class="even">
          <c-redio :value="transferCoin === transferObj.baseCoin"
            :name="transferObj.baseCoin"
            @click="transferCoinChange"/>
          <span class="key e-1-cl"
            @click="transferCoinChange(transferObj.baseCoin)">
            {{ getShowCoin(transferObj.baseCoin) }}
          </span>
        </div>
        <div class="even">
          <c-redio :value="transferCoin === transferObj.quoteCoin"
            :name="transferObj.quoteCoin"
            @click="transferCoinChange"/>
          <span class="key e-1-cl"
            @click="transferCoinChange(transferObj.quoteCoin)">
            {{ getShowCoin(transferObj.quoteCoin) }}
          </span>
        </div>
      </div>
      <!-- 方向 -->
      <ul class="transfer-content a-4-bg">
        <li class="transfer-page">
          <!-- 从 -->
          <div class="transfer-page-side">{{ $t('assets.otcAccount.from') }}</div>
          <div class="transfer-page-name e-1-cl">{{ side.from }}</div>
        </li>
        <li class="transfer-icon">
          <svg class="icon icon-36" aria-hidden="true" @click="setTransferSide">
            <use xlink:href="#icon-f_4"></use>
          </svg>
        </li>
        <li class="transfer-page">
          <!-- 划转到 -->
          <div class="transfer-page-side">{{ $t('assets.otcAccount.to') }}</div>
          <div class="transfer-page-name e-1-cl">{{ side.to }}</div>
        </li>
      </ul>
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
        <!-- 全部 -->
        <c-button type="text" height="30px" @click="allTransfer">
          {{ $t('assets.otcAccount.all') }}
        </c-button>
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
