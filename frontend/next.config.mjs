/** @type {import('next').NextConfig} */
const nextConfig = {
    env: {
      ACCOUNTS_SERVICE_URL: "http://accounts:8081",
      CARDS_SERVICE_URL: "http://cards:8090",
      LOANS_SERVICE_URL: "http://loans:9000",
    },
  };
  
  export default nextConfig;
  