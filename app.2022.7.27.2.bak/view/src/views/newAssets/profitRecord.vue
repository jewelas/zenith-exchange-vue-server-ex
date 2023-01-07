<template>
  <div class="assets-profitRecord">
    <div class="profitRecord-header fuz-card-plain">
      <h2 class="title">
        <svg class="icon icon-20" aria-hidden="true" @click="goBack">
          <use xlink:href="#icon-v5_36"></use>
        </svg>
        <span class="v5-5-cl">{{$t('profitAndLoss.profitAndLoss')}}</span>
        <span
          class="hide-assets v5-11-bd"
          :class="{ 'v5-9-bg': hideHover }"
          @click="hideAssets"
          @mouseover="hideHover = true"
          @mouseout="hideHover = false">
          <svg v-if="isHide" class="icon icon-12" aria-hidden="true">
            <use xlink:href="#icon-assets_13"></use>
          </svg>
          <svg v-else class="icon icon-12" aria-hidden="true">
            <use xlink:href="#icon-assets_12"></use>
          </svg>
          {{isHide ? $t('profitAndLoss.hideAssets'):$t('profitAndLoss.showAssets')}}
        </span>
        </h2>
        <div class="detail-num">
          <div class="total-num">
            <div class="folded-text">
              {{$t('assets.exchangeAccount.TotalAssets')}}
            </div>
            <div class="folded-num">
              <div v-if="!isHide" class="num-display">
                <b class="v5-5-cl">
                  {{totalBalance | thousands}}&nbsp;
                  {{totalBalanceSymbol | getCoinShowName(coinList)}}
                </b>
                <span class="v5-6-cl">
                  &nbsp;≈&nbsp;{{totalRate | thousands}}&nbsp;{{userCurrency}}
                </span>
              </div>
              <div v-else class="num-hide v5-5-cl"><b>********</b></div>
            </div>
          </div>
          <div class="PNL">
            <div class="yesterday-PNL">
              <div
                class="v5-6-cl PNL-title"
                @mouseover="showProfitTip = true"
                @mouseout="showProfitTip = false">
                <span class="b-2-bd">{{$t('profitAndLoss.yesterdayProfit')}}</span>
                <transition name="slide-fade">
                  <div v-show="showProfitTip" class="profitTip v5-5-cl v5-19-bg box-shadow">
                    {{$t('profitAndLoss.yesterdayProfitTip')}}
                    <span class="triangle v5-19-bd"></span>
                  </div>
                </transition>
              </div>
              <div class="PNL-detail v5-5-cl">
                <div v-if="!isHide">
                  <span>{{yesterdayProfit}}</span>
                  <span :class="yesterdayClass">{{yesterdayProfitRate}}</span>
                </div>
                <div v-else>
                  <span>********</span>
                  <span>********</span>
                </div>
              </div>
            </div>
            <div class="thirty-PNL">
              <div class="v5-6-cl PNL-title">{{$t('profitAndLoss.thirtyDayPL')}}</div>
              <div class="PNL-detail v5-5-cl">
                <div v-if="!isHide">
                  <span>{{thirtyProfit}}</span>
                  <span :class="thirtyClass">{{thirtyProfitRate}}</span>
                </div>
                <div v-else>
                  <span>********</span>
                  <span>********</span>
                </div>
              </div>
            </div>
          </div>
        </div>
    </div>
    <div class="time-range">
      <ul class="time-select">
        <li
          class="time-item v5-19-bg v5-11-bd v5-5-cl"
          :class="{'v5-1-bd v5-1-cl': timeHover === 'seven' || timeSelect === 'seven'}"
          @mouseover="timeHover='seven'"
          @mouseout="timeHover=null"
          @click="selectTime('seven')">{{$t('profitAndLoss.sevenDay')}}</li>
        <li
          class="time-item v5-19-bg v5-11-bd v5-5-cl"
          :class="{'v5-1-bd v5-1-cl': timeHover === 'thirty' || timeSelect === 'thirty'}"
          @mouseover="timeHover='thirty'"
          @mouseout="timeHover=null"
          @click="selectTime('thirty')">{{$t('profitAndLoss.thirtyDay')}}</li>
        <li
          class="time-item v5-19-bg v5-11-bd v5-5-cl"
          :class="{'v5-1-bd v5-1-cl': timeHover === 'customize' || timeSelect === 'customize'}"
          @mouseover="timeHover='customize'"
          @mouseout="timeHover=null"
          @click="selectTime('customize')">{{$t('profitAndLoss.customize')}}</li>
      </ul>
      <div v-show="timeSelect === 'customize'" class="date-select_wrap">
        <c-v5-calendar
          :value="startTime"
          class="date-selecter"
          width="150px"
          inputHeight="32px"
          name="startTime"
          :placeholder="$t('profitAndLoss.startTime')"
          :agoDayHide="startAgoDayHide"
          :futureDayHide="startFutureDayHide"
          @onSelect="dateChange"
        />
        <span class="line v5-12-cl">—</span>
        <c-v5-calendar
          :value="endTime"
          class="date-selecter"
          width="150px"
          inputHeight="32px"
          name="endTime"
          :placeholder="$t('profitAndLoss.endTime')"
          :agoDayHide="endAgoDayHide"
          :futureDayHide="endFutureDayHide"
          @onSelect="dateChange"
        />
      </div>
    </div>
    <div class="echarts-wrap">
      <div class="PNL-echart">
        <!-- 累计收益率 -->
        <div class="total-profitRate echart-item fuz-card-plain">
          <div class="echart-title v5-5-cl">
            <span class="v5-5-cl">{{$t('profitAndLoss.totalProfitRate')}}</span>
            <div
              class="help-icon help-icon1"
              @mouseover="iconHover = 'totalProfitRate'"
              @mouseleave="iconHover = null">
              <svg v-if="iconHover === 'totalProfitRate'" class="icon icon-12" aria-hidden="true">
                <use xlink:href="#icon-assets_6_h"></use>
              </svg>
              <svg v-else class="icon icon-12" aria-hidden="true">
                <use xlink:href="#icon-assets_6"></use>
              </svg>
              <c-popover
                :show="iconHover === 'totalProfitRate'"
                id="popover1"
                :content="$t('profitAndLoss.tip1')"
                parent=".help-icon1">
              </c-popover>
            </div>
            <span v-if="isHide" class="num">********</span>
            <span
              v-else
              class="num"
              :class="{'u-1-cl': totalProfitRate > 0, 'u-4-cl': totalProfitRate < 0}">
              {{totalProfitRate}}%
            </span>
            <ul class="echart-legend v5-6-cl">
              <li>
                <i></i>
                <span>{{$t('profitAndLoss.totalProfitRate')}}</span>
              </li>
              <li>
                <i></i>
                <span>{{$t('profitAndLoss.btcUAD')}}</span>
              </li>
            </ul>
          </div>
          <div class="echart-box">
            <c-echart :propData="option1" id="canvans1" class="bar_canvas" ref="option1"></c-echart>
          </div>
        </div>
        <!-- 每日收益 -->
        <div class="day-profit echart-item fuz-card-plain">
          <div class="echart-title v5-5-cl">
            <span class="v5-5-cl">{{$t('profitAndLoss.dayProfit')}}</span>
            <div
              class="help-icon help-icon2"
              @mouseover="iconHover = 'dayProfit'"
              @mouseout="iconHover = null">
              <svg v-if="iconHover === 'dayProfit'" class="icon icon-12" aria-hidden="true">
                <use xlink:href="#icon-assets_6_h"></use>
              </svg>
              <svg v-else class="icon icon-12" aria-hidden="true">
                <use xlink:href="#icon-assets_6"></use>
              </svg>
              <c-popover
                :show="iconHover === 'dayProfit'"
                id="popover2"
                :content="$t('profitAndLoss.tip2')"
                parent=".help-icon2">
              </c-popover>
            </div>
            <span v-if="isHide" class="num">********</span>
            <span
              v-else
              class="num"
              :class="{'u-1-cl': dayProfit > 0, 'u-4-cl': dayProfit < 0}">
              {{ dayProfitShow }}
            </span>
          </div>
          <div class="echart-box">
            <c-echart :propData="option2" id="canvans2" class="bar_canvas" ref="option2"></c-echart>
          </div>
        </div>
        <!-- 累计收益 -->
        <div class="total-profit echart-item fuz-card-plain">
          <div class="echart-title v5-5-cl">
            <span class="v5-5-cl">{{$t('profitAndLoss.totalProfit')}}</span>
            <div
              class="help-icon help-icon3"
              @mouseover="iconHover = 'totalProfit'"
              @mouseout="iconHover = null">
              <svg v-if="iconHover === 'totalProfit'" class="icon icon-12" aria-hidden="true">
                <use xlink:href="#icon-assets_6_h"></use>
              </svg>
              <svg v-else class="icon icon-12" aria-hidden="true">
                <use xlink:href="#icon-assets_6"></use>
              </svg>
              <c-popover
                :show="iconHover === 'totalProfit'"
                id="popover3"
                :content="$t('profitAndLoss.tip3')"
                parent=".help-icon3">
              </c-popover>
            </div>
            <span v-if="isHide" class="num">********</span>
            <span
              v-else
              class="num"
              :class="{'u-1-cl': totalProfit > 0, 'u-4-cl': totalProfit < 0}">
              {{totalProfitShow}}
            </span>
          </div>
          <div class="echart-box">
            <c-echart :propData="option3" id="canvans3" class="bar_canvas" ref="option3"></c-echart>
          </div>
        </div>
      </div>
      <div class="assets-echart">
        <!-- 资产分布 -->
        <div class="assets-distribute echart-item fuz-card-plain">
          <div class="echart-title">
            <span class="v5-5-cl">{{$t('assets.distribute')}}</span>
            <div
              class="help-icon help-icon4"
              @mouseover="iconHover = 'distribute'"
              @mouseout="iconHover = null">
              <svg v-if="iconHover === 'distribute'" class="icon icon-12" aria-hidden="true">
                <use xlink:href="#icon-assets_6_h"></use>
              </svg>
              <svg v-else class="icon icon-12" aria-hidden="true">
                <use xlink:href="#icon-assets_6"></use>
              </svg>
              <c-popover
                :show="iconHover === 'distribute'"
                id="popover4"
                :content="$t('profitAndLoss.tip4')"
                parent=".help-icon4">
              </c-popover>
            </div>
          </div>
          <div class="echart-box">
            <c-echart :propData="option4" id="canvans4" class="bar_canvas" ref="option4"></c-echart>
            <ul class="coin-list">
              <li
                class="coin-item v5-5-cl"
                :class="{'v5-9-bg': coinHoverIndex === index}"
                v-for="(item, index) in coinDataList"
                :key="index"
                @mouseover="coinHover(index, true)"
                @mouseout="coinHover(index, false)">
                <span>
                  <i class="spot" :style="{ 'background-color': item.spotColor }"></i>
                  {{item.coinSymbol}}
                </span>
                <span>{{item.proportion}}%</span>
              </li>
            </ul>
          </div>
        </div>
        <!-- 资产总值 -->
        <div class="assets-total echart-item fuz-card-plain">
          <div class="echart-title v5-5-cl">
            <span class="v5-5-cl">{{$t('profitAndLoss.totalAssets')}}</span>
            <div
              class="help-icon help-icon5"
              @mouseover="iconHover = 'totalAssets'"
              @mouseout="iconHover = null">
              <svg v-if="iconHover === 'totalAssets'" class="icon icon-12" aria-hidden="true">
                <use xlink:href="#icon-assets_6_h"></use>
              </svg>
              <svg v-else class="icon icon-12" aria-hidden="true">
                <use xlink:href="#icon-assets_6"></use>
              </svg>
              <c-popover
                :show="iconHover === 'totalAssets'"
                id="popover5"
                :content="$t('profitAndLoss.tip5')"
                parent=".help-icon5">
              </c-popover>
            </div>
            <span v-if="isHide" class="num">********</span>
            <span v-else class="num">
              {{totalAssetsShow}}
            </span>
          </div>
          <div class="echart-box">
            <c-echart :propData="option5" id="canvans5" class="bar_canvas" ref="option5"></c-echart>
          </div>
        </div>
      </div>
    </div>
    <ul class="warn-tip">
      <li>{{$t('profitAndLoss.warnTip1')}}</li>
      <li>{{$t('profitAndLoss.warnTip2')}}</li>
    </ul>
  </div>
</template>
<script>
import mixin from 'BlockChain-ui/PC/common-mixin/newAssets/profitRecord/index';
import 'BlockChain-ui/PC/common-mixin/newAssets/profitRecord/index.styl';

export default {
  mixins: [mixin],
  mounted() {
    this.init();
  },
};
</script>
<style scoped>
.PNL-echart {
  width: 800px !important;
}
.time-select {
  align-items:center;
}
</style>
