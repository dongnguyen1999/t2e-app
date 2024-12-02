export const apiProxy = (path: string): string => {
  const baseUrl = import.meta.env.VITE_MODE === 'development' ? '/api' : import.meta.env.VITE_API_URL;
  return `${baseUrl}${path}`;
};