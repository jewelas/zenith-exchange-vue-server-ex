<template>
  <section class="page-otcAccount">
    <div class="otcAccount-header" :style="otcHeader">
      <!-- canvas盒子 -->
      <!-- <div class="canvasBox"><canvas ref="canvas" width="100" height="100"></canvas></div> -->
      <!-- 资产折合 -->
      <ul class="assetsSum b-1-cl">
        <!-- 总资产折合 -->
        <li class="text" style="color: #EDF4F8">{{ $t('assets.otcAccount.TotalAssets') }}</li>
        <li class="num" style="color: #EDF4F8">
          {{ totalBalance }}<span>{{ totalBalanceSymbol }}</span>
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
          :imgMap="imgMap"
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
import mixin from 'BlockChain-ui/PC/common-mixin/assets/krwAccount/krwAccount';
import 'BlockChain-ui/PC/common-mixin/assets/krwAccount/krwAccount.styl';


export default {
  mixins: [mixin],
  mounted() {
    this.init();
  },
};
</script>
