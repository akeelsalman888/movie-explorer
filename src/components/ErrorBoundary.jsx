// FILE: src/components/ErrorBoundary.jsx

import { useState } from "react";

export default function ErrorBoundary({ children }) {
    // Track if any error occurred inside wrapped components
    const [hasError, setHasError] = useState(false);

    // Function that safely executes child components
    // If an error happens, it will update "hasError" instead of crashing the app
    const handleError = (fn) => {
        try {
            return fn(); // Try running the children normally
        } catch (error) {
            console.error(error); // Log error for debugging
            setHasError(true);    // Set error state so fallback UI appears
            return null;          // Return nothing to prevent app crash
        }
    };

    // If an error occurred, show fallback UI message
    if (hasError) {
        return (
            <div
                style={{
                    padding: "20px",
                    backgroundColor: "rgba(255, 0, 0, 0.1)",
                    color: "red",
                    borderRadius: "8px",
                    textAlign: "center",
                }}
            >
                <h2>Something went wrong.</h2>
            </div>
        );
    }

    // Render children while being wrapped inside error-catching function
    return handleError(() => children);
}
