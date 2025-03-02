# SevenHub Video Platform

A modern, responsive video streaming platform built with React and TailwindCSS that integrates with the Doodstream API.

## Features

- Responsive design for mobile and desktop
- Dark and light theme support
- Video categorization
- Video search functionality
- Video player integration with Doodstream

## Tech Stack

- React
- TypeScript
- TailwindCSS
- React Router
- Lucide React for icons

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn

### Installation

1. Clone the repository
2. Install dependencies:

```bash
npm install
```

3. Start the development server:

```bash
npm run dev
```

## Project Structure

- `/src/components` - Reusable UI components
- `/src/context` - React context providers
- `/src/pages` - Page components
- `/src/services` - API services
- `/src/types` - TypeScript type definitions

## API Integration

The application uses the Doodstream API for fetching video data. The API key is configured in the `api.ts` file.

## Deployment

To build the application for production:

```bash
npm run build
```

The build artifacts will be stored in the `dist/` directory.

## License

This project is licensed under the MIT License.