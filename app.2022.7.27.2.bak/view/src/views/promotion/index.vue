<template>
  <div class="promotion">
    <div
      class="banner-row"
    >
      <div class="text-row">
        <div class="text-item">
          <div>
            <p class='fuz-title'>Referral</p>
            <p class='fuz-content'>
              Enjoy trading rewards when you invite a friend to trade on MEXC
            </p>
            <span>Become an MEXC Affiliate and earn more commissions</span>
          </div>
        </div>
        <div class="img-item">
          <img src="@/assets/fuzionx/images/promotion/ad.png" />
        </div>
      </div>
    </div>

    <div class='content-row'>
      <div class="form-item fuz-card">
        <p class='fuz-card-title'>Referral link</p>
        <div class="form-bg fuz-row fuz-card-content">
          <div class="form-button">
            <c-button width="316px" height="46px" type="solid" class='fuz-primary-btn small'
             @click="openInviteModal()"
            >
              {{ $t("invitePrize.invite_friends") }}
            </c-button>
            <p @click="openCodeModal">
              <img
                width="40px"
                src="http://dev-saas-oss.oss-cn-hongkong.aliyuncs.com/upload/20220608201250113.svg"
              />
            </p>
        </div>
          <div class="form-code">
            <p class='fuz-text-small'>{{ $t("invitePrize.invite_link") }}</p>
            <div class='fuz-bg inputbox fuz-text-small' style='width:400px'>
              <span>{{ basic_data.showInviteUrl }}</span>
              <p class="iconP">
                <img
                  class="copy-node"
                  :data-clipboard-text="basic_data.inviteUrl"
                  @click="copyUrl()"
                  width="14px"
                  src="http://dev-saas-oss.oss-cn-hongkong.aliyuncs.com/upload/20220608201158634.png"
                />
              </p>
            </div>
          </div>
          <div class="form-code">
            <p class='fuz-text-small'>{{ $t("invitePrize.invite_code") }}</p>
            <div class='fuz-bg inputbox fuz-text-small'  style='width:300px'>
              <span>{{ basic_data.inviteCode }}</span>
              <p class="iconP">
                <img
                  class="copy-node"
                  :data-clipboard-text="basic_data.inviteCode"
                  @click="copyUrl()"
                  width="14px"
                  src="http://dev-saas-oss.oss-cn-hongkong.aliyuncs.com/upload/20220608201158634.png"
                />
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="content-row">
      <div class="steps">
        <p class='fuz-title'>{{ $t("invitePrize.step_title") }}</p>
        <div>
          <div class="steps-item">
            <div>
              <img
                src="http://dev-saas-oss.oss-cn-hongkong.aliyuncs.com/upload/20220608201338688.svg"
              />
            </div>
            <p>{{ $t("invitePrize.step_one") }}</p>
          </div>
          <div class="steps-item">
            <div>
              <img
                src="http://dev-saas-oss.oss-cn-hongkong.aliyuncs.com/upload/20220608201411208.svg"
              />
            </div>
            <p>{{ $t("invitePrize.step_two") }}</p>
          </div>
          <div class="steps-item">
            <div>
              <img
                src="http://dev-saas-oss.oss-cn-hongkong.aliyuncs.com/upload/20220608201420406.svg"
              />
            </div>
            <p>{{ $t("invitePrize.step_three") }}</p>
          </div>
        </div>
      </div>
      <div class="invitation">
        <p class='fuz-title'>{{ $t("invitePrize.statistical_title") }}</p>
        <div class="total-box fuz-card-plain">
          <div class="total-item">
            <p>{{ $t("invitePrize.statistical_number") }}</p>
            <span>{{ basic_data.invitationUserCount }}</span>
          </div>
          <div class="total-item">
            <p style="font-family: DINPro-Medium">
              {{ $t("invitePrize.statistical_rewardAmount") }}
            </p>
            <span>{{ basic_data.invitationRewardUsdtSum }}</span>
          </div>
          <div class="total-item">
            <p style="font-family: DINPro-Medium">
              {{ $t("invitePrize.statistical_AmountTop") }}
              <span @click="openRankingModal" style="margin-left: 12px"
                >{{ $t("invitePrize.statistical_ranking") }}
                <img
                  src="http://dev-saas-oss.oss-cn-hongkong.aliyuncs.com/upload/20220609160902917.svg"
                  alt=""
              /></span>
            </p>
            <span>{{ basic_data.topReferrerRewardAmount }}</span>
          </div>
        </div>
        <div class="remark-box">
          <div
            class="conditions-award"
            style="font-family: DINPro-Medium"
            v-if="
              !(!condition.needAuth && condition.depositAmount <= 0 && condition.tradeAmount <= 0)
            "
          >
            <p>{{ $t("invitePrize.conditions_award") }}</p>
            <ul>
              <div>
                {{ $t("invitePrize.conditions_one", { day: `${condition.activityDays}` }) }}
              </div>
              <li v-show="condition.needAuth">*&nbsp;{{ $t("invitePrize.conditions_two") }}</li>
              <li v-show="condition.depositAmount > 0">
                *&nbsp;{{ $t("invitePrize.conditions_three") }}{{ condition.depositAmount
                }}{{ condition.depositCoinSymbol }}
              </li>
              <li v-show="condition.tradeAmount > 0">
                *&nbsp;{{
                  $t("invitePrize.conditions_four", {
                    tradeSymbol:
                      condition.tradeSymbol.indexOf("/") !== -1
                        ? condition.tradeSymbol.split("/").join("")
                        : "",
                  })
                }}{{ condition.tradeAmount
                }}{{ condition.tradeSymbolSplitByType }}
              </li>
            </ul>
          </div>
          <div class="conditions-amount">
            <ul class="amount-item" v-show="condition.levelOneRewardAmount > 0">
              <p >{{ $t("invitePrize.conditions_inviter") }}</p>
              <li>
                *&nbsp;{{ $t("invitePrize.conditions_inviter")
                }}<span
                  >{{ condition.levelOneRewardAmount }}&nbsp;{{ condition.rewardCoinSymbol }}</span
                >
              </li>
            </ul>
            <!-- <ul class="amount-item" v-show="condition.levelTwoRewardAmount > 0">
              <p>{{ $t("invitePrize.conditions_inviterFather") }}</p>
              <li>
                *&nbsp;{{ $t("invitePrize.conditions_inviterFather")
                }}<span
                  >{{ condition.levelTwoRewardAmount }}&nbsp;{{ condition.rewardCoinSymbol }}</span
                >
              </li>
            </ul> -->
            <ul class="amount-item" v-show="condition.levelZeroRewardAmount > 0">
              <p>{{ $t("invitePrize.conditions_registration") }}</p>
              <li>
                *&nbsp;{{ $t("invitePrize.conditions_registration")
                }}<span
                  >{{ condition.levelZeroRewardAmount }}&nbsp;{{ condition.rewardCoinSymbol }}</span
                >
              </li>
            </ul>
          </div>
          <div class="conditions-method">
            <p>{{ $t("invitePrize.conditions_method") }}</p>
            <div style="font-family: DINPro-Medium">
              {{ $t("invitePrize.conditions_methodBefore")
              }}{{
                condition.sendType == 1
                  ? $t("invitePrize.conditions_sysItem")
                  : $t("invitePrize.conditions_item")
              }}
            </div>
          </div>
        </div>
      </div>
      <div class="details">
        <p class='fuz-title'>{{ $t("invitePrize.invite_details") }}</p>
        <div class="button-group fuz-button-group">
          <button
            :class="this.detailsType == 'invitation' ? 'active' : ''"
            @click="changeTable('invitation')"
          >
            {{ $t("invitePrize.invite_myInvite") }}
          </button>
          <button
            :class="this.detailsType == 'invitation' ? '' : 'active'"
            @click="changeTable('inviteRewards')"
          >
            {{ $t("invitePrize.invite_inviteRewards") }}
          </button>
          <!-- <c-button
            :type="this.detailsType == 'invitation' ? 'solid' : 'hollow'"
            height="40px"
            width="110px"
            paddingW="0px"
          >
            <span> {{ $t("invitePrize.invite_myInvite") }} </span>
          </c-button>
          <c-button
            :type="this.detailsType == 'invitation' ? 'hollow' : 'solid'"
            height="40px"
            width="110px"
            paddingW="0px"
          > -->
          <!-- <span> {{ $t("invitePrize.invite_inviteRewards") }} </span>
          </c-button> -->
        </div>
        <div class="table-box fuz-card">
          <vue-scroll>
            <c-table
              :columns="columns"
              :colorMap="{}"
              :dataList="dataList"
              :loading="tableLoading"
              :cellHeight="cellHeight"
              classes="invitation-table"
              ref="tableRef"
            />
          </vue-scroll>
          <c-pagination
            v-if="pagination.count / pagination.pageSize > 1"
            :total="pagination.count"
            classes="invitation-page"
            :current-page="pagination.page"
            :display="pagination.pageSize"
            @pagechange="pagechange"
          >
          </c-pagination>
        </div>
      </div>
    </div>
    <promotionInvite :showInviteFlag="showInviteFlag" @closeModal="showInviteFlag = false" />
    <promotionRanking
      v-if="showRankingFlag"
      :showRankingFlag="showRankingFlag"
      @closeModal="showRankingFlag = false"
    />
    <promotionCode
      v-if="showCodeFlag"
      :showCodeFlag="showCodeFlag"
      :imgBase64="basic_data.inviteQECode"
      :code="basic_data.inviteCode"
      :backgroundImg="basic_data.pageConfig.faceToFaceImg"
      @closeModal="showCodeFlag = false"
    />
  </div>
</template>
<script>
import mixin from 'BlockChain-ui/PC/common-mixin/promotion/index/index';
import 'BlockChain-ui/PC/common-mixin/promotion/index/index.styl';
import promotionInvite from './invite.vue';
import promotionRanking from './ranking.vue';
import promotionCode from './QRCode.vue';

export default {
  mixins: [mixin],
  components: {
    promotionInvite,
    promotionRanking,
    promotionCode,
  },
  mounted() {
    this.init();
    this.resetColor();
  },
  beforeDestroy() {
    this.recoveryColor();
  },
  methods: {
    setColor(id, value) {
      document.querySelector(`#icon-${id} path`).setAttribute('fill', value);
    },
    getColor(id) {
      return document.querySelector(`#icon-${id} path`).getAttribute('fill');
    },
    resetColor() {
      this.disableColor = this.getColor('a_10_1');
      this.color = this.getColor('a_10');
      this.setColor('a_10', '#3f4d66');
      this.setColor('a_10_1', '#828ea1');
      this.setColor('a_11', '#3f4d66');
      this.setColor('a_11_1', '#828ea1');
    },
    recoveryColor() {
      this.setColor('a_10', this.color);
      this.setColor('a_10_1', this.disableColor);
      this.setColor('a_11', this.color);
      this.setColor('a_11_1', this.disableColor);
    },
  },
};
</script>
<style>
.promotion {
  background: transparent !important;
}
.content-row {
  width: 1280px !important;
}
.text-row {
  width: 1280px !important;
  position: relative;
  margin-top: 60px !important;
}
.promotion .content-row .details .table-box .invitation-table div {
  background: transparent !important;
}
.promotion .content-row .details .table-box .invitation-table .no-data:before {
  display: none;
}
.promotion .content-row .details .table-box .invitation-table div:first-child {
  display: block;
}
.promotion .content-row .invitation .remark-box p {
  color:#fff;
}
.promotion .banner-row .text-row .text-item div p {
    font-size: 2.5rem;
    letter-spacing: 0px;
    margin: 15px 0;
    font-weight: normal !important;
    padding: 0px 20px;
}
.promotion .banner-row .text-row .text-item div:last-child {
  letter-spacing: 0px;
  color: #4056D8;
  cursor: pointer;
}
.promotion .banner-row .text-row .text-item div:last-child:hover{
  opacity: 0.8;
}
.fuz-title {
  color:#fff !important;
}
.steps-item p {
  color:#fff !important;
}
.total-item > * {
  color:#fff !important;
}
.inputbox {
  width: 200px;
  border-radius: 4px;
  display: flex;
  height: 40px;
  align-items:center;
  padding: 0 10px;
  position: relative;
  color:#fff;
}
.inputbox .iconP {
  position: absolute;
  right: 10px;
  top: 14px;
}
.fuz-text-small {
  color:#fff !important;
  margin-bottom: 10px;
}
.form-button {
  display:flex;
  gap: 10px;
  margin-top: 18px;
  align-items: center;
  margin-right: 20px;
}
.fuz-card-title {
  padding-left: 20px !important;
  border-bottom: none !important;
}
.fuz-card-content{
  padding: 20px !important
}
.img-item {
  position: absolute;
  right: 0;
  top:0;
  width: auto !important;
}
.promotion .common-table .table-head {
    border-bottom: 1px solid rgba(198, 192, 199, 0.1) !important;
    margin: 0 !important;
    padding: 0px !important;
    background: transparent !important;
}
</style>
