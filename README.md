# Crypto Data Fetcher

## Description

Crypto Data Fetcher is a service that fetches cryptocurrency data (Bitcoin, Matic Network, and Ethereum) every 2 hours from the CoinGecko API and stores it in the database. Additionally, the service provides an API to get the latest cryptocurrency stats and calculate the price deviation for a specific cryptocurrency.

## Features

- **Scheduled Data Fetching**: Fetches cryptocurrency data every 2 hours using a cron job.
- **/stats API**: Returns the latest stats (price, market cap, 24h change) of a requested cryptocurrency.
- **/deviation API**: Returns the standard deviation of the price of a requested cryptocurrency based on the last 100 records stored in the database.

## Installation

### Prerequisites

- Node.js
- MongoDB
- NPM (or Yarn)

### Steps

1. Clone the repository:

   ```bash
   git clone <your-repository-url>
