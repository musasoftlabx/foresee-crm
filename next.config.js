/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  env: {
    uri: "mongodb+srv://nodeuser:Mrfixit2022@cluster0.kuqoa7t.mongodb.net/datalake?retryWrites=true&w=majority",
    JWT_SECRET: "F0r3S3e1nVENtOr11mAnaG3MeNt5ySt3m",
    JWT_EXPIRY: "100h",
    API:
      process.env.NODE_ENV === "development"
        ? "http://localhost:3333/"
        : "https://dolphin-app-rwpji.ondigitalocean.app/",
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
};

module.exports = nextConfig;
