package main

import (
	"math/rand"
	"net/http"
	"time"

	"github.com/gin-gonic/gin"
)

type SystemStatus struct {
	Status    string  `json:"status"`
	Uptime    string  `json:"uptime"`
	CPULoad   float64 `json:"cpu_load"`
	MemoryMB  int     `json:"memory_mb"`
	LatencyMS int     `json:"latency_ms"`
}

var startTime = time.Now()

func main() {
	gin.SetMode(gin.ReleaseMode)
	r := gin.Default()

	// CORS para permitir Next.js na porta 3000
	r.Use(func(c *gin.Context) {
		c.Writer.Header().Set("Access-Control-Allow-Origin", "http://localhost:3000")
		c.Writer.Header().Set("Access-Control-Allow-Methods", "GET, POST, OPTIONS")
		c.Writer.Header().Set("Access-Control-Allow-Headers", "Content-Type")
		if c.Request.Method == "OPTIONS" {
			c.AbortWithStatus(204)
			return
		}
		c.Next()
	})

	r.GET("/health", func(c *gin.Context) {
		c.JSON(http.StatusOK, gin.H{"status": "alive", "engine": "golang"})
	})

	r.GET("/telemetry", func(c *gin.Context) {
		status := SystemStatus{
			Status:    "Operational",
			Uptime:    time.Since(startTime).String(),
			CPULoad:   rand.Float64() * 100,
			MemoryMB:  rand.Intn(1024),
			LatencyMS: rand.Intn(50),
		}
		c.JSON(http.StatusOK, status)
	})

	// Use porta 8081 para evitar conflitos
	r.Run(":8081")
}
