<template>
    <div class="payment1">
      <c-inputLine
        name="userName"
        maxLength="50"
        :promptText="promptText1"
        :errorHave="true"
        :errorText="errorText1"
        :errorFlag="checkErrorFlag1"
        marginTop="0px"
        :value="checkValue1"
        @onchanges="inputChanges"
      >
      </c-inputLine>
      <c-inputLine
        name="account"
        maxLength="50"
        :promptText="promptText2"
        :errorHave="true"
        :errorText="errorText2"
        :errorFlag="checkErrorFlag2"
        marginTop="0px"
        :value="checkValue2"
        @onchanges="inputChanges"
      >
      </c-inputLine>
      <div class="upload_div a-4-bg a-2-bd">
        <div v-if="imgLoading">
          <c-loading size="34" className="common-button-loading a-12-bd"/>
          <p class="b-4-cl loading-text">{{$t('personal.prompt.uploading')}}</p>
        </div>
        <div v-else>
          <div class="loading-mc" v-if="imgSrc !== ''">
            <img :src="imgSrc" class="loading-img"/>
            <div class="b-2-bg"></div>
          </div>
          <div class="loading-text2">
            <svg class="icon icon-24" aria-hidden="true">
              <use xlink:href="#icon-e_10"></use>
            </svg>
            <p class="b-4-cl">
              {{imgSrc
              ? $t('personal.prompt.uploadQrCodAgain')
              : $t('personal.prompt.uploadQrCod')}}
            </p>
          </div>
        </div>
        <c-oldUploadFile
          className="upload_file"
          maxSize= "8"
          name= "qrCode"
          url= "common/upload_qrcode"
          :isOpenUploadImg= "isOpenUploadImg"
          imageType="2"
          :expand= []
          :isWaterMark="true"
          @tellMessage="onChangeFileFun"
          @uploadFinish="uploadFinish">
        </c-oldUploadFile>
      </div>
      <p class="upload_p">{{$t('personal.prompt.uploadType')}}</p>
    </div>
</template>

<script>
import mixin from 'BlockChain-ui/PC/common-mixin/personal/payments/payments1/payments1';
import 'BlockChain-ui/PC/common-mixin/personal/payments/payments1/payments1.styl';

export default {
  mixins: [mixin],
  mounted() {
    this.init();
  },
};
</script>
