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

Run the cloudformation in the following order:
1. wordtris_vpc.yaml
Creates the VPC, public subnets, private subnets, and security groups
2. wordtris_nat_gateway.yaml
Create the nat gateway allowing traffic to flow from the public subnets to the internet
3. wordtris_bastion_host.yaml
Creates the EC2 instance for the bastion host in the public subnet.
It is used to SSH into so you can access the dB in the private subnet.
4. wordtris_db.yaml
Creates the RDS instances


To connect to the database
Pre-requsite: You will need the pem key to set up the SSH connection. Tamami has the pem key file.

First you need to set up the SSH connection - you can do this in Datagrip of SQL Workbench
- Go to AWS and EC2 instance and get the public Ipv4 DNS
 SSH Hostname will be the public Ipv4 DNS from the EC2 Instance
 SSH User = ec2-user (always this name)
 SSH Key File = get the file provided to you by Tamami
 Test your SSH connection if possible

- Now you are ready to configure the connection to the database
 Get the DB endpoint - go to AWS --> RDS and this will be in the details
 DB Hostname = Endpoint of the RNS database
 Port = 3306
 User Name - <see the cloudformation template - wordtris_db.yaml> (database user name)
 User Password - <see the cloudformation template - wordtris_db.yaml>



