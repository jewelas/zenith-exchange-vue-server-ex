<template>
  <section class="page-b2cAccount">
    <div class="otcAccount-header-bg">
      <div class="otcAccount-header" :style="otcHeader">
        <div class="otcAccount-header-bar">
          <!-- canvas盒子s -->
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
          :colorMap="colorMap"
          :loading="tabelLoading"
          @elementClick="tableClick"
          :columns="columns"
          :dataList="dataListFilter"
          :cellHeight='55'
        />
      </div>
    </div>
  </section>
</template>
<script>
import mixin from 'BlockChain-ui/PC/common-mixin/assets/b2cAccount/b2cAccount';
import 'BlockChain-ui/PC/common-mixin/assets/b2cAccount/b2cAccount.styl';

export default {
  mixins: [mixin],
  mounted() {
    this.init();
  },
};
</script>
