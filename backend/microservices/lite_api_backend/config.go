package lite_api_backend

import (
	"log"
	"os"
	"path/filepath"
	"github.com/joho/godotenv"
) // In golang we use the libaries that we afre going to import, if a libary isn't used it will raise a error

type Config struct {
	LiteAPIKey string // Think of this like a init function in python, which allows for you to group related data 
	Port       string
	IsSandbox  bool
}

func LoadConfig() *Config {
	// Load .env file from parent directory (backend folder)
	envPath := filepath.Join("..", ".env")
	if err := godotenv.Load(envPath); err != nil { //In golang if there is a err is not null then it returns a warning or print statement
		log.Printf("Warning: Error loading .env file: %v", err)
	}

	apiKey := os.Getenv("LITE_API_SANDBOX_API_KEY")
	if apiKey == "" {
		log.Printf("Warning: Cannot find lite api key")
	}

	port := "8081"

	// Check if using sandbox key
	isSandbox := len(apiKey) >= 5 && apiKey[:5] == "sand_"

	return &Config{
		LiteAPIKey: apiKey,
		Port:       port,
		IsSandbox:  isSandbox,
	}
}
