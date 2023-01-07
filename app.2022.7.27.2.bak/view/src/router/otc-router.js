import Vue from 'vue';
import Router from 'vue-router';
import {
  commonRouter,
  personalRouter,
  otcRouter,
  fiatdealRouter,
} from 'BlockChain-ui/PC/router';
import { setCookie } from '@/utils';

const originalPush = Router.prototype.push;
Router.prototype.push = function push(location, onResolve, onReject) {
  if (onResolve || onReject) return originalPush.call(this, location, onResolve, onReject);
  return originalPush.call(this, location).catch(err => err);
};

const evnConfig = ['ex', 'otc', 'co'];

Vue.use(Router);

const router = new Router({
  mode: 'history',
  base: '/',
  routes: [
    ...commonRouter,
    // 个人中心
    ...personalRouter,
    // 交易大厅
    ...fiatdealRouter,
    ...otcRouter,
  ],
});

if (process.env.NODE_ENV === 'development') {
  router.beforeEach((to, from, next) => {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
    // window.pageYOffset = 0;
    const fromPathArr = from.path.split('/');
    const toPathArr = to.path.split('/');
    let [, fromHostEnv, fromLan] = fromPathArr;
    const [, toHostEnv, toLan] = toPathArr;
    const reg = /^[a-z]{2}_[A-Z]{2}$/;
    if ((evnConfig.indexOf(toHostEnv) !== -1) && reg.test(toLan)) {
      setCookie('lan', toLan);
      next();
    } else {
      if (from.path === '/') {
        let ev = '';
        evnConfig.forEach((item) => {
          const fit = `/${item}/`;
          if (to.path.indexOf(item) !== -1) {
            ev = fit;
          }
        });
        const str = `${ev}zh_CN/${to.path.split(ev)[1]}`;
        setCookie('lan', 'zh_CN');
        next(str);
        return false;
      }
      let str = '';
      fromHostEnv = evnConfig.indexOf(fromHostEnv) !== -1 ? fromHostEnv : 'ex';
      fromLan = reg.test(fromLan) ? fromLan : 'zh_CN';
      if (evnConfig.indexOf(toHostEnv) === -1) {
        str += `/${fromHostEnv}`;
      }
      if (!reg.test(toLan)) {
        str += `/${fromLan}`;
      }
      str += to.fullPath;
      setCookie('lan', fromLan);
      next(str);
    }
    return false;
  });
} else {
  const reg = /^[a-z]{2}_[A-Z]{2}$/;
  router.beforeEach((to, from, next) => {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
    // window.pageYOffset = 0;
    if (from.path === '/') {
      next();
    } else {
      const fromPathArr = from.path.split('/');
      const fromLan = fromPathArr[1];
      const toPathArr = to.path.split('/');
      const toLan = toPathArr[1];
      if (reg.test(toLan)) {
        next();
      } else {
        const toPath = `/${fromLan}${to.fullPath}`;
        next(toPath);
      }
    }
  });
}

export default router;
