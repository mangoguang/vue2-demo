const SITE_ID = '63e92ce1e69792cbb1be60c6f0e0de50'
const SENTRY_DSN = 'https://ae820a14a8994bb79fcf519a5ea3f7b4@o867798.ingest.sentry.io/5823901'

// 代理
exports.configMap = {
  dev: {
    baseURL: 'https://www.mangoguang.cn/api',
    // baseURL: 'http://localhost:7001/api',
    sentryDSN: '',
    siteID: '',
  },
  sit: {
    baseURL: 'https://customer-sit-api.fcb.com.cn',
    sentryDSN: SENTRY_DSN,
    siteID: SITE_ID,
  },
  prd: {
    baseURL: 'https://www.mangoguang.cn/api',
    sentryDSN: SENTRY_DSN,
    siteID: SITE_ID,
  },
};
