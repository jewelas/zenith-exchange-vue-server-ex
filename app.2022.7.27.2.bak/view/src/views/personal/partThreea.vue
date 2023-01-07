<template>
  <div class="user-management-excc-auth-form a-5-bg">
    <div class="loadinBox" v-if="isLoading">
      <c-loading size="60" />
    </div>
    <template v-else>
      <div class="form-items" v-for="(item, ind) in beneficialOwnerParts3" :key="ind">
        <!-- Full Legal Name of the Beneficial Owner -->
        <div class="items-box">
        <c-inputLine
          :name="ind+'-fullLegalBeneficialownerName'"
          inputType="text"
          promptText="Full Legal Name of the Beneficial Owner"
          maxLength="50"
          marginTop="0px"
          :value="item.fullLegalBeneficialownerName"
          @onchanges="inputChanges"
        >
        </c-inputLine>
        </div>
        <!-- Percentage of Shares and Currency -->
        <div class="items-box">
        <c-inputLine
          :name="ind+'-percentageSharesAndCurrency'"
          inputType="text"
          promptText="Percentage of Shares and Currency"
          maxLength="50"
          marginTop="0px"
          :value="item.percentageSharesAndCurrency"
          @onchanges="inputChanges"
        >
        </c-inputLine>
        </div>
        <!-- Residential Address -->
        <div class="items-box">
        <c-inputLine
          :name="ind+'-residentialAddress'"
          inputType="text"
          promptText="Residential Address"
          maxLength="50"
          marginTop="0px"
          :value="item.residentialAddress"
          @onchanges="inputChanges"
        >
        </c-inputLine>
        </div>
        <!-- Nationality -->
        <div class="items-box">
        <c-select
          :value="item.nationality"
          promptText="Nationality"
          @onChanges="selectChange"
          :name="ind+'-nationality'"
          :options="countryLists"
          :filterable="true"
        />
        </div>
        <!-- Identity Number -->
        <div class="items-box">
        <c-inputLine
          :name="ind+'-identityNumberPassport'"
          inputType="text"
          promptText="Identity Number"
          maxLength="50"
          marginTop="0px"
          :value="item.identityNumberPassport"
          @onchanges="inputChanges"
        >
        </c-inputLine>
        </div>
        <!-- 上传附件1 -->
        <div class="upload-boxs">
          <p class="upload-tit">
            Please upload Proof of Identity of the Ultimate Beneficial Owner(s)
          </p>
          <p class="upload-tit">E.g. NRIC, Passport</p>
          <c-uploadFile
            v-if="item.proofOfBeneficial === ''"
            @tellMessage="onChangeFileFun"
            maxSize="5"
            :name="ind+'-proofOfBeneficial'"
          ></c-uploadFile>
          <div class="img-box">
            <div class="loading-box" v-if="uploadLoading">
              <c-loading size="34" className="common-button-loading a-12-bd"/>
              <span class="loading-text">On the cross</span>
            </div>
            <template v-else>
              <div
                class="files-box"
                v-if="item.proofOfBeneficial !== '' && item.proofOfBeneficial.includes('pdf')">
                <div class="files-content">
                  <svg class="icon icon-42" aria-hidden="true">
                    <use xlink:href="#icon-b_11"></use>
                  </svg>
                  <p>
                    {{
                      // eslint-disable-next-line max-len
                      item.proofOfBeneficial.split('/')[item.proofOfBeneficial.split('/').length - 1]
                    }}
                  </p>
                </div>
              </div>
              <div
                class="files-box"
                v-else-if="item.proofOfBeneficial
                !== '' && !item.proofOfBeneficial.includes('pdf')">
                <img :src="item.proofOfBeneficial" class="loading-img"/>
              </div>
              <div class="files-box" v-else>
                <img src="@/assets/images/1/add.png" alt="">
              </div>
              <div
                class="remove"
                @click="removeImg(ind, 'proofOfBeneficial')"
                v-if="item.proofOfBeneficial !== ''">
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
          v-if="beneficialOwnerParts3.length > 1"
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
          @click="previous('3')"
          >Previous
        </c-button>
        <c-button
          type="solid"
          :big="true"
          marginTop="18px"
          height="40px"
          width="178px"
          :disabled="partThreeaDisabled"
          @click="btnLink('4')"
          >Next
        </c-button>
      </div>
    </template>
  </div>
</template>

<script>
import mixin from 'BlockChain-ui/PC/common-mixin/personal/partThreea/partThreea';
import 'BlockChain-ui/PC/common-mixin/personal/partOne/common-part.styl';

export default {
  mixins: [mixin],
  created() {
    this.init();
  },
};
</script>
