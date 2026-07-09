import { useEffect } from 'react';

const SEO = ({ title, description, keywords, ogImage, ogType, schema, canonicalPath }) => {
  useEffect(() => {
    const BASE_URL = 'https://zonovatechnologies.online';

    // 1. Dynamic Meta Titles
    const finalTitle = title 
      ? `${title} | Zonova Technologies` 
      : 'Zonova Technologies | Premium Digital Marketing & Web Development Agency';
    document.title = finalTitle;

    // Helper to set or create meta tags
    const setMetaTag = (attrName, attrValue, content) => {
      let element = document.querySelector(`meta[${attrName}="${attrValue}"]`);
      if (!element) {
        element = document.createElement('meta');
        element.setAttribute(attrName, attrValue);
        document.head.appendChild(element);
      }
      element.setAttribute('content', content || '');
    };

    // 2. Meta Description
    const finalDesc = description || 'Zonova Technologies is a leading digital marketing agency & web development company. We deliver premier SEO, social media marketing, lead generation, branding, and custom website/SaaS engineering.';
    setMetaTag('name', 'description', finalDesc);

    // 3. Keywords
    const finalKeywords = keywords || 'digital marketing, seo services, digital marketing agency, business growth, social media marketing, lead generation, website development, branding, online marketing, zonova technologies, venture studio, startup growth partner, mvp builder, web development, mobile app development, performance marketing, business automation, custom software, startup consulting, mvp development, AI solutions, SaaS development, growth consulting';
    setMetaTag('name', 'keywords', finalKeywords);

    // Author and Robots
    setMetaTag('name', 'author', 'Zonova Technologies');
    setMetaTag('name', 'robots', 'index, follow');

    // 4. Verification Tags
    setMetaTag('name', 'google-site-verification', 'google-verification-hash-placeholder');
    setMetaTag('name', 'msvalidate.01', 'bing-verification-hash-placeholder');
    setMetaTag('name', 'yandex-verification', 'yandex-verification-hash-placeholder');
    setMetaTag('name', 'pinterest', 'pinterest-verification-hash-placeholder');

    // 5. Open Graph Tags (Social graphs)
    const currentPath = window.location.pathname;
    const currentUrl = `${BASE_URL}${currentPath}`;
    const finalOgImage = ogImage 
      ? (ogImage.startsWith('http') ? ogImage : `${BASE_URL}${ogImage}`) 
      : `${BASE_URL}/images/logo.jpg`;

    setMetaTag('property', 'og:title', finalTitle);
    setMetaTag('property', 'og:description', finalDesc);
    setMetaTag('property', 'og:type', ogType || 'website');
    setMetaTag('property', 'og:url', currentUrl);
    setMetaTag('property', 'og:image', finalOgImage);
    setMetaTag('property', 'og:site_name', 'Zonova Technologies');

    // Facebook sharing tags
    setMetaTag('property', 'fb:app_id', 'fb-app-id-placeholder');

    // 6. Twitter Cards
    setMetaTag('name', 'twitter:card', 'summary_large_image');
    setMetaTag('name', 'twitter:title', finalTitle);
    setMetaTag('name', 'twitter:description', finalDesc);
    setMetaTag('name', 'twitter:image', finalOgImage);
    setMetaTag('name', 'twitter:site', '@ZonovaTech');

    // 7. Apple Mobile Web App tags & Theme Color
    setMetaTag('name', 'apple-mobile-web-app-capable', 'yes');
    setMetaTag('name', 'apple-mobile-web-app-status-bar-style', 'black-translucent');
    setMetaTag('name', 'theme-color', '#15803D');

    // 8. Canonical Link Tags
    let canonicalLink = document.querySelector('link[rel="canonical"]');
    if (!canonicalLink) {
      canonicalLink = document.createElement('link');
      canonicalLink.setAttribute('rel', 'canonical');
      document.head.appendChild(canonicalLink);
    }
    const finalCanonical = canonicalPath ? `${BASE_URL}${canonicalPath}` : currentUrl;
    canonicalLink.setAttribute('href', finalCanonical);

    // 9. Structured Metadata Injection (JSON-LD)
    let scriptTag = null;
    if (schema) {
      scriptTag = document.createElement('script');
      scriptTag.setAttribute('type', 'application/ld+json');
      scriptTag.setAttribute('data-seo-schema', 'true');
      scriptTag.innerHTML = JSON.stringify(schema);
      document.head.appendChild(scriptTag);
    }

    // Cleanup injected scripts on unmount or updates
    return () => {
      if (scriptTag && scriptTag.parentNode) {
        scriptTag.parentNode.removeChild(scriptTag);
      }
    };
  }, [title, description, keywords, ogImage, ogType, schema, canonicalPath]);

  return null;
};

export default SEO;

