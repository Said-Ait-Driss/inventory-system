locals {
  vpc_id           = "vpc-0548d408bf3549ca0"
  subnet_id        = "subnet-060a1af52cf0a73d6"
  ssh_user         = "ubuntu"
  key_name         = "inventory"
  private_key_path = "~/Downloads/inventory.pem"
}

provider "aws" {
  region = "us-east-1"
}

resource "aws_security_group" "inventory_app" {
  name   = "inventory_app_access"
  vpc_id = local.vpc_id

  ingress {
    from_port   = 22
    to_port     = 22
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  ingress {
    from_port   = 80
    to_port     = 80
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  ingress {
    from_port   = 27017          # MongoDB port
    to_port     = 27017          # MongoDB port
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"] # Allow MongoDB traffic from anywhere
  }

  egress {
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = ["0.0.0.0/0"]
  }
}

resource "aws_instance" "inventory_app" {
  count                       = 2
  ami                         = "ami-0dba2cb6798deb6d8"
  subnet_id                   = "subnet-060a1af52cf0a73d6"
  instance_type               = "t2.micro"
  associate_public_ip_address = true
  security_groups             = [aws_security_group.inventory_app.id]
  key_name                    = local.key_name

  provisioner "remote-exec" {
    inline = ["echo 'Wait until SSH is ready'"]

    connection {
      type        = "ssh"
      user        = local.ssh_user
      private_key = file(local.private_key_path)
      host        = aws_instance.inventory_app.public_ip
    }
  }
  tags = {
    Name = "Instance-${count.index}"
  }

   provisioner "local-exec" {
    command = "echo ${self.public_ip} >> instance_ips.txt"
  }
}