/** @type {import('next').NextConfig} */
const nextConfig = {
    async headers() {
        return [
            {
                // matching all API routes
                source: "/api/:path*",
                headers: [
                    { key: "Access-Control-Allow-Credentials", value: "true" },
                    { key: "Access-Control-Allow-Origin", value: "*" }, // replace this your actual origin
                    { key: "Access-Control-Allow-Methods", value: "GET,DELETE,PATCH,POST,PUT" },
                    { key: "Access-Control-Allow-Headers", value: "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version" },
                ]
            }
        ]
    },
    images: {
        remotePatterns: [
            {
                protocol: "https",
                hostname: "*.googleusercontent.com",
                port: "",
                pathname: "**",
            },
            {
                protocol: "https",
                hostname: "*.s3.us-east-1.amazonaws.com",
                port: "",
                pathname: "**",
            },
            {
                protocol: "https",
                hostname: "dummyimage.com",
                port: "",
                pathname: "**",
            }
        ],
    },
    experimental: {
        /** Needed to fix --"Module not found: Can't resolve 'pg-hstore'"--" */
        serverComponentsExternalPackages: ['sequelize', 'sequelize-typescript'],
    },
    reactStrictMode: false,
    publicRuntimeConfig: {
        apiUrl: process.env.NEXTAUTH_URL,
        listmonkUrl: process.env.NEXT_PUBLIC_LISTMONK_URL,
        listmonkUser: process.env.LISTMONK_app__admin_username,
        listmonkPassword: process.env.LISTMONK_app__admin_password,
        emailFrom: process.env.EMAIL_USER,
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

process.on('unhandledRejection', error => {
	console.log('unhandledRejection', error);
});

module.exports = nextConfig