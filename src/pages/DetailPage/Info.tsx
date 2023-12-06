import React from "react";

interface InfoProp {
  text: string;
  title: string;
}

const Info = ({ text, title }: InfoProp) => {
  return (
    <div className="w-full grow">
      <div className="item-center mb-1 flex justify-center gap-2 text-[1.3rem] font-bold text-slate-950 dark:text-white">
        <h4>{text}</h4>
      </div>
      <p className="text-[0.9rem] text-zinc-400">{title}</p>
    </div>
  );
};

export default Info;
