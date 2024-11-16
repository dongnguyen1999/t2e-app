export const apiProxy = (path: string): string => {
  const baseUrl = import.meta.env.VITE_MODE === 'development' ? '/api' : 'https://t2edev.azurewebsites.net/api';
  return `${baseUrl}${path}`;
};