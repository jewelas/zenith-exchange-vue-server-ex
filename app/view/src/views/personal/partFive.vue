<template>
  <div class="user-management-excc-auth-form a-5-bg">
    <div class="loadinBox" v-if="isLoading">
      <c-loading size="60" />
    </div>
    <template v-else>
      <div class="radio-box">
        <span class="radio-tit">Is the Participant an entity of the Singapore Government?</span>
        <label @click="selectSingapore(1)" class="radio-label-box">
          <c-redio :value="realnameRegulationPart5.isParticipantSingaporeGovernment === 1"/>
          Yes
        </label>
        <label @click="selectSingapore(0)" class="radio-label-box">
          <c-redio :value="realnameRegulationPart5.isParticipantSingaporeGovernment === 0"/>
          No
        </label>
      </div>
      <div class="radio-box">
        <span class="radio-tit">Is the Participant listed on any stock exchange?</span>
        <label @click="selectSotck(1)" class="radio-label-box">
          <c-redio :value="realnameRegulationPart5.isParticipantSotckExchange === 1"/>
          Yes
        </label>
        <label @click="selectSotck(0)" class="radio-label-box">
          <c-redio :value="realnameRegulationPart5.isParticipantSotckExchange === 0"/>
          No
        </label>
        <c-inputLine
          v-if="realnameRegulationPart5.isParticipantSotckExchange === 1"
          name="stockContent"
          :errorHave="true"
          inputType="text"
          promptText="Please indicate the name of the stock exchange"
          maxLength="50"
          marginTop="25px"
          :value="realnameRegulationPart5.stockContent"
          @onchanges="inputChanges"
        >
        </c-inputLine>
      </div>
      <div class="radio-box">
        <span class="radio-tit">
          Is the Participant regulated by the MAS or an equivalent financial industry regulator?
        </span>
        <label @click="selectRegulated(1)" class="radio-label-box">
          <c-redio :value="realnameRegulationPart5.isParticipantRegulated === 1"/>
          Yes
        </label>
        <label @click="selectRegulated(0)" class="radio-label-box">
          <c-redio :value="realnameRegulationPart5.isParticipantRegulated === 0"/>
          No
        </label>
        <c-inputLine
          v-if="realnameRegulationPart5.isParticipantRegulated === 1"
          name="regulatedContent"
          :errorHave="true"
          inputType="text"
          promptText="Please indicate the name of the regulator"
          maxLength="50"
          marginTop="25px"
          :value="realnameRegulationPart5.regulatedContent"
          @onchanges="inputChanges"
        >
        </c-inputLine>
      </div>
      <div class="button-boxs">
        <c-button
          type="text"
          :big="true"
          marginTop="18px"
          height="40px"
          width="178px"
          @click="previous('4')"
          >Previous
        </c-button>
        <c-button
          type="solid"
          :big="true"
          marginTop="18px"
          height="40px"
          width="178px"
          :disabled="partFiveDisabled"
          @click="btnLink('6')"
          >Next
        </c-button>
      </div>
    </template>
  </div>
</template>

<script>
import mixin from 'BlockChain-ui/PC/common-mixin/personal/partFive/partFive';
import 'BlockChain-ui/PC/common-mixin/personal/partOne/common-part.styl';

export default {
  mixins: [mixin],
  created() {
    this.init();
  },
};
</script>
