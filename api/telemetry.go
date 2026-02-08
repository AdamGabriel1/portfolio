package handler

import (
	"encoding/json"
	"math/rand"
	"net/http"
)

type SystemStatus struct {
	Status    string  `json:"status"`
	Uptime    string  `json:"uptime"`
	CPULoad   float64 `json:"cpu_load"`
	MemoryMB  int     `json:"memory_mb"`
	LatencyMS int     `json:"latency_ms"`
}

func Handler(w http.ResponseWriter, r *http.Request) {
	// Dados dinâmicos para o seu Terminal
	data := SystemStatus{
		Status:    "OPERATIONAL",
		Uptime:    "02:45:12",
		CPULoad:   rand.Float64() * 100,
		MemoryMB:  rand.Intn(1024),
		LatencyMS: rand.Intn(50),
	}

	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(http.StatusOK)
	json.NewEncoder(w).Encode(data)
}
