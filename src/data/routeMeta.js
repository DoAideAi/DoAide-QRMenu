/**
 * SEO metadata for each route.
 * Used by prerender-routes.mjs to inject unique <title>, <meta>, <h1>,
 * canonical, JSON-LD, and og tags into the server-rendered HTML.
 */

const BASE_URL = 'https://qrmenu.doaide.com';

export const routeMeta = {
  '/': {
    title: 'DoAide QRMenu — Free Digital Menu Maker for Restaurants',
    description:
      'DoAide QRMenu — Free digital menu maker for restaurants. Create QR code menus instantly with 12+ themes, WhatsApp sharing, and PDF export. No signup required.',
    canonical: `${BASE_URL}/`,
    h1: 'DoAide QRMenu — Free Digital Menu Maker',
    ogImage: `${BASE_URL}/og-image.png`,
    jsonLd: {
      '@context': 'https://schema.org',
      '@type': 'WebApplication',
      name: 'DoAide QRMenu',
      url: `${BASE_URL}/`,
      description:
        'Free digital menu maker for restaurants. Create QR code menus instantly with 12+ themes, WhatsApp sharing, and PDF export. No signup required.',
      applicationCategory: 'BusinessApplication',
      operatingSystem: 'Any',
      offers: {
        '@type': 'Offer',
        price: '0',
        priceCurrency: 'INR',
      },
      author: {
        '@type': 'Organization',
        name: 'DoAide',
        url: 'https://doaide.com',
      },
      featureList: [
        'QR code menu generation',
        '12+ restaurant themes',
        'PDF menu export',
        'WhatsApp menu sharing',
        'Veg/Non-veg indicators',
        'Multi-language support (English, Hindi)',
        'No signup required',
      ],
    },
  },
};

export default routeMeta;
