<template>
  <section class="page-otcAccount">
    <div class="otcAccount-header" :style="otcHeader">
      <!-- canvas盒子 -->
      <div class="canvasBox"><canvas ref="canvas" width="100" height="100"></canvas></div>
      <!-- 资产折合 -->
      <ul class="assetsSum b-8-cl">
        <!-- 总资产折合 -->
        <li class="text">{{ $t('assets.otcAccount.TotalAssets') }}</li>
        <li class="num">{{ totalBalance }}<span>{{ totalBalanceSymbol }}</span></li>
        <li class="conversion">≈ {{totalRate}}</li>
      </ul>
      <!-- 参考列表 -->
      <ul class="colorList b-8-cl">
        <li v-for="(item, index) in canvasPagesFilter" :key="index">
          <span :style="`background: ${item.color}`"></span>
          {{item.symbol}}
        </li>
      </ul>
    </div>
    <div class="otcAccount-body a-7-bd">
      <div class="otcAccount-title a-3-bd">
        <!-- 资金列表 -->
        <div class="text b-1-cl">{{ $t('assets.otcAccount.ListOfFunds') }}</div>
        <div class="hide">
          <!-- 隐藏零资产 -->
          <c-switch :value="switchFlag" @click="switchChange"/>
          <span class="hodetext">{{ $t('assets.otcAccount.HideZeroAssets') }}</span>
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
          :loading="tabelLoading"
          @elementClick="tableClick"
          :imgMap="imgMap"
          :colorMap="colorMap"
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
              <div class="transfer-page-name b-2-cl">{{ side.from }}</div>
            </li>
            <li class="transfer-icon">
              <svg class="icon icon-36" aria-hidden="true">
                <use xlink:href="#icon-f_4"></use>
              </svg>
            </li>
            <li class="transfer-page">
              <!-- 划转到 -->
              <div class="transfer-page-side">{{ $t('assets.otcAccount.to') }}</div>
              <div class="transfer-page-name b-2-cl">
                {{ $t('assets.bibaoAccount.bibaoAccount') }}
              </div>
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
import mixin from 'BlockChain-ui/PC/common-mixin/assets/bibaoAccount/bibaoAccount';
import 'BlockChain-ui/PC/common-mixin/assets/bibaoAccount/bibaoAccount.styl';

export default {
  mixins: [mixin],
  mounted() {
    this.init();
  },
};
</script>
