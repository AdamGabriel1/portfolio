package main

import (
	"math/rand"
	"net/http"
	"time"

	"github.com/gin-gonic/gin"
)

// Estrutura de dados para o Status do Sistema
type SystemStatus struct {
	Status    string  `json:"status"`
	Uptime    string  `json:"uptime"`
	CPULoad   float64 `json:"cpu_load"`
	MemoryMB  int     `json:"memory_mb"`
	LatencyMS int     `json:"latency_ms"`
}

var startTime = time.Now()

func main() {
	// Configura o Gin para o modo Release em produção
	gin.SetMode(gin.ReleaseMode)
	r := gin.Default()

	// Middleware de CORS mais completo
	r.Use(func(c *gin.Context) {
		c.Writer.Header().Set("Access-Control-Allow-Origin", "*")
		c.Writer.Header().Set("Access-Control-Allow-Methods", "GET, POST, OPTIONS")
		c.Writer.Header().Set("Access-Control-Allow-Headers", "Content-Type, Authorization")

		if c.Request.Method == "OPTIONS" {
			c.AbortWithStatus(204)
			return
		}
		c.Next()
	})

	// Rota de Health Check
	r.GET("/health", func(c *gin.Context) {
		c.JSON(http.StatusOK, gin.H{
			"status":  "alive",
			"engine":  "golang",
			"version": "1.0.0",
		})
	})

	// Rota para telemetria do sistema
	r.GET("/v1/telemetry", func(c *gin.Context) {
		status := SystemStatus{
			Status:    "Operational",
			Uptime:    time.Since(startTime).Round(time.Second).String(),
			CPULoad:   rand.Float64() * 100,
			MemoryMB:  rand.Intn(1024) + 512, // 512-1536 MB
			LatencyMS: rand.Intn(50) + 10,    // 10-60ms
		}
		c.JSON(http.StatusOK, status)
	})

	// NOVA ROTA: Receber mensagem de contato
	r.POST("/v1/contact", func(c *gin.Context) {
		var contactData struct {
			Name        string `json:"name" binding:"required"`
			Email       string `json:"email" binding:"required,email"`
			ProjectType string `json:"project_type" binding:"required"`
			Budget      string `json:"budget" binding:"required"`
			Message     string `json:"message" binding:"required"`
		}

		if err := c.ShouldBindJSON(&contactData); err != nil {
			c.JSON(http.StatusBadRequest, gin.H{
				"error":   "Invalid request data",
				"details": err.Error(),
			})
			return
		}

		// Aqui você pode salvar no banco de dados, enviar email, etc.
		// Por enquanto, apenas simulamos processamento
		time.Sleep(500 * time.Millisecond)

		c.JSON(http.StatusOK, gin.H{
			"success":        true,
			"transaction_id": "ADAM-" + time.Now().Format("20060102-150405"),
			"timestamp":      time.Now().Unix(),
			"message":        "Message received successfully",
		})
	})

	r.Run(":8080")
}
