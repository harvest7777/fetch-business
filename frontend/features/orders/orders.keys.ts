/**
 * Query key factory for orders
 *
 * This file provides a centralized factory function to generate
 * consistent query keys for all order-related queries.
 *
 * Usage:
 * - Use in queryOptions: queryKey: orderKeys.all()
 * - Use in invalidateQueries: queryClient.invalidateQueries({ queryKey: orderKeys.all() })
 * - Use for specific order: queryKey: orderKeys.detail(orderId)
 *
 * Benefits:
 * - Type-safe query key generation
 * - Centralized key management
 * - Easy invalidation patterns
 */

/**
 * Factory function that returns query key objects for orders
 *
 * @example
 * // All orders
 * orderKeys.all()
 *
 * @example
 * // Specific order by ID
 * orderKeys.detail(123)
 *
 */
export const orderKeys = {
  /**
   * Base key for all order queries
   */
  all: () => ["orders"] as const,

  /**
   * Key for a specific order detail query
   * @param orderId - The ID of the order
   */
  detail: (orderId: number | string) =>
    [...orderKeys.all(), "detail", orderId] as const,
};
