const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());

// Health check endpoint
app.get('/health', (req, res) => {
    res.status(200).json({
        status: 'healthy',
        timestamp: new Date().toISOString(),
        uptime: process.uptime()
    });
});

// Root endpoint
app.get('/', (req, res) => {
    res.json({
        service: 'Cloud-Native Auto Scaling Service',
        version: '1.0.0',
        endpoints: {
            health: "/health",
            calculate: '/calculate?iterations=1000000'
        }
    });
});

// CPU-intensive endpoint to simulate load
app.get('/calculate', (req, res) => {
    const iterations = parseInt(req.query.iterations) || 1000000;
    const startTime = Date.now();

    // Simulate CPU-intensive work
    let result = 0;
    for (let i =0; i < iterations; i++) {
        result += Math.sqrt(i) * Math.random();
    }

    const duration = Date.now() - startTime;

    res.json({
        result: result.toFixed(2),
        iterations: iterations,
        duration_ms: duration,
        timestamp: new Date().toISOString()
    });
});

// Metrics endpoint (useful for monitoring)
app.get('/metrics', (req,res) => {
    const memUsage = process.memoryUsage();
    
    res.json({
        uptime_seconds: process.uptime(),
        memory: {
        rss_mb: (memUsage.rss / 1024 / 1024).toFixed(2),
        heap_used_mb: (memUsage.heapUsed / 1024 /1024).toFixed(2),
        heap_total_mb: (memUsage.heapTotal / 1024 / 1024).toFixed(2)
    },
    node_version: process.version,
    platform: process.platform
    });
});

// Start server
app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running on port ${PORT}`);
  console.log(`Health check: http://localhost:${PORT}/health`);
  console.log(`Calculate: http://localhost:${PORT}/calculate`);
  console.log(`Metrics: http://localhost:${PORT}/metrics`);

})