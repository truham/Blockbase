# Blockbase

Blockbase is a web application designed to provide information and tools related to cryptocurrencies and NFTs. It features a modern frontend built with Next.js, TypeScript, React, Redux Toolkit, and Tailwind CSS, and a robust backend powered by Node.js and TypeScript.

## Project Structure

The project is divided into two main parts:

-   `frontend/`: The Next.js application responsible for the user interface.
-   `backend/`: The Node.js application providing API services for cryptocurrency and NFT data.

## Getting Started

Follow these instructions to set up and run the project locally.

### Prerequisites

Make sure you have the following installed on your machine:

-   Node.js (LTS version recommended)
-   npm or yarn

### Backend Setup

1.  **Navigate to the backend directory:**
    ```bash
    cd backend
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    # or yarn install
    ```

3.  **Create a `.env` file in the `backend/` directory.** This file will store your environment variables, such as API keys. A sample `.env` file might look like this:
    ```
    ALCHEMY_API_KEY=YOUR_ALCHEMY_API_KEY
    ```
    _Note: The backend requires an Alchemy API key for NFT data. CoinGecko is used for cryptocurrency data via their public API (no key required for basic usage, but you may want to get a CoinGecko API key for higher rate limits if needed)._

4.  **Run the backend in development mode:**
    ```bash
    npm run dev
    # or yarn dev
    ```
    The backend server will typically run on `http://localhost:3001` (or another port as configured in `backend/src/server.ts`).

### Frontend Setup

1.  **Navigate to the frontend directory:**
    ```bash
    cd frontend
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    # or yarn install
    ```

3.  **Run the frontend in development mode:**
    ```bash
    npm run dev
    # or yarn dev
    ```
    The frontend application will typically run on `http://localhost:3000`.

## Features (Placeholder - To be detailed)

-   Cryptocurrency tracking and charts
-   NFT collection browsing
-   User portfolio management for NFTs (Coming soon)
-   Search and filter functionalities

## Technologies Used

### Frontend

-   **Next.js**: React framework for production.
-   **React**: A JavaScript library for building user interfaces.
-   **TypeScript**: Strongly typed JavaScript.
-   **Redux Toolkit**: For efficient state management.
-   **Tailwind CSS**: A utility-first CSS framework for rapid UI development.
-   **Recharts**: Composable charting library built on React components.
-   **Axios**: Promise-based HTTP client for the browser and Node.js.
-   **Font Awesome**: Icon library.
-   **React Icons**: Popular icons in your React projects.
-   **React Markdown & Remark GFM**: For rendering markdown content.

### Backend

-   **Node.js**: JavaScript runtime.
-   **TypeScript**: Strongly typed JavaScript.
-   **Express.js**: Fast, unopinionated, minimalist web framework for Node.js.
-   **Axios**: Promise-based HTTP client.
-   **CORS**: Middleware for enabling Cross-Origin Resource Sharing.
-   **dotenv**: Loads environment variables from a `.env` file.
-   **node-cache**: A simple caching module.
-   **ts-node-dev**: Restarts node application on file change, useful for development.
-   **danfojs-node**: (Potentially for data manipulation/analysis - needs confirmation on actual usage).

## API Endpoints (Placeholder - To be detailed)

-   `/api/coins`: Cryptocurrency data
-   `/api/nfts`: NFT data
-   `/api/nftCollections`: NFT collection data
-   `/api/nftPortfolio`: NFT portfolio data

## Contributing (Placeholder - To be detailed)

Instructions for contributing to the project.

## License (Placeholder - To be detailed)

Information about the project's license.
