

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = (app) => {
  const { router, controller } = app;
  if (app.config.env === 'local') {
    router.post('/fe-ex-api/*', controller.devProxy.index);
    router.post('/fe-hashrate-api/*', controller.devProxy.index);
  }
  router.get('/fePublicInfo/:id', controller.home.fePublicInfo);
  router.get('/getLocale', controller.home.getLocale);
  router.get('/bax1d9EjnF8oOikH', controller.home.healthCheck);
  router.get('/LkRBhJSCcimoDyzF', controller.home.upDateTemplate);
  router.get('/(.+)?/', controller.home.index);

  // router.post('*', controller.serverUrl.index)
};
