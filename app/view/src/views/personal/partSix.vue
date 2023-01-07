<template>
  <div class="user-management-excc-auth-form a-5-bg">
    <div class="loadinBox" v-if="isLoading">
      <c-loading size="60" />
    </div>
    <template v-else>
      <div class="radio-box">
        <span class="radio-tit">
          I/We hereby declare that unless otherwise informed in writing, I am/we
          are/ Company is an:
        </span>
        <div @click="selectSingapore(0)" class="radio-label-box">
          <c-redio :value="investorPart6.investorType === 0" />
          <div class="radio-content-box">
            <b class="a-12-cl">Accredited Investor (AI)</b>
            , as defined in Section 4A(1)(a) of Securities and Futures Act (“SFA”) .
            <span
              @click="showDialog('Definition1')"
              class="show-cls a-12-cl">See Definition1.
            </span>
          </div>
        </div>
        <div @click="selectSingapore(1)" class="radio-label-box">
          <c-redio :value="investorPart6.investorType === 1" />
          <div class="radio-content-box">
            <b class="a-12-cl">Institutional Investor</b>
            , as defined in Section 4A(1)(c) of Securities and Futures Act (“SFA”).
            <span
              @click="showDialog('Definition2')"
              class="show-cls a-12-cl">See Definition2.
            </span>
          </div>
        </div>
      </div>
      <c-dialog
        class="definition-dialog"
        :showFlag="isDialog"
        paddingBottom="30px"
        paddingTop="30px"
        @close="isDialog = false"
        @confirm="isDialog = false"
        :titleText="titleText"
      >
        <vue-scroll>
          <template v-if="investorType === 0">
            <p class="b-2-cl dialog-text">Definition1</p>
            <p class="b-2-cl dialog-text">
              An “accredited investor” is defined in the SFA mean:
            </p>
            <p class="b-2-cl dialog-text">1. an individual:</p>
            <p class="b-2-cl dialog-text">
              i.whose net personal assets exceed S$2 million in value(or its
              equivalent in a foreign currency) or such other amount as the
              Authority may prescribe in place of the first amount;
            </p>
            <p class="b-2-cl dialog-text">
              ii.whose financial assets (net of any related liabilities) exceed
              S$1 million in value (or its equivalent in a foreign currency) or
              such other amount as the Authority may prescribe in place of the
              first amount, where ‘financial asset’ means:
            </p>
            <p class="b-2-cl dialog-text">
              a.a deposit as defined in section 4B of the Banking Act;
            </p>
            <p class="b-2-cl dialog-text">
              b.an investment product as defined in section 2(1) of the Financial
              Advisers Act, Chapter 110 of Singapore; or
            </p>
            <p class="b-2-cl dialog-text">
              c.any other asset as may be prescribed by regulations made under
              section 341 of the SFA; or
            </p>
            <p class="b-2-cl dialog-text">
              iii.whose income in the preceding 12 months is not less than
              S$300,000 (or its equivalent in a foreign currency) or such other
              amount as the Authority may prescribe in place of the first amount;
            </p>
            <p class="b-2-cl dialog-text">
              In determining the value of an individual’s net personal assets for
              the purposes of paragraph 1(i), the value of the individual’s
              primary residence —
            </p>
            <p class="b-2-cl dialog-text">
              i.is to be calculated by deducting any outstanding amounts in
              respect of any credit facility that is secured by the residence from
              the estimated fair market value of the residence; and
            </p>
            <p class="b-2-cl dialog-text">ii.is taken to be the lower of the following:</p>
            <p class="b-2-cl dialog-text">a.the value calculated under paragraph 1(iv);</p>
            <p class="b-2-cl dialog-text">b.$1 million.</p>
            <p class="b-2-cl dialog-text">
              2.a corporation with net assets exceeding S$10 million in value or
              its equivalent in value in any foreign currency, as determined by
              its most recent audited balance sheet or, in the case of a
              corporation which is not required to prepare audited accounts
              regularly, a balance sheet of the corporation certified by it to
              give a true and fair view of the state of affairs of the corporation
              as of the date of the balance sheet, which date shall be within the
              preceding 12 months;
            </p>
            <p class="b-2-cl dialog-text">
              3.any trustee of a trust all the beneficiaries of which are
              accredited investors within the meaning of section 4A(1)(a)(i), (ii)
              or (iv) of the SFA;
            </p>
            <p class="b-2-cl dialog-text">
              4.any trustee of a trust all the settlors of which:
            </p>
            <p class="b-2-cl dialog-text">
              i.are accredited investors within the meaning of section
              4A(1)(a)(i), (ii) or (iv) of the SFA;
            </p>
            <p class="b-2-cl dialog-text">
              ii.have reserved to themselves all powers of investment and asset
              management functions under the trust; and
            </p>
            <p class="b-2-cl dialog-text">
              iii.have reserved to themselves the power to revoke the trust;
            </p>
            <p class="b-2-cl dialog-text">
              5.any trustee of a trust the subject matter of which exceeds S$10
              million (or its equivalent in a foreign currency) in value;
            </p>
            <p class="b-2-cl dialog-text">
              6.an entity (other than a corporation) with net assets exceeding
              S$10 million (or its equivalent in a foreign currency) in value;
            </p>
            <p class="b-2-cl dialog-text">
              7.a partnership (other than a limited liability partnership) in
              which every partner is an accredited investor;
            </p>
            <p class="b-2-cl dialog-text">
              8.a corporation the entire share capital of which is owned by one or
              more persons, all of whom are accredited investors; and
            </p>
            <p class="b-2-cl dialog-text">
              9.a person who holds a joint account with an accredited investor, in
              respect of dealings through that joint account.
            </p>
            <p class="b-2-cl dialog-text">
              For avoidance of doubt, any reference to “trust” in paragraphs 3, 4
              and 5 includes a bare trust.
            </p>
          </template>
          <template v-else>
            <p class="b-2-cl dialog-text">Definition2</p>
            <p class="b-2-cl dialog-text">
              An “Institutional Investor” is defined in the SFA to mean:
            </p>
            <p class="b-2-cl dialog-text">
              a.a bank that is licensed under the Banking Act (Chapter 19) of
              Singapore;
            </p>
            <p class="b-2-cl dialog-text">
              b.a merchant bank that is approved as financial institution under
              Section 28 of the Monetary Authority of Singapore (Chapter 186) of
              Singapore;
            </p>
            <p class="b-2-cl dialog-text">
              c.a finance company that is licensed under the Finance Companies Act
              (Chapter 108) of Singapore;
            </p>
            <p class="b-2-cl dialog-text">
              d.a company or society registered under the Insurance Act (Chapter
              142) as an insurer;
            </p>
            <p class="b-2-cl dialog-text">
              e.the Singapore Government or a central government in a country
              other than Singapore;
            </p>
            <p class="b-2-cl dialog-text">
              f.a statutory body established under Act in Singapore;
            </p>
            <p class="b-2-cl dialog-text">
              g.the Government of Singapore Investment Corporation Pte Ltd;
            </p>
            <p class="b-2-cl dialog-text">
              h.an entity that is wholly and beneficially owned, whether directly
              or indirectly, by a central government of a country other than
              Singapore whose principal activity is;
            </p>
            <p class="b-2-cl dialog-text">i.to manage its own funds;</p>
            <p class="b-2-cl dialog-text">
              ii.to manage the funds of the central government of that country
              (which may include the reserves of that central government and any
              pension or provident fund of that country); or
            </p>
            <p class="b-2-cl dialog-text">
              iii.to manage the funds (which may include the reserves of that
              central government and any pension or provident fund of that
              country) of another entity that is wholly and beneficially owned,
              whether directly or indirectly, by the central government of that
              country; or
            </p>
            <p class="b-2-cl dialog-text">
              i.any entity that is wholly and beneficially owned, whether directly
              or indirectly, by the central government of a country other than
              Singapore and whose funds are managed by an entity in sub-paragraph
              (h) above;
            </p>
            <p class="b-2-cl dialog-text">
              j.a pension fund, whether constituted in Singapore or elsewhere;
            </p>
            <p class="b-2-cl dialog-text">
              k.a collective investment scheme, whether constituted in Singapore
              or elsewhere;
            </p>
            <p class="b-2-cl dialog-text">
              l.a holder of a capital markets services licence under the SFA;
            </p>
            <p class="b-2-cl dialog-text">
              m.a person who is exempted from the requirement to hold a capital
              market services licence to carry on business in fund management
              under paragraph 5(1)(i) of the Second Schedule to the Securities and
              Futures (Licensing and Conduct of Business) Regulations (Rg 10), and
              who has assets under its management of not less than S$15 million;
            </p>
            <p class="b-2-cl dialog-text">
              n.a headquarters company or Finance and Treasury Centre which
              carries on a class of business involving fund management but only to
              the extent that the business in fund management has been approved as
              qualifying service in relation to that headquarters company of
              Finance and Treasury Centre under Section 43E(2)(a) or Section
              43G(2) of the Income Tax Act (Chapter 134) of Singapore;
            </p>
            <p class="b-2-cl dialog-text">
              an entity or a trust formed or incorporated in a jurisdiction other
              than Singapore, which is regulated for the carrying on of any
              financial activity in that jurisdiction by a public authority of
              that jurisdiction that exercises a function that corresponds to a
              regulatory function of the Monetary Authority of Singapore under the
              SFA, the Banking Act (Chapter 19) of Singapore, the Finance
              Companies Act (Chapter 108) of Singapore, the Monetary Authority of
              Singapore Act (Chapter 186) of Singapore and the Insurance Act
              (Chapter 142) of Singapore.
            </p>
          </template>
        </vue-scroll>
      </c-dialog>
      <div class="button-boxs">
        <c-button
          type="text"
          :big="true"
          marginTop="18px"
          height="40px"
          width="178px"
          @click="previous('5')"
          >Previous
        </c-button>
          <!-- :disabled="disabled" -->
        <c-button
          type="solid"
          :big="true"
          marginTop="18px"
          height="40px"
          width="178px"
          :disabled="part6Disabled"
          @click="btnLink"
          >Next
        </c-button>
      </div>
    </template>
  </div>
</template>

<script>
import mixin from 'BlockChain-ui/PC/common-mixin/personal/partSix/partSix';
import 'BlockChain-ui/PC/common-mixin/personal/partOne/common-part.styl';

export default {
  mixins: [mixin],
  created() {
    this.init();
  },
};
</script>
