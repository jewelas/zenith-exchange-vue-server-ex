<template>
  <div class="user-management-excc-auth-form a-5-bg">
    <div class="loadinBox" v-if="isLoading">
      <c-loading size="60" />
    </div>
    <template v-else>
      <div class="form-items" v-for="(item, ind) in connectedPartyCompanyParts2" :key="ind">
        <!-- Full Legal Name of the Connected Party -->
        <div class="items-box">
        <c-inputLine
          :name="ind+'-fullLegalConnectedPartyName'"
          inputType="text"
          promptText="Full Legal Name of the Connected Party"
          maxLength="50"
          marginTop="0px"
          :disabled="item.fullLegalConnectedPartyNameFlag"
          :value="item.fullLegalConnectedPartyName"
          @onchanges="inputChanges"
        >
        </c-inputLine>
        </div>
        <!-- Designation -->
        <div class="items-box">
        <c-select
          :filterable="false"
          :value="item.designation"
          promptText="Designation"
          @onChanges="selectChange"
          :name="ind+'-designation'"
          :options="designationOptions"
        />
        </div>
        <!-- Incorporation Date (dd/mm/yyyy) -->
          <!-- :warningText="$t('personal.exccAuthForm.text17')" -->
        <!-- <c-inputLine
          name="incorporationDate"
          inputType="text"
          promptText="Incorporation Date (dd/mm/yyyy)"
          :value="item.incorporationDate"
          @onchanges="inputChanges"
        >
        </c-inputLine> -->
        <div class="items-box">
        <c-calendar
          :name="ind+'-incorporationDate'"
          :value="item.incorporationDate"
          :futureDayHide="endTimeNum"
          promptText="Incorporation Date"
          @onChanges="onChangeCalendar"
        />
        </div>
        <!-- Place of Incorporation -->
        <div class="items-box">
        <c-select
          :value="item.placeOfIncorporation"
          promptText="Place of Incorporation"
          @onChanges='selectChange'
          :name="ind+'-placeOfIncorporation'"
          :options="countryLists"
          :filterable="true"
        />
        </div>
        <!-- Entity Type -->
        <div class="items-box">
        <c-select
          :filterable="true"
          :value="item.entityType"
          promptText="Entity Type"
          @onChanges='selectChange'
          :name="ind+'-entityType'"
          :options="entityTypeList"
        />
        </div>
        <div class="items-box">
        <c-inputLine
          v-if="item.entityType === 'Others'"
          :name="ind+'-entityTypeOther'"
          inputType="text"
          promptText="Others"
          maxLength="50"
          marginTop="16px"
          :value="item.entityTypeOther"
          @onchanges="inputChanges"
          >
        </c-inputLine>
        </div>
        <!-- Business Activity Description -->
        <div class="items-box">
        <c-inputLine
          :name="ind+'-businessActivityDescription'"
          inputType="text"
          promptText="Business Activity Description"
          maxLength="50"
          marginTop="0px"
          :value="item.businessActivityDescription"
          @onchanges="inputChanges"
        >
        </c-inputLine>
        </div>
        <!-- UEN / Registration / Incorporation Number -->
        <div class="items-box">
        <c-inputLine
          :name="ind+'-incorporationNumber'"
          inputType="text"
          promptText="UEN / Registration / Incorporation Number"
          maxLength="50"
          marginTop="0px"
          :disabled="item.incorporationNumberFlag"
          :value="item.incorporationNumber"
          @onchanges="inputChanges"
        >
        </c-inputLine>
        </div>
        <!-- Appointment Date -->
        <!-- <c-inputLine
          :name="ind+'-appointmentDate'"
          inputType="text"
          promptText="Appointment Date"
          :disabled="!authType && !item.enableEdit"
          :value="item.appointmentDate"
          :warningText="$t('personal.exccAuthForm.text17')"
          @onchanges="inputChanges"
        >
        </c-inputLine> -->
        <div class="items-box">
        <c-calendar
          :name="ind+'-appointmentDate'"
          :value="item.appointmentDate"
          :futureDayHide="endTimeNum"
          promptText="Appointment Date"
          :disabled="item.appointmentDateFlag"
          @onChanges="onChangeCalendar"
        />
        </div>
        <!-- Phone -->
        <div class="items-box">
        <c-select
          :value="item.countryCode"
          width="20%"
          style="display: inline-block;"
          :filterable="true"
          promptText="Phone"
          @onChanges='countryChange'
          :name="ind+'-countryCode'"
          :options="countryCodeList"
        />
        <c-inputLine
          :name="ind+'-contactNumber'"
          width="75%"
          style="display: inline-block; margin-left: 5%;"
          inputType="text"
          promptText=" "
          maxLength="50"
          marginTop="0px"
          :value="item.contactNumber"
          @onchanges="inputChanges"
          >
        </c-inputLine>
        </div>
        <!-- Website -->
        <div class="items-box">
        <c-inputLine
          :name="ind+'-website'"
          inputType="text"
          promptText="Website"
          maxLength="50"
          marginTop="0px"
          :value="item.website"
          @onchanges="inputChanges"
        >
        </c-inputLine>
        </div>
        <!-- Resident Address -->
        <p>Registered Address</p>
        <template>
          <!-- Address Line 1 -->
          <div class="items-small-box">
          <c-inputLine
            :name="ind+'-registerAddressLine1'"
            inputType="text"
            promptText="Address Line 1"
            maxLength="100"
            marginTop="0px"
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
            :options="countryLists"
            :filterable="true"
          />
          </div>
          <!-- Post code -->
          <div class="items-big-box">
          <c-inputLine
            :name="ind+'-registerAddressPostcode'"
            inputType="text"
            promptText="Post Code"
            maxLength="100"
            marginTop="0px"
            :value="item.registerAddressPostcode"
            @onchanges="inputChanges"
          >
          </c-inputLine>
          </div>
        </template>
        <!-- Source of Income -->
        <div class="items-box">
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
        <!-- Annual Operating Income (In USD) -->
        <div class="items-box">
        <c-select
          :filterable="false"
          :value="item.annualOperatingIncome"
          promptText="Annual Operating Income (In USD)"
          @onChanges="selectChange"
          :name="ind+'-annualOperatingIncome'"
          :options="annualOperatingIncomeOptions"
        />
        </div>
        <!-- 上传附件1 -->
        <div class="upload-boxs">
          <p class="upload-tit">Please upload Proof of Entity</p>
          <p class="upload-tit">E.g. Corporate Registry Profile, Constitutional Document(s)</p>
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
              <div
                class="remove"
                @click="removeImg(ind, 'proofOfEntity')"
                v-if="item.proofOfEntity !== ''">
                <img src="@/assets/images/1/remove.png" alt="">
              </div>
            </template>
          </div>
          <p class="upload-note">
            Note：Single file less than 10MB, only png, jpg and pdf are supported.
          </p>
        </div>
        <!-- 上传附件2 -->
        <div class="upload-boxs">
          <p class="upload-tit">Please upload Proof of Registered Address</p>
          <p class="upload-tit">E.g. Bank statement, IRAS, Electricity Bill</p>
          <c-uploadFile
            v-if="item.proofOfRegisterAddress === ''"
            @tellMessage="onChangeFileFun"
            maxSize="5"
            :name="ind+'-proofOfRegisterAddress'"
          ></c-uploadFile>
          <div class="img-box">
            <div class="loading-box" v-if="uploadLoading2">
              <c-loading size="34" className="common-button-loading a-12-bd"/>
              <span class="loading-text">On the cross</span>
            </div>
            <template v-else>
              <div
                class="files-box"
                v-if="item.proofOfRegisterAddress
                !== '' && item.proofOfRegisterAddress.includes('pdf')">
                <div class="files-content">
                  <svg class="icon icon-42" aria-hidden="true">
                    <use xlink:href="#icon-b_11"></use>
                  </svg>
                  <p>
                    {{
                      // eslint-disable-next-line max-len
                      item.proofOfRegisterAddress.split('/')[item.proofOfRegisterAddress.split('/').length - 1]
                    }}
                  </p>
                </div>
              </div>
              <div
                class="files-box"
                v-else-if="item.proofOfRegisterAddress
                !== '' && !item.proofOfRegisterAddress.includes('pdf')">
                <img :src="item.proofOfRegisterAddress" class="loading-img"/>
              </div>
              <div class="files-box" v-else>
                <img src="@/assets/images/1/add.png" alt="">
              </div>
              <div
                class="remove"
                @click="removeImg(ind, 'proofOfRegisterAddress')"
                v-if="item.proofOfRegisterAddress !== ''">
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
          v-if="connectedPartyCompanyParts2.length > 1"
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
          @click="previous('2')"
          >Previous
        </c-button>
          <!-- :disabled="disabled" -->
        <c-button
          type="solid"
          :big="true"
          marginTop="18px"
          height="40px"
          width="178px"
          :disabled="partTwoaDisabled"
          @click="btnLink('3')"
          >Next
        </c-button>
      </div>
    </template>
  </div>
</template>

<script>
import mixin from 'BlockChain-ui/PC/common-mixin/personal/partTwoa/partTwoa';
import 'BlockChain-ui/PC/common-mixin/personal/partOne/common-part.styl';

export default {
  mixins: [mixin],
  created() {
    this.init();
  },
};
</script>
