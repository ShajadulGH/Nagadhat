/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                // For Live
                protocol: "https",
                hostname: "v3.nagadhat.com",
            },
            // {
            //     protocol: "https",
            //     hostname: "v3.staging.nagadhat.com",
            // },
            // {
            //     protocol: "http",
            //     hostname: "nagadhat-v3.test",
            // },
            // {
            //     protocol: "http",
            //     hostname: "127.0.0.1",
            //     port: "8000", // Specify port if required
            // },
        ],
    },
};

export default nextConfig;
