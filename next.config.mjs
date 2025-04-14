/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
          {
            protocol: "https",
            hostname: "firebasestorage.googleapis.com",
          },
          {
            protocol: "https",
            hostname: "raw.githubusercontent.com",
          },
          {
            protocol: "https",
            hostname: "api.qrserver.com",
          },
          {
            protocol: "https",
            hostname: "picsum.photos",
          },
          {
            protocol: "https",
            hostname: "scontent.fccu14-1.fna.fbcdn.net",
          },
        ],
      },
};

export default nextConfig;
