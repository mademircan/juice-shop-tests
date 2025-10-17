# 🧪 Senior Test Engineer Take-Home — OWASP Juice Shop

This project demonstrates automated **UI and API testing** of the [OWASP Juice Shop](https://github.com/juice-shop/juice-shop) application using **Playwright (TypeScript)**.  
It also includes a **CI/CD pipeline** that spins up the application in Docker, runs the tests headless, and publishes reports.

## 📦 Tech Stack

- **Test Framework:** Playwright (TypeScript)
- **CI/CD:** GitHub Actions
- **Reports:** Playwright HTML & JUnit XML
- **Application Under Test:** OWASP Juice Shop (Docker image: `bkimminich/juice-shop`)


## Prerequisites
- Docker (for local run) or run the Juice Shop image manually
- Node.js 18+
- npm

## Run the official Docker image
1. Start Juice Shop:
- Docker: `docker run --rm -p 3000:3000 bkimminich/juice-shop:latest`
   
2. Install deps and run tests:
```bash
- npm ci
- npx playwright install

## Run Tests Locally

1. Run all tests (UI + API):
- npm test

2. Run only UI tests:
- npm run test:ui

3. Run only API tests:
- npm run test:api


## Assumptions Made

- The Juice Shop app runs locally on http://localhost:3000.
- Using the official Docker image bkimminich/juice-shop:latest.
- API endpoints such as /api/Products, /api/BasketItems, /api/Users, and /rest/user/login are stable (based on community examples and source code).
- UI structure and element labels match the current Juice Shop release; tests use resilient selectors (getByRole, getByText) to minimize breakage. However, UI elements are prone to change.
- No data cleanup is required between runs, as test users are created dynamically.


## What I Would Do Next with More Time

If I had additional time, I would:

- Enhance robustness:
   - Implement a custom data layer to handle user creation and cleanup.
   - Add environment configuration (e.g., dev/stage/prod base URLs).

- Expand coverage:
   - Add tests for user profile management, order history and payment methods.
   - Add more API negative scenarios (malformed payloads, unauthorized access).

- Improve maintainability:
   - Introduce Page Object Model for UI tests.
   - Add tagging (@smoke, @regression) to control test scope.

