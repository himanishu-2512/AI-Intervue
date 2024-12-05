module.exports = {
  experimental: {
    appDir: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  reactStrictMode: true,
  publicRuntimeConfig: {
    apiUrl: process.env.API_KEY,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
};
