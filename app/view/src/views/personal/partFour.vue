<template>
  <div class="user-management-excc-auth-form a-5-bg">
    <div class="loadinBox" v-if="isLoading">
      <c-loading size="60" />
    </div>
    <template v-else>
      <div class="form-items" v-for="(item, ind) in authorisedRepresentativeParts4" :key="ind">
        <!-- Full Legal Name -->
        <div class="items-box">
        <c-inputLine
          :name="ind+'-fullLegalName'"
          inputType="text"
          promptText="Full Legal Name"
          maxLength="50"
          marginTop="0px"
          :value="item.fullLegalName"
          @onchanges="inputChanges"
        >
        </c-inputLine>
        </div>
        <!-- Designation -->
        <div class="items-box">
        <c-inputLine
          :name="ind+'-designation'"
          inputType="text"
          promptText="Designation"
          maxLength="50"
          marginTop="0px"
          :value="item.designation"
          @onchanges="inputChanges"
        >
        </c-inputLine>
        </div>
        <!-- Contact Number -->
        <div class="items-box">
        <c-select
          :value="item.countryCode"
          :filterable="true"
          promptText="Contact Number"
          @onChanges='countryChange'
          :name="ind+'-countryCode'"
          :options="countryCodeList"
        />
        </div>
        <div class="items-box">
        <c-inputLine
          :name="ind+'-number'"
          inputType="text"
          promptText="Contact Number"
          maxLength="50"
          marginTop="0px"
          :value="item.number"
          @onchanges="inputChanges"
          >
        </c-inputLine>
        </div>
        <!-- Email Address -->
        <div class="items-box">
        <c-inputLine
          :name="ind+'-emailAddress'"
          inputType="text"
          promptText="Email Address"
          maxLength="50"
          marginTop="0px"
          :errorHave="true"
          :errorFlag="item[ind+'-emailFlag']"
          :errorText="emailText"
          :value="item.emailAddress"
          @onchanges="inputChanges"
        >
        </c-inputLine>
        </div>
        <!-- 上传附件1 -->
        <div class="upload-boxs">
          <p class="upload-tit">
            Please upload Proof of Due Authorization
          </p>
          <p class="upload-tit">
            1.Board Resolution/ Board Committee Resolution/ Extract of Board Resolution
          </p>
          <p class="upload-tit">2.Official specimen signature card</p>
          <p class="upload-tit">
            3.Identity Document (IF Authorised Signatory is not a connected party stated in Part 2)
          </p>
          <c-uploadFile
            v-if="item.proofOfAuthorised === ''"
            @tellMessage="onChangeFileFun"
            maxSize="5"
            :name="ind+'-proofOfAuthorised'"
          ></c-uploadFile>
          <div class="img-box">
            <div class="loading-box" v-if="uploadLoading">
              <c-loading size="34" className="common-button-loading a-12-bd"/>
              <span class="loading-text">On the cross</span>
            </div>
            <template v-else>
              <div
                class="files-box"
                v-if="item.proofOfAuthorised !== '' && item.proofOfAuthorised.includes('pdf')">
                <div class="files-content">
                  <svg class="icon icon-42" aria-hidden="true">
                    <use xlink:href="#icon-b_11"></use>
                  </svg>
                  <p>
                    {{
                      // eslint-disable-next-line max-len
                      item.proofOfAuthorised.split('/')[item.proofOfAuthorised.split('/').length - 1]
                    }}
                  </p>
                </div>
              </div>
              <div
                class="files-box"
                v-else-if="item.proofOfAuthorised
                !== '' && !item.proofOfAuthorised.includes('pdf')">
                <img :src="item.proofOfAuthorised" class="loading-img"/>
              </div>
              <div class="files-box" v-else>
                <img src="@/assets/images/1/add.png" alt="">
              </div>
              <div
                class="remove"
                @click="removeImg(ind, 'proofOfAuthorised')"
                v-if="item.proofOfAuthorised !== ''">
                <img src="@/assets/images/1/remove.png" alt="">
              </div>
            </template>
          </div>
          <p class="upload-note">
            Note：Single file less than 10MB, only png, jpg and pdf are supported.
          </p>
        </div>
      </div>
      <div class="dom-btn">
        <svg class="icon icon-18" aria-hidden="true" @click="addDom">
          <use xlink:href="#icon-a_2_1"></use>
        </svg>
        <svg
          class="icon icon-18 icon-right"
          aria-hidden="true"
          v-if="authorisedRepresentativeParts4.length > 1"
          @click="removeDom">
          <use xlink:href="#icon-a_3_1"></use>
        </svg>
      </div>
      <div class="button-boxs">
        <c-button
          type="text"
          :big="true"
          marginTop="18px"
          height="40px"
          width="178px"
          @click="previous('3A')"
          >Previous
        </c-button>
          <!-- :disabled="disabled" -->
        <c-button
          type="solid"
          :big="true"
          marginTop="18px"
          height="40px"
          width="178px"
          :disabled="partFourDisabled"
          @click="btnLink('5')"
          >Next
        </c-button>
      </div>
    </template>
  </div>
</template>

<script>
import mixin from 'BlockChain-ui/PC/common-mixin/personal/partFour/partFour';
import 'BlockChain-ui/PC/common-mixin/personal/partOne/common-part.styl';

export default {
  mixins: [mixin],
  created() {
    this.init();
  },
};
</script>
