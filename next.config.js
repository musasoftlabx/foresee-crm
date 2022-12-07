/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  swcMinify: true,
  typescript: { ignoreBuildErrors: true },
  eslint: { ignoreDuringBuilds: true },
  env: {
    uri: "mongodb+srv://nodeuser:Mrfixit2022@cluster0.kuqoa7t.mongodb.net/datalake?retryWrites=true&w=majority",
    JWT_SECRET: "F0r3S3e1nVENtOr11mAnaG3MeNt5ySt3m",
    JWT_EXPIRY: "100h",
    API:
      process.env.NODE_ENV === "development"
        ? "https://localhost:3333/"
        : "https://localhost:3333/",
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "localhost",
      },
    ],
  },
};

module.exports = nextConfig;
