<template>
<section class="v5-page-leverFlowingWater v5-10-bg">
    <header class="flowingWater-header v5-5-cl">
      <svg class="icon icon-20 icon-back" aria-hidden="true" @click="goBack">
        <use xlink:href="#icon-v5_36"></use>
      </svg>
      <span>{{ $t('assets.index.flowingWater') }}</span>
      <div class="selectParam">
        <!-- 方向 -->
        <c-v5-select
          v-if="nowType === 3"
          class="type-select flowWater-select"
          :value="otherType"
          :options="otherTypeList"
          :errorHave="true"
          width="160px"
          inputHeight="32px"
          @onChanges="otherTypeChange"/>
        <!-- 交易对 -->
        <c-v5-select
          class="flowWater-select"
          :value="symbol"
          :options="symbolList"
          :errorHave="true"
          width="160px"
          inputHeight="32px"
          :filterable="true"
          @onChanges="symbolChange"/>
      </div>
    </header>
    <div class="flowingWater-nav v5-12-bd">
      <c-v5-navTab
        activeClassName="v5-5-cl"
        activeColor="v5-1-bg"
        className="v5-6-cl"
        :currentTab="nowType"
        :navTab="navTab"
        @currentType="currentType"
      />
    </div>
    <div class="flowingWater-table">
      <c-v5-table
        :imgMap="imgMap"
        :colorMap="colorMap"
        :loading="tabelLoading"
        :columns="columns"
        :dataList="tabelList"
        :subFlag="true"
        :subContent="subContent"
        :subColumns="subColumns"
        :subContentId="subContentId"
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
        <!--方向-->
        <div slot="side" slot-scope="scope">
          <span :class="scope.row.side.class">{{scope.row.side.text}}</span>
        </div>
        <!-- 操作 -->
        <div slot="operation" class="operation" slot-scope="scope">
          <c-v5-button
            type="text"
            class="operation-btn"
            v-for="(item, index) in scope.row.operation"
            :key="index"
            paddingW="0"
            :disabled="item.disabled"
            @click="tableClick(item.type, scope.row.id)">
            {{item.text}}
          </c-v5-button>
        </div>
      </c-v5-table>
      <c-v5-pagination
        v-if="paginationObj.total > paginationObj.display"
        :total="paginationObj.total"
        :display="paginationObj.display"
        :currentPage="paginationObj.currentPage"
        @pagechange="pagechange"
      />
    </div>
    <leverageRepayment @success="repaymentSuccess"/>
    <div v-show="loading" class="assets-loading">
      <c-loading size="50" />
    </div>
  </section>
</template>
<script>
import mixin from 'BlockChain-ui/PC/common-mixin/newAssets/lerverageFlowingWater/index';
import 'BlockChain-ui/PC/common-mixin/newAssets/lerverageFlowingWater/index.styl';
import leverageRepayment from './leverageRepayment.vue';


export default {
  mixins: [mixin],
  components: {
    leverageRepayment,
  },
  mounted() {
    this.init();
  },
};
</script>
