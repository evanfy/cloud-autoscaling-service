# Cloud-Native Auto-Scaling Service

A containerized Node.js microservice demonstrating cloud-native architecture, auto-scaling, and Infrastructure as Code principles.

## Project Overview

This project showcases:
- **Microservice Architecture**: Stateless Node.js API built with Express
- **Containerization**: Docker with multi-stage builds for optimized images
- **Orchestration**: Kubernetes deployment with Horizontal Pod Autoscaling
- **Infrastructure as Code**: Terraform for cloud resource provisioning
- **Observability**: Health checks, metrics endpoints, and monitoring

## Architecture
```
Client Request → Load Balancer → Kubernetes Service → Auto-Scaled Pods
                                                      ↓
                                            Horizontal Pod Autoscaler
                                            (CPU-based scaling)
```

## Features

- **Health Checks**: `/health` endpoint for container orchestration
- **CPU-Intensive Endpoint**: `/calculate` for load testing and triggering auto-scaling
- **Metrics**: `/metrics` endpoint exposing resource usage
- **Horizontal Auto-Scaling**: Automatically scales from 2 to 10 pods based on CPU utilization
- **Stateless Design**: No local state, enabling seamless scaling

## Prerequisites

- Node.js 18+
- Docker Desktop
- kubectl (Kubernetes CLI)
- Minikube (for local testing)
- Terraform (for cloud deployment)

## Local Development

### Run Locally (Node.js)
```bash
npm install
npm start
```

Access the service at `http://localhost:3000`

### Run with Docker
```bash
# Build the image
docker build -t cloud-autoscaling-service:v1 .

# Run the container
docker run -d -p 3000:3000 --name my-service cloud-autoscaling-service:v1

# View logs
docker logs -f my-service
```

### Run with Kubernetes (Minikube)
```bash
# Start Minikube
minikube start

# Enable metrics server
minikube addons enable metrics-server

# Deploy application
kubectl apply -f k8s/deployment.yaml
kubectl apply -f k8s/service.yaml
kubectl apply -f k8s/hpa.yaml

# Access the service
minikube service cloud-autoscaling-service
```

## Load Testing

### Using Built-in Test Script
```bash
npm test
```

### Using hey (HTTP load tester)
```bash
# Install hey
brew install hey

# Generate load (adjust URL to your service)
hey -z 60s -c 50 http://localhost:3000/calculate?iterations=10000000
```

## Monitoring Auto-Scaling

Watch the Horizontal Pod Autoscaler in action:
```bash
# Watch HPA status
kubectl get hpa -w

# Watch pods scaling
kubectl get pods -w
```

## Docker Hub

Image available at: `YOUR_USERNAME/cloud-autoscaling-service:v1`
```bash
docker pull YOUR_USERNAME/cloud-autoscaling-service:v1
```

## Cloud Deployment

*(Coming in Phase 4 - AWS with Terraform)*

## Project Structure
```
cloud-autoscaling-service/
├── server.js              # Main application
├── package.json           # Node.js dependencies
├── Dockerfile             # Container definition
├── .dockerignore         # Docker ignore rules
├── test-load.js          # Load testing script
├── k8s/                  # Kubernetes manifests
│   ├── deployment.yaml   # Pod deployment config
│   ├── service.yaml      # Load balancer config
│   └── hpa.yaml          # Auto-scaling config
└── terraform/            # IaC (coming soon)
```

## Learning Objectives

This project demonstrates proficiency in:
- Modern JavaScript/Node.js development
- RESTful API design
- Docker containerization and optimization
- Kubernetes orchestration and auto-scaling
- Cloud-native architecture patterns
- DevOps best practices
- Infrastructure as Code

## 📝 API Endpoints

| Endpoint | Method | Description |
|----------|--------|-------------|
| `/` | GET | Service information |
| `/health` | GET | Health check for K8s probes |
| `/calculate` | GET | CPU-intensive task (with `?iterations` param) |
| `/metrics` | GET | Resource usage metrics |

## Configuration

### Kubernetes Resources

- **Initial Replicas**: 2
- **CPU Request**: 100m (0.1 cores)
- **CPU Limit**: 500m (0.5 cores)
- **Memory Request**: 128Mi
- **Memory Limit**: 256Mi

### Auto-Scaling Rules

- **Target CPU**: 50% average utilization
- **Min Pods**: 2
- **Max Pods**: 10
- **Scale Up**: Immediate
- **Scale Down**: 60 second stabilization window

## Contributing

This is a portfolio/learning project. Feedback and suggestions welcome!

## License

MIT

## Author

Evan Atwell - [GitHub](https://github.com/evanfy)