<template>
  <div class="user-management-excc-auth-form a-5-bg">
    <p class="ecxx-child-header b-1-cl a-3-bd">
      Securities Token Investor Account Opening Form
    </p>
    <p class="ecxx-sub-header" >
      <svg class="icon icon-14" aria-hidden="true" v-if="subTitle">
        <use xlink:href="#icon-c_2"></use>
      </svg>
      <span>{{ subTitle }}</span>
    </p>
    <div class="user-management-content">
        <div class="content-step clearfix">
          <div class="step-line"></div>
          <div class="step-progress" :style="stepStyle"></div>
          <!-- @click="partChange(item.step)" -->
          <div
            class="content-step-item"
            v-for="(item, index) in stepList"
            :key="index"
            :class="
              Number(item.step) <= Number(partActive.slice(0, 1))
              || (item.stepA && (Number(item.stepA.slice(0, 1)) <= Number(partActive.slice(0, 1))))
              || (item.stepB && (Number(item.stepB.slice(0, 1)) <= Number(partActive.slice(0, 1))))
              || (item.stepC && (Number(item.stepC.slice(0, 1)) <= Number(partActive.slice(0, 1))))
              ? 'step-active' : ''
            "
          >
            <p class="line-one">
              {{ item.part }}
              <span>{{ item.num }}</span>
            </p>
            <p class="line-two">{{ item.text }}</p>
          </div>
        </div>
        <div class="content-content-wrap clearfix">
          <vue-scroll>
            <div class="content-content">
              <!-- :summaryId="summaryId"
              :authType="authType" -->
              <part-one
                v-if="partActive === '1'"
                :summaryId="summaryId"
                :authType="authType"
                @partChange="partChange"
                ref="ref1">
              </part-one>
              <part-two
                v-if="partActive === '2'"
                @partChange="partChange"
                @setSubTitle="setSubTitle"
                ref="2">
              </part-two>
              <part-twoa
                v-if="partActive === '2A'"
                @partChange="partChange"
                @setSubTitle="setSubTitle"
                ref="2A"
              ></part-twoa>
              <part-three
                v-if="partActive === '3'"
                @partChange="partChange"
                @setSubTitle="setSubTitle"
                ref="3"
              ></part-three>
              <part-threea
                v-if="partActive === '3A'"
                @partChange="partChange"
                @setSubTitle="setSubTitle"
                ref="3A"
              ></part-threea>
              <part-four
                v-if="partActive === '4'"
                @partChange="partChange"
                @setSubTitle="setSubTitle"
                ref="4"
              ></part-four>
              <part-five
                v-if="partActive === '5'"
                @partChange="partChange"
                @setSubTitle="setSubTitle"
                ref="5"
              ></part-five>
              <part-six
                v-if="partActive === '6'"
                @partChange="partChange"
                @setSubTitle="setSubTitle"
                ref="6">
              </part-six>
              <part-sixa
                v-if="partActive === '6A'"
                @partChange="partChange"
                @setSubTitle="setSubTitle"
                ref="6A"
              ></part-sixa>
              <part-sixb
                v-if="partActive === '6B'"
                @partChange="partChange"
                @setSubTitle="setSubTitle"
                ref="6A"
              ></part-sixb>
              <part-sixc
                v-if="partActive === '6C'"
                @partChange="partChange"
                @setSubTitle="setSubTitle"
                ref="6A"
              ></part-sixc>
              <part-seven
                v-if="partActive === '7'"
                @partChange="partChange"
                @setSubTitle="setSubTitle"
                ref="7"
              ></part-seven>
              <part-eight
                v-if="partActive === '8'"
                @partChange="partChange"
                ref="8"
              ></part-eight>
            </div>
           </vue-scroll>
        </div>
    </div>
  </div>
</template>

<script>
import mixin from 'BlockChain-ui/PC/common-mixin/personal/exccCompanyAuthForm/exccCompanyAuthForm';
import 'BlockChain-ui/PC/common-mixin/personal/exccCompanyAuthForm/exccCompanyAuthForm.styl';
import partOne from './partOne.vue';
import partTwo from './partTwo.vue';
import partTwoa from './partTwoa.vue';
import partThree from './partThree.vue';
import partThreea from './partThreea.vue';
import partFour from './partFour.vue';
import partFive from './partFive.vue';
import partSix from './partSix.vue';
import partSixa from './partSixa.vue';
import partSixb from './partSixb.vue';
import partSixc from './partSixc.vue';
import partSeven from './partSeven.vue';
import partEight from './partEight.vue';

export default {
  mixins: [mixin],
  components: {
    partOne,
    partTwo,
    partTwoa,
    partThree,
    partThreea,
    partFour,
    partFive,
    partSix,
    partSixa,
    partSixb,
    partSixc,
    partSeven,
    partEight,
  },
  created() {
    this.init();
  },
  mounted() {
    this.mountedInit();
  },
};
</script>
