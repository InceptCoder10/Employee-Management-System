export const ExperienceBar = ({ years, max = 15 }) => {
  const pct = Math.min(100, (years / max) * 100);
  return (
    <div className="flex items-center gap-2">
      <div className="flex-1 h-1 bg-gray-100 rounded-full overflow-hidden min-w-12">
        <div
          className="h-full bg-amber-600 rounded-full"
          style={{ width: `${pct}%` }}
        />
      </div>
      <span className="text-xs text-gray-800 min-w-9">{years} yrs</span>
    </div>
  );
};