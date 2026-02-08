// dev-server.go (na raiz)
package main

import (
	"encoding/json"
	"math/rand"
	"net/http"
	"time"
)

type SystemStatus struct {
	Status    string  `json:"status"`
	Uptime    string  `json:"uptime"`
	CPULoad   float64 `json:"cpu_load"`
	MemoryMB  int     `json:"memory_mb"`
	LatencyMS int     `json:"latency_ms"`
}

var startTime = time.Now()

func healthHandler(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")
	w.Header().Set("Access-Control-Allow-Origin", "*")
	json.NewEncoder(w).Encode(map[string]string{
		"status":  "alive",
		"engine":  "golang",
		"version": "1.0",
	})
}

func telemetryHandler(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")
	w.Header().Set("Access-Control-Allow-Origin", "*")

	status := SystemStatus{
		Status:    "Operational",
		Uptime:    time.Since(startTime).String(),
		CPULoad:   rand.Float64() * 100,
		MemoryMB:  rand.Intn(1024),
		LatencyMS: rand.Intn(50),
	}
	json.NewEncoder(w).Encode(status)
}

func main() {
	http.HandleFunc("/api/go/health", healthHandler)
	http.HandleFunc("/api/go/telemetry", telemetryHandler)

	println("Go server running on :8080")
	http.ListenAndServe(":8080", nil)
}
