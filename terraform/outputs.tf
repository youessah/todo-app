output "ec2_public_ip" {
  description = "IP publique du serveur EC2"
  value       = aws_instance.backend.public_ip
}

output "ec2_public_dns" {
  description = "DNS public du serveur EC2"
  value       = aws_instance.backend.public_dns
}

output "rds_endpoint" {
  description = "Endpoint de la base de données RDS"
  value       = aws_db_instance.postgres.endpoint
}

output "rds_port" {
  description = "Port RDS"
  value       = aws_db_instance.postgres.port
}
