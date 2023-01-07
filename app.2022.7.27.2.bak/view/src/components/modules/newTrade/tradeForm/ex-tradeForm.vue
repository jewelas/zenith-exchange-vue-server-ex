<!-- 币币交易 下单 -->
<template>
  <div
    class="newTrade-box newTrade-box-ex-container b-2-cl"
    :class="{'grid-fix': gridFix}"
  >
    <ul v-if="!proTrade" class="tradePage-change_bolck b-2-cl">
      <li
        class="a-4-bg"
        :class="{'b-4-cl a-14-bg': tradePage === '1', 'b-4-cl': tradePageHover === '1'}"
        @click="changeTradePage('1')"
        @mouseover="handleMouseHover('1')"
        @mouseout="handleMouseLeave('1')">
        {{$t('trade5.tradeType1')}}
      </li>
      <!-- <li
        class="a-4-bg"
        :class="{'b-4-cl a-14-bg': tradePage === '2', 'b-4-cl': tradePageHover === '2'}"
        @click="changeTradePage('2')"
        @mouseover="handleMouseHover('2')"
        @mouseout="handleMouseLeave('2')">
        {{$t('trade5.tradeType2')}}
      </li> -->
      <li
        v-if="gridTradeFlag && showGridFlag"
        class="a-4-bg"
        :class="{'b-4-cl a-14-bg': tradePage === '3', 'b-4-cl': tradePageHover === '3'}"
        @click="changeTradePage('3')"
        @mouseover="handleMouseHover('3')"
        @mouseout="handleMouseLeave('3')">
        {{$t('trade5.tradeType3')}}
      </li>
    </ul>
    <div v-if="proTrade" class="order-type">
      <h6 class="b-1-cl">{{$t('trade5.order')}}</h6>
      <div v-if="transactionType !== 4" class="order-transactionType">
        <c-button
          :defaultColorClass = 'transactionButtons.buyButton.defaultClass'
          :hoverColorClass = 'transactionButtons.buyButton.hoverClass'
          :activeColorClass = 'transactionButtons.buyButton.activeClass'
          width="162px"
          height="40px"
          @click="setOrderType('buy')">
          {{$t('trade.buy')}}
        </c-button>
        <c-button
          :defaultColorClass = 'transactionButtons.sellButton.defaultClass'
          :hoverColorClass = 'transactionButtons.sellButton.hoverClass'
          :activeColorClass = 'transactionButtons.sellButton.activeClass'
          width="162px"
          height="40px"
          @click="setOrderType('sell')">
          {{$t('trade.sell')}}
        </c-button>
      </div>
      <!-- 选择ai或者自定义 -->
      <div class="order-transactionType" v-else>
        <c-button
          :defaultColorClass = 'gridTypeButtons.setButton.defaultClass'
          :hoverColorClass = 'gridTypeButtons.setButton.hoverClass'
          :activeColorClass = 'gridTypeButtons.setButton.activeClass'
          width="162px"
          height="40px"
          @click="() => this.gridType = 1">
          <!-- 自定义策略 -->
          {{$t('gridTrade.type1')}}
        </c-button>
        <c-button
          :defaultColorClass = 'gridTypeButtons.aiButton.defaultClass'
          :hoverColorClass = 'gridTypeButtons.aiButton.hoverClass'
          :activeColorClass = 'gridTypeButtons.aiButton.activeClass'
          width="162px"
          height="40px"
          @click="() => this.gridType = 2">
          <!-- Ai策略 -->
          {{$t('gridTrade.type2')}}
        </c-button>
        <!-- <p>
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
        </p> -->
      </div>
    </div>
    <div v-if="transactionType !== 4" class="title-block a-3-bd">
      <div class="tab-wrap">
        <span
          class="tab_line a-12-bg"
          :style="tabLineStyle"
        ></span>
        <span class="tab"
          @click="switchTradeType(1)"
          @mouseover="tradeTypeHover = 1"
          @mouseout="tradeTypeHover = null"
          :class="{'b-1-cl': transactionType === 1 || tradeTypeHover === 1}">
          <!-- 限价交易 -->
          {{$t('trade5.limitPrice')}}
        </span>
        <span class="tab"
          @click="switchTradeType(2)"
          @mouseover="tradeTypeHover = 2"
          @mouseout="tradeTypeHover = null"
          :class="{'b-1-cl': transactionType === 2 || tradeTypeHover === 2}">
          <!-- 市价交易 -->
          {{$t('trade5.marketPrice')}}
        </span>
        <span class="tab"
          v-if="showUnlockSell"
          @click="switchTradeType(3)"
          @mouseover="tradeTypeHover = 3"
          @mouseout="tradeTypeHover = null"
          :class="{'b-1-cl': transactionType === 3 || tradeTypeHover === 3}">
          <!-- 解锁交易 -->
          {{$t('trade.unlockTrade')}}
        </span>
      </div>
      <div v-if="!proTrade" class="buy-coin b-4-cl">
        <c-button type="text" @click="buyCoin">
          {{$t('trade5.buyCoin')}}
        </c-button>
      </div>
      <!-- <span class="tab"
        v-if="gridTradeFlag && showGridFlag"
        @click="switchGrid"
        :class="{'b-1-cl': transactionType === 4}">
        {{$t('gridTrade.title')}}
      </span> -->
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
          <div v-if="!isLogin" class="loginOrReg a-4-bg b-1-cl">
            <span class="b-4-cl" @click="toLogin('login')">{{$t('login.login')}}</span>
            {{$t('trade5.or')}}
            <span class="b-4-cl" @click="toLogin('register')">{{$t('login.goRegister')}}</span>
          </div>
          <c-button
            v-else
            :defaultColorClass = 'buttosContent.sellButton.class'
            :hoverColorClass = 'buttosContent.sellButton.class'
            :activeColorClass = 'buttosContent.sellButton.class'
            @click="unlockSell"
            height="40px"
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
    <div class="trade-form newTrade-grid" v-else-if="transactionType === 4">
      <template v-if="!proTrade">
        <div class="trade-block">
          <div class="form-block">
            <div class="top-mag">
              <span class="trade-type b-1-cl">
                <!-- 自定义策略 -->
                {{$t('gridTrade.type1')}}：
              </span>
              <span class="lov b-1-cl" v-if="lan === 'zh_CN'">
                <!-- 可用 -->
                <!-- {{$t('gridTrade.setText1')}}: -->
                <span class="lovText">
                  {{currenTaccount.unitsAccoubt}}
                </span>
                <span class="mr-text">
                  {{symbolUnit.units | getCoinShowName(coinList)}}
                </span>
                <!-- <span class="lovText">
                  {{currenTaccount.symbolAccoubt}}
                </span> -->
                <!-- {{symbolUnit.symbol | getCoinShowName(coinList)}} -->
              </span>
            </div>
            <p class="lov_val b-1-cl" v-if="lan !== 'zh_CN'">
                <!-- 可用 -->
                <span class="lovText mr-text">
                  {{currenTaccount.unitsAccoubt}}
                    {{symbolUnit.units | getCoinShowName(coinList)}}
                </span>
                <!-- <span class="lovText">{{currenTaccount.symbolAccoubt}}
                      {{symbolUnit.symbol | getCoinShowName(coinList)}}
                </span> -->
              </p>
            <!-- 价格区间 -->
            <div class="input-box">
              <trade-input
                v-model="gridSetMin.value"
                @onChanes="onChaneForm"
                name="gridSetMin"
                :fixValue='fixValue.priceFix'
                :datas="gridSetMin"/>
              <trade-input
                v-model="gridSetMax.value"
                @onChanes="onChaneForm"
                name="gridSetMax"
                :fixValue='fixValue.priceFix'
                :datas="gridSetMax"/>
            </div>
            <!-- 网格数量 -->
            <div class="input-flex-box">
              <trade-input
                v-model="gridSetNum.value"
                @onChanes="onChaneForm"
                name="gridSetNum"
                :fixValue='fixValue.priceFix'
                :placeText="'2-100'"
                :datas="gridSetNum"/>
              <Select
                :value="setType"
                :width="'85px'"
                :options="setTypeOptions"
                @onChanges="setTypeChange"
              />
              <!-- 等差网格 -->
              <!-- 等比网格 -->
              <!-- <div class="newTrade-set-type">
                <div class="set-type-btn"
                :class="setType === 1 ? 'u-8-bd u-8-cl' : 'a-3-bd'" @click="() => this.setType = 1">
                  {{$t('gridTrade.setText6')}}
                </div>
                <div class="set-type-btn"
                :class="setType === 2 ? 'u-8-bd u-8-cl' : 'a-3-bd'" @click="() => this.setType = 2">
                  {{$t('gridTrade.setText7')}}
                </div>
              </div> -->
            </div>
            <p>
              <!-- 每格利润 -->
              {{$t('gridTrade.setText8')}}
              {{setType === 1
                ?`${gridSetMinProfits}%～${gridSetMaxProfits}`
                :gridSetMaxProfits}}%({{$t('gridTrade.setText9')
              }})
            </p>
            <div class="set-num">
              <div class="set-num-input">
                <!-- 投入资产 -->
                <!-- <p>{{$t('gridTrade.setText10')}}</p> -->
                <trade-input
                  v-model="gridSetAccount.value"
                  @onChanes="onChaneForm"
                  name="gridSetAccount"
                  :fixValue='fixValue.priceFix'
                  :datas="gridSetAccount"/>
              </div>
            </div>
            <div class="set-btc">
              <!-- 使用原有 -->
              <div class="switch-inline">
                <c-checkBox
                  :value="priceFixFlag"
                  @click="() => this.priceFixFlag = !this.priceFixFlag"/>
                <span>
                  {{$t('trade5.gridTrade.setText3')}}
                </span>
              </div>
              <div class="switch-inline">
                <c-checkBox
                  :value="gridSetFormFlag"
                  @click="() => this.gridSetFormFlag = !this.gridSetFormFlag"/>
                <span>
                  {{$t('gridTrade.setText13')}} {{symbolUnit.symbol | getCoinShowName(coinList)}}
                </span>
              </div>
            </div>
            <!-- 止损价格 -->
            <div v-show="priceFixFlag" class="set-num-input">
              <trade-input
                v-model="gridSetMinBalance.value"
                @onChanes="onChaneForm"
                name="gridSetMinBalance"
                :fixValue='fixValue.priceFix'
                :datas="gridSetMinBalance"/>
            </div>
              <!-- 止盈价格 -->
            <div v-show="priceFixFlag" class="set-num-input">
              <trade-input
                v-model="gridSetMaxBalance.value"
                @onChanes="onChaneForm"
                name="gridSetMaxBalance"
                :fixValue='fixValue.priceFix'
                :datas="gridSetMaxBalance"/>
            </div>
            <div v-if="!isLogin" class="loginOrReg a-4-bg b-1-cl">
              <span class="b-4-cl" @click="toLogin('login')">{{$t('login.login')}}</span>
              {{$t('trade5.or')}}
              <span class="b-4-cl" @click="toLogin('register')">{{$t('login.goRegister')}}</span>
            </div>
            <c-button
              v-else
              @click="gradSub('gradTrad')"
              height="40px"
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
              <span class="lov b-1-cl" v-if="lan === 'zh_CN'">
                <!-- 可用 -->
                {{$t('gridTrade.setText1')}}:
                <span class="lovText">
                  {{currenTaccount.unitsAccoubt}}
                </span>
                <span class="mr-text">
                  {{symbolUnit.units | getCoinShowName(coinList)}}
                </span>
                <!-- <span class="lovText">{{currenTaccount.symbolAccoubt}}
                </span>
                {{symbolUnit.symbol | getCoinShowName(coinList)}} -->
              </span>
            </div>
            <p class="lov_val b-1-cl" v-if="lan !== 'zh_CN'">
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
              <b>
                <!-- 七日年化收益率 -->
                {{$t('gridTrade.aiText1')}}
              </b>
              <span class="u-1-cl">
                {{sevenDay}} %
              </span>
            </p>
            <div class="input-box">
              <div class="input-inline-item">
                <trade-input
                  v-model="gridAiBlance.value"
                  @onChanes="onChaneForm"
                  name="gridAiBlance"
                  :fixValue='fixValue.priceFix'
                  :placeholder="$t('gridTrade.setText2')"
                  :datas="gridAiBlance"/>
              </div>
            </div>
            <!-- 网格数量 -->
            <!-- <p>{{$t('gridTrade.setText5')}}: </p> -->
            <div class="input-box">
              <div class="input-inline-item">
                <trade-input
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
              <div class="set-num-input">
                <!-- 投入资产 -->
                <!-- <p>{{$t('gridTrade.setText10')}}</p> -->
                <trade-input
                  v-model="gridAiAccount.value"
                  @onChanes="onChaneForm"
                  name="gridAiAccount"
                  :fixValue='fixValue.priceFix'
                  :datas="gridAiAccount"/>
              </div>
            </div>
            <div class="set-btc">
              <div class="switch-inline">
                <c-checkBox :value="aiPriceFixFlag"
                @click="() => this.aiPriceFixFlag = !this.aiPriceFixFlag"/>
                <span>
                  {{$t('trade5.gridTrade.setText3')}}
                </span>
              </div>
              <div class="switch-inline">
                <c-checkBox :value="gridAiFormFlag"
                @click="() => this.gridAiFormFlag = !this.gridAiFormFlag"/>
                <span>
                  {{$t('gridTrade.setText13')}} {{symbolUnit.symbol | getCoinShowName(coinList)}}
                </span>
              </div>
            </div>
            <!-- 止损价格 -->
            <div v-show="aiPriceFixFlag" class="set-num-input">
              <trade-input
                v-model="gridAiMinBalance.value"
                @onChanes="onChaneForm"
                name="gridAiMinBalance"
                :fixValue='fixValue.priceFix'
                :datas="gridAiMinBalance"/>
            </div>
            <!-- 止盈价格 -->
            <div v-show="aiPriceFixFlag" class="set-num-input">
              <trade-input
                v-model="gridAiMaxBalance.value"
                @onChanes="onChaneForm"
                name="gridAiMaxBalance"
                :fixValue='fixValue.priceFix'
                :datas="gridAiMaxBalance"/>
            </div>
            <div v-if="!isLogin" class="loginOrReg a-4-bg b-1-cl">
              <span class="b-4-cl" @click="toLogin('login')">{{$t('login.login')}}</span>
              {{$t('trade5.or')}}
              <span class="b-4-cl" @click="toLogin('register')">{{$t('login.goRegister')}}</span>
            </div>
            <c-button
              v-else
              @click="gradSub('GridAi')"
              height="40px"
              width="100%">
              {{gridbuttosContent.gridAiButton.text}}
            </c-button>
          </div>
        </div>
      </template>
      <!-- 专业版 -->
      <template v-else>
        <div class="lovText b-1-cl">
          <svg class="icon icon-12" aria-hidden="true">
            <use xlink:href="#icon-b_19"></use>
          </svg>
          {{currenTaccount.unitsAccoubt}}
          {{symbolUnit.units | getCoinShowName(coinList)}}
        </div>
          <!-- <span class="lovText">{{currenTaccount.symbolAccoubt}}
            {{symbolUnit.symbol | getCoinShowName(coinList)}}
          </span> -->
        <div class="trade-block trade_block_width" v-if="gridType === 1">
          <div class="form-block">
            <div class="input-box">
              <div class="input-inline-item">
                <trade-input
                  v-model="gridSetMin.value"
                  @onChanes="onChaneForm"
                  name="gridSetMin"
                  :fixValue='fixValue.priceFix'
                  :datas="gridSetMin"/>
              </div>
              <div class="input-inline-item">
                <trade-input
                  v-model="gridSetMax.value"
                  @onChanes="onChaneForm"
                  name="gridSetMax"
                  :fixValue='fixValue.priceFix'
                  :datas="gridSetMax"/>
              </div>
            </div>
            <div class="set-type">
              <div
                class="set-type-btn"
                :class="setType === 1 || setTypeHover === 1 ? 'u-8-bd u-8-cl' : 'a-3-bd'"
                @mouseover="setTypeHover = 1"
                @mouseout="setTypeHover = null"
                @click="() => this.setType = 1">
                {{$t('gridTrade.setText6')}}
              </div>
              <div
                class="set-type-btn"
                :class="setType === 2 || setTypeHover === 2 ? 'u-8-bd u-8-cl' : 'a-3-bd'"
                @mouseover="setTypeHover = 2"
                @mouseout="setTypeHover = null"
                @click="() => this.setType = 2">
                {{$t('gridTrade.setText7')}}
              </div>
            </div>
            <div class="input-box">
              <div class="input-inline-item">
                <trade-input
                  v-model="gridSetNum.value"
                  @onChanes="onChaneForm"
                  name="gridSetNum"
                  :fixValue='fixValue.priceFix'
                  :placeText="'2-100'"
                  :datas="gridSetNum"/>
              </div>
            </div>
            <p class="profits">
              {{$t('gridTrade.setText8')}}
              {{setType === 1
                ? `${gridSetMinProfits}%～${gridSetMaxProfits}`
                : gridSetMaxProfits}}%({{$t('gridTrade.setText9')}})
            </p>
            <div class="set-num">
              <div class="set-num-input">
                <trade-input
                  v-model="gridSetAccount.value"
                  @onChanes="onChaneForm"
                  name="gridSetAccount"
                  :fixValue='fixValue.priceFix'
                  :datas="gridSetAccount"/>
              </div>
              <div class="set-btc">
                <div class="switch-inline">
                  <c-checkBox
                    :value="priceFixFlag"
                    @click="() => this.priceFixFlag = !this.priceFixFlag"/>
                  <span>
                    {{$t('trade5.gridTrade.setText3')}}
                  </span>
                </div>
                <div class="switch-inline">
                  <c-checkBox
                    :value="gridSetFormFlag"
                    @click="() => this.gridSetFormFlag = !this.gridSetFormFlag"/>
                  <span>
                    {{$t('gridTrade.setText13')}} {{symbolUnit.symbol | getCoinShowName(coinList)}}
                  </span>
                </div>
              </div>
              <div v-show="priceFixFlag" class="set-num-input">
                <trade-input
                  v-model="gridSetMinBalance.value"
                  @onChanes="onChaneForm"
                  name="gridSetMinBalance"
                  :fixValue='fixValue.priceFix'
                  :datas="gridSetMinBalance"/>
              </div>
              <div v-show="priceFixFlag" class="set-num-input">
                <trade-input
                  v-model="gridSetMaxBalance.value"
                  @onChanes="onChaneForm"
                  name="gridSetMaxBalance"
                  :fixValue='fixValue.priceFix'
                  :datas="gridSetMaxBalance"/>
              </div>
            </div>
            <div v-if="!isLogin" class="loginOrReg a-4-bg b-1-cl">
              <span class="b-4-cl" @click="toLogin('login')">{{$t('login.login')}}</span>
              {{$t('trade5.or')}}
              <span class="b-4-cl" @click="toLogin('register')">{{$t('login.goRegister')}}</span>
            </div>
            <c-button
              v-else
              @click="gradSub('gradTrad')"
              height="40px"
              width="100%">
              {{gridbuttosContent.gridButton.text}}
            </c-button>
          </div>
        </div>
        <div class="trade-block trade_block_width" v-if="gridType === 2">
          <div class="form-block">
            <p class="fee_love">
              <b>
                {{$t('gridTrade.aiText1')}}
              </b>
              <span class="u-1-cl">
                {{sevenDay}} %
              </span>
            </p>
            <div class="input-box">
              <div class="input-inline-item">
                <trade-input
                  v-model="gridAiBlance.value"
                  @onChanes="onChaneForm"
                  name="gridAiBlance"
                  :fixValue='fixValue.priceFix'
                  :placeholder="$t('gridTrade.setText2')"
                  :datas="gridAiBlance"/>
              </div>
            </div>
            <div class="input-box">
              <div class="input-inline-item">
                <trade-input
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
            <div class="set-num">
              <div class="set-num-input">
                <trade-input
                  v-model="gridAiAccount.value"
                  @onChanes="onChaneForm"
                  name="gridAiAccount"
                  :fixValue='fixValue.priceFix'
                  :datas="gridAiAccount"/>
              </div>
              <div class="set-btc">
                <div class="switch-inline">
                  <c-checkBox
                    :value="aiPriceFixFlag"
                    @click="() => this.aiPriceFixFlag = !this.aiPriceFixFlag"/>
                  <span>
                    {{$t('trade5.gridTrade.setText3')}}
                  </span>
                </div>
                <div class="switch-inline">
                  <c-checkBox
                    :value="gridAiFormFlag"
                    @click="() => this.gridAiFormFlag = !this.gridAiFormFlag"/>
                  <span>
                    {{$t('gridTrade.setText13')}} {{symbolUnit.symbol | getCoinShowName(coinList)}}
                  </span>
                </div>
              </div>
              <div v-show="aiPriceFixFlag" class="set-num-input">
                <trade-input
                  v-model="gridAiMinBalance.value"
                  @onChanes="onChaneForm"
                  name="gridAiMinBalance"
                  :fixValue='fixValue.priceFix'
                  :datas="gridAiMinBalance"/>
              </div>
              <div v-show="aiPriceFixFlag" class="set-num-input">
                <trade-input
                  v-model="gridAiMaxBalance.value"
                  @onChanes="onChaneForm"
                  name="gridAiMaxBalance"
                  :fixValue='fixValue.priceFix'
                  :datas="gridAiMaxBalance"/>
              </div>
            </div>
            <div v-if="!isLogin" class="loginOrReg a-4-bg b-1-cl">
              <span class="b-4-cl" @click="toLogin('login')">{{$t('login.login')}}</span>
              {{$t('trade5.or')}}
              <span class="b-4-cl" @click="toLogin('register')">{{$t('login.goRegister')}}</span>
            </div>
            <c-button
              v-else
              @click="gradSub('GridAi')"
              height="40px"
              width="100%">
              {{gridbuttosContent.gridAiButton.text}}
            </c-button>
          </div>
        </div>
      </template>
    </div>
    <div class="trade-form" v-else>
      <div class="trade-block" v-if="showTradeBuy">
        <div class="form-block">
          <div class="top-mag">
            <span v-if="!proTrade" class="trade-type  b-1-cl">
              <!-- 买入 -->
              {{$t('trade.buy')}}
              {{symbolUnit.symbol | getCoinShowName(coinList)}}
            </span>
            <span class="lov b-1-cl">
              <!-- <c-button type="text" className="lovButton"
                v-if="this.isLogin && currenTaccount.unitsOpen.toString() === '1' && !proTrade"
                @click="goCz(symbolUnit.units)">{{ $t('manageFinances.goRecharge') }}
              </c-button> -->
              <svg class="icon icon-14" aria-hidden="true">
                <use xlink:href="#icon-b_19"></use>
              </svg>
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
            <Progress
              name="buy"
              :curPercent="perBuy"
              :readonly="(!formData_1.value && transactionType === 1)"
              :disabled="!isLogin"
              @change="setPerNumber"
            />
          <!-- <div class="percentage">
            <span
              v-for="(item, index) in perArr"
              :key="index + 'buy'"
              :class="perBuyClass(item)"
              @click="setPerNumber('buy', item)"
              class="per-item">{{item}}%</span>
          </div> -->
          <div v-if="transactionType === 1 && isLogin" class="volume-trade b-2-cl a-4-bg">
            <span class="dealMoney">
              <!-- 交易额: -->
              {{$t('trade5.dealAmount')}}
            </span>
            <span class="vol"
                  v-if="tradeVolumeBuy !== '--'">
                  {{tradeVolumeBuy}}
            </span>
            <span class="units">
              {{symbolUnit.units | getCoinShowName(coinList)}}
            </span>
          </div>
          <div v-if="!isLogin" class="loginOrReg a-4-bg b-1-cl">
            <span class="b-4-cl" @click="toLogin('login')">{{$t('login.login')}}</span>
            {{$t('trade5.or')}}
            <span class="b-4-cl" @click="toLogin('register')">{{$t('login.goRegister')}}</span>
          </div>
          <c-button
            v-else
            :defaultColorClass = 'buttosContent.buyButton.class'
            :hoverColorClass = 'buttosContent.buyButton.class'
            :activeColorClass = 'buttosContent.buyButton.class'
            @click="confirmSubmit('BUY')"
            height="40px"
            width="100%">
            {{buttosContent.buyButton.text}}
          </c-button>
        </div>
      </div>
      <div class="trade-block" v-if="showTradeSell">
        <div class="form-block">
          <div class="top-mag"  :class="gridTradeFlag && showGridFlag ? 'top-mag-line' : ''">
            <span v-if="!proTrade" class="trade-type b-1-cl">
              <!-- 卖出 -->
              {{$t('trade.sell')}}
              {{symbolUnit.symbol | getCoinShowName(coinList)}}
            </span>
            <span class="lov b-1-cl">
              <!-- <c-button type="text" className="lovButton"
                v-if="this.isLogin && currenTaccount.symbolOpen.toString() === '1' && !proTrade"
                @click="goCz(symbolUnit.symbol)">{{ $t('manageFinances.goRecharge') }}
              </c-button> -->
              <svg class="icon icon-14" aria-hidden="true">
                <use xlink:href="#icon-b_19"></use>
              </svg>
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
          <Progress
            name="sell"
            :disabled="!isLogin"
            :curPercent="perSell"
            @change="setPerNumber"
            :bgClass="'a-19-bg'"
            :bdClass="'a-19-bd'" />
          <!-- <div class="percentage">
            <span
              v-for="(item, index) in perArr"
              :key="index + 'sell'"
              @click="setPerNumber('sell', item)"
              class="per-item"
              :class="perSellClass(item)">{{item}}%</span>
          </div> -->
          <div v-if="transactionType === 1 && isLogin" class="volume-trade b-2-cl a-4-bg">
            <span class="dealMoney">
              <!-- 交易额: -->
              {{$t('trade5.dealAmount')}}
            </span>
            <span class="vol b-1-cl"
                  v-if="tradeVolumeSell !== '--'">
                  {{tradeVolumeSell}}
            </span>
            <span class="units">{{symbolUnit.units | getCoinShowName(coinList)}}</span>
            <!-- 解锁卖出 -->
             <!--  <c-button v-if="showUnlockSell"
                @click="unlockSell"
                type="text" className="volume-trade-opt-sell">
                解锁卖出
              </c-button> -->
          </div>
          <div v-if="!isLogin" class="loginOrReg a-4-bg b-1-cl">
            <span class="b-4-cl" @click="toLogin('login')">{{$t('login.login')}}</span>
            {{$t('trade5.or')}}
            <span class="b-4-cl" @click="toLogin('register')">{{$t('login.goRegister')}}</span>
          </div>
          <c-button
            v-else
            :defaultColorClass = 'buttosContent.sellButton.class'
            :hoverColorClass = 'buttosContent.sellButton.class'
            :activeColorClass = 'buttosContent.sellButton.class'
            @click="confirmSubmit('SELL')"
            height="40px"
            width="100%">
            {{buttosContent.sellButton.text}}
          </c-button>
        </div>
      </div>
    </div>
    <div
      v-if="this.isLogin && currenTaccount.unitsOpen.toString() === '1' && proTrade"
      class="person-assets">
      <h6>
        <span class="b-1-cl">{{$t('header.assets')}}</span>
        <c-button type="text" className="lovButton"
          @click="buyCoin">{{$t('trade5.buyCoin')}}</c-button>
      </h6>
      <div class="operation">
        <c-button
          @click="recharge"
          width="160px"
          height="30px"
          :defaultColorClass="'b-1-cl a-4-bg'"
          :hoverColorClass="'b-1-cl u-8-bg'"
          :activeColorClass="'b-1-cl u-8-bg'"
        >{{$t('assets.exchangeAccount.Recharge')}}</c-button>
        <c-button
          @click="withdraw"
          width="160px"
          height="30px"
          :defaultColorClass="'b-1-cl a-4-bg'"
          :hoverColorClass="'b-1-cl u-8-bg'"
          :activeColorClass="'b-1-cl u-8-bg'"
        >{{$t('assets.exchangeAccount.withdraw')}}</c-button>
      </div>
      <ul class="assets-detail">
        <li>
          <span class="b-2-cl">
            {{symbolUnit.units | getCoinShowName(coinList)}}
            {{$t('gridTrade.setText1')}}:
          </span>
          <span class="b-1-cl">
            {{currenTaccount.unitsAccoubt}}
          </span>
        </li>
        <li>
          <span class="b-2-cl">
            {{symbolUnit.symbol | getCoinShowName(coinList)}}
            {{$t('gridTrade.setText1')}}:
          </span>
          <span class="b-1-cl">
            {{currenTaccount.symbolAccoubt}}
          </span>
        </li>
      </ul>
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
import mixin from 'BlockChain-ui/PC/common-mixin/modules/newTrade/tradeForm/ex-tradeForm/ex-tradeForm';
import 'BlockChain-ui/PC/common-mixin/modules/newTrade/tradeForm/ex-tradeForm/ex-tradeForm.styl';
import tradeInput from './tradeInput.vue';
import Progress from './progress.vue';
import Select from '../select/index.vue';

export default {
  mixins: [mixin],
  components: {
    tradeInput,
    Progress,
    Select,
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
.newTrade-box.newTrade-box-ex-container {
  background: #1C1C1A !important;
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
  .input-box {
  }
  .set-num {
    margin-top 14px;
  }
  .fee_love {
    height: 32px;
    display flex;
    justify-content space-between;
    align-items center;
    width: 100%;
    margin-bottom: 12px;
    label {
      display: flex;
      align-items: center;
      >span {
        font-size: 16px;
      }
    }
  }
}
</style>
