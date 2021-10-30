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


// module.exports = {
//   exportPathMap: async function (
//     defaultPathMap,
//     { dev, dir, outDir, distDir, buildId }
//   ) {
//     return {
//       '/': { page: '/' },
//       '/onboarding': { page: '/' },
//       '/signup': { page: '/' },
//       '/signin': { page: '/' },
//       '/tabs/week': { page: '/' },
//       '/tabs/plan': { page: '/' },
//       '/tabs/profile': { page: '/' },
//     }
//   },
// }