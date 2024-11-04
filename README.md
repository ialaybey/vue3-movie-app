# vue-movie-app

This template should help get you started developing with Vue 3 in Vite.

# Project Architecture

## Overview

This Vue 3 application uses Vite for development, Pinia for state management, and Vue Router for navigation. It’s structured for maintainability and scalability.

## Technologies Used

- **Vue 3**
- **Vite**
- **Pinia** (State Management)
- **Vue Router** (Routing)
- **TypeScript**
- **Axios** (HttpClient) 

## Type Support for `.vue` Imports in TS

TypeScript cannot handle type information for `.vue` imports by default, so we replace the `tsc` CLI with `vue-tsc` for type checking. In editors, we need [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) to make the TypeScript language service aware of `.vue` types.

## Customize configuration

See [Vite Configuration Reference](https://vitejs.dev/config/).

## Project Setup

```sh
npm install
```

### Compile and Hot-Reload for Development

```sh
npm run dev
```

### Type-Check, Compile and Minify for Production

```sh
npm run build
```

### Run Unit Tests with [Vitest](https://vitest.dev/)

```sh
npm run test:unit
```

### Lint with [ESLint](https://eslint.org/)

```sh
npm run lint
```
