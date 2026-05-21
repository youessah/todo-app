variable "aws_region" {
  description = "Région AWS"
  type        = string
  default     = "us-east-1"
}

variable "project_name" {
  description = "Nom du projet"
  type        = string
  default     = "todoapp"
}

variable "environment" {
  description = "Environnement"
  type        = string
  default     = "production"
}

variable "vpc_cidr" {
  description = "CIDR du VPC"
  type        = string
  default     = "10.0.0.0/16"
}

variable "public_subnet_cidrs" {
  description = "CIDRs des subnets publics"
  type        = list(string)
  default     = ["10.0.1.0/24", "10.0.2.0/24"]
}

variable "private_subnet_cidrs" {
  description = "CIDRs des subnets privés"
  type        = list(string)
  default     = ["10.0.3.0/24", "10.0.4.0/24"]
}

variable "ec2_instance_type" {
  description = "Type d'instance EC2"
  type        = string
  default     = "t2.micro"
}

variable "db_instance_class" {
  description = "Classe de l'instance RDS"
  type        = string
  default     = "db.t3.micro"
}

variable "db_name" {
  description = "Nom de la base de données"
  type        = string
  default     = "todoapp"
}

variable "db_username" {
  description = "Utilisateur de la base de données"
  type        = string
  default     = "todouser"
}

variable "db_password" {
  description = "Mot de passe de la base de données"
  type        = string
  sensitive   = true
  default     = "TodoApp2024!"
}

variable "docker_image" {
  description = "Image Docker du backend"
  type        = string
  default     = "audreyyouessah/todo-app-backend:latest"
}
