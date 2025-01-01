// next.config.js
const path = require('path');

const nextConfig = {
  async rewrites() {
    return [
      {
        source: '/:shortUrl',
        has: [
          {
            type: 'host',
            value: 'nodikam.com',
          },
        ],
        destination: '/api/redirect/:shortUrl',
      },
    ];
  },
  webpack: (config, { isServer }) => {
    config.resolve.alias = {
      ...config.resolve.alias,
      '@ui': path.resolve(__dirname, './src/components/ui'),
    };
    return config;
  },
};

module.exports = nextConfig;