<template>
  <section class="v5-page-flowingWater fuz-card">
    <header class="flowingWater-header v5-5-cl">
      <svg class="icon icon-20 icon-back" aria-hidden="true" @click="goBack">
        <use xlink:href="#icon-v5_36"></use>
      </svg>
      <span>{{ $t('assets.index.flowingWater') }}</span>
      <div class="selectParam">
        <!-- 类型 -->
        <c-v5-select
          v-if="nowType === 3"
          class="type-select flowWater-select"
          :value="otherType"
          :options="otherTypeList"
          :errorHave="true"
          :width="lan === 'zh_CN' ? '160px':'250px'"
          inputHeight="32px"
          @onChanges="otherTypeChange"
        />
        <!-- 类型 -->
        <c-v5-select
          v-if="nowType === 5"
          class="type-select flowWater-select"
          :value="currentIncomeType"
          :options="incomeType"
          :errorHave="true"
          width="160px"
          inputHeight="32px"
          @onChanges="setIncomeType"
        />
        <!-- 币种 -->
        <c-v5-select
          class="flowWater-select"
          :value="symbol"
          :options="symbolList"
          :errorHave="true"
          width="160px"
          inputHeight="32px"
          :filterable="true"
          @onChanges="symbolChange"
        />
      </div>
    </header>
    <div class="flowingWater-nav  fuz-card-tab">
      <c-v5-navTab
        activeClassName="v5-5-cl"
        activeColor="v5-1-bg"
        className="v5-6-cl"
        :currentTab="nowType"
        :navTab="navTab"
        @currentType="currentType"
      />
    </div>
    <template v-if="nowType === 4">
      <innovations />
    </template>
    <template v-else>
      <div class="flowingWater-table fuz-full">
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
          <!-- 地址 -->
          <div class="address-col" slot="address" slot-scope="scope">
            <span class="col-value">{{scope.row.address}}</span>
            <span
              class="copy"
              @click="copy(scope.row.addressLong)">
              <svg class="icon icon-14" aria-hidden="true">
                <use xlink:href="#icon-assets_7"></use>
              </svg>
            </span>
            <div class="long-value v5-5-cl v5-19-bg box-shadow">
              {{scope.row.addressLong}}
            </div>
          </div>
          <!-- 交易ID -->
          <div class="address-col" slot="txid" slot-scope="scope">
            <span class="col-value">{{scope.row.txid}}</span>
            <span
              v-if="scope.row.txidLong"
              class="copy"
              @click="copy(scope.row.txidLong)">
              <svg class="icon icon-14" aria-hidden="true">
                <use xlink:href="#icon-assets_7"></use>
              </svg>
            </span>
            <div v-if="scope.row.txidLong" class="long-value v5-5-cl v5-19-bg box-shadow">
              {{scope.row.txidLong}}
            </div>
          </div>
          <!-- 操作 -->
          <div slot="operation" class="operation" slot-scope="scope">
            <c-v5-button
              type="text"
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
    </template>
    <!-- 复制使用 -->
    <input ref="copyValue" class="copyValue" type="text" :value="copyValue" />
  </section>
</template>
<script>
import mixin from 'BlockChain-ui/PC/common-mixin/newAssets/flowingWater/index';
import 'BlockChain-ui/PC/common-mixin/newAssets/flowingWater/index.styl';
import innovations from './innovations.vue';

export default {
  mixins: [mixin],
  mounted() {
    this.init();
  },
  components: {
    innovations,
  },
};
</script>
