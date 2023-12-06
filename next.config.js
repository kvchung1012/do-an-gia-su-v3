/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [
      "i.imgur.com",
    ],
  },
  reactStrictMode: true,
  swcMinify: true,
};

module.exports = nextConfig;
