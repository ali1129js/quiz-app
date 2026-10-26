interface Props {
  current: number;
  total: number;
  score: number;
}

export function ProgressBar({ current, total, score }: Props) {
  const pct = Math.round(((current - 1) / total) * 100);
  return (
    <div className="progress-wrap">
      <div className="progress-text">
        <span>
          Question {current} of {total}
        </span>
        <span>Score: {score}</span>
      </div>
      <div
        className="progress"
        role="progressbar"
        aria-label="Quiz progress"
        aria-valuemin={0}
        aria-valuemax={total}
        aria-valuenow={current - 1}
        aria-valuetext={`${current - 1} of ${total} answered`}
      >
        <div className="progress-fill" style={{ width: `${pct}%` }} />
      </div>
    </div>
  );
}
