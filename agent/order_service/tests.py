import unittest
from unittest.mock import patch, Mock

from order_service.client import OrderServiceClient
from order_service.models import CreateOrder, Order
from order_service.errors import ValidationError


class TestOrderServiceClient(unittest.TestCase):
    def setUp(self):
        """Set up test fixtures."""
        self.client = OrderServiceClient(base_url="http://localhost:8000")
        self.test_order = CreateOrder(item="coffee")

    @patch("agent.order_service.client.requests.post")
    def test_create_order_success(self, mock_post):
        """Test successful order creation."""
        # Mock successful response
        mock_response = Mock()
        mock_response.status_code = 201
        mock_response.json.return_value = {
            "id": 1,
            "agent_id": "test-agent-123",
            "item": "coffee",
        }
        mock_post.return_value = mock_response

        # Create order
        result = self.client.create_order(self.test_order, "test-agent-123")

        # Verify request was made correctly
        mock_post.assert_called_once_with(
            "http://localhost:8000/orders/",
            json={"agent_id": "test-agent-123", "item": "coffee"},
            timeout=5.0,
        )

        # Verify response
        self.assertIsInstance(result, Order)
        self.assertEqual(result.id, 1)
        self.assertEqual(result.agent_id, "test-agent-123")
        self.assertEqual(result.item, "coffee")

    @patch("agent.order_service.client.requests.post")
    def test_create_order_validation_error(self, mock_post):
        """Test order creation with validation error."""
        # Mock 400 response
        mock_response = Mock()
        mock_response.status_code = 400
        mock_response.json.return_value = {"error": "agent_id is required"}
        mock_post.return_value = mock_response

        # Attempt to create order
        with self.assertRaises(ValidationError):
            result = self.client.create_order(self.test_order, "test-agent-123")


if __name__ == "__main__":
    unittest.main()
