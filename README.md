


# Zuno - AI Powered Chatbot Provider

Welcome to **Zuno**, an AI-powered chatbot platform designed to deliver intelligent conversational experiences by combining advanced AI, vector search databases, and cloud infrastructure.

---

## Table of Contents

- [Project Overview](#project-overview)
- [Features](#features)
- [Architecture & Folder Structure](#architecture--folder-structure)
- [Setup & Installation](#setup--installation)
- [Environment Variables](#environment-variables)
- [Running the Project](#running-the-project)
  - [Backend (AWS)](#backend-aws)
  - [Frontend (Client)](#frontend-client)
- [Deployment](#deployment)
- [Contributing](#contributing)
- [License](#license)
- [Contact](#contact)

---

## Project Overview

Zuno is a full-stack AI chatbot platform featuring:

- **Backend API**: Hosted on AWS, containing microservices for AI pipelines, authentication, billing, project management, and web scraping.
- **Frontend client**: Built with TypeScript and React/Next.js, providing a responsive UI for user interactions and management.
- Integration with vector search databases like Pinecone and Weaviate to enhance chatbot intelligence.
- CI/CD automation with GitHub Actions and Vercel for seamless deployment.

---

## Features

- Advanced AI chatbot powered by custom AI pipelines.
- User authentication and secure session handling.
- Subscription and billing management.
- Project creation and chatbot management dashboards.
- Automated scraping for dynamic content updates.
- Environment-specific configuration.
- Automated deployment workflows.

---

## Architecture & Folder Structure

```

zuno/
├── aws/                    # Backend API microservices (Node.js)
│   ├── controllers/        # API controllers
│   ├── routes/             # API routes
│   ├── middleware/         # Express middleware
│   ├── ai/                 # AI pipeline code
│   ├── utils/              # Utilities (logging, error handling)
│   ├── scraping/           # Scraper scripts
│   ├── vectorstore/        # Pinecone & Weaviate integration
│   ├── package.json
│   ├── .env                # Backend environment variables (excluded from git)
│   └── main.js             # Entry point
├── client/                 # Frontend client apps
│   ├── sdk/                # SDK or helper libs for frontend
│   ├── zuno-frontend/      # Main frontend Next.js app
│   ├── .env                # Frontend env vars (excluded from git)
│   ├── package.json
│   └── vite.config.ts
├── docs/                   # Documentation & diagrams
├── scripts/                # Deployment and utility scripts
├── .github/                # GitHub workflows for CI/CD
├── .gitignore              # Git ignore rules
├── package.json            # Root package.json (if needed)
└── README.md               # This file

````

---

## Setup & Installation

### Prerequisites

- Node.js (v16+)
- npm or yarn
- AWS CLI configured for backend deployment
- Vercel account for frontend hosting
- Access to Pinecone/Weaviate (API keys)

### Installation Steps

1. **Clone the repo**

```bash
git clone https://github.com/Coder-Philosopher/zuno.git
cd zuno
````

2. **Install backend dependencies**

```bash
cd aws
npm install
```

3. **Install frontend dependencies**

```bash
cd ../client/sdk
npm install

cd ../zuno-frontend
npm install
```

---

## Environment Variables

Create `.env` files in these locations (add your secrets, never commit):

* `aws/.env`: AWS credentials, DB URLs, API keys, JWT secrets
* `client/sdk/.env`: SDK-specific configs (if any)
* `client/zuno-frontend/.env`: Frontend environment vars like API endpoints, public keys

---

## Running the Project

### Backend (AWS)

Start backend API locally:

```bash
cd aws
npm run dev
```

### Frontend (Client)

Start frontend app locally:

```bash
cd client/zuno-frontend
npm run dev
```

---

## Deployment

* **Backend**: Use the `scripts/deploy-backend.sh` script or CI/CD pipeline to deploy on AWS.
* **Frontend**: Connect GitHub repo to Vercel and configure environment variables in Vercel dashboard. Deployment happens automatically on push.
* GitHub workflows automate testing and deployment under `.github/workflows`.

---

## Contributing

Contributions welcome!

* Fork the repo
* Create feature branch
* Run tests & lint code
* Submit a pull request with detailed description

---

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## Contact

**Abdullah Shaikh**
GitHub: [Coder-Philosopher](https://github.com/Coder-Philosopher)\
X (Twitter): [@abdsbit](https://x.com/abdsbit)\
Email: [abdullahsknitrr@gmail.com](mailto:abdullahsknitrr@gmail.com)\
Project Repository: [https://github.com/Coder-Philosopher/zuno](https://github.com/Coder-Philosopher/zuno)


