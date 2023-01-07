<template>
  <div class="user-management-excc-auth-form a-5-bg">
    <div class="loadinBox" v-if="isLoading">
      <c-loading size="60" />
    </div>
    <template v-else>
      <!-- i.Please state the category/Type of institution investor -->
      <div class="items-box">
      <c-inputLine
        name="institutionalCategoryType"
        inputType="text"
        promptText="i.Please state the category/Type of institution investor"
        maxLength="50"
        marginTop="0px"
        :value="investorPart6.institutionalCategoryType"
        @onchanges="inputChanges"
        >
      </c-inputLine>
      </div>
      <!-- II.Document evidencing Institution Investor status -->
      <div class="items-box">
      <c-inputLine
        name="institutionalInvestorType"
        inputType="text"
        promptText="II.Document evidencing Institution Investor status"
        maxLength="50"
        marginTop="0px"
        :value="investorPart6.institutionalInvestorType"
        @onchanges="inputChanges"
      >
      </c-inputLine>
      </div>
      <!-- 上传附件 -->
      <div class="upload-boxs">
        <p class="upload-tit">
          Please upload the supporting documents to support your ‘institutional investor’ status.
        </p>
        <c-uploadFile
          @tellMessage="onChangeFileFun"
          maxSize="5"
          name="institutionalUpload"
        ></c-uploadFile>
        <div class="img-box">
            <div class="loading-box" v-if="uploadLoading">
              <c-loading size="34" className="common-button-loading a-12-bd"/>
              <span class="loading-text">On the cross</span>
            </div>
            <template v-else>
              <div
                class="files-box"
                v-if="investorPart6.institutionalUpload !== ''
                && investorPart6.institutionalUpload.includes('pdf')">
                <div class="files-content">
                  <svg class="icon icon-42" aria-hidden="true">
                    <use xlink:href="#icon-b_11"></use>
                  </svg>
                  <p>{{ img1Name }}</p>
                </div>
              </div>
              <div
                class="files-box"
                v-else-if="investorPart6.institutionalUpload !== ''
                && !investorPart6.institutionalUpload.includes('pdf')">
                <img :src="investorPart6.institutionalUpload" class="loading-img"/>
              </div>
              <div class="files-box" v-else>
                <img src="@/assets/images/1/add.png" alt="">
              </div>
              <div class="remove"
                @click="removeImg('institutionalUpload')"
                v-if="investorPart6.institutionalUpload !== ''">
                <img src="@/assets/images/1/remove.png" alt="">
              </div>
            </template>
          </div>
      </div>
      <div class="button-boxs">
        <c-button
          type="text"
          :big="true"
          marginTop="18px"
          height="40px"
          width="178px"
          @click="previous('6')"
          >Previous
        </c-button>
          <!-- :disabled="disabled" -->
        <c-button
          type="solid"
          :big="true"
          marginTop="18px"
          height="40px"
          width="178px"
          :disabled="part6cDisabled"
          @click="btnLink('6B')"
          >Next
        </c-button>
      </div>
    </template>
  </div>
</template>

<script>
import mixin from 'BlockChain-ui/PC/common-mixin/personal/partSixc/partSixc';
import 'BlockChain-ui/PC/common-mixin/personal/partOne/common-part.styl';

export default {
  mixins: [mixin],
  created() {
    this.init();
  },
};
</script>
