<!-- 币币交易 下单 -->
<template>
  <div class="trade-box trade-box-ex-container b-2-cl">
    <div class="title-block a-21-bg a-3-bd">
      <span class="tab"
        @click="switchTradeType(1)"
        :class="{'a-12-bd b-1-cl': transactionType === 1}">
        <!-- 限价交易 -->
        {{$t('trade.limitPriceTrade')}}
      </span>
      <span class="tab"
        @click="switchTradeType(2)"
        :class="{'a-12-bd b-1-cl': transactionType === 2}">
        <!-- 市价交易 -->
        {{$t('trade.marketPriceTrade')}}
      </span>
      <span class="tab"
        v-if="showUnlockSell"
        @click="switchTradeType(3)"
        :class="{'a-12-bd b-1-cl': transactionType === 3}">
        <!-- 解锁交易 -->
        {{$t('trade.unlockTrade')}}
      </span>
      <span class="tab"
        v-if="gridTradeFlag && showGridFlag"
        @click="switchGrid"
        :class="{'a-12-bd b-1-cl': transactionType === 4}">
        <!-- 网格交易 -->
        {{$t('gridTrade.title')}}
      </span>
      <span class="tab"
        v-if="isEtf"
        @click="etfInfoSwitch(5)"
        :class="{'a-12-bd b-1-cl': transactionType === 5}">
        <!-- 信息披露 -->
        {{$t('etfAdd.infoDisc')}}
      </span>
      <span class="tab"
        v-if="isEtf"
        @click="etfInfoSwitch(6)"
        :class="{'a-12-bd b-1-cl': transactionType === 6}">
        <!-- 调仓记录 -->
        {{$t('etfAdd.adjustRecord')}}
      </span>
      <!-- <div class="total-assets" v-if="accountBalance">
        {{$t('trade.total_money')}}
        <template v-if="totalBalancesHide">******</template>
        <template v-else>{{accountBalance.totalBalance}}</template>
        {{accountBalance.totalBalanceSymbol | getCoinShowName(coinList)}}
        <span class="b-3-cl">≈
          <template v-if="totalBalancesHide">******</template>
          <template v-else>{{totalBalances.totalRater}}</template>
        </span>
        <i class="totalBalancesHide icon"
          @click="handelTotal">
          <svg class="icon icon-16"
              aria-hidden="true"
              v-if="!totalBalancesHide">
              <use xlink:href="#icon-c_9"></use>
          </svg>
          <svg class="icon icon-16"
            v-else
            aria-hidden="true">
            <use xlink:href="#icon-c_10"></use>
          </svg>
        </i>
      </div> -->
    </div>
    <!-- 选择ai或者自定义 -->
    <div class="set_grid_type a-21-bg clearfix" v-if="proTrade && transactionType === 4">
      <!-- 自定义 -->
      <span
        class="tab"
        style=""
        @click="() => this.gridType = 1"
        :class="{'b-1-cl': gridType === 1}">
        <!-- 自定义策略 -->
        {{$t('gridTrade.type1')}}
      </span>
      <!-- ai -->
      <span
        class="tab"
        @click="() => this.gridType = 2"
        :class="{'b-1-cl': gridType === 2}">
        <!-- Ai策略 -->
        {{$t('gridTrade.type2')}}
      </span>
      <p>
        <span class="lov">
          <span class="lovText mr-text">
            {{$t('gridTrade.setText1')}}:
            {{currenTaccount.unitsAccoubt}}
            {{symbolUnit.units | getCoinShowName(coinList)}}
          </span>
          <span class="lovText">{{currenTaccount.symbolAccoubt}}
            {{symbolUnit.symbol | getCoinShowName(coinList)}}
          </span>
        </span>
      </p>
    </div>
    <div class="trade-form" v-if="transactionType === 3">
      <div class="trade-block">
        <div class="form-block">
          <div class="top-mag">
            <!-- 占位 -->
          </div>
          <trade-input
            v-model="formData_5.value"
            @onChanes = "onChaneForm"
            name="formData_5"
            :fixValue = 'fixValue.priceFix'
            :datas="formData_5"/>
          <trade-input
            v-model="formData_6.value"
            @onChanes = "onChaneForm"
            name="formData_6"
            :fixValue = 'fixValue.volumeFix'
            :datas="formData_6"/>
          <c-button
            :defaultColorClass = 'buttosContent.sellButton.class'
            :hoverColorClass = 'buttosContent.sellButton.class'
            :activeColorClass = 'buttosContent.sellButton.class'
            @click="unlockSell"
            height="35px"
            width="100%">
            <!-- 一键解锁卖出 -->
            {{buttosContent.unlockSellButton.text}}
          </c-button>
        </div>
      </div>
      <div class="trade-block">
        <div class="form-block model-info">
          <div class="tit">
            <svg class="icon icon-14 hover_show" aria-hidden="true">
            <use xlink:href="#icon-b_27"></use>
          </svg>
            <!-- 模式说明 -->
            {{$t('trade.modelInfo')}}
          </div>
          <div class="main-text b-1-cl">
            <!-- 模式说明说明 -->
            {{overchargeMsg}}
          </div>
        </div>
      </div>
    </div>
    <div class="trade-form trade-grid" v-else-if="transactionType === 4">
      <template v-if="!proTrade">
        <div class="trade-block">
          <div class="form-block">
            <div class="top-mag">
              <span class="trade-type b-1-cl">
                <!-- 自定义策略 -->
                {{$t('gridTrade.type1')}}：
              </span>
              <span class="lov" v-if="lan === 'zh_CN'">
                <!-- 可用 -->
                {{$t('gridTrade.setText1')}}:
                <span class="lovText">
                  {{currenTaccount.unitsAccoubt}}
                </span>
                <span class="mr-text">
                  {{symbolUnit.units | getCoinShowName(coinList)}}
                </span>
                <span class="lovText">{{currenTaccount.symbolAccoubt}}
                </span>
                {{symbolUnit.symbol | getCoinShowName(coinList)}}
              </span>
            </div>
            <p class="lov_val" v-if="lan !== 'zh_CN'">
                <!-- 可用 -->
                <span class="lovText mr-text">{{$t('gridTrade.setText1')}}:
                  {{currenTaccount.unitsAccoubt}}
                    {{symbolUnit.units | getCoinShowName(coinList)}}
                </span>
                <span class="lovText">{{currenTaccount.symbolAccoubt}}
                      {{symbolUnit.symbol | getCoinShowName(coinList)}}
                </span>
              </p>
            <!-- 价格区间 -->
            <p style="lineHeight: 16px;">{{$t('gridTrade.setText2')}}: </p>
            <div class="input-inline-box clearfix">
              <div class="input-inline-item">
                <grid-trade-input
                  v-model="gridSetMin.value"
                  @onChanes="onChaneForm"
                  name="gridSetMin"
                  :fixValue='fixValue.priceFix'
                  :placeText="$t('gridTrade.setText3')"
                  :datas="gridSetMin"/>
              </div>
              <b class="a-3-bd"></b>
              <div class="input-inline-item">
                <grid-trade-input
                  v-model="gridSetMax.value"
                  @onChanes="onChaneForm"
                  name="gridSetMax"
                  :fixValue='fixValue.priceFix'
                  :placeText="$t('gridTrade.setText4')"
                  :datas="gridSetMax"/>
              </div>
            </div>
            <!-- 网格数量 -->
            <p>{{$t('gridTrade.setText5')}}: </p>
            <div class="input-inline-box clearfix">
              <div class="input-inline-item">
                <grid-trade-input
                  v-model="gridSetNum.value"
                  @onChanes="onChaneForm"
                  name="gridSetNum"
                  :fixValue='fixValue.priceFix'
                  :placeText="'2-100'"
                  :datas="gridSetNum"/>
              </div>
              <div style="width: 28px;"></div>
              <div class="input-inline-item clearfix set-type">
                <div class="set-type-btn"
                :class="setType === 1 ? 'u-8-bd u-8-cl' : 'a-3-bd'" @click="() => this.setType = 1">
                  <!-- 等差网格 -->
                  {{$t('gridTrade.setText6')}}
                </div>
                <div class="set-type-btn"
                :class="setType === 2 ? 'u-8-bd u-8-cl' : 'a-3-bd'" @click="() => this.setType = 2">
                  <!-- 等比网格 -->
                  {{$t('gridTrade.setText7')}}
                </div>
              </div>
            </div>
            <p>
              <!-- 每格利润 -->
              {{$t('gridTrade.setText8')}}
              {{setType === 1 ?
              `${gridSetMinProfits}%～${gridSetMaxProfits}`
              : gridSetMaxProfits}}%({{$t('gridTrade.setText9')}})</p>
            <div class="set-num clearfix">
              <div class="setn-num-list">
                <!-- 投入资产 -->
                <p>{{$t('gridTrade.setText10')}}</p>
                <grid-trade-input
                  v-model="gridSetAccount.value"
                  @onChanes="onChaneForm"
                  name="gridSetAccount"
                  :fixValue='fixValue.priceFix'
                  :datas="gridSetAccount"/>
              </div>
              <div class="setn-num-list">
                <!-- 止损价格 -->
                <p>{{$t('gridTrade.setText12')}}({{$t('gridTrade.optional')}})</p>
                <grid-trade-input
                  v-model="gridSetMinBalance.value"
                  @onChanes="onChaneForm"
                  name="gridSetMinBalance"
                  :fixValue='fixValue.priceFix'
                  :datas="gridSetMinBalance"/>
              </div>
              <div class="setn-num-list">
                <!-- 止盈价格 -->
                <p>{{$t('gridTrade.setText11')}}({{$t('gridTrade.optional')}})</p>
                <grid-trade-input
                  v-model="gridSetMaxBalance.value"
                  @onChanes="onChaneForm"
                  name="gridSetMaxBalance"
                  :fixValue='fixValue.priceFix'
                  :datas="gridSetMaxBalance"/>
              </div>
            </div>
            <div class="set-btc">
              <!-- 使用原有 -->
                <span>
                  {{$t('gridTrade.setText13')}} {{symbolUnit.symbol | getCoinShowName(coinList)}}
                </span>
                <div class="switch-inline">
                  <c-switch :value="gridSetFormFlag"
                  @click="() => this.gridSetFormFlag = !this.gridSetFormFlag"/>
                </div>
              </div>
            <c-button
              @click="gradSub('gradTrad')"
              height="35px"
              width="100%">
              {{gridbuttosContent.gridButton.text}}
            </c-button>
          </div>
        </div>
        <div class="trade-block">
          <div class="form-block">
            <div class="top-mag">
              <span class="trade-type b-1-cl">
                <!-- AI策略： -->
                {{$t('gridTrade.type2')}}：
              </span>
              <span class="lov" v-if="lan === 'zh_CN'">
                <!-- 可用 -->
                {{$t('gridTrade.setText1')}}:
                <span class="lovText">
                  {{currenTaccount.unitsAccoubt}}
                </span>
                <span class="mr-text">
                  {{symbolUnit.units | getCoinShowName(coinList)}}
                </span>
                <span class="lovText">{{currenTaccount.symbolAccoubt}}
                </span>
                {{symbolUnit.symbol | getCoinShowName(coinList)}}
              </span>
            </div>
            <p class="lov_val" v-if="lan !== 'zh_CN'">
                <!-- 可用 -->
                <span class="lovText mr-text">{{$t('gridTrade.setText1')}}:
                  {{currenTaccount.unitsAccoubt}}
                    {{symbolUnit.units | getCoinShowName(coinList)}}
                </span>
                <span class="lovText">{{currenTaccount.symbolAccoubt}}
                      {{symbolUnit.symbol | getCoinShowName(coinList)}}
                </span>
              </p>
            <p class="fee_love">
              <span>
                <!-- 价格区间: -->
                {{$t('gridTrade.setText2')}}:
              </span>
              <b></b>
              <label for="">
                <b>
                  <!-- 七日年化收益率 -->
                  {{$t('gridTrade.aiText1')}}
                </b>
                &nbsp;&nbsp;
                <span class="u-1-cl">
                  {{sevenDay}} %
                </span>
              </label>
            </p>
            <div class="input-inline-box clearfix">
              <div class="input-inline-item">
                <grid-trade-input
                  v-model="gridAiBlance.value"
                  @onChanes="onChaneForm"
                  name="gridAiBlance"
                  :fixValue='fixValue.priceFix'
                  :placeholder="$t('gridTrade.setText2')"
                  :datas="gridAiBlance"/>
              </div>
            </div>
            <!-- 网格数量 -->
            <p>{{$t('gridTrade.setText5')}}: </p>
            <div class="input-inline-box clearfix">
              <div class="input-inline-item">
                <grid-trade-input
                  v-model="gridAiNum.value"
                  @onChanes="onChaneForm"
                  name="gridAiNum"
                  :fixValue='fixValue.priceFix'
                  :placeholder="$t('gridTrade.setText5')"
                  :datas="gridAiNum"/>
              </div>
            </div>
            <!-- 每格利润 {{gridAiMin}}%～{{gridAiMax}}%(已去除手续费) -->
            <p>{{$t('gridTrade.setText8')}}
              {{gridAiMin}}%～{{gridAiMax}}%({{$t('gridTrade.setText9')}})</p>
            <div class="set-num clearfix">
              <div class="setn-num-list">
                <!-- 投入资产 -->
                <p>{{$t('gridTrade.setText10')}}</p>
                <grid-trade-input
                  v-model="gridAiAccount.value"
                  @onChanes="onChaneForm"
                  name="gridAiAccount"
                  :fixValue='fixValue.priceFix'
                  :datas="gridAiAccount"/>
              </div>
              <div class="setn-num-list">
                <!-- 止损价格 -->
                <p>{{$t('gridTrade.setText12')}}({{$t('gridTrade.optional')}})</p>
                <grid-trade-input
                  v-model="gridAiMinBalance.value"
                  @onChanes="onChaneForm"
                  name="gridAiMinBalance"
                  :fixValue='fixValue.priceFix'
                  :datas="gridAiMinBalance"/>
              </div>
              <div class="setn-num-list">
                <!-- 止盈价格 -->
                <p>{{$t('gridTrade.setText11')}}({{$t('gridTrade.optional')}})</p>
                <grid-trade-input
                  v-model="gridAiMaxBalance.value"
                  @onChanes="onChaneForm"
                  name="gridAiMaxBalance"
                  :fixValue='fixValue.priceFix'
                  :datas="gridAiMaxBalance"/>
              </div>
            </div>
            <div class="set-btc">
                <span>
                  {{$t('gridTrade.setText13')}} {{symbolUnit.symbol | getCoinShowName(coinList)}}
                </span>
                <div class="switch-inline">
                  <c-switch :value="gridAiFormFlag"
                  @click="() => this.gridAiFormFlag = !this.gridAiFormFlag"/>
                </div>
              </div>
            <c-button
              @click="gradSub('GridAi')"
              height="35px"
              width="100%">
              {{gridbuttosContent.gridAiButton.text}}
            </c-button>
          </div>
        </div>
      </template>
      <!-- 专业版 -->
      <template v-else>
        <div class="trade-block trade_block_width" v-if="gridType === 1">
          <div class="form-block">
            <p style="lineHeight: 16px;">
              {{$t('gridTrade.setText2')}}:
            </p>
            <div class="input-inline-box clearfix">
              <div class="input-inline-item">
                <grid-trade-input
                  v-model="gridSetMin.value"
                  @onChanes="onChaneForm"
                  name="gridSetMin"
                  :fixValue='fixValue.priceFix'
                  :placeText="$t('gridTrade.setText3')"
                  :datas="gridSetMin"/>
              </div>
              <b class="a-3-bd"></b>
              <div class="input-inline-item">
                <grid-trade-input
                  v-model="gridSetMax.value"
                  @onChanes="onChaneForm"
                  name="gridSetMax"
                  :fixValue='fixValue.priceFix'
                  :placeText="$t('gridTrade.setText4')"
                  :datas="gridSetMax"/>
              </div>
            </div>
            <p>{{$t('gridTrade.setText5')}}: </p>
            <div class="input-inline-box clearfix">
              <div class="input-inline-item">
                <grid-trade-input
                  v-model="gridSetNum.value"
                  @onChanes="onChaneForm"
                  name="gridSetNum"
                  :fixValue='fixValue.priceFix'
                  :placeText="'2-100'"
                  :datas="gridSetNum"/>
              </div>
              <div style="width: 28px;"></div>
              <div class="input-inline-item clearfix set-type">
                <div class="set-type-btn"
                :class="setType === 1 ? 'u-8-bd u-8-cl' : 'a-3-bd'" @click="() => this.setType = 1">
                  {{$t('gridTrade.setText6')}}
                </div>
                <div class="set-type-btn"
                :class="setType === 2 ? 'u-8-bd u-8-cl' : 'a-3-bd'" @click="() => this.setType = 2">
                  {{$t('gridTrade.setText7')}}
                </div>
              </div>
            </div>
            <p>{{$t('gridTrade.setText8')}}
              {{setType === 1 ? `${gridSetMinProfits}%～${gridSetMaxProfits}`
              : gridSetMaxProfits}}%({{$t('gridTrade.setText9')}})</p>
            <div class="set-num clearfix">
              <div class="setn-num-list">
                <p>{{$t('gridTrade.setText10')}}</p>
                <grid-trade-input
                  v-model="gridSetAccount.value"
                  @onChanes="onChaneForm"
                  name="gridSetAccount"
                  :fixValue='fixValue.priceFix'
                  :datas="gridSetAccount"/>
              </div>
              <div class="setn-num-list">
                <p>{{$t('gridTrade.setText12')}}({{$t('gridTrade.optional')}})</p>
                <grid-trade-input
                  v-model="gridSetMinBalance.value"
                  @onChanes="onChaneForm"
                  name="gridSetMinBalance"
                  :fixValue='fixValue.priceFix'
                  :datas="gridSetMinBalance"/>
              </div>
              <div class="setn-num-list">
                <p>{{$t('gridTrade.setText11')}}({{$t('gridTrade.optional')}})</p>
                <grid-trade-input
                  v-model="gridSetMaxBalance.value"
                  @onChanes="onChaneForm"
                  name="gridSetMaxBalance"
                  :fixValue='fixValue.priceFix'
                  :datas="gridSetMaxBalance"/>
              </div>
            </div>
            <div class="set-btc">
                <span>
                  {{$t('gridTrade.setText13')}} {{symbolUnit.symbol | getCoinShowName(coinList)}}
                </span>
                <div class="switch-inline">
                  <c-switch :value="gridSetFormFlag"
                  @click="() => this.gridSetFormFlag = !this.gridSetFormFlag"/>
                </div>
              </div>
            <c-button
              @click="gradSub('gradTrad')"
              height="35px"
              width="100%">
              {{gridbuttosContent.gridButton.text}}
            </c-button>
          </div>
        </div>
        <div class="trade-block trade_block_width" v-if="gridType === 2">
          <div class="form-block">
            <p class="fee_love">
              <span>
                {{$t('gridTrade.setText2')}}:
              </span>
              <b></b>
              <label for="">
                <b>
                  {{$t('gridTrade.aiText1')}}
                </b>
                &nbsp;&nbsp;
                <span class="u-1-cl">
                  {{sevenDay}} %
                </span>
              </label>
            </p>
            <div class="input-inline-box clearfix">
              <div class="input-inline-item">
                <grid-trade-input
                  v-model="gridAiBlance.value"
                  @onChanes="onChaneForm"
                  name="gridAiBlance"
                  :fixValue='fixValue.priceFix'
                  :placeholder="$t('gridTrade.setText2')"
                  :datas="gridAiBlance"/>
              </div>
            </div>
            <p>{{$t('gridTrade.setText5')}}: </p>
            <div class="input-inline-box clearfix">
              <div class="input-inline-item">
                <grid-trade-input
                  v-model="gridAiNum.value"
                  @onChanes="onChaneForm"
                  name="gridAiNum"
                  :fixValue='fixValue.priceFix'
                  :placeholder="$t('gridTrade.setText5')"
                  :datas="gridAiNum"/>
              </div>
            </div>
            <p>{{$t('gridTrade.setText8')}}
              {{gridAiMin}}%～{{gridAiMax}}%({{$t('gridTrade.setText9')}})</p>
            <div class="set-num clearfix">
              <div class="setn-num-list">
                <p>{{$t('gridTrade.setText10')}}</p>
                <grid-trade-input
                  v-model="gridAiAccount.value"
                  @onChanes="onChaneForm"
                  name="gridAiAccount"
                  :fixValue='fixValue.priceFix'
                  :datas="gridAiAccount"/>
              </div>
              <div class="setn-num-list">
                <p>{{$t('gridTrade.setText12')}}({{$t('gridTrade.optional')}})</p>
                <grid-trade-input
                  v-model="gridAiMinBalance.value"
                  @onChanes="onChaneForm"
                  name="gridAiMinBalance"
                  :fixValue='fixValue.priceFix'
                  :datas="gridAiMinBalance"/>
              </div>
              <div class="setn-num-list">
                <p>{{$t('gridTrade.setText11')}}({{$t('gridTrade.optional')}})</p>
                <grid-trade-input
                  v-model="gridAiMaxBalance.value"
                  @onChanes="onChaneForm"
                  name="gridAiMaxBalance"
                  :fixValue='fixValue.priceFix'
                  :datas="gridAiMaxBalance"/>
              </div>
            </div>
            <div class="set-btc">
                <span>
                 {{$t('gridTrade.setText13')}}{{symbolUnit.symbol | getCoinShowName(coinList)}}
                </span>
                <div class="switch-inline">
                  <c-switch :value="gridAiFormFlag"
                  @click="() => this.gridAiFormFlag = !this.gridAiFormFlag"/>
                </div>
              </div>
            <c-button
              @click="gradSub('GridAi')"
              height="35px"
              width="100%">
              {{gridbuttosContent.gridAiButton.text}}
            </c-button>
          </div>
        </div>
      </template>
    </div>
    <!-- 信息披露 -->
    <div class="etf-infoDisclosure" v-else-if="transactionType === 5">
      <ul>
        <li class="info-item">
          <span class="x-2-cl">{{ $t('etfAdd.infoDiscObj.marketName')}}</span>
          <b class="b-1-cl">{{ etfDisclosure.marketName }}</b>
        </li>
        <li class="info-item">
          <span class="x-2-cl">{{ $t('etfAdd.infoDiscObj.lever')}}</span>
          <b class="b-1-cl">
            {{ etfDisclosure.maxLeverValue }} / {{ etfDisclosure.realLeverValue }}
          </b>
        </li>
        <li class="info-item">
          <span class="x-2-cl">{{ $t('etfAdd.infoDiscObj.netValue') }}</span>
          <b class="b-1-cl">{{ etfDisclosure.price }}</b>
        </li>
        <li class="info-item">
          <span class="x-2-cl">{{ $t('etfAdd.infoDiscObj.timing') }}</span>
          <b class="b-1-cl">{{ $t('etfAdd.infoDiscObj.timingRuleText') }}</b>
        </li>
        <li class="info-item">
          <span class="x-2-cl">{{ $t('etfAdd.infoDiscObj.irregular') }}</span>
          <b class="b-1-cl">
            {{ $t('etfAdd.infoDiscObj.irregularRuleText',
              { maxLeverValue: etfDisclosure.maxLeverValue }
            ) }}
          </b>
        </li>
        <li class="info-item">
          <span class="x-2-cl">{{ $t('etfAdd.infoDiscObj.funRate') }}</span>
          <b class="b-1-cl">{{ fundRate }}%</b>
        </li>
      </ul>
    </div>
    <!-- 调仓信息 -->
    <div
     class="etf-adjustRecord a-7-bg"
     v-else-if="transactionType === 6"
     :style="showGridFlag && lan !== 'zh_CN'
        ? 'height: 375px'
        : showGridFlag && lan === 'zh_CN' ? 'height: 350px' : 'height: 230px'"
    >
      <vue-scroll>
          <c-table
            :dataList='etfAdjustRecord'
            :imgMap="imgMap"
            :colorMap="colorMap"
            :columns="columns"
            :classes="'a-7-bg'"
            :headHeight="50"
            :bodyClasses="'etf-adjustRecord_table--body'"
           />
           <c-pagination v-if="paginationObj.total > paginationObj.display"
            :total='paginationObj.total'
            :display='paginationObj.display'
            :currentPage='paginationObj.currentPage'
            @pagechange="pagechange"/>
        </vue-scroll>
    </div>
    <div class="trade-form" v-else>
      <div class="trade-block">
        <div class="form-block">
          <div class="top-mag" :class="gridTradeFlag && showGridFlag ? 'top-mag-line' : ''">
            <span class="trade-type">
            <!-- 买入 -->
            {{$t('trade.buy')}}
            {{symbolUnit.symbol | getCoinShowName(coinList)}}
          </span>
            <span class="lov b-1-cl">
              <c-button type="text" className="lovButton"
                v-if="this.isLogin && currenTaccount.unitsOpen.toString() === '1'"
                @click="goCz(symbolUnit.units)">{{ $t('manageFinances.goRecharge') }}</c-button>
              <span class="lovText">{{currenTaccount.unitsAccoubt}}
                {{symbolUnit.units | getCoinShowName(coinList)}}
              </span>
            </span>
          </div>
          <trade-input
            v-model="formData_1.value"
            :fixValue = 'fixValue.priceFix'
            @onChanes = "onChaneForm"
            name="formData_1"
            :datas="formData_1"/>
          <trade-input
            v-model="formData_2.value"
            :fixValue = 'formData2Fix'
            @onChanes = "onChaneForm"
            name="formData_2"
            :datas="formData_2"/>
          <div class="percentage">
            <span
              v-for="(item, index) in perArr"
              :key="index + 'buy'"
              :class="perBuyClass(item)"
              @click="setPerNumber('buy', item)"
              class="per-item">{{item}}%</span>
          </div>
          <div class="volume-trade"
           :class="gridTradeFlag && showGridFlag ? 'volume-trade-line' : ''">
            <div v-if="transactionType === 1">
              <!-- 交易额: -->
              {{$t('trade.dealMoney')}}
              <span class="vol"
                    v-if="tradeVolumeBuy !== '--'">
                    {{tradeVolumeBuy}}
                    {{symbolUnit.units | getCoinShowName(coinList)}}
              </span>
            </div>
          </div>
          <c-button
            :defaultColorClass = 'buttosContent.buyButton.class'
            :hoverColorClass = 'buttosContent.buyButton.class'
            :activeColorClass = 'buttosContent.buyButton.class'
            @click="confirmSubmit('BUY')"
            height="35px"
            width="100%">
            {{buttosContent.buyButton.text}}
          </c-button>
        </div>
      </div>
      <div class="trade-block">
        <div class="form-block">
          <div class="top-mag"  :class="gridTradeFlag && showGridFlag ? 'top-mag-line' : ''">
            <span class="trade-type">
              <!-- 卖出 -->
              {{$t('trade.sell')}}
              {{symbolUnit.symbol | getCoinShowName(coinList)}}
            </span>
            <span class="lov b-1-cl">
              <c-button type="text" className="lovButton"
                v-if="this.isLogin && currenTaccount.symbolOpen.toString() === '1'"
                @click="goCz(symbolUnit.symbol)">{{ $t('manageFinances.goRecharge') }}</c-button>
              <span class="lovText">{{currenTaccount.symbolAccoubt}}
              {{symbolUnit.symbol | getCoinShowName(coinList)}}
            </span>
            </span>
          </div>
          <trade-input
            v-model="formData_3.value"
            @onChanes = "onChaneForm"
            name="formData_3"
            :fixValue = 'fixValue.priceFix'
            :datas="formData_3"/>
          <trade-input
            v-model="formData_4.value"
            @onChanes = "onChaneForm"
            name="formData_4"
            :fixValue = 'fixValue.volumeFix'
            :datas="formData_4"/>
          <div class="percentage">
            <span
              v-for="(item, index) in perArr"
              :key="index + 'sell'"
              @click="setPerNumber('sell', item)"
              class="per-item"
              :class="perSellClass(item)">{{item}}%</span>
          </div>
          <div class="volume-trade"
          :class="gridTradeFlag && showGridFlag ? 'volume-trade-line' : ''">
            <div v-if="transactionType === 1" class="volume-trade-opt">
              <!-- 交易额: -->
              {{$t('trade.dealMoney')}}
              <span class="vol"
                    :class="volumeTradeClass(tradeVolumeSell, currenTaccount.symbolAccoubt)"
                    v-if="tradeVolumeSell !== '--'">
                    {{tradeVolumeSell}}
                    {{symbolUnit.units | getCoinShowName(coinList)}}
              </span>
              <!-- 解锁卖出 -->
             <!--  <c-button v-if="showUnlockSell"
                @click="unlockSell"
                type="text" className="volume-trade-opt-sell">
                解锁卖出
              </c-button> -->
            </div>
          </div>
          <c-button
            :defaultColorClass = 'buttosContent.sellButton.class'
            :hoverColorClass = 'buttosContent.sellButton.class'
            :activeColorClass = 'buttosContent.sellButton.class'
            @click="confirmSubmit('SELL')"
            height="35px"
            width="100%">
            {{buttosContent.sellButton.text}}
          </c-button>
        </div>
      </div>
    </div>
    <!-- 未认证 提示框 -->
    <c-alert :showFlag="isShowDialog"
        :buttonText="$t('otcRelease.DeCertification')"
        :imgMap="imgMap"
        @close="dialogClose"
        @confirm="gotoAuth">
      <div class="ts-content-text">
        <span v-if="tsTexttype === 1">{{$t('personal.exccAuthForm.text18')}}</span>
        <span v-else>{{$t('personal.exccAuthForm.text19')}}</span>
      </div>
    </c-alert>
    <c-dialog :showFlag="etfFlag"
      :titleText="$t('etfAdd.dialogTitle')"
      :confirmText="$t('etfAdd.confirmText')"
      :closeText="$t('etfAdd.later')"
      :closeFlag="false"
      @close="localDialogCancel"
      @confirm="localDialogConfirm">
      <div class="trade-noticeDialog">
        <div class="trade-noticeDialog-even">
           {{$t('etfAdd.dText1')}}
        </div>
        <div class="trade-noticeDialog-even">
           {{$t('etfAdd.dText3')}}
        </div>
        <div class="trade-noticeDialog-even">
           {{$t('etfAdd.dText4')}}
           <a class="u-8-cl" :href="etfUrl" target="_blank">{{$t('etfAdd.dText5')}}</a>
        </div>
        <div class="trade-noticeDialog-even">
           {{$t('etfAdd.dText6')}}
        </div>
        <div class="trade-noticeDialog-even">
           {{$t('etfAdd.dText7')}}
        </div>
        <div class="trade-noticeDialog-even">
           {{$t('etfAdd.dText8')}}
        </div>
        <div class="trade-noticeDialog-even" style="margin: 0">
           {{$t('etfAdd.dText9')}}
        </div>
      </div>
    </c-dialog>
    <c-dialog
      :showFlag="isShowEtfKnowledgeDialog"
      @close="closeKnowledgeDialog"
      @confirm="confirmNext"
      :titleText="etfKnowledgeTitle"
      :confirmText="confirmNextText"
      :closeText="$t('etfKnowledgeTest.cancelButton')"
      :confirmDisabled="nextDisabled"
    >
      <div class="knowledgeTest-container b-1-cl" v-if="questions">
        <div class="knowledgeTest-question">{{ questions[questionIndex].question }}</div>
        <ul>
          <li
            class="knowledgeTest-option a-3-bg a-3-bd"
            v-for="(item, index) in questions[questionIndex].options"
            :class="index === answerSelect ? answerClass : ''"
            :key="'KN'+index"
            @click="selectAnswer(index)"
          >
            <span>{{ item }}</span>
            <aside v-show="index === answerSelect">
              <svg
                v-if="answerSelect === etfKnowledgeAnswer[questionIndex]"
                class="icon icon-16"
                aria-hidden="true"
              >
                <use xlink:href="#icon-c_4"></use>
              </svg>
              <svg v-else-if="answerSelect !== null" class="icon icon-16" aria-hidden="true">
                <use xlink:href="#icon-c_5"></use>
              </svg>
            </aside>
          </li>
        </ul>
      </div>
    </c-dialog>
  </div>
</template>
<script>
import mixin from 'BlockChain-ui/PC/common-mixin/modules/trade/tradeForm/ex-tradeForm/ex-tradeForm';
import 'BlockChain-ui/PC/common-mixin/modules/trade/tradeForm/ex-tradeForm/ex-tradeForm.styl';
import tradeInput from './tradeInput.vue';
import GridTradeInput from './GridTradeInput.vue';

export default {
  mixins: [mixin],
  components: {
    tradeInput,
    GridTradeInput,
  },
  mounted() {
    this.init();
    this.createdInit();
  },
  // 组价离开前执行
  beforeDestroy() {
    clearInterval(this.assetsInter);
  },
};

</script>

<style lang="stylus">
.trade-box.trade-box-ex-container .trade_block_width {
  width 100%;
  .trade-input.trade-grid {
    margin-top 6px;
  }
}

.trade-box.trade-box-ex-container .trade-form .top-mag-line {
  height: 40px;
  line-height: 40px;
  .lov {
    line-height: 40px;
  }
}
.trade-box.trade-box-ex-container .trade-form .volume-trade-line {
      height: 44px;
    line-height: 44px;
}

.trade-box p {
  margin-bottom 0;
}
.trade-box .lov_val {
  margin-bottom: 10px;
}
.trade-box label {
  margin-bottom 0;
}
.set_grid_type {
  height 30px;
  font-size 12px;
  line-height 30px;
  padding 0 30px;
  margin-bottom 10px;
  >span {
    margin-right 30px;
    float left;
    cursor: pointer;
  }
  p {
    float right;
  }
}
  .mr-text {
    margin-right 10px;
  }
  .trade-box.trade-box-ex-container .trade-grid .top-mag .lov {
    display: flex;
    align-items: center;
    height: 42px;
    line-height: 16px;
    justify-content: center;
  }
  .trade-box.trade-box-ex-container .trade-grid .top-mag .lov .lovText {
    vertical-align: middle;
    line-height: 16px;
    display: inline-block;
    word-wrap: break-word;
  }
  .trade-box.trade-box-ex-container .trade-grid .top-mag {
    height: 42px;
    line-height: 42px;
  }
  .input-inline-box {
    display flex;
    align-items: center;
    justify-content space-between;
    .input-inline-item {
      flex 1;
    }
    >b {
      display inline-block;
      width 10px;
      margin 0 9px;
      border-bottom-width 2px;
      border-bottom-style solid;
      position relative;
      top -2px;
    }
  }
  .set-type {
    margin-bottom: 6px;
  }
  .set-type-btn {
    cursor pointer;
    height 35px;
    display inline-block;
    width 45%;
    border-radius: 2px;
    border-width: 1px;
    border-style: solid;
    margin-right 5%;
    box-sizing border-box;
    float left;
    line-height 35px;
    text-align center;
  }
  .set-type-btn:nth-child(2) {
    float right;
    margin-right 0;
  }
  .set-num {
    margin-top 14px;
    .setn-num-list {
      width 33.33%;
      float left;
      padding-right 10px;
      box-sizing: border-box;
      .trade-input.trade-input-china-container .input-item {
        padding 8px 10px 0 15px;
        .inputs {
          width 62%;
        }
        .units {
          right 10px;
        }
      }
    }
    .setn-num-list:last-child {
      padding-right 0;
    }
  }
  .set-btc {
    margin-bottom 10px;
  }
  .switch-inline {
    margin-left 40px;
    display inline-block;
    vertical-align: middle;
  }
  .fee_love {
    display flex;
    justify-content space-between;
    align-items center;
    width: 100%;
    label {
      display: flex;
      align-items: center;
      >span {
        font-size: 16px;
        line-height 16px;
      }
    }
  }
  .en_US .trade-box.trade-box-ex-container .trade-grid .top-mag {
    margin-bottom 2px;
  }
</style>
