class OrderServiceError(Exception):
    """Base class for all order service client errors."""


class ValidationError(OrderServiceError):
    """Request was invalid."""


class UnauthorizedError(OrderServiceError):
    """Authentication failed or missing."""


class NotFoundError(OrderServiceError):
    """Requested resource does not exist."""


class ServerError(OrderServiceError):
    """Order service failed internally."""
