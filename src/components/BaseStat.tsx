import { useEffect, useRef } from "react";

interface BaseStatProps {
  valueStat: number;
  nameStat: string;
  type: string;
}

const BaseStat = ({ valueStat, nameStat, type }: BaseStatProps) => {
  const barRef = useRef<HTMLDivElement>(null);
  const calcStat = valueStat * (100 / 255);

  useEffect(() => {
    const setValueStat = barRef.current;
    const keyframes = [
      { width: 0 },
      {
        width: calcStat + "%",
      },
    ];
    const options = {
      duration: 1000,
      easing: "ease-in",
    };
    if (setValueStat) {
      setValueStat.style.width = calcStat + "%";
      setValueStat.animate(keyframes, options);
    }
  }, []);
  return (
    <tr className="w-full ">
      <td className="sm:px-5 w-[30px] text-zinc-200 py-1.5">
        <p>{nameStat}</p>
      </td>
      <td>
        <div className="progress w-full">
          <div
            className={`progress-bar ${nameStat.toLowerCase()}`}
            ref={barRef}
          >
            <span>{Math.floor(calcStat) + "/255"}</span>
          </div>
        </div>
      </td>
    </tr>
  );
};

export default BaseStat;
