<template>
  <div class="user-management-excc-auth-form a-5-bg">
    <div class="loadinBox" v-if="isLoading">
      <c-loading size="60" />
    </div>
    <template v-else>
      <div class="form-items" v-for="(item, ind) in entityParts1" :key="ind">
        <div class="items-box">
          <!-- 姓名 -->
          <c-inputLine
            :name="ind+'-fullLegalName'"
            inputType="text"
            promptText="Full Legal Name of the Applican"
            maxLength="50"
            marginTop="0px"
            :disabled="item.fullLegalNameFlag"
            :value="item.fullLegalName"
            @onchanges="inputChanges"
            >
          </c-inputLine>
        </div>
        <!-- 国家或地区 -->
        <div class="items-box">
          <c-select
            :value="item.incorporationCountry"
            promptText="Country of Incorporation"
            @onChanges='selectChange'
            :name="ind+'-incorporationCountry'"
            :options="countryLists"
            :disabled="item.incorporationCountryFlag"
            :filterable="true"
          />
        </div>
        <!-- 日期 -->
        <div class="items-box">
        <c-calendar
          :name="ind+'-incorporationDate'"
          :value="item.incorporationDate"
          :futureDayHide="endTimeNum"
          promptText="Date of Incorporation"
          :disabled="item.incorporationDateFlag"
          @onChanges="onChangeCalendar"
        />
        </div>
        <!-- Unique Entity Number -->
        <div class="items-box">
        <c-inputLine
          :name="ind+'-incorporationNumber'"
          inputType="text"
          promptText="Unique Entity Number (UEN) / Incorporation Number"
          maxLength="50"
          marginTop="16px"
          :value="item.incorporationNumber"
          :disabled="item.incorporationNumberFlag"
          @onchanges="inputChanges"
        >
        </c-inputLine>
        </div>
        <!-- Legal Entity Type -->
        <div class="items-box">
        <c-select
          :filterable="true"
          :value="item.legalEntityType"
          promptText="Legal Entity Type"
          @onChanges='selectChange'
          :name="ind+'-legalEntityType'"
          :options="LegalEntityTypeList"
        />
        </div>
        <div class="items-box">
        <c-inputLine
          v-if="item.legalEntityType === 'Others'"
          :name="ind+'-legalEntityTypeOther'"
          inputType="text"
          promptText="Others"
          maxLength="50"
          marginTop="16px"
          :value="item.legalEntityTypeOther"
          @onchanges="inputChanges"
          >
        </c-inputLine>
        </div>
        <!-- Legal Entity Ownership -->
        <div class="items-box">
        <c-select
          :filterable="true"
          :value="item.legalEntityOwnership"
          promptText="Legal Entity Ownership"
          @onChanges='selectChange'
          :name="ind+'-legalEntityOwnership'"
          :disabled="item.legalEntityOwnershipFlag"
          :options="LegalEntityOwnershipList"
        />
        </div>
        <!-- Business Nature -->
        <div class="items-box">
        <c-inputLine
            :name="ind+'-businessNature'"
            inputType="text"
            promptText="Business Nature"
            maxLength="50"
            marginTop="0px"
            :disabled="item.businessNatureFlag"
            :value="item.businessNature"
            @onchanges="inputChanges"
          >
        </c-inputLine>
        </div>
        <!-- Registered Address -->
        <p class="add-text">Registered Address</p>
        <template>
          <!-- Address Line 1 -->
          <div class="items-small-box">
          <c-inputLine
            :name="ind+'-registerAddressLine1'"
            inputType="text"
            promptText="Address Line 1"
            maxLength="100"
            marginTop="0px"
            :disabled="item.registerAddressLine1Flag"
            :value="item.registerAddressLine1"
            @onchanges="inputChanges"
          >
          </c-inputLine>
          </div>
          <!-- Address Line 2 -->
          <div class="items-small-box">
          <c-inputLine
            :name="ind+'-registerAddressLine2'"
            inputType="text"
            promptText="Address Line 2"
            maxLength="100"
            marginTop="0px"
            :disabled="item.registerAddressLine2Flag"
            :value="item.registerAddressLine2"
            @onchanges="inputChanges"
          >
          </c-inputLine>
          </div>
          <!-- city -->
          <div class="items-small-box">
          <c-inputLine
            :name="ind+'-registerAddressCity'"
            inputType="text"
            promptText="City"
            maxLength="100"
            marginTop="0px"
            :disabled="item.registerAddressCityFlag"
            :value="item.registerAddressCity"
            @onchanges="inputChanges"
          >
          </c-inputLine>
          </div>
          <!-- 国家 -->
          <div class="items-small-box">
          <c-select
            :value="item.registerAddressCountry"
            promptText="Country"
            @onChanges='selectChange'
            :name="ind+'-registerAddressCountry'"
            :disabled="item.registerAddressCountryFlag"
            :options="countryLists"
            :filterable="true"
          />
          </div>
          <!-- Post code
            :errorText="errorText1"
            :errorFlag="checkErrorFlag1" -->
          <div class="items-big-box">
          <c-inputLine
            :name="ind+'-registerAddressPostcode'"
            inputType="text"
            promptText="Post Code"
            maxLength="100"
            :disabled="item.registerAddressPostcodeFlag"
            marginTop="0px"
            :value="item.registerAddressPostcode"
            @onchanges="inputChanges"
          >
          </c-inputLine>
          </div>
        </template>
        <!-- Correspondence Address -->
        <div class="items-small-box">
        <c-select
          :value="item.correspondenceSameAsRegister"
          promptText="Correspondence Address"
          @onChanges='selectChange'
          :name="ind+'-correspondenceSameAsRegister'"
          :options="registerAddressList"
        />
        </div>
        <template v-if="item.correspondenceSameAsRegister === 2">
          <!-- Address Line 1 -->
          <div class="items-small-box">
          <c-inputLine
            :name="ind+'-correspondenceAddressLine1'"
            inputType="text"
            promptText="Address Line 1"
            maxLength="100"
            :value="item.correspondenceAddressLine1"
            @onchanges="inputChanges"
          >
          </c-inputLine>
          </div>
          <!-- Address Line 2 -->
          <div class="items-small-box">
          <c-inputLine
            :name="ind+'-correspondenceAddressLine2'"
            inputType="text"
            promptText="Address Line 2"
            maxLength="100"
            marginTop="0px"
            :value="item.correspondenceAddressLine2"
            @onchanges="inputChanges"
          >
          </c-inputLine>
          </div>
          <!-- city -->
          <div class="items-small-box">
          <c-inputLine
            :name="ind+'-correspondenceAddressCity'"
            inputType="text"
            promptText="City"
            maxLength="100"
            marginTop="0px"
            :value="item.correspondenceAddressCity"
            @onchanges="inputChanges"
          >
          </c-inputLine>
          </div>
          <!-- 国家 -->
          <div class="items-small-box">
          <c-select
            :value="item.correspondenceAddressCountry"
            promptText="Country"
            marginTop="0px"
            @onChanges='selectChange'
            :name="ind+'-correspondenceAddressCountry'"
            :options="countryLists"
            :filterable="true"
          />
          </div>
          <!-- Post code -->
          <div class="items-big-box">
          <c-inputLine
            :name="ind+'-correspondenceAddressPostcode'"
            inputType="text"
            promptText="Post Code"
            maxLength="100"
            marginTop="0px"
            :value="item.correspondenceAddressPostcode"
            @onchanges="inputChanges"
          >
          </c-inputLine>
          </div>
        </template>
        <!-- Principal Place of Business Address -->
        <div class="items-small-box">
        <c-select
          :value="item.principalSameAsRegister"
          promptText="Principal Place of Business Address"
          @onChanges='selectChange'
          :name="ind+'-principalSameAsRegister'"
          :options="registerAddressList"
        />
        </div>
        <template v-if="item.principalSameAsRegister === 2">
          <!-- Address Line 1 -->
          <div class="items-small-box">
          <c-inputLine
            :name="ind+'-principalPlaceBusinessAddressLine1'"
            inputType="text"
            promptText="Address Line 1"
            maxLength="100"
            :value="item.principalPlaceBusinessAddressLine1"
            @onchanges="inputChanges"
          >
          </c-inputLine>
          </div>
          <!-- Address Line 2 -->
          <div class="items-small-box">
          <c-inputLine
            :name="ind+'-principalPlaceBusinessAddressLine2'"
            inputType="text"
            promptText="Address Line 2"
            maxLength="100"
            marginTop="0px"
            :value="item.principalPlaceBusinessAddressLine2"
            @onchanges="inputChanges"
          >
          </c-inputLine>
          </div>
          <!-- city -->
          <div class="items-small-box">
          <c-inputLine
            :name="ind+'-principalPlaceBusinessAddressCity'"
            inputType="text"
            promptText="City"
            maxLength="100"
            marginTop="0px"
            :value="item.principalPlaceBusinessAddressCity"
            @onchanges="inputChanges"
          >
          </c-inputLine>
          </div>
          <!-- 国家 -->
          <div class="items-small-box">
          <c-select
            :value="item.principalPlaceBusinessAddressCountry"
            promptText="Country"
            @onChanges='selectChange'
            :name="ind+'-principalPlaceBusinessAddressCountry'"
            :options="countryLists"
            marginTop="0px"
            :filterable="true"
          />
          </div>
          <!-- Post code -->
          <div class="items-big-box">
          <c-inputLine
            :name="ind+'-principalPlaceBusinessAddressPostcode'"
            inputType="text"
            promptText="Post Code"
            maxLength="100"
            marginTop="0px"
            :value="item.principalPlaceBusinessAddressPostcode"
            @onchanges="inputChanges"
          >
          </c-inputLine>
          </div>
        </template>
        <!-- Company Contact Number -->
        <div class="items-small-box">
        <c-select
          :value="item.countryCode"
          width="36%"
          style="display: inline-block;"
          :filterable="true"
          promptText="Contact Number"
          @onChanges='countryChange'
          :name="ind+'-countryCode'"
          marginTop="0px"
          :options="countryCodeList"
        />
        <c-inputLine
            :name="ind+'-contactNumber'"
            inputType="text"
            width="59%"
            style="display: inline-block; margin-left: 5%;"
            promptText="Company Contact Number"
            maxLength="50"
            marginTop="0px"
            :value="item.contactNumber"
            @onchanges="inputChanges"
          >
        </c-inputLine>
        </div>
        <!-- Company Website -->
        <div class="items-small-box">
        <c-inputLine
            :name="ind+'-companyWebsite'"
            inputType="text"
            promptText="Company Website"
            maxLength="50"
            marginTop="0px"
            :value="item.companyWebsite"
            @onchanges="inputChanges"
          >
        </c-inputLine>
        </div>
        <!-- Source of Income -->
        <div class="items-small-box">
        <c-inputLine
            :name="ind+'-sourceOfIncome'"
            inputType="text"
            promptText="Source of Income"
            maxLength="50"
            marginTop="0px"
            :value="item.sourceOfIncome"
            @onchanges="inputChanges"
          >
        </c-inputLine>
        </div>
        <!-- Annual Openting Income(In USD) -->
        <div class="items-small-box">
        <c-select
          :value="item.annualOperatingIncome"
          promptText="Annual Openting Income(In USD)"
          @onChanges='selectChange'
          :name="ind+'-annualOperatingIncome'"
          :options="incomeList"
        />
        </div>
        <!-- 上传附件1 -->
        <div class="upload-boxs">
          <p class="upload-tit b-2-cl">Please upload Proof of Entity</p>
          <p class="upload-tit b-2-cl">
            E.g. Corporate Registry Profile, Constitutional Document(s)
          </p>
          <c-uploadFile
            v-if="item.proofOfEntity === ''"
            @tellMessage="onChangeFileFun"
            maxSize="5"
            :name="ind+'-proofOfEntity'"
          ></c-uploadFile>
          <div class="img-box">
            <div class="loading-box" v-if="uploadLoading1">
              <c-loading size="34" className="common-button-loading a-12-bd"/>
              <span class="loading-text">On the cross</span>
            </div>
            <template v-else>
              <div
                class="files-box"
                v-if="item.proofOfEntity !== '' && item.proofOfEntity.includes('pdf')">
                <div class="files-content">
                  <svg class="icon icon-42" aria-hidden="true">
                    <use xlink:href="#icon-b_11"></use>
                  </svg>
                  <p>
                    {{
                      // eslint-disable-next-line max-len
                      item.proofOfEntity.split('/')[item.proofOfEntity.split('/').length - 1]
                    }}
                  </p>
                </div>
              </div>
              <div
                class="files-box"
                v-else-if="item.proofOfEntity !== '' && !item.proofOfEntity.includes('pdf')">
                <img :src="item.proofOfEntity" class="loading-img"/>
              </div>
              <div class="files-box" v-else>
                <img src="@/assets/images/1/add.png" alt="">
              </div>
              <div class="remove"
                @click="removeImg(ind, 'proofOfEntity')" v-if="item.proofOfEntity !== ''">
                <img src="@/assets/images/1/remove.png" alt="">
              </div>
            </template>
          </div>
          <p class="upload-note b-2-cl">
            Note：Single file less than 10MB, only png, jpg and pdf are supported.
          </p>
        </div>
        <!-- 上传附件2 -->
        <div class="upload-boxs">
          <p class="upload-tit b-2-cl">Please upload Proof of Address</p>
          <p class="upload-tit b-2-cl">E.g. Bank statement, IRAS, Electricity Bill</p>
          <c-uploadFile
            v-if="item.proofOfAddress === ''"
            @tellMessage="onChangeFileFun"
            maxSize="5"
            :name="ind+'-proofOfAddress'"
          ></c-uploadFile>
          <div class="img-box">
            <div class="loading-box" v-if="uploadLoading2">
              <c-loading size="34" className="common-button-loading a-12-bd"/>
              <span class="loading-text">On the cross</span>
            </div>
            <template v-else>
              <div
                class="files-box"
                v-if="item.proofOfAddress !== '' && item.proofOfAddress.includes('pdf')">
                <div class="files-content">
                  <svg class="icon icon-42" aria-hidden="true">
                    <use xlink:href="#icon-b_11"></use>
                  </svg>
                  <p>
                    {{
                      // eslint-disable-next-line max-len
                      item.proofOfAddress.split('/')[item.proofOfAddress.split('/').length - 1]
                    }}
                  </p>
                </div>
              </div>
              <div
                class="files-box"
                v-else-if="item.proofOfAddress !== '' && !item.proofOfAddress.includes('pdf')">
                <img :src="item.proofOfAddress" class="loading-img"/>
              </div>
              <div class="files-box" v-else>
                <img src="@/assets/images/1/add.png" alt="">
              </div>
              <div class="remove"
                @click="removeImg(ind, 'proofOfAddress')" v-if="item.proofOfAddress !== ''">
                <img src="@/assets/images/1/remove.png" alt="">
              </div>
            </template>
          </div>
          <p class="upload-note b-2-cl">
            Note：Single file less than 10MB, only png, jpg and pdf are supported.
          </p>
        </div>
        <!-- 上传附件3 -->
        <div class="upload-boxs">
          <p class="upload-tit b-2-cl">
            Please upload Ownership Structure showing the Company’s name and each
            intermediate(includingfull name,ownership percentage,country if incorporation
            and country of business operation) up to the ultimatebeneficial owners holding
            20% or more shareholding of the company.
          </p>
          <c-uploadFile
            v-if="item.proofOwnershipStructure === ''"
            @tellMessage="onChangeFileFun"
            maxSize="5"
            :name="ind+'-proofOwnershipStructure'"
          ></c-uploadFile>
          <div class="img-box particular-img">
            <div class="loading-box" v-if="uploadLoading3">
              <c-loading size="34" className="common-button-loading a-12-bd"/>
              <span class="loading-text">On the cross</span>
            </div>
            <template v-else>
              <div
                class="files-box"
                v-if="item.proofOwnershipStructure
                !== '' && item.proofOwnershipStructure.includes('pdf')">
                <div class="files-content">
                  <svg class="icon icon-42" aria-hidden="true">
                    <use xlink:href="#icon-b_11"></use>
                  </svg>
                  <p>
                    {{
                      // eslint-disable-next-line max-len
                      item.proofOwnershipStructure.split('/')[item.proofOwnershipStructure.split('/').length - 1]
                    }}
                  </p>
                </div>
              </div>
              <div
                class="files-box"
                v-else-if="item.proofOwnershipStructure
                !== '' && !item.proofOwnershipStructure.includes('pdf')">
                <img :src="item.proofOwnershipStructure" class="loading-img"/>
              </div>
              <div class="files-box" v-else>
                <img src="@/assets/images/1/add.png" alt="">
              </div>
              <div class="remove"
                @click="removeImg(ind, 'proofOwnershipStructure')"
                v-if="item.proofOwnershipStructure !== ''">
                <img src="@/assets/images/1/remove.png" alt="">
              </div>
            </template>
          </div>
          <div class="upload-example">
            <img src="@/assets/images/1/example.png" alt="">
            <span>Example</span>
          </div>
          <p class="upload-note b-2-cl a-20-cl">
            Note：Single file less than 10MB, only png, jpg and pdf are supported.
          </p>
        </div>
      </div>
      <div class="button-boxs">
        <c-button
          type="solid"
          :big="true"
          marginTop="18px"
          height="40px"
          width="178px"
          :disabled="partOneDisabled"
          @click="btnLink('2')"
          >Next
        </c-button>
      </div>
    </template>
  </div>
</template>

<script>
import mixin from 'BlockChain-ui/PC/common-mixin/personal/partOne/partOne';
import 'BlockChain-ui/PC/common-mixin/personal/partOne/common-part.styl';

export default {
  mixins: [mixin],
  created() {
    this.init();
  },
  mounted() {
  },
};
</script>
