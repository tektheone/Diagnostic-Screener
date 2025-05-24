# Diagnostic Screener Application

This is a [Next.js](https://nextjs.org/) project for a diagnostic screener application, built with modern React practices and a focus on scalability and maintainability.

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Project Structure

### Atomic Design

This project follows the Atomic Design methodology for organizing components:

#### Atoms

Basic building blocks of the UI that cannot be broken down further:

- `/components/atoms` - Basic UI elements like buttons, inputs, and icons
  - `Button.tsx` - Reusable button component with variants
  - `Radio.tsx` - Radio input component
  - `/icons` - SVG icon components

#### Molecules

Groups of atoms bonded together to form a functional unit:

- `/components/molecules` - Components composed of multiple atoms
  - `ThemeToggle.tsx` - Theme switcher component
  - `QuestionForm.tsx` - Form for displaying and answering questions
  - `QuestionNavigation.tsx` - Navigation controls for questions
  - `AssessmentResults.tsx` - Displays assessment results

#### Organisms

Groups of molecules that form a relatively complex section of the UI:

- `/components/organisms` - More complex components
  - `Screener.tsx` - Main screener component that orchestrates the assessment

### Constants

Shared constants are extracted into dedicated files for better maintainability:

- `/constants/theme.ts` - Theme-related constants (theme options, icons)
- `/constants/button.ts` - Button style constants (variants, base styles)

### Layouts

Reusable layout components that wrap pages:

- `/layouts/MainLayout.tsx` - Main application layout

### Providers

Context providers for global state management:

- `/providers/ThemeProvider.tsx` - Manages theme state
- `/providers/QueryProvider.tsx` - Sets up React Query
- `/providers/AppProviders.tsx` - Composes all providers

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.
