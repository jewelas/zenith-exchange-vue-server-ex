<template>
  <section class="v5-page-otcFlowingWater v5-10-bg">
    <!-- 资金流水 -->
    <header class="flowingWater-header v5-5-cl v5-12-bd">
      <svg class="icon icon-20 icon-back" aria-hidden="true" @click="goBack">
        <use xlink:href="#icon-v5_36"></use>
      </svg>
      <span>{{ $t('assets.otcFlowingWater.title') }}</span>
      <div class="selectParam">
        <!-- 类型 -->
        <c-v5-select
          :value="type"
          :options="typeList"
          :errorHave="true"
          class="type-select flowWater-select"
          width="160px"
          inputHeight="32px"
          @onChanges="typeChange"/>
        <!-- 币种 -->
        <c-v5-select
          :value="symbol"
          :options="symbolList"
          :errorHave="true"
          class="flowWater-select"
          width="160px"
          inputHeight="32px"
          :filterable="true"
          @onChanges="symbolChange"/>
      </div>
    </header>
    <div class="flowingWater-table">
      <c-v5-table
        :imgMap="imgMap"
        :colorMap="colorMap"
        :loading="tabelLoading"
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
      </c-v5-table>
      <c-v5-pagination
        v-if="paginationObj.total > paginationObj.display"
        :total="paginationObj.total"
        :display="paginationObj.display"
        :currentPage="paginationObj.currentPage"
        @pagechange="pagechange"
      />
    </div>
  </section>
</template>
<script>
import mixin from 'BlockChain-ui/PC/common-mixin/newAssets/otcFlowingWater/index';
import 'BlockChain-ui/PC/common-mixin/newAssets/otcFlowingWater/index.styl';

export default {
  mixins: [mixin],
  mounted() {
    this.init();
  },
};
</script>
