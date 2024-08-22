/** @type {import('next').NextConfig} */
// const nextConfig = {};

// export default nextConfig;
// next.config.js

const redirects = {
  async redirects() {
    return [
      {
        source: "/",
        destination: "/Pages/index",
        permanent: true,
      },
      {
        source: "/signup",
        destination: "/Pages/auth/signup",
        permanent: true,
      },
      {
        source: "/login",
        destination: "/Pages/auth/login",
        permanent: true,
      },
    ];
  },
  images: {
    domains: ["res.cloudinary.com"],
  },
};

export default redirects;
