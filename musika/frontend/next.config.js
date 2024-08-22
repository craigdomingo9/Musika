
nextConfig = {
    images: {
      remotePatterns: [
        {
          protocol: 'http',
          hostname: 'localhost',
          port: '8000',
          pathname: '/media/**',
        },
      ],
    },
  }
module.exports = nextConfig;
