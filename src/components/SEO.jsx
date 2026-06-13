import { useEffect } from 'react';

const SEO = ({ title, description, keywords, ogImage, ogType, schema, canonicalPath }) => {
  useEffect(() => {
    // 1. Title formatting: Defaults to 'Zonova Technologies | Build Launch Scale' if no title,
    // otherwise formats as 'Page Title | Zonova Technologies'
    const finalTitle = title 
      ? `${title} | Zonova Technologies` 
      : 'Zonova Technologies | Startup Growth Venture Building Technology Company';
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
    const finalDesc = description || 'Zonova Technologies helps founders and businesses build, launch, automate, market, and scale successful companies through technology, AI, branding, automation, and growth solutions.';
    setMetaTag('name', 'description', finalDesc);

    // 3. Keywords
    const finalKeywords = keywords || 'digital marketing, seo services, digital marketing agency, business growth, social media marketing, lead generation, website development, branding, online marketing, zonova technologies, venture studio, startup growth partner, mvp builder, web development, mobile app development, performance marketing, business automation, custom software, startup consulting, mvp development, AI solutions, SaaS development, growth consulting';
    setMetaTag('name', 'keywords', finalKeywords);

    // 4. Open Graph Tags
    const currentUrl = window.location.href;
    const finalOgImage = ogImage 
      ? (ogImage.startsWith('http') ? ogImage : `${window.location.origin}${ogImage}`) 
      : `${window.location.origin}/images/logo.jpg`;

    setMetaTag('property', 'og:title', finalTitle);
    setMetaTag('property', 'og:description', finalDesc);
    setMetaTag('property', 'og:type', ogType || 'website');
    setMetaTag('property', 'og:url', currentUrl);
    setMetaTag('property', 'og:image', finalOgImage);

    // 5. Twitter Cards
    setMetaTag('name', 'twitter:card', 'summary_large_image');
    setMetaTag('name', 'twitter:title', finalTitle);
    setMetaTag('name', 'twitter:description', finalDesc);
    setMetaTag('name', 'twitter:image', finalOgImage);

    // 6. Canonical URLs
    let canonicalLink = document.querySelector('link[rel="canonical"]');
    if (!canonicalLink) {
      canonicalLink = document.createElement('link');
      canonicalLink.setAttribute('rel', 'canonical');
      document.head.appendChild(canonicalLink);
    }
    const finalCanonical = canonicalPath ? `${window.location.origin}${canonicalPath}` : currentUrl;
    canonicalLink.setAttribute('href', finalCanonical);

    // 7. Dynamic JSON-LD Schema injection
    let scriptTag = null;
    if (schema) {
      scriptTag = document.createElement('script');
      scriptTag.setAttribute('type', 'application/ld+json');
      scriptTag.setAttribute('data-seo-schema', 'true');
      scriptTag.innerHTML = JSON.stringify(schema);
      document.head.appendChild(scriptTag);
    }

    // Cleanup added script tags on unmount or updates to avoid multiple schema scripts stacking
    return () => {
      if (scriptTag && scriptTag.parentNode) {
        scriptTag.parentNode.removeChild(scriptTag);
      }
    };
  }, [title, description, keywords, ogImage, ogType, schema, canonicalPath]);

  return null;
};

export default SEO;

