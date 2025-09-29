# Recipe Finder App

A modern recipe finder application built with Nuxt 4, showcasing various Nuxt concepts and features. This app uses the free MealDB API to provide a comprehensive recipe browsing experience.

## Features

### Nuxt Concepts Demonstrated

- **Pages & Routing**: File-based routing with dynamic routes (`[id].vue`, `[category].vue`)
- **Layouts**: Custom layout with navigation and footer
- **Components**: Reusable Vue components (RecipeCard, SearchBox, CategoryGrid, etc.)
- **Composables**: Custom composables for meal data formatting and favorites management
- **Server API Routes**: Backend API endpoints that proxy TheMealDB API
- **State Management**: Pinia store for global recipe state management
- **SEO & Meta**: Dynamic meta tags and SEO optimization
- **Error Handling**: Custom error page and error states
- **Plugins**: Client-side initialization plugin
- **Auto-imports**: Leveraging Nuxt's auto-import features
- **TypeScript**: Full TypeScript support with custom types
- **CSS Framework**: Tailwind CSS integration
- **Runtime Config**: Environment configuration management

### Application Features

- 🔍 **Recipe Search**: Search for recipes by name
- 📂 **Category Browsing**: Browse recipes by food categories
- ❤️ **Favorites**: Save and manage favorite recipes (localStorage)
- 📱 **Responsive Design**: Mobile-first responsive layout
- 🎥 **Video Tutorials**: Embedded YouTube cooking videos
- 🏷️ **Recipe Details**: Complete recipe information with ingredients and instructions
- 🎲 **Random Recipes**: Discover new recipes with random suggestions
- ⚡ **Fast Loading**: Optimized images and lazy loading

## Technology Stack

- **Framework**: Nuxt 4
- **Styling**: Tailwind CSS
- **State Management**: Pinia
- **API**: TheMealDB (free recipe API)
- **Language**: TypeScript
- **Package Manager**: npm

## Setup

Install dependencies:

```bash
npm install
```

## Development Server

Start the development server on `http://localhost:3000`:

```bash
npm run dev
```

## Production

Build the application for production:

```bash
npm run build
```

Preview production build locally:

```bash
npm run preview
```

## Project Structure

```
nuxt4-demo/
├── assets/css/          # Tailwind CSS styles
├── components/          # Vue components
├── composables/         # Custom composables
├── layouts/            # Layout components
├── pages/              # File-based routing pages
├── plugins/            # Nuxt plugins
├── server/api/         # Backend API routes
├── stores/             # Pinia stores
├── types/              # TypeScript type definitions
├── nuxt.config.ts      # Nuxt configuration
└── tailwind.config.js  # Tailwind configuration
```

## API Endpoints

The app includes several API routes that proxy TheMealDB:

- `GET /api/categories` - Fetch all recipe categories
- `GET /api/search?q=query` - Search recipes by name
- `GET /api/random` - Get a random recipe
- `GET /api/category/[category]` - Get recipes by category
- `GET /api/meal/[id]` - Get recipe details by ID

## Features Showcase

### 1. Dynamic Routing & Pages
- Home page with search and featured recipes
- Dynamic category pages (`/category/[category]`)
- Individual recipe pages (`/recipe/[id]`)
- Favorites collection page

### 2. State Management
- Centralized recipe state with Pinia
- Reactive data with computed properties
- Local state management for favorites

### 3. API Integration
- Server-side API routes as middleware
- Client-side data fetching with error handling
- Response caching and optimization

### 4. SEO Optimization
- Dynamic meta tags per page
- Open Graph and Twitter Card support
- Structured data for recipes

### 5. User Experience
- Loading states and skeletons
- Error boundaries and fallbacks
- Responsive design patterns
- Accessibility considerations

## Contributing

This is a demo application showcasing Nuxt 4 features. Feel free to explore the code and adapt it for your own projects!

## License

MIT License - feel free to use this project for learning and development purposes.
