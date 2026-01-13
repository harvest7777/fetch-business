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

import { useMutation, useQueryClient, mutationOptions } from '@tanstack/react-query';
import type { UseMutationOptions } from '@tanstack/react-query';

import { orderKeys } from './orders.keys';
import {
  createOrder,
  updateOrder,
  deleteOrder,
} from './orders.client';
import type {
  CreateOrderRequest,
  CreateOrderResponse,
  Order,
} from './orders.types';

/**
 * Mutation options for creating an order
 * Can be used with useMutation or queryClient methods
 */
export const createOrderMutationOptions = () =>
  mutationOptions({
    mutationKey: ['orders', 'create'],
    mutationFn: createOrder,
  });

/**
 * Hook for creating a new order
 * 
 * @param options - Additional mutation options (onSuccess, onError, etc.)
 * @returns Mutation object with mutate, mutateAsync, and status
 * 
 * @example
 * ```tsx
 * const createOrderMutation = useCreateOrder({
 *   onSuccess: (data) => {
 *     console.log('Order created:', data);
 *   },
 * });
 * 
 * createOrderMutation.mutate({
 *   agent_id: 'agent-123',
 *   item: 'Product XYZ'
 * });
 * ```
 */
export function useCreateOrder(
  options?: Omit<
    UseMutationOptions<CreateOrderResponse, Error, CreateOrderRequest, unknown>,
    'mutationFn' | 'mutationKey'
  >
) {
  const queryClient = useQueryClient();

  return useMutation({
    ...createOrderMutationOptions(),
    ...options,
    onSuccess: (data, variables, context) => {
      // Invalidate orders list to refetch after creation
      queryClient.invalidateQueries({ queryKey: orderKeys.lists() });
      // Optionally set the new order in cache
      queryClient.setQueryData(orderKeys.detail(data.id), data);
      // Call user's onSuccess if provided
      options?.onSuccess?.(data, variables, context);
    },
  });
}

/**
 * Mutation options for updating an order
 */
export const updateOrderMutationOptions = () =>
  mutationOptions({
    mutationKey: ['orders', 'update'],
    mutationFn: ({ orderId, data }: { orderId: number | string; data: Partial<CreateOrderRequest> }) =>
      updateOrder(orderId, data),
  });

/**
 * Hook for updating an existing order
 * 
 * @param options - Additional mutation options
 * @returns Mutation object
 * 
 * @example
 * ```tsx
 * const updateOrderMutation = useUpdateOrder();
 * 
 * updateOrderMutation.mutate({
 *   orderId: 123,
 *   data: { item: 'Updated Product' }
 * });
 * ```
 */
export function useUpdateOrder(
  options?: Omit<
    UseMutationOptions<Order, Error, { orderId: number | string; data: Partial<CreateOrderRequest> }, unknown>,
    'mutationFn' | 'mutationKey'
  >
) {
  const queryClient = useQueryClient();

  return useMutation({
    ...updateOrderMutationOptions(),
    ...options,
    onSuccess: (data, variables, context) => {
      // Update the specific order in cache
      queryClient.setQueryData(orderKeys.detail(variables.orderId), data);
      // Invalidate lists to ensure consistency
      queryClient.invalidateQueries({ queryKey: orderKeys.lists() });
      // Call user's onSuccess if provided
      options?.onSuccess?.(data, variables, context);
    },
  });
}

/**
 * Mutation options for deleting an order
 */
export const deleteOrderMutationOptions = () =>
  mutationOptions({
    mutationKey: ['orders', 'delete'],
    mutationFn: deleteOrder,
  });

/**
 * Hook for deleting an order
 * 
 * @param options - Additional mutation options
 * @returns Mutation object
 * 
 * @example
 * ```tsx
 * const deleteOrderMutation = useDeleteOrder({
 *   onSuccess: () => {
 *     console.log('Order deleted');
 *   },
 * });
 * 
 * deleteOrderMutation.mutate(123);
 * ```
 */
export function useDeleteOrder(
  options?: Omit<
    UseMutationOptions<void, Error, number | string, unknown>,
    'mutationFn' | 'mutationKey'
  >
) {
  const queryClient = useQueryClient();

  return useMutation({
    ...deleteOrderMutationOptions(),
    ...options,
    onSuccess: (data, orderId, context) => {
      // Remove the order from cache
      queryClient.removeQueries({ queryKey: orderKeys.detail(orderId) });
      // Invalidate lists to refetch
      queryClient.invalidateQueries({ queryKey: orderKeys.lists() });
      // Call user's onSuccess if provided
      options?.onSuccess?.(data, orderId, context);
    },
  });
}
