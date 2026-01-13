import { Order } from "@/features/orders/orders.types";
import { cn } from "@/lib/utils";

interface OrderDisplayProps {
  order: Order;
  className?: string;
}

export function OrderDisplay({ order, className }: OrderDisplayProps) {
  return (
    <div className={cn("rounded-lg border bg-card p-4 shadow-sm", className)}>
      <div className="flex items-center justify-between">
        <span className="text-sm text-muted-foreground">Order #{order.id}</span>
        <span className="text-xs text-muted-foreground">{order.agent_id}</span>
      </div>
      <p className="mt-2 font-medium">{order.item}</p>
    </div>
  );
}
