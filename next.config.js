/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["placehold.co"],
  },
  webpack: (config) => {
    // Use regex to match .test and .spec files
    config.module.rules.push({
      test: /.*\.(test|spec)\..*\.(js|jsx|ts|tsx)$/,
      loader: 'ignore-loader',
    });
    return config;
  },
};

module.exports = nextConfig;
