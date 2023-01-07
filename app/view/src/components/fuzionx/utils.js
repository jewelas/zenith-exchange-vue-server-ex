import { setCookie } from '@/utils';
import bnb from '../../assets/fuzionx/images/coin/bnb.svg';
import btc from '../../assets/fuzionx/images/coin/btc.svg';
import eth from '../../assets/fuzionx/images/coin/eth.svg';
import xrp from '../../assets/fuzionx/images/coin/xrp.svg';
import zenith from '../../assets/fuzionx/images/coin/zenith.svg';

export default {
  BTC: btc,
  BNB: bnb,
  ETH: eth,
  XRP: xrp,
  ZENITH: zenith,
};
export function injectTheme() {
  if (window.publicInfo && window.publicInfo.skin) {
    const skin = window.publicInfo.skin.listist.find((item => item.mainClor === '深色版'));
    if (skin) {
      setCookie('cusSkin', skin.skinId);
    }
  }
}
