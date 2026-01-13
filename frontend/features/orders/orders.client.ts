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
  process.env.NEXT_PUBLIC_AGENT_BASE_URL || "http://localhost:8001/agent/api";

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
  const response = await fetch(`${API_BASE_URL}/orders`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(orderData),
  });
  console.log(response);

  return handleResponse<Order>(response);
}

/**
 * Fetch all orders via HTTP request to the order agent endpoint
 *
 * @returns Promise resolving to array of orders
 * @throws Error if the request fails
 */
export async function getOrders(): Promise<Order[]> {
  const response = await fetch(`${API_BASE_URL}/orders`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  return handleResponse<Order[]>(response);
}
