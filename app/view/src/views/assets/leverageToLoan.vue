<template>
  <section class="page-leverafeToLoan">
    <!-- 借贷 -->
    <header class="withdraw-header b-1-cl a-3-bd">
      {{ $t('assets.leverageToLoan.title') }}
    </header>
    <div class="withdraw-details clearfix a-7-bd"
      v-if="Object.keys(messData).length">
      <div class="details-left">
        <div class="symbol b-1-cl">{{ getShowSymbol(messData.name) }}</div>
        <div class="numberList clearfix">
          <ul class="numberList-key">
            <!-- 基础货币可用 -->
            <li>{{$t('assets.leverageToLoan.can')}} {{ getShowCoin(messData.baseCoin) }}</li>
            <!-- 计价货币可用 -->
            <li>{{$t('assets.leverageToLoan.can')}} {{ getShowCoin(messData.quoteCoin) }}</li>
          </ul>
          <ul class="numberList-value b-1-cl">
            <li>
              <span class="text">{{ messData.baseNormalBalance | fixDFn(this, 'base') }}</span>
              <!-- 转入 -->
              <c-button type="text" height="25px"
                paddingW="10px" className="even-button"
                @click="transfer(messData.baseCoin)">
                {{$t('assets.leverageToLoan.transfer')}}</c-button>
            </li>
            <li>
              <span class="text">{{ messData.quoteNormalBalance | fixDFn(this, 'quote') }}</span>
              <!-- 转入 -->
              <c-button type="text" height="25px"
                paddingW="10px" className="even-button"
                @click="transfer(messData.quoteCoin )">
                {{$t('assets.leverageToLoan.transfer')}}</c-button>
            </li>
          </ul>
        </div>
        <div class="details-warking b-7-cl">
          <svg class="icon icon-16" aria-hidden="true" style="marginRight: 10px">
            <use xlink:href="#icon-c_2"></use>
          </svg>
          <!-- 当风险率≤110%时，账户将触发爆仓以归还借贷资金 -->
          {{$t('assets.leverageToLoan.warning')}}
        </div>
      </div>
      <div class="details-right">
        <!-- 选择币种 -->
        <div class="coinType">
          <div class="even">
            <c-redio :value="broCoin === messData.baseCoin"
              :name="messData.baseCoin"
              @click="setBroCoin"/>
            <span class="coin"
              @click="setBroCoin(messData.baseCoin)">{{ getShowCoin(messData.baseCoin) }}</span>
          </div>
          <div class="even">
            <c-redio :value="broCoin === messData.quoteCoin"
              :name="messData.quoteCoin"
              @click="setBroCoin"/>
            <span class="coin"
              @click="setBroCoin(messData.quoteCoin)">{{ getShowCoin(messData.quoteCoin) }}</span>
          </div>
        </div>
        <!-- 详细信息 -->
        <ul class="coinDeat">
          <!-- 最大额度 -->
          <li class="a-4-bg">
            <span class="key">{{$t('assets.leverageToLoan.max')}}</span>
            <span class="value b-1-cl">
              <!-- {{ broMessage.total | fixDFn(this, broMessage.type) }} -->
              {{ broMessage.total | fixDFnTwo(8) }}
            </span>
          </li>
          <!-- 已借 -->
          <li class="a-4-bg">
            <span class="key">{{$t('assets.leverageToLoan.borrowed')}}</span>
            <span class="value b-1-cl">
              <!-- {{ broMessage.borrowed | fixDFn(this, broMessage.type) }} -->
              {{ broMessage.borrowed | fixDFnTwo(8) }}
            </span>
          </li>
          <!-- 利率 -->
          <li class="a-4-bg">
            <span class="key">{{ $t('assets.leverageToLoan.rate') }}</span>
            <span class="value b-1-cl">{{ messData.rate | rateFix }}</span>
            <span class="tolanIcon">
              <svg class="icon icon-14" aria-hidden="true">
                <use xlink:href="#icon-a_15"></use>
              </svg>
              <div class="iconMark a-4-bg b-1-cl">
                <!-- 利率是申请借贷时系统收取利息的比例，利息是按照24小时计息 -->
                {{ $t('assets.leverageToLoan.rateMark') }}
              </div>
            </span>
          </li>
        </ul>

        <!-- 借贷数量 -->
        <c-inputLine
          name="broNum"
          :promptText="$t('assets.leverageToLoan.number')"
          marginTop="10px"
          :errorHave="true"
          :value="broNum"
          @onchanges="inputChange"
          :errorFlag="broErrorObj.showError"
          :errorText="broErrorObj.text"
          :warningText="broWarningText">
          <!-- 全部 -->
          <c-button type="text" height="30px" @click="allBro">
            {{ $t('assets.otcAccount.all') }}
          </c-button>
        </c-inputLine>
        <!-- 提现按钮 -->
        <c-button width="120px"
          marginTop="32px"
          height="40px"
          @click="broClick"
          :loading="btnLoading"
          :disabled="btnDisabled">{{ $t('assets.leverageToLoan.ToLoan') }}</c-button>
      </div>
    </div>
    <!-- 最近借贷记录 -->
    <header class="withdraw-header b-1-cl a-3-bd">
      {{ $t('assets.leverageToLoan.listTitle') }}
    </header>
    <div class="withdraw-table">
      <c-table
        :imgMap="imgMap"
        :colorMap="colorMap"
        :loading="tabelLoading"
        :columns="columns"
        :dataList="tabelList"
        @elementClick="tableClick"
        :subContent="subContent"
        :subColumns="subColumns"
        :subContentId="subContentId"
        :subLoading="subLoading"
      />
      <c-pagination v-if="paginationObj.total > paginationObj.display"
        :total='paginationObj.total'
        :display='paginationObj.display'
        :currentPage='paginationObj.currentPage'
        @pagechange="pagechange"/>
    </div>
    <leverageTransfer  @success="transferSuccess"/>
    <leverageRepayment @success="repaymentSuccess"/>
  </section>
</template>
<script>
import mixin from 'BlockChain-ui/PC/common-mixin/assets/leverageToLoan/leverageToLoan';
import 'BlockChain-ui/PC/common-mixin/assets/leverageToLoan/leverageToLoan.styl';
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
