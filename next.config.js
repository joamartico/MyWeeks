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
});
