// const path = require('path')
// const CopyPlugin = require('copy-webpack-plugin')
// module.exports = {
//   webpack: (config) => {
//     config.plugins.push(
//       new CopyPlugin({
//         patterns: [
//           {
//             from: path.join(
//               __dirname,
//               'node_modules/ionicons/dist/ionicons/svg'
//             ),
//             to: path.join(__dirname, 'public/svg'),
//           },
//         ],
//       })
//     )
//     return config
//   },
// }

const withPWA = require('next-pwa');
const runtimeCaching = require('next-pwa/cache');
const withPlugins = require('next-compose-plugins');

module.exports = withPlugins(
  [
    [
      withPWA,
      {
        pwa: {
          disable: process.env.NODE_ENV === 'development',
          register: true,
          dest: 'public',
          runtimeCaching,
        },
      },
    ],
    // // [withPlugin, { /* plugin config here ... */ }],
  ],

  {
    i18n: {
      locales: ['en', 'es', 'fr', 'nl'],
      defaultLocale: 'en',
    },
  }
);
