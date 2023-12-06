interface TypeProps {
  type: string;
  damageValue?: string;
}

const Type = ({ type, damageValue }: TypeProps) => {
  const bg = `bg-${type}`;
  return (
    <div
      className={`h-[2rem] w-[10em]  rounded-2xl px-3 py-2 ${bg} flex items-center justify-center gap-1 text-[0.8rem] font-bold capitalize leading-[0.8rem] text-white `}
    >
      <span>{type}</span>
      {damageValue && (
        <span className="rounded bg-zinc-200/40 p-[.125rem]">
          {damageValue}
        </span>
      )}
    </div>
  );
};

export default Type;
