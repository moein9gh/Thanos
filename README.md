# Thanos

Thanos is a highly scalable and robust base project, designed and developed using Node.js, Express, Hexagonal Architecture, and SOLID principles. It comes with pre-configured support for WebSocket, gRPC, and GraphQL to provide seamless communication and data management in modern applications.

![Hexagonal Architecture](https://github.com/moein9gh/Thanos/blob/main/hexagonal-arch.png?raw=true)

## Table of Contents

- [Getting Started](#getting-started)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Running the Application](#running-the-application)
- [Project Structure](#project-structure)
- [Tests](#tests)
- [Contributing](#contributing)

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. See [Installation](#installation) for notes on how to deploy the project on a live system.

## Prerequisites

Before you can run the project, you need to have the following software installed on your system:

- Docker

You can download and install Docker from the [official Docker website](https://docker.com/).

## Installation

Clone the project repository:

```bash
git clone https://github.com/moein9gh/thanos.git
```

Navigate to the project directory:

```bash
cd thanos
```

## Running the Application
go to scripts folder
```bash
cd ./src/docker/scripts
```
Then run run.sh file to run in development mode

```bash
./run.sh
```
run log.sh file to see logs

```bash
./log.sh
```
run down.sh file to makes containers down 

```bash
./down.sh
```
* Please make sure that .sh files in scripts folder have right permissions for execution.

## Project Structure

Below is an overview of the project structure:

```
Thanos/
│
├── .husky/                       # Husky Git hooks configuration folder
│
├── src/                          # Source code folder
│   ├── DI/                       # Dependency Injection folder
│   ├── bin/                      # Binary folder, possibly containing scripts or executables
│   ├── config/                   # Configuration files folder
│   ├── doc/                      # Documentation folder
│   ├── docker/                   # Docker-related files folder
│   ├── dto/                      # Data Transfer Objects folder
│   ├── entity/                   # Entity folder, for defining domain entities
│   ├── env/                      # Environment configuration folder
│   ├── gateway/                  # Gateway folder, for external communication and services
│   ├── interactor/               # Interactor folder, for use cases and application logic
│   ├── locales/                  # Localization folder, containing translations or localization configs
│   ├── log/                      # Logging folder, for log files and logging configuration
│   ├── migrations/               # Database migrations folder
│   ├── model/                    # Model folder, for domain models
│   ├── ports/                    # Ports folder, for defining interfaces and adapters
│   ├── protos/                   # Protocol Buffers folder, for defining gRPC services
│   ├── repository/               # Repository folder, for data access and persistence
│   ├── schema/                   # Schema folder, for defining data schemas or validation
│   ├── static/                   # Static assets folder
│   ├── store/                    # Store folder, for managing application database's
│   ├── test/                     # Test folder
│   ├── types/                    # TypeScript types folder
│   └── utils/                    # Utility functions folder
│
├── .eslintignore                 # ESLint ignore configuration file
├── .eslintrc                     # ESLint configuration file
├── .gitignore                    # Git ignore configuration file
├── .prettierrc                   # Prettier configuration file
│
├── CleanArchitecture.jpg         # Clean Architecture illustration file
├── commitlint.config.js          # Commitlint configuration file
├── docker-compose.yml            # Docker Compose configuration file
├── jest.config.ts                # Jest configuration file
├── package-lock.json             # Dependency lock file for npm
├── package.json                  # Package.json file for npm project
├── tsconfig-build.json           # TypeScript build configuration file
└── tsconfig.json                 # TypeScript configuration file

```

## Tests

To run the test suite, execute the following command:

```bash
npm run test
```

## Contributing

Contributions are always welcome! Feel free to submit a pull request, create an issue, or get in touch with the project maintainer moein9gh to discuss new ideas or improvements.
