<template>
  <section class="page-b2cRecrge">
    <!-- 充值 -->
    <header class="withdraw-header b-1-cl a-3-bd">{{ $t('assets.recharge.recharge') }}</header>
    <div class="withdraw-details clearfix a-7-bd">
      <div class="clearfix">
        <div class="details-left">
          <div class="symbol b-1-cl">{{showSymbol}}{{ $t('assets.b2c.recrgeTitle') }}</div>
          <ul class="b2cRecrge-mess">
            <even
              v-for="(item, index) in messageOptions"
              :key="index"
              :title="item.title"
              :haveCopy="item.haveCopy"
              :value="messageValue[index]"
              :hover="item.hover"
            />
          </ul>
          <div v-if="warning" class="details-warking b-7-cl clearfix">
            <svg class="icon icon-16 details-warking-icon" aria-hidden="true">
              <use xlink:href="#icon-c_2" />
            </svg>
            <span class="details-warking-text">{{warning}}</span>
          </div>
        </div>
        <div class="details-right">
          <c-inputLine
            name="rechargeNum"
            :value="rechargeNum"
            :errorFlag="rechargeNumError"
            :errorHave="true"
            errorText
            :promptText="inputW"
            @onchanges="inputChanges"
          >
            <div></div>
          </c-inputLine>
          <div class="details-warking b-7-cl clearfix details-wark">
            <!-- 注: 单笔充值不得小于 -->
            <span
              class="details-warking-text recrgeWarn"
            >{{$t('assets.b2c.rechargeMin')}}{{minRecrge | fixDFn(that)}} {{symbol}}</span>
          </div>
          <div v-if="isOther"
            class="otherClass">实际需充值：<span class="f-1-cl">
              {{ aikrw }} KRW</span></div>
          <div class="voucher">
            {{$t('assets.b2c.voucherTit')}}
            <span class="tolanIcon">
              <svg class="icon icon-14" aria-hidden="true">
                <use xlink:href="#icon-a_15" />
              </svg>
              <!-- 通过线下完成转账后，上传您的转账记录 -->
              <div class="iconMark a-4-bg b-1-cl">{{$t('assets.b2c.voucherWarn')}}</div>
            </span>
          </div>
          <div class="uploadImg a-4-bg a-2-bd">
            <div class="uploadMark" v-if="!imgLoading">
              <div>
                <svg class="icon icon-24" aria-hidden="true">
                  <use xlink:href="#icon-e_9" />
                </svg>
              </div>
              <!-- 上传转账凭证 -->
              <p class="uploadMark-text u-8-cl">{{ $t('assets.b2c.voucherCli') }}</p>
            </div>
            <div class="uploadLoading" v-else>
              <c-loading size="34" />
              <p class="uploadMark-text u-8-cl">{{ $t('questions.upload4') }}</p>
            </div>
            <c-oldUploadFile
              class="upload_file"
              name="questionsImg"
              url="common/upload_img"
              :isOpenUploadImg="isOpenUploadImg"
              :expand="[]"
              v-if="Number(clientUploadType)"
              :imageType="imageType"
              @tellMessage="onChangeFileFun"
              @uploadFinish="uploadFinish"
            ></c-oldUploadFile>
            <c-oldUploadFile
              class="upload_file"
              name="questionsImg"
              url="common/upload_img"
              :isOpenUploadImg="isOpenUploadImg"
              :expand="[]"
              v-if="!Number(clientUploadType)"
              :imageType="imageType"
              @tellMessage="onChangeFileFun"
              @uploadFinish="uploadFinish"
            ></c-oldUploadFile>
            <div class="b-2-bg imgmk" v-if="imgUrl.length"></div>
            <img v-if="imgUrl.length" :src="imgUrl" alt class="upload-image" />
          </div>
          <c-button
            :disabled="btnDisabled"
            :loading="buttonLoading"
            marginTop="40px"
            height="40px"
            width="380px"
            paddingW="0"
            @click="submit"
          >{{ $t('assets.recharge.recharge') }}</c-button>
        </div>
      </div>
    </div>
    <!-- 最近提现记录 -->
    <header class="withdraw-header b-1-cl a-3-bd">
      {{ $t('assets.recharge.RecentRechargeRecord') }}</header>
    <div class="withdraw-table">
      <his-table :symbol="symbol" :lately="true" />
    </div>
    <c-verifyCationc-alert
      :imgMap="imgMap"
      :showFlag="alertFlag"
      :titleText="$t('assets.withdraw.safetyWarning')"
      :detaText="authTitleText"
      :dataList="alertData"
      :buttonText="$t('assets.withdraw.GotoOpen')"
      :haveClose="false"
      @close="alertClone"
      @confirm="alertGo"
    />
    <!-- 对话框  38-24=14 -->
    <c-dialog
      :showFlag="dialogFlag"
      paddingBottom="14px"
      :confirmLoading="dialogConfirmLoading"
      @close="dialogClose"
      @confirm="dialogConfirm"
      titleText="充值确认"
    >
      <section class="b2cRecrgeDialog">
        <!-- 确定您已通过您本人实名的账户向平台充值账户完成如下金额的转账？ -->
        <div class="b-7-cl b2cRecrgeDialog-warn">确定您已通过您本人实名的账户向平台充值账户完成如下金额的转账？</div>
        <ul class="confirmMess">
          <li class="a-4-bg">
            <!-- rechargeConfrim -->
            <p class="key">{{$t('assets.b2c.rechargeSum')}}</p>
            <p class="value b-1-cl">{{ rechargeNum }} {{ symbol }}
              <span v-if="isOther"> ≈ {{ aikrw }} KRW</span>
            </p>
          </li>
          <li class="a-4-bg" v-if="imgUrl">
            <!-- 充值到指定帐号 -->
            <p class="key">{{$t('assets.b2c.voucherTit')}}</p>
            <p class="value b-1-cl"><img :src="imgUrl" @click="imgClick"/></p>
          </li>
        </ul>
      </section>
    </c-dialog>
    <c-QRcode :flag="QRflag"
      :imgUrl="imgUrl"
      @QRcodeClick="QRcodeClick"/>
  </section>
</template>
<script>
import b2cMixin from 'BlockChain-ui/PC/common-mixin/assets/b2cMixin/b2cMixin';
import mixin from 'BlockChain-ui/PC/common-mixin/assets/b2cRecrge/b2cRecrge';
import 'BlockChain-ui/PC/common-mixin/assets/b2cRecrge/b2cRecrge.styl';
import even from './b2cRecrgeEven.vue';
import hisTable from './b2cRecrgeHis.vue';

export default {
  mixins: [b2cMixin, mixin],
  components: {
    even,
    hisTable,
  },
  name: 'page-b2cRecrge',
  mounted() {
    this.init();
  },
};
</script>
