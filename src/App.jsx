// FILE: src/App.jsx
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// Components
import Navbar from "./components/Navbar.jsx";
import Footer from "./components/Footer.jsx";

// Pages
import Home from "./pages/Home.jsx";
import Search from "./pages/Search.jsx";
import Favorites from "./pages/Favorites.jsx";
import Profile from "./pages/Profile.jsx";
import MovieDetails from "./pages/MovieDetails.jsx";
import EditMovie from "./pages/EditMovie.jsx";

// Coming Soon placeholder component
import ComingSoon from "./components/ComingSoon.jsx";

export default function App() {
  return (
    <Router>
      {/* Main layout wrapper */}
      <div className="app-layout">
        {/* Navbar always visible at top */}
        <Navbar />

        {/* Main content area where routes render */}
        <main className="main-content">
          <Routes>
            {/* Home page */}
            <Route path="/" element={<Home />} />

            {/* Search page */}
            <Route path="/search" element={<Search />} />

            {/* Favorites page */}
            <Route path="/favorites" element={<Favorites />} />

            {/* User Profile page */}
            <Route path="/profile" element={<Profile />} />

            {/* Movie details page */}
            <Route path="/movie/:id" element={<MovieDetails />} />

            {/* Edit Movie page */}
            <Route path="/edit/:id" element={<EditMovie />} />

            {/* Coming Soon page */}
            <Route
              path="/coming-soon"
              element={
                <ComingSoon message="🍿 More movies and features are on the way! Stay tuned for your next blockbuster experience." />
              }
            />
          </Routes>
        </main>

        {/* Footer always visible at bottom */}
        <Footer />
      </div>
    </Router>
  );
}
