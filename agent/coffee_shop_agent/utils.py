# Utils for the agent

from order_service.models import Order


def format_orders(orders: list[Order]) -> str:
    """Format a list of orders into a readable string."""
    if not orders:
        return "No orders found."

    if len(orders) == 1:
        order = orders[0]
        return f"1 order:\n  - Order #{order.id}: {order.item}"

    lines = [f"{len(orders)} orders:"]
    for order in orders:
        lines.append(f"  - Order #{order.id}: {order.item}")

    return "\n".join(lines)
