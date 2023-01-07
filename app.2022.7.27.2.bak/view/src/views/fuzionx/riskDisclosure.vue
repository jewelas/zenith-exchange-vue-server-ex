<template>
  <section class="statement">
    <div class="fuz-card-plain mod-card">
      <div class="fuz-title">
        FuzionX <br />
        <i>Risk Disclosure Statement</i>
      </div>
      <div class="info">
        <p class="info-title">Dear FuzionX users:</p>
        <p>
          To ensure your interests, FuzionX hereby remind you that cryptocurrency market is subject
          to huge risks, so please assess your risk tolerance capability very carefully before
          engaging in cryptocurrency transactions.
        </p>
      </div>
      <div class="text">
        <p class="text-title"><i /> If you want to trade on FuzionX, you must:</p>
        <p>
          1) The services such as coin-to-coin exchange, OTC, Derivatives, PoS Pool and
          apply-to-list on the FuzionX platform are only available to valid FuzionX users
          (Hereinafter "Users") that have completed KYC verification.
        </p>
        <p>2) Link your FuzionX account with your mobile number or Google authenticator</p>
        <p>
          3) Preserve your account and password properly, and do not entrust your account to others
          or share your account & password to anyone. Otherwise, any losses incurred will be borne
          by the users themselves.
        </p>
        <p>4) Users of FuzionX may subject to the following risks:</p>
        <div class="text-more">
          <p>
            (a) Policy risk: Users of FuzionX may encounter losses due to amendment of national
            laws, regulations or macro-policies which may influence the normal transaction of
            cryptocurrencies.
          </p>
          <p>
            (b) Compliance risk: Users of FuzionX may encounter losses if the user’s cryptocurrency
            transaction violates national laws or regulations.
          </p>
          <p>
            (c) Investment yield risk: Cryptocurrency market has its uniqueness: it never closes
            with cryptocurrency prices fluctuating in a very wide range. Users may encounter losses
            in the market.
          </p>
          <p>
            (d) Trading risk: Your successful transfer is dependent on mutual assent of the parties
            to the transfer and FuzionX does not commit to or guarantee any successful transfer.
          </p>
          <p>
            (e) Force majeure risk: When natural disaster, war, striking, cyber attack and other
            unpredictable, unavoidable and unformidable situation occurs, FuzionX may not operate
            normally and may result in user’s losses. For the user’s loss caused by force majeure,
            ZenithCex will not assume any civil liabilities.
          </p>
          <p>
            (f) Delisting risk: When cryptocurrency project party faces bankrupt, liquidation and
            dissolution, or violates national laws & regulations, or under the request of the
            project party, FuzionX will delist the cryptocurrency, which may cause losses for users.
          </p>
          <p>
            (g) Technical risk: Although the chance of a technical fault is remote during a
            cryptocurrency transaction, we cannot exclude such a possibility. If such an incident
            has happened, the user’s interests may be affected.
          </p>
          <p>
            (h) Operation risk: Users may face risks due to operational errors, such as transferring
            to wrong account, violating operation regulations, etc.
          </p>
          <p>
            (i) Account frozen risk: User’s account may be frozen or forcefully confiscated by
            judicial institutions in the event of debt default or alleged crimes.
          </p>
        </div>
      </div>
      <div class="text">
        <p class="text-title"><i /> Prohibited Actions on FuzionX:</p>
        <p>
          1. Actions such as money-laundering, counterfeit transaction, illegal fund-raising and
          fraud are prohibited. Using the identity of others to register is a bannable offense and
          any intentional concealment or fraud in KYC is not allowed. Otherwise, ZenithCex has the
          right to freeze, terminate a user’s account which was suspected of the aforesaid
          misconducts, or hide their encrypted digital assets.
        </p>
        <p>
          2. This risk notice does not reflect the whole nature of the cryptocurrency market. There
          are many other risks and money-loss factors that were not listed. Therefore, you should
          read and fully understand the relevant transaction rules, promotions and related
          agreements, as well as this risk notice, and ensure that you have made sufficient risk
          assessments and financial arrangement before you engage in cryptocurrency transactions, in
          order to avoid unbearable losses.
        </p>
        <p>
          3. The trading risks on FuzionX will be borne by users themselves. FuzionX has never
          promised in any form that users trading on FuzionX will not encounter any losses.
        </p>
      </div>
      <div class="text">
        <p class="text-title"><i /> User Commitment:</p>
        <p>
          As a FuzionX user, you promise that you will never violate the national / regional laws &
          regulations of PRC, Republic of Singapore, as well as the nations the users originated
          from (Registered Residence). In the event that you, as a user, violated the laws &
          regulations, or your conduct triggers FuzionX risk-control mechanism (including but not
          limited to abnormal login, wrong trading amount, high-buy but low-sell, large amount of
          Fiat withdrawal and other abnormal transactions), you, the user, agree that FuzionX has
          the right to freeze or terminate the account, and investigate your legal responsibility.
          Any losses incurred and legal responsibility shall be borne by you, the user, yourselves.
        </p>
      </div>
      <div class="info warn">
        <span class="icon-alert" style="font-size: 50px"></span>
        <p>
          Reminder: If you click to agree to this risk notice, it will be deemed that you understand
          and are willing to assume cryptocurrency transaction risks and potential losses. ZenithCex
          is not obligated to refund user’s cryptocurrency principal & interests or assume other
          responsibilities.
        </p>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: 'Statement',
};
</script>

<style lang="stylus" scoped>
.statement{
  *{
    box-sizing: border-box;
  }
  max-width: 1280px;
  margin: 0 auto;
  padding: 0 15px;
}
.mod-card{
  margin-top: 80px;
  padding: 70px;
}
.info{
  margin: 60px 0;
  padding: 20px;
  gap: 4px;
  font-family: 'Inter';
  font-style: normal;
  font-weight: 400;
  font-size: 14px;
  line-height: 140%;
  border: 2px solid rgba(198, 192, 199, 0.4);
  border-radius: 8px;
  color: #FFFFFF;
  .info-title{
    font-weight: 700;
    font-size: 16px;
    margin-bottom: 20px;
  }
}
.text{
  p{
    font-family: 'Inter';
    font-style: normal;
    font-weight: 400;
    font-size: 14px;
    line-height: 160%;
    letter-spacing: 0.04em;
    color: #FFFFFF;
    margin-bottom: 30px;
  }
  .text-more{
    p{
      font-size: 12px;
      margin-bottom: 15px;
      padding-left: 30px;
    }
  }
  .text-title{
    font-weight: 700;
    font-size: 20px;
    line-height: 130%;
    margin: 60px 0 20px;
    i{
      display: inline-block;
      width: 16px;
      height: 16px;
      background: #6C31FF;
      border-radius: 2px;
      margin-right: 10px;
    }
  }
}
.warn{
  display: flex;
  justify-content: space-between;
  align-item: center
  padding: 40px 20px;
  background: rgba(230, 57, 70, 0.2);
  border: 0.5px solid #E63946;
  line-height: 160%;
  span{
    height: 50px;
    line-height: 50px;
    text-align: center;
    margin-right: 28px
  }
}
</style>
