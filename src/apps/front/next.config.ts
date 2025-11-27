import type {NextConfig} from "next";
import createNextIntlPlugin from 'next-intl/plugin';

const nextConfig: NextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'cdn.emerge.dev.kareltropp.cz',
                //port: '3002',
                pathname: '/**',
            },
        ],
    },
};

const withNextIntl = createNextIntlPlugin();
export default withNextIntl(nextConfig);
