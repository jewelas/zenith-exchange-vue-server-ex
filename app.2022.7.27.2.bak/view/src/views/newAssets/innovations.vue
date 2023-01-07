<template>
  <section class="v5-page-innovations">
    <!-- 创新实验区 -->
    <div class="flowingWater-table">
      <c-v5-table
        :loading="tabelLoading"
        :imgMap="imgMap"
        :colorMap="colorMap"
        :columns="columns"
        :dataList="tabelList"
        @elementClick = "goViewPage"
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
        <!-- 操作 -->
        <div slot="operation" class="operation" slot-scope="scope">
          <c-v5-button
            type="text"
            paddingW="0"
            @click="goViewPage(scope.row.id)">
            {{scope.row.operation}}
          </c-v5-button>
        </div>
      </c-v5-table>
      <c-v5-pagination v-if="paginationObj.total > paginationObj.display"
        :total='paginationObj.total'
        :display='paginationObj.display'
        :currentPage='paginationObj.currentPage'
        @pagechange="pagechange"/>
    </div>
  </section>
</template>
<script>
import mixin from 'BlockChain-ui/PC/common-mixin/newAssets/innovations/index';
import 'BlockChain-ui/PC/common-mixin/newAssets/innovations/index.styl';

export default {
  mixins: [mixin],
  mounted() {
    this.init();
  },
};
</script>
