import React from "react";

interface InfoProp {
  text: string;
  title: string;
}

const Info = ({ text, title }: InfoProp) => {
  return (
    <div className="w-full grow">
      <div className="text-[1.3rem] flex mb-1 gap-2 justify-center item-center text-white">
        <h4>{text}</h4>
      </div>
      <p className="text-[0.9rem] text-zinc-400">{title}</p>
    </div>
  );
};

export default Info;
