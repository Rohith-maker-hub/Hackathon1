/**
 * Centralized API configuration.
 *
 * This exports the base URL to be used for all requests to the backend.
 * In development, it defaults to the local backend URL.
 * In production, NEXT_PUBLIC_API_BASE_URL should be set to the Render backend URL.
 */
export const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:3001/api';

/**
 * Helper function to build full API URLs.
 */
export const getApiUrl = (endpoint: string) => {
  const cleanEndpoint = endpoint.startsWith('/') ? endpoint : `/${endpoint}`;
  return `${API_BASE_URL}${cleanEndpoint}`;
};
