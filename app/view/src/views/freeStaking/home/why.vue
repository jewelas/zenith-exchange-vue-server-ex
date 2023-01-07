<template>
  <div class="why fuz-page-content">
    <div class="fuz-title">Why stake your coins with</div>
    <div class="fuz-title fuz-gap"><i>FuzionX Chain?</i></div>
    <div class="items fuz-row fuz-split">
      <div class="item fuz-split">
        <div class="icon-img">
        <img src="@/assets/fuzionx/images/staking/cloud.png" alt="">
        </div>
        <div class="fuz-content">Earn rewards Automatically</div>
      </div>
      <div class="item fuz-split">
        <div class="icon-img">
        <img src="@/assets/fuzionx/images/staking/folder.png" alt="">
        </div>
        <div class="fuz-content">Improved security</div>
      </div>
      <div class="item fuz-split">
        <div class="icon-img">
        <img src="@/assets/fuzionx/images/staking/mining.png" alt="">
        </div>
        <div class="fuz-content">Very Easy to use</div>
      </div>
    </div>
  </div>
</template>
<style scoped>
.why {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 100px 0 !important;
}
.items {
  width: 100%;

}
.items  .icon-img {
  width: 204px;
  height: 204px;
  background: rgba(0, 0, 0, 0.2);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 30px;
}
.items  .icon-img > img {
  width: 85px !important;
  height: 85px !important;
}
.items > * {
  width: 33%;
  display: flex;
  flex-direction: column;
  align-items: center;
}
</style>
