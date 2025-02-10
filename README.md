# Schema Management System

A TypeScript-based schema management system with Firebase integration.

## Features

- Create, Read, Update, Delete (CRUD) operations for schemas
- Firebase Firestore integration
- Activity-based architecture
- Two testing interfaces:
  - Activity Tester for testing individual activities
  - Schema Service Test for end-to-end testing

## Project Structure

```
src/
├── lib/
│   └── acbda/
│       ├── activity/      # Activity implementations
│       ├── controller/    # Business logic controllers
│       ├── model/         # Data models and interfaces
│       └── utils/         # Utility functions
├── server/
│   ├── routes/           # API routes
│   └── index.ts          # Server entry point
└── public/
    ├── ActivityTester.html    # Activity testing interface
    ├── SchemaServiceTest.html # Schema service testing interface
    └── test.html             # Legacy test interface
```

## Setup

1. Install dependencies:
```bash
npm install
```

2. Configure Firebase:
   - Create a Firebase project
   - Add your Firebase configuration to `src/lib/acbda/accessor/firebase.accessor.ts`

3. Start the development server:
```bash
npm run dev
```

4. Access the testing interfaces:
   - Activity Tester: http://localhost:3000/ActivityTester.html
   - Schema Service Test: http://localhost:3000/SchemaServiceTest.html

## API Routes

### Schemas
- `GET /api/schemas` - Get all schemas
- `GET /api/schemas/:id` - Get schema by ID
- `POST /api/schemas` - Create new schema
- `PUT /api/schemas/:id` - Update schema
- `DELETE /api/schemas/:id` - Delete schema

## Technologies Used

- TypeScript
- Express.js
- Firebase/Firestore
- Activity Pattern Architecture
