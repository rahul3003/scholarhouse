/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: [
      "session-images-0.s3.ap-south-1.amazonaws.com",
      "community-images-0.s3.ap-south-1.amazonaws.com",
      "robohash.org",
      "loremflickr.com",
      "community-bucket-0.s3.ap-south-1.amazonaws.com",
      "subspace-test-0.s3.ap-south-1.amazonaws.com",
    ],
  },
};

export default nextConfig;
