# Star Wars API Explorer

This project is a **Star Wars-themed** web application built using **React**, **TypeScript**, **Vite**, and **ShadCn**, allowing users to explore Star Wars data from a public API.

## Features

- **API Integration**: Fetch data from the Star Wars API (SWAPI) to display information about Star Wars characters, planets, and starships.
- **Responsive Design**: The application is fully responsive and optimized for various devices.
- **Cypress Integration**: End-to-end testing using Cypress.

## Setup and Installation

1. **Clone the repository**:
   ```bash
   git clone https://github.com/neeleshroy2023/star-wars.git
   cd star-wars
   ```

2. **Install dependencies**:
   ```bash
   yarn install
   ```

3. **Run the development server**:
   ```bash
   yarn dev
   ```

4. **Build the project**:
   ```bash
   yarn build
   ```

5. **Run unit tests**:
   ```bash
   yarn test
   ```

5. **Run End to End tests**:
In One terminal:
   ```bash
   yarn dev
   ```
Another terminal:
For chrome:
```bash
  yarn cy:open
```

For Headless:
```bash
  yarn cy:run
```

## Project Structure

- **src/**: Contains the main code of the application.
  - **components/**: Reusable UI components.
  - **components/containers**: Container elements containing logic.
  - **components/presentations**: Presentation elements containing dumb UI

- **cypress/**: Contains Cypress testing configuration and test cases.
- **public/**: Static assets.

## Technologies Used

- **React**: UI Library
- **Cypress**: Routing framework
- **TypeScript**: Static typing for JavaScript
- **Vite**: Build tool for fast development and production bundling
- **ShadCN**: Utility-first CSS framework
- **Cypress**: End-to-end testing framework

## Future Enhancements

- **State Management**: Potential use of a state management library like Redux or Zustand for more complex state handling.
- **Advanced Testing**: Integration of more unit and integration tests.
- **Additional API Data**: Extend the API integration to include films, species, and vehicles.
- **POST Request**: Add a backend and own DB to manage data handling and implement the whole CRUD

---

Neelesh Roy