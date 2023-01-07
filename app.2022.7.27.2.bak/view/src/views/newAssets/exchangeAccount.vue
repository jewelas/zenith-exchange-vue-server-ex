// Created by 任泽阳 on 18/12/24.
// 资产中心 币币账户页面
<template>
  <section class="v5-page-exchangeAccount">
    <div class="total-assets fuz-card" style="padding: 20px !important;">
      <div class="exchangeAccount-balance">
        <h2 class="title">
          <span class="v5-5-cl">{{$t('assets.index.exchangeAccount')}}</span>
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
          <div v-else class="num-hide v5-5-cl"><span>********</span></div>
        </div>
      </div>
      <div class="yesterday-profit">
        <div
          class="v5-6-cl enter-title"
          @mouseover="showProfitTip = true"
          @mouseout="showProfitTip = false"
          @click="lookPNL">
          <span class="b-2-bd">{{$t('profitAndLoss.yesterdayProfit')}}</span>
          <i class="icon-box v5-9-bg">
            <svg class="icon icon-12" aria-hidden="true">
              <use xlink:href="#icon-v5_3"></use>
            </svg>
            <i v-show="showProfitTip" class="layout"></i>
          </i>
          <transition name="slide-fade">
            <div v-show="showProfitTip" class="profitTip box-shadow v5-5-cl v5-19-bg">
              {{$t('profitAndLoss.yesterdayProfitTip')}}
              <span class="triangle v5-10-bd"></span>
            </div>
          </transition>
        </div>
        <div class="profit-detail v5-5-cl">
          <div v-if="!isHide">
            <span>{{yesterdayProfit}}</span>
            <span :class="profitClass">{{yesterdayProfitRate}}</span>
          </div>
          <div v-else>
            <span>********</span>
            <span>********</span>
          </div>
        </div>
      </div>
      <div class="funcButton-list">
        <!-- 充值 -->
        <c-v5-button
          v-if="depositOpen"
          type="hollow"
          height="32px"
          paddingW="18px"
          :defaultColorClass="colorList_1[0]"
          :hoverColorClass="colorList_1[1]"
          :activeColorClass="colorList_1[2]"
          @click="operation('recharge')">
          {{$t('assets.exchangeAccount.Recharge')}}
        </c-v5-button>
         <!-- 体现 -->
        <c-v5-button
          type="hollow"
          height="32px"
          paddingW="18px"
          :defaultColorClass="colorList_1[0]"
          :hoverColorClass="colorList_1[1]"
          :activeColorClass="colorList_1[2]"
          @click="operation('withdraw')">
          {{$t('assets.exchangeAccount.withdraw')}}
        </c-v5-button>
        <!-- 划转 -->
        <c-v5-button
          v-if="transferList.length"
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
      <div v-if="middlemanConfigOpen" class="buyCoin-creditCard">
        <svg class="icon icon-54" aria-hidden="true">
          <use xlink:href="#icon-assets_18"></use>
        </svg>
        <svg class="icon icon-54" aria-hidden="true">
          <use xlink:href="#icon-assets_19"></use>
        </svg>
        <span class="v5-1-cl" @click="toCreditCard">{{ $t('creditCard.title') }}</span>
      </div>
    </div>
    <div class="exchangeAccount-list fuz-card">
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
      <div class="exchangeAccount-center">
        <c-v5-table
          :loading="tabelLoading"
          :imgMap="imgMap"
          :colorMap="colorMap"
          :columns="columns"
          :dataList="C_data">
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
          <template slot="total" slot-scope="scope">
            <div v-if="isHide">********</div>
            <div v-else>{{scope.row.total | thousands}}</div>
          </template>
          <template slot="normal" slot-scope="scope">
            <div v-if="isHide">********</div>
            <ul v-else>
              <li>{{scope.row.normal | thousands}}</li>
              <li v-if="scope.row.showUnlockSell">{{scope.row.overcharge}}</li>
            </ul>
          </template>
          <template slot="freeze" slot-scope="scope">
            <div v-if="isHide">********</div>
            <div v-else>{{scope.row.freeze}}</div>
          </template>
          <template slot="lock" slot-scope="scope">
            <div v-if="isHide">********</div>
            <ul v-else>
              <li v-for="(item, index) in scope.row.lock" :key="index">{{item}}</li>
            </ul>
          </template>
          <template slot="fold" slot-scope="scope">
            <div v-if="isHide">********</div>
            <div v-else>{{scope.row.fold}}</div>
          </template>
          <div slot="operation" slot-scope="scope">
            <div
              class="table-btn_item"
              v-for="(item, index) in scope.row.operation"
              :key="index"
              @mouseover="tradeSelectShow = item.id"
              @mouseout="tradeSelectShow = null">
              <c-v5-button
                class="operation-button"
                type="text"
                paddingW="0"
                @click="tableClick(item)"
              >{{item.text}}</c-v5-button>
              <transition name="slide-fade">
                <ul
                  v-if="item.selectList && item.selectList.length"
                  v-show="tradeSelectShow === item.id"
                  class="table-selectList v5-10-bg">
                  <li
                    v-for="(val, ind) in item.selectList"
                    :key="val.code + ind"
                    class="table-select_item"
                    :class="{'v5-9-bg': tradeItemHover === item.id + ind}"
                    @mouseover="tradeItemHover = item.id + ind"
                    @mouseout="tradeItemHover = null"
                    @click="toTrade(val)">
                    {{val.value}}
                  </li>
                </ul>
              </transition>
            </div>
          </div>
        </c-v5-table>
      </div>
       <c-v5-pagination
          v-if="paginationObj.total > paginationObj.display"
          :total="paginationObj.total"
          :display="paginationObj.display"
          :currentPage="paginationObj.currentPage"
          @pagechange="pagechange"
        />
    </div>
    <c-alert :showFlag="isShowDialog"
        :buttonText="$t('otcRelease.DeCertification')"
        :imgMap="imgMap"
        @close="dialogClose"
        @confirm="gotoAuth">
      <div class="ts-content-text">
        {{$t('personal.exccAuthForm.text19')}}
      </div>
    </c-alert>
    <!-- 划转 -->
    <c-v5-dialog
      :showFlag="showTransfer"
      :titleText="$t('assets.leverageAccount.transfer')"
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
            <c-v5-select
              type="fill"
              width="184px"
              :imgMap="imgMap"
              name="transferAccount"
              :options="transferList"
              :value="transferAccount"
              @onChanges="selectChange">
              <div class="v5-6-cl" slot="promptExtend">
                {{transferSide === 2 ? $t('assets.otcAccount.from') : $t('assets.otcAccount.to')}}
              </div>
            </c-v5-select>
              <div class="available v5-6-cl">
                {{$t('assets.otcAccount.Available')}}:
                {{otherAvailable | thousands}}&nbsp;{{transferCoin}}
              </div>
          </div>
        </div>
        <!-- 币对 -->
        <div v-if="transferAccount === 'lever'" class="transfer-symbol">
          <c-v5-select
            width="100%"
            name="transferSymbol"
            :imgMap="imgMap"
            :filterable="true"
            :options="symbolList"
            :value="transferSymbol"
            @onChanges="selectChange">
            <div class="v5-6-cl" slot="promptExtend">
              {{$t('order.exchangeOrder.coin')}}
            </div>
          </c-v5-select>
        </div>
        <!-- 币种 -->
        <div class="transfer-coin">
          <c-v5-select
            width="100%"
            name="transferCoin"
            :imgMap="imgMap"
            :options="transferCoinList"
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
import mixin from 'BlockChain-ui/PC/common-mixin/newAssets/exchangeAccount/index';
import 'BlockChain-ui/PC/common-mixin/newAssets/exchangeAccount/index.styl';

export default {
  mixins: [mixin],
  mounted() {
    this.init();
  },
};
</script>
