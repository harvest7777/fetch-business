"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { OrderForm } from "../../_components/order-form";
import { useCreateOrder } from "@/features/orders/orders.mutations";
import type { Order } from "@/features/orders/orders.types";

const HARDCODED_ORDER: Partial<Order> = {
  agent_id: "agent-001",
  item: "Premium Widget Bundle",
};

export function ConfirmOrderContainer() {
  const router = useRouter();
  const createOrderMutation = useCreateOrder();

  useEffect(() => {
    if (createOrderMutation.isSuccess) {
      router.push("/orders/success");
    }
  }, [createOrderMutation.isSuccess, router]);

  useEffect(() => {
    if (createOrderMutation.isError) {
      router.push("/orders/failed");
    }
  }, [createOrderMutation.isError, router]);

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
    </div>
  );
}
