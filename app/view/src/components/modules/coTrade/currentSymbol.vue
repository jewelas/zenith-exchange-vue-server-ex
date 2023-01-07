<!-- 币币交易 24小时行情 -->
<template>
  <div class="currentSymbol a-21-bg a-3-bd">
      <div class="symbol-total e-2-cl">
        <span class="symbol-name b-1-cl">{{marketCurrent}}</span>
        <span
          v-show="symbolsData.close.data !== '--'"
          class="symbol-number"
          :class="symbolsData.close.class">
          {{symbolsData.close.data}}
        </span>
        <span
          v-show="symbolsData.close.price !== '--'"
          class="symbol-property e-2-cl">
          <!-- ≈ {{symbolsData.close.price}} -->
        </span>
      </div>
      <div class="symbol-info">
        <div class="info-item">
          <span class="tit e-2-cl">
            <!-- 涨跌幅  -->
            {{$t('contract.applies')}}
          </span>
          <span class="vla"
                :class="symbolsData.rose.class">
                {{symbolsData.rose.data}}
          </span>
        </div>
        <div class="info-item">
          <span class="tit e-2-cl">
            <!-- 最高价 -->
            {{$t('contract.height')}}
          </span>
          <span class="vla b-1-cl">{{symbolsData.high}}</span>
        </div>
        <div class="info-item">
          <span class="tit e-2-cl">
            <!-- 最低价 -->
            {{$t('contract.low')}}
          </span>
          <span class="vla b-1-cl">{{symbolsData.low}}</span>
        </div>
        <div class="info-item">
          <span class="tit e-2-cl">
            <!-- 24小时成交量 -->
            {{$t('contract.H_volume')}}
          </span>
          <span class="vla b-1-cl">
            {{symbolsData.vol}}
          </span>
        </div>
       <!--  <div class="info-item">
          <span class="tit e-2-cl">24小时成交额</span>
          <span class="vla b-1-cl">
            {{symbolsData.amount}}
            {{symbolsData.symbol.unit}}
          </span>
        </div> -->
      </div>
  </div>
</template>
<script>
import mixin from 'BlockChain-ui/PC/common-mixin/modules/coTrade/currentSymbol/currentSymbol';
import 'BlockChain-ui/PC/common-mixin/modules/coTrade/currentSymbol/currentSymbol.styl';

export default {
  mixins: [mixin],
  mounted() {
    this.init();
  },
};
</script>
