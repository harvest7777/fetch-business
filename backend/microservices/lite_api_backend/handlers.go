package lite_api_backend

import (
	"encoding/json"
	"io"
	"log"
	"net/http" // Framework for using http request
)

type Handler struct {
	client *LiteAPIClient // Other structure to format what info is going to be on the handler( adress of the client and config)
	config *Config
}

func NewHandler(client *LiteAPIClient, config *Config) *Handler {
	return &Handler{
		client: client,
		config: config,
	}
}

// enableCORS adds CORS headers to responses
func enableCORS(w http.ResponseWriter) {
	w.Header().Set("Access-Control-Allow-Origin", "*")
	w.Header().Set("Access-Control-Allow-Methods", "GET, POST, OPTIONS")
	w.Header().Set("Access-Control-Allow-Headers", "Content-Type")
}

// HomeHandler serves the main HTML page
func (h *Handler) HomeHandler(w http.ResponseWriter, r *http.Request) {
	http.ServeFile(w, r, "index.html")
}

// SearchPlacesHandler handles place search requests
func (h *Handler) SearchPlacesHandler(w http.ResponseWriter, r *http.Request) {
	enableCORS(w)
	if r.Method == "OPTIONS" {
		w.WriteHeader(http.StatusOK)
		return
	}

	query := r.URL.Query().Get("query")
	if query == "" {
		http.Error(w, "query parameter is required", http.StatusBadRequest)
		return
	}

	resp, err := h.client.SearchPlaces(query)
	if err != nil {
		log.Printf("Error searching places: %v", err)
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	w.Header().Set("Content-Type", "application/json")
	w.Write(resp)
}

// SearchRatesHandler handles rate search requests
func (h *Handler) SearchRatesHandler(w http.ResponseWriter, r *http.Request) {
	enableCORS(w)
	if r.Method == "OPTIONS" {
		w.WriteHeader(http.StatusOK)
		return
	}

	body, err := io.ReadAll(r.Body)
	if err != nil {
		http.Error(w, "Error reading request body", http.StatusBadRequest)
		return
	}
	defer r.Body.Close()

	var requestData map[string]interface{}
	if err := json.Unmarshal(body, &requestData); err != nil {
		http.Error(w, "Error parsing JSON", http.StatusBadRequest)
		return
	}

	resp, err := h.client.SearchRates(requestData)
	if err != nil {
		log.Printf("Error searching rates: %v", err)
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	w.Header().Set("Content-Type", "application/json")
	w.Write(resp)
}

// GetHotelDetailsHandler handles hotel details requests
func (h *Handler) GetHotelDetailsHandler(w http.ResponseWriter, r *http.Request) {
	enableCORS(w)
	if r.Method == "OPTIONS" {
		w.WriteHeader(http.StatusOK)
		return
	}

	hotelId := r.URL.Query().Get("hotelId")
	if hotelId == "" {
		http.Error(w, "hotelId parameter is required", http.StatusBadRequest)
		return
	}

	resp, err := h.client.GetHotelDetails(hotelId)
	if err != nil {
		log.Printf("Error getting hotel details: %v", err)
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	w.Header().Set("Content-Type", "application/json")
	w.Write(resp)
}

// PrebookHandler handles prebook requests
func (h *Handler) PrebookHandler(w http.ResponseWriter, r *http.Request) {
	enableCORS(w)
	if r.Method == "OPTIONS" {
		w.WriteHeader(http.StatusOK)
		return
	}

	body, err := io.ReadAll(r.Body)
	if err != nil {
		http.Error(w, "Error reading request body", http.StatusBadRequest)
		return
	}
	defer r.Body.Close()

	var requestData map[string]interface{}
	if err := json.Unmarshal(body, &requestData); err != nil {
		http.Error(w, "Error parsing JSON", http.StatusBadRequest)
		return
	}

	// Ensure usePaymentSdk is set to true
	requestData["usePaymentSdk"] = true

	resp, err := h.client.Prebook(requestData)
	if err != nil {
		log.Printf("Error prebooking: %v", err)
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	w.Header().Set("Content-Type", "application/json")
	w.Write(resp)
}

// BookHandler handles final booking requests
func (h *Handler) BookHandler(w http.ResponseWriter, r *http.Request) {
	enableCORS(w)
	if r.Method == "OPTIONS" {
		w.WriteHeader(http.StatusOK)
		return
	}

	body, err := io.ReadAll(r.Body)
	if err != nil {
		http.Error(w, "Error reading request body", http.StatusBadRequest)
		return
	}
	defer r.Body.Close()

	var requestData map[string]interface{}
	if err := json.Unmarshal(body, &requestData); err != nil {
		http.Error(w, "Error parsing JSON", http.StatusBadRequest)
		return
	}

	resp, err := h.client.Book(requestData)
	if err != nil {
		log.Printf("Error booking: %v", err)
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	w.Header().Set("Content-Type", "application/json")
	w.Write(resp)
}

// ConfigHandler returns the current configuration (for frontend to know if sandbox)
func (h *Handler) ConfigHandler(w http.ResponseWriter, r *http.Request) {
	enableCORS(w)
	if r.Method == "OPTIONS" {
		w.WriteHeader(http.StatusOK)
		return
	}

	config := map[string]interface{}{
		"isSandbox": h.config.IsSandbox,
		"publicKey": func() string {
			if h.config.IsSandbox {
				return "sandbox"
			}
			return "live"
		}(),
	}

	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(config)
}
