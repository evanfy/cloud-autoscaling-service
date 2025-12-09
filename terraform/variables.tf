variable "aws_region" {
  description = "AWS region to deploy resources"
  type        = string
  default     = "us-east-1"
}

variable "project_name" {
  description = "Project name used for resource naming"
  type        = string
  default     = "cloud-autoscaling"
}

variable "docker_image" {
  description = "Docker image to deploy (from Docker Hub)"
  type        = string
  default     = "evanfy/cloud-autoscaling-service:v1"
}

variable "min_tasks" {
  description = "Minimum number of ECS tasks"
  type        = number
  default     = 2
}

variable "max_tasks" {
  description = "Maximum number of ECS tasks"
  type        = number
  default     = 10
}