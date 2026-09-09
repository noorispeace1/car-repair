/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  transpilePackages: ["three", "@react-three/fiber", "@react-three/drei", "lenis"],
  compress: true,
  poweredByHeader: false,
  httpAgentOptions: {
    keepAlive: true,
  },
  images: {
    unoptimized: true,
  },
  async redirects() {
    return [
      {
        source: "/home",
        destination: "/",
        permanent: true,
      },
      {
        source: "/about",
        destination: "/#about",
        permanent: false,
      },
      {
        source: "/contact",
        destination: "/#contact",
        permanent: false,
      },
      {
        source: "/warranty",
        destination: "/#warranty",
        permanent: false,
      },
      {
        source: "/location",
        destination: "/#location",
        permanent: false,
      },
      {
        source: "/locations",
        destination: "/#location",
        permanent: false,
      },
      {
        source: "/booking",
        destination: "/book-now",
        permanent: true,
      },
      {
        source: "/appointment",
        destination: "/book-now",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
