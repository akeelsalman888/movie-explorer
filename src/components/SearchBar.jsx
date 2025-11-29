export default function SearchBar({ query, setQuery, onSearch }) {
    // Trigger search on Enter key
    const handleKeyDown = (e) => {
        if (e.key === "Enter") {
            onSearch();
        }
    };

    return (
        <div className="mb-3 d-flex">
            <input
                type="text"
                className="form-control"
                placeholder="Search for a movie..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={handleKeyDown}
            />
            <button className="btn btn-primary ms-2" onClick={onSearch}>
                Search
            </button>
        </div>
    );
}
