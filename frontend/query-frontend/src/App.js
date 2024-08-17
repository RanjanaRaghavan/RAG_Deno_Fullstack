import React, { useState } from "react";

function App() {
  const [query, setQuery] = useState("");
  const [response, setResponse] = useState("");

  const handleQueryChange = (e) => {
    setQuery(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch("http://localhost:8002", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ query }),
      });

      const data = await res.json();
      setResponse(data.response);
    } catch (error) {
      setResponse("Error: Could not fetch response from the server.");
    }
  };

  return (
    <div style={{ padding: "20px", fontFamily: "Arial, sans-serif" }}>
      <h1>Query Engine</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Enter your query:</label>
          <input
            type="text"
            value={query}
            onChange={handleQueryChange}
            style={{ marginLeft: "10px", padding: "5px", width: "300px" }}
          />
        </div>
        <button type="submit" style={{ marginTop: "10px", padding: "5px 10px" }}>
          Submit
        </button>
      </form>
      {response && (
        <div style={{ marginTop: "20px", padding: "10px", border: "1px solid #ddd" }}>
          <h2>Response:</h2>
          <p>{response}</p>
        </div>
      )}
    </div>
  );
}

export default App;
