<template>
<div class="fuz-page-content">
    <!-- section1 -->
    <div class="section-1">
      <div class="section-1-left">
        <div class="fuz-title fuz-gap">
          Recommend Traders to FuzionX <i>to Boost Your Income</i>
        </div>
        <div class="fuz-content fuz-gap">
          Become a FuzionX Affiliate and Capitalize on Your Influence
        </div>
        <Button animation width="200" @click="toForm">Join Now</Button>
      </div>
      <img  class='section-1-right' src="@/assets/fuzionx/images/affiliate/section-01.png" alt="">
    </div>

  <!-- section 2 -->
    <div class="section-2">
      <div class='steps fuz-row'>

        <div class="step-item">
          <img class='fuz-gap-mid' src="@/assets/fuzionx/images/affiliate/step-01.png" alt="">
          <div class="fuz-title-small fuz-gap-mid">Step 1</div>
          <div class="fuz-content-sub">
            Apply today to become a FUZIONX Affiliate and share profits on your referrals' trades.
          </div>
        </div>

        <div class="step-item">
          <img class='fuz-gap-mid' src="@/assets/fuzionx/images/affiliate/step-02.png" alt="">
          <div class="fuz-title-small fuz-gap">Step 2</div>
          <div class="fuz-content-sub">
            FUZIONX will review your application.
            Once approved, you’ll get a unique referral link to share with your audience.
          </div>
        </div>

        <div class="step-item">
          <img class='fuz-gap-mid' src="@/assets/fuzionx/images/affiliate/step-03.png" alt="">
          <div class="fuz-title-small fuz-gap-mid">Step 3</div>
          <div class="fuz-content-sub">
            Promote your custom link in articles,
            social media, and other forms of content,
            and earn lifetime commissions on every new active client!
          </div>
        </div>

      </div>
    </div>
    <!-- section 3 -->
    <div class="section-3">
      <div class="section-3-left">
        <div class="fuz-title fuz-gap">
          FuzionX Affiliate Benefits
        </div>
        <div class="fuz-content fuz-gap">
          We are looking for key opinion leaders (KOLs)
          nd content creators who share our mission and
          values to promote our trading platform.
        </div>
        <div class="step-item">
          <img src="@/assets/fuzionx/images/affiliate/icon-01.png" alt="">
          <div class="fuz-title-small">Partners</div>
          <div class="fuz-content-sub">
            Partner with the world's most reliable crypto exchange
          </div>
        </div>
        <div class="step-item">
          <img src="@/assets/fuzionx/images/affiliate/icon-01.png" alt="">
          <div class="fuz-title-small">Transparency</div>
          <div class="fuz-content-sub">
            Receive a detailed report of your promotion efficacy
          </div>
        </div>
        <div class="step-item">
          <img src="@/assets/fuzionx/images/affiliate/icon-03.png" alt="">
          <div class="fuz-title-small">Compensation</div>
          <div class="fuz-content-sub">
            Get paid in your preferred cryptocurrency
          </div>
        </div>
      </div>
      <img  class='section-3-right' src="@/assets/fuzionx/images/affiliate/section-02.png" alt="">
    </div>
    <!-- section 4 -->
    <div class="section-4">
      <img class='section-4-left' src="@/assets/fuzionx/images/affiliate/section-03.png" alt="">
      <div class="section-4-right">
        <div class="fuz-title fuz-gap" style='font-size:30px' >
          Commission Rate Is More Than Two Times Higher Than Industry Standards
        </div>
        <div class="steps fuz-row">
          <div class="step-item">
            <div class="fuz-title-small">8,000+</div>
            <div class="fuz-content-sub">KOL Partners</div>
          </div>
          <div class="step-item">
            <div class="fuz-title-small">170+</div>
            <div class="fuz-content-sub">Country Global Coverage</div>
          </div>
          <div class="step-item">
            <div class="fuz-title-small">6,200+</div>
            <div class="fuz-content-sub"> BTC Total Commission Paid</div>
          </div>
        </div>
      </div>
    </div>
    <!-- section 5 -->
    <div class="section-5">
      <div class="fuz-title">Become</div>
      <div class="fuz-title fuz-gap"><i>a FuzionX Affiliate</i></div>
      <div class="fuz-content fuz-gap">We are excited to partner with like-minded
         and creative individuals to spread the word about
         trustworthy, safe, and reliable trading
      </div>
      <Button animation width="200" @click="toForm">Apply Now</Button>
    </div>
</div>
</template>
<script>
import Button from '../../components/fuzionx/button/Button.vue';

export default {
  components: { Button },
  methods: {
    toForm() {
      window.open('https://forms.monday.com/forms/a3d07a5dec6218fcbf3970bf302e70a5?r=use1', '_form');
    },
  },
};
</script>
<style scoped>
.section-1 {
  position: relative;
  margin-bottom: 50px;
  height: 600px;
}
.section-1-left {
  padding-top: 120px;
  width: 560px;
}
.section-1-right {
  position: absolute;
  top:20px;
  right: 0;
}
.section-2 {
  margin-bottom:100px;
}
.section-2 .steps {
  gap: 40px;
}
.section-2 .steps > * {
  flex: 1 1 auto;
  min-width: 0;
  width: 33%;
}
.section-3 {
  position: relative;
  margin-bottom: 100px;
  height: 600px;
}
.section-3-left {
  padding-top: 100px;
  padding-left: 160px;
  width: 600px;
}
.section-3-right {
  position: absolute;
  top:0;
  right: 160px;
}
.section-3 .step-item {
  position: relative;
  padding-left: 50px;
  margin-bottom: 24px;
}
.section-3 .step-item img {
  position: absolute;
  top: 0;
  left: 0;
}

.section-4 {
  position: relative;
  height: 500px;
  margin-bottom: 100px;
}
.section-4-left {
  position: absolute;
  top: 0;
  left:0;
}
.section-4-right {
  padding-top: 120px;
  margin-left: 680px;
}
.section-2 .steps {
  gap: 40px;
}
.section-4 .steps > * {
  flex: 1 1 auto;
  min-width: 0;
}
.section-4 .fuz-title-small {
  font-weight: 900;
}

.section-5 {
  text-align:center;
  width: 740px;
  margin: 0 auto 100px auto;
}
</style>
