<template>
  <div class="manageDetail">
    <!-- <c-pageBanner :title="bannerTitle" :backgroungImgUrl="bannerImg"></c-pageBanner> -->
    <div class="manageDetail-content">
      <div class="detail-content fuz-bg">
        <div class="detailTop fuz-border">
          <div class="detailTopLeft b-1-cl">
            {{$t('manageFinances.recommend')}}-{{$t('manageFinances.manage_finances')}}
            {{pageData.limit_day}}{{$t('manageFinances.day')}} {{pageData.name}}
          </div>
          <div class="detailTopright clearfix">
            <c-button
              @click="getMore"
              type="text">
              {{$t('manageFinances.moreProducts')}}
            </c-button>
          </div>
        </div>
        <div class="detailCon">
          <div class="detailConLeft">
            <div class="detailConLL">
              <div class="detailConLeftT b-4-cl">
                {{pageData.rate}}
                <span class="scale">%</span>
              </div>
              <div class="detailConLeftB">
                {{$t('manageFinances.expected')}}{{rate_type}}{{$t('manageFinances.rate')}}
              </div>
            </div>
            <div class="detailConLR">
              <div class="positions c-5-bd">
                <div class="deatilConRightB">
                  <div class="number b-4-cl">{{pageData.limit_day}}</div>
                  <div class="days b-4-cl">{{$t('manageFinances.day')}}</div>
                  <div class="date">{{$t('manageFinances.timeLimit')}}</div>
                </div>
              </div>
            </div>
            <div class="detailConLB">
              <ul class="detailConLBL">
                <li>{{$t('manageFinances.Repayment')}}</li>
                <li>{{$t('manageFinances.ReleaseCycle')}}</li>
                <li>{{$t('manageFinances.deadline')}}</li>
                <li>{{$t('manageFinances.startTime')}}</li>
                <li>{{$t('manageFinances.exitTime')}}</li>
              </ul>
              <ul class="detailConLBR b-1-cl">
                <li>{{return_type}}</li>
                <li>
                  {{pageData.cycle}}{{$t('manageFinances.day')}}/{{$t('manageFinances.times')}}
                </li>
                <li>{{end_time}}</li>
                <li>{{interest_begin_time}}</li>
                <li>{{interest_end_time}}</li>
              </ul>
            </div>
          </div>
          <div class="deatilConRight">
            <div class="deatilConRT">
              <div class="deatilConRTL">{{$t('manageFinances.availableBalance')}}</div>
              <div class="deatilConRTM b-1-cl">
                {{balance}}
                {{pageData.symbol | getCoinShowName(coinList)}}
              </div>
              <div class="deatilConRTR">
                <c-button
                  @click="goRecharge(pageData.symbol)"
                  class="goRechargeText"
                  type="text">
                  {{$t('manageFinances.goRecharge')}}
                </c-button>
              </div>
            </div>
            <div class="deatilConRInput">
              <c-inputLine name="amount"
                :errorHave="true"
                @onchanges="inputChanges"
                :promptText="$t('manageFinances.buyNumber')"
                :errorFlag="numberOptions.error"
                :errorText="numberOptions.text"
                :value="amount">
                <div class="inputSymbol b-1-cl">
                  {{pageData.symbol | getCoinShowName(coinList)}}
                </div>
              </c-inputLine>
            </div>
            <div class="deatilConRBot">
               <div class="deatilConRBotT">
                  {{$t('manageFinances.feature')}}
               </div>
               <div class="deatilConRBotB b-1-cl">
                   {{income}} {{pageData.interest_symbol | getCoinShowName(coinList)}}
               </div>
            </div>
            <div class="deatilConRButton">
                <c-button type="solid"
                  height="40px"
                  width="100%"
                  :disabled="btnDisabled"
                  @click="submit()"
                  paddingW="0px">
                  <!-- 立即申购 -->
                  {{$t('manageFinances.buyNow')}}
              </c-button>
            </div>
          </div>
        </div>
      </div>
      <div class="contentBottom">
        <p class="qustions">{{$t('manageFinances.commonProblem')}}</p>
        <p class="listTitle">{{templateLayoutType === 3
          ? $t('manageFinances.what')
          : $t('manageFinances.what_1')}}</p>
        <p class="listCon">{{templateLayoutType === 3
          ? $t('manageFinances.note1')
          : $t('manageFinances.note1_1')}}</p>
        <p class="listTitle">{{$t('manageFinances.how')}}</p>
        <p class="listCon">{{templateLayoutType === 3
          ? $t('manageFinances.note2')
          : $t('manageFinances.note2_1')}}</p>
        <p class="listTitle">{{templateLayoutType === 3
          ? $t('manageFinances.rule')
          : $t('manageFinances.rule_1')}}</p>
        <p class="listCon">{{$t('manageFinances.note3')}}</p>
      </div>
      <!-- 验证提示框 -->
      <c-verifyCationc-alert
        :showFlag="alertFlag"
        :imgMap="imgMap"
        :titleText="$t('assets.withdraw.safetyWarning')"
        :detaText="$t('assets.withdraw.safetyWarningError')"
        :dataList="alertData"
        :buttonText="$t('assets.withdraw.GotoOpen')"
        @close="alertClone"
        @confirm="alertGo"/>
        <!-- 实名提示框 -->
      <c-verifyCationc-alert
        :showFlag="alertFlagAuth"
        :imgMap="imgMap"
        :titleText="$t('assets.withdraw.safetyWarning')"
        :detaText="$t('manageFinances.forSafe')"
        :buttonText="$t('manageFinances.goAuth')"
        @close="alertAuthClone"
        @confirm="alertAuthGo"/>
    </div>
  </div>
</template>
<script>
import mixin from 'BlockChain-ui/PC/common-mixin/manageFinances/view/view';
import 'BlockChain-ui/PC/common-mixin/manageFinances/view/view.styl';

export default {
  mixins: [mixin],
  mounted() {
    this.init();
  },
};
</script>
