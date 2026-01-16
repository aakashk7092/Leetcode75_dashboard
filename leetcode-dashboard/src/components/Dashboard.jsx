import { useEffect, useState } from "react";
import StatCard from "./StatCard";
import ProgressBar from "./ProgressBar";

const TOTAL_PROBLEMS = 75;
const GITHUB_API =
  "https://api.github.com/repos/aakashk7092/Leetcode_75/contents/";

export default function Dashboard() {
  const [solved, setSolved] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchSolved() {
      try {
        const res = await fetch(GITHUB_API);
        const data = await res.json();

        // COUNT FOLDERS ONLY
        const solvedCount = data.filter(
          item => item.type === "dir"
        ).length;

        setSolved(solvedCount);
      } catch (err) {
        console.error("GitHub fetch error:", err);
      } finally {
        setLoading(false);
      }
    }

    fetchSolved();
  }, []);

  const remaining = TOTAL_PROBLEMS - solved;
  const progress = ((solved / TOTAL_PROBLEMS) * 100).toFixed(1);

  if (loading) return <p>Loading real data...</p>;

  return (
    <div className="dashboard">
      <h1>LeetCode 75 Progress Dashboard</h1>

      <div className="stats">
        <StatCard label="Solved" value={solved} />
        <StatCard label="Remaining" value={remaining} />
        <StatCard label="Total" value={TOTAL_PROBLEMS} />
        <StatCard label="Progress" value={`${progress}%`} />
      </div>

      <ProgressBar progress={progress} />

      <p className="note">
        🔄 Live data from GitHub
      </p>
    </div>
  );
}
