/**
 * Resolves a URL to the correct backend API URL in production
 * @param {string} url - The URL path to resolve
 * @returns {string} The resolved URL
 */
export const resolveUrl = (url) => {
  if (!url) return '';
  if (url.startsWith('/uploads/')) {
    const backendUrl = import.meta.env.VITE_API_URL || (import.meta.env.PROD ? 'https://zonovatechnology.netlify.app' : '');
    return `${backendUrl}${url}`;
  }
  return url;
};
