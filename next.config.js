/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: "https",
                hostname: "*.googleusercontent.com",
                port: "",
                pathname: "**",
            },    
        ],
        domains: ['dummyimage.com']
    },
    experimental: {
        /** Needed to fix --"Module not found: Can't resolve 'pg-hstore'"--" */
        serverComponentsExternalPackages: ['sequelize', 'sequelize-typescript'],
    },
    reactStrictMode: false,
    publicRuntimeConfig: {
        apiUrl: process.env.NODE_ENV === 'development'
            ? 'http://localhost:3000' // development api
            : 'http://localhost:3000' // production api
    },
    webpack: (config, { webpack, isServer, nextRuntime }) => {
        // Avoid AWS SDK Node.js require issue
        if (isServer && nextRuntime === "nodejs")
            config.plugins.push(
                new webpack.IgnorePlugin({ resourceRegExp: /^(aws-crt|@aws-sdk\/signature-v4-crt)$/ })
            );
        return config;
    },
}

module.exports = nextConfig