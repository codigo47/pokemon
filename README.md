# Approach

I focused on using libraries that could handle most of the heavy lifting, so I could concentrate on the project requirements (Next.js, Chart.js, Fuse.js, Axios cache, Loading Skeleton). I also tried to make the code as reusable as possible, including components, charts, hooks, and APIs.

The most interesting challenge was the search by name. Since PokéAPI doesn’t have a specific endpoint for that, I needed to reduce the number of API calls. I solved it by adding a simple caching technique.

# Embeddable <> Pokémon

Embeddable <> Pokémon is a Next.js project that visualizes Pokémon type distributions using Chart.js, along with additional features like searching for Pokémon and viewing single-type vs dual-type distributions.

## Prerequisites

Before you begin, make sure you have the following installed on your machine:

- Node.js (v14.x or higher)
- npm (v6.x or higher)

## Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/codigo47/pokemon.git
cd pokemon
```

### 2. Install Dependencies

To install the necessary packages for the project, run the following command:

```bash
npm install
```

### 3. Run the Development Server

To start the development server, use:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to see the application.

### 4. Build for Production

To build the project for production, use:

```bash
npm run build
```

Once the build is complete, you can run the production server using:

```bash
npm start
```

### 5. Linting

To run ESLint and check for code quality issues:

```bash
npm run lint
```

### 6. Run Tests

To run unit tests, use:

```bash
npm run test
```

This project uses Jest for testing, and the tests are configured to run using `ts-jest` for TypeScript compatibility.

## Dependencies Overview

### Production Dependencies

- **axios**: A promise-based HTTP client for making API requests. We use it with cache support to optimize performance.
  
- **axios-cache-interceptor**: Adds caching capabilities to Axios, enabling us to cache HTTP requests and avoid redundant API calls.

- **chart.js**: A popular JavaScript library for creating charts. Used to render Pokémon type distribution charts.

- **chartjs-plugin-datalabels**: A plugin for Chart.js that allows labels to be shown inside the bars or around the charts.

- **fuse.js**: A lightweight fuzzy-search library that allows full-text searching and filtering. Used for searching Pokémon names.

- **react-chartjs-2**: React wrapper for Chart.js, used to integrate Chart.js charts directly into React components.

- **react-loading-skeleton**: A package for displaying skeleton loaders while data is being fetched, improving the user experience during API calls.

## Project Structure

```
pokemon/
├── src/
│   ├── components/
│   │   ├── common/
│   │   ├── charts/
│   │   ├── search/
│   ├── hooks/
│   └── api/
├── public/
├── styles/
├── .eslintrc.json
├── jest.config.js
├── package.json
└── tsconfig.json
```