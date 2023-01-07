<template>
  <section class="v5-page-otcAccount">
    <!-- 法币账户 -->
    <div class="total-assets fuz-card-plain">
      <h2 class="title">
        <span class="v5-5-cl">{{$t('assets.index.otcAccount')}}</span>
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
            {{totalBalance | thousands}}&nbsp;{{getShowCoin(totalBalanceSymbol)}}
          </span>
          <span class="v5-6-cl fiatNum">
            &nbsp;≈&nbsp;{{totalRate | thousands}}&nbsp;{{userCurrency}}
          </span>
        </div>
        <div v-else class="num-hide v5-5-cl"><span>********</span></div>
      </div>
      <div class="funcButton-list">
        <!-- 买币 -->
        <c-v5-button
          type="hollow"
          height="32px"
          paddingW="18px"
          :defaultColorClass="colorList_1[0]"
          :hoverColorClass="colorList_1[1]"
          :activeColorClass="colorList_1[2]"
          @click="operation('buy')">
          {{$t('assets.otcAccount.buy')}}
        </c-v5-button>
         <!-- 卖币 -->
        <c-v5-button
          type="hollow"
          height="32px"
          paddingW="18px"
          :defaultColorClass="colorList_1[0]"
          :hoverColorClass="colorList_1[1]"
          :activeColorClass="colorList_1[2]"
          @click="operation('sell')">
          {{$t('assets.otcAccount.sell')}}
        </c-v5-button>
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
    <div class="otcAccount-list fuz-card-plain">
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
      <div class="otcAccount-center">
        <c-v5-table
          :loading="tabelLoading"
          :imgMap="imgMap"
          :colorMap="colorMap"
          :columns="columns"
          :dataList="dataListFilter">
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
          <template slot="normal" slot-scope="scope">
            <div v-if="isHide">********</div>
            <ul v-else>
              <li>{{scope.row.normal | thousands}}</li>
              <li v-if="scope.row.showUnlockSell">{{scope.row.overcharge}}</li>
            </ul>
          </template>
          <template slot="freeze" slot-scope="scope">
             <div v-if="isHide">********</div>
             <div v-else>
              {{scope.row.freeze}}
             </div>
          </template>
          <div slot="operation" slot-scope="scope">
            <c-v5-button
              class="operation-button"
              type="text"
              paddingW="0"
              @click="tableClick(scope.row)"
            >{{scope.row.operation}}</c-v5-button>
          </div>
        </c-v5-table>
      </div>
    </div>
    <!-- 划转 -->
    <c-v5-dialog
      :showFlag="showTransfer"
      :titleText="$t('assets.otcAccount.CapitalTransfer')"
      :confirmText="$t('assets.leverageAccount.transfer')"
      :confirmDisabled="transferDisabled"
      size="large"
      @close="closeTransfer"
      @confirm="confirmTransfer">
      <div class="transfer-form">
        <!-- 账户 -->
        <div class="transfer-account" :class="{ 'reverse': transferSide === 2 }">
          <div class="exchange account-side">
            <c-v5-input
              width="184px"
              name="exchangeAccount"
              :readonly="true"
              :value="$t('assets.index.exchangeAccount')">
              <div class="v5-6-cl" slot="promptExtend">
                {{transferSide === 1 ? $t('assets.otcAccount.from') : $t('assets.otcAccount.to')}}
              </div>
            </c-v5-input>
              <div class="available v5-6-cl">
                {{$t('assets.otcAccount.Available')}}:
                {{exchangeAvailable | thousands}}&nbsp;{{transferCoin}}
              </div>
          </div>
          <div class="change-icon">
            <svg class='icon icon-24' aria-hidden='true' @click="changeTransferSide">
              <use xlink:href='#icon-assets_9'></use>
            </svg>
          </div>
          <div class="other account-side">
            <c-v5-input width="184px" :readonly="true" :value="$t('assets.index.otcAccount')">
              <div class="v5-6-cl" slot="promptExtend">
                {{transferSide === 2 ? $t('assets.otcAccount.from') : $t('assets.otcAccount.to')}}
              </div>
            </c-v5-input>
              <div class="available v5-6-cl">
                {{$t('assets.otcAccount.Available')}}:
                {{otherAvailable | thousands}}&nbsp;{{transferCoin}}
              </div>
          </div>
        </div>
        <!-- 币种 -->
        <div class="transfer-coin">
          <c-v5-select
            width="100%"
            name="transferCoin"
            :imgMap="imgMap"
            :options="otcCoinList"
            :filterable="true"
            :value="transferCoin"
            @onChanges="selectChange">
            <div class="v5-6-cl" slot="promptExtend">
              {{$t('assets.otcAccount.coin')}}
            </div>
          </c-v5-select>
        </div>
        <div class="transfer-num">
          <c-v5-input
            width="100%"
            name="transferNum"
            :placeholder="$t('trade.pleaseInput') + $t('assets.otcAccount.volume')"
            :value="transferNum"
            :clearable="true"
            :errorFlag="transferError"
            :errorText="$t('assets.otcAccount.volumeError')"
            :warningText="transferWarningText"
            @onChanges="inputChange">
            <div class="v5-6-cl" slot="promptExtend">
              {{$t('assets.otcAccount.volume')}}
            </div>
            <span
              class="transfer-all v5-1-cl"
              slot="append"
              @click="transferAll">{{$t('assets.otcAccount.all')}}</span>
          </c-v5-input>
        </div>
      </div>
    </c-v5-dialog>
    <div v-show="transferLoading" class="assets-loading">
      <c-loading size="50" />
    </div>
  </section>
</template>
<script>
import mixin from 'BlockChain-ui/PC/common-mixin/newAssets/otcAccount/index';
import 'BlockChain-ui/PC/common-mixin/newAssets/otcAccount/index.styl';

export default {
  mixins: [mixin],
  mounted() {
    this.init();
  },
};
</script>
