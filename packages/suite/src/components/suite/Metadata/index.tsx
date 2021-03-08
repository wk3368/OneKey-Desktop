import React from 'react';
import { resolveStaticPath } from '@suite-utils/nextjs';
import { URLS } from '@suite-constants';
import Head from 'next/head';

type Props = {
    title?: string;
    description?: string;
    image?: string;
    url?: string;
};

const Metadata = ({
    title = 'OneKey Desktop',
    description,
    image = `${URLS.SUITE_URL}${resolveStaticPath('images/meta.png')}`,
    url = URLS.SUITE_URL,
}: Props) => {
    description =
        description ||
        'New desktop & browser app for OneKey hardware wallets. OneKey Desktop brings big improvements across our three key pillars of usability, security and privacy.';
    return (
        <Head>
            <meta name="viewport" content="width=device-width, initial-scale=1" />

            <title>{title}</title>
            <meta name="title" key="title" content={title} />
            <meta name="description" key="description" content={description} />

            {/* Open Graph / Facebook */}
            <meta property="og:type" key="og:type" content="website" />
            <meta property="og:url" key="og:url" content={url} />
            <meta property="og:title" key="og:title" content={title} />
            <meta property="og:description" key="og:description" content={description} />
            <meta property="og:image" key="og:image" content={image} />

            {/* Twitter */}
            <meta property="twitter:card" key="twitter:card" content="summary_large_image" />
            <meta property="twitter:url" key="twitter:url" content={url} />
            <meta property="twitter:title" key="twitter:title" content={title} />
            <meta property="twitter:description" key="twitter:description" content={description} />
            <meta property="twitter:image" key="twitter:image" content={image} />
        </Head>
    );
};

export default Metadata;
