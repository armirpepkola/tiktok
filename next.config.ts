import { NextConfig } from 'next';

const nextConfig: NextConfig = {
    webpack: (config, { isServer }) => {
        config.module.rules.push({ test: /\.node$/, use: 'raw-loader' });

        if (!isServer) {
            config.externals = config.externals || [];
            config.externals.push('canvas');
        }

        return config;
    },
};

export default nextConfig;