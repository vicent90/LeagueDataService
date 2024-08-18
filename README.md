# League Data Service

This project is a backend service built with GraphQL. It interacts with the [football-data.org API](https://www.football-data.org/) to import league data, including leagues, teams, and players, into a MongoDB database. The service exposes GraphQL queries and mutations to allow fetching and managing the imported data.

## Features

- **Import League**: A GraphQL mutation to import league data from the football-data.org API.
- **League Query**: A GraphQL query to fetch all leagues.
- **Players Query**: A GraphQL query to fetch players from a league, with optional filtering by team.
- **Team Query**: A GraphQL query to fetch a team and optionally include its players.

## Tech Stack

- **Node.js**
- **GraphQL**
- **MongoDB with Mongoose**
- **BullMQ (for background processing)**
- **Apollo Server**
- **Redis** (used for BullMQ)
- **Docker** (for containerization)
- **Typescript**

## Setup

### Prerequisites

Ensure that you have the following installed:

- [Node.js](https://nodejs.org/) (version 18.x or later)
- [Docker](https://www.docker.com/)
- [Docker Compose](https://docs.docker.com/compose/)

### Local Setup

1. Clone the repository:
    ```bash
    git clone <repository-url>
    cd league-data-service
    ```

2. Install dependencies:
    ```bash
    npm install
    ```

3. Create a `.env` file in the root directory with the following content:
    ```plaintext
    MONGO_PORT=27017
    MONGO_COLLECTION_NAME=league-data
    MONGO_INITDB_ROOT_USERNAME=root
    MONGO_INITDB_ROOT_PASSWORD=password
    MONGO_CONTAINER_NAME=league_data_service_mongo

    REDIS_CONTAINER_NAME=league_data_service_redis
    REDIS_PORT=6379

    FOOTBAL_API_KEY=your_football_api_key
    FOOTBAL_API_URL=https://api.football-data.org/v4
    ```

4. Build and run the application with Docker:
    ```bash
    npm run docker:up
    ```

5. Compile the TypeScript files:
    ```bash
    npm run compile
    ```

6. Start the server:
    ```bash
    npm run dev
    ```

The GraphQL server will be running at [http://localhost:4000/graphql](http://localhost:4000/graphql).

## API Documentation

### GraphQL Endpoints

#### Mutation: `importLeague`
- Imports the data of a given league based on the `leagueCode`.
- Example mutation:
    ```graphql
    mutation {
      importLeague(leagueCode: "PL") {
        message
        jobId
      }
    }
    ```
#### Query: `leagues`
- Fetches all leagues.
- Optional filter by team name.
- Example query:
    ```graphql
    query {
      leagues {
        id
        name
        code
        areaName
      }
    }
    ```

#### Query: `players`
- Fetches all players of teams in the specified league.
- Optional filter by team name.
- Example query:
    ```graphql
    query {
      players(leagueCode: "PL", teamName: "Aston Villa FC") {
        name
        position
        nationality
        dateOfBirth
      }
    }
    ```

#### Query: `team`
- Fetches a team by name and optionally resolves the players for that team.
- Example query:
    ```graphql
    query {
      team(name: "Aston Villa FC") {
        name
        tla
        shortName
        areaName
        address
        coach {
          name
        }
        players {
          name
          position
        }
      }
    }
    ```

## Background Job Processing

- The `importLeague` mutation adds the league import task to a background job queue managed by BullMQ. This ensures that the user can continue using the application while the data is being fetched and imported.
- Redis is required to handle the BullMQ job queue. Ensure that Redis is running, either locally or within Docker.

## Docker Setup

This project includes a Docker setup to spin up MongoDB, Redis, and the application itself. The following Docker services are defined:

- **MongoDB**: For data storage.
- **Redis**: For background job management.
- **Node.js**: Runs the Apollo GraphQL server.

### Commands:

- **Start all services**:
    ```bash
    npm run docker:up
    ```

- **Stop all services**:
    ```bash
    npm run docker:down
    ```

## Decisions & Considerations

## Libraries and Frameworks Used

1. **GraphQL**: Provides flexible querying, allowing retrieval of specific fields, reducing payload size, and enhancing performance.
2. **MongoDB**: Chosen for its schema flexibility and ease of integration with Node.js and Mongoose.
3. **BullMQ**: Handles background processing for league imports, efficiently managing rate-limited API requests without blocking the main thread.
4. **Docker**: Ensures consistent environments across machines, simplifying setup and deployment.
5. **Axios**: 
   - **Ease of Use**: Cleaner API with less boilerplate than Node's HTTP module.
   - **Promises**: Simplifies asynchronous code with `async/await`.
  - **Interceptors and Error Handling**: Advanced features like interceptors, error handling, and retries for rate-limited requests (`429` status), which is more straightforward with Axios.
   - **Retry Handling**: Supports retrying failed requests with ease, using features like `axios.isAxiosError` and `setTimeout` to manage rate limits.
6. **Apollo Server**:
   - **GraphQL Optimization**: Seamless GraphQL integration, extensibility, and performance optimizations make it ideal for building scalable APIs.

## Future Considerations

### 1. **Testing**:
   - Add unit and integration tests for core functionality.
   - Aim for comprehensive test coverage across modules.

### 2. **Authentication**:
   - Implement user authentication (e.g., JWT) to secure API endpoints.
   - Introduce role-based access control for sensitive operations.

### 3. **CORS**:
   - Enable CORS to control domain access and improve security.
   - Customize CORS rules to support required headers and methods.

### 4. **Rate Limiting**:
   - Add server-side rate limiting to prevent abuse.
   - Set up monitoring for rate limit breaches.

### 5. **Monitoring and Logging**:
   - Improve logging for detailed API and job execution insights.
   - Integrate with monitoring tools to track application health.

### 6. **Error Handling**:
   - Create a global error handler for standardized responses.
   - Ensure graceful degradation with clear client error messages.

### 7. **CI/CD Actions**:
   - Set up continuous integration (CI) to automate testing and validation.
   - Implement continuous deployment (CD) to streamline application releases.
   - Configure pipelines for build, test, and deployment stages to enhance development workflows.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
