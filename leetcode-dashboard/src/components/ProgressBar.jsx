export default function ProgressBar({ progress }) {
  return (
    <div className="bar">
      <div
        className="fill"
        style={{ width: `${progress}%` }}
      ></div>
    </div>
  );
}
