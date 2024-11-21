/** @type {import('next').NextConfig} */
import path from "path";
import { fileURLToPath } from "url";
import { dirname } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const nextConfig = {
  sassOptions: {
    includePaths: [path.join(__dirname, "src", "app", "styles")],
  },
  images: {
    remotePatterns: [
        {
            protocol: 'http',
            hostname: 'localhost',
            port: '3000',
            pathname: '**',
        },
        {
            protocol: 'http',
            hostname: 'localhost',
            port: '4000',
            pathname: '**',
        },
    ],
},
async redirects() {
  return [
    {
      source: '/',
      destination: '/catalog',
      permanent: true,
    },
  ]
},
};

export default nextConfig;
