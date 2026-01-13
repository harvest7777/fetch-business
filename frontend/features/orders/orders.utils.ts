/**
 * Utility functions for orders
 *
 * This file contains helper functions and utilities used across the orders feature.
 * These are shared utilities that don't directly interact with the API but support
 * the client functions and other order-related operations.
 *
 * Responsibilities:
 * - Response handling and error parsing
 * - Data transformation utilities
 * - Type guards and validation helpers
 */

/**
 * Helper function to handle API response errors
 *
 * Checks if the response is ok, and if not, attempts to parse the error
 * message from the JSON response. Falls back to a generic error message
 * if JSON parsing fails.
 *
 * @param response - The fetch Response object
 * @returns Promise resolving to the parsed response data
 * @throws Error if the response is not ok
 */
export async function handleResponse<T>(response: Response): Promise<T> {
  if (!response.ok) {
    const error = await response.json().catch(() => ({
      message: `HTTP error! status: ${response.status}`,
    }));
    throw new Error(
      error.message || `Request failed with status ${response.status}`
    );
  }
  return response.json();
}
