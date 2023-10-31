import { useEffect, useRef } from "react";

const BaseStat = ({ valueStat, nameStat, type }) => {
  const barRef = useRef();
  const bg = `bg-${type}`;

  useEffect(() => {
    const setValueStat = barRef.current;
    const calcStat = valueStat * (100 / 255);
    if (setValueStat) {
      setValueStat.style.width = calcStat + "%";
    }
  }, []);
  return (
    <tr className="w-full text-white">
      <td className="sm:px-5">{nameStat}</td>
      <td className="px-2 sm:px-3">{valueStat}</td>
      <td>
        <div
          className={`flex items-start h-2 min-w-[10rem] overflow-hidden rounded bg-gray-600`}
        >
          <div className={`h-3 ${bg}`} ref={barRef}></div>
        </div>
      </td>
      <td className="px-2 sm:px-5">255</td>
    </tr>
  );
};

export default BaseStat;
