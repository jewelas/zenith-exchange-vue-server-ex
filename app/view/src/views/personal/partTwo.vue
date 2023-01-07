<template>
  <div class="user-management-excc-auth-form a-5-bg">
    <div class="loadinBox" v-if="isLoading">
      <c-loading size="60" />
    </div>
    <template v-else>
      <div class="form-items" v-for="(item, ind) in connectedPartyIndividualParts2" :key="ind">
        <!-- Title -->
        <!-- :errorHave="true"
          :errorFlag="titleErrorFlag"
          :errorText="errorText" -->
        <div class="items-box">
        <c-select
          :filterable="true"
          :value="item.title"
          promptText="Title"
          @onChanges="selectChange"
          :name="ind+'-title'"
          :options="titleOptions"
        />
        </div>
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
        <!-- Surname -->
        <div class="items-box">
        <c-inputLine
          :name="ind+'-surname'"
          inputType="text"
          promptText="Surname"
          maxLength="50"
          marginTop="0px"
          :value="item.surname"
          @onchanges="inputChanges"
        >
        </c-inputLine>
        </div>
        <!-- Gender -->
        <div class="items-box">
        <c-select
          :filterable="false"
          :value="item.gender"
          promptText="Gender"
          @onChanges="selectChange"
          :name="ind+'-gender'"
          :options="genderOptions"
        />
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
        <!-- Date of Birth (dd/mm/yyyy) -->
        <div class="items-box">
        <c-calendar
          :name="ind+'-dateBirth'"
          :value="item.dateBirth"
          :futureDayHide="endTimeNum"
          promptText="Date of Birth"
          @onChanges="onChangeCalendar"
        />
        </div>
        <!-- Nationality -->
        <!-- <div class="items-box">
        <c-inputLine
          :name="ind+'-nationality'"
          inputType="text"
          promptText="Nationality"
          maxLength="50"
          marginTop="0px"
          :disabled="!authType && !item.enableEdit && item.nationality !== ''"
          :value="item.nationality"
          @onchanges="inputChanges"
        >
        </c-inputLine>
        </div> -->
        <!-- 国家或地区 -->
        <div class="items-box">
          <c-select
            :value="item.nationality"
            promptText="nationality"
            @onChanges='selectChange'
            :name="ind+'-nationality'"
            :options="countryLists"
            :disabled="item.nationalityFlag"
            :filterable="true"
          />
        </div>
        <!-- Identity Number -->
        <div class="items-box">
        <c-inputLine
          :name="ind+'-identityNumber'"
          inputType="text"
          promptText="Identity Number"
          maxLength="50"
          marginTop="0px"
          :disabled="item.identityNumberFlag"
          :value="item.identityNumber"
          @onchanges="inputChanges"
        >
        </c-inputLine>
        </div>
        <!-- Appointment Date -->
        <div class="items-box">
        <c-calendar
          :name="ind+'-appointmentDate'"
          :value="item.appointmentDate"
          :futureDayHide="endTimeNum"
          promptText="Appointment Date"
          @onChanges="onChangeCalendar"
          :disabled="item.appointmentDateFlag"
        />
        </div>
        <!-- Mobile -->
        <div class="items-box">
        <c-select
          :value="item.countryCode"
          width="20%"
          style="display: inline-block;"
          :filterable="true"
          promptText="Mobile"
          @onChanges='countryChange'
          :name="ind+'-countryCode'"
          :options="countryCodeList"
        />
        <c-inputLine
          :name="ind+'-contactNumber'"
          width="75%"
          style="display: inline-block; margin-left: 5%;"
          inputType="text"
          promptText=""
          maxLength="50"
          marginTop="0px"
          :value="item.contactNumber"
          @onchanges="inputChanges"
          >
        </c-inputLine>
        </div>
        <!-- Email -->
        <div class="items-box">
        <c-inputLine
          :name="ind+'-email'"
          inputType="text"
          promptText="Email"
          maxLength="50"
          marginTop="0px"
          :value="item.email"
          :errorHave="true"
          :errorFlag="item[ind+'-emailFlag']"
          :errorText="emailText"
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
            :name="ind+'-residentialAddressLine1'"
            inputType="text"
            promptText="Address Line 1"
            maxLength="100"
            marginTop="0px"
            :value="item.residentialAddressLine1"
            @onchanges="inputChanges"
          >
          </c-inputLine>
          </div>
          <!-- Address Line 2 -->
          <div class="items-small-box">
          <c-inputLine
            :name="ind+'-residentialAddressLine2'"
            inputType="text"
            promptText="Address Line 2"
            maxLength="100"
            marginTop="0px"
            :value="item.residentialAddressLine2"
            @onchanges="inputChanges"
          >
          </c-inputLine>
          </div>
          <!-- city -->
          <div class="items-small-box">
          <c-inputLine
            :name="ind+'-residentialAddressCity'"
            inputType="text"
            promptText="City"
            maxLength="100"
            marginTop="0px"
            :value="item.residentialAddressCity"
            @onchanges="inputChanges"
          >
          </c-inputLine>
          </div>
          <!-- 国家 -->
          <div class="items-small-box">
          <c-select
            :value="item.residentialAddressCountry"
            promptText="Country"
            @onChanges='selectChange'
            :name="ind+'-residentialAddressCountry'"
            :options="countryLists"
            :filterable="true"
          />
          </div>
          <!-- Post code -->
          <div class="items-big-box">
          <c-inputLine
            :name="ind+'-residentialAddressPostcode'"
            inputType="text"
            promptText="Post Code"
            maxLength="100"
            marginTop="0px"
            :value="item.residentialAddressPostcode"
            @onchanges="inputChanges"
          >
          </c-inputLine>
          </div>
        </template>
        <!-- Annual Income (In USD) -->
        <div class="items-box">
        <c-select
          :filterable="false"
          :value="item.annualOperatingIncome"
          promptText="Annual Income (In USD)"
          @onChanges="selectChange"
          :name="ind+'-annualOperatingIncome'"
          :options="annualOperatingIncomeOptions"
        />
        </div>
        <!-- Liquid Assets (In USD) -->
        <div class="items-box">
        <c-select
          :filterable="false"
          :value="item.liquidAssets"
          promptText="Liquid Assets (In USD)"
          @onChanges="selectChange"
          :name="ind+'-liquidAssets'"
          :options="annualOperatingIncomeOptions"
        />
        </div>
        <!-- Net Worth (In USD) -->
        <div class="items-box">
        <c-select
          :filterable="false"
          :value="item.netWorth"
          promptText="Net Worth (In USD)"
          @onChanges="selectChange"
          :name="ind+'-netWorth'"
          :options="annualOperatingIncomeOptions"
        />
        </div>
        <!-- 上传附件1 -->
        <div class="upload-boxs">
          <p class="upload-tit">Proof of Identity of all connected individuals.</p>
          <c-uploadFile
            v-if="item.proofOfIndividual === ''"
            @tellMessage="onChangeFileFun"
            maxSize="5"
            :name="ind+'-proofOfIndividual'"
          ></c-uploadFile>
          <div class="img-box">
            <div class="loading-box" v-if="uploadLoading1">
              <c-loading size="34" className="common-button-loading a-12-bd"/>
              <span class="loading-text">On the cross</span>
            </div>
            <template v-else>
              <div
                class="files-box"
                v-if="item.proofOfIndividual !== '' && item.proofOfIndividual.includes('pdf')">
                <div class="files-content">
                  <svg class="icon icon-42" aria-hidden="true">
                    <use xlink:href="#icon-b_11"></use>
                  </svg>
                  <p>
                    {{
                      // eslint-disable-next-line max-len
                      item.proofOfIndividual.split('/')[item.proofOfIndividual.split('/').length - 1]
                    }}
                  </p>
                </div>
              </div>
              <div
                class="files-box"
                v-else-if="item.proofOfIndividual !== ''
                && !item.proofOfIndividual.includes('pdf')">
                <img :src="item.proofOfIndividual" class="loading-img"/>
              </div>
              <div class="files-box" v-else>
                <img src="@/assets/images/1/add.png" alt="">
              </div>
              <div
                class="remove"
                @click="removeImg(ind, 'proofOfIndividual')"
                v-if="item.proofOfIndividual !== ''">
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
          <p class="upload-tit">Proof of residential address.</p>
          <c-uploadFile
            v-if="item.proofOfResidentialAddress === ''"
            @tellMessage="onChangeFileFun"
            maxSize="5"
            :name="ind+'-proofOfResidentialAddress'"
          ></c-uploadFile>
          <div class="img-box">
            <div class="loading-box" v-if="uploadLoading2">
              <c-loading size="34" className="common-button-loading a-12-bd"/>
              <span class="loading-text">On the cross</span>
            </div>
            <template v-else>
              <div
                class="files-box"
                v-if="item.proofOfResidentialAddress
                !== '' && item.proofOfResidentialAddress.includes('pdf')">
                <div class="files-content">
                  <svg class="icon icon-42" aria-hidden="true">
                    <use xlink:href="#icon-b_11"></use>
                  </svg>
                  <p>
                    {{
                      // eslint-disable-next-line max-len
                      item.proofOfResidentialAddress.split('/')[item.proofOfResidentialAddress.split('/').length - 1]
                    }}
                  </p>
                </div>
              </div>
              <div
                class="files-box"
                v-else-if="item.proofOfResidentialAddress
                !== '' && !item.proofOfResidentialAddress.includes('pdf')">
                <img :src="item.proofOfResidentialAddress" class="loading-img"/>
              </div>
              <div class="files-box" v-else>
                <img src="@/assets/images/1/add.png" alt="">
              </div>
              <div class="remove"
                @click="removeImg(ind, 'proofOfResidentialAddress')"
                v-if="item.proofOfResidentialAddress !== ''">
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
          v-if="connectedPartyIndividualParts2.length > 1"
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
          @click="previous('1')"
          >Previous
        </c-button>
        <c-button
          type="solid"
          :big="true"
          marginTop="18px"
          :disabled="partTwoDisabled"
          height="40px"
          width="178px"
          @click="btnLink('2A')"
          >Next
        </c-button>
      </div>
    </template>
  </div>
</template>

<script>
import mixin from 'BlockChain-ui/PC/common-mixin/personal/partTwo/partTwo';
import 'BlockChain-ui/PC/common-mixin/personal/partOne/common-part.styl';

export default {
  mixins: [mixin],
  created() {
    this.init();
  },
};
</script>
