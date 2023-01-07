<template>
  <div class="editPayment v5-10-bg">
    <header class="payment-header v5-5-cl v5-12-bd">
      <svg class="icon icon-20 icon-back" aria-hidden="true" @click="goBack">
        <use xlink:href="#icon-v5_36"></use>
      </svg>
      <span>{{$t('personal.setUp.title2')}}</span>
    </header>
    <section class="payment-form">
      <div class="payment-name">
        <span class="line" :style="{'background-color': paymentColor}"></span>
        <span class="text v5-5-cl">{{paymentName}}</span>
      </div>
      <div
        class="form-item"
        v-for="(item, index) in paymentFieldList"
        :key="index">
        <div v-if="item.fieldType === 4" class="realName">
          <div class="fieldName v5-6-cl">{{item.fieldTitle}}</div>
          <div class="fieldValue v5-5-cl">{{userName}}</div>
        </div>
        <c-v5-input
          v-if="item.fieldType === 1 || item.fieldType === 2"
          width="100%"
          :type="item.fieldType === 1 ? 'text':'textarea'"
          :name="item.fieldName"
          :value="formData[item.fieldName]"
          :promptText="item.fieldTitle"
          promptClass="v5-6-cl"
          :placeholder="item.fieldPrompt"
          :errorHave="true"
          :errorFlag="!!error[item.fieldName]"
          :errorText="error[item.fieldName]"
          @onChanges="inputChange"
        >
        </c-v5-input>
        <div v-if="item.fieldType === 3" class="form-upload">
          <div class="fieldName v5-6-cl">{{item.fieldTitle}}</div>
          <div class="upload-content">
            <c-v5-uploadFile
              :name="item.fieldName"
              :maxSize="8"
              url="common/upload_qrcode"
              :imgSrc="formData[item.fieldName]"
              @change="uploadChange"
              @delete="deleteImg"></c-v5-uploadFile>
          </div>
          <div class="upload-error v5-3-cl">{{error[item.fieldName]}}</div>
        </div>
      </div>
      <div class="payment-tip">
        <div class="tip-title v5-5-cl">{{$t("otcRelease.Reminder")}}</div>
        <div class="tip-text v5-6-cl">{{$t("personal.leaglTenderSet.tip")}}</div>
      </div>
      <div class="payment-button">
        <c-v5-button
          width="203px"
          paddingW="0"
          :defaultColorClass="colorList_1"
          :hoverColorClass="colorList_1"
          :activeColorClass="colorList_1"
          @click="goBack">{{$t('components.dialog.closeText')}}</c-v5-button>
        <c-v5-button
          width="203px"
          paddingW="0"
          :defaultColorClass="colorList_2"
          :hoverColorClass="colorList_2"
          :activeColorClass="colorList_2"
          @click="confirm">{{$t('components.dialog.confirmText')}}</c-v5-button>
      </div>
    </section>
    <!-- 验证框 -->
    <c-v5-dialog
      :showFlag="dialogFlag"
      :titleText="$t('login.SecurityVerification')"
      :confirmLoading="dialogConfirmLoading"
      :confirmDisabled="dialogConfirmDisabled"
      @close="dialogClose"
      @confirm="dialogConfirm">
      <!-- 手机号验证框 -->
      <div class="valid-form_item">
        <c-v5-input
          v-if="OpenMobile"
          maxLength="6"
          name="phoneValue"
          width="378px"
          :value="phoneValue"
          :promptText="$t('login.phoneCode')"
          promptClass="v5-6-cl"
          :errorHave="true"
          :errorFlag="phoneError"
          :errorText="$t('login.phoneCodeError')"
          @onChanges="codeChange"
        >
          <!-- 获取验证码 -->
          <div slot="append">
            <c-v5-getCode
              name="withdrawGetcode"
              :voiceOpen ="voiceSmsOpen"
              @click="getCodeClick"/>
          </div>
        </c-v5-input>
      </div>
      <!-- 谷歌验证码 -->
      <div class="valid-form_item">
        <c-v5-input
          v-if="OpenGoogle"
          maxLength="6"
          name="googleValue"
          width="378px"
          :value="googleValue"
          :promptText="$t('login.googleCode')"
          promptClass="v5-6-cl"
          :errorHave="true"
          :errorFlag="googleError"
          :errorText="$t('login.googleCodeError')"
          @onChanges="codeChange"
        >
        </c-v5-input>
      </div>
    </c-v5-dialog>
    <div v-show="loading" class="loading">
      <c-loading size="50" />
    </div>
  </div>
</template>
<script>
import mixin from 'BlockChain-ui/PC/common-mixin/personal/SetUp/index';
import 'BlockChain-ui/PC/common-mixin/personal/SetUp/index.styl';

export default {
  mixins: [mixin],
  mounted() {
    this.init();
  },
};
</script>
