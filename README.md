
# Docker, Node.js, MongoDB Project with Ansible Automation.
 This project sets up a Node.js application with MongoDB using Docker containers. Ansible is used for automating the deployment, configuration, monitoring, and backup of the application and database.

# Prerequisites
 Ensure the following are installed on the system: 
- Docker Compose 
 - Ansible
-  Target server (Ubuntu VM Docker container)

## Project Structure

├── NodeJS_app/                   # Node.js application files
│   ├── server..js
│   ├── package.json
│   ├── docker-compose.yml      # Docker Compose configuration
│   └── Dockerfile
├── Ansible_NewCode/
│   ├── playbook.yml
│   ├──roles/
│          ├── restart_containers.yml     # Playbook to start and stop Docker containers.
│          ├── initialize_mongoDB_with_sample_data  #Playbook to initialize MongoDB with sample data
│          ├── Set_configuration_env_vars        # Playbook to set environment variables
│          ├── Monitoring         # Playbook to check if containers are running 
│          ├── Create_backup     # Playbook to backup MongoDB data
│          ├── Copy app_to_target_env   # Playbook to copy Node.js app files to the target server
│   └── templates/
│       └── env.j2    # Template for environment variable configuration
│   └── variables.yml   # Variable file for environment settings
│   └── inventory.ini   # Inventory file for Ansible target hosts


Commands to run the playbook
cd /home/sweetyj/Ansibleteamproject/Ansible_NewCode
ansible-playbook -i inventory.ini playbook.yml --ask-become-pass
Playbook Execution steps: 
When we execute the Ansible playbook, a series of tasks are performed in a defined order to ensure that your Node.js application and MongoDB database are properly configured and managed. Below are the steps executed by each role included in the playbook: 

1.	 **initialize_mongoDB_with_sample_data** 
 This role initializes the MongoDB database with sample data. - It first ensures that the MongoDB service is running. - Then, it connects to the MongoDB instance and executes commands to create a collection and insert sample data, such as names, IDs, and emails

2.	 **Set_configuration_env_vars** 
 This role manages environment variables for the Node.js application. - It creates or updates a `.env` file using a Jinja2 template to include necessary configurations like: - `NODE_ENV`: Specifies the environment (e.g., production, development). - `PORT`: The port on which the Node.js application listens. - `MONGO_URI`: The connection string for MongoDB, specifying where the database can be accessed. 

3.	**Monitoring** 
 This role monitors the status of Docker containers. - It retrieves a list of all running Docker containers and checks their status

4.	**Create_backup** 
This role backs up the MongoDB database. - It uses the `mongodump` command within the MongoDB Docker container to create a backup of the database. 

5.	**Copy app_to_target_env** 
 This role is responsible for copying the Node.js application files to the target environment. 


6.	 **restart_containers** 
 This role is responsible for managing the state of the Docker containers. - It can start or stop the specified containers based on the requirements.  Please find the below commands for start/stop containers:

                  ansible-playbook restart_containers.yml -e action=start
                  ansible-playbook restart_containers.yml -e action=stop



