"use client";

import { useForm } from "react-hook-form";
import { Order } from "@/features/orders/orders.types";
import { cn } from "@/lib/utils";
import { RippleButton } from "@/components/ui/ripple-button";

type OrderFormData = Omit<Order, "id">;

interface OrderFormProps {
  order?: Partial<Order>;
  onSubmit: (data: OrderFormData) => void;
  className?: string;
}

export function OrderForm({ order, onSubmit, className }: OrderFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<OrderFormData>({
    defaultValues: {
      agent_id: order?.agent_id ?? "",
      item: order?.item ?? "",
    },
  });

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className={cn("space-y-4", className)}
    >
      <div className="space-y-2">
        <label
          htmlFor="agent_id"
          className="text-sm font-medium text-foreground"
        >
          Agent ID
        </label>
        <input
          id="agent_id"
          type="text"
          {...register("agent_id", { required: "Agent ID is required" })}
          className={cn(
            "w-full rounded-md border bg-background px-3 py-2 text-sm",
            "placeholder:text-muted-foreground",
            "focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
            errors.agent_id && "border-destructive"
          )}
          placeholder="Enter agent ID"
        />
        {errors.agent_id && (
          <p className="text-sm text-destructive">{errors.agent_id.message}</p>
        )}
      </div>

      <div className="space-y-2">
        <label htmlFor="item" className="text-sm font-medium text-foreground">
          Item
        </label>
        <input
          id="item"
          type="text"
          {...register("item", { required: "Item is required" })}
          className={cn(
            "w-full rounded-md border bg-background px-3 py-2 text-sm",
            "placeholder:text-muted-foreground",
            "focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
            errors.item && "border-destructive"
          )}
          placeholder="Enter item"
        />
        {errors.item && (
          <p className="text-sm text-destructive">{errors.item.message}</p>
        )}
      </div>

      <RippleButton
        type="submit"
        disabled={isSubmitting}
        className="w-full font-bold bg-app-purple-background border-app-purple-muted"
      >
        {isSubmitting ? "Submitting..." : "Submit Order"}
      </RippleButton>
    </form>
  );
}
