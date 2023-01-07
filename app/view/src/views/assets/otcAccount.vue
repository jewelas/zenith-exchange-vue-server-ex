<template>
  <section class="page-otcAccount">
    <div class="otcAccount-header-bg">
      <div class="otcAccount-header" :style="otcHeader">
        <div class="otcAccount-header-bar">
          <!-- canvas盒子s -->
          <div class="canvasBox"><canvas ref="canvas" width="100" height="100"></canvas></div>
          <!-- 资产折合 -->
          <ul class="assetsSum b-8-cl">
            <!-- 总资产折合 -->
            <li class="text">{{ $t('assets.otcAccount.TotalAssets') }}</li>
            <li class="num">{{ totalBalance }}
              <span>{{ getShowCoin(totalBalanceSymbol) }}</span></li>
            <li class="conversion">≈ {{totalRate}}</li>
          </ul>
          <!-- 参考列表 -->
          <ul class="colorList b-8-cl">
            <li v-for="(item, index) in canvasPagesFilter" :key="index">
              <span :style="`background: ${item.color}`"></span>
              {{getShowCoin(item.symbol)}}
            </li>
            <!-- <li><span style="background: #2AB6F6"></span>BTC</li>
            <li><span style="background: #82D4FA"></span>USDT</li>
            <li><span style="background: #B3E5FC"></span>EOS</li>
            <li><span style="background: #059BE5"></span>ETH</li>
            <li><span style="background: #4EC3F7"></span>BCH</li>
            <li><span style="background: #80D8FF"></span>其他</li> -->
          </ul>
        </div>
      </div>
    </div>
    <div class="otcAccount-body a-7-bd">
      <div class="otcAccount-title a-3-bd">
        <!-- 资金列表 -->
        <div class="text b-1-cl">{{ $t('assets.otcAccount.ListOfFunds') }}</div>
        <div class="hide">
          <!-- 隐藏零资产 -->
          <c-switch :value="switchFlag" @click="switchChange"/>
          <span class="hodetext">{{ $t('assets.hideMinAssets') }}</span>
        </div>
        <div class="find">
          <!-- 搜索币种 -->
          <c-inputFind :promptText="$t('assets.otcAccount.SearchCurrency')"
            :value="findValue"
            @onchanges="findChanges"
            className="findClass"/>
        </div>
      </div>
      <div class="otcAccount-center">
        <c-table
          :imgMap="imgMap"
          :colorMap="colorMap"
          :loading="tabelLoading"
          @elementClick="tableClick"
          :columns="columns"
          :dataList="dataListFilter"
          :cellHeight='55'
        />
      </div>
      <!-- 资金划转弹窗 -->
      <c-dialog :showFlag="dialogFlag"
        paddingBottom="14px"
        :confirmLoading="dialogConfirmLoading"
        :confirmDisabled="dialogConfirmDisabled"
        @close="dialogClose"
        @confirm="dialogConfirm"
        :titleText="$t('assets.otcAccount.CapitalTransfer')">
        <section class="transfer-box">
          <!-- 方向 -->
          <ul class="transfer-content a-4-bg">
            <li class="transfer-page">
              <!-- 从 -->
              <div class="transfer-page-side">{{ $t('assets.otcAccount.from') }}</div>
              <div class="transfer-page-name b-1-cl">{{ side.from }}</div>
            </li>
            <li class="transfer-icon">
              <svg class="icon icon-36" aria-hidden="true" @click="setTransferSide">
                <use xlink:href="#icon-f_4"></use>
              </svg>
            </li>
            <li class="transfer-page">
              <!-- 划转到 -->
              <div class="transfer-page-side">{{ $t('assets.otcAccount.to') }}</div>
              <div class="transfer-page-name b-1-cl">{{ side.to }}</div>
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
    </div>
  </section>
</template>
<script>
import mixin from 'BlockChain-ui/PC/common-mixin/assets/otcAccount/otcAccount';
import 'BlockChain-ui/PC/common-mixin/assets/otcAccount/otcAccount.styl';

export default {
  mixins: [mixin],
  mounted() {
    this.init();
  },
};
</script>
