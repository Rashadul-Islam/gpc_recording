/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
};

module.exports = nextConfig;

module.exports = {
  images: {
    domains: ["cdn.pixabay.com", "172.16.109.12"],
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
};
