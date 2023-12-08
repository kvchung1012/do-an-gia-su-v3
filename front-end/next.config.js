/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['i.imgur.com', 'res.cloudinary.com']
  },
  reactStrictMode: true,
  swcMinify: true
};

module.exports = nextConfig;
