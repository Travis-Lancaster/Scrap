/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
/**
 * Centralized API Client Service
 * Provides a singleton instance of the API client with proper configuration
 * Includes automatic token refresh on 401 errors
 */

import { API_CONFIG } from "../config/API_CONFIG";
import { Api } from "./database/Api";
import useAuthTokenStore from "../store/authTokenStore";

// Track if we're currently refreshing to prevent multiple refresh attempts
let isRefreshing = false;
let refreshSubscribers: Array<(token: string) => void> = [];

/**
 * Subscribe to token refresh completion
 */
function subscribeTokenRefresh(callback: (token: string) => void) {
	refreshSubscribers.push(callback);
}

/**
 * Notify all subscribers that token refresh is complete
 */
function onTokenRefreshed(token: string) {
	refreshSubscribers.forEach(callback => callback(token));
	refreshSubscribers = [];
}

/**
 * Enhanced API class with automatic token refresh
 */
class EnhancedApi extends Api {
	private originalRequest: any;

	constructor(config: any) {
		super(config);
		// Store original request function
		this.originalRequest = this.request.bind(this);
		// Replace with our wrapped version
		this.request = this.wrappedRequest.bind(this) as any;
	}

	/**
	 * Wrapped request method to add token refresh logic
	 */
	private async wrappedRequest<T = any, E = any>(params: any): Promise<any> {
		// Check token expiration before making the request
		if (this.shouldRefreshToken(params)) {
			console.log("[EnhancedApi] Token expired, refreshing before request...");
			await this.handleTokenRefresh();
		}

		try {
			// Call the original request method
			const response = await this.originalRequest(params);
			return response;
		}
		catch (error: any) {
			// Handle 401 Unauthorized errors
			if (error?.status === 401 || error?.error?.status === 401 || error?.response?.status === 401) {
				console.log("[EnhancedApi] Got 401 error, attempting token refresh and retry...");
				return await this.handleUnauthorizedError(params, error);
			}
			throw error;
		}
	}

	/**
	 * Check if token should be refreshed proactively
	 */
	private shouldRefreshToken(params: any): boolean {
		// Don't refresh for auth endpoints
		if (params.path?.includes("/auth/login") || params.path?.includes("/auth/refresh")) {
			return false;
		}

		// Check if token is expired using the store's method
		return useAuthTokenStore.getState().isTokenExpired();
	}

	/**
	 * Handle token refresh
	 */
	private async handleTokenRefresh(): Promise<void> {
		if (isRefreshing) {
			// Wait for the ongoing refresh to complete
			console.log("[EnhancedApi] Token refresh already in progress, waiting...");
			return new Promise((resolve) => {
				subscribeTokenRefresh(() => {
					console.log("[EnhancedApi] Token refresh completed, resuming request");
					resolve();
				});
			});
		}

		isRefreshing = true;
		console.log("[EnhancedApi] Starting token refresh...");

		try {
			const refreshToken = useAuthTokenStore.getState().getRefreshToken();

			if (!refreshToken) {
				throw new Error("No refresh token available");
			}

			// Use the apiClient's authControllerRefresh method
			const response = await this.authControllerRefresh({ refreshToken });
			const newToken = response.data.accessToken;
			const newRefreshToken = response.data.refreshToken;

			// Update token store with new tokens
			useAuthTokenStore.getState().setTokens(newToken, newRefreshToken);

			console.log("[EnhancedApi] Token refresh successful");
			onTokenRefreshed(newToken);
		}
		catch (error) {
			console.error("[EnhancedApi] Token refresh failed", error);
			throw error;
		}
		finally {
			isRefreshing = false;
		}
	}

	/**
	 * Handle 401 Unauthorized errors
	 */
	private async handleUnauthorizedError(params: any, originalError: any): Promise<any> {
		console.log("[EnhancedApi] Handling 401 Unauthorized error for path:", params.path);

		// Don't retry auth endpoints
		if (params.path?.includes("/auth/login") || params.path?.includes("/auth/refresh")) {
			console.log("[EnhancedApi] Auth endpoint, not retrying");
			throw originalError;
		}

		// Check if request already has retry flag to prevent infinite loops
		if (params._retry) {
			console.error("[EnhancedApi] Request already retried, clearing tokens and failing");
			useAuthTokenStore.getState().clearTokens();
			throw originalError;
		}

		try {
			// Wait for token refresh
			console.log("[EnhancedApi] Attempting token refresh after 401...");
			await this.handleTokenRefresh();

			// Retry the original request with new token
			const retryParams = {
				...params,
				_retry: true,
			};

			console.log("[EnhancedApi] Retrying request after token refresh");
			// Retry using the original request method
			return await this.originalRequest(retryParams);
		}
		catch (error) {
			console.error("[EnhancedApi] Failed to refresh token and retry request", error);
			// Only clear tokens if the error is actually an auth error
			// Check if the refresh itself failed with 401
			if ((error as any)?.status === 401 || (error as any)?.error?.status === 401 || (error as any)?.response?.status === 401) {
				console.log("[EnhancedApi] Token refresh failed with 401, clearing tokens");
				useAuthTokenStore.getState().clearTokens();

				// Redirect to login if we're in a browser environment
				if (typeof window !== "undefined" && window.location) {
					const currentPath = window.location.pathname;
					if (currentPath !== "/login") {
						console.log("[EnhancedApi] Redirecting to login from:", currentPath);
						window.location.href = `/login?redirect=${encodeURIComponent(currentPath)}`;
					}
				}
			}
			throw error;
		}
	}
}

/**
 * Creates and configures an API client instance with dynamic base URL
 * @param baseUrl - Optional base URL override
 * @returns Configured API client instance with token refresh capability
 */
export function createApiClient(baseUrl?: string): Api {
	return new EnhancedApi({
		baseURL: baseUrl || API_CONFIG.BASE_URL,
		timeout: API_CONFIG.TIMEOUT,
		securityWorker: (_securityData: any) => {
			const token = useAuthTokenStore.getState().getToken();
			if (token) {
				// console.debug("[securityWorker] Adding Authorization header with token");
				return {
					headers: {
						Authorization: `Bearer ${token}`,
					},
				};
			}
			console.warn("[securityWorker] No token available for request");
			return {};
		},
	});
}

/**
 * Creates an API client instance for a specific endpoint
 * Automatically selects the correct port based on the endpoint path
 * @param _path - The API endpoint path
 * @returns Configured API client instance with appropriate base URL
 */
export function createApiClientForEndpoint(_path: string): Api {
	const baseUrl = API_CONFIG.BASE_URL;
	return createApiClient(baseUrl);
}

/**
 * Default API client instance (uses port 3000)
 * Use this for general API calls
 * Includes automatic token refresh on 401 errors
 */
export const apiClient = createApiClient();

/**
 * Smart API client that automatically routes to the correct port
 * Usage: getApiClient('/auth/lookup') or getApiClient('/assay/batch')
 * @param path - The API endpoint path
 * @returns API client configured for the appropriate port
 */
export function getApiClient(path: string): Api {
	return createApiClientForEndpoint(path);
}

/**
 * Default export for convenience (backward compatibility)
 */
export default apiClient;
