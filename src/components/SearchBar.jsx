// FILE: src/components/SearchBar.jsx

export default function SearchBar({ query, setQuery, onSearch }) {
    // Trigger search when user presses Enter key
    const handleKeyDown = (e) => {
        if (e.key === "Enter") {
            onSearch();
        }
    };

    return (
        // Container for search input and button
        <div className="mb-3 d-flex">
            {/* Search input field */}
            <input
                type="text"
                className="form-control"
                placeholder="Search for a movie..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={handleKeyDown}
            />

            {/* Search button triggers onSearch callback */}
            <button className="btn btn-primary ms-2" onClick={onSearch}>
                Search
            </button>
        </div>
    );
}
