<template>
  <section class="v5-page-leverAccount">
    <div class="total-assets fuz-card-plain">
      <h2 class="title">
        <span class="v5-5-cl">{{$t('assets.index.leverage')}}</span>
        <span
          class="hide-assets v5-9-bg"
          @click="hideAssets">
          <svg v-if="isHide" class="icon icon-12" aria-hidden="true">
            <use xlink:href="#icon-assets_13"></use>
          </svg>
          <svg v-else class="icon icon-12" aria-hidden="true">
            <use xlink:href="#icon-assets_12"></use>
          </svg>
        </span>
      </h2>
      <div class="folded-text">
        {{$t('assets.exchangeAccount.TotalAssets')}}
      </div>
      <div class="folded-num">
        <div v-if="!isHide" class="num-display">
          <span class="v5-5-cl btcNum">
            {{totalBalance | thousands}}&nbsp;{{showTotalBalanceSymbol}}
          </span>
          <span class="v5-6-cl fiatNum">
            &nbsp;≈&nbsp;{{totalRate | thousands}}&nbsp;{{userCurrency}}
          </span>
        </div>
        <div v-else class="num-hide v5-5-cl"><span>*********</span></div>
      </div>
      <div class="funcButton-list">
        <!-- 划转 -->
        <c-v5-button
          type="hollow"
          height="32px"
          paddingW="18px"
          :defaultColorClass="colorList_1[0]"
          :hoverColorClass="colorList_1[1]"
          :activeColorClass="colorList_1[2]"
          @click="operation('transfer')">
          {{$t('assets.leverageAccount.transfer')}}
        </c-v5-button>
        <!-- 资金流水 -->
        <c-v5-button
          type="hollow"
          height="32px"
          paddingW="18px"
          :defaultColorClass="colorList_1[0]"
          :hoverColorClass="colorList_1[1]"
          :activeColorClass="colorList_1[2]"
          @click="operation('flowWater')">
          {{$t('assets.index.flowingWater')}}
        </c-v5-button>
      </div>
    </div>
    <div class="leverAccount-list fuz-card">
      <div class="list-header fuz-card-title">
        <!-- 资金列表 -->
        <div class="title v5-5-cl">
          {{ $t("assets.exchangeAccount.ListOfFunds") }}
        </div>
        <div class="hide">
          <!-- 隐藏零资产 -->
          <!-- <c-checkBox fontClass="icon-12" :value="switchFlag" @click="switchChange" /> -->
          <c-switch :value="switchFlag" @click="switchChange"/>
          <span class="hidetext v5-6-cl">{{ $t("assets.hideMinAssets") }}</span>
        </div>
        <div class="find">
          <!-- 搜索币种 -->
          <c-v5-inputFind
            :promptText="$t('assets.exchangeAccount.SearchCurrency')"
            :value="findValue"
            :clearable="true"
            @onChanges="findChanges"
            className="findClass"
          />
        </div>
      </div>
      <div class="leverAccount-center">
        <c-v5-table
          :loading="tabelLoading"
          :imgMap="imgMap"
          :colorMap="colorMap"
          :columns="columns"
          :dataList="dataListFilter">
          <!-- 币种 -->
          <template slot="coin" slot-scope="scope">
            <ul>
              <li>{{scope.row.showBaseCoin}}</li>
              <li>{{scope.row.showQuoteCoin}}</li>
            </ul>
          </template>
          <!-- 总资产 -->
          <template slot="total" slot-scope="scope">
            <div v-if="isHide">********</div>
            <ul v-else>
              <li>{{scope.row.baseTotalBalance}}</li>
              <li>{{scope.row.quoteTotalBalance}}</li>
            </ul>
          </template>
          <!-- 可用 -->
          <template slot="normal" slot-scope="scope">
            <div v-if="isHide">********</div>
            <ul v-else>
              <li>{{scope.row.baseNormalBalance}}</li>
              <li>{{scope.row.quoteNormalBalance}}</li>
            </ul>
          </template>
          <!-- 冻结 -->
          <template slot="freeze" slot-scope="scope">
            <div v-if="isHide">********</div>
            <ul v-else>
              <li>{{scope.row.baseLockBalance}}</li>
              <li>{{scope.row.quoteLockBalance}}</li>
            </ul>
          </template>
          <!-- 已借 -->
          <template slot="borrow" slot-scope="scope">
            <div v-if="isHide">********</div>
            <ul v-else>
              <li>{{scope.row.baseBorrowBalance}}</li>
              <li>{{scope.row.quoteBorrowBalance}}</li>
            </ul>
          </template>
          <!-- 爆仓 -->
          <template slot="burstPrice" slot-scope="scope">
            <div v-if="isHide">********</div>
            <div v-else>{{scope.row.burstPrice}}</div>
          </template>
          <!-- 风险率 -->
          <template slot="risk" slot-scope="scope">
            <div v-if="isHide">********</div>
            <div v-else>{{scope.row.risk}}</div>
          </template>
          <div slot="operation" slot-scope="scope">
            <div
              class="table-btn_item"
              v-for="(item, index) in scope.row.operation"
              :key="index">
              <c-v5-button
                class="operation-button"
                type="text"
                paddingW="0"
                @click="tableClick(item.type, scope.row)"
              >{{item.text}}</c-v5-button>
            </div>
          </div>
        </c-v5-table>
      </div>
    </div>
    <leverageTransfer @success="transferSuccess" @showLoading="showLoading" :leverMap="leverMap" />
    <div v-show="loading" class="assets-loading">
      <c-loading size="50" />
    </div>
  </section>
</template>

<script>
import mixin from 'BlockChain-ui/PC/common-mixin/newAssets/leverageAccount/index';
import 'BlockChain-ui/PC/common-mixin/newAssets/leverageAccount/index.styl';
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
