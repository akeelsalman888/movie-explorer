// FILE: src/components/ComingSoon.jsx
import { Card } from "react-bootstrap";

export default function ComingSoon({ message }) {
  return (
    // Main wrapper with same homepage class and background as other pages
    <div
      className="homepage"
      style={{
        backgroundImage: `url("https://wallpaperaccess.com/full/329583.jpg")`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundAttachment: "fixed",
        minHeight: "100vh", // full viewport height
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        padding: "2rem",
      }}
    >
      {/* Dark overlay like other pages */}
      <div
        className="overlay"
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          backgroundColor: "rgba(0, 0, 0, 0.6)",
          zIndex: 1,
        }}
      ></div>

      {/* Card container for message */}
      <Card
        className="text-center shadow-lg"
        style={{
          position: "relative",
          zIndex: 2,
          padding: "2rem",
          maxWidth: "500px",
          backgroundColor: "rgba(0, 0, 0, 0.7)",
          color: "#ffc107",
          borderRadius: "15px",
        }}
      >
        {/* Heading */}
        <h1 style={{ fontSize: "2.5rem", marginBottom: "1rem" }}>
          🍿 Coming Soon!
        </h1>

        {/* Message text */}
        <p style={{ fontSize: "1.2rem", color: "#fff", lineHeight: "1.6" }}>
          {message ||
            "More movies and features are on the way! Stay tuned for your next blockbuster experience."}
        </p>
      </Card>
    </div>
  );
}
