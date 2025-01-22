# Movie Festival System

A movie festival system built with Vue 3 in Vite using the Composition API, Pinia for state management, and Tailwind CSS for styling. The system enables admins to upload, edit, and view movie data, while authenticated users can vote for movies and track viewership.

## Recommended IDE Setup

[VSCode](https://code.visualstudio.com/) + [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) (and disable Vetur).

## Customize configuration

See [Vite Configuration Reference](https://vite.dev/config/).

## Features

### Admin

- Add and upload movies (title, description, duration, artists, genres, and video URL).
- Edit movie details.
- View analytics, including most viewed movies and genres.

### User

- Browse and search movies.
- Watch movies (video views are counted if watched for more than one minute) <!-- temporary disable because issue on video link -->.
- Vote (upvote or downvote) for movies.
- View list of voted movies.

## Technologies Used

- **Vue 3 Composition API**: For building reusable and maintainable components.
- **Pinia**: For state management.
- **Tailwind CSS**: For styling and responsive design.
- **Axios**: For API requests to interact with a mock backend.
- **json-server**: To mock the backend API.
- **Concurrent Libraries**: To run both the Vue app and `json-server` simultaneously

## Project Setup

```sh
npm install
```

### Compile and Hot-Reload for Development

```sh
npm run dev
```

### Compile and Minify for Production

```sh
npm run build
```

## Notes on Concurrent Libraries

### Why Concurrently?

In development, it is essential to run the frontend and backend simultaneously. Using `concurrently` simplifies this process by running multiple processes (e.g., `npm run dev` for the Vue app and `json-server` for the mock API) in parallel.
