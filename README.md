# Todo App

This project is a Todo application built with React and integrated with Auth0 for authentication. The application is containerized using Docker for consistent development and deployment environments.

## Prerequisites

- Docker: Install Docker from [here](https://www.docker.com/get-started).
- Docker Compose: Installed along with Docker.
- Vault: Install Vault from [here](https://www.vaultproject.io/docs/install).


## Getting Started
1. Set Up Vault and Get Auth0 Credentials
    1. Create a `.env` file in the project's root directory.

        ```dotenv
        REACT_APP_AUTH0_DOMAIN=your-auth0-domain
        REACT_APP_AUTH0_CLIENT_ID=your-auth0-client-id
        REACT_APP_AUTH0_CLIENT_SECRET=your-auth0-client-secret
        ```

        You will be retrieving the actual Auth0 credentials in the following steps. For example 
    
    2. Set up Environment Variable for Vault Address.
        ```sh
        export VAULT_ADDR='http://10.0.0.188:8200/'
        ```
    3. Authenticate with Vault using the provided token.
        ```sh
        vault login <shared_token>
        ```
        Replace <shared_token> with the token provided securely by me.
    4. Read the stored secrets, and copy/paste the secrets into the .env file you created earlier:
        ```sh
        vault kv get secret/auth0
        ```
2. Build the Docker Image
    ```sh
    docker build -t todo-app .
    ```
3. Run the Docker Container
    ```sh
    docker run -p 3000:80 todo-app
    ```
4. Access the Application
    - Open a web browser and navigate to `http://localhost:3000`