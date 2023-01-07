<template>
  <div class='flyCoin'>
    <div class='coinWrapper'>
        <img src="@/assets/fuzionx/images/flyCoin/coins.png" class='coins'/>
        <img src="@/assets/fuzionx/images/flyCoin/wingFirstLeft.png" class='wingFirstLeft'/>
        <img src="@/assets/fuzionx/images/flyCoin/wingFirstRight.png" class='wingFirstRight'/>
        <img src="@/assets/fuzionx/images/flyCoin/wingSecondLeft.png" class='wingSecondLeft'/>
        <img src="@/assets/fuzionx/images/flyCoin/wingSecondRight.png" class='wingSecondRight'/>
    </div>
</div>
</template>
<style scoped>
.flyCoin {
  position: absolute;
  width: 1px;
  height: 1px;
}
.coinWrapper {
  position: absolute;
}
.coins {
  position: relative;
  z-index: 2;
  display: block;
  width: 162px;
  height: 106px;
}

.wingFirstLeft {
  position: absolute;
  z-index: 1;
  top: 11px;
  left: -24px;
}

.wingFirstRight {
  position: absolute;
  z-index: 1;
  top: 23px;
  right: 75px;
}

.wingSecondLeft {
  position: absolute;
  z-index: 1;
  top: -24px;
  right: 24px;
}

.wingSecondRight {
  position: absolute;
  z-index: 1;
  top: -23px;
  right: -22px;
}
.coinWrapper {
  animation-name: coinWrapperAnimation;
  animation-iteration-count: infinite;
  animation-duration: 5s;
  animation-timing-function: linear;
}


.wingFirstLeft {
  animation-name: wingFirstLeftAnimation;
  animation-iteration-count: infinite;
  animation-duration: 0.2s;
  animation-timing-function: linear;
  transform-origin: 36px 43px;
}

.wingFirstRight {
  animation-name: wingFirstRightAnimation;
  animation-iteration-count: infinite;
  animation-duration: 0.2s;
  animation-timing-function: linear;
  transform-origin: 0px 38px;
}

.wingSecondLeft {
  animation-name: wingSecondLeftAnimation;
  animation-iteration-count: infinite;
  animation-duration: 0.2s;
  animation-timing-function: linear;
  transform-origin: 34px 34px;
}

.wingSecondRight {
  animation-name: wingSecondRightAnimation;
  animation-iteration-count: infinite;
  animation-duration: 0.2s;
  animation-timing-function: linear;
  transform-origin: 4px 34px;
}

@keyframes coinWrapperAnimation {
  0% {
    transform: translate(0,0);
  }
  25% {
    transform: translate(-5px,-25px);
  }
  50% {
    transform: translate(5px,25px);
  }
  100% {
    transform: translate(0,0);
  }
}

@keyframes wingFirstLeftAnimation {
  0% {
    transform: rotate(0);
  }
  50% {
    transform: rotate(-30deg);
  }
  100% {
    transform: rotate(0);
  }
}

@keyframes wingFirstRightAnimation {
  0% {
    transform: rotate(0);
  }
  50% {
    transform: rotate(30deg);
  }
  100% {
    transform: rotate(0);
  }
}

@keyframes wingSecondLeftAnimation {
  0% {
    transform: rotate(0);
  }
  50% {
    transform: rotate(-30deg);
  }
  100% {
    transform: rotate(0);
  }
}

@keyframes wingSecondRightAnimation {
  0% {
    transform: rotate(0);
  }
  50% {
    transform: rotate(30deg);
  }
  100% {
    transform: rotate(0);
  }
}
</style>
