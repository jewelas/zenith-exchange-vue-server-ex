<template>
  <div class="verificationCenter fuz-card with-title">
    <div class="kyc-header fuz-card-title">
      <span>{{ $t("verificationCenter.current") }}</span>
      <span v-if="regionCountry">
        <i class="b-2-cl">{{$t('verificationCenter.region')}}:</i>
        {{regionCountry}}
      </span>
    </div>
    <!--当前权益-->
    <ul class="kyc-currentFeature b-1-cl">
      <li class="current-item">
        <div class="item-status">
          <svg class="icon icon-14" aria-hidden="true">
            <use xlink:href="#icon-assets_2_h"></use>
          </svg>
          <span>{{depositLimit}}</span>
        </div>
        <span class="item-title b-2-cl">{{$t('verificationCenter.depositLimit')}}</span>
      </li>
      <li class="current-item">
        <div class="item-status">
          <svg class="icon icon-14" aria-hidden="true">
            <use xlink:href="#icon-assets_5_h"></use>
          </svg>
          <span>
            {{userLevelInfo.withdrawLimit}}
            {{userLevelInfo.withdrawSymbol}}
            {{$t('verificationCenter.daily')}}
          </span>
        </div>
        <span class="item-title b-2-cl">{{$t('verificationCenter.withdrawLimit')}}</span>
      </li>
      <li class="current-item">
        <div class="item-status">
          <svg class="icon icon-14" aria-hidden="true">
            <use xlink:href="#icon-assets_3_h"></use>
          </svg>
          <span>{{c2cLimit}}</span>
        </div>
        <span class="item-title b-2-cl">{{$t('verificationCenter.p2pLimit')}}</span>
      </li>
    </ul>
    <div class="empty"></div>
    <ul class="kyc-level_list">
      <!--个人认证-->
      <li
        class="level-item"
        v-for="(item, index) in levelList"
        :key="index">
        <h5 class="level-name b-1-cl">{{item.levelName}}</h5>
        <div class="level-content a-3-bd">
          <ol class="verification-list b-1-cl">
            <li
              class="verification-item"
              v-for="(val, i) in item.requirementList"
              :key="i"
            >{{val}}</li>
          </ol>
          <div
            v-if="notPassReason && item.btnStatus === 2"
            class="check-tip b-6-cl">
            <!-- 审核建议 -->
            {{ notPassReason }}
          </div>
          <div v-if="item.btnStatus === 2" class="refuse-btn u-4-cl u-4-bd">
            <svg class="icon icon-12" aria-hidden="true">
              <use xlink:href="#icon-v5_29"></use>
            </svg>
            {{$t('verificationCenter.refuse')}}
          </div>
          <div class="status-btn">
            <div v-if="item.btnStatus === 1" class="complete-btn u-1-cl u-1-bd">
              <svg class="icon icon-12" aria-hidden="true">
                <use xlink:href="#icon-v5_30"></use>
              </svg>
              {{$t('verificationCenter.completed')}}
            </div>
            <c-v5-button
              v-else
              type="solid"
              className="user-button"
              width="160px"
              height="40px"
              :disabled="item.btnStatus === 4"
              @click="goVerify(item)">
              {{ item.btnText }}
            </c-v5-button>
          </div>
          <h6 class="cryptoLimits b-1-cl">{{$t('verificationCenter.cryptoLimits')}}</h6>
          <dl class="limit-item">
            <dt class="b-1-cl">{{$t('verificationCenter.depositLimit')}}</dt>
            <dd v-if="Number(item.depositLimit) === 1" class="b-2-cl">
              {{$t('verificationCenter.limited')}}
            </dd>
            <dd v-else class="b-2-cl">{{$t('verificationCenter.unlimited')}}</dd>
          </dl>
          <dl class="limit-item">
            <dt class="b-1-cl">{{$t('verificationCenter.withdrawLimit')}}</dt>
            <dd class="b-2-cl">
              {{item.withdrawLimitAmount}}
              {{item.withdrawLimitSymbol}}
              {{$t('verificationCenter.daily')}}
            </dd>
          </dl>
          <dl class="limit-item">
            <dt class="b-1-cl">{{$t('verificationCenter.p2pLimit')}}</dt>
            <dd v-if="Number(item.c2cLimit) === 1" class="b-2-cl">
              {{$t('verificationCenter.limited')}}
            </dd>
            <dd v-else class="b-2-cl">{{$t('verificationCenter.unlimited')}}</dd>
          </dl>
        </div>
      </li>
    </ul>
    <!-- 实名认证 -->
    <c-dialog :showFlag="kycPhoneFlag"
            class="idAuthDialog"
            paddingBottom="220px"
            :titleText="$t('personal.idAuth.title')"
            @close="kycPhoneClose"
            @confirm="kycPhoneConfirm"
            :confirmLoading="kycLoading">
      <!-- 请选择您的国家或地区 -->
      <c-select
        :value="country"
        :promptText="$t('personal.kyc.area')"
        @onChanges='countryChange'
        name="certificateType"
        :imgMap="imgMap"
        :errorHave="true"
        :options="countryListMoy"
        :filterable="true"
      />
    </c-dialog>
    <c-dialog
      :titleText="$t('verificationCenter.tip')"
      :showFlag="dialogFlag"
      paddingBottom="14px"
      :confirmText="$t('verificationCenter.start')"
      @close="dialogFlag = false"
      @confirm="dialogConfirm">
      <div class="warnTip">
        {{$t('verificationCenter.warnTip', {
          type1: $t('verificationCenter.personal'),
          type2: $t('enterpriseCert.title')
        })}}
      </div>
    </c-dialog>
  </div>
</template>
<script>
import mixin from 'BlockChain-ui/PC/common-mixin/personal/verificationCenter/index';
import 'BlockChain-ui/PC/common-mixin/personal/verificationCenter/index.styl';

export default {
  mixins: [mixin],
  mounted() {
    this.init();
  },
};
</script>
