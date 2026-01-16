import { useEffect, useState } from "react";

/* -------------------- CONFIG -------------------- */

const GITHUB_REPO_API =
  "https://api.github.com/repos/aakashk7092/Leetcode_75/contents";

/* -------------------- COMPONENT -------------------- */

export default function SolvedProblems() {
  const [problems, setProblems] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  /* -------------------- DATA FETCH -------------------- */

  useEffect(() => {
    async function fetchSolvedProblems() {
      try {
        const response = await fetch(GITHUB_REPO_API);
        const data = await response.json();

        if (!Array.isArray(data)) {
          throw new Error("Invalid GitHub response");
        }

        const solvedFolders = data.filter(
          (item) => item.type === "dir"
        );

        setProblems(solvedFolders);
      } catch (err) {
        setError("Unable to load solved problems");
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    }

    fetchSolvedProblems();
  }, []);

  /* -------------------- FILTER LOGIC -------------------- */

  const filteredProblems = problems.filter((problem) =>
    problem.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  /* -------------------- UI STATES -------------------- */

  if (isLoading) {
    return <p>Loading solved problems...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  /* -------------------- RENDER -------------------- */

  return (
    <section style={{ marginTop: "50px" }}>
      {/* Header */}
      <header style={{ marginBottom: "32px" }}>
        <h2 style={{ fontSize: "30px", marginBottom: "6px" }}>
          Aakash Kumar
        </h2>
        <p style={{ opacity: 0.75 }}>
          LeetCode 75 Journey • Consistent DSA Practice
        </p>
        <p style={{ fontSize: "13px", opacity: 0.6 }}>
          Progress tracked using live GitHub repository data
        </p>
      </header>

      {/* Controls */}
      <div style={{ marginBottom: "24px" }}>
        <input
          type="text"
          placeholder="Search by day or problem name"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          style={{
            width: "100%",
            padding: "12px 14px",
            borderRadius: "10px",
            border: "none",
            outline: "none",
            fontSize: "14px",
          }}
        />
      </div>

      {/* Stats */}
      <div style={{ marginBottom: "16px" }}>
        <h3>
          Solved Problems: {filteredProblems.length}
        </h3>
      </div>

      {/* List */}
      {filteredProblems.length === 0 ? (
        <p style={{ opacity: 0.7 }}>
          No problems match your search.
        </p>
      ) : (
        <ul style={{ listStyle: "none", padding: 0 }}>
          {filteredProblems.map((problem) => (
            <li
              key={problem.name}
              style={{
                backgroundColor: "#1e293b",
                padding: "14px 18px",
                marginBottom: "12px",
                borderRadius: "12px",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <span>{problem.name}</span>
              <a
                href={problem.html_url}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  color: "#38bdf8",
                  fontWeight: 600,
                  textDecoration: "none",
                }}
              >
                View Solution
              </a>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
