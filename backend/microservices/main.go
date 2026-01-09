package main

import (
	"log"
	"net/http"
	"github.com/gorilla/mux"
	//"honnef.co/go/tools/config"
	"fetch-business/hotel-booking/lite_api_backend"
)

func main() {
	// Load configuration
	config :=lite_api_backend.LoadConfig()
	log.Printf("Starting hotel booking service on port %s", config.Port)
	log.Printf("Using %s environment", func() string {
		if config.IsSandbox {
			return "SANDBOX"
		}
		return "PRODUCTION"
	}())

	// Initialize LiteAPI client
	client := lite_api_backend.NewLiteAPIClient(config.LiteAPIKey)

	// Initialize handlers
	handler := lite_api_backend.NewHandler(client, config)

	// Setup router
	router := mux.NewRouter()

	// Serve static HTML page
	router.HandleFunc("/", handler.HomeHandler).Methods("GET")

	// API routes
	router.HandleFunc("/api/config", handler.ConfigHandler).Methods("GET", "OPTIONS")
	router.HandleFunc("/api/places", handler.SearchPlacesHandler).Methods("GET", "OPTIONS")
	router.HandleFunc("/api/rates", handler.SearchRatesHandler).Methods("POST", "OPTIONS")
	router.HandleFunc("/api/hotel", handler.GetHotelDetailsHandler).Methods("GET", "OPTIONS")
	router.HandleFunc("/api/prebook", handler.PrebookHandler).Methods("POST", "OPTIONS")
	router.HandleFunc("/api/book", handler.BookHandler).Methods("POST", "OPTIONS")

	// Start server
	log.Printf("Server listening on http://localhost:%s", config.Port)
	if err := http.ListenAndServe(":"+config.Port, router); err != nil {
		log.Fatalf("Server failed to start: %v", err)
	}
}
