// next.config.js
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
}