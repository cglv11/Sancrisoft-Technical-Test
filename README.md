# Sancrisoft-Technical-Test

An intuitive web application designed to simplify vehicle data management. Seamlessly browse, update, and monitor your vehicle inventory with efficient pagination and sleek user interfaces. Powered by ReactJS, Context, Material UI, CSS on the frontend, and bolstered by a robust backend built with Node.js, Fastify, Axios, and SQLite.

# Features

- Automated Data Seeding: Use a migration script to seed a vehicles table, fetching data from the [Cars API by API Ninjas](https://api-ninjas.com/).
- Dynamic CRUD Endpoints: Establish read and update endpoints to effectively query and modify the vehicles' data.
- Responsive UI Components: Implement a paginated vehicles table paired with an edit vehicle modal for smooth user interactions.

# Prerequisites

## Backend

**Dependencies**:

- Fastify and related plugins: `@fastify/cors`, `@fastify/swagger`
- HTTP client: `axios`
- Error Handling: `boom`
- Database: `sqlite3`
- Other utilities: `request`

**DevDependencies**:

- `nodemon` for automatic server reloads during development.

**Scripts**:

- `dev`: Runs the server in development mode using nodemon.

  
## Frontend

**Dependencies**:

- UI Library: `@material-ui/core`, `@material-ui/icons`, `@material-ui/lab`
- Testing: `@testing-library/jest-dom`, `@testing-library/react`, `@testing-library/user-event`
- HTTP Client: `axios`
- Frontend Library: `react`, `react-dom`
- Routing: `react-router-dom`
- Other utilities: `web-vitals`

**Scripts**:

- `start`: Starts the development server.
- `build`: Builds the app for production.
- `test`: Run tests.
- `eject`: Removes the single build dependency from your project.


## Getting Started

**1. Clone the project**
```
git clone https://github.com/cglv11/Sancrisoft-Technical-Test.git
cd Sancrisoft-Technical-Test
```

**2. SQLITE Setup**

- Download and setup SQLite from [here](https://www.sqlite.org/download.html).
- Once installed, make sure to set it up in your backend configurations.

**3. Backend Installation**
```
cd backend
npm install
```

**4. Frontend Installation**
```
cd frontend
npm install
```

**5. Running the Applications**
- For Backend:
```
npm run dev
```
- For Frontend:
```
npm start
```

# Screenshots

![Group 37](https://github.com/cglv11/Sancrisoft-Technical-Test/assets/20548770/dd2689a7-4136-4b8c-bb35-947a4dfffbd6)

