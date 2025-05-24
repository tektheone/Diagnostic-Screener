# Blueprint Diagnostic Screener

A modern, accessible mental health assessment tool built with Next.js, React, and Tailwind CSS. This application provides a streamlined interface for users to complete diagnostic screenings with persistent theme settings and responsive design.

![Blueprint Diagnostic Screener](https://via.placeholder.com/800x400?text=Blueprint+Diagnostic+Screener)

## Project Overview

The Blueprint Diagnostic Screener is a web application designed to help mental health professionals administer standardized assessments to patients. The application guides users through a series of questions, collects their responses, and provides recommendations for further assessments based on their results.

## Architecture

This project follows a modern frontend architecture with a clear separation of concerns:

```
blueprint/
├── frontend/           # Next.js frontend application
│   ├── src/
│   │   ├── app/        # Next.js App Router pages
│   │   ├── components/ # React components (organized by atomic design)
│   │   ├── constants/  # Shared constants and configuration
│   │   ├── contexts/   # React context providers
│   │   ├── layouts/    # Layout components
│   │   └── services/   # API service modules
│   ├── public/         # Static assets
│   └── ...
└── backend/            # API backend (separate service)
```

## Atomic Design Implementation

The project strictly adheres to atomic design principles, organizing components into a clear hierarchy that promotes reusability, maintainability, and scalability.

### Atoms

Atoms are the basic building blocks of the application - the smallest, indivisible UI components:

- **Button**: Versatile button component with multiple variants and states
  - Uses extracted constants for styling (`/constants/button.ts`)
  - Supports primary and secondary variants with proper dark mode styling
  - Includes accessibility attributes and keyboard navigation

- **Radio**: Custom radio input component for question answers
  - Implements proper focus states and keyboard accessibility
  - Includes dark mode styling for better visibility

- **Icons**: SVG icon components with consistent styling
  - Organized in `/components/atoms/icons/`
  - Includes system icons (Sun, Moon), navigation icons (Chevrons), and functional icons (Clipboard, Refresh)
  - Uses a base `Icon` component that handles common properties

### Molecules

Molecules combine atoms to create more complex, functional UI components:

- **ThemeToggle**: Dropdown component for theme selection
  - Combines Button and Icon atoms
  - Implements keyboard navigation and accessibility
  - Uses theme constants from `/constants/theme.ts`

- **QuestionForm**: Displays questions and collects user responses
  - Combines Radio components for answer options
  - Implements proper form validation
  - Uses memoization for performance optimization

- **QuestionNavigation**: Controls for navigating between questions
  - Combines Button atoms with Chevron icons
  - Handles disabled states for first/last questions
  - Ensures proper visibility in both light and dark modes

- **AssessmentResults**: Displays assessment results and recommendations
  - Uses Button atoms for action controls
  - Implements animations for a dynamic user experience
  - Properly styled for both light and dark modes

### Organisms

Organisms are complex UI components composed of molecules and atoms that form a distinct section of the interface:

- **Screener**: The main assessment component that orchestrates the entire screening process
  - Manages question state and navigation
  - Handles data fetching with React Query
  - Implements the complete assessment flow from instructions to results

### Templates and Pages

- **MainLayout**: The application's main layout template
  - Implements fixed header and footer with scrollable content area
  - Handles theme application to the DOM
  - Provides consistent structure across all pages

- **Home Page**: The entry point of the application
  - Renders the Screener organism within the MainLayout
  - Handles initial data loading

## Theme System

The application implements a robust theme system with persistence:

- **ThemeContext**: Manages theme state and provides it to components
  - Stores theme preference in localStorage
  - Detects and responds to system theme changes
  - Applies theme changes to the DOM without hydration mismatches

- **Theme Options**: Extracted to `/constants/theme.ts`
  - Defines available themes (light, dark, system)
  - Associates icons with each theme option

## State Management

- **React Context API**: Used for global state like theme preferences
- **React Query**: Handles data fetching, caching, and state management for API data
- **Local Component State**: Manages UI state within components

## Styling Approach

- **Tailwind CSS**: Used for all styling with utility classes
  - Consistent dark mode implementation with `dark:` prefix classes
  - Responsive design using Tailwind's breakpoint system
  - Custom animations and transitions

- **Extracted Constants**: Common styles extracted to constant files
  - Button styles in `/constants/button.ts`
  - Theme options in `/constants/theme.ts`

## Accessibility Features

- **ARIA Attributes**: Properly implemented throughout the application
- **Keyboard Navigation**: Full keyboard support for all interactive elements
- **Color Contrast**: Meets WCAG standards in both light and dark modes
- **Focus Management**: Proper focus indicators and tab order

## Recent Improvements

- **Theme Persistence**: Enhanced to properly persist across page refreshes
- **Dark Mode Enhancements**: Improved visibility of UI elements in dark mode
- **Layout Optimization**: Fixed header and footer with scrollable content
- **Component Refactoring**: Applied atomic design principles more consistently
- **Constant Extraction**: Improved maintainability by centralizing constants

## Getting Started

### Prerequisites

- Node.js 18.x or higher
- npm or yarn

### Installation

```bash
# Clone the repository
git clone https://github.com/your-username/blueprint-diagnostic-screener.git
cd blueprint-diagnostic-screener

# Install frontend dependencies
cd frontend
npm install
# or
yarn install
```

### Running the Application

```bash
# Start the frontend development server
cd frontend
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the application.

## Development Guidelines

### Adding New Components

1. Identify the appropriate atomic level (atom, molecule, organism)
2. Create the component in the corresponding directory
3. Extract any constants to the constants directory
4. Ensure proper typing with TypeScript
5. Add dark mode variants for all styles

### Theme Considerations

When adding new UI elements:

- Always include dark mode variants using Tailwind's `dark:` prefix
- Test in both light and dark modes
- Ensure color contrast meets WCAG standards

## License

Copyright © 2025 Blueprint Health, Inc. All rights reserved.
