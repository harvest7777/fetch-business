package lite_api_backend

import (
	"bytes"
	"encoding/json"
	"fmt"
	"io"
	"net/http"
	"time"
)

const (
	LiteAPIBaseURL = "https://api.liteapi.travel/v3.0"
	BookAPIBaseURL = "https://book.liteapi.travel/v3.0"
)

type LiteAPIClient struct {
	APIKey     string
	HTTPClient *http.Client
}

func NewLiteAPIClient(apiKey string) *LiteAPIClient {
	return &LiteAPIClient{ 
		APIKey: apiKey,
		HTTPClient: &http.Client{
			Timeout: 30 * time.Second,
		},
	}
}

func (c *LiteAPIClient) doRequest(method, url string, body interface{}) ([]byte, error) {
	var reqBody io.Reader
	if body != nil {
		jsonData, err := json.Marshal(body)
		if err != nil {
			return nil, fmt.Errorf("error marshaling request body: %w", err)
		}
		reqBody = bytes.NewBuffer(jsonData)
	}

	req, err := http.NewRequest(method, url, reqBody)
	if err != nil {
		return nil, fmt.Errorf("error creating request: %w", err)
	}

	req.Header.Set("X-API-Key", c.APIKey)
	req.Header.Set("Accept", "application/json")
	if body != nil {
		req.Header.Set("Content-Type", "application/json")
	}

	resp, err := c.HTTPClient.Do(req)
	if err != nil {
		return nil, fmt.Errorf("error making request: %w", err)
	}
	defer resp.Body.Close()

	respBody, err := io.ReadAll(resp.Body)
	if err != nil {
		return nil, fmt.Errorf("error reading response body: %w", err)
	}

	if resp.StatusCode >= 400 {
		return respBody, fmt.Errorf("API error (status %d): %s", resp.StatusCode, string(respBody))
	}

	return respBody, nil
}

// SearchPlaces searches for places by text query
func (c *LiteAPIClient) SearchPlaces(query string) ([]byte, error) {
	url := fmt.Sprintf("%s/data/places?textQuery=%s", LiteAPIBaseURL, query)
	return c.doRequest("GET", url, nil)
}

// SearchRates searches for hotel rates
func (c *LiteAPIClient) SearchRates(body map[string]interface{}) ([]byte, error) {
	url := fmt.Sprintf("%s/hotels/rates", LiteAPIBaseURL)
	return c.doRequest("POST", url, body)
}

// GetHotelDetails fetches hotel details by hotelId
func (c *LiteAPIClient) GetHotelDetails(hotelId string) ([]byte, error) {
	url := fmt.Sprintf("%s/data/hotel?hotelId=%s&timeout=4", LiteAPIBaseURL, hotelId)
	return c.doRequest("GET", url, nil)
}

// Prebook pre-books a rate
func (c *LiteAPIClient) Prebook(body map[string]interface{}) ([]byte, error) {
	url := fmt.Sprintf("%s/rates/prebook", BookAPIBaseURL)
	return c.doRequest("POST", url, body)
}

// Book completes the booking
func (c *LiteAPIClient) Book(body map[string]interface{}) ([]byte, error) {
	url := fmt.Sprintf("%s/rates/book", BookAPIBaseURL)
	return c.doRequest("POST", url, body)
}
