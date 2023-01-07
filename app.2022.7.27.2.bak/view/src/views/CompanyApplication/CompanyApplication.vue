<template>
  <div
    v-if="viewShow"
    class="company-application-page company-application-container fuz-page-content"
  >
    <div class="company-application fuz-card fuz-full">
      <div class="application-header">
        <h1 class="b-1-cl title">{{ $t("application.applyCompany") }}</h1>
        <p class="b-2-cl desc">{{ $t("application.applyCompanyDesc") }}</p>
      </div>
      <ul class="service-list">
        <li
          class="li fuz-card-plain"
          v-for="(item, inx) in serviceList"
          :key="`serviceList${inx}`"
        >
          <img :src="imgList[inx]" class="icon" />
          <h3 class="b-1-cl li-title">{{ item.title }}</h3>
          <p class="b-2-cl li-desc">{{ item.desc }}</p>
        </li>
      </ul>
      <div class="application-region">
        <p class="b-2-cl app-desc" v-if="applyPass">{{ congratulate }}</p>
        <p class="b-2-cl app-desc" v-if="btnShow">
          <c-checkBox :value="textFlag" @click="checkoutClick" />
          <span class="protocol"
            >{{ $t("application.agree") }}
            <a href="/applicationPolicy" target="_blank" class=" b-4-cl">{{
              $t("application.agreePolicy")
            }}</a>
          </span>
        </p>
        <div class="btn-region b-4-cl">
          <c-button
            v-if="relieving"
            height="40px"
            width="140px"
            @click="relieving"
            className="comBtn"
            :disabled="true"
            paddingW="0px"
            >{{ $t("application.relieveing") }}
          </c-button>
          <c-button
            v-if="btnShow"
            height="40px"
            width="140px"
            @click="apply"
            className="comBtn"
            :disabled="submitDisabled"
            paddingW="0px"
            >{{ applyBtn }}
          </c-button>
          <c-button
            v-if="applyPass"
            :big="true"
            @click="relieveClick"
            :type="
              (applyStatus === 3 && applyRuleStatus === 3) ||
              (applyStatus === 2 && applyRuleStatus === 3)
                ? undefined
                : 'text'
            "
            className="relieve-btn comBtn"
            paddingW="31px"
            height="40px"
            >{{ this.$t("application.relieve") }}
          </c-button>
        </div>
      </div>
      <!-- 提示框 -->
      <c-dialog
        :showFlag="alertFlag"
        buttonText="btnConfirm"
        :titleText="$t('application.relieve')"
        @close="alertClose"
        :confirmLoading="confirmLoading"
        @confirm="confirm"
      >
        <p class="b-2-cl dialog-text">{{ $t("application.dialogDesc") }}</p>
      </c-dialog>
    </div>
  </div>
</template>

<script>
import mixin from 'BlockChain-ui/PC/common-mixin/CompanyApplication/CompanyApplication/CompanyApplication';
import 'BlockChain-ui/PC/common-mixin/CompanyApplication/CompanyApplication/CompanyApplication.styl';

export default {
  mixins: [mixin],
  mounted() {
    this.init();
  },
};
</script>
<style scoped>
.fuz-card-plain {
  box-sizing: content-box;
}
</style>
