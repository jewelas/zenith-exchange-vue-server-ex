<template>
  <div
    class="free-staking-detail"
    v-if="projectDetail"
  >
    <div class="free-staking-header fuz-page-content">
      <div
        class="project-logo"
        @mouseover="showCurrencyModal"
        @mouseleave="hideCurrencyModal"
      >
        <img :src="projectDetail.logo" alt />
        <transition name="fade">
          <div class="popup-cont" v-show="currencyModalState">
            <Popup :coinSymbolIntroduce="projectDetail"></Popup>
          </div>
        </transition>
      </div>
      <div
        class="project-name"
        @mouseover="showCurrencyModal"
        @mouseleave="hideCurrencyModal"
      >
        {{ projectDetail.shortName }}
      </div>
      <div class="project-info">
        <div class="project-title">
          {{ projectDetail.name }}
          <span class="f-2-cl">{{ projectDetail.title }}</span>
        </div>
        <div class="project-range f-4-cl">{{ projectDetail.gainRate }}%</div>
        <div class="project-range-text f-2-cl">
          {{ $t("freeStaking.home.gainRate") }}
        </div>
      </div>
      <div class="nav-active">
        <c-button
          defaultColorClass="f-4-bd f-2-cl"
          type="hollow"
          width="120px"
          height="40px"
          @click="goBackHome"
          v-if="projectDetail.url"
        >
          <div class="nav-active-text">{{ $t("freeStaking.home.notice") }}</div>
        </c-button>
      </div>
      <div class="clearfix"></div>
    </div>
    <div class="project-content fuz-page-content fuz-card">
      <div class="project-content-title fuz-card-title">
        <div class="titlel">
          {{ $t("freeStaking.detail.activityProgress") }}
        </div>
        <div class="titler" @click="navMyPos">
          <svg class="icon icon-17" aria-hidden="true">
            <use xlink:href="#icon-a_22"></use>
          </svg>
          <span class="f-4-cl">{{ projectDetail.tipMine }}</span>
        </div>
        <div class="clearfix"></div>
      </div>
      <div class="project-status-cont fuz-card-content"
           v-if="projectDetail.projectType === 3 || projectDetail.projectType === 2">
        <div class="process-line-cont">
          <div
            class="process-line"
            v-for="(item, index) in projectStatus"
            :key="item.title"
          >
            <div class="process-linel">
              <div
                class="process-line-circle f-8-cl"
                :class="item.active ? 'f-4-bg' : 'c-5-bg'"
              >
                {{ index + 1 }}
              </div>
              <div class="process-line-text f-2-cl">{{ item.title }}</div>
              <div class="process-line-date f-2-cl">{{ item.datetime }}</div>
            </div>
            <div
              :class="projectDetail.projectType === 2  ? 'process-liner-2' : 'process-liner'"
              class="c-5-bg"
              v-if="projectStatus.length !== index + 1"
            >
              <div
                v-if="item.active"
                :style="lineStatusStyle(index, item)"
                class="process-liner-fill c-8-bg"
              ></div>
            </div>
            <div class="clearfix"></div>
          </div>
        </div>
        <div class="process-rate" v-if="projectDetail.projectType !== 2">
          <div class="process-title">
            <div class="titlel f-2-cl">
              {{ $t("freeStaking.home.lockProgress") }}
            </div>
            <div class="titler f-2-cl">
              {{ $t("freeStaking.detail.lockAllNum") }}
            </div>
            <div class="clearfix"></div>
          </div>
          <div class="process-rate-line c-5-bg">
            <div
              class="process-rate-line-fill c-8-bg"
              :style="`width:${projectDetail.progress}`"
            ></div>
          </div>
          <div class="process-value">
            <div class="valuel f-1-cl">{{ projectDetail.progress }}</div>
            <div class="valuer f-1-cl">
              {{ raiseAmount }} {{ projectDetail.shortName }}
            </div>
            <div class="clearfix"></div>
          </div>
        </div>
        <div class="user-buy" v-if="isShowBlock([1, 2])">
          <div class="user-income-item c-5-bd "
          :class="{'noborder' : !getGainAutoFlag}"
          >
            <div class="user-buy-title f-2-cl">
              {{ $t("freeStaking.detail.userLocked") }}
            </div>
            <div class="user-lock-account">
              <span class="num" :class="isLogin ? 'f-4-cl' : 'f-2-cl'">{{
                totalAmount
              }}</span>
              <span class="f-1-cl">{{ projectDetail.shortName }}</span>
            </div>
          </div>
           <div class="user-income-item c-5-bd noborder" v-if="getGainAutoFlag">
            <div class="user-buy-title f-2-cl">
              {{ $t("freeStaking.unclaimed") }}
            </div>
            <div class="user-lock-account">
              <span class=" num" :class="isLogin ? 'f-4-cl' : 'f-2-cl'">{{
                totalGains
              }}</span>
              <span class="f-1-cl coin">{{ projectDetail.shortName }}</span>
              <c-button
                defaultColorClass="f-4-bd f-2-cl"
                type="hollow"
                width="120px"
                height="40px"
                style="margin-left:15px;float:right"
                @click="getAllGain"
              >
                <div class="nav-active-text">{{ $t("freeStaking.oneClick") }}</div>
              </c-button>
            </div>
          </div>
          <div
            class="user-lock-input"
            v-if="isShowBlock([1]) && projectDetail.isShowBuy"
          >
            <div class="user-lock-title f-2-cl">
              {{ lockMinNumText }}
            </div>
            <div class="user-input">
              <c-inputLine
                marginTop="0px"
                name="lockNumber"
                :value="lockNumber "
                @onchanges="inputChanges"
                max-length="15"
                :disabled="!isLogin"
              ></c-inputLine>
            </div>

            <div class="user-account">
              <div class="user-account-num f-2-cl">
                {{ $t("trade.balance") }}
                {{ userBalance }}
                {{ projectDetail.shortName }}
              </div>
              <div class="user-account-all f-4-cl" @click="autoFillCoin">
                {{ $t("innov.whole") }}
              </div>
              <div class="clearfix"></div>
            </div>
          </div>
          <div class="user-income c-5-bg">
            <div>
              <span class="f-2-cl">
                {{ userIncomeTitle }}
              </span>
              <span class="num" :class="isLogin ? 'f-4-cl' : 'f-2-cl'">
                {{ userFeatureIncome }}
              </span>
              <span class="f-1-cl coin">{{ projectDetail.gainCoinName }}</span>
            </div>
          </div>
        </div>
        <div class="user-buyed-income"
             v-if="(projectDetail.projectType === 3 && isShowBlock([3, 4, 5]))
             || (projectDetail.projectType === 2 && isShowBlock([6]))">
          <div class="user-income-item c-5-bd"
               :class="{'noborder' : projectDetail.projectType === 2}">
            <div class="user-income-title f-2-cl">
              {{ $t("freeStaking.detail.userLocked") }}
            </div>
            <div>
              <span class=" num" :class="isLogin ? 'f-4-cl' : 'f-2-cl'">{{
                totalAmount
              }}</span>
              <span class="f-1-cl coin">{{ projectDetail.shortName }}</span>
            </div>
          </div>
          <div class="user-income-item c-5-bd" v-if="projectDetail.projectType !== 2">
            <div class="user-income-title f-2-cl">
              {{ $t("freeStaking.detail.totalGainAmount") }}
            </div>
            <div>
              <span class="num" :class="isLogin ? 'f-4-cl' : 'f-2-cl'">
                {{ totalGainAmount }}
              </span>
              <span class="f-1-cl coin">{{ projectDetail.gainCoinName }}</span>
            </div>
          </div>
          <div class="user-income-item c-5-bd noborder" v-if="projectDetail.projectType !== 2">
            <div class="user-income-title f-2-cl">
              {{ $t("freeStaking.detail.totalUserGainAmount") }}
            </div>
            <div>
              <span class="num" :class="isLogin ? 'f-4-cl' : 'f-2-cl'">
                {{ totalUserGainAmount }}
              </span>
              <span class="f-1-cl coin">{{ projectDetail.gainCoinName }}</span>
            </div>
          </div>
          <div class="clearfix"></div>
        </div>
         <div class="user-buyed-income"
              style="margin-top:0;"
             v-if="(projectDetail.projectType === 3 && isShowBlock([3, 4, 5]))
             || (projectDetail.projectType === 2 && isShowBlock([6]))">
          <div class="user-income-item c-5-bd noborder" v-if='getGainAutoFlag'>
            <div class="user-income-title f-2-cl">
              <!-- 累计未领取 -->
              {{ $t("freeStaking.unclaimed") }}
            </div>
            <div>
              <span class=" num" :class="isLogin ? 'f-4-cl' : 'f-2-cl'">{{
                totalGains
              }}</span>
              <span class="f-1-cl coin">{{ projectDetail.shortName }}</span>
              <c-button
                defaultColorClass="f-4-bd f-2-cl"
                type="hollow"
                width="120px"
                height="40px"
                style="margin-left:15px;float:right"
                @click="getAllGain"
              >
                <div class="nav-active-text">{{ $t("freeStaking.oneClick") }}</div>
              </c-button>
            </div>
          </div>
          <div class="clearfix"></div>
        </div>
        <div class="project-warning" v-html="projectDetail.details"></div>
        <div
          class="user-submit"
          v-if="isShowBlock([1]) && projectDetail.isShowBuy">
          <c-checkBox :value="userAgress" @click="checkoutHandle" />
          <span class="text f-2-cl" @click="changeUserAgreeState">{{
            $t("freeStaking.detail.rulesDangers")
          }}</span>
          <div class="submit-btn">
            <c-button
              :disabled="!userAgress"
              width="220px"
              height="40px"
              @click="submitUserPos"
              >{{
                isLogin
                  ? $t("freeStaking.detail.agreePOS")
                  : $t("trade.loginReg")
              }}</c-button
            >
          </div>
        </div>
      </div>
      <div class="project-status-cont" v-else>
        <div class="user-buyed-income">
          <div class="user-income-item c-5-bd">
            <div class="user-income-title f-2-cl">
              {{ $t("freeStaking.detail.totalGainAmount") }}
            </div>
            <div>
              <span class="f-2-cl num">
                {{ totalGainAmount }}
              </span>
              <span class="f-2-cl coin">{{ projectDetail.shortName }}</span>
            </div>
          </div>
          <div class="user-income-item c-5-bd noborder">
            <div class="user-income-title f-2-cl">
              {{ $t("freeStaking.detail.totalUserGainAmount") }}
            </div>
            <div>
              <span class="f-2-cl num">
                {{ totalUserGainAmount }}
              </span>
              <span class="f-2-cl coin">{{ projectDetail.gainCoinName }}</span>
            </div>
          </div>
          <div class="clearfix"></div>
        </div>
        <div class="project-warning" v-html="projectDetail.details"></div>
      </div>
    </div>
    <div class="project-content c-4-bg mart-20" v-if="incomeListFlag">
      <div class="project-content-title f-1-cl c-5-bd">
        <div class="titlel">{{ $t("freeStaking.detail.incomeDetail") }}</div>
        <c-table
          :imgMap="imgMap"
          :colorMap="colorMap"
          class="c-4-bg"
          :loading="false"
          :columns="columns"
          :dataList="tableList"
          @elementClick="tableClick"
        />
      </div>
    </div>
    <c-dialog
      :showFlag="dialogFlag"
      paddingBottom="14px"
      @close="dialogClose"
      @confirm="dialogConfirm"
      :confirmDisabled="confirmBtnFlag"
      :titleText="$t('login.SecurityVerification')"
    >
      <!-- 谷歌验证框 -->
      <c-inputLine
        v-if="userInfo && googleStatus === 1"
        max-length="6"
        name="googleVlaue"
        :promptText="googleVlaueForm.text"
        :errorHave="true"
        :errorFlag="googleErrorFlag"
        marginTop="0px"
        :value="googleVlaue"
        @onchanges="inputChanges"
      />
      <!-- 短信验证框 -->
      <c-inputLine
        v-if="userInfo && isOpenMobileCheck === 1"
        max-length="6"
        name="phoneCode"
        :promptText="checkPhione.text"
        :errorHave="true"
        :errorFlag="phoneErrorFlag"
        marginTop="0px"
        :value="phoneCode"
        @onchanges="inputChanges"
      >
        <!-- 获取验证码 -->
        <c-getCode
          v-if="checkPhione.haveCode"
          name="loginGetcode"
          @click="getCodeClick"
          buttonName="loginGetcodeBtn"
        />
      </c-inputLine>
    </c-dialog>
    <c-verify
      style="display:none"
      :colorMap="colorMap"
      v-if="verificationType === '2'"
      marginTop="6px"
      :errorHave="true"
      product="bind"
      @getCaptchaObj="getCaptchaObj"
      @callback="verifyCallBack"
    />
  </div>
</template>
<script>
import mixin from 'BlockChain-ui/PC/common-mixin/freeStaking/detail/detail';
import 'BlockChain-ui/PC/common-mixin/freeStaking/detail/detail.styl';
import Popup from './popup.vue';

export default {
  mixins: [mixin],
  components: {
    Popup,
  },
  created() {
    this.init();
  },
};
</script>
<style scoped>
.fuz-card-title > * {
  line-height: 1 !important;
}
</style>
