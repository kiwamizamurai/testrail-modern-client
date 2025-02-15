# TestRail Modern API Client

[![npm version](https://img.shields.io/npm/v/testrail-modern-client)](https://www.npmjs.com/package/testrail-modern-client)
[![npm downloads](https://img.shields.io/npm/dm/testrail-modern-client.svg)](https://www.npmjs.com/package/testrail-modern-client)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

A modern, type-safe TestRail API client written in TypeScript.

> [!NOTE]
> Some TestRail API endpoints may differ from the official documentation. Our implementation is based on actual responses obtained through reverse engineering.

## Installation

```bash
npm install testrail-modern-client
```

## Quick Start

```typescript
import { TestRailClient } from 'testrail-modern-client';

const client = new TestRailClient({
  host: 'https://your-instance.testrail.io',
  email: 'your-email',
  password: 'your-password', // or API key
});

// Get a test case
const testCase = await client.cases.get(1);

// Create a test run
const run = await client.runs.add(1, {
  name: 'Test Run',
  include_all: true,
});
```

## Authentication

TestRail API uses HTTP basic authentication. There are two ways to authenticate:

### 1. Email and API Key (Recommended)

Generate an API key in TestRail under "My Settings". Then use your email address and the API key as password:

```typescript
import { TestRailClient } from 'testrail-modern-client';

const client = new TestRailClient({
  host: 'https://your-instance.testrail.io',
  email: 'user@example.com',
  password: 'your-api-key'  // API key from My Settings
});
```

### 2. Email and Password

Use your TestRail email and password. Note: This might be your Active Directory or LDAP password depending on your TestRail configuration.

```typescript
import { TestRailClient } from 'testrail-modern-client';

const client = new TestRailClient({
  host: 'https://your-instance.testrail.io',
  email: 'user@example.com',
  password: 'your-password'
});
```

**Important**: Always use HTTPS for your TestRail instance to ensure secure authentication. TestRail Hosted accounts use HTTPS by default.

## API Reference

1. [Introduction to the TestRail API](https://support.testrail.com/hc/en-us/articles/7077083596436-Introduction-to-the-TestRail-API)
