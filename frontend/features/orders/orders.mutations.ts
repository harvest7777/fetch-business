/**
 * TanStack Query mutation wrappers for orders
 *
 * This file provides mutation hooks and options for order-related operations.
 * Uses mutationOptions for type-safe, reusable mutation configurations.
 *
 * Usage:
 * ```tsx
 * const createOrderMutation = useCreateOrder();
 *
 * createOrderMutation.mutate({
 *   agent_id: 'agent-123',
 *   item: 'Product XYZ'
 * });
 * ```
 *
 * Benefits:
 * - Type-safe mutations
 * - Automatic cache invalidation
 * - Centralized mutation logic
 * - Reusable across components
 */

import { useMutation } from "@tanstack/react-query";
import { createOrder } from "./orders.client";
import type { CreateOrderRequest, Order } from "./orders.types";
import { QueryClient } from "@tanstack/react-query";
import { orderKeys } from "./orders.keys";

const queryClient = new QueryClient();

export function useCreateOrder() {
  return useMutation<Order, Error, CreateOrderRequest>({
    mutationFn: createOrder,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: orderKeys.all() });
    },
  });
}
