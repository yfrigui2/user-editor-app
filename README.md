# Project Overview

The application demonstrates managing a list of users fetched from an API, with functionality to edit user details (e.g., name, email, phone). It's built with React and Typescript. The routing is managed using React Router, and data fetching/mutations are handled via React Query.

## Getting Started

### Prerequisites

- Node.js installed on your local machine
- NPM installed on your local machine

### Running the Application

To run the application locally:

1. Clone the repository to your local machine.
2. Navigate to the project directory in your terminal.
3. Install the required dependencies:
   ```bash
   npm install
   ```
4. Start the development server:
   ```bash
   npm run dev
   ```
5. Open `http://localhost:5173` in your browser to view the application.

### Running End-to-End Tests

Execute the following command to run the end-to-end tests with Playwright:

```bash
npx playwright test --ui
```

This command will open a test runner interface where you can watch the tests as they execute.

## Project Structure and Architecture

The application's codebase is organized into specific directories within the `/src` folder:

```
/src
│
├── main.tsx        # Entry point of the application
├── App.tsx         # Root component of the application
├── components/     # React components
│   └── ...         # Component files
│
├── types/
│   └── ...         # Type definitions
│
├── hooks/          # Custom React hooks
│   └── ...         # Hook files
│
└── styles/         # CSS files for styling
    └── ...         # Style files
```

## Future Improvements

### CSS-in-JS Library

Integrating a CSS-in-JS library like Emotion, Styled Components, or Tailwind CSS can facilitate more dynamic styling and scoped CSS for components. This will be increasingly important as the application grows, in order to keep styles organized and maintainable.

### Extract Reusable Components

Identify common patterns and extract them into reusable components to reduce duplication and improve maintainability. This would include commonly used components like buttons, form inputs, etc. These components should have interfaces that are easy to use by developers (eg. loading and error states, different variants, etc).

### Improve Input Validation

Currently, input validation is basic, especially for phone numbers, which may include extensions (e.g., x56442). A more robust validation process is needed to handle complex formats and extensions. A path forward here might be updating the server to store extensions separately from the phone number, if we have access to the server code. Otherwise, we could implement a more complex validation process on the client side, perhaps splitting up the phone number and extension and validating each separately.

### Organize React Query Keys

Extract query keys used by React Query into a central location (e.g., src/hooks/queryKeys.ts). This would simplify managing invalidations and ensure consistency across the app as the data layer grows.

### Testing

Add more extensive testing, including unit tests for business logic and e2e tests for core user flows. This will help catch bugs early and ensure the application functions as expected.

### Design System

Pick a consistent design system and color palette, and encode it in a way that's easy for developers to use. Perhaps with Tailwind tokens, or colors stored in a central location. This will help ensure a consistent look and feel across the application.
