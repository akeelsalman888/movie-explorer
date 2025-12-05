🎬 Movie Explorer

A modern, responsive movie web application built with React, Vite, Bootstrap, and JSON-server. This project allows users to explore movies, view details, manage favorites, and simulate a user profile. It demonstrates a full React front-end with routing, reusable components, and mock backend API integration.

**Overview**
Movie Explorer is a front-end React project that lets users:

-Browse and view a list of movies.

-Search movies by title.

-View detailed information about each movie.

-Manage a list of favorite movies with optional notes.

-See a simulated user profile including favorites, favorite actors, and activity stats.

-Explore a "Coming Soon" page for upcoming features.

The app uses JSON-server to mock backend APIs for movies and favorites, enabling CRUD operations.

**Features**

-Home page displaying all movies.

-Movie details page with poster, description, genre, rating, and favorite button.

-Search page to find movies by title.

-Favorites page to manage favorite movies, with the ability to add notes.

-Profile page showing user info, favorites, favorite actors, and activity stats.

-Edit movie page to update movie information (via JSON-server PUT request).

-Coming Soon page for future features.

-Dark overlay backgrounds with clear text readability.

**Tech Stack**

-React 19 + Vite – Front-end framework & fast build tool

-React Router DOM – Routing between pages

-React Bootstrap – UI components & layout

-JSON-server – Mock backend API for movies and favorites

-JavaScript ES6 – Modern JavaScript features

-CSS / Bootstrap Utilities – Styling & responsive design


**Getting Started**

1. Clone the repository
git clone https://github.com/akeelsalman888/
cd movie-explorer

2. Install dependencies
npm install

3.Start JSON-server
npm run server

The JSON-server runs on http://localhost:3000
 and provides mock APIs for movies and favorites.

4️. Start the Vite React app
npm run dev

The React app runs on http://localhost:5173
 (default Vite port). Open it in your browser.


 **PROJECT STRUCTURE**

 src/
├─ components/
│  ├─ Navbar.jsx
│  ├─ Footer.jsx
│  ├─ MovieCard.jsx
│  ├─ MovieList.jsx
│  ├─ FavoriteButton.jsx
│  ├─ Loader.jsx
│  ├─ SearchBar.jsx
│  ├─ EditModal.jsx
│  └─ ComingSoon.jsx
│
├─ pages/
│  ├─ Home.jsx
│  ├─ Search.jsx
│  ├─ Favorites.jsx
│  ├─ Profile.jsx
│  ├─ MovieDetails.jsx
│  └─ EditMovie.jsx
│
├─ App.jsx
├─ main.jsx
├─ index.css
└─ App.css

**Usage**

-Browse Movies – See the list of all movies on the homepage.

-Search Movies – Use the search page to filter movies by title.

-View Details – Click on a movie to see more information.

-Manage Favorites – Add movies to favorites, remove them, or edit notes.

-Edit Movie – Update movie title, year, or poster (mocked using JSON-server).

-Profile Page – Explore your simulated profile, favorite actors, and activity stats.

-Coming Soon – Placeholder page for future features.
