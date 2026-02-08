package handler

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

func Handler(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")
	w.Header().Set("Access-Control-Allow-Origin", "*")
	w.Header().Set("Access-Control-Allow-Methods", "GET, OPTIONS")

	if r.Method == "OPTIONS" {
		w.WriteHeader(http.StatusOK)
		return
	}

	status := SystemStatus{
		Status:    "Operational",
		Uptime:    time.Since(startTime).String(),
		CPULoad:   rand.Float64() * 100,
		MemoryMB:  rand.Intn(1024),
		LatencyMS: rand.Intn(50),
	}

	json.NewEncoder(w).Encode(status)
}
