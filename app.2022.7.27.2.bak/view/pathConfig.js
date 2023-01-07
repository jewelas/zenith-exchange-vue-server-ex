const registerConfig = {
  '/register': 'register',
  '/login': 'register',
  '/forget': 'register',
  '/trade': 'trade',
  '/resetPass': 'register',
  '/personal': 'personal',
  '/homes': 'homes',
  '/assets': 'assets',
  '/exchangeAccount': 'assets',
  '/recharge': 'assets',
  '/addressMent': 'assets',
  '/orderCenter': 'ordercenter',
};

const evnConfig = ['ex', 'otc', 'co'];
const seoHtml = {
  ex: ['detail'],
};

const rootPath = __dirname;

module.exports = {
  registerConfig,
  evnConfig,
  rootPath,
  seoHtml,
};
