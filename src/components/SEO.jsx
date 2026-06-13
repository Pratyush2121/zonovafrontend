import { useEffect } from 'react';

const SEO = ({ title, description, keywords }) => {
  useEffect(() => {
    // Title
    document.title = title ? `${title} | Zonova Technologies` : 'Zonova Technologies | Premium Digital Marketing & Web Development Agency';

    // Meta Description
    let metaDescription = document.querySelector('meta[name="description"]');
    if (!metaDescription) {
      metaDescription = document.createElement('meta');
      metaDescription.setAttribute('name', 'description');
      document.head.appendChild(metaDescription);
    }
    metaDescription.setAttribute(
      'content',
      description || 'Helping founders and businesses turn ideas into successful companies through technology, marketing, automation, and growth strategies.'
    );

    // Meta Keywords
    let metaKeywords = document.querySelector('meta[name="keywords"]');
    if (!metaKeywords) {
      metaKeywords = document.createElement('meta');
      metaKeywords.setAttribute('name', 'keywords');
      document.head.appendChild(metaKeywords);
    }
    metaKeywords.setAttribute(
      'content',
      keywords || 'digital marketing, seo services, digital marketing agency, business growth, social media marketing, lead generation, website development, branding, online marketing, zonova technologies, venture studio, startup growth partner, mvp builder, web development, mobile app development, performance marketing, business automation'
    );
  }, [title, description, keywords]);

  return null;
};

export default SEO;
