import { useQuery } from "@tanstack/react-query";
import { getOrders } from "./orders.client";
import { orderKeys } from "./orders.keys";
import type { Order } from "./orders.types";

export function useGetOrders() {
  return useQuery<Order[], Error>({
    queryKey: orderKeys.all(),
    queryFn: getOrders,
  });
}
