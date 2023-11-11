interface TypeProps {
  type: string;
  damageValue?: string;
}

const Type = ({ type, damageValue }: TypeProps) => {
  const bg = `bg-${type}`;
  return (
    <div
      className={`h-[2rem] w-[10em]  py-2 px-3 rounded-2xl ${bg} font-bold text-white text-[0.8rem] leading-[0.8rem] capitalize flex gap-1 justify-center items-center `}
    >
      <span>{type}</span>
      {damageValue && (
        <span className="bg-zinc-200/40 p-[.125rem] rounded">
          {damageValue}
        </span>
      )}
    </div>
  );
};

export default Type;
