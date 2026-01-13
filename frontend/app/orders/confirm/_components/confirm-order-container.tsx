"use client";

import { useRouter } from "next/navigation";
import { OrderForm } from "../../_components/order-form";
import { useCreateOrder } from "@/features/orders/orders.mutations";
import type { CreateOrderRequest } from "@/features/orders/orders.types";

const HARDCODED_ORDER: CreateOrderRequest = {
  item: "Matcha Latte",
};

export function ConfirmOrderContainer() {
  const router = useRouter();
  const createOrderMutation = useCreateOrder();

  const handleSubmit = (data: CreateOrderRequest) => {
    createOrderMutation.mutate(
      { item: data.item },
      {
        onSuccess: () => router.push("/orders/success"),
        onError: () => router.push("/orders/failed"),
      }
    );
  };

  return (
    <div className="mx-auto max-w-md p-6">
      <h1 className="mb-3 text-xl font-bold">Confirm Order</h1>

      <OrderForm order={HARDCODED_ORDER} onSubmit={handleSubmit} className="" />
    </div>
  );
}
