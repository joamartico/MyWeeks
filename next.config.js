const withPWA = require('next-pwa');
const runtimeCaching = require('next-pwa/cache');

module.exports = withPWA({
  pwa: {
    dest: 'public',
    // disable: process.env.NODE_ENV === 'development',
    // register: true,     no hace falta no?
    runtimeCaching, // que hace?
    // reactStrictMode: true, ??
  },
  env: {
    SENDGRID_API_KEY: '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',
  },
});
