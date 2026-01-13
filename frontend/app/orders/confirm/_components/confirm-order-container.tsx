"use client";

import { OrderForm } from "../../(orders)/order-form";
import { useCreateOrder } from "@/features/orders/orders.mutations";
import type { Order } from "@/features/orders/orders.types";

const HARDCODED_ORDER: Partial<Order> = {
  agent_id: "agent-001",
  item: "Premium Widget Bundle",
};

export function ConfirmOrderContainer() {
  const createOrderMutation = useCreateOrder();

  const handleSubmit = (data: Omit<Order, "id">) => {
    createOrderMutation.mutate({
      agent_id: data.agent_id,
      item: data.item,
    });
  };

  return (
    <div className="mx-auto max-w-md p-6">
      <h1 className="mb-3 text-xl font-bold">Confirm Order</h1>

      <OrderForm order={HARDCODED_ORDER} onSubmit={handleSubmit} className="" />

      {createOrderMutation.isSuccess && (
        <p className="mt-4 text-sm text-green-600">
          Order created successfully!
        </p>
      )}

      {createOrderMutation.isError && (
        <p className="mt-4 text-sm text-destructive">
          Error: {createOrderMutation.error.message}
        </p>
      )}
    </div>
  );
}
