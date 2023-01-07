<template>
  <div class="user-management-excc-auth-form a-5-bg">
    <div class="loadinBox" v-if="isLoading">
      <c-loading size="60" />
    </div>
    <template v-else>
      <div class="level-section a-3-bd">
        <!-- 第一层 -->
        <div class="radio-box level1">
          <span class="radio-tit b-1-cl"
            >Each individual joint account holder must complete their own Investor
            Classification and Declaration Form separately to be opted in as
            Accredited Investor</span
          >
          <!-- 第一层 -->
          <label @click="selectLevelOne('1')" class="radio-label-box b-8-cl">
            <c-redio
              :value="
                investorPart6.levelOne === '1'
              "
            />
            An Individual
          </label>
        </div>
        <!-- 第二层 -->
        <div class="radio-box level2">
          <label @click="selectLevelTwo('1-1')" class="radio-label-box b-1-cl">
            <c-redio
              :value="
                investorPart6.levelTwo === '1-1'
              "
            />
            With net personal assets exceeding in value an amount of SGD $2
            million (or its equivalent in a foreign currency)
          </label>
        </div>
        <!-- 第三层 -->
        <div class="radio-box level3">
          <label @click="selectLevelThree('1-1-1')" class="radio-label-box a-1-cl">
            <c-redio
              :value="
                investorPart6.levelThree === '1-1-1'
              "
            />
            Latest bank statement (or last 3 months for average)
          </label>
          <label @click="selectLevelThree('1-1-2')" class="radio-label-box a-1-cl">
            <c-redio
              :value="
                investorPart6.levelThree === '1-1-2'
              "
            />
            Latest statement from depository showing personal assets
          </label>
          <label @click="selectLevelThree('1-1-3')" class="radio-label-box a-1-cl">
            <c-redio
              :value="
                investorPart6.levelThree === '1-1-3'
              "
            />
            Latest statement from brokerage houses showing net assets
          </label>
          <label @click="selectLevelThree('1-1-4')" class="radio-label-box a-1-cl">
            <c-redio
              :value="
                investorPart6.levelThree === '1-1-4'
              "
            />
            Title deeds free of encuberances and valuation report
          </label>
          <label @click="selectLevelThree('1-1-5')" class="radio-label-box a-1-cl">
            <c-redio
              :value="
                investorPart6.levelThree === '1-1-5'
              "
            />
            Latest housing loan statement and annual property tax bill
          </label>
          <label @click="selectLevelThree('1-1-6')" class="radio-label-box a-1-cl">
            <c-redio
              :value="
                investorPart6.levelThree === '1-1-6'
              "
            />
            Others
          </label>
        </div>
        <!-- 第二层 -->
        <div class="radio-box level2">
          <label @click="selectLevelTwo('1-2')" class="radio-label-box b-1-cl">
            <c-redio
              :value="
                investorPart6.levelTwo === '1-2'
              "
            />
            With net financial assets(net of any related liabilities) that
            exceed SGD $1 million (or its equivalent in a foreign currency)
          </label>
        </div>
        <!-- 第三层 -->
        <div class="radio-box level3">
          <label @click="selectLevelThree('1-2-1')" class="radio-label-box a-1-cl">
            <c-redio
              :value="
                investorPart6.levelThree === '1-2-1'
              "
            />
            Latest bank statement (or last 3 months for average)
          </label>
          <label @click="selectLevelThree('1-2-2')" class="radio-label-box a-1-cl">
            <c-redio
              :value="
                investorPart6.levelThree === '1-2-2'
              "
            />
            Latest statement from depository showing personal assets
          </label>
          <label @click="selectLevelThree('1-2-3')" class="radio-label-box a-1-cl">
            <c-redio
              :value="
                investorPart6.levelThree === '1-2-3'
              "
            />
            Latest statement from brokerage houses showing net assets
          </label>
          <label @click="selectLevelThree('1-2-4')" class="radio-label-box a-1-cl">
            <c-redio
              :value="
                investorPart6.levelThree === '1-2-4'
              "
            />
            Others
          </label>
        </div>
        <!-- 第二层 -->
        <div class="radio-box level2">
          <label @click="selectLevelTwo('1-3')" class="radio-label-box b-1-cl">
            <c-redio
              :value="
                investorPart6.levelTwo === '1-3'
              "
            />
            With income in the preceding 12 months that is not less than SGD
            $300,000(or its equivalent in a foreign currency)
          </label>
        </div>
        <!-- 第三层 -->
        <div class="radio-box level3">
          <label @click="selectLevelThree('1-3-1')" class="radio-label-box a-1-cl">
            <c-redio
              :value="
                investorPart6.levelThree === '1-3-1'
              "
            />
            Latest computerised payslip (or last 3 months for average)
          </label>
          <label @click="selectLevelThree('1-3-2')" class="radio-label-box a-1-cl">
            <c-redio
              :value="
                investorPart6.levelThree === '1-3-2'
              "
            />
            Income tax assessment (eg. Latest IR8A)
          </label>
          <label @click="selectLevelThree('1-3-3')" class="radio-label-box a-1-cl">
            <c-redio
              :value="
                investorPart6.levelThree === '1-3-3'
              "
            />
            Currency employment letter/ Contract with salary information
          </label>
          <label @click="selectLevelThree('1-3-4')" class="radio-label-box a-1-cl">
            <c-redio
              :value="
                investorPart6.levelThree === '1-3-4'
              "
            />
            Others
          </label>
        </div>
      </div>
      <div class="level-section a-3-bd">
        <!-- 第一层 -->
        <div class="radio-box level1">
          <label @click="selectLevelOne('2')" class="radio-label-box b-8-cl">
            <c-redio
              :value="
                investorPart6.levelOne === '2'
              "
            />
            A Corporation
          </label>
        </div>
        <!-- 第二层 -->
        <div class="radio-box level2">
          <label @click="selectLevelTwo('2-1')" class="radio-label-box b-1-cl">
            <c-redio
              :value="
                investorPart6.levelTwo === '2-1'
              "
            />
            With net assets exceeding SGD 10 million in value (or its equivalent
            in a foreign currency)
          </label>
        </div>
        <!-- 第二层 -->
        <div class="radio-box level2">
          <label @click="selectLevelTwo('2-2')" class="radio-label-box b-1-cl">
            <c-redio
              :value="
                investorPart6.levelTwo === '2-2'
              "
            />
            The sole business of which is to hold investments and the entire
            share capital of which is owned by one or more persons, each of whom
            is an accredited investor
          </label>
        </div>
        <!-- 第三层 -->
        <div class="radio-box level3">
          <label @click="selectLevelThree('2-0-1')" class="radio-label-box a-1-cl">
            <c-redio
              :value="
                investorPart6.levelThree === '2-0-1'
              "
            />
            Latest audited financial statements
          </label>
          <label @click="selectLevelThree('2-0-2')" class="radio-label-box a-1-cl">
            <c-redio
              :value="
                investorPart6.levelThree === '2-0-2'
              "
            />
            Where the corporation is not required to prepare audited accounts
            regularly, a balance-sheet of the Company certified by the
            directors of the Company as giving a true and fair view of state
            of affairs of the corporation as of the date of the balance-sheet
            for the most recent past 12 months
          </label>
          <label @click="selectLevelThree('2-0-3')" class="radio-label-box a-1-cl">
            <c-redio
              :value="
                investorPart6.levelThree === '2-0-3'
              "
            />
            Where all shareholder are Als, please refer to the section on
            “Individuals” above for each shareholder
          </label>
        </div>
      </div>
      <div class="level-section a-3-bd">
        <!-- 第一层 -->
        <div class="radio-box level1">
          <label @click="selectLevelOne('3')" class="radio-label-box b-8-cl">
            <c-redio
              :value="
                investorPart6.levelOne === '3'
              "
            />
            A Trust
          </label>
        </div>
        <!-- 第二层 -->
        <div class="radio-box level2">
          <label @click="selectLevelTwo('3-1')" class="radio-label-box b-1-cl">
            <c-redio
              :value="investorPart6.levelTwo === '3-1'"/>
              Trust property exceeds $10 million in value (or its equivalent in a foreign currency)
          </label>
        </div>
        <!-- 第二层 -->
        <div class="radio-box level2">
          <label @click="selectLevelTwo('3-2')" class="radio-label-box b-1-cl">
            <c-redio
              :value="
                investorPart6.levelTwo === '3-2'
              "
            />
            All beneficiaries of the trust are Als
          </label>
        </div>
        <!-- 第二层 -->
        <div class="radio-box level2">
          <label @click="selectLevelTwo('3-3')" class="radio-label-box b-1-cl">
            <c-redio
              :value="
                investorPart6.levelTwo === '3-3'
              "
            />
            All settlors are Als and have settlor reserved investment powers and
            revocation powers
          </label>
        </div>
        <!-- 第三层 -->
        <div class="radio-box level3">
          <label @click="selectLevelThree('3-0-1')" class="radio-label-box a-1-cl">
            <c-redio
              :value="
                investorPart6.levelThree === '3-0-1'
              "
            />
            Latest audited financial statements
          </label>
          <label @click="selectLevelThree('3-0-2')" class="radio-label-box a-1-cl">
            <c-redio
              :value="
                investorPart6.levelThree === '3-0-2'
              "
            />
            Declaration from professional trustee
          </label>
          <label @click="selectLevelThree('3-0-3')" class="radio-label-box a-1-cl">
            <c-redio
              :value="
                investorPart6.levelThree === '3-0-3'
              "
            />
            Latest bank statements or bank reference letter
          </label>
          <label @click="selectLevelThree('3-0-4')" class="radio-label-box a-1-cl">
            <c-redio
              :value="
                investorPart6.levelThree === '3-0-4'
              "
            />
            Where all beneficiaries or settlors are Als, please refer to the section on
            “Individuals” above for each beneficiary
          </label>
        </div>
      </div>
      <div class="level-section a-3-bd">
        <!-- 第一层 -->
        <div class="radio-box level1">
          <label @click="selectLevelOne('4')" class="radio-label-box b-8-cl">
            <c-redio
              :value="
                investorPart6.levelOne === '4'
              "
            />
            An Entity (other than a Corporation)
          </label>
        </div>
        <!-- 第二层 -->
        <div class="radio-box level2">
          <label @click="selectLevelTwo('4-1')" class="radio-label-box b-1-cl">
            <c-redio
              :value="
                investorPart6.levelTwo === '4-1'
              "
            />
            With net assets exceeding $10 million in value (or its equivalent in
            a foreign currency).
          </label>
        </div>
        <!-- 第三层 -->
        <div class="radio-box level3">
          <label @click="selectLevelThree('4-0-1')" class="radio-label-box a-1-cl">
            <c-redio
              :value="
                investorPart6.levelThree === '4-0-1'
              "
            />
            Latest audited financial statements
          </label>
          <label @click="selectLevelThree('4-0-2')" class="radio-label-box a-1-cl">
            <c-redio
              :value="
                investorPart6.levelThree === '4-0-2'
              "
            />
            For the purpose fo this category, an “entity” includes a corporation
            (as defined in Section 4(1) of the Singapore Companies Act, Cap 50),
            an unincorporated association, a partnership and the government of any
            state, but does not include a trust
          </label>
        </div>
      </div>
      <div class="level-section-last">
        <!-- 第一层 -->
        <div class="radio-box level1">
          <label @click="selectLevelOne('5')" class="radio-label-box b-8-cl">
            <c-redio
              :value="
                investorPart6.levelOne === '5'
              "
            />
            A Partership
          </label>
        </div>
        <!-- 第二层 -->
        <div class="radio-box level2">
          <label @click="selectLevelTwo('5-1')" class="radio-label-box b-1-cl">
            <c-redio
              :value="
                investorPart6.levelTwo === '5-1'
              "
            />
            (Other than a limited liability partnership) in which each parter is
            an accredited investor
          </label>
        </div>
        <!-- 第三层 -->
        <div class="radio-box level3">
          <label @click="selectLevelThree('5-0-1')" class="radio-label-box a-1-cl">
            <c-redio
              :value="
                investorPart6.levelThree === '5-0-1'
              "
            />
            Latest audited financial statements
          </label>
          <label @click="selectLevelThree('5-0-2')" class="radio-label-box a-1-cl">
            <c-redio
              :value="
                investorPart6.levelThree === '5-0-2'
              "
            />
            Where all Partners are Als, please refer to the section on
            “Individuals” above for each Partner
          </label>
        </div>
      </div>
      <!-- 上传附件 -->
      <div class="upload-boxs">
        <p class="upload-tit">Please upload Proof of Entity</p>
        <p class="upload-tit">E.g. Corporate Registry Profile, Constitutional Document(s)</p>
        <c-uploadFile
          v-if="investorPart6.accreditedInvestorUpload === ''"
          @tellMessage="onChangeFileFun"
          maxSize="5"
          name="accreditedInvestorUpload"
        ></c-uploadFile>
        <div class="img-box">
          <div class="loading-box" v-if="uploadLoading">
            <c-loading size="34" className="common-button-loading a-12-bd"/>
            <span class="loading-text">On the cross</span>
          </div>
          <template v-else>
            <div
              class="files-box"
              v-if="investorPart6.accreditedInvestorUpload
              !== '' && investorPart6.accreditedInvestorUpload.includes('pdf')">
              <div class="files-content">
                <svg class="icon icon-42" aria-hidden="true">
                  <use xlink:href="#icon-b_11"></use>
                </svg>
                <p>
                  {{ uploadFileName }}
                </p>
              </div>
            </div>
            <div
              class="files-box"
              v-else-if="investorPart6.accreditedInvestorUpload
              !== '' && !investorPart6.accreditedInvestorUpload.includes('pdf')">
              <img :src="investorPart6.accreditedInvestorUpload" class="loading-img"/>
            </div>
            <div class="files-box" v-else>
              <img src="@/assets/images/1/add.png" alt="">
            </div>
            <div class="remove"
              @click="removeImg('accreditedInvestorUpload')"
              v-if="investorPart6.accreditedInvestorUpload !== ''">
                <img src="@/assets/images/1/remove.png" alt="">
              </div>
          </template>
        </div>
        <p class="upload-note">
          Note：Single file less than 10MB, only png, jpg and pdf are supported.
        </p>
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
        <c-button
          type="solid"
          :big="true"
          marginTop="18px"
          height="40px"
          width="178px"
          :disabled="partSixaDisabled"
          @click="btnLink('6B')"
          >Next
        </c-button>
      </div>
    </template>
  </div>
</template>

<script>
import mixin from 'BlockChain-ui/PC/common-mixin/personal/partSixa/partSixa';
import 'BlockChain-ui/PC/common-mixin/personal/partOne/common-part.styl';


export default {
  mixins: [mixin],
  created() {
    this.init();
  },
};
</script>
