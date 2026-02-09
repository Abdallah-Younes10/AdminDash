import { useDispatch, useSelector } from "react-redux";
import { setDate } from "../../Radux/DateSlice";
export const DropdownButton = () => {
    const dispatch = useDispatch();
    const date = useSelector((state) => state.date.value);
const ranges = {
  title: ["week", "month", "year"],
  value: [7, 30, 365],
};  
return (
  <div className="relative inline-block w-100">
    <select
      className="px-2 py-1 text-sm rounded-md bg-transparent dark:bg-gray-700
             text-body focus:outline-none"
      value={date}
      onChange={(e) => dispatch(setDate(Number(e.target.value)))}
    >
      {ranges.title.map((r, i) => (
        <option key={r} value={ranges.value[i]}>
          Last {r}
        </option>
      ))}
    </select>
  </div>
);

};
