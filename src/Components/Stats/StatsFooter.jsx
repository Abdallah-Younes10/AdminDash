import { useDispatch } from "react-redux";
import { setDate } from "../../Radux/DateSlice";
const StatsFooter = ({ ranges, selectedRange, actionLabel = "View full report", onChange  }) => {
  const dispatch = useDispatch();
 
  return (
    <div className="flex items-center justify-between pt-4 border-t border-light dark:border-gray-700">
      <select
        className="px-2 py-1 text-sm rounded-md bg-transparent dark:bg-gray-700
               text-body focus:outline-none"
        value={selectedRange}
        onChange={(e) => {
          dispatch(setDate(Number(e.target.value)));
          onChange(Number(e.target.value));
        }}
      >
        {ranges.title.map((r, i) => (
          <option key={r} value={ranges.value[i]}>
            Last {r} 
          </option>
        ))}
      </select>

      <button className="flex items-center gap-1 text-sm font-medium text-fg-brand
                     hover:gap-2 transition-all">
        {actionLabel} →
      </button>
    </div>
  );
};

export default StatsFooter;
