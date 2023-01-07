<template>
  <div v-if="moduleShow" class="company-application-page CompanyApplicationDetail fuz-page-content">
    <div class="company-application fuz-card fuz-full">
      <div class="company-application-bar">
        <div class="application-header fuz-border">
          <div class="application-step b-2-cl">
            <template v-for="(item, inx) in stepProgress" >
              <span
                class="step-icon medium"
                style="color:#EDF4F8"
                :class="actived(item.status)"
                :key="`stepProgress${inx}`">
                {{inx + 1}}</span>{{item.text}}
              <span
                class="setp-line fuz-border"
                :key="`stepProgressLine${inx}`"
                v-if="lineShow(inx, stepProgress.length)"></span>
            </template>
          </div>
          <h1 class="application-title b-1-cl">{{headerTitle}}
            <span class="b-2-cl title-desc" v-if="applyStatus !== 1">{{headerDesc}}</span>
          </h1>
        </div>
        <div v-if="companyStatus === 2 && (applyRuleStatus === 1 || applyRuleStatus === 3)">
          <template v-if="applyStatus === 0
          || (applyStatus === 3 && applyRuleStatus === 1)
          || (applyRuleStatus === 1 && applyStatus === 2 && companyStatus === 2)">
            <div class="step fuz-border">
              <h2 class="b-2-cl step-title">
                {{$t('application.companySuper.unApply.stepOne.title')}}
              </h2>
              <p class="b-1-cl step-desc">
                {{$t('application.companySuper.unApply.stepOne.desc')[0]}}
                {{normalCompanyMarginNum}}
                {{getShowCoin(marginCoinSymbol)}}
                {{$t('application.companySuper.unApply.stepOne.desc')[1]}}
              </p>
            </div>
            <div class="step fuz-border">
              <h2 class="b-2-cl step-title">
                {{$t('application.companySuper.unApply.stepTwo.title')}}
              </h2>
              <p class="b-1-cl step-desc">
                {{$t('application.companySuper.unApply.stepTwo.desc')[0]}}
              </p>
            </div>
          </template>
          <div class="step fuz-border" v-if="applyStatus === 1">
            <p class="b-2-cl step-desc sort">
              {{$t('application.companySuper.applying.desc')[0]}}<br/><br/>
              {{$t('application.companySuper.applying.desc')[1]}} {{normalCompanyMarginNum}}
              {{getShowCoin(marginCoinSymbol)}}
              {{$t('application.companySuper.applying.desc')[2]}}<br/><br/>
              {{$t('application.companySuper.applying.desc')[3]}}
            </p>
          </div>
          <div class="step fuz-border" v-if="applyStatus === 3 && applyRuleStatus === 3
          || applyStatus === 2 && applyRuleStatus === 3">
            <p class="b-2-cl step-desc sort" v-html="$t('application.companySuper.applied.desc')">
            </p>
          </div>
        </div>
        <div v-else-if="applyRuleStatus === 0 || companyStatus === 1">
          <template v-if="applyStatus === 0 || (applyRuleStatus === 0 && applyStatus !== 1)">
            <div class="step fuz-border">
              <h2 class="b-2-cl step-title">
                {{$t('application.company.unApply.stepOne.title')}}
              </h2>
              <p class="step-desc b-1-cl">
                <span>{{$t('application.company.unApply.stepOne.desc')[0]}}</span>
                <a :href="docAddr" target="_blank" class="b-4-cl">
                  {{$t('application.company.unApply.stepOne.desc')[1]}}</a>
                <span>{{$t('application.company.unApply.stepOne.desc')[2]}}</span>
              </p>
              <p class="b-1-cl step-desc"
                 v-html="$t('application.company.unApply.stepOne.desc')[3]"></p>
            </div>
            <div class="step fuz-border">
              <h2 class="b-2-cl step-title">
                {{$t('application.company.unApply.stepTwo.title')}}
              </h2>
              <p class="step-desc b-4-cl">
                <span class="b-1-cl">{{$t('application.company.unApply.stepTwo.desc')[0]}}</span>
                <a href="javascript:;" class="b-4-cl"
                   v-on:click="copyMail(otcCompanyApplyEmail)">
                  {{otcCompanyApplyEmail}} </a>
                <span class="b-1-cl">{{$t('application.company.unApply.stepTwo.desc')[1]}}</span>
              </p>
            </div>
            <div class="step fuz-border">
              <h2 class="b-2-cl step-title">
                {{$t('application.company.unApply.stepThree.title')}}
              </h2>
              <p class="b-1-cl step-desc">
                {{$t('application.company.unApply.stepThree.desc')[0]}}
                {{normalCompanyMarginNum}}
                {{getShowCoin(marginCoinSymbol)}}
                {{$t('application.company.unApply.stepThree.desc')[1]}}</p>
            </div>
            <div class="step fuz-border">
              <h2 class="b-2-cl step-title">
                {{$t('application.company.unApply.stepFour.title')}}
              </h2>
              <p class="b-1-cl step-desc">{{$t('application.company.unApply.stepFour.desc')[0]}}</p>
            </div>
          </template>
          <div class="step fuz-border" v-if="applyStatus === 1">
            <p class="b-1-cl step-desc sort" v-html="$t('application.company.applying.desc')"></p>
          </div>
          <div class="step fuz-border" v-if="(applyStatus === 3 && applyRuleStatus !== 0)
          || (applyRuleStatus === 1 && applyStatus === 2)">
            <p class="b-1-cl step-desc sort" v-html="$t('application.company.applied.desc')"></p>
          </div>
        </div>
        <div class="application-region">
          <p class="option-region e-2-c b-2-cl"
             v-if="btnShow">
            <c-checkBox :value="textFlag" @click="checkoutClick"/>
            {{$t('application.applyRegion.options')[0]}}
            <span class="b-4-cl">
              {{normalCompanyMarginNum}}
              {{getShowCoin(marginCoinSymbol)}}
            </span>
            {{$t('application.applyRegion.options')[1]}}
          </p>
          <div class="btn-region b-4-cl">
            <c-button
              v-if="btnShow"
              height="40px"
              width="100px"
              :loading="submitLoading"
              :disabled="submitDisabled"
              @click="submit"
              paddingW="0px">{{$t('application.applyRegion.applyBtn')}}
            </c-button>
            <c-button
              v-if="applying"
              height="40px"
              width="160px"
              :disabled="true"
              paddingW="0px">{{$t('application.applyRegion.applingBtn')}}
            </c-button>
            <c-button
              v-if="allPass"
              height="40px"
              width="160px"
              @click="back"
              paddingW="0px">{{
                fiatTradeOpen
                ? $t('assets.b2c.otcShow.goHall')
                : $t('application.applyRegion.appliedBtn')}}
            </c-button>
            <c-button
              v-if="(applyStatus === 3 && applyRuleStatus === 1 && companyStatus === 2)
              || (applyStatus === 2 && applyRuleStatus === 1 && companyStatus === 2)
              || (applyStatus === 1 && applyRuleStatus === 0)
              || (applyStatus === 1 && applyRuleStatus === 1)"
              :big="true"
              @click="back"
              type="text"
              className="back-btn"
              paddingW="31px"
              height="40px">{{
                fiatTradeOpen
                ? $t('assets.b2c.otcShow.goHall')
                : $t('application.applyRegion.appliedBtn')}}
            </c-button>
            <c-button
              v-if="applyRuleStatus === 0
              && (applyStatus === 2 || applyStatus === 0 || applyStatus === 3)"
              :big="true"
              @click="relieveClick"
              type="text"
              className="back-btn"
              paddingW="31px"
              height="40px">{{this.$t('application.applyRegion.cancelBtn')}}
            </c-button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import mixin from 'BlockChain-ui/PC/common-mixin/CompanyApplication/CompanyApplicationDetail/CompanyApplicationDetail';
import 'BlockChain-ui/PC/common-mixin/CompanyApplication/CompanyApplicationDetail/CompanyApplicationDetail.styl';

export default {
  mixins: [mixin],
  mounted() {
    this.init();
  },
};
</script>
<style scoped>
.CompanyApplicationDetail .company-application .back-btn {
  padding-top:0;
}
</style>
