<template>
  <section class="v5-page-leverafeToLoan">
    <div class="toLoan-form fuz-card-plain">
      <header class="toLoan-header v5-5-cl">
        <svg class="icon icon-20" aria-hidden="true" @click="goBack">
          <use xlink:href="#icon-v5_36"></use>
        </svg>
        <span>{{ $t('assets.leverageToLoan.title') }}</span>
      </header>
      <div class="toLoan-details" v-if="Object.keys(messData).length">
        <div class="details-left">
          <div class="symbol v5-5-cl">{{ getShowSymbol(messData.name) }}</div>
          <div class="numberList">
            <ul class="numberList-key">
              <!-- 基础货币可用 -->
              <li>{{$t('assets.leverageToLoan.can')}} {{ getShowCoin(messData.baseCoin) }}</li>
              <!-- 计价货币可用 -->
              <li>{{$t('assets.leverageToLoan.can')}} {{ getShowCoin(messData.quoteCoin) }}</li>
            </ul>
            <ul class="numberList-value v5-5-cl">
              <li>
                <span class="text">{{ messData.baseNormalBalance | fixDFn(this, 'base') }}</span>
                <!-- 转入 -->
                <c-v5-button
                  type="text"
                  height="16px"
                  className="even-button"
                  @click="transfer(messData.baseCoin)">
                  {{$t('assets.leverageToLoan.transfer')}}</c-v5-button>
              </li>
              <li>
                <span class="text">{{ messData.quoteNormalBalance | fixDFn(this, 'quote') }}</span>
                <!-- 转入 -->
                <c-v5-button
                  type="text"
                  height="16px"
                  className="even-button"
                  @click="transfer(messData.quoteCoin )">
                  {{$t('assets.leverageToLoan.transfer')}}</c-v5-button>
              </li>
            </ul>
          </div>
          <div class="details-warking b-7-cl">
            <!-- 当风险率≤110%时，账户将触发爆仓以归还借贷资金 -->
            <svg class="icon icon-12" aria-hidden="true" style="marginRight: 4px">
              <use xlink:href="#icon-c_2"></use>
            </svg>{{$t('assets.leverageToLoan.warning')}}
          </div>
        </div>
        <div class="cut-line v5-12-bg"></div>
        <div class="details-right">
          <!-- 选择币种 -->
          <div class="coinType">
            <div class="form-title v5-6-cl">
              {{$t('assets.leverageToLoan.ToLoan')}}{{$t('assets.leverageToLoan.list3')}}
            </div>
            <ul class="coin-list">
              <li
                class="list-item"
                :class="{
                  'u-16-cl v5-1-bg': broCoin === messData.baseCoin,
                  'v5-9-bg': broCoin !== messData.baseCoin,
                  'v5-5-cl': coinHover === messData.baseCoin && broCoin !== messData.baseCoin,
                  'v5-6-cl ': messData.baseCoin !== coinHover && messData.baseCoin !== broCoin,
                }"
                @mouseover="coinHover = messData.baseCoin"
                @mouseout="coinHover = null"
                @click="setBroCoin(messData.baseCoin)">
                {{getShowCoin(messData.baseCoin)}}
              </li>
              <li
                class="list-item"
                :class="{
                  'u-16-cl v5-1-bg': broCoin === messData.quoteCoin,
                  'v5-9-bg': broCoin !== messData.quoteCoin,
                  'v5-5-cl': coinHover === messData.quoteCoin && broCoin !== messData.quoteCoin,
                  'v5-6-cl ': messData.quoteCoin !== coinHover && messData.quoteCoin !== broCoin,
                }"
                @mouseover="coinHover = messData.quoteCoin"
                @mouseout="coinHover = null"
                @click="setBroCoin(messData.quoteCoin)">
                {{getShowCoin(messData.quoteCoin)}}
              </li>
            </ul>
          </div>
          <!-- 详细信息 -->
          <ul class="coinDeat">
            <!-- 最大额度 -->
            <li class="v5-9-bg">
              <div class="key">{{$t('assets.leverageToLoan.max')}}</div>
              <div class="value v5-5-cl">
                <!-- {{ broMessage.total | fixDFn(this, broMessage.type) }} -->
                {{ broMessage.total | fixDFnTwo(8) }}
              </div>
            </li>
            <!-- 已借 -->
            <li class="v5-9-bg">
              <div class="key">{{$t('assets.leverageToLoan.borrowed')}}</div>
              <div class="value v5-5-cl">
                <!-- {{ broMessage.borrowed | fixDFn(this, broMessage.type) }} -->
                {{ broMessage.borrowed | fixDFnTwo(8) }}
              </div>
            </li>
            <!-- 利率 -->
            <li class="v5-9-bg">
              <div class="key">
                {{ $t('assets.leverageToLoan.rate') }}
                <div
                  class="tolanIcon"
                  @mouseover="iconHover = true"
                  @mouseout="iconHover = false">
                  <svg v-if="!iconHover" class="icon icon-12 icon-mark" aria-hidden="true">
                    <use xlink:href="#icon-assets_6"></use>
                  </svg>
                  <svg v-if="iconHover" class="icon icon-12" aria-hidden="true">
                    <use xlink:href="#icon-assets_6_h"></use>
                  </svg>
                  <!-- 利率是申请借贷时系统收取利息的比例，利息是按照24小时计息 -->
                  <c-popover
                    :show="iconHover"
                    id="popover"
                    :content="$t('assets.leverageToLoan.rateMark')"
                    parent=".icon-mark">
                  </c-popover>
                </div>
              </div>
              <div class="value v5-5-cl">{{ messData.rate | rateFix }}</div>
            </li>
          </ul>
          <div class="borrow-num">
            <!-- 借贷数量 -->
            <c-v5-input
              name="broNum"
              width="378px"
              :promptText="$t('assets.leverageToLoan.number')"
              promptClass="v5-6-cl"
              :errorHave="true"
              :value="broNum"
              @onChanges="inputChange"
              :errorFlag="broErrorObj.showError"
              :errorText="broErrorObj.text"
              :warningText="broWarningText">
              <!-- 全部 -->
              <div slot="append">
                <c-v5-button type="text" @click="allBro">
                  {{ $t('assets.otcAccount.all') }}
                </c-v5-button>
              </div>
            </c-v5-input>
          </div>
          <div class="submit-btn">
            <!-- 提现按钮 -->
            <c-v5-button
              width="378px"
              height="40px"
              @click="broClick"
              :loading="btnLoading"
              :disabled="btnDisabled">{{ $t('assets.leverageToLoan.ToLoan') }}</c-v5-button>
          </div>
        </div>
      </div>
    </div>
    <!-- 最近借贷记录 -->
    <div class="toLoanRecord v5-5-cl fuz-card">
      <div class="toLoanRecord-title fuz-card-title">
        <span class="title-text">
          {{ $t('assets.leverageToLoan.listTitle') }}
          <span class="title-line v5-1-bg fuz-none"></span>
        </span>
        <span class="all-record v5-1-cl" @click="lookAll">{{$t('assets.otcAccount.all')}}</span>
      </div>
      <div class="toLoan-table">
        <c-v5-table
          :imgMap="imgMap"
          :colorMap="colorMap"
          :loading="tabelLoading"
          :bodyHeight="420"
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
          <!-- 操作 -->
          <div slot="operation" class="operation" slot-scope="scope">
            <c-v5-button
              type="text"
              class="operation-btn"
              v-for="(item, index) in scope.row.operation"
              :key="index"
              paddingW="0"
              @click="tableClick(item.type, scope.row.id)">
              {{item.text}}
            </c-v5-button>
          </div>
        </c-v5-table>
        <c-v5-pagination
          v-if="paginationObj.total > paginationObj.display"
          :total='paginationObj.total'
          :display='paginationObj.display'
          :currentPage='paginationObj.currentPage'
          @pagechange="pagechange"/>
      </div>
    </div>
    <leverageTransfer
      @success="transferSuccess"
      @showLoading="showLoading"
      :leverMap="leverMap"/>
    <leverageRepayment @success="repaymentSuccess"/>
    <div v-show="loading" class="assets-loading">
      <c-loading size="50" />
    </div>
  </section>
</template>
<script>
import mixin from 'BlockChain-ui/PC/common-mixin/newAssets/leverageToLoan/index';
import 'BlockChain-ui/PC/common-mixin/newAssets/leverageToLoan/index.styl';
import leverageTransfer from './leverageTransfer.vue';
import leverageRepayment from './leverageRepayment.vue';

export default {
  mixins: [mixin],
  components: {
    leverageTransfer,
    leverageRepayment,
  },
  mounted() {
    this.init();
  },
};
</script>
