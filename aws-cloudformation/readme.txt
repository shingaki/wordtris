Steps to create environment using cloudformation - Wordtris

1. Create VPC
2. Create Internet Gateway
3. Attach the Internet Gateway to the VPC
4. Create the Public Subnets
5. Create Public Route Table
6. Add Public Route with the Public Route Table
7. Associate the Public Subnets with the Public Route Table
8. Create the Private Subnets
9. Create the Security Groups for the VPC:
		- App load balancer
		- SSH
		- EC2
		- RDS

Steps to create the nat gateway using CloudFormation - Wordtris
1. Allocate elastic IP address
2. Create Nat Gateway in each public subnets
3. Create a Private Route table
4. Add a route to point internet bound traffic to Nat Gateway
5. Associate Private Subnets with Private Route table