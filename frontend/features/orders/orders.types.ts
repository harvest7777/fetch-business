/**
 * Order types and mapping objects
 *
 * This file contains all TypeScript types and interfaces related to orders,
 * as well as any mapping/transformation objects needed for type conversions.
 */

/**
 * Base order type matching the backend Order model
 */
export interface Order {
  id: number;
  agent_id: string;
  item: string;
}

/**
 * Request payload for creating a new order
 */
export interface CreateOrderRequest {
  item: string;
}
