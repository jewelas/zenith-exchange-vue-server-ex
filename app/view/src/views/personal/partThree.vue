<template>
  <div class="user-management-excc-auth-form a-5-bg">
    <div class="loadinBox" v-if="isLoading">
      <c-loading size="60" />
    </div>
    <template v-else>
      <div class="form-items" v-for="(item, ind) in shareholdersParts3" :key="ind">
        <!-- Full Legal Name of the Shareholder -->
        <div class="items-box">
        <c-inputLine
          :name="ind+'-fullLegalShareholderName'"
          inputType="text"
          promptText="Full Legal Name of the Shareholder"
          maxLength="50"
          marginTop="0px"
          :disabled="item.fullLegalShareholderNameFlag"
          :value="item.fullLegalShareholderName"
          @onchanges="inputChanges"
        >
        </c-inputLine>
        </div>
        <!-- Nationality/Place of incorporation -->
        <div class="items-box">
        <c-select
          :value="item.nationality"
          promptText="Nationality/Place of incorporation"
          @onChanges="selectChange"
          :name="ind+'-nationality'"
          :disabled="item.nationalityFlag"
          :options="countryLists"
          :filterable="true"
        />
        </div>
        <!-- Identity Number/UEN/Registration/Incorporation Number -->
        <div class="items-box">
        <c-inputLine
          :name="ind+'-incorporationNumber'"
          inputType="text"
          promptText="Identity Number/UEN/Registration/Incorporation Number"
          maxLength="50"
          marginTop="0px"
          :disabled="item.incorporationNumberFlag"
          :value="item.incorporationNumber"
          @onchanges="inputChanges"
        >
        </c-inputLine>
        </div>
        <!-- Share Type -->
          <!-- :errorFlag="checkErrorFlag2" -->
        <div class="items-box">
        <c-inputLine
          :name="ind+'-shareType'"
          inputType="text"
          promptText="Share Type"
          maxLength="50"
          marginTop="0px"
          :disabled="item.shareTypeFlag"
          :value="item.shareType"
          @onchanges="inputChanges"
        >
        </c-inputLine>
        </div>
        <!-- Share Allocation and Currency -->
        <div class="items-box">
        <c-inputLine
          :name="ind+'-sharesAllocation'"
          inputType="text"
          promptText="Share Allocation and Currency"
          maxLength="50"
          marginTop="0px"
          :disabled="item.sharesAllocationFlag"
          :value="item.sharesAllocation"
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
        <!-- 上传附件1 -->
        <div class="upload-boxs">
          <p class="upload-tit">Please upload Proof of Identity of the Shareholders</p>
          <p class="upload-tit">E.g.NRIC.Passport,Corporate Registry Profile</p>
          <c-uploadFile
            v-if="item.proofOfShareholders === ''"
            @tellMessage="onChangeFileFun"
            maxSize="5"
            :name="ind+'-proofOfShareholders'"
          ></c-uploadFile>
          <div class="img-box">
            <div class="loading-box" v-if="uploadLoading">
              <c-loading size="34" className="common-button-loading a-12-bd"/>
              <span class="loading-text">On the cross</span>
            </div>
            <template v-else>
              <div
                class="files-box"
                v-if="item.proofOfShareholders !== '' && item.proofOfShareholders.includes('pdf')">
                <div class="files-content">
                  <svg class="icon icon-42" aria-hidden="true">
                    <use xlink:href="#icon-b_11"></use>
                  </svg>
                  <p>
                    {{
                      // eslint-disable-next-line max-len
                      item.proofOfShareholders.split('/')[item.proofOfShareholders.split('/').length - 1]
                    }}
                  </p>
                </div>
              </div>
              <div
                class="files-box"
                v-else-if="item.proofOfShareholders
                !== '' && !item.proofOfShareholders.includes('pdf')">
                <img :src="item.proofOfShareholders" class="loading-img"/>
              </div>
              <div class="files-box" v-else>
                <img src="@/assets/images/1/add.png" alt="">
              </div>
              <div class="remove"
                @click="removeImg(ind, 'proofOfShareholders')"
                v-if="item.proofOfShareholders !== ''">
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
          v-if="shareholdersParts3.length > 1"
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
          @click="previous('2A')"
          >Previous
        </c-button>
        <c-button
          type="solid"
          :big="true"
          :disabled="partThreeDisabled"
          marginTop="18px"
          height="40px"
          width="178px"
          @click="btnLink('3A')"
          >Next
        </c-button>
      </div>
    </template>
  </div>
</template>

<script>
import mixin from 'BlockChain-ui/PC/common-mixin/personal/partThree/partThree';
import 'BlockChain-ui/PC/common-mixin/personal/partOne/common-part.styl';

export default {
  mixins: [mixin],
  created() {
    this.init();
  },
};
</script>
