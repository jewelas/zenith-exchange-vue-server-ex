<template>
  <section class="page-leverAccount">
    <div class="leverAccount-header-bg">
      <div class="leverAccount-header" :style="otcHeader">
        <!-- canvas盒子 -->
        <!-- <div class="canvasBox">
          <canvas ref="canvas" width="100" height="100">
          </canvas></div> -->
        <!-- 资产折合 -->
        <ul class="assetsSum">
          <!-- 总资产折合 -->
          <li class="text f-8-cl">{{ $t('assets.otcAccount.TotalAssets') }}</li>
          <li class="num f-8-cl">
            {{ totalBalance }}<span>{{ showTotalBalanceSymbol }}</span>
          </li>
          <li class="fnum f-8-cl"> ≈ {{totalRate}}</li>
        </ul>
      </div>
    </div>
    <div class="leverAccount-body a-7-bd">
      <div class="leverAccount-title a-3-bd">
        <!-- 资金列表 -->
        <div class="text b-1-cl">{{ $t('assets.otcAccount.ListOfFunds') }}</div>
        <div class="hide">
          <!-- 隐藏零资产 -->
          <c-switch :value="switchFlag" @click="switchChange"/>
          <span class="hodetext">{{ $t('assets.otcAccount.HideZeroAssets') }}</span>
        </div>
        <div class="find">
          <!-- 搜索币种 -->
          <c-inputFind :promptText="$t('assets.leverageAccount.find')"
            :value="findValue"
            @onchanges="findChanges"
            className="findClass"/>
        </div>
      </div>
      <div class="leverAccount-center">
        <c-table
          :imgMap="imgMap"
          :colorMap="colorMap"
          :loading="tabelLoading"
          @elementClick="tableClick"
          :columns="columns"
          :dataList="dataListFilter"
          :cellHeight='55'
          h5Width="900px"
        />
      </div>
    </div>
    <leverageTransfer @success="transferSuccess"/>
  </section>
</template>

<script>
import mixin from 'BlockChain-ui/PC/common-mixin/assets/leverageAccount/leverageAccount';
import 'BlockChain-ui/PC/common-mixin/assets/leverageAccount/leverageAccount.styl';
import leverageTransfer from './leverageTransfer.vue';

export default {
  mixins: [mixin],
  components: {
    leverageTransfer,
  },
  mounted() {
    this.init();
  },
};
</script>
