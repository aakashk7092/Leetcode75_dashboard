import { useTheme } from "../context/ThemeContext";

export default function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      style={{
        padding: "8px 14px",
        borderRadius: "8px",
        border: "none",
        cursor: "pointer",
        fontSize: "14px",
      }}
    >
      Switch to {theme === "dark" ? "Light" : "Dark"} Mode
    </button>
  );
}
