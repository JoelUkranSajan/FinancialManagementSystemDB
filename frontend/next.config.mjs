/** @type {import('next').NextConfig} */
const nextConfig = {
    env: {
      ACCOUNTS_SERVICE_URL: "http://localhost:8081",
      CARDS_SERVICE_URL: "http://localhost:8090",
      LOANS_SERVICE_URL: "http://localhost:9000",
    },
  };
  
  export default nextConfig;
  