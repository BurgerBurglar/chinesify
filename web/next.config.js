/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  i18n: {
    locales: ["en"],
    defaultLocale: "en",
  },
  webpack: (config) => {
    config.experiments = {...config.experiments, topLevelAwait: true}
    return config;
  }
}

module.exports = nextConfig
