# From The Hart Tech Apex Redirect Worker

A Cloudflare Worker that permanently redirects traffic from the apex domain (fromthehart.tech) to the www subdomain (www.fromthehart.tech) with a 301 status code.

![Status](https://img.shields.io/badge/Status-Live-success)
![Platform](https://img.shields.io/badge/Platform-Cloudflare_Workers-orange)

## 🔍 Overview

This worker ensures visitors always reach the www subdomain by implementing a lightweight redirection service that:

- Performs permanent 301 redirects from apex domain to www subdomain
- Preserves URL path and query parameters in the redirect
- Responds with minimal latency through global edge deployment
- Integrates with the broader From The Hart multi-cloud architecture

## 🛠️ Tech Stack

- **Runtime**: Cloudflare Workers
- **Language**: TypeScript
- **Build Tools**: Wrangler CLI
- **Testing**: Vitest
- **Infrastructure**: Managed with Terraform (in the `from-the-hart-infrastructure` repository)

## 📋 Prerequisites

- Node.js (v16 or higher)
- npm or yarn
- Cloudflare account with Workers enabled
- Wrangler CLI installed (`npm install -g wrangler`)

## 🚀 Getting Started

### Installation

Clone the repository and install dependencies:

```bash
git clone https://github.com/Saosin88/from-the-hart-tech-apex-redirect-worker.git
cd from-the-hart-tech-apex-redirect-worker
npm install
```

### Local Development

To start the development server:

```bash
npm run dev
```

This will start a local development server using Wrangler for testing the worker.

## 🧪 Testing

Run tests with:

```bash
npm test
```

The project uses Vitest for testing with the Cloudflare Workers-specific test pool.

## 📦 Deployment

To deploy the worker to Cloudflare:

```bash
npm run deploy
```

This will build and deploy the worker using Wrangler CLI to the Cloudflare edge network.

## 🌐 Infrastructure

This worker is deployed on Cloudflare's global edge network and is configured through the `from-the-hart-infrastructure` repository using Terraform.

### Cloud Provider Details

- **Primary Platform**: Cloudflare Workers
- **Deployment Model**: Global edge deployment
- **Infrastructure as Code**: Terraform (remote state in AWS S3)

## ⚙️ Configuration

The worker is configured in `wrangler.toml`:

```toml
name = "from-the-hart-tech-apex-redirect-worker"
main = "src/index.ts"
compatibility_date = "2025-04-14"
workers_dev = false

[[routes]]
pattern = "fromthehart.tech"
custom_domain = true
```

## 📁 Project Structure

The worker is intentionally simple with a focused implementation:

```typescript
export default {
	async fetch(request): Promise<Response> {
		const base = 'https://www.fromthehart.tech';
		const statusCode = 301;

		const url = new URL(request.url);
		const { pathname, search } = url;

		const destinationURL = `${base}${pathname}${search}`;

		return Response.redirect(destinationURL, statusCode);
	},
};
```

## 📚 Scripts

- `npm run build` - Build the TypeScript project
- `npm run deploy` - Deploy the worker to Cloudflare
- `npm run dev` - Start a local development server
- `npm test` - Run the test suite
- `npm run cf-typegen` - Generate TypeScript types for Cloudflare Workers
