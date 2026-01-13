/**
 * API client helper functions for orders
 *
 * This file contains all functions that make HTTP requests to the order agent endpoint.
 * These functions are used as queryFn and mutationFn in TanStack Query hooks.
 *
 * Responsibilities:
 * - Make HTTP requests to the order agent endpoint
 * - Handle request/response serialization
 * - Throw errors for error handling in queries/mutations
 *
 * Non-responsibilities:
 * - Caching (handled by TanStack Query)
 * - State management (handled by TanStack Query)
 * - Error UI (handled by components)
 */

import type { CreateOrderRequest, Order } from "./orders.types";
import { handleResponse } from "./orders.utils";

/**
 * Base API URL for the order agent endpoint - should be configured via environment variables
 */
const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:8001/api/";

/**
 * Create a new order via HTTP request to the order agent endpoint
 *
 * @param orderData - The order data to create
 * @returns Promise resolving to the created order
 * @throws Error if the request fails
 */
export async function createOrder(
  orderData: CreateOrderRequest
): Promise<Order> {
  const response = await fetch(`${API_BASE_URL}/orders/create`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(orderData),
  });

  return handleResponse<Order>(response);
}
